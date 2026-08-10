import {
  Directive,
  ElementRef,
  inject,
  input,
  OnDestroy,
  Injector,
  PLATFORM_ID,
  afterNextRender,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { TooltipOverlayComponent, TOOLTIP_DATA, TooltipData } from './tooltip-overlay.component';
import { getTooltipPositions, TOOLTIP_VIEWPORT_MARGIN } from './tooltip-overlay.config';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
export type TooltipSize = 'small' | 'medium' | 'large';

@Directive({
  selector: '[uiTooltip]',
  standalone: true,
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
    '(focus)': 'onFocus()',
    '(blur)': 'onBlur()',
  },
})
export class TooltipDirective implements OnDestroy {
  private overlay = inject(Overlay);
  private elementRef = inject(ElementRef<HTMLElement>);
  private injector = inject(Injector);
  private platformId = inject(PLATFORM_ID);

  uiTooltip = input<string>('');
  uiTooltipPosition = input<TooltipPosition>('top');
  uiTooltipSize = input<TooltipSize>('medium');
  uiTooltipDisabled = input<boolean>(false);
  uiTooltipDelay = input<number>(300);
  uiTooltipRelationship = input<'label' | 'description'>('description');
  uiTooltipWithArrow = input<boolean>(true);

  private overlayRef: any = null;
  private showTimeout: ReturnType<typeof setTimeout> | null = null;
  private hideTimeout: ReturnType<typeof setTimeout> | null = null;
  private tooltipId = `tooltip-${Math.random().toString(36).substring(2, 11)}`;

  ngOnDestroy(): void {
    this.clearTimeouts();
    this.hide();
  }

  onMouseEnter(): void {
    if (!this.uiTooltipDisabled() && this.uiTooltip()) {
      this.clearTimeouts();
      this.showTimeout = setTimeout(() => this.show(), this.uiTooltipDelay());
    }
  }

  onMouseLeave(): void {
    this.clearTimeouts();
    this.hideTimeout = setTimeout(() => this.hide(), 50);
  }

  onFocus(): void {
    if (!this.uiTooltipDisabled() && this.uiTooltip()) {
      this.clearTimeouts();
      this.showTimeout = setTimeout(() => this.show(), this.uiTooltipDelay());
    }
  }

  onBlur(): void {
    this.clearTimeouts();
    this.hideTimeout = setTimeout(() => this.hide(), 50);
  }

  private clearTimeouts(): void {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = null;
    }
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
  }

  private show(): void {
    if (!isPlatformBrowser(this.platformId) || this.overlayRef || !this.uiTooltip()) return;

    const positions = getTooltipPositions(this.uiTooltipPosition());

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions(positions)
      .withPush(true)
      .withFlexibleDimensions(false)
      .withViewportMargin(TOOLTIP_VIEWPORT_MARGIN);

    const tooltipData: TooltipData = {
      text: this.uiTooltip(),
      size: this.uiTooltipSize(),
      withArrow: this.uiTooltipWithArrow(),
      position: this.uiTooltipPosition(),
      id: this.tooltipId,
    };

    const injector = Injector.create({
      parent: this.injector,
      providers: [{ provide: TOOLTIP_DATA, useValue: tooltipData }],
    });

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close(),
      panelClass: ['ui-tooltip-overlay-pane'],
      width: 'max-content',
      maxWidth: 'min(400px, 90vw)',
    });

    const portal = new ComponentPortal(TooltipOverlayComponent, null, injector);
    this.overlayRef.attach(portal);

    afterNextRender(() => this.overlayRef?.updatePosition(), { injector: this.injector });

    const trigger = this.elementRef.nativeElement;
    const relationship = this.uiTooltipRelationship();
    if (relationship === 'description') {
      trigger.setAttribute('aria-describedby', this.tooltipId);
    } else {
      trigger.setAttribute('aria-label', this.uiTooltip());
    }
  }

  private hide(): void {
    if (this.overlayRef) {
      const trigger = this.elementRef.nativeElement;
      trigger.removeAttribute('aria-describedby');
      if (this.uiTooltipRelationship() === 'label') {
        trigger.removeAttribute('aria-label');
      }
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}
