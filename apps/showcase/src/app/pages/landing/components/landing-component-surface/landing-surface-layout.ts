import { ALL_SHOWCASE_COMPONENTS } from '../../landing-showcase-components';

export interface LandingSurfaceTilePlacement {
  colSpan: number;
  rowSpan: number;
}

export const LANDING_SURFACE_INPUTS_PLACEMENT: LandingSurfaceTilePlacement = {
  colSpan: 6,
  rowSpan: 13,
};

const INPUT_SLOT_PLACEMENT: Record<string, LandingSurfaceTilePlacement> = {
  'radio-button-group': { colSpan: 3, rowSpan: 1 },
  dropdown: { colSpan: 2, rowSpan: 1 },
  search: { colSpan: 2, rowSpan: 1 },
  'time-picker': { colSpan: 2, rowSpan: 2 },
  textarea: { colSpan: 2, rowSpan: 1 },
  datetime: { colSpan: 2, rowSpan: 1 },
  'date-range': { colSpan: 2, rowSpan: 1 },
  color: { colSpan: 2, rowSpan: 1 },
  text: { colSpan: 2, rowSpan: 1 },
  email: { colSpan: 2, rowSpan: 1 },
  password: { colSpan: 2, rowSpan: 1 },
  number: { colSpan: 2, rowSpan: 1 },
  tel: { colSpan: 2, rowSpan: 1 },
  url: { colSpan: 2, rowSpan: 1 },
  checkbox: { colSpan: 2, rowSpan: 1 },
  switch: { colSpan: 2, rowSpan: 1 },
  'time-span': { colSpan: 2, rowSpan: 1 },
  time: { colSpan: 2, rowSpan: 1 },
  date: { colSpan: 2, rowSpan: 1 },
  month: { colSpan: 2, rowSpan: 1 },
  week: { colSpan: 2, rowSpan: 1 },
  totp: { colSpan: 2, rowSpan: 1 },
  slider: { colSpan: 2, rowSpan: 1 },
  range: { colSpan: 6, rowSpan: 1 },
  file: { colSpan: 6, rowSpan: 1 },
};

export function landingSurfaceInputSlotPlacement(id: string): LandingSurfaceTilePlacement {
  return INPUT_SLOT_PLACEMENT[id] ?? { colSpan: 2, rowSpan: 1 };
}

export interface LandingSurfaceInputExplicitCell {
  readonly gridColumn: string;
  readonly gridRow: string;
}

export interface LandingSurfaceNonFieldExplicitCell {
  readonly gridColumn: string;
  readonly gridRow: string;
}

const NONFIELD_EXPLICIT_GRID: Record<string, LandingSurfaceNonFieldExplicitCell> = {
  dialog: { gridColumn: '5 / 7', gridRow: 'auto' },
  'command-palette': { gridColumn: '5 / 7', gridRow: 'auto' },
};

export function landingSurfaceNonFieldExplicitCell(
  id: string,
): LandingSurfaceNonFieldExplicitCell | undefined {
  return NONFIELD_EXPLICIT_GRID[id];
}

export const LANDING_SURFACE_INPUT_RENDER_ORDER: readonly string[] = [
  'radio-button-group',
  'dropdown',
  'checkbox',
  'time-picker',
  'textarea',
  'datetime',
  'date-range',
  'color',
  'search',
  'text',
  'email',
  'password',
  'number',
  'tel',
  'url',
  'switch',
  'time-span',
  'time',
  'date',
  'month',
  'week',
  'totp',
  'slider',
  'range',
  'file',
];

export const LANDING_SURFACE_INPUTS_DISPLAY_ORDER = LANDING_SURFACE_INPUT_RENDER_ORDER;

