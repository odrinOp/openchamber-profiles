import {
  isAbsolutePath,
  type SessionMode,
  type ViewModel,
  type FolderView,
  type UnassignedView,
  type Activity,
} from '../src/core/index.ts';
import {
  mountBadge,
  mountBanner,
  mountButton,
  mountTabs,
  mountEmpty,
  mountList,
  mountSearchField,
  mountSelect,
  mountSeparator,
  mountSpinner,
  mountTextField,
  type BannerHandle,
  type ButtonHandle,
  type EmptyHandle,
  type Handle,
  type ListHandle,
  type SearchFieldHandle,
  type SelectHandle,
  type TabsHandle,
  type SeparatorHandle,
  type SpinnerHandle,
  type TextFieldHandle,
  type Tone,
} from '@openchamber/sdk/ui';
import { VIEW_CSS } from './view.css.ts';

export type ViewState = {
  status: 'loading' | 'ready' | 'error';
  error?: string;
  corrupt: boolean;
  vm: ViewModel;
};

export type ViewHandlers = {
  selectProfile(id: string): void;
  createProfile(name: string): void; // store selects the new profile afterwards
  renameProfile(id: string, name: string): void;
  deleteProfile(id: string): void;
  setSessionMode(mode: SessionMode): void;
  addFolder(path: string, profileId?: string): void; // omit profileId = active profile
  removeFolder(path: string): void; // from the active profile
  newSession(path: string): void; // folder path (FolderView.path); store starts a session in that folder's project/worktree and opens the chat
  openSession(sessionId: string): void; // opens the chat; the host closes this page
};

export type App = {
  render(state: ViewState, handlers: ViewHandlers): void;
  dispose(): void;
};

export const getFolderBasename = (p: string): string => {
  const normalized = p.replace(/[\\/]+$/, '');
  const lastSlash = Math.max(normalized.lastIndexOf('/'), normalized.lastIndexOf('\\'));
  if (lastSlash >= 0) {
    return normalized.slice(lastSlash + 1) || p;
  }
  return p;
};

