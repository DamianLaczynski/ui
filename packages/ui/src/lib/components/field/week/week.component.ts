import {
  Component,
  computed,
  effect,
  forwardRef,
  input,
  signal,
  ElementRef,
  TemplateRef,
  ViewChild,
  OnDestroy,
  inject,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { BreakpointObserver } from '@angular/cdk/layout';
import { OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { DateFieldOverlayService } from '../base-date-field/base-date-field.component';
import { FieldComponent } from '../field/field.component';
import { ActionButtonComponent } from '../action-button.component';
import { ButtonComponent } from '../../button';
import { IconName } from '../../icon';
import { Subscription } from 'rxjs';

const MOBILE_BREAKPOINT = '(max-width: 768px)';

export type WeekDisplayFormat = 'week-year' | 'date-range' | 'iso';

interface CalendarWeek {
  weekNumber: number;
  startDate: Date;
  endDate: Date;
  year: number;
  isSelected: boolean;
}

@Component({
  selector: 'ui-week',
  standalone: true,
  imports: [
    CommonModule,
    A11yModule,
    OverlayModule,
    FieldComponent,
    ActionButtonComponent,
    ButtonComponent,
  ],
  templateUrl: './week.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WeekComponent),
      multi: true,
    },
    DateFieldOverlayService,
  ],
  styles: [
    `
      :host {
        width: 100%;
        display: block;
      }
    `,
  ],
})
export class WeekComponent extends FieldComponent implements OnDestroy {
  private overlayService = inject(DateFieldOverlayService);
  private breakpointObserver = inject(BreakpointObserver);

  displayFormat = input<WeekDisplayFormat>('date-range');
  min = input<string>('');
  max = input<string>('');
  panelWidth = input<number>(300);
  useNativeOnMobile = input<boolean>(true);

  isOpen = this.overlayService.isOpen;
  isMobile = signal(false);
  private breakpointSub?: Subscription;

  @ViewChild('triggerElement') triggerElement!: ElementRef;
  @ViewChild('panelTemplate') panelTemplate!: TemplateRef<unknown>;

  currentMonth = signal<Date>(new Date());
  selectedDate = signal<Date | null>(null);
  selectedWeek = signal<number | null>(null);
  selectedYear = signal<number | null>(null);

  displayText = computed(() => {
    const date = this.selectedDate();
    const week = this.selectedWeek();
    const year = this.selectedYear();

    if (!date || !week || !year) {
      return '';
    }

    return this.formatWeek(date, week, year);
  });

  calendarWeeks = computed(() => this.generateCalendarWeeks());

  constructor() {
    super();

    this.breakpointSub = this.breakpointObserver.observe(MOBILE_BREAKPOINT).subscribe(result => {
      this.isMobile.set(result.matches);
    });

    effect(() => {
      const date = this.selectedDate();
      this.value = date ? this.toISOWeek(date) : '';
      this.onChange(this.value);
    });
  }

  ngOnDestroy(): void {
    this.breakpointSub?.unsubscribe();
    this.overlayService.ngOnDestroy();
  }

  togglePanel(): void {
    if (this.disabled() || this.readonly()) {
      return;
    }

    this.overlayService.toggle(
      this.triggerElement,
      this.panelTemplate,
      this.panelWidth(),
      () => {
        if (this.selectedDate()) {
          this.currentMonth.set(new Date(this.selectedDate()!));
        }
      },
      ref => this.scrollSelectedWeekIntoView(ref),
    );
  }

  closePanel(shouldFocusTrigger: boolean = false): void {
    this.overlayService.close(shouldFocusTrigger, this.triggerElement);
  }