const INPUT_EXPLICIT_GRID: Record<string, LandingSurfaceInputExplicitCell> = {
  'radio-button-group': { gridColumn: '1 / 5', gridRow: '1 / 2' },
  dropdown: { gridColumn: '5 / 7', gridRow: '1 / 2' },
  checkbox: { gridColumn: '1 / 3', gridRow: '2 / 3' },
  textarea: { gridColumn: '3 / 7', gridRow: '2 / 3' },
  'time-picker': { gridColumn: '5 / 7', gridRow: '3 / 5' },
  datetime: { gridColumn: '1 / 5', gridRow: '3 / 4' },
  'date-range': { gridColumn: '1 / 3', gridRow: '4 / 5' },
  color: { gridColumn: '3 / 5', gridRow: '4 / 5' },
  search: { gridColumn: '1 / 4', gridRow: '5 / 6' },
  text: { gridColumn: '4 / 7', gridRow: '5 / 6' },
  email: { gridColumn: '1 / 4', gridRow: '6 / 7' },
  password: { gridColumn: '4 / 7', gridRow: '6 / 7' },
  number: { gridColumn: '1 / 4', gridRow: '7 / 8' },
  tel: { gridColumn: '4 / 7', gridRow: '7 / 8' },
  url: { gridColumn: '1 / 3', gridRow: '8 / 9' },
  switch: { gridColumn: '3 / 5', gridRow: '8 / 9' },
  'time-span': { gridColumn: '5 / 7', gridRow: '8 / 9' },
  time: { gridColumn: '1 / 5', gridRow: '9 / 10' },
  date: { gridColumn: '5 / 7', gridRow: '9 / 10' },
  month: { gridColumn: '1 / 5', gridRow: '10 / 11' },
  week: { gridColumn: '5 / 7', gridRow: '10 / 11' },
  totp: { gridColumn: '1 / 5', gridRow: '11 / 12' },
  slider: { gridColumn: '5 / 7', gridRow: '11 / 12' },
  range: { gridColumn: '1 / 7', gridRow: '12 / 13' },
  file: { gridColumn: '1 / 7', gridRow: '13 / 14' },
};

const INPUT_RENDER_ORDER_SET = new Set(LANDING_SURFACE_INPUT_RENDER_ORDER);

export function landingSurfaceInputExplicitCell(
  id: string,
): LandingSurfaceInputExplicitCell | undefined {
  return INPUT_EXPLICIT_GRID[id];
}

export const LANDING_SURFACE_FIELD_IDS = new Set([
  'checkbox',
  'color',
  'date',
  'datetime',
  'month',
  'week',
  'date-range',
  'dropdown',
  'email',
  'file',
  'number',
  'password',
  'radio-button-group',
  'range',
  'search',
  'slider',
  'switch',
  'tel',
  'text',
  'textarea',
  'time',
  'time-picker',
  'time-span',
  'totp',
  'url',
]);

export function landingSurfaceOrderedInputIds(ids: string[]): string[] {
  const idSet = new Set(ids.filter(id => LANDING_SURFACE_FIELD_IDS.has(id)));
  const ordered = LANDING_SURFACE_INPUT_RENDER_ORDER.filter(id => idSet.has(id));
  const rest = [...idSet]
    .filter(id => !INPUT_RENDER_ORDER_SET.has(id))
    .sort((a, b) => a.localeCompare(b));
  return [...ordered, ...rest];
}

const PRIMARY_ORDER: readonly string[] = [
  'button',
  'breadcrumb',
  'tabs',
  'badge',
  'message-bar',
  'scroll-container',
  'menu',
  'nav',
  'tree',
  'icon',
  'calendar',
  'carousel',
  'pagination',
  'splitter',
  'scroll-panel',
  'card',
  'accordion',
  'dialog',
  'command-palette',
  'drawer',
  'scroll-container',
  'table-of-content',
  'avatar',
  'tag',
  'skeleton',
  'spinner',
  'state-container',
  'stepper',
  'toolbar',
  'tooltip',
  'toast',
  'tree-node',
  'divider',
];

const PRIMARY_ORDER_SET = new Set(PRIMARY_ORDER);

