import {
  isAbsolutePath,
  type ViewModel,
  type FolderView,
  type UnassignedView,
  type Activity,
} from '../src/core/index.ts';
import {
  mountBadge,
  mountBanner,
  mountButton,
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
  addFolder(path: string, profileId?: string): void; // omit profileId = active profile
  removeFolder(path: string): void; // from the active profile
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

        while (sessionRows.length > folder.sessions.length) {
          const removed = sessionRows.pop()!;
          removed.badgeHandle.dispose();
          removed.element.remove();
        }

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

export const mountApp = (root: HTMLElement): App => {
  ensureViewStyle(VIEW_CSS);

  let lastState: ViewState | null = null;
  let lastHandlers: ViewHandlers | null = null;
  let currentNav: { kind: 'profile' } | { kind: 'unassigned' } = { kind: 'profile' };

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

  // "+ New profile" section
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
    if (lastState && lastHandlers) {
      render(lastState, lastHandlers);
    }
  };

  const cancelCreateProfile = () => {
    isCreatingProfile = false;
    newProfileDraft = '';
    newProfileError = undefined;
    if (lastState && lastHandlers) {
      render(lastState, lastHandlers);
    }
  };

  const newProfileButton = mountButton(newProfileButtonWrap, {
    label: '+ New profile',
    variant: 'ghost',
    size: 'sm',
    onClick: () => {
      isCreatingProfile = true;
      newProfileDraft = '';
      newProfileError = undefined;
      if (lastState && lastHandlers) {
        render(lastState, lastHandlers);
      }
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
  main.appendChild(mainHeader);

  const headerTop = document.createElement('div');
  headerTop.className = 'oc-profiles-header-top';
  mainHeader.appendChild(headerTop);

  const headerTitleRow = document.createElement('div');
  headerTitleRow.className = 'oc-profiles-header-title-row';
  headerTop.appendChild(headerTitleRow);

  const mainTitle = document.createElement('h1');
  mainTitle.className = 'oc-profiles-main-title';
  headerTitleRow.appendChild(mainTitle);

  // Rename form container
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
    if (lastState && lastHandlers) {
      render(lastState, lastHandlers);
    }
  };

  const cancelRename = () => {
    isRenamingProfile = false;
    renamingProfileId = null;
    if (lastState && lastHandlers) {
      render(lastState, lastHandlers);
    }
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

  // Header actions (Rename, Delete, Add Folder)
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
      if (lastState && lastHandlers) {
        render(lastState, lastHandlers);
      }
    },
  });

  const mainSubtitle = document.createElement('p');
  mainSubtitle.className = 'oc-profiles-main-subtitle';
  mainHeader.appendChild(mainSubtitle);

  // Delete confirmation box
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
      if (lastState && lastHandlers) {
        render(lastState, lastHandlers);
      }
    },
  });

  const deleteCancelBtn = mountButton(deleteConfirmActions, {
    label: 'Cancel',
    variant: 'ghost',
    size: 'xs',
    onClick: () => {
      isConfirmingDelete = false;
      deletingProfileId = null;
      if (lastState && lastHandlers) {
        render(lastState, lastHandlers);
      }
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
    if (lastState && lastHandlers) {
      render(lastState, lastHandlers);
    }
  };

  const addFolderCloseBtn = mountButton(addFolderPanelHeader, {
    label: 'Cancel',
    variant: 'ghost',
    size: 'xs',
    onClick: closeAddFolderPanel,
  });

  // Section (a): Registered projects
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

  // Section (b): Typed path
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

    // Reset profile-specific editing states if active profile changed
    if (renamingProfileId && renamingProfileId !== state.vm.activeProfile.id) {
      isRenamingProfile = false;
      renamingProfileId = null;
    }
    if (deletingProfileId && deletingProfileId !== state.vm.activeProfile.id) {
      isConfirmingDelete = false;
      deletingProfileId = null;
    }

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

    // New profile form toggle
    if (isCreatingProfile) {
      newProfileButtonWrap.style.display = 'none';
      newProfileFormWrap.style.display = '';
      newProfileTextField.update({ value: newProfileDraft, error: newProfileError });
      newProfileCreateBtn.update({ disabled: !newProfileDraft.trim() });
    } else {
      newProfileButtonWrap.style.display = '';
      newProfileFormWrap.style.display = 'none';
    }

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
      headerActions.style.display = 'none';
      addFolderPanel.style.display = 'none';
      return;
    }

    if (spinnerHandle) {
      spinnerHandle.dispose();
      spinnerHandle = null;
    }

    // 5. Profile view
    if (currentNav.kind === 'profile') {
      const active = state.vm.activeProfile;
      headerActions.style.display = '';

      // Inline rename UI
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

      // Inline delete confirmation UI
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

      // Add folder panel
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
        for (const card of folderCardPool.values()) {
          card.dispose();
        }
        folderCardPool.clear();

        const emptyProps = {
          title: 'No folders yet',
          body: 'Add some from Unassigned or choose a project above.',
          action: {
            label: '+ Add folder',
            onClick: () => {
              isAddFolderOpen = true;
              render(state, handlers);
            },
          },
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
      mainTitle.style.display = '';
      mainTitle.textContent = 'Unassigned projects';
      renameForm.style.display = 'none';
      deleteConfirmBox.style.display = 'none';
      headerActions.style.display = 'none';
      addFolderPanel.style.display = 'none';

      const uCount = state.vm.unassigned.length;
      mainSubtitle.textContent = `Projects in OpenChamber not included in any profile (${uCount})`;

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
            card = createUnassignedCard(item, state.vm.profiles, handlers);
            unassignedCardPool.set(item.path, card);
          } else {
            card.element.style.display = '';
            card.update(item, state.vm.profiles, handlers);
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
      newProfileTextField.dispose();
      newProfileCreateBtn.dispose();
      newProfileCancelBtn.dispose();
      sep.dispose();
      unassignedList.dispose();

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
