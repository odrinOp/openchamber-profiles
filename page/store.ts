import type { HostClient } from '@openchamber/sdk';
import {
  addFolder,
  buildViewModel,
  createProfile,
  deleteProfile,
  renameProfile,
  loadState,
  removeFolder,
  saveState,
  setActiveProfile,
  setSessionMode,
  type SessionMode,
  defaultState,
  type Project,
  type ProfilesState,
  type Session,
  type ViewModel,
  type Worktree,
} from '../src/core/index.ts';

/** `host` allows 32 subscriptions per iframe: 1 for projects, the rest for sessions. */
const MAX_SESSION_SUBSCRIPTIONS = 31;

/** `startSession` needs a link on the item it attaches; this is the extension's home. */
const ITEM_URL = 'https://github.com/odrinOp/openchamber-profiles';

export type StoreState = {
  status: 'loading' | 'ready' | 'error';
  error?: string;
  corrupt: boolean;
  vm: ViewModel;
};

export type Store = {
  get(): StoreState;
  subscribe(listener: () => void): () => void;
  selectProfile(id: string): void;
  /** Set how the active profile's sessions are listed. */
  setSessionMode(mode: SessionMode): void;
  createProfile(name: string): void;
  renameProfile(id: string, name: string): void;
  deleteProfile(id: string): void;
  /** Add a folder to a profile (the active one when `profileId` is omitted). */
  addFolder(path: string, profileId?: string): void;
  removeFolder(path: string): void;
  /** Start a session in the folder's project (in the worktree when the folder is one) and open it. */
  newSession(path: string): void;
  openSession(sessionId: string): void;
  dispose(): void;
};

const message = (err: unknown): string => (err instanceof Error ? err.message : String(err));

