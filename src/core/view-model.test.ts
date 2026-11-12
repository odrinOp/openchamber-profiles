import { describe, expect, test } from 'bun:test';
import { addFolder, createProfile, defaultState, setActiveProfile, setSessionMode } from './profiles.ts';
import type { Project, Session, Worktree } from './types.ts';
import { buildViewModel, SESSION_CAP } from './view-model.ts';

const projects: Project[] = [
  { id: 'p1', name: 'api', directory: '/work/api' },
  { id: 'p2', name: 'blog', directory: '/me/blog' },
  { id: 'p3', name: 'misc', directory: '/me/misc' },
];
const worktrees: Record<string, Worktree[]> = {
  p1: [{ directory: '/worktrees/api-feature' }],
};
const session = (over: Partial<Session> & { id: string }): Session => ({
  title: over.id,
  projectId: 'p1',
  directory: '/work/api',
  updatedAt: 1,
  activity: 'idle',
  ...over,
});

const stateWith = (folders: string[]) => {
  let s = createProfile(defaultState(), 'Work');
  for (const f of folders) s = addFolder(s, 'work', f);
  return setActiveProfile(s, 'work');
};

describe('view model', () => {
  test('registered vs not-added folders', () => {
    const vm = buildViewModel({
      state: stateWith(['/work/api/', '/nowhere']),
      projects,
      worktrees,
      sessions: {},
    });
    const [a, b] = vm.activeProfile.folders;
    expect(a).toMatchObject({ kind: 'registered', via: 'project', project: { id: 'p1', name: 'api' } });
    expect(b).toMatchObject({ kind: 'not-added', via: null, project: null, sessions: [] });
  });

  test('a folder that is a worktree matches its project and only shows sessions from it', () => {
    const vm = buildViewModel({
      state: stateWith(['/worktrees/api-feature']),
      projects,
      worktrees,
      sessions: {
        p1: [
          session({ id: 'main' }),
          session({ id: 'wt', directory: '/worktrees/api-feature/' }),
        ],
      },
    });
    const folder = vm.activeProfile.folders[0]!;
    expect(folder.project?.id).toBe('p1');
    expect(folder.via).toBe('worktree');
    expect(folder.sessions.map((s) => s.id)).toEqual(['wt']);
  });

  test('hides sub-sessions and archived, sorts newest first, caps and counts the rest', () => {
    const many = Array.from({ length: SESSION_CAP + 3 }, (_, i) => session({ id: `s${i}`, updatedAt: i }));
    const vm = buildViewModel({
      state: stateWith(['/work/api']),
      projects,
      worktrees,
      sessions: {
        p1: [
          ...many,
          session({ id: 'child', parentId: 's1', updatedAt: 999 }),
          session({ id: 'old', archivedAt: 5, updatedAt: 998 }),
        ],
      },
    });
    const folder = vm.activeProfile.folders[0]!;
    expect(folder.sessions).toHaveLength(SESSION_CAP);
    expect(folder.sessions[0]!.id).toBe(`s${SESSION_CAP + 2}`);
    expect(folder.hiddenSessions).toBe(3);
    expect(folder.sessions.some((s) => s.id === 'child' || s.id === 'old')).toBe(false);
  });

  test('attention: waiting beats running beats idle', () => {
    const run = (activities: Session['activity'][]) =>
      buildViewModel({
        state: stateWith(['/work/api']),
        projects,
        worktrees,
        sessions: { p1: activities.map((activity, i) => session({ id: `s${i}`, activity })) },
      }).activeProfile.folders[0]!.attention;
    expect(run(['idle', 'running', 'waiting-question'])).toBe('waiting');
    expect(run(['idle', 'retrying'])).toBe('running');
    expect(run(['idle', 'unknown'])).toBe('idle');
    expect(run([])).toBe('idle');
  });

  test('unassigned lists projects no profile covers, including via worktrees', () => {
    const vm = buildViewModel({
      state: stateWith(['/worktrees/api-feature', '/me/blog/']),
      projects,
      worktrees,
      sessions: {},
    });
    expect(vm.unassigned).toEqual([{ projectId: 'p3', name: 'misc', path: '/me/misc' }]);
  });

  test('with an empty Default profile everything is unassigned', () => {
    const vm = buildViewModel({ state: defaultState(), projects, worktrees, sessions: {} });
    expect(vm.unassigned.map((u) => u.projectId)).toEqual(['p1', 'p2', 'p3']);
    expect(vm.activeProfile.folders).toEqual([]);
  });

  test('profile list marks the active one with folder counts', () => {
    const vm = buildViewModel({ state: stateWith(['/a']), projects, worktrees, sessions: {} });
    expect(vm.profiles).toEqual([
      { id: 'default', name: 'Default', folderCount: 0, active: false },
      { id: 'work', name: 'Work', folderCount: 1, active: true },
    ]);
  });

  test('pickable lists projects missing from the active profile, even if another profile has them', () => {
    let state = createProfile(defaultState(), 'Work');
    state = addFolder(addFolder(state, 'default', '/me/blog'), 'work', '/work/api');
    state = setActiveProfile(state, 'work');
    const vm = buildViewModel({ state, projects, worktrees, sessions: {} });
    expect(vm.pickable.map((p) => p.projectId)).toEqual(['p2', 'p3']);
    expect(vm.unassigned.map((p) => p.projectId)).toEqual(['p3']);
  });

  test('session modes: all, active only, hidden keep the counts', () => {
    const sessions = {
      p1: [
        session({ id: 'a', updatedAt: 3, activity: 'running' }),
        session({ id: 'b', updatedAt: 2, activity: 'idle' }),
        session({ id: 'c', updatedAt: 1, activity: 'waiting-question' }),
      ],
    };
    const folderOf = (mode: 'all' | 'active' | 'hidden') => {
      const vm = buildViewModel({ state: setSessionMode(stateWith(['/work/api']), 'work', mode), projects, worktrees, sessions });
      expect(vm.activeProfile.sessionMode).toBe(mode);
      return vm.activeProfile.folders[0]!;
    };
    expect(folderOf('all').sessions.map((s) => s.id)).toEqual(['a', 'b', 'c']);
    expect(folderOf('active').sessions.map((s) => s.id)).toEqual(['a', 'c']);
    const hidden = folderOf('hidden');
    expect(hidden.sessions).toEqual([]);
    expect(hidden.totalSessions).toBe(3);
    expect(hidden.activeSessions).toBe(2);
    expect(hidden.attention).toBe('waiting');
  });
});
