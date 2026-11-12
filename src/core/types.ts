/** Persisted shape, stored under STORAGE_KEY. */
/** Which of a profile's sessions the list view shows: all, only the ones needing attention or running, or none. */
export type SessionMode = 'all' | 'active' | 'hidden';
export const SESSION_MODES: readonly SessionMode[] = ['all', 'active', 'hidden'];

export type Profile = { id: string; name: string; folders: string[]; sessionMode?: SessionMode };
export type ProfilesState = {
  version: 1;
  activeId: string;
  profiles: Profile[];
};

/** Minimal structural copies of the SDK snapshots, so core stays pure. */
export type Project = { id: string; name: string; directory: string };
export type Worktree = { directory: string; name?: string; branch?: string; status?: string };
export type Activity =
  | 'unknown'
  | 'idle'
  | 'running'
  | 'retrying'
  | 'waiting-permission'
  | 'waiting-question';
export type Session = {
  id: string;
  title: string;
  projectId: string;
  directory: string;
  parentId?: string | null;
  updatedAt: number;
  archivedAt?: number | null;
  activity: Activity;
};