  selectWeek(week: CalendarWeek): void {
    this.selectedWeek.set(week.weekNumber);
    this.selectedYear.set(week.year);
    this.selectedDate.set(week.startDate);
    this.closePanel(false);
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

  goToToday(): void {
    const today = new Date();
    this.currentMonth.set(today);
    this.selectedDate.set(today);
    this.selectedWeek.set(this.getWeekNumber(today));
    this.selectedYear.set(today.getFullYear());
    this.closePanel(false);
  }

  override writeValue(value: unknown): void {
    if (!value) {
      this.selectedDate.set(null);
      this.selectedWeek.set(null);
      this.selectedYear.set(null);
      super.writeValue('');
      return;
    }

    const input = String(value).trim();
    const parsedValue = this.parseISOWeekValue(input);

    if (!parsedValue) {
      this.selectedDate.set(null);
      this.selectedWeek.set(null);
      this.selectedYear.set(null);
      super.writeValue('');
      return;
    }

    this.selectedDate.set(parsedValue.date);
    this.selectedWeek.set(parsedValue.weekNumber);
    this.selectedYear.set(parsedValue.weekYear);
    super.writeValue(value);
  }

  override clear(): void {
    this.selectedDate.set(null);
    this.selectedWeek.set(null);
    this.selectedYear.set(null);
    super.clear();
  }

  openPanel(): void {
    this.overlayService.open(
      this.triggerElement,
      this.panelTemplate,
      this.panelWidth(),
      () => {
        if (this.selectedDate()) {
          this.currentMonth.set(new Date(this.selectedDate()!));
        }
      },
      ref => this.scrollSelectedWeekIntoView(ref),
    );
  }

  private scrollSelectedWeekIntoView(overlayRef: OverlayRef): void {
    const selected = overlayRef.overlayElement.querySelector<HTMLElement>(
      '[data-ui-week-picker-selected]',
    );
    if (selected && typeof selected.scrollIntoView === 'function') {
      selected.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
  }

  getIcon(): IconName {
    return 'calendar_week_numbers';
  }

  onNativeWeekChange(event: Event): void {
    if (this.disabled() || this.readonly()) {
      return;
    }

    const target = event.target as HTMLInputElement;
    const inputValue = target.value.trim();
    if (!inputValue) {
      this.selectedDate.set(null);
      this.selectedWeek.set(null);
      this.selectedYear.set(null);
      this.onChange('');
      return;
    }

    const parsed = this.parseISOWeekValue(inputValue);
    if (parsed) {
      this.selectedDate.set(parsed.date);
      this.selectedWeek.set(parsed.weekNumber);
      this.selectedYear.set(parsed.weekYear);
      this.onChange(inputValue);
    }
  }

  private parseISOWeekValue(
    value: string,
  ): { date: Date; weekNumber: number; weekYear: number } | null {
    const match = value.match(/^(\d{4})-W(\d{2})$/);
    if (!match) {
      return null;
    }

    const year = parseInt(match[1], 10);
    const week = parseInt(match[2], 10);
    if (week < 1 || week > 53) {
      return null;
    }

    const jan4 = new Date(year, 0, 4);
    const jan4Day = jan4.getDay() || 7;
    const week1Monday = new Date(jan4);
    week1Monday.setDate(jan4.getDate() - (jan4Day - 1));

    const result = new Date(week1Monday);
    result.setDate(week1Monday.getDate() + (week - 1) * 7);

    if (this.getWeekNumber(result) !== week) {
      return null;
    }

    return {
      date: result,
      weekNumber: week,
      weekYear: year,
    };
  }

  private generateCalendarWeeks(): CalendarWeek[] {
    const currentYear = this.currentMonth().getFullYear();
    const weeks: CalendarWeek[] = [];

    // Start from first Monday of the year (or last Monday of previous year)
    const jan1 = new Date(currentYear, 0, 1);
    const jan1Day = jan1.getDay();
    const daysToMonday = jan1Day === 0 ? -6 : 1 - jan1Day;
    const currentDate = new Date(jan1);
    currentDate.setDate(jan1.getDate() + daysToMonday);

    // Generate weeks that belong to this year
    const seenWeeks = new Set<string>();

    while (currentDate.getFullYear() <= currentYear) {
      const weekStart = new Date(currentDate);
      const weekEnd = new Date(currentDate);
      weekEnd.setDate(weekEnd.getDate() + 6);

      const weekNumber = this.getWeekNumber(weekStart);
      const weekYear = this.getWeekYear(weekStart);

      // Only include weeks that belong to the current year
      if (weekYear === currentYear) {
        const weekKey = `${weekYear}-W${weekNumber}`;

        // Avoid duplicates
        if (!seenWeeks.has(weekKey)) {
          seenWeeks.add(weekKey);

          const isSelected = this.selectedWeek() === weekNumber && this.selectedYear() === weekYear;

          weeks.push({
            weekNumber,
            startDate: weekStart,
            endDate: weekEnd,
            year: weekYear,
            isSelected,
          });
        }
      }

      currentDate.setDate(currentDate.getDate() + 7);

      // Stop if we've gone too far into next year
      if (currentDate.getFullYear() > currentYear + 1) {
        break;
      }
    }

    return weeks;
  }

  private formatWeek(date: Date, week: number, year: number): string {
    const format = this.displayFormat();

    if (format === 'iso') {
      return `${year}-W${String(week).padStart(2, '0')}`;
    }

    if (format === 'week-year') {
      return `${week}/${year}`;
    }

    // date-range format (default)
    const weekStart = new Date(date);
    const weekEnd = new Date(date);
    weekEnd.setDate(weekEnd.getDate() + 6);

    const startDay = weekStart.getDate();
    const endDay = weekEnd.getDate();
    const startMonth = weekStart.toLocaleDateString('en-US', { month: 'short' });
    const endMonth = weekEnd.toLocaleDateString('en-US', { month: 'short' });

    if (startMonth === endMonth) {
      return `${startDay}-${endDay} ${startMonth} ${year}`;
    }

    return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${year}`;
  }

  private toISOWeek(date: Date): string {
    const week = this.getWeekNumber(date);
    return `${date.getFullYear()}-W${String(week).padStart(2, '0')}`;
  }

  private getWeekNumber(date: Date): number {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  }

  private getWeekYear(date: Date): number {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    return d.getUTCFullYear();
  }
}
