import { connectHost } from '@openchamber/sdk';
import { applyHostReady } from '@openchamber/sdk/ui';
import type { SessionMode } from '../src/core/index.ts';
import { createStore } from './store.ts';
import { mountApp } from './view.ts';

const host = connectHost();
const root = document.getElementById('app');
if (!root) throw new Error('Missing #app');

const app = mountApp(root);
const store = createStore(host);

const handlers = {
  selectProfile: (id: string) => store.selectProfile(id),
  setSessionMode: (mode: SessionMode) => store.setSessionMode(mode),
  createProfile: (name: string) => store.createProfile(name),
  renameProfile: (id: string, name: string) => store.renameProfile(id, name),
  deleteProfile: (id: string) => store.deleteProfile(id),
  addFolder: (path: string, profileId?: string) => store.addFolder(path, profileId),
  removeFolder: (path: string) => store.removeFolder(path),
  newSession: (path: string) => store.newSession(path),
  openSession: (sessionId: string) => store.openSession(sessionId),
};

const render = () => app.render(store.get(), handlers);

// Apply every theme snapshot, but mount and subscribe only once.
host.onReady((ctx) => applyHostReady(ctx, document.documentElement));
store.subscribe(render);
render();
