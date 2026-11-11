import { samePath } from './path.ts';
import type { Activity, Project, ProfilesState, Session, Worktree } from './types.ts';

export const SESSION_CAP = 20;

export type Attention = 'waiting' | 'running' | 'idle';

export type SessionView = Pick<Session, 'id' | 'title' | 'updatedAt' | 'activity'>;

export type FolderView = {
  path: string;
  /** `registered` folders match a project; `not-added` ones do not. */
  kind: 'registered' | 'not-added';
  project: { id: string; name: string } | null;
  /** Newest first, capped at SESSION_CAP. */
  sessions: SessionView[];
  /** Sessions beyond the cap. */
  hiddenSessions: number;
  attention: Attention;
};

export type UnassignedView = { projectId: string; name: string; path: string };

export type ViewModel = {
  profiles: { id: string; name: string; folderCount: number; active: boolean }[];
  activeProfile: { id: string; name: string; folders: FolderView[] };
  unassigned: UnassignedView[];
};

export type ViewInput = {
  state: ProfilesState;
  projects: Project[];
  worktrees: Record<string, Worktree[]>;
  sessions: Record<string, Session[]>;
};

const WAITING: Activity[] = ['waiting-permission', 'waiting-question'];
const RUNNING: Activity[] = ['running', 'retrying'];

export const attentionOf = (sessions: { activity: Activity }[]): Attention => {
  if (sessions.some((s) => WAITING.includes(s.activity))) return 'waiting';
  if (sessions.some((s) => RUNNING.includes(s.activity))) return 'running';
  return 'idle';
};

type Match = { project: Project; via: 'project' | 'worktree' };

const matchFolder = (path: string, input: ViewInput): Match | null => {
  for (const project of input.projects) {
    if (samePath(path, project.directory)) return { project, via: 'project' };
  }
  for (const project of input.projects) {
    if ((input.worktrees[project.id] ?? []).some((w) => samePath(path, w.directory))) {
      return { project, via: 'worktree' };
    }
  }
  return null;
};

const buildFolder = (path: string, input: ViewInput): FolderView => {
  const match = matchFolder(path, input);
  if (!match) {
    return { path, kind: 'not-added', project: null, sessions: [], hiddenSessions: 0, attention: 'idle' };
  }
  const all = (input.sessions[match.project.id] ?? [])
    .filter((s) => !s.parentId && !s.archivedAt)
    // A folder that is a worktree only owns the sessions that ran in it.
    .filter((s) => match.via === 'project' || samePath(s.directory, path))
    .sort((a, b) => b.updatedAt - a.updatedAt);
  return {
    path,
    kind: 'registered',
    project: { id: match.project.id, name: match.project.name },
    sessions: all.slice(0, SESSION_CAP).map(({ id, title, updatedAt, activity }) => ({ id, title, updatedAt, activity })),
    hiddenSessions: Math.max(0, all.length - SESSION_CAP),
    attention: attentionOf(all),
  };
};

/** Projects that no profile covers, directly or through one of their worktrees. */
const buildUnassigned = (input: ViewInput): UnassignedView[] => {
  const folders = input.state.profiles.flatMap((p) => p.folders);
  return input.projects
    .filter((project) => {
      const dirs = [project.directory, ...(input.worktrees[project.id] ?? []).map((w) => w.directory)];
      return !folders.some((f) => dirs.some((d) => samePath(f, d)));
    })
    .map((project) => ({ projectId: project.id, name: project.name, path: project.directory }));
};

export const buildViewModel = (input: ViewInput): ViewModel => {
  const { state } = input;
  const active = state.profiles.find((p) => p.id === state.activeId) ?? state.profiles[0]!;
  return {
    profiles: state.profiles.map((p) => ({
      id: p.id,
      name: p.name,
      folderCount: p.folders.length,
      active: p.id === active.id,
    })),
    activeProfile: { id: active.id, name: active.name, folders: active.folders.map((f) => buildFolder(f, input)) },
    unassigned: buildUnassigned(input),
  };
};
