import { Component, inject, InjectionToken, ChangeDetectionStrategy } from '@angular/core';

export const TOOLTIP_DATA = new InjectionToken<TooltipData>('TOOLTIP_DATA');

export interface TooltipData {
  text: string;
  size: 'small' | 'medium' | 'large';
  withArrow: boolean;
  position: 'top' | 'bottom' | 'left' | 'right';
  id?: string;
}

@Component({
  selector: 'ui-tooltip-overlay',
  standalone: true,
  template: `
    <div
      class="tooltip-overlay"
      [class.tooltip-overlay--small]="data.size === 'small'"
      [class.tooltip-overlay--medium]="data.size === 'medium'"
      [class.tooltip-overlay--large]="data.size === 'large'"
      [id]="data.id"
      role="tooltip"
    >
      <div class="tooltip-overlay__content">{{ data.text }}</div>
      @if (data.withArrow) {
        <div class="tooltip-overlay__arrow" [attr.data-position]="data.position"></div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class TooltipOverlayComponent {
  data = inject(TOOLTIP_DATA);
}
