import { DOCUMENT } from '@angular/common';
import {
  Component,
  DestroyRef,
  computed,
  inject,
  input,
  output,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';

import { ButtonComponent } from '../button/button.component';

export type CalendarView = 'days' | 'months' | 'years';

export interface CalendarDay {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isInRange?: boolean;
  isRangeStart?: boolean;
  isRangeEnd?: boolean;
  isDisabled: boolean;
}

export interface CalendarMonth {
  name: string;
  index: number;
  isSelected: boolean;
}

export interface CalendarYear {
  year: number;
  isSelected: boolean;
}

@Component({
  selector: 'ui-calendar',
  imports: [ButtonComponent],
  templateUrl: './calendar.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }
    `,
  ],
})
export class CalendarComponent {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly documentLang = signal('en-US');

  // Inputs
  currentMonth = input.required<Date>();
  selectedDate = input<Date | null>(null);
  startDate = input<Date | null>(null);
  endDate = input<Date | null>(null);
  hoveredDate = input<Date | null>(null);
  calendarView = input.required<CalendarView>();
  min = input<string>('');
  max = input<string>('');
  size = input<'small' | 'medium' | 'large'>('medium');
  showMonthYearPicker = input<boolean>(true);
  isDayInHoverRangeFn = input<(day: CalendarDay) => boolean>();

  // Outputs
  dateSelect = output<CalendarDay>();
  monthSelect = output<number>();
  yearSelect = output<number>();
  previousMonth = output<void>();
  nextMonth = output<void>();
  previousYear = output<void>();
  nextYear = output<void>();
  previousYearRange = output<void>();
  nextYearRange = output<void>();
  switchToMonthsView = output<void>();
  switchToYearsView = output<void>();
  switchToDaysView = output<void>();
  dateHover = output<CalendarDay>();
  dateLeave = output<void>();
  isDayInHoverRange = output<(day: CalendarDay) => boolean>();

  weekDays = computed(() => this.getLocalizedWeekDays());
  monthNames = computed(() => this.getLocalizedMonthNames());

  monthYearText = computed(() => {
    const month = this.currentMonth();
    return month.toLocaleDateString(this.documentLang(), {
      year: 'numeric',
      month: 'long',
    });
  });

  calendarDays = computed(() => {
    return this.generateCalendarDays();
  });

  calendarMonths = computed(() => {
    return this.generateCalendarMonths();
  });

  calendarYears = computed(() => {
    return this.generateCalendarYears();
  });

  constructor() {
    this.syncDocumentLanguage();
    this.observeDocumentLanguage();
  }

  getYearRangeText(): string {
    const years = this.calendarYears();
    if (years.length === 0) return '';
    return `${years[0].year} - ${years[years.length - 1].year}`;
  }

  private generateCalendarDays(): CalendarDay[] {
    const month = this.currentMonth();
    const year = month.getFullYear();
    const monthIndex = month.getMonth();

    const firstDayOfMonth = new Date(year, monthIndex, 1);
    const lastDayOfMonth = new Date(year, monthIndex + 1, 0);

    // Get day of week (0 = Sunday, 1 = Monday, etc.)
    // We want Monday as first day, so adjust
    let firstDayWeekday = firstDayOfMonth.getDay();
    firstDayWeekday = firstDayWeekday === 0 ? 6 : firstDayWeekday - 1;

    const days: CalendarDay[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selected = this.selectedDate();
    const start = this.startDate();
    const end = this.endDate();
    const hovered = this.hoveredDate();

    const selectedDateOnly = selected
      ? new Date(selected.getFullYear(), selected.getMonth(), selected.getDate())
      : null;
    const startDateOnly = start
      ? new Date(start.getFullYear(), start.getMonth(), start.getDate())
      : null;
    const endDateOnly = end ? new Date(end.getFullYear(), end.getMonth(), end.getDate()) : null;
    const hoveredDateOnly = hovered
      ? new Date(hovered.getFullYear(), hovered.getMonth(), hovered.getDate())
      : null;

    // Add days from previous month
    for (let i = firstDayWeekday - 1; i >= 0; i--) {
      const date = new Date(year, monthIndex, -i);
      days.push(
        this.createCalendarDay(
          date,
          false,
          today,
          selectedDateOnly,
          startDateOnly,
          endDateOnly,
          hoveredDateOnly,
        ),
      );
    }

    // Add days of current month
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const date = new Date(year, monthIndex, day);
      days.push(
        this.createCalendarDay(
          date,
          true,
          today,
          selectedDateOnly,
          startDateOnly,
          endDateOnly,
          hoveredDateOnly,
        ),
      );
    }

    // Add days from next month to complete the grid
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, monthIndex + 1, day);
      days.push(
        this.createCalendarDay(
          date,
          false,
          today,
          selectedDateOnly,
          startDateOnly,
          endDateOnly,
          hoveredDateOnly,
        ),
      );
    }

    return days;
  }

  private createCalendarDay(
    date: Date,
    isCurrentMonth: boolean,
    today: Date,
    selected: Date | null,
    start: Date | null,
    end: Date | null,
    hovered: Date | null,
  ): CalendarDay {
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    // Determine selection state
    let isSelected = false;
    let isRangeStart = false;
    let isRangeEnd = false;
    let isInRange = false;

    if (selected && this.isSameDay(dateOnly, selected)) {
      isSelected = true;
    }

    if (start && this.isSameDay(dateOnly, start)) {
      isSelected = true;
      isRangeStart = true;
    }

    if (end && this.isSameDay(dateOnly, end)) {
      isSelected = true;
      isRangeEnd = true;
    }

    // Only calculate confirmed range (start to end)
    if (start && end) {
      isInRange = dateOnly > start && dateOnly < end;
    }

    const isDisabled = this.isDateDisabled(dateOnly);

    return {
      date: dateOnly,
      day: date.getDate(),
      isCurrentMonth,
      isToday: this.isSameDay(dateOnly, today),
      isSelected,
      isInRange,
      isRangeStart,
      isRangeEnd,
      isDisabled,
    };
  }

  private generateCalendarMonths(): CalendarMonth[] {
    const currentYear = this.currentMonth().getFullYear();
    const selected = this.selectedDate();
    const start = this.startDate();
    const end = this.endDate();
    const localizedMonths = this.monthNames();

    return localizedMonths.map((month, index) => {
      let isSelected = false;

      if (selected && selected.getFullYear() === currentYear && selected.getMonth() === index) {
        isSelected = true;
      }

      if (start && start.getFullYear() === currentYear && start.getMonth() === index) {
        isSelected = true;
      }

      if (end && end.getFullYear() === currentYear && end.getMonth() === index) {
        isSelected = true;
      }

      return {
        name: month,
        index,
        isSelected,
      };
    });
  }

  private generateCalendarYears(): CalendarYear[] {
    const currentYear = this.currentMonth().getFullYear();
    const startYear = Math.floor(currentYear / 12) * 12;
    const years: CalendarYear[] = [];

    const selected = this.selectedDate();
    const start = this.startDate();
    const end = this.endDate();

    for (let i = 0; i < 12; i++) {
      const year = startYear + i;
      let isSelected = false;

      if (selected && selected.getFullYear() === year) {
        isSelected = true;
      }

      if (start && start.getFullYear() === year) {
        isSelected = true;
      }

      if (end && end.getFullYear() === year) {
        isSelected = true;
      }

      years.push({
        year,
        isSelected,
      });
    }

    return years;
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  private isDateDisabled(date: Date): boolean {
    const dateStr = this.toISODate(date);

    if (this.min() && dateStr < this.min()) {
      return true;
    }

    if (this.max() && dateStr > this.max()) {
      return true;
    }

    return false;
  }

  private toISODate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getDayClasses(day: CalendarDay): string {
    const classes = ['calendar__day'];

    if (!day.isCurrentMonth) {
      classes.push('calendar__day--other-month');
    }

    if (day.isToday) {
      classes.push('calendar__day--today');
    }

    if (day.isRangeStart) {
      classes.push('calendar__day--range-start');
    }

    if (day.isRangeEnd) {
      classes.push('calendar__day--range-end');
    }

    // Check both confirmed range and hover preview range
    const isInHoverRange = this.isInHoverRange(day);
    if (day.isInRange || isInHoverRange) {
      classes.push('calendar__day--in-range');
    }

    if (day.isSelected) {
      classes.push('calendar__day--selected');
    }

    if (day.isDisabled) {
      classes.push('calendar__day--disabled');
    }

    classes.push(`calendar__day--${this.size()}`);

    return classes.join(' ');
  }

  getDayVariant(day: CalendarDay): 'primary' | 'secondary' {
    if (
      day.isSelected ||
      day.isRangeStart ||
      day.isRangeEnd ||
      day.isInRange ||
      this.isInHoverRange(day)
    ) {
      return 'primary';
    }

    return 'secondary';
  }

  getDayAppearance(day: CalendarDay): 'filled' | 'subtle' | 'tint' {
    if (day.isSelected || day.isRangeStart || day.isRangeEnd) {
      return 'filled';
    }

    if (day.isInRange || this.isInHoverRange(day)) {
      return 'tint';
    }

    return 'subtle';
  }

  private isInHoverRange(day: CalendarDay): boolean {
    const hoverFn = this.isDayInHoverRangeFn();
    return hoverFn ? hoverFn(day) : false;
  }

  onDateClick(day: CalendarDay, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.dateSelect.emit(day);
  }

  onMonthClick(monthIndex: number, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.monthSelect.emit(monthIndex);
  }

  onYearClick(year: number, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.yearSelect.emit(year);
  }

  onDateHover(day: CalendarDay): void {
    this.dateHover.emit(day);
  }

  onDateLeave(): void {
    this.dateLeave.emit();
  }

  onPreviousMonth(event?: MouseEvent | Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.previousMonth.emit();
  }

  onNextMonth(event?: MouseEvent | Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.nextMonth.emit();
  }

  onPreviousYear(event?: MouseEvent | Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.previousYear.emit();
  }

  onNextYear(event?: MouseEvent | Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.nextYear.emit();
  }

  onPreviousYearRange(event?: MouseEvent | Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.previousYearRange.emit();
  }

  onNextYearRange(event?: MouseEvent | Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.nextYearRange.emit();
  }

  onSwitchToMonthsView(event?: MouseEvent | Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.switchToMonthsView.emit();
  }

  onSwitchToYearsView(event?: MouseEvent | Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.switchToYearsView.emit();
  }

  onSwitchToDaysView(event?: MouseEvent | Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.switchToDaysView.emit();
  }

  trackByDate(index: number, day: CalendarDay): number {
    return day.date.getTime();
  }

  private getLocalizedWeekDays(): string[] {
    const formatter = new Intl.DateTimeFormat(this.documentLang(), { weekday: 'short' });
    const monday = new Date(Date.UTC(2024, 0, 1)); // Monday

    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(monday);
      date.setUTCDate(monday.getUTCDate() + index);
      return formatter.format(date);
    });
  }

  private getLocalizedMonthNames(): string[] {
    const formatter = new Intl.DateTimeFormat(this.documentLang(), { month: 'short' });

    return Array.from({ length: 12 }, (_, index) => {
      const date = new Date(Date.UTC(2024, index, 1));
      return formatter.format(date);
    });
  }

  private syncDocumentLanguage(): void {
    const htmlLang = this.document?.documentElement?.lang?.trim();
    this.documentLang.set(htmlLang || 'en-US');
  }

  private observeDocumentLanguage(): void {
    const htmlElement = this.document?.documentElement;
    if (!htmlElement || typeof MutationObserver === 'undefined') {
      return;
    }

    const observer = new MutationObserver(() => this.syncDocumentLanguage());
    observer.observe(htmlElement, {
      attributes: true,
      attributeFilter: ['lang'],
    });

    this.destroyRef.onDestroy(() => observer.disconnect());
  }
}
