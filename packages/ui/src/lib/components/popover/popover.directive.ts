import {
  Directive,
  ElementRef,
  Injector,
  OnDestroy,
  PLATFORM_ID,
  TemplateRef,
  afterNextRender,
  effect,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import {
  POPOVER_DATA,
  PopoverData,
  PopoverOverlayComponent,
  PopoverSize,
} from './popover-overlay.component';
import { computePopoverArrowOffset } from './popover-arrow.utils';
import {
  getPopoverPositions,
  PopoverPosition,
  POPOVER_VIEWPORT_MARGIN,
  resolvePopoverPosition,
} from './popover-overlay.config';

export type PopoverTrigger = 'click' | 'hover';

@Directive({
  selector: '[uiPopover]',
  standalone: true,
  host: {
    '[attr.aria-haspopup]': '"dialog"',
    '[attr.aria-expanded]': 'uiPopoverOpen()',
    '[attr.aria-controls]': 'uiPopoverOpen() ? popoverId : null',
    '(click)': 'onTriggerClick($event)',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  },
})
export class PopoverDirective implements OnDestroy {
  private readonly overlay = inject(Overlay);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly injector = inject(Injector);
  private readonly platformId = inject(PLATFORM_ID);

  uiPopover = input.required<TemplateRef<unknown>>();
  uiPopoverOpen = model(false);
  uiPopoverPosition = input<PopoverPosition>('bottom');
  uiPopoverTrigger = input<PopoverTrigger>('click');
  uiPopoverDisabled = input(false);
  uiPopoverWithArrow = input(true);
  uiPopoverSize = input<PopoverSize>('medium');
  uiPopoverAriaLabel = input<string | undefined>(undefined);
  uiPopoverShowDelay = input(0);
  uiPopoverHideDelay = input(120);

  readonly popoverId = `popover-${Math.random().toString(36).substring(2, 11)}`;

  private overlayRef: OverlayRef | null = null;
  private overlayPosition = signal<PopoverPosition>('bottom');
  private arrowOffset = signal(16);
  private subscriptions = new Subscription();
  private showTimeout: ReturnType<typeof setTimeout> | null = null;
  private hideTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    effect(() => {
      const preferredPosition = this.uiPopoverPosition();
      this.overlayPosition.set(preferredPosition);

      if (this.overlayRef) {
        this.overlayRef.updatePositionStrategy(
          this.overlay
            .position()
            .flexibleConnectedTo(this.elementRef)
            .withPositions(getPopoverPositions(preferredPosition))
            .withPush(false)
            .withFlexibleDimensions(false)
            .withViewportMargin(POPOVER_VIEWPORT_MARGIN),
        );
        this.overlayRef.updatePosition();
        this.scheduleArrowOffsetSync();
      }
    });

    effect(() => {
      const shouldOpen = this.uiPopoverOpen();
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      if (shouldOpen) {
        this.attachOverlay();
      } else {
        this.detachOverlay();
      }
    });
  }

  ngOnDestroy(): void {
    this.clearTimeouts();
    this.detachOverlay();
  }

  onTriggerClick(event: MouseEvent): void {
    if (this.uiPopoverTrigger() !== 'click' || this.uiPopoverDisabled()) {
      return;
    }

    event.stopPropagation();
    this.uiPopoverOpen.update(open => !open);
  }

  onMouseEnter(): void {
    if (this.uiPopoverTrigger() !== 'hover' || this.uiPopoverDisabled()) {
      return;
    }

    this.clearTimeouts();
    this.showTimeout = setTimeout(() => this.uiPopoverOpen.set(true), this.uiPopoverShowDelay());
  }

  onMouseLeave(): void {
    if (this.uiPopoverTrigger() !== 'hover' || this.uiPopoverDisabled()) {
      return;
    }

    this.clearTimeouts();
    this.hideTimeout = setTimeout(() => this.uiPopoverOpen.set(false), this.uiPopoverHideDelay());
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

  private attachOverlay(): void {
    if (!isPlatformBrowser(this.platformId) || this.overlayRef) {
      return;
    }

    const positions = getPopoverPositions(this.uiPopoverPosition());

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions(positions)
      .withPush(false)
      .withFlexibleDimensions(false)
      .withViewportMargin(POPOVER_VIEWPORT_MARGIN);

    this.subscriptions.add(
      positionStrategy.positionChanges.subscribe(change => {
        this.overlayPosition.set(resolvePopoverPosition(change.connectionPair));
        this.scheduleArrowOffsetSync();
      }),
    );

    const popoverData: PopoverData = {
      template: this.uiPopover(),
      size: this.uiPopoverSize(),
      withArrow: this.uiPopoverWithArrow(),
      position: this.overlayPosition,
      arrowOffset: this.arrowOffset,
      id: this.popoverId,
      ariaLabel: this.uiPopoverAriaLabel(),
    };

    const overlayInjector = Injector.create({
      parent: this.injector,
      providers: [{ provide: POPOVER_DATA, useValue: popoverData }],
    });

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      panelClass: ['ui-popover-overlay-pane'],
      minWidth: 'min-content',
      maxWidth: 'min(400px, 90vw)',
    });

    const portal = new ComponentPortal(PopoverOverlayComponent, null, overlayInjector);
    this.overlayRef.attach(portal);

    afterNextRender(
      () => {
        this.overlayRef?.updatePosition();
        this.syncArrowOffset();
      },
      { injector: this.injector },
    );

    this.subscriptions.add(
      this.overlayRef.outsidePointerEvents().subscribe(event => {
        const target = event.target as HTMLElement;
        if (!this.elementRef.nativeElement.contains(target)) {
          this.uiPopoverOpen.set(false);
        }
      }),
    );

    this.subscriptions.add(
      this.overlayRef
        .keydownEvents()
        .pipe(filter(event => event.key === 'Escape'))
        .subscribe(() => this.uiPopoverOpen.set(false)),
    );

    this.subscriptions.add(
      this.overlayRef.detachments().subscribe(() => {
        this.overlayRef = null;
        this.subscriptions.unsubscribe();
        this.subscriptions = new Subscription();
        if (this.uiPopoverOpen()) {
          this.uiPopoverOpen.set(false);
        }
      }),
    );
  }

  private scheduleArrowOffsetSync(): void {
    if (!this.uiPopoverWithArrow()) {
      return;
    }

    requestAnimationFrame(() => this.syncArrowOffset());
  }

  private syncArrowOffset(): void {
    if (!this.overlayRef || !this.uiPopoverWithArrow()) {
      return;
    }

    const overlayRoot = this.overlayRef.overlayElement.querySelector(
      '.popover-overlay',
    ) as HTMLElement | null;

    if (!overlayRoot) {
      return;
    }

    this.arrowOffset.set(
      computePopoverArrowOffset(
        this.elementRef.nativeElement.getBoundingClientRect(),
        overlayRoot.getBoundingClientRect(),
        this.overlayPosition(),
      ),
    );
  }

  private detachOverlay(): void {
    if (!this.overlayRef) {
      return;
    }

    this.overlayRef.dispose();
    this.overlayRef = null;
    this.subscriptions.unsubscribe();
    this.subscriptions = new Subscription();
  }
}
