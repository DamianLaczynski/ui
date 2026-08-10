import {
  Component,
  input,
  output,
  signal,
  computed,
  TemplateRef,
  ChangeDetectionStrategy,
  ElementRef,
  inject,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Size, Shape, Appearance, Orientation, Variant } from '../utils';
import { IconComponent, IconName } from '../icon';
import { TooltipDirective } from '../tooltip/tooltip.directive';
import {
  isTruncatableBreadcrumbContent,
  truncateBreadcrumbLongName,
  partitionBreadcrumbItems,
  type PartitionBreadcrumbItemsResult,
} from './breadcrumb.utils';
import { MenuComponent } from '../menu/menu.component';
import { MenuItem } from '../menu/models/menu-item.model';
import { UiI18nService } from '../../i18n';

export interface Breadcrumb<T = any> {
  id: string | number;
  label: string;
  variant?: Variant;
  appearance?: Appearance;
  size?: Size;
  shape?: Shape;
  icon?: IconName;
  disabled?: boolean;
  selected?: boolean;
  data?: T;
}

const ITEM_WIDTH_ESTIMATE: Record<string, number> = { small: 70, medium: 90, large: 110 };
const DIVIDER_WIDTH = 24;
const OVERFLOW_BUTTON_WIDTH = 48;

@Component({
  selector: 'ui-breadcrumb',
  imports: [CommonModule, IconComponent, TooltipDirective, MenuComponent],
  templateUrl: './breadcrumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.width]': 'responsiveOverflow() ? "100%" : null',
    '[style.minWidth]': 'responsiveOverflow() ? "0" : null',
    '[style.overflow]': 'responsiveOverflow() ? "hidden" : null',
  },
})
export class BreadcrumbComponent<T extends Breadcrumb> {
  private readonly i18n = inject(UiI18nService);

  items = input.required<T[]>();

  showIcons = input<boolean>(true);
  ariaLabel = input<string>('Breadcrumb');

  size = input<Size>('medium');
  variant = input<Variant>('primary');
  appearance = input<Appearance>('transparent');
  shape = input<Shape>('rounded');

  showSelectionIndicator = input<boolean>(false);
  indicatorPosition = input<Orientation>('horizontal');

  selectOnClick = input<boolean>(false);

  showQuickActions = input<boolean>(false);
  quickActionsTemplate = input<TemplateRef<any> | null>(null);

  focusMode = input<'tab' | 'arrow'>('tab');

  truncateLength = input<number | null>(null);

  maxDisplayedItems = input<number | null>(null);

  responsiveOverflow = input<boolean>(true);

  itemClick = output<T>();

  private elementRef = inject(ElementRef);

  private containerWidth = signal<number>(0);

  effectiveMaxDisplayedItems = computed(() => {
    const manualMax = this.maxDisplayedItems();
    if (!this.responsiveOverflow()) {
      return manualMax;
    }
    const width = this.containerWidth();
    if (width <= 0) return manualMax ?? Number.MAX_SAFE_INTEGER;
    const itemWidth = ITEM_WIDTH_ESTIMATE[this.size()] ?? 90;
    const slotWidth = itemWidth + DIVIDER_WIDTH;
    const available = width - OVERFLOW_BUTTON_WIDTH - 2 * DIVIDER_WIDTH;
    const computed = Math.max(2, Math.floor(available / slotWidth));
    return manualMax != null ? Math.min(manualMax, computed) : computed;
  });

  constructor() {
    effect(onCleanup => {
      if (!this.responsiveOverflow()) return;
      const el = this.elementRef.nativeElement as HTMLElement;
      if (typeof ResizeObserver === 'undefined') return;
      const ro = new ResizeObserver(entries => {
        const entry = entries[0];
        if (entry) {
          this.containerWidth.set(entry.contentRect.width);
        }
      });
      ro.observe(el);
      this.containerWidth.set(el.clientWidth);
      onCleanup(() => ro.disconnect());
    });
  }

