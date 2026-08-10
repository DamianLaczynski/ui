import {
  Component,
  forwardRef,
  input,
  signal,
  computed,
  ElementRef,
  ViewChild,
  ViewContainerRef,
  TemplateRef,
  effect,
  output,
  OnDestroy,
  inject,
  NgZone,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { FieldComponent } from '../field/field.component';
import { ActionButtonComponent } from '../action-button.component';
import { CalendarComponent, CalendarDay, CalendarView } from '../../calendar';
import {
  openConnectedOverlay,
  OverlayHandle,
  DEFAULT_CONNECTED_POSITIONS,
  DEFAULT_VIEWPORT_MARGIN,
} from '../../overlay/open-connected-overlay';

export interface DateRange {
  startDate: string | null;
  endDate: string | null;
}

type RangeSelection = 'start' | 'end' | null;

@Component({
  selector: 'ui-date-range',
  imports: [A11yModule, OverlayModule, FieldComponent, ActionButtonComponent, CalendarComponent],
  templateUrl: './date-range.component.html',
  host: {
    '[style.display]': '"block"',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateRangeComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: [
    `
      :host {
        width: 100%;
      }
    `,
  ],
})
export class DateRangeComponent extends FieldComponent implements OnDestroy {
  private overlay = inject(Overlay);
  private viewContainerRef = inject(ViewContainerRef);
  private scrollDispatcher = inject(ScrollDispatcher);
  private ngZone = inject(NgZone);
  private overlayHandle: OverlayHandle | null = null;

  min = input<string>('');
  max = input<string>('');
  separator = input<string>(' - ');
  showMonthYearPicker = input<boolean>(true);

  rangeChange = output<DateRange>();

  isOpen = signal<boolean>(false);
  currentMonth = signal<Date>(new Date());
  startDate = signal<Date | null>(null);
  endDate = signal<Date | null>(null);
  hoveredDate = signal<Date | null>(null);
  activeSelection = signal<RangeSelection>(null);
  calendarView = signal<CalendarView>('days');

  @ViewChild('triggerElement') triggerElement!: ElementRef;
  @ViewChild('panelTemplate') panelTemplate!: TemplateRef<any>;

  private isWritingValue = false;

  // Computed properties
  displayText = computed(() => {
    const start = this.startDate();
    const end = this.endDate();
    const separator = this.separator();

    if (!start && !end) {
      return this.placeholder() || 'Select date range...';
    }

    const startStr = start ? this.formatDate(start) : '';
    const endStr = end ? this.formatDate(end) : '';

    if (start && end) {
      return `${startStr}${separator}${endStr}`;
    } else if (start) {
      return `${startStr}${separator}...`;
    } else if (end) {
      return `...${separator}${endStr}`;
    }

    return '';
  });

  monthYearText = computed(() => {
    const month = this.currentMonth();
    return this.formatMonthYear(month);
  });

  constructor() {
    super();

    // Effect to update field value when selection changes
    effect(() => {
      if (this.isWritingValue) {
        return;
      }

      const start = this.startDate();
      const end = this.endDate();

      const rangeValue: DateRange = {
        startDate: start ? this.toISODate(start) : null,
        endDate: end ? this.toISODate(end) : null,
      };

      const currentValue = this.value as DateRange;
      const hasChanged =
        !currentValue ||
        currentValue.startDate !== rangeValue.startDate ||
        currentValue.endDate !== rangeValue.endDate;

      if (hasChanged) {
        this.value = rangeValue;
        this.onChange(rangeValue);
        this.rangeChange.emit(rangeValue);
      }
    });
  }

  ngOnDestroy(): void {
    this.overlayHandle?.destroy();
  }

  togglePanel(): void {
    if (this.disabled() || this.readonly()) {
      return;
    }

    if (this.isOpen()) {
      this.closePanel();
    } else {
      this.openPanel();
    }
  }

  openPanel(): void {
    if (this.isOpen()) return;

    // Set activeSelection based on current state
    if (this.startDate() && !this.endDate()) {
      this.activeSelection.set('end');
    } else {
      this.activeSelection.set('start');
    }

    if (this.startDate()) {
      this.currentMonth.set(new Date(this.startDate()!));
    }

    this.calendarView.set('days');

    this.overlayHandle = openConnectedOverlay({
      overlay: this.overlay,
      scrollDispatcher: this.scrollDispatcher,
      ngZone: this.ngZone,
      trigger: this.triggerElement,
      template: this.panelTemplate,
      viewContainerRef: this.viewContainerRef,
      config: {
        positions: DEFAULT_CONNECTED_POSITIONS,
        viewportMargin: DEFAULT_VIEWPORT_MARGIN,
        minWidth: 280,
        maxWidth: 320,
      },
      onClose: focusTrigger => this.closePanel(focusTrigger),
    });

    this.isOpen.set(true);
  }

  closePanel(shouldFocusTrigger = false): void {
    this.overlayHandle?.destroy();
    this.overlayHandle = null;
    this.isOpen.set(false);
    this.hoveredDate.set(null);
    this.activeSelection.set(null);
    if (shouldFocusTrigger && this.triggerElement?.nativeElement) {
      setTimeout(() => this.triggerElement.nativeElement.focus({ preventScroll: true }), 0);
    }
  }

  /**
   * Handle input value change from manual typing.
   */
  onDateRangeInputChange(event: Event): void {
    if (this.disabled() || this.readonly()) {
      return;
    }
    const target = event.target as HTMLInputElement;
    const inputValue = target.value.trim();

    // Try to parse date range from input
    if (inputValue) {
      const separator = this.separator();
      const parts = inputValue.split(separator);

      if (parts.length === 2) {
        const startStr = parts[0].trim();
        const endStr = parts[1].trim();

        const startDate = this.parseDateFromInput(startStr);
        const endDate = this.parseDateFromInput(endStr);

        if (startDate) {
          this.startDate.set(startDate);
        }
        if (endDate) {
          this.endDate.set(endDate);
        }
      } else if (parts.length === 1) {
        // Single date - treat as start date
        const date = this.parseDateFromInput(parts[0].trim());
        if (date) {
          this.startDate.set(date);
          this.endDate.set(null);
        }
      }
    } else {
      this.startDate.set(null);
      this.endDate.set(null);
    }
  }

  /**
   * Parse date from input string.
   */
  private parseDateFromInput(inputValue: string): Date | null {
    if (!inputValue || inputValue === '...') return null;

    // Try ISO format first
    const isoDate = new Date(inputValue);
    if (!isNaN(isoDate.getTime())) {
      return isoDate;
    }

    // Try common date formats
    const datePatterns = [
      /(\d{1,2})\/(\d{1,2})\/(\d{4})/, // MM/DD/YYYY
      /(\d{4})-(\d{1,2})-(\d{1,2})/, // YYYY-MM-DD
      /(\d{1,2})-(\d{1,2})-(\d{4})/, // MM-DD-YYYY
    ];

    for (const pattern of datePatterns) {
      const match = inputValue.match(pattern);
      if (match) {
        if (pattern === datePatterns[0] || pattern === datePatterns[2]) {
          // MM/DD/YYYY or MM-DD-YYYY
          const month = parseInt(match[1], 10) - 1;
          const day = parseInt(match[2], 10);
          const year = parseInt(match[3], 10);
          return new Date(year, month, day);
        } else {
          // YYYY-MM-DD
          const year = parseInt(match[1], 10);
          const month = parseInt(match[2], 10) - 1;
          const day = parseInt(match[3], 10);
          return new Date(year, month, day);
        }
      }
    }

    return null;
  }

  onCalendarDateSelect(day: CalendarDay): void {
    if (day.isDisabled) {
      return;
    }

    const selectedDate = day.date;
    const activeSelection = this.activeSelection();
    const currentStart = this.startDate();
    const currentEnd = this.endDate();

    // Scenario 1: Selecting start date (first click or resetting range)
    if (activeSelection === 'start') {
      this.startDate.set(selectedDate);
      this.endDate.set(null);
      this.activeSelection.set('end');
      // Keep panel open for end date selection
      return;
    }

    // Scenario 2: Selecting end date
    if (activeSelection === 'end' && currentStart) {
      if (selectedDate < currentStart) {
        // If end date is before start date, swap them
        this.endDate.set(currentStart);
        this.startDate.set(selectedDate);
      } else if (selectedDate.getTime() === currentStart.getTime()) {
        // If clicking the same date, treat as single day range
        this.endDate.set(selectedDate);
      } else {
        // Normal case: end date after start date
        this.endDate.set(selectedDate);
      }

      this.activeSelection.set(null);
      // Close panel after selecting end date
      setTimeout(() => {
        this.closePanel();
      }, 150);
      return;
    }

    // Scenario 3: Both dates selected, start new selection
    if (currentStart && currentEnd) {
      this.startDate.set(selectedDate);
      this.endDate.set(null);
      this.activeSelection.set('end');
      return;
    }

    // Fallback: treat as start date
    this.startDate.set(selectedDate);
    this.endDate.set(null);
    this.activeSelection.set('end');
  }

  onCalendarDateHover(day: CalendarDay): void {
    if (!day.isDisabled && this.startDate() && !this.endDate()) {
      this.hoveredDate.set(day.date);
    }
  }

  onCalendarDateLeave(): void {
    this.hoveredDate.set(null);
  }

  // Check if a day is in the hover range (for calendar component)
  isDayInHoverRange(day: CalendarDay): boolean {
    const start = this.startDate();
    const end = this.endDate();
    const hovered = this.hoveredDate();

    if (!start || end || !hovered) {
      return false;
    }

    const dateOnly = new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate());
    const startOnly = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const hoveredOnly = new Date(hovered.getFullYear(), hovered.getMonth(), hovered.getDate());

    const rangeStart = startOnly < hoveredOnly ? startOnly : hoveredOnly;
    const rangeEnd = startOnly < hoveredOnly ? hoveredOnly : startOnly;

    return dateOnly > rangeStart && dateOnly < rangeEnd;
  }

  onCalendarMonthSelect(monthIndex: number): void {
    const newDate = new Date(this.currentMonth());
    newDate.setMonth(monthIndex);
    this.currentMonth.set(newDate);
    this.calendarView.set('days');
  }

  onCalendarYearSelect(year: number): void {
    const newDate = new Date(this.currentMonth());
    newDate.setFullYear(year);
    this.currentMonth.set(newDate);
    this.calendarView.set('months');
  }

  onCalendarSwitchToMonthsView(): void {
    this.calendarView.set('months');
  }

  onCalendarSwitchToYearsView(): void {
    this.calendarView.set('years');
  }

  onCalendarSwitchToDaysView(): void {
    this.calendarView.set('days');
  }

  onCalendarPreviousMonth(): void {
    const newMonth = new Date(this.currentMonth());
    newMonth.setMonth(newMonth.getMonth() - 1);
    this.currentMonth.set(newMonth);
  }

  onCalendarNextMonth(): void {
    const newMonth = new Date(this.currentMonth());
    newMonth.setMonth(newMonth.getMonth() + 1);
    this.currentMonth.set(newMonth);
  }

  onCalendarPreviousYear(): void {
    const newMonth = new Date(this.currentMonth());
    newMonth.setFullYear(newMonth.getFullYear() - 1);
    this.currentMonth.set(newMonth);
  }

  onCalendarNextYear(): void {
    const newMonth = new Date(this.currentMonth());
    newMonth.setFullYear(newMonth.getFullYear() + 1);
    this.currentMonth.set(newMonth);
  }

  onCalendarPreviousYearRange(): void {
    const newMonth = new Date(this.currentMonth());
    newMonth.setFullYear(newMonth.getFullYear() - 12);
    this.currentMonth.set(newMonth);
  }

  onCalendarNextYearRange(): void {
    const newMonth = new Date(this.currentMonth());
    newMonth.setFullYear(newMonth.getFullYear() + 12);
    this.currentMonth.set(newMonth);
  }

  private formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }

  private formatMonthYear(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  }

  private toISODate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Override ControlValueAccessor methods
  override writeValue(value: any): void {
    this.isWritingValue = true;

    if (!value || (typeof value === 'object' && !value.startDate && !value.endDate)) {
      this.startDate.set(null);
      this.endDate.set(null);
      super.writeValue(null);
      this.isWritingValue = false;
      return;
    }

    if (typeof value === 'object' && (value.startDate || value.endDate)) {
      if (value.startDate) {
        this.startDate.set(new Date(value.startDate));
      }
      if (value.endDate) {
        this.endDate.set(new Date(value.endDate));
      }
    }

    super.writeValue(value);
    this.isWritingValue = false;
  }

  override clear(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.startDate.set(null);
    this.endDate.set(null);
    this.activeSelection.set('start');
    super.clear();
  }
}