const PRIMARY_PLACEMENTS: Record<string, LandingSurfaceTilePlacement> = {
  button: { colSpan: 3, rowSpan: 1 },
  breadcrumb: { colSpan: 3, rowSpan: 1 },
  tabs: { colSpan: 4, rowSpan: 1 },
  badge: { colSpan: 2, rowSpan: 1 },
  'message-bar': { colSpan: 6, rowSpan: 1 },
  'scroll-container': { colSpan: 4, rowSpan: 2 },
  'empty-state': { colSpan: 2, rowSpan: 1 },
  menu: { colSpan: 2, rowSpan: 1 },
  nav: { colSpan: 2, rowSpan: 1 },
  tree: { colSpan: 2, rowSpan: 1 },
  icon: { colSpan: 2, rowSpan: 1 },
  calendar: { colSpan: 3, rowSpan: 1 },
  carousel: { colSpan: 3, rowSpan: 1 },
  pagination: { colSpan: 6, rowSpan: 2 },
  splitter: { colSpan: 4, rowSpan: 2 },
  'scroll-panel': { colSpan: 2, rowSpan: 2 },
  card: { colSpan: 2, rowSpan: 2 },
  accordion: { colSpan: 2, rowSpan: 2 },
  dialog: { colSpan: 2, rowSpan: 1 },
  'command-palette': { colSpan: 2, rowSpan: 1 },
  drawer: { colSpan: 6, rowSpan: 2 },
  'table-of-content': { colSpan: 2, rowSpan: 2 },
  avatar: { colSpan: 3, rowSpan: 1 },
  tag: { colSpan: 3, rowSpan: 1 },
  skeleton: { colSpan: 3, rowSpan: 1 },
  spinner: { colSpan: 3, rowSpan: 1 },
  stepper: { colSpan: 4, rowSpan: 2 },
  'state-container': { colSpan: 2, rowSpan: 2 },
  toolbar: { colSpan: 6, rowSpan: 1 },
  tooltip: { colSpan: 3, rowSpan: 1 },
  toast: { colSpan: 3, rowSpan: 1 },
  'tree-node': { colSpan: 2, rowSpan: 1 },
  divider: { colSpan: 4, rowSpan: 1 },
};

const REMAINDER_PATTERNS: LandingSurfaceTilePlacement[][] = [
  [
    { colSpan: 3, rowSpan: 1 },
    { colSpan: 3, rowSpan: 1 },
  ],
  [
    { colSpan: 4, rowSpan: 1 },
    { colSpan: 2, rowSpan: 1 },
  ],
  [
    { colSpan: 2, rowSpan: 1 },
    { colSpan: 2, rowSpan: 1 },
    { colSpan: 2, rowSpan: 1 },
  ],
  [{ colSpan: 6, rowSpan: 1 }],
];

function buildPlacements(): Record<string, LandingSurfaceTilePlacement> {
  const out: Record<string, LandingSurfaceTilePlacement> = { ...PRIMARY_PLACEMENTS };
  const remainder = ALL_SHOWCASE_COMPONENTS.map(c => c.id)
    .filter(id => !PRIMARY_ORDER_SET.has(id))
    .filter(id => !LANDING_SURFACE_FIELD_IDS.has(id))
    .sort((a, b) => a.localeCompare(b));
  let pi = 0;
  let pj = 0;
  for (const id of remainder) {
    const pattern = REMAINDER_PATTERNS[pi % REMAINDER_PATTERNS.length];
    out[id] = { ...pattern[pj] };
    pj += 1;
    if (pj >= pattern.length) {
      pj = 0;
      pi += 1;
    }
  }
  return out;
}

export const LANDING_SURFACE_GRID_PLACEMENTS: Record<string, LandingSurfaceTilePlacement> =
  buildPlacements();

export function landingSurfaceOrderedIds(ids: string[]): string[] {
  const idSet = new Set(ids);
  const primary = PRIMARY_ORDER.filter(id => idSet.has(id));
  const rest = ids.filter(id => !PRIMARY_ORDER_SET.has(id)).sort((a, b) => a.localeCompare(b));
  return [...primary, ...rest];
}

export function landingSurfaceOrderedNonFieldIds(ids: string[]): string[] {
  const idSet = new Set(ids);
  const primary = PRIMARY_ORDER.filter(id => idSet.has(id) && !LANDING_SURFACE_FIELD_IDS.has(id));
  const rest = ids
    .filter(id => !PRIMARY_ORDER_SET.has(id) && !LANDING_SURFACE_FIELD_IDS.has(id))
    .sort((a, b) => a.localeCompare(b));
  return [...primary, ...rest];
}

export function landingSurfaceOrderedFieldIds(ids: string[]): string[] {
  return landingSurfaceOrderedInputIds(ids);
}

export function landingSurfacePlacement(id: string): LandingSurfaceTilePlacement {
  return LANDING_SURFACE_GRID_PLACEMENTS[id] ?? { colSpan: 2, rowSpan: 1 };
}
