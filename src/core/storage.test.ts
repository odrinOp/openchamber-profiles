import { describe, expect, test } from 'bun:test';
import { defaultState } from './profiles.ts';
import { loadState, parseState, saveState, STORAGE_KEY, type KeyValueStorage } from './storage.ts';

const memory = (initial: Record<string, unknown> = {}): KeyValueStorage & { data: Record<string, unknown> } => {
  const data = { ...initial };
  return {
    data,
    get: async (k) => data[k],
    set: async (k, v) => {
      data[k] = v;
    },
  };
};

describe('storage', () => {
  test('missing data gives the default, not corrupt', () => {
    expect(parseState(undefined)).toEqual({ state: defaultState(), corrupt: false });
  });

  test('valid data round-trips', async () => {
    const state = { version: 1 as const, activeId: 'w', profiles: [{ id: 'w', name: 'W', folders: ['/a'] }] };
    const store = memory();
    await saveState(store, state);
    expect(await loadState(store)).toEqual({ state, corrupt: false });
  });

  test('normalizes and dedupes folders, repairs a bad activeId', () => {
    const { state, corrupt } = parseState({
      version: 1,
      activeId: 'gone',
      profiles: [{ id: 'a', name: 'A', folders: ['/x/', '/x', '/y'] }],
    });
    expect(corrupt).toBe(false);
    expect(state.activeId).toBe('a');
    expect(state.profiles[0]!.folders).toEqual(['/x', '/y']);
  });

  test.each([
    ['not an object', 'x'],
    ['wrong version', { version: 2, activeId: 'a', profiles: [] }],
    ['no profiles', { version: 1, activeId: 'a', profiles: [] }],
    ['bad profile', { version: 1, activeId: 'a', profiles: [{ id: 'a', name: 1, folders: [] }] }],
    ['bad folder', { version: 1, activeId: 'a', profiles: [{ id: 'a', name: 'A', folders: [1] }] }],
    [
      'duplicate ids',
      { version: 1, activeId: 'a', profiles: [{ id: 'a', name: 'A', folders: [] }, { id: 'a', name: 'B', folders: [] }] },
    ],
  ])('corrupt: %s falls back to the default', (_name, raw) => {
    expect(parseState(raw)).toEqual({ state: defaultState(), corrupt: true });
  });

  test('loading corrupt data never writes', async () => {
    const store = memory({ [STORAGE_KEY]: 'garbage' });
    const result = await loadState(store);
    expect(result.corrupt).toBe(true);
    expect(store.data[STORAGE_KEY]).toBe('garbage');
  });

  test('showSessions false round-trips; missing means shown', () => {
    const base = { version: 1, activeId: 'w', profiles: [{ id: 'w', name: 'W', folders: [] }] };
    expect(parseState({ ...base, showSessions: false }).state.showSessions).toBe(false);
    expect(parseState(base).state.showSessions).toBeUndefined();
    expect(parseState({ ...base, showSessions: 'no' }).state.showSessions).toBeUndefined();
  });
});
