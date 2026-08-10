import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from '../field/checkbox';
import { Orientation } from '../utils';
import { UiI18nService } from '../../i18n';

export type CardAppearance = 'filled' | 'filled-alternative' | 'outline' | 'subtle';

export type CardFocusMode = 'off' | 'no-tab' | 'tab-exit' | 'tab-only';

export type CardBorderStyle = 'solid' | 'dashed' | 'none';

export interface CardOnSelectData {
  selected: boolean;
}

export interface CardOnSelectionChangeEvent {
  event: MouseEvent | KeyboardEvent | Event;
  data: CardOnSelectData;
}

interface CardProjectedSlots {
  preview: boolean;
  floatingAction: boolean;
  checkbox: boolean;
}

const EMPTY_PROJECTED_SLOTS: CardProjectedSlots = {
  preview: false,
  floatingAction: false,
  checkbox: false,
};

@Component({
  selector: 'ui-card',
  templateUrl: './card.component.html',
  imports: [CommonModule, FormsModule, CheckboxComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly i18n = inject(UiI18nService);

  private readonly interactiveTargetSelector =
    'a[href],button,input,select,textarea,ui-button,ui-menu,ui-checkbox,[role="button"],[role="link"],[role="menuitem"],[contenteditable="true"],[contenteditable=""],[uiCardFloatingAction],[uiCardCheckbox]';

  private readonly focusableSelector =
    'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

  private hasInitializedDefaultSelection = false;
  private slotObserver: MutationObserver | null = null;

  private readonly focusTrapActive = signal<boolean>(false);
  private readonly projectedSlots = signal<CardProjectedSlots>(EMPTY_PROJECTED_SLOTS);

  private readonly cardRoot = viewChild<ElementRef<HTMLElement>>('cardRoot');

  appearance = input<CardAppearance>('filled');
  orientation = input<Orientation>('vertical');
  borderStyle = input<CardBorderStyle>('solid');

  focusMode = input<CardFocusMode>('off');
  interactive = input<boolean>(false);

  role = input<string>('group');
  ariaLabel = input<string | null>(null);
  ariaLabelledBy = input<string | null>(null);
  ariaDescribedBy = input<string | null>(null);

  selectable = input<boolean>(false);
  checkbox = input<boolean>(false);
  checkboxAriaLabel = input<string | null>(null);

  selected = model<boolean>(false);
  defaultSelected = input<boolean>(false);
  disabled = model<boolean>(false);

  cardClick = output<MouseEvent | KeyboardEvent>();
  selectionChange = output<CardOnSelectionChangeEvent>();

  hasPreviewSlot = computed(() => this.projectedSlots().preview);
  hasFloatingActionSlot = computed(() => this.projectedSlots().floatingAction);
  hasCheckboxSlot = computed(() => this.projectedSlots().checkbox);

  isSelectionEnabled = computed(
    () =>
      this.selectable() ||
      this.checkbox() ||
      this.hasCheckboxSlot() ||
      this.selected() ||
      this.defaultSelected(),
  );

  hasFloatingAction = computed(() => this.hasFloatingActionSlot());

  internalCheckboxAriaLabel = computed(() => {
    const fallback = this.i18n.t('card.selectAriaLabel', 'Select card');

    if (this.checkboxAriaLabel()) {
      return this.checkboxAriaLabel() ?? fallback;
    }

    if (this.ariaLabel()) {
      return this.ariaLabel() ?? fallback;
    }

    return fallback;
  });

  cardTabIndex = computed<number | null>(() => {
    if (this.disabled()) {
      return null;
    }

    if (this.focusMode() !== 'off') {
      return 0;
    }

    if (this.interactive() || this.isSelectionEnabled()) {
      return 0;
    }

    return null;
  });

  cardClasses = computed(() => {
    const classes = ['card'];

    classes.push(`card--${this.appearance()}`);
    classes.push(`card--${this.orientation()}`);
    classes.push(`card--border-${this.borderStyle()}`);

    if (this.disabled()) {
      classes.push('card--disabled');
    }

    if (this.interactive() || this.isSelectionEnabled()) {
      classes.push('card--interactive');
    }

    if (this.selected()) {
      classes.push('card--selected');
    }

    if (this.focusMode() !== 'off') {
      classes.push('card--focusable');
    }

    if (this.focusTrapActive()) {
      classes.push('card--focus-trapped');
    }

    if (this.hasFloatingAction()) {
      classes.push('card--has-floating-action');
    }

    if (this.hasPreviewSlot()) {
      classes.push('card--has-preview');
    }

    return classes.join(' ');
  });

  constructor() {
    effect(() => {
      if (this.hasInitializedDefaultSelection) {
        return;
      }

      if (this.defaultSelected()) {
        this.selected.set(true);
      }

      this.hasInitializedDefaultSelection = true;
    });

    afterNextRender(() => {
      this.refreshProjectedSlots();
      this.setupSlotObserver();
    });

    this.destroyRef.onDestroy(() => {
      this.slotObserver?.disconnect();
    });
  }

  onCardClick(event: MouseEvent): void {
    if (this.disabled()) {
      return;
    }

    if (this.isSelectionEnabled() && !this.shouldIgnoreSurfaceInteraction(event)) {
      this.toggleSelection(event);
    }

    if (this.interactive()) {
      this.cardClick.emit(event);
    }
  }

  onCardKeyDown(event: KeyboardEvent): void {
    if (this.disabled()) {
      return;
    }

    const cardElement = this.getCardElement();
    const target = event.target;
    const isRootTarget = !!cardElement && target === cardElement;

    if (this.handleFocusModeKeyDown(event, isRootTarget)) {
      return;
    }

    if (!isRootTarget) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();

      if (this.isSelectionEnabled()) {
        this.toggleSelection(event);
      }

      if (this.interactive()) {
        this.cardClick.emit(event);
      }
    }
  }

  onCardFocusOut(event: FocusEvent): void {
    if (!this.focusTrapActive()) {
      return;
    }

    const cardElement = this.getCardElement();
    const nextTarget = event.relatedTarget;

    if (!cardElement || (nextTarget instanceof Node && cardElement.contains(nextTarget))) {
      return;
    }

    this.deactivateFocusMode(false);
  }

  onInternalCheckboxChange(checked: boolean | Event): void {
    if (typeof checked === 'boolean') {
      this.toggleSelection(new Event('change'), checked);
      return;
    }

    const target = checked.target as HTMLInputElement | null;
    const nextState = !!target?.checked;
    this.toggleSelection(checked, nextState);
  }

  private toggleSelection(event: MouseEvent | KeyboardEvent | Event, nextState?: boolean): void {
    if (this.disabled()) {
      return;
    }

    const selected = typeof nextState === 'boolean' ? nextState : !this.selected();

    this.selected.set(selected);

    this.selectionChange.emit({
      event,
      data: {
        selected,
      },
    });
  }

  private shouldIgnoreSurfaceInteraction(event: MouseEvent): boolean {
    const target = event.target;

    if (!(target instanceof Element)) {
      return false;
    }

    if (target.closest('[data-card-no-toggle]')) {
      return true;
    }

    return !!target.closest(this.interactiveTargetSelector);
  }

  private handleFocusModeKeyDown(event: KeyboardEvent, isRootTarget: boolean): boolean {
    const mode = this.focusMode();

    if (mode === 'off') {
      return false;
    }

    if (mode === 'tab-only') {
      if (isRootTarget && event.key === 'Tab' && !event.shiftKey) {
        const focusables = this.getFocusableElements();

        if (focusables.length > 0) {
          event.preventDefault();
          focusables[0].focus();
          return true;
        }
      }

      return false;
    }

    if (isRootTarget && event.key === 'Enter') {
      event.preventDefault();
      this.activateFocusMode();
      return true;
    }

    if (!this.focusTrapActive()) {
      return false;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.deactivateFocusMode(true);
      return true;
    }

    if (event.key !== 'Tab') {
      return false;
    }

    if (mode === 'no-tab') {
      this.handleNoTabTabKey(event);
      return true;
    }

    return this.handleTabExitTabKey(event);
  }

  private activateFocusMode(): void {
    this.focusTrapActive.set(true);

    const focusables = this.getFocusableElements();

    if (focusables.length > 0) {
      focusables[0].focus();
    }
  }

  private deactivateFocusMode(focusRoot: boolean): void {
    this.focusTrapActive.set(false);

    if (focusRoot) {
      this.focusRootElement();
    }
  }

  private handleNoTabTabKey(event: KeyboardEvent): void {
    const focusables = this.getFocusableElements();

    if (focusables.length === 0) {
      event.preventDefault();
      return;
    }

    const activeElement = document.activeElement;
    let currentIndex = focusables.findIndex(element => element === activeElement);

    if (currentIndex === -1) {
      currentIndex = event.shiftKey ? 0 : -1;
    }

    event.preventDefault();

    if (event.shiftKey) {
      currentIndex = currentIndex <= 0 ? focusables.length - 1 : currentIndex - 1;
    } else {
      currentIndex = currentIndex >= focusables.length - 1 ? 0 : currentIndex + 1;
    }

    focusables[currentIndex].focus();
  }

  private handleTabExitTabKey(event: KeyboardEvent): boolean {
    const focusables = this.getFocusableElements();

    if (focusables.length === 0) {
      event.preventDefault();
      this.deactivateFocusMode(true);
      return true;
    }

    const activeElement = document.activeElement;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (!event.shiftKey) {
      if (activeElement === last) {
        this.deactivateFocusMode(false);
      }

      return false;
    }

    if (activeElement === first) {
      event.preventDefault();
      this.deactivateFocusMode(true);
      return true;
    }

    return false;
  }

  private getCardElement(): HTMLElement | null {
    return this.cardRoot()?.nativeElement ?? null;
  }

  private focusRootElement(): void {
    this.getCardElement()?.focus();
  }

  private getFocusableElements(): HTMLElement[] {
    const cardElement = this.getCardElement();

    if (!cardElement) {
      return [];
    }

    const elements = Array.from(cardElement.querySelectorAll<HTMLElement>(this.focusableSelector));

    return elements.filter(element => element !== cardElement && this.isVisible(element));
  }

  private isVisible(element: HTMLElement): boolean {
    const win = element.ownerDocument.defaultView;

    if (!win) {
      return true;
    }

    const styles = win.getComputedStyle(element);

    if (styles.visibility === 'hidden' || styles.display === 'none') {
      return false;
    }

    if (element.hasAttribute('hidden')) {
      return false;
    }

    return true;
  }

  private setupSlotObserver(): void {
    const cardElement = this.getCardElement();

    if (!cardElement || typeof MutationObserver === 'undefined') {
      return;
    }

    this.slotObserver?.disconnect();

    this.slotObserver = new MutationObserver(() => {
      this.refreshProjectedSlots();
    });

    this.slotObserver.observe(cardElement, {
      childList: true,
      subtree: true,
    });
  }

  private refreshProjectedSlots(): void {
    const cardElement = this.getCardElement();

    if (!cardElement) {
      return;
    }

    const nextState: CardProjectedSlots = {
      preview: this.hasProjectedSlot(cardElement, '[uiCardPreview]'),
      floatingAction: this.hasProjectedSlot(cardElement, '[uiCardFloatingAction]'),
      checkbox: this.hasProjectedSlot(cardElement, '[uiCardCheckbox]'),
    };

    const previousState = this.projectedSlots();

    if (
      previousState.preview === nextState.preview &&
      previousState.floatingAction === nextState.floatingAction &&
      previousState.checkbox === nextState.checkbox
    ) {
      return;
    }

    this.projectedSlots.set(nextState);
  }

  private hasProjectedSlot(root: HTMLElement, selector: string): boolean {
    return root.querySelector(selector) !== null;
  }
}
