import { defaultState } from './profiles.ts';
import { normalizePath } from './path.ts';
import type { Profile, ProfilesState } from './types.ts';

export const STORAGE_KEY = 'profiles.v1';

/** The slice of `host.storage` core needs. */
export type KeyValueStorage = {
  get(key: string): Promise<unknown>;
  set(key: string, value: unknown): Promise<void>;
};

export type LoadResult = {
  state: ProfilesState;
  /** True when stored data was unusable. The default is returned and must not be saved until the user edits. */
  corrupt: boolean;
};

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

const parseProfile = (v: unknown): Profile | null => {
  if (!isRecord(v) || typeof v.id !== 'string' || !v.id || typeof v.name !== 'string' || !Array.isArray(v.folders)) {
    return null;
  }
  if (!v.folders.every((f) => typeof f === 'string')) return null;
  const seen = new Set<string>();
  const folders: string[] = [];
  for (const f of v.folders as string[]) {
    const n = normalizePath(f);
    if (n && !seen.has(n)) {
      seen.add(n);
      folders.push(n);
    }
  }
  return { id: v.id, name: v.name, folders };
};

export const parseState = (raw: unknown): LoadResult => {
  if (raw === undefined) return { state: defaultState(), corrupt: false };
  if (!isRecord(raw) || raw.version !== 1 || !Array.isArray(raw.profiles)) {
    return { state: defaultState(), corrupt: true };
  }
  const parsed = raw.profiles.map(parseProfile);
  const profiles = parsed.filter((p): p is Profile => p !== null);
  const ids = new Set(profiles.map((p) => p.id));
  if (profiles.length === 0 || parsed.length !== profiles.length || ids.size !== profiles.length) {
    return { state: defaultState(), corrupt: true };
  }
  const activeId = typeof raw.activeId === 'string' && ids.has(raw.activeId) ? raw.activeId : profiles[0]!.id;
  const state: ProfilesState = { version: 1, activeId, profiles };
  if (raw.showSessions === false) state.showSessions = false;
  return { state, corrupt: false };
};

export const loadState = async (storage: KeyValueStorage): Promise<LoadResult> =>
  parseState(await storage.get(STORAGE_KEY));

export const saveState = (storage: KeyValueStorage, state: ProfilesState): Promise<void> =>
  storage.set(STORAGE_KEY, state);
