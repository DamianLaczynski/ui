import { ConnectedPosition } from '@angular/cdk/overlay';

export const MENU_OVERLAY_POSITIONS: ConnectedPosition[] = [
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
  { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
  { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetY: 4 },
  { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetY: -4 },
];

export const MENU_SUBMENU_POSITIONS: ConnectedPosition[] = [
  { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top', offsetX: 4 },
  { originX: 'end', originY: 'bottom', overlayX: 'start', overlayY: 'bottom', offsetX: 4 },
  { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'top', offsetX: -4 },
  { originX: 'start', originY: 'bottom', overlayX: 'end', overlayY: 'bottom', offsetX: -4 },
  { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
  { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetY: -4 },
];

export const MENU_OVERLAY_MIN_WIDTH = 160;
export const MENU_SUBMENU_MIN_WIDTH = 120;
export const MENU_OVERLAY_MAX_WIDTH = 280;
export const MENU_OVERLAY_VIEWPORT_MARGIN = 8;
export const MENU_SUBMENU_VIEWPORT_MARGIN = 16;
