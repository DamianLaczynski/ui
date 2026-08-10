/// <reference types="vitest/globals" />
import { computePopoverArrowOffset } from './popover-arrow.utils';

describe('computePopoverArrowOffset', () => {
  it('should align the arrow to the trigger center on a bottom popover', () => {
    const trigger = { left: 100, top: 40, width: 80, height: 32 } as DOMRect;
    const overlay = { left: 60, top: 82, width: 200, height: 120 } as DOMRect;

    expect(computePopoverArrowOffset(trigger, overlay, 'bottom')).toBe(80);
  });

  it('should clamp the arrow away from popover corners', () => {
    const trigger = { left: 0, top: 40, width: 40, height: 32 } as DOMRect;
    const overlay = { left: 200, top: 82, width: 120, height: 100 } as DOMRect;

    expect(computePopoverArrowOffset(trigger, overlay, 'bottom')).toBe(16);
  });

  it('should align the arrow to the trigger center on a right popover', () => {
    const trigger = { left: 40, top: 100, width: 32, height: 80 } as DOMRect;
    const overlay = { left: 82, top: 60, width: 180, height: 160 } as DOMRect;

    expect(computePopoverArrowOffset(trigger, overlay, 'right')).toBe(80);
  });
});
