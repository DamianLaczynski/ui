import {
  ElementRef,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
  inject,
  signal,
  NgZone,
  Injectable,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import {
  DEFAULT_CONNECTED_POSITIONS,
  DEFAULT_VIEWPORT_MARGIN,
  OverlayHandle,
  openConnectedOverlay,
} from '../../overlay/open-connected-overlay';

/**
 * Helper service for managing date picker overlays.
 * Used by date, month, and week components.
 */
@Injectable()
export class DateFieldOverlayService implements OnDestroy {
  private overlay = inject(Overlay);
  private viewContainerRef = inject(ViewContainerRef);
  private scrollDispatcher = inject(ScrollDispatcher);
  private ngZone = inject(NgZone);
  private overlayHandle: OverlayHandle | null = null;

  isOpen = signal<boolean>(false);

  ngOnDestroy(): void {
    this.close();
  }

  toggle(
    triggerElement: ElementRef,
    panelTemplate: TemplateRef<unknown>,
    panelWidth: number,
    onOpen?: () => void,
    afterOpen?: (overlayRef: OverlayRef) => void,
  ): void {
    if (this.isOpen()) {
      this.close(false);
    } else {
      this.open(triggerElement, panelTemplate, panelWidth, onOpen, afterOpen);
    }
  }

  open(
    triggerElement: ElementRef,
    panelTemplate: TemplateRef<unknown>,
    panelWidth: number,
    beforeOpen?: () => void,
    afterOpen?: (overlayRef: OverlayRef) => void,
  ): void {
    if (this.isOpen()) {
      return;
    }

    beforeOpen?.();

    this.overlayHandle = openConnectedOverlay({
      overlay: this.overlay,
      scrollDispatcher: this.scrollDispatcher,
      ngZone: this.ngZone,
      trigger: triggerElement,
      template: panelTemplate,
      viewContainerRef: this.viewContainerRef,
      config: {
        positions: DEFAULT_CONNECTED_POSITIONS,
        viewportMargin: DEFAULT_VIEWPORT_MARGIN,
        width: panelWidth,
        hasBackdrop: false,
      },
      onClose: focusTrigger => {
        if (focusTrigger) {
          this.close(true);
        } else {
          setTimeout(() => this.close(false), 0);
        }
      },
    });

    this.isOpen.set(true);

    if (afterOpen && this.overlayHandle) {
      const overlayRef = this.overlayHandle.overlayRef;
      setTimeout(() => afterOpen(overlayRef), 0);
    }
  }

  close(shouldFocusTrigger: boolean = false, triggerElement?: ElementRef): void {
    this.overlayHandle?.destroy();
    this.overlayHandle = null;
    this.isOpen.set(false);

    if (
      shouldFocusTrigger &&
      triggerElement?.nativeElement &&
      document.contains(triggerElement.nativeElement)
    ) {
      try {
        setTimeout(() => triggerElement.nativeElement.focus({ preventScroll: true }), 0);
      } catch {
        // no-op
      }
    }
  }
}
