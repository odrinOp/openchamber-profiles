# OpenChamber Profiles — plan

An OpenChamber extension that groups folders into **profiles** (e.g. `work`, `personal`) and shows only the active profile's projects and sessions. Sessions are separated naturally because OpenChamber/OpenCode sessions belong to a project directory.

Status: building (branch `feat/profiles-v1`). Approach **A** (documented APIs only) is in scope. A time-boxed spike on **B** happens after milestone 3. Approach C is out of scope (see "Not in scope").

## Decisions (from the grill session)

- **Scope**: A first; spike B after milestone 3 and decide whether it replaces or extends A.
- **Identity**: profiles store absolute folder **paths** (source of truth); matched to projects by `project.directory` or one of the project's worktrees. Paths allow the "not added" state.
- **Storage**: everything at **instance scope** (`host.storage`), including the active profile. No `deviceStorage` branch.
- **Membership**: a folder can be in **many profiles**. Folders in no profile appear in an **Unassigned** view (page only) with an "Add to profile" action per row.
- **First run**: an **empty "Default" profile**; everything starts Unassigned. No auto-import.
- **Adding folders**: a picker over `listProjects()` is the main path, with a **typed-path fallback** (produces the "not added" state).
- **Surfaces**: the **full-screen page ships first**. The Work Status section comes after, reusing the same `core` view-model.
- **File action**: "Move folder to profile" (`contributes.actions`, `where: "file"`) is **in v1**.
- **Cross-profile attention badge**: skipped; stays in "optional extras" after v1.

## Background (verified against SDK docs, OpenChamber 2.7.0)

- Projects are a global list in `~/.config/openchamber/settings.json` (`projects`, `activeProjectId`). The sidebar always shows all of them.
- Extensions can **read** projects/sessions/worktrees (`listProjects`, `listSessions`, `listWorktrees`, `onProjects`, `onSessions`, `onWorktrees`), start a session in a project (`startSession({ projectId })`), and open one (`openSession(id)`). Capability: `sessions` (no conversation content, no file access).
- Extensions **cannot** add/remove/hide projects, filter the sidebar, restart OpenCode, or change `OPENCODE_CONFIG`.
- Extension data lives in `host.storage` (instance scope: 64 KiB/value, 2 MiB/2000 keys per namespace) with no extra capability.
- Pages/status frames are sandboxed iframes: classic IIFE JS (no ESM), no network, UI kit from `@openchamber/sdk/ui`.
- Bundling (`openchamber-guest-bundle`) and checking (`openchamber-guest-check`) are Bun scripts. Bun is a devDependency so no global install is required; no runtime compiles TS, so built `.js` ships in the package.
- `contributes.capabilities`, `page` and `actions` all require `panel.entry` or `background.entry` (verified with `openchamber-guest-check`). So the page reuses `panel.entry` via `page: true`; this also adds a rail icon.
- `GuestFileItem` (file action payload): `{ kind: 'file', action, directory, path, isDirectory }` — `path` is absolute.

## Goal (v1)

1. Define multiple profiles, each with a name and a list of folder paths.
2. Choose an active profile.
3. See only the active profile's projects and sessions in the extension's UI, with live state.
4. Start a new session or open an existing one in one of the profile's projects.
5. See and assign Unassigned folders.
6. Move a folder to a profile from the Files view.

## Behaviour

- **Profile**: `{ id, name, folders: string[] }`. Folder = absolute path. A folder is registered when it equals a project's `directory` or one of that project's worktrees (`listWorktrees(projectId)`).
- **Folder states**:
  - *registered* — matches a project from `listProjects()`; shows sessions and actions.
  - *not added* — no matching project; shows hint "Add this folder as a project in the sidebar once". No action buttons.
- **Unassigned**: registered projects that appear in no profile. Page only. Each row has "Add to profile".
- **Active profile** stored in `host.storage` (instance). First run creates an empty "Default" profile.
- **Deleting a profile** does not touch projects; its folders become Unassigned unless another profile holds them.
- **Sessions per folder**: from `listSessions(projectId)`, excluding archived; capped at 20 per folder; show title, `activity` (running / waiting-permission / waiting-question / idle), relative `updatedAt`. Sub-sessions (`parentId`) hidden.
- **Actions**: New session (`startSession({ projectId, navigation: 'open' })`), Open (`openSession(id)`).
- **File action "Move folder to profile"**: receives a `GuestFileItem`; exact UX (background vs open mode, which profile) is decided in milestone 6 once the capability/entry constraints are tested.

## Surfaces

### 1. Full-screen page (`contributes.page`) — ships first
- Left: profile list, active badge, `+ New profile`, **Unassigned** entry.
- Right: per folder card with sessions and New session / Open buttons; `not added` state as above; `Edit folders` (picker + typed path), rename/delete profile.
- Opened from the sidebar's "Extension pages" menu.

