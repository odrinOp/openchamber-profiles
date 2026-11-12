export const VIEW_CSS = `
/* Layout container */
.oc-profiles-app {
  display: flex;
  flex-direction: column;
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

/* Top bar */
.oc-profiles-topbar {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 32px;
  border-bottom: 1px solid var(--interactive-border, var(--oc-border, rgba(128, 128, 128, 0.18)));
}

.oc-profiles-body {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.oc-profiles-banner-slot {
  padding: 0 32px;
}

.oc-profiles-banner-slot:not(:empty) {
  padding-top: 12px;
}

.oc-profiles-projects-view {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  padding: 20px 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.oc-profiles-toolbar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.oc-profiles-toolbar-item {
  min-width: 0;
}

.oc-profiles-settings-view {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
}

.oc-profiles-section-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--surface-muted-foreground, var(--oc-muted, #888));
  margin-top: 4px;
}

.oc-profiles-config-row {
  border: 1px solid var(--interactive-border, var(--oc-border, rgba(128, 128, 128, 0.18)));
  border-radius: var(--radius, 10px);
  background: var(--surface-elevated, var(--oc-elevated, rgba(128, 128, 128, 0.03)));
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
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

/* New Profile inline form in sidebar */
.oc-profiles-sidebar-action {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0 2px;
}

.oc-profiles-new-profile-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 10px;
  border-radius: var(--radius, 9px);
  background: var(--surface-elevated, var(--oc-elevated, rgba(128, 128, 128, 0.04)));
  border: 1px solid var(--interactive-border, var(--oc-border, rgba(128, 128, 128, 0.2)));
}

.oc-profiles-form-actions {
  display: flex;
  align-items: center;
  gap: 6px;
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
  gap: 6px;
}

.oc-profiles-header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.oc-profiles-header-title-row {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.oc-profiles-header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
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

/* Inline rename form */
.oc-profiles-rename-form {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  width: 100%;
}

.oc-profiles-rename-form .oc-sdk-input {
  height: 28px;
  font-size: 1rem;
  font-weight: 600;
  max-width: 320px;
}

/* Inline delete confirmation */
.oc-profiles-delete-confirm {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 14px;
  border-radius: var(--radius, 10px);
  background: color-mix(in srgb, var(--status-error, var(--oc-error, #ef4444)) 8%, transparent);
  border: 1px solid color-mix(in srgb, var(--status-error, var(--oc-error, #ef4444)) 22%, transparent);
}

.oc-profiles-delete-confirm-text {
  font-size: 0.8125rem;
  color: var(--surface-foreground, var(--oc-fg, inherit));
  line-height: 1.4;
  margin: 0;
}

/* Add folder panel */
.oc-profiles-add-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border-radius: var(--radius, 10px);
  background: var(--surface-elevated, var(--oc-elevated, rgba(128, 128, 128, 0.04)));
  border: 1px solid var(--interactive-border, var(--oc-border, rgba(128, 128, 128, 0.2)));
  box-shadow: var(--oc-sdk-raised-lift, 0 1px 1.5px 0 rgb(0 0 0 / 0.06));
}

.oc-profiles-add-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.oc-profiles-add-panel-title {
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0;
}

.oc-profiles-add-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.oc-profiles-add-section-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--surface-muted-foreground, var(--oc-muted, #888));
}

.oc-profiles-pickable-list-wrap {
  max-height: 180px;
  overflow-y: auto;
  border: 1px solid var(--interactive-border, var(--oc-border, rgba(128, 128, 128, 0.16)));
  border-radius: calc(var(--radius, 9px) - 2px);
  padding: 2px;
}

.oc-profiles-empty-hint {
  font-size: 0.8125rem;
  color: var(--surface-muted-foreground, var(--oc-muted, #888));
  margin: 0;
  padding: 6px 2px;
}

.oc-profiles-typed-row {
  display: flex;
  align-items: flex-end;
  gap: 8px;
}

.oc-profiles-typed-row .oc-sdk-field {
  flex: 1 1 auto;
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

.oc-profiles-worktree-tag {
  font-size: 10px;
  line-height: 14px;
  padding: 0 5px;
  opacity: 0.85;
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
  cursor: pointer;
}

.oc-profiles-session-title:hover {
  text-decoration: underline;
  color: var(--primary-text, var(--primary, inherit));
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
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

/* Narrow viewport adaptations */
@media (max-width: 640px) {
  .oc-profiles-app {
    flex-direction: column;
  }

  .oc-profiles-settings-view {
    flex-direction: column;
    overflow-y: auto;
  }

  .oc-profiles-topbar,
  .oc-profiles-projects-view {
    padding-left: 16px;
    padding-right: 16px;
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

  .oc-profiles-header-top {
    flex-direction: column;
    align-items: flex-start;
  }

  .oc-profiles-typed-row {
    flex-direction: column;
    align-items: stretch;
  }

  .oc-profiles-unassigned-card {
    flex-direction: column;
    align-items: stretch;
  }

  .oc-profiles-unassigned-actions {
    justify-content: flex-end;
  }
}

.oc-profiles-session-count {
  font-size: 11px;
  color: var(--muted-foreground);
  white-space: nowrap;
}
`;
