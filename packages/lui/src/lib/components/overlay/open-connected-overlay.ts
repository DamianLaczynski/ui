import { ElementRef, NgZone, TemplateRef, ViewContainerRef } from '@angular/core';
import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { registerScrollableAncestors } from './register-scrollable-ancestors';

export const DEFAULT_CONNECTED_POSITIONS: ConnectedPosition[] = [
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
  { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
  { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetY: 4 },
  { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetY: -4 },
];

export const DEFAULT_VIEWPORT_MARGIN = 8;

export interface OverlayHandle {
  overlayRef: OverlayRef;
  destroy: () => void;
}

export interface ConnectedOverlayConfig {
  positions: ConnectedPosition[];
  viewportMargin?: number;
  flexibleDimensions?: boolean;
  minWidth?: number | string;
  maxWidth?: number | string;
  width?: number | string;
  maxHeight?: number | string;
  hasBackdrop?: boolean;
  panelClass?: string | string[];
}

export function openConnectedOverlay(params: {
  overlay: Overlay;
  scrollDispatcher: ScrollDispatcher;
  ngZone: NgZone;
  trigger: ElementRef<HTMLElement>;
  template: TemplateRef<unknown>;
  viewContainerRef: ViewContainerRef;
  config: ConnectedOverlayConfig;
  onClose: (focusTrigger: boolean) => void;
  onDetach?: () => void;
}): OverlayHandle {
  const {
    overlay,
    scrollDispatcher,
    ngZone,
    trigger,
    template,
    viewContainerRef,
    config,
    onClose,
    onDetach,
  } = params;
  const sub = new Subscription();
  let scrollCleanup: (() => void) | null = null;

  const positionStrategy = overlay
    .position()
    .flexibleConnectedTo(trigger)
    .withPositions(config.positions)
    .withPush(false)
    .withViewportMargin(config.viewportMargin ?? DEFAULT_VIEWPORT_MARGIN);

  if (config.flexibleDimensions) {
    positionStrategy.withFlexibleDimensions(true);
  }

  const panelClass = Array.isArray(config.panelClass)
    ? ['ui-overlay-pane', ...config.panelClass]
    : config.panelClass
      ? ['ui-overlay-pane', config.panelClass]
      : 'ui-overlay-pane';

  const overlayRef = overlay.create({
    positionStrategy,
    scrollStrategy: overlay.scrollStrategies.close(),
    panelClass,
    minWidth: config.minWidth,
    maxWidth: config.maxWidth,
    width: config.width,
    maxHeight: config.maxHeight,
    hasBackdrop: config.hasBackdrop,
  });

  overlayRef.attach(new TemplatePortal(template, viewContainerRef));

  scrollCleanup = registerScrollableAncestors(trigger.nativeElement, scrollDispatcher, ngZone);

  sub.add(
    overlayRef.outsidePointerEvents().subscribe(event => {
      const target = event.target as HTMLElement;
      if (!trigger.nativeElement.contains(target)) {
        onClose(false);
      }
    }),
  );
  sub.add(
    overlayRef
      .keydownEvents()
      .pipe(filter(e => e.key === 'Escape'))
      .subscribe(() => onClose(true)),
  );
  if (onDetach) {
    sub.add(overlayRef.detachments().subscribe(() => onDetach()));
  }

  function destroy(): void {
    scrollCleanup?.();
    scrollCleanup = null;
    sub.unsubscribe();
    overlayRef.dispose();
  }

  return { overlayRef, destroy };
}