export const formatRelativeTime = (timestampMs: number, nowMs: number = Date.now()): string => {
  const diffMs = Math.max(0, nowMs - timestampMs);
  const diffSecs = Math.floor(diffMs / 1000);
  if (diffSecs < 60) return 'just now';
  const diffMins = Math.floor(diffSecs / 60);
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) return `${diffDays}d ago`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths}mo ago`;
  const diffYears = Math.floor(diffDays / 365);
  return `${diffYears}y ago`;
};

export const formatActivity = (activity: Activity): { label: string; tone: Tone } => {
  switch (activity) {
    case 'waiting-permission':
      return { label: 'waiting for permission', tone: 'warning' };
    case 'waiting-question':
      return { label: 'waiting for answer', tone: 'warning' };
    case 'running':
      return { label: 'running', tone: 'info' };
    case 'retrying':
      return { label: 'retrying', tone: 'warning' };
    case 'idle':
    case 'unknown':
    default:
      return { label: 'idle', tone: 'neutral' };
  }
};

const ensureViewStyle = (css: string) => {
  const id = 'oc-profiles-view-style';
  let el = document.getElementById(id) as HTMLStyleElement | null;
  if (!el) {
    el = document.createElement('style');
    el.id = id;
    document.head.appendChild(el);
  }
  if (el.textContent !== css) {
    el.textContent = css;
  }
};

type FolderCardHandle = {
  element: HTMLElement;
  update(folder: FolderView, handlers: ViewHandlers, mode: SessionMode): void;
  dispose(): void;
};

type SessionRow = {
  element: HTMLElement;
  titleEl: HTMLElement;
  badgeHandle: Handle<{ label: string; tone?: Tone }>;
  timeEl: HTMLElement;
  openButtonHandle: ButtonHandle;
  setSessionId: (id: string) => void;
};

const createFolderCard = (initialFolder: FolderView, initialHandlers: ViewHandlers, initialMode: SessionMode): FolderCardHandle => {
  const card = document.createElement('div');
  card.className = 'oc-profiles-folder-card';

  let currentFolder = initialFolder;
  let currentHandlers = initialHandlers;
  let isStartingSession = false;
  let startTimerId: ReturnType<typeof setTimeout> | null = null;

  // Header
  const header = document.createElement('div');
  header.className = 'oc-profiles-folder-header';

  const meta = document.createElement('div');
  meta.className = 'oc-profiles-folder-meta';

  const titleRow = document.createElement('div');
  titleRow.className = 'oc-profiles-folder-title-row';

  const statusDot = document.createElement('span');
  statusDot.className = 'oc-profiles-status-dot';

  const basename = document.createElement('span');
  basename.className = 'oc-profiles-folder-basename';

  const worktreeTag = document.createElement('span');
  worktreeTag.className = 'oc-sdk-badge oc-profiles-worktree-tag';
  worktreeTag.textContent = 'worktree';
  worktreeTag.style.display = 'none';

  titleRow.appendChild(statusDot);
  titleRow.appendChild(basename);
  titleRow.appendChild(worktreeTag);

  const sessionCount = document.createElement('span');
  sessionCount.className = 'oc-profiles-session-count';
  sessionCount.style.display = 'none';
  titleRow.appendChild(sessionCount);

  const pathEl = document.createElement('span');
  pathEl.className = 'oc-profiles-folder-path';

  meta.appendChild(titleRow);
  meta.appendChild(pathEl);

  const actions = document.createElement('div');
  actions.className = 'oc-profiles-folder-actions';

  const newSessionWrap = document.createElement('span');
  actions.appendChild(newSessionWrap);

  const handleNewSession = () => {
    if (isStartingSession) return;
    isStartingSession = true;
    newSessionButton.update({ disabled: true });
    currentHandlers.newSession(currentFolder.path);
    startTimerId = setTimeout(() => {
      isStartingSession = false;
      startTimerId = null;
      newSessionButton.update({ disabled: false });
    }, 3000);
  };

  const newSessionButton = mountButton(newSessionWrap, {
    label: 'New session',
    variant: 'default',
    size: 'xs',
    onClick: handleNewSession,
  });

  header.appendChild(meta);
  header.appendChild(actions);
  card.appendChild(header);

  // Body: Not-added callout
  const notAddedCallout = document.createElement('div');
  notAddedCallout.className = 'oc-profiles-not-added-callout';
  const notAddedIcon = document.createElement('span');
  notAddedIcon.className = 'oc-profiles-not-added-icon';
  notAddedIcon.textContent = 'ℹ';
  const notAddedText = document.createElement('span');
  notAddedText.textContent = 'Add this folder as a project in the sidebar once';
  notAddedCallout.appendChild(notAddedIcon);
  notAddedCallout.appendChild(notAddedText);

  // Body: Sessions area
  const sessionsContainer = document.createElement('div');
  sessionsContainer.className = 'oc-profiles-sessions-container';

  const emptySessions = document.createElement('div');
  emptySessions.className = 'oc-profiles-sessions-empty';
  emptySessions.textContent = 'No sessions yet';

  const sessionsList = document.createElement('div');
  sessionsList.className = 'oc-profiles-sessions-list';

  const moreSessions = document.createElement('div');
  moreSessions.className = 'oc-profiles-sessions-more';

  sessionsContainer.appendChild(emptySessions);
  sessionsContainer.appendChild(sessionsList);
  sessionsContainer.appendChild(moreSessions);

  let sessionRows: SessionRow[] = [];

  const update = (folder: FolderView, handlers: ViewHandlers, mode: SessionMode) => {
    currentFolder = folder;
    currentHandlers = handlers;

    // Status dot
    statusDot.dataset.status = folder.attention;
    statusDot.setAttribute('title', `Status: ${folder.attention}`);
    statusDot.setAttribute('aria-label', `Status: ${folder.attention}`);

    // Basename and path
    basename.textContent = getFolderBasename(folder.path);
    basename.title = folder.path;
    pathEl.textContent = folder.path;
    pathEl.title = folder.path;

    // Summary chip (only in hidden mode)
    const total = folder.totalSessions;
    sessionCount.textContent =
      `${total} ${total === 1 ? 'session' : 'sessions'}` +
      (folder.activeSessions > 0 ? ` · ${folder.activeSessions} active` : '');
    sessionCount.style.display = folder.kind === 'registered' && mode === 'hidden' ? '' : 'none';

    // Worktree badge
    worktreeTag.style.display = folder.via === 'worktree' ? '' : 'none';

    // New session button visibility and state
    if (folder.kind === 'registered') {
      newSessionWrap.style.display = '';
      newSessionButton.update({
        disabled: isStartingSession,
      });
    } else {
      newSessionWrap.style.display = 'none';
    }

    if (folder.kind === 'not-added') {
      if (!notAddedCallout.parentElement) {
        card.appendChild(notAddedCallout);
      }
      if (sessionsContainer.parentElement) {
        sessionsContainer.remove();
      }
    } else {
      if (notAddedCallout.parentElement) {
        notAddedCallout.remove();
      }
      sessionsContainer.style.display = mode === 'hidden' ? 'none' : '';
      if (!sessionsContainer.parentElement) {
        card.appendChild(sessionsContainer);
      }

      if (folder.sessions.length === 0) {
        if (mode === 'active') {
          emptySessions.textContent =
            folder.totalSessions > 0 ? `No active sessions · ${folder.totalSessions} total` : 'No active sessions';
        } else {
          emptySessions.textContent = 'No sessions yet';
        }
        emptySessions.style.display = '';
        sessionsList.style.display = 'none';
        moreSessions.style.display = 'none';
      } else {
        emptySessions.style.display = 'none';
        sessionsList.style.display = '';

        while (sessionRows.length < folder.sessions.length) {
          const rowEl = document.createElement('div');
          rowEl.className = 'oc-profiles-session-row';

          const lead = document.createElement('div');
          lead.className = 'oc-profiles-session-lead';

          const sTitle = document.createElement('span');
          sTitle.className = 'oc-profiles-session-title';
          lead.appendChild(sTitle);

          const badgeMount = document.createElement('span');
          lead.appendChild(badgeMount);
          const badgeHandle = mountBadge(badgeMount, { label: '', tone: 'neutral' });

          const trail = document.createElement('div');
          trail.className = 'oc-profiles-session-trail';

          const sTime = document.createElement('span');
          trail.appendChild(sTime);

          const actionSlot = document.createElement('div');
          actionSlot.className = 'oc-profiles-session-actions';
          trail.appendChild(actionSlot);

          let rowSessionId = '';
          const openButtonHandle = mountButton(actionSlot, {
            label: 'Open',
            variant: 'secondary',
            size: 'xs',
            onClick: () => {
              if (rowSessionId) currentHandlers.openSession(rowSessionId);
            },
          });

          sTitle.addEventListener('click', () => {
            if (rowSessionId) currentHandlers.openSession(rowSessionId);
          });

          rowEl.appendChild(lead);
          rowEl.appendChild(trail);
          sessionsList.appendChild(rowEl);

          sessionRows.push({
            element: rowEl,
            titleEl: sTitle,
            badgeHandle,
            timeEl: sTime,
            openButtonHandle,
            setSessionId: (id: string) => {
              rowSessionId = id;
            },
          });
        }

        while (sessionRows.length > folder.sessions.length) {
          const removed = sessionRows.pop()!;
          removed.badgeHandle.dispose();
          removed.openButtonHandle.dispose();
          removed.element.remove();
        }

        folder.sessions.forEach((session, i) => {
          const row = sessionRows[i]!;
          row.setSessionId(session.id);
          row.titleEl.textContent = session.title || 'Untitled session';
          row.titleEl.title = `Open session: ${session.title || 'Untitled session'}`;
          const act = formatActivity(session.activity);
          row.badgeHandle.update({ label: act.label, tone: act.tone });
          row.timeEl.textContent = formatRelativeTime(session.updatedAt);
        });

        if (folder.hiddenSessions > 0) {
          moreSessions.style.display = '';
          moreSessions.textContent = `+${folder.hiddenSessions} more`;
        } else {
          moreSessions.style.display = 'none';
        }
      }
    }
  };

  update(initialFolder, initialHandlers, initialMode);

  return {
    element: card,
    update,
    dispose: () => {
      if (startTimerId) {
        clearTimeout(startTimerId);
        startTimerId = null;
      }
      newSessionButton.dispose();
      for (const row of sessionRows) {
        row.badgeHandle.dispose();
        row.openButtonHandle.dispose();
      }
      sessionRows = [];
      card.remove();
    },
  };
};

type UnassignedCardHandle = {
  element: HTMLElement;
  update(
    item: UnassignedView,
    profiles: { id: string; name: string; active: boolean }[],
    handlers: ViewHandlers,
  ): void;
  dispose(): void;
};

const createUnassignedCard = (
  initialItem: UnassignedView,
  initialProfiles: { id: string; name: string; active: boolean }[],
  initialHandlers: ViewHandlers,
): UnassignedCardHandle => {
  const card = document.createElement('div');
  card.className = 'oc-profiles-unassigned-card';

  const info = document.createElement('div');
  info.className = 'oc-profiles-unassigned-info';

  const nameEl = document.createElement('span');
  nameEl.className = 'oc-profiles-unassigned-name';

  const pathEl = document.createElement('span');
  pathEl.className = 'oc-profiles-unassigned-path';

  info.appendChild(nameEl);
  info.appendChild(pathEl);

  const actions = document.createElement('div');
  actions.className = 'oc-profiles-unassigned-actions';

  card.appendChild(info);
  card.appendChild(actions);

  let singleButton: ButtonHandle | null = null;
  let profileSelect: SelectHandle | null = null;
  let multiAddButton: ButtonHandle | null = null;
  let targetProfileId: string =
    initialProfiles.find((p) => p.active)?.id ?? initialProfiles[0]?.id ?? '';

  const update = (
    item: UnassignedView,
    profiles: { id: string; name: string; active: boolean }[],
    handlers: ViewHandlers,
  ) => {
    nameEl.textContent = item.name;
    pathEl.textContent = item.path;
    pathEl.title = item.path;

    if (!profiles.some((p) => p.id === targetProfileId)) {
      targetProfileId = profiles.find((p) => p.active)?.id ?? profiles[0]?.id ?? '';
    }

    if (profiles.length <= 1) {
      if (profileSelect) {
        profileSelect.dispose();
        profileSelect = null;
      }
      if (multiAddButton) {
        multiAddButton.dispose();
        multiAddButton = null;
      }

      const pName = profiles[0]?.name ?? 'profile';
      const pId = profiles[0]?.id;

      if (!singleButton) {
        singleButton = mountButton(actions, {
          label: `Add to ${pName}`,
          variant: 'secondary',
          size: 'sm',
          onClick: () => {
            if (pId) handlers.addFolder(item.path, pId);
            else handlers.addFolder(item.path);
          },
        });
      } else {
        singleButton.update({
          label: `Add to ${pName}`,
          onClick: () => {
            if (pId) handlers.addFolder(item.path, pId);
            else handlers.addFolder(item.path);
          },
        });
      }
    } else {
      if (singleButton) {
        singleButton.dispose();
        singleButton = null;
      }

      const selectOptions = profiles.map((p) => ({
        id: p.id,
        label: p.active ? `${p.name} (active)` : p.name,
      }));

      if (!profileSelect) {
        profileSelect = mountSelect(actions, {
          options: selectOptions,
          value: targetProfileId,
          onChange: (id) => {
            targetProfileId = id;
          },
        });
      } else {
        profileSelect.update({
          options: selectOptions,
          value: targetProfileId,
        });
      }

      if (!multiAddButton) {
        multiAddButton = mountButton(actions, {
          label: 'Add',
          variant: 'secondary',
          size: 'sm',
          onClick: () => {
            handlers.addFolder(item.path, targetProfileId);
          },
        });
      } else {
        multiAddButton.update({
          onClick: () => {
            handlers.addFolder(item.path, targetProfileId);
          },
        });
      }
    }
  };

  update(initialItem, initialProfiles, initialHandlers);

  return {
    element: card,
    update,
    dispose: () => {
      singleButton?.dispose();
      profileSelect?.dispose();
      multiAddButton?.dispose();
      card.remove();
    },
  };
};

type FolderRowHandle = {
  element: HTMLElement;
  update(folder: FolderView, handlers: ViewHandlers): void;
  dispose(): void;
};

const createFolderRow = (initial: FolderView, initialHandlers: ViewHandlers): FolderRowHandle => {
  const row = document.createElement('div');
  row.className = 'oc-profiles-config-row';

  const info = document.createElement('div');
  info.className = 'oc-profiles-unassigned-info';
  const nameEl = document.createElement('span');
  nameEl.className = 'oc-profiles-unassigned-name';
  const pathEl = document.createElement('span');
  pathEl.className = 'oc-profiles-unassigned-path';
  info.appendChild(nameEl);
  info.appendChild(pathEl);

  const actions = document.createElement('div');
  actions.className = 'oc-profiles-unassigned-actions';
  row.appendChild(info);
  row.appendChild(actions);

  let current = initial;
  let currentHandlers = initialHandlers;
  const removeBtn = mountButton(actions, {
    label: 'Remove',
    variant: 'ghost',
    size: 'xs',
    onClick: () => currentHandlers.removeFolder(current.path),
  });

  const update = (folder: FolderView, handlers: ViewHandlers) => {
    current = folder;
    currentHandlers = handlers;
    nameEl.textContent = getFolderBasename(folder.path);
    nameEl.title = folder.path;
    pathEl.textContent = folder.path;
    pathEl.title = folder.path;
  };
  update(initial, initialHandlers);

  return {
    element: row,
    update,
    dispose: () => {
      removeBtn.dispose();
      row.remove();
    },
  };
};

const MODE_ITEMS = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'hidden', label: 'Hidden' },
];

export const mountApp = (root: HTMLElement): App => {
  ensureViewStyle(VIEW_CSS);

  let lastState: ViewState | null = null;
  let lastHandlers: ViewHandlers | null = null;
  let currentView: 'projects' | 'settings' = 'projects';

  // Inline editing state
  let isCreatingProfile = false;
  let newProfileDraft = '';
  let newProfileError: string | undefined;

  let isRenamingProfile = false;
  let renamingProfileId: string | null = null;
  let renameDraft = '';

  let isConfirmingDelete = false;
  let deletingProfileId: string | null = null;

  let isAddFolderOpen = false;
  let searchPickableQuery = '';
  let typedPathDraft = '';
  let typedPathError: string | undefined;

  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }

  const rerender = () => {
    if (lastState && lastHandlers) render(lastState, lastHandlers);
  };

  const appContainer = document.createElement('div');
  appContainer.className = 'oc-profiles-app oc-sdk';
  root.appendChild(appContainer);

  // Top bar with view navigation
  const topbar = document.createElement('header');
  topbar.className = 'oc-profiles-topbar';
  appContainer.appendChild(topbar);

  const topTitle = document.createElement('h1');
  topTitle.className = 'oc-profiles-main-title';
  topTitle.textContent = 'Profiles';
  topbar.appendChild(topTitle);

  const viewTabsWrap = document.createElement('div');
  topbar.appendChild(viewTabsWrap);
  const viewTabs: TabsHandle = mountTabs(viewTabsWrap, {
    items: [
      { id: 'projects', label: 'Projects' },
      { id: 'settings', label: 'Settings' },
    ],
    activeId: currentView,
    trackBackground: true,
    onChange: (id) => {
      currentView = id === 'settings' ? 'settings' : 'projects';
      rerender();
    },
  });

  const body = document.createElement('div');
  body.className = 'oc-profiles-body';
  appContainer.appendChild(body);

  const bannerSlot = document.createElement('div');
  bannerSlot.className = 'oc-profiles-banner-slot';
  body.appendChild(bannerSlot);

  const loadingSlot = document.createElement('div');
  body.appendChild(loadingSlot);

  // ===================== Projects view =====================
  const projectsView = document.createElement('section');
  projectsView.className = 'oc-profiles-projects-view';
  body.appendChild(projectsView);

  const toolbar = document.createElement('div');
  toolbar.className = 'oc-profiles-toolbar';
  projectsView.appendChild(toolbar);

  const profileSelectWrap = document.createElement('div');
  profileSelectWrap.className = 'oc-profiles-toolbar-item';
  toolbar.appendChild(profileSelectWrap);
  const profileSelect = mountSelect(profileSelectWrap, {
    options: [],
    value: '',
    onChange: (id) => lastHandlers?.selectProfile(id),
  });

  const modeTabsWrap = document.createElement('div');
  modeTabsWrap.className = 'oc-profiles-toolbar-item';
  toolbar.appendChild(modeTabsWrap);
  const modeTabs = mountTabs(modeTabsWrap, {
    items: MODE_ITEMS,
    activeId: 'all',
    trackBackground: true,
    onChange: (id) => {
      if (id === 'all' || id === 'active' || id === 'hidden') lastHandlers?.setSessionMode(id);
    },
  });

  const modeHint = document.createElement('p');
  modeHint.className = 'oc-profiles-main-subtitle';
  modeHint.textContent = 'Session display is remembered per profile.';
  projectsView.appendChild(modeHint);

  const projectsContent = document.createElement('div');
  projectsContent.className = 'oc-profiles-content';
  projectsView.appendChild(projectsContent);

  // ===================== Settings view =====================
  const settingsView = document.createElement('section');
  settingsView.className = 'oc-profiles-settings-view';
  body.appendChild(settingsView);

  const sidebar = document.createElement('aside');
  sidebar.className = 'oc-profiles-sidebar';
  settingsView.appendChild(sidebar);

  const sidebarHeader = document.createElement('div');
  sidebarHeader.className = 'oc-profiles-sidebar-header';
  sidebarHeader.textContent = 'Profiles';
  sidebar.appendChild(sidebarHeader);

  const profilesNavWrap = document.createElement('div');
  profilesNavWrap.className = 'oc-profiles-sidebar-section';
  sidebar.appendChild(profilesNavWrap);

  const profilesList = mountList(profilesNavWrap, {
    items: [],
    ariaLabel: 'Profiles',
    onSelect: (id: string) => {
      lastHandlers?.selectProfile(id);
      rerender();
    },
  });

  const newProfileSection = document.createElement('div');
  newProfileSection.className = 'oc-profiles-sidebar-action';
  sidebar.appendChild(newProfileSection);

  const newProfileButtonWrap = document.createElement('div');
  newProfileSection.appendChild(newProfileButtonWrap);

  const newProfileFormWrap = document.createElement('div');
  newProfileFormWrap.className = 'oc-profiles-new-profile-form';
  newProfileFormWrap.style.display = 'none';
  newProfileSection.appendChild(newProfileFormWrap);

  const newProfileFieldWrap = document.createElement('div');
  newProfileFormWrap.appendChild(newProfileFieldWrap);

  const newProfileActionsWrap = document.createElement('div');
  newProfileActionsWrap.className = 'oc-profiles-form-actions';
  newProfileFormWrap.appendChild(newProfileActionsWrap);

  const submitCreateProfile = () => {
    const trimmed = newProfileDraft.trim();
    if (!trimmed) {
      newProfileError = 'Name cannot be empty';
      newProfileTextField.update({ error: newProfileError });
      return;
    }
    lastHandlers?.createProfile(trimmed);
    isCreatingProfile = false;
    newProfileDraft = '';
    newProfileError = undefined;
    rerender();
  };

  const cancelCreateProfile = () => {
    isCreatingProfile = false;
    newProfileDraft = '';
    newProfileError = undefined;
    rerender();
  };

  const newProfileButton = mountButton(newProfileButtonWrap, {
    label: '+ New profile',
    variant: 'ghost',
    size: 'sm',
    onClick: () => {
      isCreatingProfile = true;
      newProfileDraft = '';
      newProfileError = undefined;
      rerender();
      const inp = newProfileFormWrap.querySelector('input');
      inp?.focus();
    },
  });

  const newProfileTextField = mountTextField(newProfileFieldWrap, {
    placeholder: 'Profile name',
    value: '',
    onChange: (val) => {
      newProfileDraft = val;
      newProfileError = undefined;
      newProfileTextField.update({ value: val, error: undefined });
      newProfileCreateBtn.update({ disabled: !val.trim() });
    },
  });

  const newProfileCreateBtn = mountButton(newProfileActionsWrap, {
    label: 'Create',
    variant: 'default',
    size: 'xs',
    disabled: true,
    onClick: submitCreateProfile,
  });

  const newProfileCancelBtn = mountButton(newProfileActionsWrap, {
    label: 'Cancel',
    variant: 'ghost',
    size: 'xs',
    onClick: cancelCreateProfile,
  });

  newProfileFormWrap.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitCreateProfile();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancelCreateProfile();
    }
  });

  // Settings main
  const main = document.createElement('main');
  main.className = 'oc-profiles-main';
  settingsView.appendChild(main);

  const mainHeader = document.createElement('header');
  mainHeader.className = 'oc-profiles-main-header';
  main.appendChild(mainHeader);

  const headerTop = document.createElement('div');
  headerTop.className = 'oc-profiles-header-top';
  mainHeader.appendChild(headerTop);

  const headerTitleRow = document.createElement('div');
  headerTitleRow.className = 'oc-profiles-header-title-row';
  headerTop.appendChild(headerTitleRow);

  const mainTitle = document.createElement('h2');
  mainTitle.className = 'oc-profiles-main-title';
  headerTitleRow.appendChild(mainTitle);

  const renameForm = document.createElement('div');
  renameForm.className = 'oc-profiles-rename-form';
  renameForm.style.display = 'none';
  headerTitleRow.appendChild(renameForm);

  const renameInput = document.createElement('input');
  renameInput.type = 'text';
  renameInput.className = 'oc-sdk-input';
  renameInput.placeholder = 'Profile name';
  renameForm.appendChild(renameInput);

  const renameActions = document.createElement('div');
  renameActions.className = 'oc-profiles-form-actions';
  renameForm.appendChild(renameActions);

  const submitRename = () => {
    const trimmed = renameDraft.trim();
    if (trimmed && renamingProfileId) {
      lastHandlers?.renameProfile(renamingProfileId, trimmed);
    }
    isRenamingProfile = false;
    renamingProfileId = null;
    rerender();
  };

  const cancelRename = () => {
    isRenamingProfile = false;
    renamingProfileId = null;
    rerender();
  };

  const renameSaveBtn = mountButton(renameActions, {
    label: 'Save',
    variant: 'default',
    size: 'xs',
    onClick: submitRename,
  });

  const renameCancelBtn = mountButton(renameActions, {
    label: 'Cancel',
    variant: 'ghost',
    size: 'xs',
    onClick: cancelRename,
  });

  renameInput.addEventListener('input', () => {
    renameDraft = renameInput.value;
    renameSaveBtn.update({ disabled: !renameDraft.trim() });
  });

  renameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitRename();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancelRename();
    }
  });

  const headerActions = document.createElement('div');
  headerActions.className = 'oc-profiles-header-actions';
  headerTop.appendChild(headerActions);

  const renameBtn = mountButton(headerActions, {
    label: 'Rename',
    variant: 'ghost',
    size: 'xs',
    onClick: () => {
      if (!lastState) return;
      isRenamingProfile = true;
      renamingProfileId = lastState.vm.activeProfile.id;
      renameDraft = lastState.vm.activeProfile.name;
      renameInput.value = renameDraft;
      isConfirmingDelete = false;
      render(lastState, lastHandlers!);
      renameInput.focus();
      renameInput.select();
    },
  });

  const deleteBtn = mountButton(headerActions, {
    label: 'Delete',
    variant: 'ghost',
    size: 'xs',
    onClick: () => {
      if (!lastState) return;
      isConfirmingDelete = true;
      deletingProfileId = lastState.vm.activeProfile.id;
      isRenamingProfile = false;
      render(lastState, lastHandlers!);
    },
  });

  const addFolderBtn = mountButton(headerActions, {
    label: '+ Add folder',
    variant: 'secondary',
    size: 'sm',
    onClick: () => {
      isAddFolderOpen = !isAddFolderOpen;
      rerender();
    },
  });

  const mainSubtitle = document.createElement('p');
  mainSubtitle.className = 'oc-profiles-main-subtitle';
  mainHeader.appendChild(mainSubtitle);

  const deleteConfirmBox = document.createElement('div');
  deleteConfirmBox.className = 'oc-profiles-delete-confirm';
  deleteConfirmBox.style.display = 'none';
  mainHeader.appendChild(deleteConfirmBox);

  const deleteConfirmText = document.createElement('p');
  deleteConfirmText.className = 'oc-profiles-delete-confirm-text';
  deleteConfirmBox.appendChild(deleteConfirmText);

  const deleteConfirmActions = document.createElement('div');
  deleteConfirmActions.className = 'oc-profiles-form-actions';
  deleteConfirmBox.appendChild(deleteConfirmActions);

  const deleteConfirmBtn = mountButton(deleteConfirmActions, {
    label: 'Delete profile',
    variant: 'destructive',
    size: 'xs',
    onClick: () => {
      if (deletingProfileId && lastHandlers) {
        lastHandlers.deleteProfile(deletingProfileId);
      }
      isConfirmingDelete = false;
      deletingProfileId = null;
      rerender();
    },
  });

  const deleteCancelBtn = mountButton(deleteConfirmActions, {
    label: 'Cancel',
    variant: 'ghost',
    size: 'xs',
    onClick: () => {
      isConfirmingDelete = false;
      deletingProfileId = null;
      rerender();
    },
  });

  // Add folder panel
  const addFolderPanel = document.createElement('div');
  addFolderPanel.className = 'oc-profiles-add-panel';
  addFolderPanel.style.display = 'none';
  main.appendChild(addFolderPanel);

  const addFolderPanelHeader = document.createElement('div');
  addFolderPanelHeader.className = 'oc-profiles-add-panel-header';
  addFolderPanel.appendChild(addFolderPanelHeader);

  const addFolderPanelTitle = document.createElement('h3');
  addFolderPanelTitle.className = 'oc-profiles-add-panel-title';
  addFolderPanelHeader.appendChild(addFolderPanelTitle);

  const closeAddFolderPanel = () => {
    isAddFolderOpen = false;
    searchPickableQuery = '';
    typedPathDraft = '';
    typedPathError = undefined;
    rerender();
  };

  const addFolderCloseBtn = mountButton(addFolderPanelHeader, {
    label: 'Cancel',
    variant: 'ghost',
    size: 'xs',
    onClick: closeAddFolderPanel,
  });

  const pickableSection = document.createElement('div');
  pickableSection.className = 'oc-profiles-add-section';
  addFolderPanel.appendChild(pickableSection);

  const pickableLabel = document.createElement('span');
  pickableLabel.className = 'oc-profiles-add-section-label';
  pickableLabel.textContent = 'Registered projects';
  pickableSection.appendChild(pickableLabel);

  const pickableSearchWrap = document.createElement('div');
  pickableSection.appendChild(pickableSearchWrap);

  const addFolderSearch = mountSearchField(pickableSearchWrap, {
    placeholder: 'Filter projects…',
    value: '',
    onChange: (val) => {
      searchPickableQuery = val;
      if (lastState && lastHandlers) {
        updatePickableList(lastState, lastHandlers);
      }
    },
  });

  const pickableListWrap = document.createElement('div');
  pickableListWrap.className = 'oc-profiles-pickable-list-wrap';
  pickableSection.appendChild(pickableListWrap);

  const addFolderList = mountList(pickableListWrap, {
    items: [],
    emptyText: 'No matching projects',
    onSelect: (path: string) => {
      lastHandlers?.addFolder(path);
      closeAddFolderPanel();
    },
  });

  const pickableEmptyHint = document.createElement('p');
  pickableEmptyHint.className = 'oc-profiles-empty-hint';
  pickableEmptyHint.textContent = 'All registered projects are already in this profile';
  pickableEmptyHint.style.display = 'none';
  pickableSection.appendChild(pickableEmptyHint);

  const addFolderSepWrap = document.createElement('div');
  addFolderPanel.appendChild(addFolderSepWrap);
  const addFolderSep = mountSeparator(addFolderSepWrap, { label: 'or' });

  const typedSection = document.createElement('div');
  typedSection.className = 'oc-profiles-add-section';
  addFolderPanel.appendChild(typedSection);

  const typedRow = document.createElement('div');
  typedRow.className = 'oc-profiles-typed-row';
  typedSection.appendChild(typedRow);

  const typedFieldWrap = document.createElement('div');
  typedRow.appendChild(typedFieldWrap);

  const submitTypedPath = () => {
    const trimmed = typedPathDraft.trim();
    if (!isAbsolutePath(trimmed)) {
      typedPathError = 'Use an absolute path, e.g. /Users/me/project';
      addFolderTypedField.update({ error: typedPathError });
      return;
    }
    lastHandlers?.addFolder(trimmed);
    closeAddFolderPanel();
  };

  const addFolderTypedField = mountTextField(typedFieldWrap, {
    label: 'Or type a folder path',
    placeholder: '/path/to/folder or C:\\path\\to\\folder',
    mono: true,
    value: '',
    onChange: (val) => {
      typedPathDraft = val;
      typedPathError = undefined;
      addFolderTypedField.update({ value: val, error: undefined });
    },
  });

  typedFieldWrap.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitTypedPath();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closeAddFolderPanel();
    }
  });

  const addFolderTypedBtn = mountButton(typedRow, {
    label: 'Add path',
    variant: 'secondary',
    size: 'sm',
    onClick: submitTypedPath,
  });

  const updatePickableList = (state: ViewState, _handlers: ViewHandlers) => {
    const q = searchPickableQuery.trim().toLowerCase();
    const items = state.vm.pickable
      .filter((p) => !q || p.name.toLowerCase().includes(q) || p.path.toLowerCase().includes(q))
      .map((p) => ({
        id: p.path,
        title: p.name,
        subtitle: p.path,
      }));

    if (state.vm.pickable.length === 0) {
      pickableSearchWrap.style.display = 'none';
      pickableListWrap.style.display = 'none';
      pickableEmptyHint.style.display = '';
    } else {
      pickableSearchWrap.style.display = '';
      pickableListWrap.style.display = '';
      pickableEmptyHint.style.display = 'none';
      addFolderList.update({ items });
    }
  };

  // Profile folders (config rows)
  const foldersLabel = document.createElement('div');
  foldersLabel.className = 'oc-profiles-section-label';
  foldersLabel.textContent = 'Folders in this profile';
  main.appendChild(foldersLabel);

  const foldersEmpty = document.createElement('p');
  foldersEmpty.className = 'oc-profiles-empty-hint';
  foldersEmpty.textContent = 'No folders yet. Use "+ Add folder" to pick a project or type a path.';
  main.appendChild(foldersEmpty);

  const foldersContainer = document.createElement('div');
  foldersContainer.className = 'oc-profiles-content';
  main.appendChild(foldersContainer);

  // Unassigned
  const unassignedLabel = document.createElement('div');
  unassignedLabel.className = 'oc-profiles-section-label';
  main.appendChild(unassignedLabel);

  const unassignedEmpty = document.createElement('p');
  unassignedEmpty.className = 'oc-profiles-empty-hint';
  unassignedEmpty.textContent = 'Every project is in a profile.';
  main.appendChild(unassignedEmpty);

  const unassignedContainer = document.createElement('div');
  unassignedContainer.className = 'oc-profiles-content';
  main.appendChild(unassignedContainer);

  let corruptBanner: BannerHandle | null = null;
  let errorBanner: BannerHandle | null = null;
  let spinnerHandle: SpinnerHandle | null = null;
  let emptyProfileHandle: EmptyHandle | null = null;

  const folderCardPool = new Map<string, FolderCardHandle>();
  const folderRowPool = new Map<string, FolderRowHandle>();
  const unassignedCardPool = new Map<string, UnassignedCardHandle>();

  const render = (state: ViewState, handlers: ViewHandlers) => {
    lastState = state;
    lastHandlers = handlers;

    if (renamingProfileId && renamingProfileId !== state.vm.activeProfile.id) {
      isRenamingProfile = false;
      renamingProfileId = null;
    }
    if (deletingProfileId && deletingProfileId !== state.vm.activeProfile.id) {
      isConfirmingDelete = false;
      deletingProfileId = null;
    }

    // Banners
    if (state.corrupt) {
      const corruptBody =
        "Saved profiles couldn't be read. Showing defaults; nothing is overwritten until you make a change.";
      if (!corruptBanner) {
        corruptBanner = mountBanner(bannerSlot, {
          tone: 'warning',
          title: 'Profiles read warning',
          body: corruptBody,
        });
      } else {
        corruptBanner.update({ body: corruptBody });
      }
    } else if (corruptBanner) {
      corruptBanner.dispose();
      corruptBanner = null;
    }

    if (state.status === 'error') {
      const errorBody = state.error || 'An unexpected error occurred loading profiles.';
      if (!errorBanner) {
        errorBanner = mountBanner(bannerSlot, {
          tone: 'error',
          title: 'Unable to load profiles',
          body: errorBody,
        });
      } else {
        errorBanner.update({ body: errorBody });
      }
    } else if (errorBanner) {
      errorBanner.dispose();
      errorBanner = null;
    }

    viewTabs.update({ activeId: currentView });

    // Loading
    if (state.status === 'loading') {
      if (!spinnerHandle) {
        spinnerHandle = mountSpinner(loadingSlot, { label: 'Loading profiles and projects…' });
      }
      projectsView.style.display = 'none';
      settingsView.style.display = 'none';
      return;
    }
    if (spinnerHandle) {
      spinnerHandle.dispose();
      spinnerHandle = null;
    }

    const active = state.vm.activeProfile;

    if (currentView === 'projects') {
      projectsView.style.display = '';
      settingsView.style.display = 'none';

      profileSelect.update({
        options: state.vm.profiles.map((p) => ({ id: p.id, label: p.name })),
        value: active.id,
      });
      modeTabs.update({ activeId: active.sessionMode });

      // Dispose settings-only pools
      for (const r of folderRowPool.values()) r.dispose();
      folderRowPool.clear();
      for (const c of unassignedCardPool.values()) c.dispose();
      unassignedCardPool.clear();

      if (active.folders.length === 0) {
        for (const card of folderCardPool.values()) card.dispose();
        folderCardPool.clear();
        const emptyProps = {
          title: 'No folders yet',
          body: 'Add project folders to this profile in Settings.',
          action: {
            label: 'Open Settings',
            onClick: () => {
              currentView = 'settings';
              rerender();
            },
          },
        };
        if (!emptyProfileHandle) {
          emptyProfileHandle = mountEmpty(projectsContent, emptyProps);
        } else {
          emptyProfileHandle.update(emptyProps);
        }
      } else {
        if (emptyProfileHandle) {
          emptyProfileHandle.dispose();
          emptyProfileHandle = null;
        }
        const currentPaths = new Set(active.folders.map((f) => f.path));
        for (const [path, card] of folderCardPool) {
          if (!currentPaths.has(path)) {
            card.dispose();
            folderCardPool.delete(path);
          }
        }
        for (const folder of active.folders) {
          let card = folderCardPool.get(folder.path);
          if (!card) {
            card = createFolderCard(folder, handlers, active.sessionMode);
            folderCardPool.set(folder.path, card);
          } else {
            card.element.style.display = '';
            card.update(folder, handlers, active.sessionMode);
          }
          projectsContent.appendChild(card.element);
        }
      }
      return;
    }

    // Settings view
    projectsView.style.display = 'none';
    settingsView.style.display = '';

    for (const card of folderCardPool.values()) card.dispose();
    folderCardPool.clear();
    if (emptyProfileHandle) {
      emptyProfileHandle.dispose();
      emptyProfileHandle = null;
    }

    profilesList.update({
      items: state.vm.profiles.map((p) => ({
        id: p.id,
        title: p.name,
        meta: p.folderCount === 1 ? '1 folder' : `${p.folderCount} folders`,
        badge: p.active ? { label: 'selected', tone: 'primary' as Tone } : undefined,
      })),
      selectedId: active.id,
    });

    if (isCreatingProfile) {
      newProfileButtonWrap.style.display = 'none';
      newProfileFormWrap.style.display = '';
      newProfileTextField.update({ value: newProfileDraft, error: newProfileError });
      newProfileCreateBtn.update({ disabled: !newProfileDraft.trim() });
    } else {
      newProfileButtonWrap.style.display = '';
      newProfileFormWrap.style.display = 'none';
    }

    if (isRenamingProfile && renamingProfileId === active.id) {
      mainTitle.style.display = 'none';
      renameForm.style.display = '';
      renameSaveBtn.update({ disabled: !renameDraft.trim() });
      renameBtn.update({ disabled: true });
      deleteBtn.update({ disabled: true });
    } else {
      mainTitle.style.display = '';
      mainTitle.textContent = active.name;
      renameForm.style.display = 'none';
      renameBtn.update({ disabled: false });
      deleteBtn.update({ disabled: false });
    }

    if (isConfirmingDelete && deletingProfileId === active.id) {
      deleteConfirmBox.style.display = '';
      const isOnlyProfile = state.vm.profiles.length === 1;
      deleteConfirmText.textContent = isOnlyProfile
        ? `Delete "${active.name}"? Its folders move to Unassigned unless another profile holds them. Projects aren't touched. This is your last profile, so it will reset to an empty Default profile.`
        : `Delete "${active.name}"? Its folders move to Unassigned unless another profile holds them. Projects aren't touched.`;
    } else {
      deleteConfirmBox.style.display = 'none';
    }

    const count = active.folders.length;
    mainSubtitle.textContent = `${count} ${count === 1 ? 'project folder' : 'project folders'}`;

    if (isAddFolderOpen) {
      addFolderPanel.style.display = '';
      addFolderPanelTitle.textContent = `Add folder to ${active.name}`;
      addFolderBtn.update({ label: '✕ Close add' });
      addFolderSearch.update({ value: searchPickableQuery });
      updatePickableList(state, handlers);
      addFolderTypedField.update({ value: typedPathDraft, error: typedPathError });
    } else {
      addFolderPanel.style.display = 'none';
      addFolderBtn.update({ label: '+ Add folder' });
    }

    // Folder rows
    foldersEmpty.style.display = count === 0 ? '' : 'none';
    const rowPaths = new Set(active.folders.map((f) => f.path));
    for (const [path, r] of folderRowPool) {
      if (!rowPaths.has(path)) {
        r.dispose();
        folderRowPool.delete(path);
      }
    }
    for (const folder of active.folders) {
      let r = folderRowPool.get(folder.path);
      if (!r) {
        r = createFolderRow(folder, handlers);
        folderRowPool.set(folder.path, r);
      } else {
        r.update(folder, handlers);
      }
      foldersContainer.appendChild(r.element);
    }

    // Unassigned
    const uCount = state.vm.unassigned.length;
    unassignedLabel.textContent = `Unassigned projects (${uCount})`;
    unassignedEmpty.style.display = uCount === 0 ? '' : 'none';
    const uPaths = new Set(state.vm.unassigned.map((u) => u.path));
    for (const [path, card] of unassignedCardPool) {
      if (!uPaths.has(path)) {
        card.dispose();
        unassignedCardPool.delete(path);
      }
    }
    for (const item of state.vm.unassigned) {
      let card = unassignedCardPool.get(item.path);
      if (!card) {
        card = createUnassignedCard(item, state.vm.profiles, handlers);
        unassignedCardPool.set(item.path, card);
      } else {
        card.update(item, state.vm.profiles, handlers);
      }
      unassignedContainer.appendChild(card.element);
    }
  };

  return {
    render,
    dispose: () => {
      viewTabs.dispose();
      profileSelect.dispose();
      modeTabs.dispose();
      profilesList.dispose();
      newProfileButton.dispose();
      newProfileTextField.dispose();
      newProfileCreateBtn.dispose();
      newProfileCancelBtn.dispose();

      renameSaveBtn.dispose();
      renameCancelBtn.dispose();
      renameBtn.dispose();
      deleteBtn.dispose();
      addFolderBtn.dispose();
      deleteConfirmBtn.dispose();
      deleteCancelBtn.dispose();

      addFolderCloseBtn.dispose();
      addFolderSearch.dispose();
      addFolderList.dispose();
      addFolderSep.dispose();
      addFolderTypedField.dispose();
      addFolderTypedBtn.dispose();

      corruptBanner?.dispose();
      corruptBanner = null;
      errorBanner?.dispose();
      errorBanner = null;
      spinnerHandle?.dispose();
      spinnerHandle = null;
      emptyProfileHandle?.dispose();
      emptyProfileHandle = null;

      for (const card of folderCardPool.values()) card.dispose();
      folderCardPool.clear();
      for (const r of folderRowPool.values()) r.dispose();
      folderRowPool.clear();
      for (const card of unassignedCardPool.values()) card.dispose();
      unassignedCardPool.clear();

      appContainer.remove();
    },
  };
};
