export const VIEW_CSS = `
/* Layout container */
.oc-profiles-app {
  display: flex;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  background: var(--surface-background, var(--oc-bg, transparent));
  color: var(--surface-foreground, var(--oc-fg, inherit));
  font-family: var(--font-sans, var(--oc-font, inherit));
  font-size: 0.875rem;
  line-height: 1.45;
}

.oc-profiles-app *,
.oc-profiles-app *::before,
.oc-profiles-app *::after {
  box-sizing: border-box;
}

/* Sidebar (Left Column) */
.oc-profiles-sidebar {
  flex: 0 0 240px;
  width: 240px;
  min-width: 200px;
  max-width: 300px;
  border-right: 1px solid var(--interactive-border, var(--oc-border, rgba(128, 128, 128, 0.18)));
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  background: var(--surface-background, var(--oc-bg, transparent));
}

.oc-profiles-sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px 0;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--surface-muted-foreground, var(--oc-muted, #888));
}

.oc-profiles-sidebar-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.oc-profiles-sidebar-footer {
  margin-top: auto;
  padding-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.oc-profiles-sidebar-reserved {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 2px;
}

.oc-profiles-sidebar-reserved-hint {
  font-size: 0.7rem;
  color: var(--surface-muted-foreground, var(--oc-muted, #888));
  padding: 0 8px;
}

/* Main Area */
.oc-profiles-main {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 24px 32px;
  gap: 20px;
}

.oc-profiles-main-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.oc-profiles-main-title {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.015em;
  margin: 0;
  color: var(--surface-foreground, var(--oc-fg, inherit));
}

.oc-profiles-main-subtitle {
  font-size: 0.8125rem;
  color: var(--surface-muted-foreground, var(--oc-muted, #888));
  margin: 0;
}

.oc-profiles-banner-slot {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.oc-profiles-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 0;
}

.oc-profiles-loading-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 64px 16px;
}

/* Folder Cards */
.oc-profiles-folder-card {
  border: 1px solid var(--interactive-border, var(--oc-border, rgba(128, 128, 128, 0.18)));
  border-radius: var(--radius, 10px);
  background: var(--surface-elevated, var(--oc-elevated, rgba(128, 128, 128, 0.03)));
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: border-color 150ms ease, box-shadow 150ms ease;
  box-shadow: var(--oc-sdk-raised-lift, 0 1px 1.5px 0 rgb(0 0 0 / 0.06));
}

.oc-profiles-folder-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.oc-profiles-folder-meta {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  flex: 1 1 auto;
}

.oc-profiles-folder-title-row {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.oc-profiles-folder-basename {
  font-size: 0.9375rem;
  font-weight: 600;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.oc-profiles-folder-path {
  font-size: 0.75rem;
  font-family: var(--font-mono, var(--oc-mono, monospace));
  color: var(--surface-muted-foreground, var(--oc-muted, #888));
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.oc-profiles-status-dot {
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  flex-shrink: 0;
  display: inline-block;
}

.oc-profiles-status-dot[data-status="waiting"] {
  background: var(--status-warning, var(--oc-warning, #f59e0b));
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--status-warning, #f59e0b) 25%, transparent);
}

.oc-profiles-status-dot[data-status="running"] {
  background: var(--status-info, var(--oc-info, #3b82f6));
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--status-info, #3b82f6) 25%, transparent);
}

.oc-profiles-status-dot[data-status="idle"] {
  background: var(--surface-muted-foreground, var(--oc-muted, #888888));
  opacity: 0.6;
}

.oc-profiles-folder-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

/* Not-added state */
.oc-profiles-not-added-callout {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: calc(var(--radius, 9px) - 2px);
  font-size: 0.8125rem;
  background: color-mix(in srgb, var(--surface-foreground, currentColor) 4%, transparent);
  color: var(--surface-muted-foreground, var(--oc-muted, #888));
  border: 1px dashed var(--interactive-border, var(--oc-border, rgba(128, 128, 128, 0.25)));
}

.oc-profiles-not-added-icon {
  font-size: 0.875rem;
  flex-shrink: 0;
}

/* Sessions list */
.oc-profiles-sessions-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-top: 1px solid var(--interactive-border, var(--oc-border, rgba(128, 128, 128, 0.12)));
  padding-top: 10px;
}

.oc-profiles-sessions-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.oc-profiles-session-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 6px 8px;
  border-radius: calc(var(--radius, 9px) - 3px);
  font-size: 0.8125rem;
  transition: background 120ms ease;
}

.oc-profiles-session-row:hover {
  background: var(--interactive-hover, var(--oc-hover, rgba(128, 128, 128, 0.06)));
}

.oc-profiles-session-lead {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  flex: 1 1 auto;
}

.oc-profiles-session-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
  color: var(--surface-foreground, var(--oc-fg, inherit));
}

.oc-profiles-session-trail {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  font-size: 0.75rem;
  color: var(--surface-muted-foreground, var(--oc-muted, #888));
  font-variant-numeric: tabular-nums;
}

.oc-profiles-session-actions {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
}

.oc-profiles-sessions-more {
  font-size: 0.75rem;
  color: var(--surface-muted-foreground, var(--oc-muted, #888));
  font-weight: 500;
  padding: 4px 8px;
}

.oc-profiles-sessions-empty {
  font-size: 0.8125rem;
  color: var(--surface-muted-foreground, var(--oc-muted, #888));
  padding: 6px 4px;
}

/* Unassigned cards */
.oc-profiles-unassigned-card {
  border: 1px solid var(--interactive-border, var(--oc-border, rgba(128, 128, 128, 0.18)));
  border-radius: var(--radius, 10px);
  background: var(--surface-elevated, var(--oc-elevated, rgba(128, 128, 128, 0.03)));
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  box-shadow: var(--oc-sdk-raised-lift, 0 1px 1.5px 0 rgb(0 0 0 / 0.06));
}

.oc-profiles-unassigned-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1 1 auto;
}

.oc-profiles-unassigned-name {
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.oc-profiles-unassigned-path {
  font-size: 0.75rem;
  font-family: var(--font-mono, var(--oc-mono, monospace));
  color: var(--surface-muted-foreground, var(--oc-muted, #888));
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.oc-profiles-unassigned-actions {
  flex-shrink: 0;
}

/* Narrow viewport adaptations */
@media (max-width: 640px) {
  .oc-profiles-app {
    flex-direction: column;
  }

  .oc-profiles-sidebar {
    width: 100%;
    flex: 0 0 auto;
    max-width: none;
    border-right: none;
    border-bottom: 1px solid var(--interactive-border, var(--oc-border, rgba(128, 128, 128, 0.18)));
    padding: 12px;
  }

  .oc-profiles-main {
    padding: 16px;
    gap: 16px;
  }
}
`;
