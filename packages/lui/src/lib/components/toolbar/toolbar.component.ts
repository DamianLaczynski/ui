import { Component, input, output, computed, ChangeDetectionStrategy } from '@angular/core';

import { ToolbarItem, ToolbarGroup } from './models/toolbar-item.model';
import { ButtonComponent } from '../button/button.component';
import { DividerComponent } from '../divider/divider.component';
import { MenuComponent } from '../menu/menu.component';
import { MenuItem } from '../menu/models/menu-item.model';

@Component({
  selector: 'ui-toolbar',
  templateUrl: './toolbar.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [ButtonComponent, DividerComponent, MenuComponent],
})
export class ToolbarComponent {
  items = input<ToolbarItem[]>([]);
  groups = input<ToolbarGroup[]>([]);
  size = input<'small' | 'medium' | 'large'>('medium');
  orientation = input<'horizontal' | 'vertical'>('horizontal');
  overflow = input<boolean>(false);

  itemClick = output<ToolbarItem>();

  toolbarItems = computed(() => {
    const groups = this.groups();
    if (groups.length > 0) {
      const items: ToolbarItem[] = [];
      groups.forEach((group, groupIndex) => {
        if (groupIndex > 0) {
          items.push({
            id: `divider-${groupIndex}`,
            type: 'divider',
          });
        }
        items.push(...group.items);
      });
      return items;
    }
    return this.items();
  });

  getToolbarClasses(): string {
    const classes = ['toolbar'];
    classes.push(`toolbar--${this.orientation()}`);
    classes.push(`toolbar--${this.size()}`);

    if (this.overflow()) {
      classes.push('toolbar--overflow');
    }

    return classes.join(' ');
  }

  getItemClasses(item: ToolbarItem): string {
    const classes = ['toolbar__item'];

    if (item.type) {
      classes.push(`toolbar__item--${item.type}`);
    }

    if (item.disabled) {
      classes.push('toolbar__item--disabled');
    }

    if (item.selected) {
      classes.push('toolbar__item--selected');
    }

    return classes.join(' ');
  }

  onItemClick(item: ToolbarItem, event: MouseEvent): void {
    if (item.disabled || item.type === 'divider') {
      event.preventDefault();
      return;
    }
    event.stopPropagation();

    // Execute action only once - either via action callback or itemClick output
    if (item.action) {
      item.action();
    } else {
      this.itemClick.emit(item);
    }
  }

  isDivider(item: ToolbarItem): boolean {
    return item.type === 'divider';
  }

  isSplitButton(item: ToolbarItem): boolean {
    return item.type === 'split' && !!item.menuItems?.length;
  }

  onSplitMenuItemClick(item: MenuItem): void {
    // Menu component already executes item.action(), so we don't need to call it again
    // This prevents double execution of the action
  }
}
