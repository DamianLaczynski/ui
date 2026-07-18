import { NgTemplateOutlet } from '@angular/common';
import { Component, inject, InjectionToken, TemplateRef, WritableSignal } from '@angular/core';

import { PopoverPosition } from './popover-overlay.config';

export const POPOVER_DATA = new InjectionToken<PopoverData>('POPOVER_DATA');

export type PopoverSize = 'small' | 'medium' | 'large';

export interface PopoverData {
  template: TemplateRef<unknown>;
  size: PopoverSize;
  withArrow: boolean;
  position: WritableSignal<PopoverPosition>;
  arrowOffset: WritableSignal<number>;
  id: string;
  ariaLabel?: string;
}

@Component({
  selector: 'ui-popover-overlay',
  standalone: true,
  imports: [NgTemplateOutlet],
  template: `
    <div
      class="popover-overlay"
      [class.popover-overlay--small]="data.size === 'small'"
      [class.popover-overlay--medium]="data.size === 'medium'"
      [class.popover-overlay--large]="data.size === 'large'"
      [id]="data.id"
      role="dialog"
      [attr.aria-label]="data.ariaLabel || null"
      [attr.aria-modal]="false"
      [style.--popover-arrow-offset.px]="data.arrowOffset()"
    >
      <div class="popover-overlay__surface">
        <ng-container *ngTemplateOutlet="data.template" />
      </div>
      @if (data.withArrow) {
        <div class="popover-overlay__arrow" [attr.data-position]="data.position()"></div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class PopoverOverlayComponent {
  data = inject(POPOVER_DATA);
}
