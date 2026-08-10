import { Component, input, output, signal, effect, ChangeDetectionStrategy } from '@angular/core';

import { Size, Appearance, Orientation, Variant, Shape } from '../utils';
import { NodeComponent } from '../node/node.component';
import { IconName } from '../icon';

export interface Tab<T = any> {
  id: string | number;
  label: string;
  variant?: Variant;
  appearance?: Appearance;
  size?: Size;
  shape?: Shape;
  icon?: IconName;
  disabled?: boolean;
  selected?: boolean;
  closable?: boolean;
  data?: T;
}

@Component({
  selector: 'ui-tabs',
  imports: [NodeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      [class]="tabsClasses()"
      role="tablist"
      [attr.aria-orientation]="orientation()"
      (keydown)="onKeyDown($event)"
    >
      @for (tab of tabs(); track tab.id) {
        <ui-node
          [node]="getNodeWithSelection(tab)"
          [size]="size()"
          [variant]="variant()"
          [appearance]="appearance()"
          [shape]="shape()"
          [asButton]="true"
          [showSelectionIndicator]="showSelectionIndicator()"
          [indicatorPosition]="orientation()"
          [selectOnClick]="false"
          [slideDirection]="isSelected(tab) ? slideDirection() : null"
          (nodeClick)="onTabClick(tab)"
          (nodeClose)="onTabClose(tab)"
        />
      }

      <!-- More button (overflow menu) -->
      @if (showMoreButton()) {
        <div class="tabs__more-button">
          <ng-content select="[moreButton]"></ng-content>
        </div>
      }
    </div>
  `,
})
export class TabsComponent<T extends Tab> {
  tabs = input.required<T[]>();
  selectedTabId = input<string | number>();

  size = input<Size>('medium');
  variant = input<Variant>('primary');
  appearance = input<Appearance>('transparent');
  shape = input<Shape>('rounded');
  orientation = input<Orientation>('horizontal');

  showMoreButton = input<boolean>(false);
  showSelectionIndicator = input<boolean>(true);
  fullWidth = input<boolean>(false);

  // Outputs
  tabChange = output<T>();
  tabClose = output<T>();
  selectedTabIdChange = output<string | number>();

  // Local state
  private _selectedTabId = signal<string | number | undefined>(undefined);
  private _previousTabId = signal<string | number | undefined>(undefined);
  private _slideDirection = signal<'left' | 'right' | null>(null);

  constructor() {
    // Sync selectedTabId input with internal state
    effect(() => {
      const id = this.selectedTabId();
      if (id !== undefined) {
        this._selectedTabId.set(id);
      } else if (this.tabs().length > 0) {
        // Auto-select first tab if none selected
        this._selectedTabId.set(this.tabs()[0].id);
      }
    });
  }

  /**
   * Get tabs container classes
   */
  tabsClasses(): string {
    const classes = ['tabs'];

    classes.push(`tabs--${this.size()}`);
    classes.push(`tabs--${this.variant()}`);
    classes.push(`tabs--${this.appearance()}`);
    classes.push(`tabs--${this.shape()}`);
    classes.push(`tabs--${this.orientation()}`);

    if (this.fullWidth()) {
      classes.push('tabs--full-width');
    }

    return classes.join(' ');
  }

  /**
   * Get node data with selection state
   */
  getNodeWithSelection(tab: T): T {
    return {
      ...tab,
      selected: this.isSelected(tab),
    };
  }

  /**
   * Get slide direction for indicator animation
   */
  getSlideDirection(tab: T): 'left' | 'right' | null {
    if (!this._previousTabId() || this._previousTabId() === tab.id) {
      return null;
    }

    const tabs = this.tabs().filter(t => !t.disabled);
    const previousIndex = tabs.findIndex(t => t.id === this._previousTabId());
    const currentIndex = tabs.findIndex(t => t.id === tab.id);

    if (previousIndex === -1 || currentIndex === -1) {
      return null;
    }

    return currentIndex > previousIndex ? 'right' : 'left';
  }

  /**
   * Check if tab is selected
   */
  isSelected(tab: T): boolean {
    return this._selectedTabId() === tab.id;
  }

  /**
   * Get current slide direction
   */
  slideDirection(): 'left' | 'right' | null {
    return this._slideDirection();
  }

  /**
   * Handle tab click
   */
  onTabClick(tab: T): void {
    if (tab.disabled) {
      return;
    }

    // Don't emit if tab is already selected
    if (this._selectedTabId() === tab.id) {
      return;
    }

    // Store previous tab ID for direction detection
    this._previousTabId.set(this._selectedTabId());

    // Determine slide direction
    const tabs = this.tabs().filter(t => !t.disabled);
    const previousIndex = tabs.findIndex(t => t.id === this._previousTabId());
    const currentIndex = tabs.findIndex(t => t.id === tab.id);

    if (previousIndex !== -1 && currentIndex !== -1) {
      this._slideDirection.set(currentIndex > previousIndex ? 'right' : 'left');
    } else {
      this._slideDirection.set(null);
    }

    this._selectedTabId.set(tab.id);
    this.tabChange.emit(tab);
    this.selectedTabIdChange.emit(tab.id);

    // Reset direction after animation completes
    setTimeout(() => {
      this._slideDirection.set(null);
    }, 300);
  }

  onTabClose(tab: T): void {
    this.tabClose.emit(tab);
  }

  /**
   * Handle keyboard navigation
   */
  onKeyDown(event: KeyboardEvent): void {
    const tabs = this.tabs().filter(t => !t.disabled);
    const currentSelectedId = this._selectedTabId();
    const currentIndex = tabs.findIndex(t => t.id === currentSelectedId);
    const isVertical = this.orientation() === 'vertical';

    // Only handle if there's a selected tab
    if (currentIndex === -1 && tabs.length > 0) {
      return;
    }

    switch (event.key) {
      case 'ArrowLeft':
        if (!isVertical) {
          event.preventDefault();
          if (currentIndex > 0) {
            this.onTabClick(tabs[currentIndex - 1]);
          }
        }
        break;

      case 'ArrowRight':
        if (!isVertical) {
          event.preventDefault();
          if (currentIndex < tabs.length - 1) {
            this.onTabClick(tabs[currentIndex + 1]);
          }
        }
        break;

      case 'ArrowUp':
        if (isVertical) {
          event.preventDefault();
          if (currentIndex > 0) {
            this.onTabClick(tabs[currentIndex - 1]);
          }
        }
        break;

      case 'ArrowDown':
        if (isVertical) {
          event.preventDefault();
          if (currentIndex < tabs.length - 1) {
            this.onTabClick(tabs[currentIndex + 1]);
          }
        }
        break;

      case 'Home':
        event.preventDefault();
        if (tabs.length > 0) {
          this.onTabClick(tabs[0]);
        }
        break;

      case 'End':
        event.preventDefault();
        if (tabs.length > 0) {
          this.onTabClick(tabs[tabs.length - 1]);
        }
        break;
    }
  }
}
