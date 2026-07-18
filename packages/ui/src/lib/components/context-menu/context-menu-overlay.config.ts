import { ConnectedPosition } from '@angular/cdk/overlay';

import {
  MENU_OVERLAY_MAX_WIDTH,
  MENU_OVERLAY_MIN_WIDTH,
  MENU_OVERLAY_VIEWPORT_MARGIN,
} from '../menu/menu-overlay.config';

export const CONTEXT_MENU_OVERLAY_POSITIONS: ConnectedPosition[] = [
  { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'top' },
  { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'top' },
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'bottom' },
  { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'bottom' },
];

export const CONTEXT_MENU_OVERLAY_MIN_WIDTH = MENU_OVERLAY_MIN_WIDTH;
export const CONTEXT_MENU_OVERLAY_MAX_WIDTH = MENU_OVERLAY_MAX_WIDTH;
export const CONTEXT_MENU_OVERLAY_VIEWPORT_MARGIN = MENU_OVERLAY_VIEWPORT_MARGIN;
