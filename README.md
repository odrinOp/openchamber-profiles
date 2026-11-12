# openchamber-profiles

OpenChamber extension: work/personal profiles, each with its own folders and sessions.

Status: early development. See `.agents/docs/plan.md`.

> The OpenChamber sidebar is unchanged: it still lists every project. Profiles filter what this extension's page shows.

## Develop

```bash
npm install
npm run build      # bundle page/main.ts -> page/main.js (needs Bun, installed as a devDependency)
npm run check      # openchamber-guest-check
npm run typecheck
```

Install locally: OpenChamber → Settings → Extensions → add this folder. Built `.js` files are committed because no OpenChamber runtime compiles TypeScript.
