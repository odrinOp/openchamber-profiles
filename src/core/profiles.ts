import { isAbsolutePath, normalizePath, samePath } from './path.ts';
import type { Profile, ProfilesState } from './types.ts';

export const DEFAULT_PROFILE_ID = 'default';

export const setShowSessions = (state: ProfilesState, show: boolean): ProfilesState => {
  const { showSessions: _omit, ...rest } = state;
  return show ? rest : { ...rest, showSessions: false };
};

export const defaultState = (): ProfilesState => ({
  version: 1,
  activeId: DEFAULT_PROFILE_ID,
  profiles: [{ id: DEFAULT_PROFILE_ID, name: 'Default', folders: [] }],
});

const slug = (name: string): string =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'profile';

const uniqueId = (state: ProfilesState, name: string): string => {
  const base = slug(name);
  const taken = new Set(state.profiles.map((p) => p.id));
  if (!taken.has(base)) return base;
  let n = 2;
  while (taken.has(`${base}-${n}`)) n += 1;
  return `${base}-${n}`;
};

const mapProfile = (state: ProfilesState, id: string, fn: (p: Profile) => Profile): ProfilesState => {
  if (!state.profiles.some((p) => p.id === id)) throw new Error(`Unknown profile: ${id}`);
  return { ...state, profiles: state.profiles.map((p) => (p.id === id ? fn(p) : p)) };
};

const requireName = (name: string): string => {
  const trimmed = name.trim();
  if (!trimmed) throw new Error('Profile name is required');
  return trimmed;
};

export const createProfile = (state: ProfilesState, name: string): ProfilesState => {
  const trimmed = requireName(name);
  const profile: Profile = { id: uniqueId(state, trimmed), name: trimmed, folders: [] };
  return { ...state, profiles: [...state.profiles, profile] };
};

export const renameProfile = (state: ProfilesState, id: string, name: string): ProfilesState => {
  const trimmed = requireName(name);
  return mapProfile(state, id, (p) => ({ ...p, name: trimmed }));
};

/** Deleting the last profile leaves a fresh empty Default. Deleting the active one activates the first remaining. */
export const deleteProfile = (state: ProfilesState, id: string): ProfilesState => {
  if (!state.profiles.some((p) => p.id === id)) throw new Error(`Unknown profile: ${id}`);
  const profiles = state.profiles.filter((p) => p.id !== id);
  if (profiles.length === 0) return defaultState();
  const activeId = state.activeId === id ? profiles[0]!.id : state.activeId;
  return { ...state, activeId, profiles };
};

export const setActiveProfile = (state: ProfilesState, id: string): ProfilesState => {
  if (!state.profiles.some((p) => p.id === id)) throw new Error(`Unknown profile: ${id}`);
  return { ...state, activeId: id };
};

export const addFolder = (state: ProfilesState, profileId: string, path: string): ProfilesState => {
  if (!isAbsolutePath(path)) throw new Error('Folder path must be absolute');
  const normalized = normalizePath(path);
  return mapProfile(state, profileId, (p) =>
    p.folders.some((f) => samePath(f, normalized)) ? p : { ...p, folders: [...p.folders, normalized] },
  );
};

export const removeFolder = (state: ProfilesState, profileId: string, path: string): ProfilesState =>
  mapProfile(state, profileId, (p) => ({ ...p, folders: p.folders.filter((f) => !samePath(f, path)) }));

/** Remove the folder from every profile and put it in `toProfileId` (the file action). */
export const moveFolder = (state: ProfilesState, path: string, toProfileId: string): ProfilesState => {
  if (!state.profiles.some((p) => p.id === toProfileId)) throw new Error(`Unknown profile: ${toProfileId}`);
  const stripped: ProfilesState = {
    ...state,
    profiles: state.profiles.map((p) => ({ ...p, folders: p.folders.filter((f) => !samePath(f, path)) })),
  };
  return addFolder(stripped, toProfileId, path);
};
