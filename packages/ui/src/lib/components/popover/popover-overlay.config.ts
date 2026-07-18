import { ConnectedPosition } from '@angular/cdk/overlay';

export type PopoverPosition = 'top' | 'bottom' | 'left' | 'right';

const POPOVER_CONNECTED_POSITIONS: Record<PopoverPosition, ConnectedPosition[]> = {
  bottom: [
    { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: 10 },
    { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 10 },
    { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetY: 10 },
    { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: -10 },
  ],
  top: [
    { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: -10 },
    { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -10 },
    { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetY: -10 },
    { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: 10 },
  ],
  left: [
    { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -10 },
    { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'top', offsetX: -10 },
    { originX: 'start', originY: 'bottom', overlayX: 'end', overlayY: 'bottom', offsetX: -10 },
    { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: 10 },
  ],
  right: [
    { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: 10 },
    { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top', offsetX: 10 },
    { originX: 'end', originY: 'bottom', overlayX: 'start', overlayY: 'bottom', offsetX: 10 },
    { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -10 },
  ],
};

export function getPopoverPositions(preferred: PopoverPosition): ConnectedPosition[] {
  return POPOVER_CONNECTED_POSITIONS[preferred];
}

export function resolvePopoverPosition(pair: ConnectedPosition): PopoverPosition {
  if (pair.overlayY === 'bottom') {
    return 'top';
  }

  if (pair.overlayY === 'top') {
    return 'bottom';
  }

  if (pair.overlayX === 'end') {
    return 'left';
  }

  return 'right';
}

export const POPOVER_VIEWPORT_MARGIN = 16;