### 2. Work Status section (`contributes.statusSection`) — after the page
- Header control: profile selector (`setStatusControls` select; guard with `features.statusControls`, fallback to an in-body select).
- Body: the active profile's folders with a status dot, name, session count.
- `entry` page (not `source`) because it needs `sessions` subscriptions and storage.

### 3. File action (`contributes.actions`, `where: "file"`)
- "Move folder to profile". Needs `panel.entry` or `background.entry`.

### 4. Optional extras (after v1)
- `setBadge` on the rail icon: sessions needing the user across all profiles.
- Dim or hide sessions of non-active profiles.

## Architecture

- No `service` in v1. Everything runs in page/status frames using `connectHost()`.
- Shared module `src/core` (pure TS, unit-tested): profile model, path matching (normalize trailing slashes, case-sensitivity per platform), storage schema + migration, view-model builder (profiles + projects + worktrees + sessions → UI model, incl. Unassigned).
- Entry points bundled with `openchamber-guest-bundle`: `page/main.ts` first; `status/main.ts` later. Both import `core`.
- UI built only with `@openchamber/sdk/ui` so it follows themes.

### Storage schema (`host.storage`, key `profiles.v1`)
```json
{ "version": 1, "activeId": "default", "profiles": [{ "id": "default", "name": "Default", "folders": [] }] }
```
Single key (small); validate on read; fall back to a default on corrupt data without overwriting until the user edits.

### Manifest sketch
```json
{
  "name": "openchamber-profiles",
  "version": "0.1.0",
  "type": "module",
  "openchamber": {
    "apiVersion": 1,
    "engines": { "openchamber": ">=2.7.0" },
    "id": "profiles",
    "name": "Profiles",
    "icon": "user-settings",
    "contributes": {
      "panel": { "entry": "page/index.html" },
      "capabilities": ["sessions"],
      "page": true
    }
  },
  "dependencies": { "@openchamber/sdk": "2.7.0" }
}
```
Exact keys confirmed by `openchamber-guest-check`.

## Milestones

1. **Scaffold** — package.json, SDK + Bun devDeps, manifest, empty page entry, bundle/check scripts, `openchamber-guest-check` passes, installs locally from folder.
2. **Core + storage** ✅ — profile model, path matching, storage read/write, view-model incl. Unassigned, unit tests (`bun test`).
3. **Read-only views** (+ minimal "Add to profile"/Remove so it is testable) ✅ — live projects/sessions via subscriptions; page renders the active profile; "not added" state; Unassigned view. *Then: time-boxed spike on approach B.*
4. **Editing** — create/rename/delete profile, add/remove folders (picker + typed path), Unassigned → "Add to profile", switch active profile.
5. **Actions** — New session, Open session.
6. **Status section + file action** — Work Status section (page logic reused); "Move folder to profile" file action.
7. **Polish** — empty states, errors (`state: 'error' | 'loading'`), keyboard/theme check, README with screenshots, CI running `openchamber-guest-check`.
8. **Publish** — commit built `.js`, tag `v0.1.0`, install-by-URL link, optionally submit to the community directory (feedback@openchamber.dev).

## Verification

- Subscription budget: the host allows 32 subscriptions per iframe. The page uses 1 for projects and 1 per project of the active profile for sessions (max 31); worktrees are fetched one-shot with `listWorktrees` and refreshed when projects change.
- Unit tests for `core` (path matching incl. worktrees, schema migration, view-model, Unassigned).
- `openchamber-guest-check` clean.
- Manual in OpenChamber: install from folder → switch profile → registered/not-added/Unassigned folders → start/open session → reload app and confirm persistence.
- Check behaviour with no projects, a missing folder, many sessions (cap 20 per folder), `loading`/`error` snapshots.

## Risks / open questions

- Sidebar is unchanged: users still see every project there. Set expectations in the README; the B spike decides if that's acceptable.
- Path matching edge cases (symlinks, case, worktrees outside the project folder).
- `features.statusControls` availability across 2.7.x builds (only matters from milestone 6).
- The rail icon/panel comes with `panel.entry` (needed for capabilities). Decide in milestone 6 whether the file action runs in `open` or `background` mode.

## Not in scope (possible later)

- **B — sidebar sync**: a service that rewrites `projects`/`activeProjectId` in `settings.json`. Undocumented, may be overwritten by the running server, needs a reload; spike in a scratch setup after milestone 3.
- **C — per-profile OpenCode config** (models, MCPs, skills): not possible from an extension today. Options: external tools like `opm`, or an upstream feature request/PR to `openchamber/openchamber`.

## References

- SDK API: https://github.com/openchamber/openchamber/blob/main/packages/sdk/API.md
- Guest services: https://github.com/openchamber/openchamber/blob/main/packages/sdk/GUEST_SERVICES.md
- Examples: https://github.com/openchamber/openchamber/tree/main/packages/sdk/examples
- Docs: https://docs.openchamber.dev/sdk/