export const createStore = (host: HostClient): Store => {
  let persisted: ProfilesState = defaultState();
  let corrupt = false;
  let loaded = false;
  let projects: Project[] = [];
  let projectsState: 'loading' | 'ready' | 'error' = 'loading';
  let worktrees: Record<string, Worktree[]> = {};
  let sessions: Record<string, Session[]> = {};
  let fatal: string | undefined;
  let disposed = false;

  const sessionSubs = new Map<string, () => void>();
  let unsubscribeProjects: (() => void) | null = null;
  const listeners = new Set<() => void>();
  let snapshot: StoreState;

  const compute = (): StoreState => {
    const vm = buildViewModel({ state: persisted, projects, worktrees, sessions });
    let status: StoreState['status'] = 'ready';
    let error: string | undefined;
    if (fatal) {
      status = 'error';
      error = fatal;
    } else if (!loaded || projectsState === 'loading') {
      status = 'loading';
    } else if (projectsState === 'error' && projects.length === 0) {
      status = 'error';
      error = 'Could not load projects from OpenChamber.';
    }
    return { status, error, corrupt, vm };
  };

  const emit = () => {
    snapshot = compute();
    reconcileSessionSubs();
    for (const l of listeners) l();
  };

  /** Subscribe to sessions only for projects the active profile uses. */
  const reconcileSessionSubs = () => {
    const wanted = new Set<string>();
    for (const f of snapshot.vm.activeProfile.folders) {
      if (f.project) wanted.add(f.project.id);
      if (wanted.size >= MAX_SESSION_SUBSCRIPTIONS) break;
    }
    for (const [id, unsubscribe] of sessionSubs) {
      if (!wanted.has(id)) {
        unsubscribe();
        sessionSubs.delete(id);
        delete sessions[id];
      }
    }
    for (const id of wanted) {
      if (sessionSubs.has(id)) continue;
      sessionSubs.set(id, () => {});
      host
        .onSessions(id, (snap) => {
          sessions = { ...sessions, [id]: snap.sessions };
          emit();
        })
        .then((unsubscribe) => {
          if (disposed || !sessionSubs.has(id)) unsubscribe();
          else sessionSubs.set(id, unsubscribe);
        })
        .catch((err) => {
          sessionSubs.delete(id);
          console.error('sessions subscription failed', id, err);
        });
    }
  };

  const refreshWorktrees = async (list: Project[]) => {
    const entries = await Promise.all(
      list.map(async (p): Promise<[string, Worktree[]]> => {
        try {
          return [p.id, (await host.listWorktrees(p.id)).worktrees];
        } catch {
          return [p.id, []];
        }
      }),
    );
    if (disposed) return;
    worktrees = Object.fromEntries(entries);
    emit();
  };

  /** Run a core edit. Invalid input becomes a toast, never a crash. */
  const edit = (change: (state: ProfilesState) => ProfilesState) => {
    try {
      commit(change(persisted));
    } catch (err) {
      void host.toast({ kind: 'error', message: message(err) });
    }
  };

  const inFlight = new Set<string>();
  const newSession = async (path: string) => {
    const folder = snapshot.vm.activeProfile.folders.find((f) => f.path === path);
    if (!folder?.project || inFlight.has(path)) return;
    inFlight.add(path);
    try {
      const profile = snapshot.vm.activeProfile;
      // startSession links an item to the new session; the profile is the item.
      const result = await host.startSession({
        providerId: 'profiles',
        id: `profile:${profile.id}`,
        title: profile.name,
        url: ITEM_URL,
        data: { profileId: profile.id },
        projectId: folder.project.id,
        navigation: 'open',
        ...(folder.via === 'worktree' ? { worktree: { kind: 'existing' as const, directory: folder.path } } : {}),
      });
      if (result.sessionId === null) {
        void host.toast({ kind: 'error', message: `Could not start a session (${result.failure}).` });
      }
    } catch (err) {
      void host.toast({ kind: 'error', message: `Could not start a session: ${message(err)}` });
    } finally {
      inFlight.delete(path);
    }
  };

  // Serialize writes so the last edit always wins.
  let writing: Promise<void> = Promise.resolve();
  const commit = (next: ProfilesState) => {
    persisted = next;
    corrupt = false;
    emit();
    writing = writing
      .then(() => saveState(host.storage, persisted))
      .catch((err) => {
        void host.toast({ kind: 'error', message: `Could not save profiles: ${message(err)}` });
      });
  };

  snapshot = compute();

  void (async () => {
    try {
      const result = await loadState(host.storage);
      persisted = result.state;
      corrupt = result.corrupt;
      loaded = true;
      emit();
      const unsubscribe = await host.onProjects((snap) => {
        projects = snap.projects;
        projectsState = snap.state;
        emit();
        void refreshWorktrees(projects);
      });
      if (disposed) unsubscribe();
      else unsubscribeProjects = unsubscribe;
    } catch (err) {
      fatal = message(err);
      emit();
    }
  })();

  return {
    get: () => snapshot,
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    selectProfile: (id) => edit((s) => setActiveProfile(s, id)),
    setSessionMode: (mode) => edit((s) => setSessionMode(s, s.activeId, mode)),
    createProfile: (name) => edit((s) => {
      const next = createProfile(s, name);
      return setActiveProfile(next, next.profiles[next.profiles.length - 1]!.id);
    }),
    renameProfile: (id, name) => edit((s) => renameProfile(s, id, name)),
    deleteProfile: (id) => edit((s) => deleteProfile(s, id)),
    addFolder: (path, profileId) => edit((s) => addFolder(s, profileId ?? s.activeId, path)),
    removeFolder: (path) => edit((s) => removeFolder(s, s.activeId, path)),
    newSession: (path) => void newSession(path),
    openSession: (sessionId) => {
      host.openSession(sessionId).catch((err) => {
        void host.toast({ kind: 'error', message: `Could not open the session: ${message(err)}` });
      });
    },
    dispose() {
      disposed = true;
      unsubscribeProjects?.();
      for (const unsubscribe of sessionSubs.values()) unsubscribe();
      sessionSubs.clear();
      listeners.clear();
    },
  };
};
