import {
  ComponentRef,
  Directive,
  inject,
  Injector,
  OnDestroy,
  output,
  PLATFORM_ID,
  input,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { MenuListComponent } from '../menu/menu-list/menu-list.component';
import { MenuItem, MenuSection } from '../menu/models/menu-item.model';
import { Appearance, Size, Variant } from '../utils';
import { UiI18nService } from '../../i18n';
import {
  CONTEXT_MENU_OVERLAY_MAX_WIDTH,
  CONTEXT_MENU_OVERLAY_MIN_WIDTH,
  CONTEXT_MENU_OVERLAY_POSITIONS,
  CONTEXT_MENU_OVERLAY_VIEWPORT_MARGIN,
} from './context-menu-overlay.config';

@Directive({
  selector: '[uiContextMenu]',
  standalone: true,
  host: {
    '(contextmenu)': 'onContextMenu($event)',
  },
})
export class ContextMenuDirective implements OnDestroy {
  private readonly overlay = inject(Overlay);
  private readonly injector = inject(Injector);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly i18n = inject(UiI18nService);

  private readonly defaultAriaLabel = this.i18n.tSignal('contextMenu.ariaLabel', 'Context menu');

  uiContextMenuItems = input<MenuItem[]>([]);
  uiContextMenuSections = input<MenuSection[]>([]);
  uiContextMenuDisabled = input(false);
  uiContextMenuMaxHeight = input('250px');
  uiContextMenuSize = input<Size>('medium');
  uiContextMenuVariant = input<Variant>('secondary');
  uiContextMenuAppearance = input<Appearance>('subtle');
  uiContextMenuItemVariant = input<Variant>('secondary');
  uiContextMenuItemAppearance = input<Appearance>('subtle');
  uiContextMenuAriaLabel = input<string | undefined>(undefined);
  uiContextMenuAutoFocusFirstItem = input(false);

  contextMenuItemClick = output<MenuItem>();
  contextMenuOpened = output<void>();
  contextMenuClosed = output<void>();

  private overlayRef: OverlayRef | null = null;
  private menuListRef: ComponentRef<MenuListComponent> | null = null;
  private subscriptions = new Subscription();
  private anchorPoint = { x: 0, y: 0 };

  ngOnDestroy(): void {
    this.close();
  }

  onContextMenu(event: MouseEvent): void {
    if (this.uiContextMenuDisabled() || !this.hasMenuContent()) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    this.anchorPoint = { x: event.clientX, y: event.clientY };
    this.open();
  }

  private hasMenuContent(): boolean {
    return this.uiContextMenuItems().length > 0 || this.uiContextMenuSections().length > 0;
  }

  private open(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.close();

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.anchorPoint)
      .withPositions(CONTEXT_MENU_OVERLAY_POSITIONS)
      .withPush(true)
      .withFlexibleDimensions(true)
      .withViewportMargin(CONTEXT_MENU_OVERLAY_VIEWPORT_MARGIN);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close(),
      panelClass: ['ui-context-menu-overlay-pane'],
      minWidth: CONTEXT_MENU_OVERLAY_MIN_WIDTH,
      maxWidth: CONTEXT_MENU_OVERLAY_MAX_WIDTH,
      maxHeight: this.uiContextMenuMaxHeight(),
    });

    const portal = new ComponentPortal(MenuListComponent, null, this.injector);
    this.menuListRef = this.overlayRef.attach(portal);
    this.menuListRef.setInput('items', this.uiContextMenuItems());
    this.menuListRef.setInput('sections', this.uiContextMenuSections());
    this.menuListRef.setInput('visible', true);
    this.menuListRef.setInput('maxHeight', this.uiContextMenuMaxHeight());
    this.menuListRef.setInput('size', this.uiContextMenuSize());
    this.menuListRef.setInput('variant', this.uiContextMenuVariant());
    this.menuListRef.setInput('appearance', this.uiContextMenuAppearance());
    this.menuListRef.setInput('menuItemVariant', this.uiContextMenuItemVariant());
    this.menuListRef.setInput('menuItemAppearance', this.uiContextMenuItemAppearance());
    this.menuListRef.setInput('autoFocusFirstItem', this.uiContextMenuAutoFocusFirstItem());

    const menuElement = this.menuListRef.location.nativeElement as HTMLElement;
    const ariaLabel = this.uiContextMenuAriaLabel() ?? this.defaultAriaLabel();
    menuElement.setAttribute('aria-label', ariaLabel);

    this.subscriptions.add(
      this.menuListRef.instance.itemClick.subscribe(item => this.handleItemClick(item)),
    );
    this.subscriptions.add(this.menuListRef.instance.closed.subscribe(() => this.close()));

    this.overlayRef.updatePosition();

    this.subscriptions.add(this.overlayRef.outsidePointerEvents().subscribe(() => this.close()));

    this.subscriptions.add(
      this.overlayRef
        .keydownEvents()
        .pipe(filter(event => event.key === 'Escape'))
        .subscribe(() => this.close()),
    );

    this.subscriptions.add(
      this.overlayRef.detachments().subscribe(() => {
        this.overlayRef = null;
        this.menuListRef = null;
        this.resetSubscriptions();
      }),
    );

    this.contextMenuOpened.emit();
  }

  private handleItemClick(item: MenuItem): void {
    this.contextMenuItemClick.emit(item);
    this.close();
  }

  private close(): void {
    if (!this.overlayRef) {
      return;
    }

    this.overlayRef.dispose();
    this.overlayRef = null;
    this.menuListRef = null;
    this.resetSubscriptions();
    this.contextMenuClosed.emit();
  }

  private resetSubscriptions(): void {
    this.subscriptions.unsubscribe();
    this.subscriptions = new Subscription();
  }
}
