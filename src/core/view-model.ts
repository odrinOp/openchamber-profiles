import { samePath } from './path.ts';
import type { Activity, Project, ProfilesState, Session, SessionMode, Worktree } from './types.ts';

export const SESSION_CAP = 20;

export type Attention = 'waiting' | 'running' | 'idle';

export type SessionView = Pick<Session, 'id' | 'title' | 'updatedAt' | 'activity'>;

export type FolderView = {
  path: string;
  /** `registered` folders match a project; `not-added` ones do not. */
  kind: 'registered' | 'not-added';
  project: { id: string; name: string } | null;
  /** How the folder matched its project: the project's own directory or one of its worktrees. */
  via: 'project' | 'worktree' | null;
  /** What the profile's session mode lets through, newest first, capped at SESSION_CAP. Empty in `hidden` mode. */
  sessions: SessionView[];
  /** Sessions the mode let through beyond the cap. */
  hiddenSessions: number;
  /** All the folder's sessions, whatever the mode. */
  totalSessions: number;
  /** Sessions running or waiting for the user, whatever the mode. */
  activeSessions: number;
  attention: Attention;
};

export type UnassignedView = { projectId: string; name: string; path: string };

export type ViewModel = {
  /** Registered projects the active profile does not cover yet: the folder picker's options. */
  pickable: UnassignedView[];
  profiles: { id: string; name: string; folderCount: number; active: boolean }[];
  activeProfile: { id: string; name: string; sessionMode: SessionMode; folders: FolderView[] };
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

const isActive = (s: { activity: Activity }): boolean => WAITING.includes(s.activity) || RUNNING.includes(s.activity);

const buildFolder = (path: string, input: ViewInput, mode: SessionMode): FolderView => {
  const match = matchFolder(path, input);
  if (!match) {
    return { path, kind: 'not-added', project: null, via: null, sessions: [], hiddenSessions: 0, totalSessions: 0, activeSessions: 0, attention: 'idle' };
  }
  const all = (input.sessions[match.project.id] ?? [])
    .filter((s) => !s.parentId && !s.archivedAt)
    // A folder that is a worktree only owns the sessions that ran in it.
    .filter((s) => match.via === 'project' || samePath(s.directory, path))
    .sort((a, b) => b.updatedAt - a.updatedAt);
  const shown = mode === 'hidden' ? [] : mode === 'active' ? all.filter(isActive) : all;
  return {
    path,
    kind: 'registered',
    project: { id: match.project.id, name: match.project.name },
    via: match.via,
    sessions: shown.slice(0, SESSION_CAP).map(({ id, title, updatedAt, activity }) => ({ id, title, updatedAt, activity })),
    hiddenSessions: Math.max(0, shown.length - SESSION_CAP),
    totalSessions: all.length,
    activeSessions: all.filter(isActive).length,
    attention: attentionOf(all),
  };
};

/** Projects none of `folders` covers, directly or through one of their worktrees. */
const projectsNotIn = (input: ViewInput, folders: string[]): UnassignedView[] =>
  input.projects
    .filter((project) => {
      const dirs = [project.directory, ...(input.worktrees[project.id] ?? []).map((w) => w.directory)];
      return !folders.some((f) => dirs.some((d) => samePath(f, d)));
    })
    .map((project) => ({ projectId: project.id, name: project.name, path: project.directory }));

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
    activeProfile: {
      id: active.id,
      name: active.name,
      sessionMode: active.sessionMode ?? 'all',
      folders: active.folders.map((f) => buildFolder(f, input, active.sessionMode ?? 'all')),
    },
    unassigned: projectsNotIn(input, state.profiles.flatMap((p) => p.folders)),
    pickable: projectsNotIn(input, active.folders),
  };
};