  breadcrumbClasses(): string {
    const classes = ['breadcrumb'];
    classes.push(`breadcrumb--${this.size()}`);
    return classes.join(' ');
  }

  breadcrumbItemClasses(item: T): string {
    const classes = ['node'];
    classes.push(`node--${this.size()}`);
    classes.push(`node--${item.variant ?? this.variant()}`);
    classes.push(`node--${item.appearance ?? this.appearance()}`);
    classes.push(`node--${item.shape ?? this.shape()}`);
    if (item.selected) classes.push('node--selected');
    if (item.disabled) classes.push('node--disabled');
    if (this.showSelectionIndicator()) {
      classes.push(`node--indicator-${this.indicatorPosition()}`);
    }
    return classes.join(' ');
  }

  breadcrumbContentClasses(item: T): string {
    const classes = ['node__content'];
    classes.push('node__content--button');
    return classes.join(' ');
  }

  isBreadcrumbButton(item: T): boolean {
    return !item.disabled && !item.selected;
  }

  isBreadcrumbSpan(item: T): boolean {
    return !!item.disabled || !!item.selected;
  }

  onItemClick(item: T, event: Event): void {
    if (item.disabled || item.selected) return;
    this.itemClick.emit(item);
  }

  onKeydown(event: KeyboardEvent): void {
    if (this.focusMode() !== 'arrow') return;
    const host = this.elementRef.nativeElement as HTMLElement;
    const all = host.querySelectorAll(
      'a.breadcrumb__focusable, button.breadcrumb__focusable, span.breadcrumb__focusable',
    );
    const focusable: HTMLElement[] = [];
    for (let i = 0; i < all.length; i++) {
      const el = all[i] as HTMLElement;
      if (el.getAttribute('aria-disabled') !== 'true') focusable.push(el);
    }
    const current = focusable.indexOf(document.activeElement as HTMLElement);
    if (current === -1) return;

    let next = -1;
    if (event.key === 'ArrowLeft' || event.key === 'Home') {
      next = event.key === 'Home' ? 0 : Math.max(0, current - 1);
    } else if (event.key === 'ArrowRight' || event.key === 'End') {
      next =
        event.key === 'End' ? focusable.length - 1 : Math.min(focusable.length - 1, current + 1);
    }
    if (next >= 0 && next < focusable.length) {
      event.preventDefault();
      focusable[next].focus();
    }
  }

  shouldShowIcon(item: T): boolean {
    return this.showIcons() && !!item.icon;
  }

  isTruncatable(item: T): boolean {
    const maxLen = this.truncateLength();
    return maxLen != null && isTruncatableBreadcrumbContent(item.label, maxLen);
  }

  getDisplayLabel(item: T): string {
    const maxLen = this.truncateLength();
    if (maxLen == null) return item.label;
    return truncateBreadcrumbLongName(item.label, maxLen);
  }

  partitionedItems(): PartitionBreadcrumbItemsResult<T> | null {
    const max = this.effectiveMaxDisplayedItems();
    const all = this.items();
    if (max == null || max >= all.length || all.length <= max) return null;
    return partitionBreadcrumbItems(all, max);
  }

  overflowMenuItems(overflowItems: T[]): MenuItem[] {
    return overflowItems.map(item => ({
      id: String(item.id),
      label: item.label,
      icon: item.icon,
      disabled: item.disabled ?? false,
      selected: item.selected ?? false,
      action: () => this.itemClick.emit(item),
    }));
  }

  onOverflowItemClick(menuItem: MenuItem): void {
    const item = this.items().find(i => String(i.id) === menuItem.id);
    if (item) this.itemClick.emit(item);
  }

  computedAriaLabel(): string {
    const explicit = this.ariaLabel().trim();
    if (explicit && explicit !== 'Breadcrumb') {
      return explicit;
    }
    return this.i18n.t('breadcrumb.navAriaLabel', 'Breadcrumb');
  }

  getOverflowAriaLabel(overflowCount: number): string {
    return this.i18n.t('breadcrumb.overflowAriaLabel', `${overflowCount} more items`, {
      count: overflowCount,
    });
  }
}
