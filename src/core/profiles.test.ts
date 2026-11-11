import { describe, expect, test } from 'bun:test';
import {
  addFolder,
  createProfile,
  defaultState,
  deleteProfile,
  moveFolder,
  removeFolder,
  renameProfile,
  setActiveProfile,
} from './profiles.ts';

describe('profiles', () => {
  test('default state is an empty Default profile', () => {
    const s = defaultState();
    expect(s.activeId).toBe('default');
    expect(s.profiles).toEqual([{ id: 'default', name: 'Default', folders: [] }]);
  });

  test('createProfile generates unique slug ids', () => {
    let s = createProfile(defaultState(), 'Work');
    s = createProfile(s, 'work');
    s = createProfile(s, '!!!');
    expect(s.profiles.map((p) => p.id)).toEqual(['default', 'work', 'work-2', 'profile']);
  });

  test('empty name is rejected', () => {
    expect(() => createProfile(defaultState(), '  ')).toThrow();
    expect(() => renameProfile(defaultState(), 'default', '')).toThrow();
  });

  test('rename, activate and unknown ids', () => {
    let s = createProfile(defaultState(), 'Work');
    s = renameProfile(s, 'work', 'Job');
    s = setActiveProfile(s, 'work');
    expect(s.activeId).toBe('work');
    expect(s.profiles[1]!.name).toBe('Job');
    expect(() => setActiveProfile(s, 'nope')).toThrow();
  });

  test('delete active profile activates the first remaining; last delete resets', () => {
    let s = setActiveProfile(createProfile(defaultState(), 'Work'), 'work');
    s = deleteProfile(s, 'work');
    expect(s.activeId).toBe('default');
    expect(deleteProfile(s, 'default')).toEqual(defaultState());
  });

  test('addFolder normalizes, dedupes and requires absolute paths', () => {
    let s = addFolder(defaultState(), 'default', '/a/b/');
    s = addFolder(s, 'default', '/a/b');
    expect(s.profiles[0]!.folders).toEqual(['/a/b']);
    expect(() => addFolder(s, 'default', 'a/b')).toThrow();
  });

  test('same folder may live in several profiles', () => {
    let s = createProfile(defaultState(), 'Work');
    s = addFolder(addFolder(s, 'default', '/a'), 'work', '/a');
    expect(s.profiles.map((p) => p.folders)).toEqual([['/a'], ['/a']]);
  });

  test('removeFolder', () => {
    const s = removeFolder(addFolder(defaultState(), 'default', '/a'), 'default', '/a/');
    expect(s.profiles[0]!.folders).toEqual([]);
  });

  test('moveFolder removes it everywhere else', () => {
    let s = createProfile(defaultState(), 'Work');
    s = addFolder(addFolder(s, 'default', '/a'), 'work', '/a');
    s = moveFolder(s, '/a', 'work');
    expect(s.profiles.map((p) => p.folders)).toEqual([[], ['/a']]);
    expect(() => moveFolder(s, '/a', 'nope')).toThrow();
  });
});
