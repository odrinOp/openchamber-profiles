/** Persisted shape, stored under STORAGE_KEY. */
export type Profile = { id: string; name: string; folders: string[] };
export type ProfilesState = {
  version: 1;
  activeId: string;
  profiles: Profile[];
  /** Show session lists in the extension's views. Missing in older saves: treated as true. */
  showSessions?: boolean;
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
