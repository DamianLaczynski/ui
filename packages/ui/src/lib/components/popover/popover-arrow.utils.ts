import { PopoverPosition } from './popover-overlay.config';

const ARROW_HALF_SIZE = 6;
const ARROW_EDGE_INSET = 16;

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function computePopoverArrowOffset(
  trigger: DOMRectReadOnly,
  overlay: DOMRectReadOnly,
  position: PopoverPosition,
): number {
  if (position === 'top' || position === 'bottom') {
    const triggerCenterX = trigger.left + trigger.width / 2;
    const min = ARROW_EDGE_INSET;
    const max = Math.max(min, overlay.width - ARROW_EDGE_INSET);
    return clamp(triggerCenterX - overlay.left, min, max);
  }

  const triggerCenterY = trigger.top + trigger.height / 2;
  const min = ARROW_EDGE_INSET;
  const max = Math.max(min, overlay.height - ARROW_EDGE_INSET);
  return clamp(triggerCenterY - overlay.top, min, max);
}

export { ARROW_HALF_SIZE, ARROW_EDGE_INSET };
