import { ConnectedPosition } from '@angular/cdk/overlay';

export function getTooltipPositions(
  preferred: 'top' | 'bottom' | 'left' | 'right',
): ConnectedPosition[] {
  const all: ConnectedPosition[] = [
    { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: -4 },
    { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: 4 },
    { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -4 },
    { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: 4 },
  ];
  const order: Record<string, number> = { top: 0, bottom: 1, left: 2, right: 3 };
  const idx = order[preferred];
  return [all[idx], ...all.filter((_, i) => i !== idx)];
}

export const TOOLTIP_VIEWPORT_MARGIN = 8;
