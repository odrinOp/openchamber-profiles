# OpenChamber Profiles — plan

An OpenChamber extension that groups folders into **profiles** (e.g. `work`, `personal`) and shows only the active profile's projects and sessions. Sessions are separated naturally because OpenChamber/OpenCode sessions belong to a project directory.

Status: planning. Approach **A** (documented APIs only) is in scope. Approaches B and C are out of scope for now (see "Not in scope").

## Background (verified against SDK docs, OpenChamber 2.7.0)

- Projects are a global list in `~/.config/openchamber/settings.json` (`projects`, `activeProjectId`). The sidebar always shows all of them.
- Extensions can **read** projects/sessions/worktrees (`listProjects`, `listSessions`, `listWorktrees`, `onProjects`, `onSessions`, `onWorktrees`), start a session in a project (`startSession({ projectId })`), and open one (`openSession(id)`). Capability: `sessions` (no conversation content, no file access).
- Extensions **cannot** add/remove/hide projects, filter the sidebar, restart OpenCode, or change `OPENCODE_CONFIG`.
- Extension data can live in `host.storage` (instance scope: 64 KiB/value, 2 MiB/2000 keys per namespace) with no extra capability.
- Pages/status frames are sandboxed iframes: classic IIFE JS, no network, UI kit from `@openchamber/sdk/ui`.

## Goal (v1)

1. Define multiple profiles, each with a name and a list of folder paths.
2. Choose an active profile.
3. See only the active profile's projects and sessions in the extension's UI, with live state.
4. Start a new session or open an existing one in one of the profile's projects.

## Behaviour

- **Profile**: `{ id, name, folders: string[] }`. Folder = absolute path. A folder maps to a registered project by matching `project.directory` (also match worktrees of that project).
- **Folder states**:
  - *registered* — matches a project from `listProjects()`; shows sessions and actions.
  - *not added* — no matching project; shows hint "Add this folder as a project in the sidebar once". No action buttons.
- **Active profile** stored in `host.storage`; first run creates a default profile. Optional per-device override via `{ scope: 'device' }` storage when `features.deviceStorage` is true (decide in implementation; default instance scope).
- **Sessions per folder**: from `listSessions(projectId)`, excluding archived by default; show title, `activity` (running / waiting-permission / waiting-question / idle), relative `updatedAt`. Sub-sessions (`parentId`) hidden.
- **Actions**: New session (`startSession({ projectId, navigation: 'open' })`), Open (`openSession(id)`).

## Surfaces

### 1. Work Status section (`contributes.statusSection`)
- Header control: profile selector (`setStatusControls` select; guard with `features.statusControls`, fallback to an in-body select).
- Body: list of the active profile's folders with a status dot, name, session count; dot shows running/waiting activity.
- Uses an `entry` page (not `source`) because it needs `sessions` subscriptions and storage.

### 2. Full-screen page (`contributes.page`)
- Left: profile list, active badge, `+ New profile`.
- Right: per folder card with sessions and New session / Open buttons; `not added` state as above; `Edit folders` to add/remove paths, rename/delete profile.
- Opened from the sidebar's "Extension pages" menu.

### 3. Optional extras (after v1)
- `setBadge` on the rail icon: count of sessions in the active profile that need the user (waiting-permission / waiting-question / unread).
- Dim or hide sessions of non-active profiles.
- `actions` with `where: "file"`: "Move folder to profile".

## Architecture

- No `service` in v1. Everything runs in the page/status frames using `connectHost()`.
- Shared module `src/core` (pure TS, unit-tested): profile model, path matching (normalize trailing slashes, case-sensitivity per platform, `~` expansion not needed), storage schema + migration, view-model builder (profiles + projects + sessions → UI model).
- Two entry points bundled with `bunx openchamber-guest-bundle`: `status/main.ts`, `page/main.ts`. Both import `core`.
- UI built only with `@openchamber/sdk/ui` (`mountList`, `mountSelect`, `mountButton`, `mountBadge`, `mountEmpty`, `mountTextField`, …) so it follows themes.

### Storage schema (`host.storage`, key `profiles.v1`)
```json
{ "version": 1, "activeId": "work", "profiles": [{ "id": "work", "name": "Work", "folders": ["/Users/me/Documents/promo-team/promo-application-service"] }] }
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
    "capabilities": ["sessions"],
    "contributes": {
      "panel": { "entry": "status/index.html" },
      "statusSection": { "entry": "status/index.html", "title": "Profile" },
      "page": { "entry": "page/index.html", "title": "Profiles" }
    }
  },
  "dependencies": { "@openchamber/sdk": "2.7.0" }
}
```
Exact keys to be confirmed against `node_modules/@openchamber/sdk/API.md` and by `bunx openchamber-guest-check`.

## Milestones

1. **Scaffold** — `bun init`, add SDK, manifest, empty page + status entries, bundle scripts, `openchamber-guest-check` passes, installs locally from folder. Verify it appears in Extension pages and Work Status.
2. **Core + storage** — profile model, path matching, storage read/write, unit tests (`bun test`).
3. **Read-only views** — live projects/sessions via subscriptions; status section + page render the active profile; "not added" state.
4. **Editing** — create/rename/delete profile, add/remove folders (typed path; consider picking from `listProjects()` to avoid typos), switch active profile.
5. **Actions** — New session, Open session.
6. **Polish** — empty states, errors (`state: 'error' | 'loading'` snapshots), keyboard/theme check, README with screenshots, CI running `openchamber-guest-check`.
7. **Publish** — commit built `.js`, tag `v0.1.0`, install-by-URL link, optionally submit to the community directory (feedback@openchamber.dev).

## Verification

- Unit tests for `core` (path matching incl. worktrees, schema migration, view-model).
- `bunx openchamber-guest-check` clean.
- Manual in OpenChamber: install from folder → switch profile in both surfaces → registered/not-added folders → start/open session → reload app and confirm persistence.
- Check behaviour with no projects, a missing folder, many sessions (cap list, e.g. 20 per folder), `loading`/`error` snapshots.

## Risks / open questions

- Sidebar is unchanged: users still see every project there. Set expectations in the README.
- Path matching edge cases (symlinks, trailing slashes, worktrees living outside the project folder).
- Whether the Work Status `select` control is available in all 2.7.x builds (`features.statusControls`).
- Instance-scope storage is shared across clients of one server; decide whether "active profile" should be per device.

## Not in scope (possible later)

- **B — sidebar sync**: a service that rewrites `projects`/`activeProjectId` in `settings.json`. Undocumented, may be overwritten by the running server, needs a reload; test in a scratch setup before committing to it.
- **C — per-profile OpenCode config** (models, MCPs, skills): not possible from an extension today. Options: external tools like `opm`, or an upstream feature request/PR to `openchamber/openchamber` for a project-visibility/profile API.

## References

- SDK API: https://github.com/openchamber/openchamber/blob/main/packages/sdk/API.md
- Guest services: https://github.com/openchamber/openchamber/blob/main/packages/sdk/GUEST_SERVICES.md
- Examples: https://github.com/openchamber/openchamber/tree/main/packages/sdk/examples
- Docs: https://docs.openchamber.dev/sdk/
