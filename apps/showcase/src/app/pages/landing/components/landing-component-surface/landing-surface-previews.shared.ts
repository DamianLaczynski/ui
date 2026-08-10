import type { Breadcrumb, CommandPaletteItem, MenuItem, SelectItem } from 'lui';

export const LSP_SELECT_ITEMS: SelectItem[] = [
  { value: 'production', label: 'Production', icon: 'rocket' },
  { value: 'staging', label: 'Staging', icon: 'beaker' },
  { value: 'development', label: 'Development', icon: 'code' },
  { value: 'analytics', label: 'Analytics workspace', icon: 'data_histogram' },
  { value: 'sandbox-eu', label: 'Sandbox · EU-West', icon: 'globe' },
  { value: 'sandbox-us', label: 'Sandbox · US-East', icon: 'globe' },
  { value: 'partner-demo', label: 'Partner demo tenant', icon: 'people' },
  { value: 'archive', label: 'Cold archive (read-only)', icon: 'archive', disabled: true },
  { value: 'training', label: 'Training cohort Q2', icon: 'book' },
  { value: 'pentest', label: 'Pen-test replica', icon: 'shield_task' },
];

export const LSP_BREADCRUMB_FULL: Breadcrumb[] = [
  { id: 'org', label: 'Northridge', icon: 'building' },
  { id: 'proj', label: 'Billing API', icon: 'folder' },
  { id: 'page', label: 'Webhook deliveries', icon: 'document', selected: true },
];

export const LSP_COMMAND_ITEMS_BASE: Omit<CommandPaletteItem, 'action'>[] = [
  {
    id: 'dash',
    label: 'Go to Dashboard',
    icon: 'home',
    group: 'Workspace',
    keywords: ['home', 'overview'],
  },
  {
    id: 'invite',
    label: 'Invite teammate',
    icon: 'person_add',
    group: 'Workspace',
    keywords: ['member', 'access'],
  },
  {
    id: 'export',
    label: 'Export usage CSV',
    icon: 'arrow_download',
    group: 'Reports',
    keywords: ['billing', 'csv'],
  },
  {
    id: 'deploy',
    label: 'Open deployment pipeline',
    icon: 'rocket',
    group: 'Ship',
    keywords: ['ci', 'release'],
  },
  {
    id: 'theme',
    label: 'Toggle color theme',
    icon: 'weather_sunny',
    group: 'Preferences',
    keywords: ['dark', 'light'],
  },
];

export const LSP_MENU_ITEMS: MenuItem[] = [
  { id: 'new', label: 'New project', icon: 'add' },
  { id: 'recent', label: 'Recent files', icon: 'clock' },
  { id: 'keys', label: 'API keys', icon: 'key' },
  { id: 'shortcuts', label: 'Keyboard shortcuts', icon: 'keyboard' },
];

export const LSP_SPEED_DIAL_ITEMS: MenuItem[] = [
  { id: 'task', label: '', icon: 'clipboard_task' },
  { id: 'edit', label: '', icon: 'edit' },
  { id: 'trash', label: '', icon: 'delete' },
  { id: 'sync', label: '', icon: 'arrow_sync' },
  { id: 'share', label: '', icon: 'share' },
];
