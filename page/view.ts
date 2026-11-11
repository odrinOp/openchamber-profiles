import type { ViewModel, FolderView, UnassignedView, Activity } from '../src/core/index.ts';
import {
  mountBadge,
  mountBanner,
  mountButton,
  mountEmpty,
  mountList,
  mountSeparator,
  mountSpinner,
  type BannerHandle,
  type ButtonHandle,
  type EmptyHandle,
  type Handle,
  type ListHandle,
  type SeparatorHandle,
  type SpinnerHandle,
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
  addToActiveProfile(path: string): void; // Unassigned row action
  removeFolder(path: string): void; // folder card action
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
  update(folder: FolderView, handlers: ViewHandlers): void;
  dispose(): void;
};

type SessionRow = {
  element: HTMLElement;
  titleEl: HTMLElement;
  badgeHandle: Handle<{ label: string; tone?: Tone }>;
  timeEl: HTMLElement;
};

const createFolderCard = (initialFolder: FolderView, initialHandlers: ViewHandlers): FolderCardHandle => {
  const card = document.createElement('div');
  card.className = 'oc-profiles-folder-card';

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

  titleRow.appendChild(statusDot);
  titleRow.appendChild(basename);

  const pathEl = document.createElement('span');
  pathEl.className = 'oc-profiles-folder-path';

  meta.appendChild(titleRow);
  meta.appendChild(pathEl);

  const actions = document.createElement('div');
  actions.className = 'oc-profiles-folder-actions';

  const removeButton = mountButton(actions, {
    label: 'Remove',
    variant: 'ghost',
    size: 'xs',
    onClick: () => initialHandlers.removeFolder(initialFolder.path),
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

  const update = (folder: FolderView, handlers: ViewHandlers) => {
    // Status dot
    statusDot.dataset.status = folder.attention;
    statusDot.setAttribute('title', `Status: ${folder.attention}`);
    statusDot.setAttribute('aria-label', `Status: ${folder.attention}`);

    // Basename and path
    basename.textContent = getFolderBasename(folder.path);
    basename.title = folder.path;
    pathEl.textContent = folder.path;
    pathEl.title = folder.path;

    // Remove button handler
    removeButton.update({
      onClick: () => handlers.removeFolder(folder.path),
    });

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
      if (!sessionsContainer.parentElement) {
        card.appendChild(sessionsContainer);
      }

      if (folder.sessions.length === 0) {
        emptySessions.style.display = '';
        sessionsList.style.display = 'none';
        moreSessions.style.display = 'none';
      } else {
        emptySessions.style.display = 'none';
        sessionsList.style.display = '';

        // Grow rows if needed
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
          actionSlot.setAttribute('aria-hidden', 'true');
          trail.appendChild(actionSlot);

          rowEl.appendChild(lead);
          rowEl.appendChild(trail);
          sessionsList.appendChild(rowEl);

          sessionRows.push({
            element: rowEl,
            titleEl: sTitle,
            badgeHandle,
            timeEl: sTime,
          });
        }

        // Shrink rows if needed
        while (sessionRows.length > folder.sessions.length) {
          const removed = sessionRows.pop()!;
          removed.badgeHandle.dispose();
          removed.element.remove();
        }

        // Update each row
        folder.sessions.forEach((session, i) => {
          const row = sessionRows[i]!;
          row.titleEl.textContent = session.title || 'Untitled session';
          row.titleEl.title = session.title || 'Untitled session';
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

  update(initialFolder, initialHandlers);

  return {
    element: card,
    update,
    dispose: () => {
      removeButton.dispose();
      for (const row of sessionRows) {
        row.badgeHandle.dispose();
      }
      sessionRows = [];
      card.remove();
    },
  };
};

type UnassignedCardHandle = {
  element: HTMLElement;
  update(item: UnassignedView, activeProfileName: string, handlers: ViewHandlers): void;
  dispose(): void;
};

const createUnassignedCard = (
  initialItem: UnassignedView,
  initialActiveName: string,
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

  const addButton = mountButton(actions, {
    label: `Add to ${initialActiveName}`,
    variant: 'secondary',
    size: 'sm',
    onClick: () => initialHandlers.addToActiveProfile(initialItem.path),
  });

  card.appendChild(info);
  card.appendChild(actions);

  const update = (item: UnassignedView, activeProfileName: string, handlers: ViewHandlers) => {
    nameEl.textContent = item.name;
    pathEl.textContent = item.path;
    pathEl.title = item.path;
    addButton.update({
      label: `Add to ${activeProfileName}`,
      onClick: () => handlers.addToActiveProfile(item.path),
    });
  };

  update(initialItem, initialActiveName, initialHandlers);

  return {
    element: card,
    update,
    dispose: () => {
      addButton.dispose();
      card.remove();
    },
  };
};

export const mountApp = (root: HTMLElement): App => {
  ensureViewStyle(VIEW_CSS);

  let lastState: ViewState | null = null;
  let lastHandlers: ViewHandlers | null = null;
  let currentNav: { kind: 'profile' } | { kind: 'unassigned' } = { kind: 'profile' };

  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }

  const appContainer = document.createElement('div');
  appContainer.className = 'oc-profiles-app oc-sdk';
  root.appendChild(appContainer);

  // Sidebar (Left column)
  const sidebar = document.createElement('aside');
  sidebar.className = 'oc-profiles-sidebar';
  appContainer.appendChild(sidebar);

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
      currentNav = { kind: 'profile' };
      lastHandlers?.selectProfile(id);
      if (lastState && lastHandlers) {
        render(lastState, lastHandlers);
      }
    },
  });

  // Visually reserved spot for "+ New profile" (Milestone 4)
  const reservedWrap = document.createElement('div');
  reservedWrap.className = 'oc-profiles-sidebar-reserved';
  sidebar.appendChild(reservedWrap);

  const newProfileButton = mountButton(reservedWrap, {
    label: '+ New profile',
    variant: 'ghost',
    size: 'sm',
    disabled: true,
    onClick: () => {},
  });

  const reservedHint = document.createElement('span');
  reservedHint.className = 'oc-profiles-sidebar-reserved-hint';
  reservedHint.textContent = 'New profile coming in M4';
  reservedWrap.appendChild(reservedHint);

  const sepWrap = document.createElement('div');
  sidebar.appendChild(sepWrap);
  const sep = mountSeparator(sepWrap, { label: 'Library' });

  const unassignedNavWrap = document.createElement('div');
  unassignedNavWrap.className = 'oc-profiles-sidebar-section';
  sidebar.appendChild(unassignedNavWrap);

  const unassignedList = mountList(unassignedNavWrap, {
    items: [],
    ariaLabel: 'Unassigned library',
    onSelect: () => {
      currentNav = { kind: 'unassigned' };
      if (lastState && lastHandlers) {
        render(lastState, lastHandlers);
      }
    },
  });

  // Main area
  const main = document.createElement('main');
  main.className = 'oc-profiles-main';
  appContainer.appendChild(main);

  const mainHeader = document.createElement('header');
  mainHeader.className = 'oc-profiles-main-header';
  const mainTitle = document.createElement('h1');
  mainTitle.className = 'oc-profiles-main-title';
  const mainSubtitle = document.createElement('p');
  mainSubtitle.className = 'oc-profiles-main-subtitle';
  mainHeader.appendChild(mainTitle);
  mainHeader.appendChild(mainSubtitle);
  main.appendChild(mainHeader);

  const bannerSlot = document.createElement('div');
  bannerSlot.className = 'oc-profiles-banner-slot';
  main.appendChild(bannerSlot);

  const contentArea = document.createElement('section');
  contentArea.className = 'oc-profiles-content';
  main.appendChild(contentArea);

  let corruptBanner: BannerHandle | null = null;
  let errorBanner: BannerHandle | null = null;
  let spinnerHandle: SpinnerHandle | null = null;
  let emptyProfileHandle: EmptyHandle | null = null;
  let emptyUnassignedHandle: EmptyHandle | null = null;

  const folderCardPool = new Map<string, FolderCardHandle>();
  const unassignedCardPool = new Map<string, UnassignedCardHandle>();

  const render = (state: ViewState, handlers: ViewHandlers) => {
    lastState = state;
    lastHandlers = handlers;

    // 1. Corrupt state banner
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

    // 2. Error banner
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

    // 3. Sidebar lists update
    const profileItems = state.vm.profiles.map((p) => ({
      id: p.id,
      title: p.name,
      meta: p.folderCount === 1 ? '1 folder' : `${p.folderCount} folders`,
      badge: p.active ? { label: 'active', tone: 'primary' as Tone } : undefined,
    }));

    profilesList.update({
      items: profileItems,
      selectedId: currentNav.kind === 'profile' ? state.vm.activeProfile.id : null,
    });

    unassignedList.update({
      items: [
        {
          id: 'unassigned',
          title: 'Unassigned',
          meta: String(state.vm.unassigned.length),
        },
      ],
      selectedId: currentNav.kind === 'unassigned' ? 'unassigned' : null,
    });

    // 4. Loading state handling
    if (state.status === 'loading') {
      if (!spinnerHandle) {
        spinnerHandle = mountSpinner(contentArea, {
          label: 'Loading profiles and projects…',
        });
      }
      // Hide cards and empties while loading
      for (const card of folderCardPool.values()) card.element.style.display = 'none';
      for (const card of unassignedCardPool.values()) card.element.style.display = 'none';
      if (emptyProfileHandle) {
        emptyProfileHandle.dispose();
        emptyProfileHandle = null;
      }
      if (emptyUnassignedHandle) {
        emptyUnassignedHandle.dispose();
        emptyUnassignedHandle = null;
      }
      mainTitle.textContent = 'Loading…';
      mainSubtitle.textContent = '';
      return;
    }

    if (spinnerHandle) {
      spinnerHandle.dispose();
      spinnerHandle = null;
    }

    // 5. Profile view
    if (currentNav.kind === 'profile') {
      const active = state.vm.activeProfile;
      mainTitle.textContent = active.name;
      const count = active.folders.length;
      mainSubtitle.textContent = `${count} ${count === 1 ? 'project folder' : 'project folders'}`;

      // Dispose unassigned cards and empty unassigned
      for (const card of unassignedCardPool.values()) {
        card.dispose();
      }
      unassignedCardPool.clear();
      if (emptyUnassignedHandle) {
        emptyUnassignedHandle.dispose();
        emptyUnassignedHandle = null;
      }

      if (count === 0) {
        // Dispose any active folder cards
        for (const card of folderCardPool.values()) {
          card.dispose();
        }
        folderCardPool.clear();

        const emptyProps = {
          title: 'No folders yet',
          body: 'Add some from Unassigned.',
          action:
            state.vm.unassigned.length > 0
              ? {
                  label: 'View Unassigned',
                  onClick: () => {
                    currentNav = { kind: 'unassigned' };
                    render(state, handlers);
                  },
                }
              : undefined,
        };

        if (!emptyProfileHandle) {
          emptyProfileHandle = mountEmpty(contentArea, emptyProps);
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
            card = createFolderCard(folder, handlers);
            folderCardPool.set(folder.path, card);
          } else {
            card.element.style.display = '';
            card.update(folder, handlers);
          }
          contentArea.appendChild(card.element);
        }
      }
      return;
    }

    // 6. Unassigned view
    if (currentNav.kind === 'unassigned') {
      mainTitle.textContent = 'Unassigned projects';
      const uCount = state.vm.unassigned.length;
      mainSubtitle.textContent = `Projects in OpenChamber not included in any profile (${uCount})`;

      // Dispose folder cards and empty profile
      for (const card of folderCardPool.values()) {
        card.dispose();
      }
      folderCardPool.clear();
      if (emptyProfileHandle) {
        emptyProfileHandle.dispose();
        emptyProfileHandle = null;
      }

      if (uCount === 0) {
        for (const card of unassignedCardPool.values()) {
          card.dispose();
        }
        unassignedCardPool.clear();

        const emptyProps = {
          title: 'Every project is in a profile.',
          body: 'All registered projects in OpenChamber belong to at least one profile.',
        };

        if (!emptyUnassignedHandle) {
          emptyUnassignedHandle = mountEmpty(contentArea, emptyProps);
        } else {
          emptyUnassignedHandle.update(emptyProps);
        }
      } else {
        if (emptyUnassignedHandle) {
          emptyUnassignedHandle.dispose();
          emptyUnassignedHandle = null;
        }

        const currentPaths = new Set(state.vm.unassigned.map((u) => u.path));
        for (const [path, card] of unassignedCardPool) {
          if (!currentPaths.has(path)) {
            card.dispose();
            unassignedCardPool.delete(path);
          }
        }

        for (const item of state.vm.unassigned) {
          let card = unassignedCardPool.get(item.path);
          if (!card) {
            card = createUnassignedCard(item, state.vm.activeProfile.name, handlers);
            unassignedCardPool.set(item.path, card);
          } else {
            card.element.style.display = '';
            card.update(item, state.vm.activeProfile.name, handlers);
          }
          contentArea.appendChild(card.element);
        }
      }
    }
  };

  return {
    render,
    dispose: () => {
      profilesList.dispose();
      newProfileButton.dispose();
      sep.dispose();
      unassignedList.dispose();

      if (corruptBanner) {
        corruptBanner.dispose();
        corruptBanner = null;
      }
      if (errorBanner) {
        errorBanner.dispose();
        errorBanner = null;
      }
      if (spinnerHandle) {
        spinnerHandle.dispose();
        spinnerHandle = null;
      }
      if (emptyProfileHandle) {
        emptyProfileHandle.dispose();
        emptyProfileHandle = null;
      }
      if (emptyUnassignedHandle) {
        emptyUnassignedHandle.dispose();
        emptyUnassignedHandle = null;
      }

      for (const card of folderCardPool.values()) {
        card.dispose();
      }
      folderCardPool.clear();

      for (const card of unassignedCardPool.values()) {
        card.dispose();
      }
      unassignedCardPool.clear();

      appContainer.remove();
    },
  };
};
