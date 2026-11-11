import { connectHost } from '@openchamber/sdk';
import { applyHostReady } from '@openchamber/sdk/ui';

const host = connectHost();
const root = document.getElementById('app');

host.onReady((ctx) => {
  applyHostReady(ctx, document.documentElement);
  if (root) root.textContent = 'Profiles — scaffold';
});
