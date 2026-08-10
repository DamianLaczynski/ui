import {
  Component,
  computed,
  effect,
  forwardRef,
  signal,
  ElementRef,
  TemplateRef,
  ViewChild,
  input,
  OnDestroy,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { BreakpointObserver } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { DateFieldOverlayService } from '../base-date-field/base-date-field.component';
import { FieldComponent } from '../field/field.component';
import { ActionButtonComponent } from '../action-button.component';
import { CalendarComponent, CalendarDay, CalendarView } from '../../calendar';
import { ButtonComponent } from '../../button';
import { IconName } from '../../icon';
import { Subscription } from 'rxjs';

const MOBILE_BREAKPOINT = '(max-width: 768px)';

@Component({
  selector: 'ui-date',
  standalone: true,
  imports: [
    CommonModule,
    A11yModule,
    OverlayModule,
    FieldComponent,
    ActionButtonComponent,
    CalendarComponent,
    ButtonComponent,
  ],
  templateUrl: './date.component.html',
  host: {
    '[style.display]': '"block"',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateComponent),
      multi: true,
    },
    DateFieldOverlayService,
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
export class DateComponent extends FieldComponent implements OnDestroy {
  private overlayService = inject(DateFieldOverlayService);
  private breakpointObserver = inject(BreakpointObserver);

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
  calendarView = signal<CalendarView>('days');

  displayText = computed(() => {
    const date = this.selectedDate();
    if (!date) {
      return '';
    }
    return this.formatDate(date);
  });

  constructor() {
    super();

    this.breakpointSub = this.breakpointObserver.observe(MOBILE_BREAKPOINT).subscribe(result => {
      this.isMobile.set(result.matches);
    });

    effect(() => {
      const date = this.selectedDate();
      this.value = date ? this.toISODate(date) : '';
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

    this.overlayService.toggle(this.triggerElement, this.panelTemplate, this.panelWidth(), () => {
      if (this.selectedDate()) {
        this.currentMonth.set(new Date(this.selectedDate()!));
      }
      this.calendarView.set('days');
    });
  }

  closePanel(shouldFocusTrigger: boolean = false): void {
    this.overlayService.close(shouldFocusTrigger, this.triggerElement);
  }

  onDateInputChange(event: Event): void {
    if (this.disabled() || this.readonly()) {
      return;
    }

    const target = event.target as HTMLInputElement;
    const inputValue = target.value.trim();
    if (!inputValue) {
      return;
    }

    const parsedDate = this.parseDateFromInput(inputValue);
    if (parsedDate) {
      this.selectedDate.set(parsedDate);
    }
  }

  onNativeDateChange(event: Event): void {
    if (this.disabled() || this.readonly()) {
      return;
    }

    const target = event.target as HTMLInputElement;
    const inputValue = target.value.trim();
    if (!inputValue) {
      this.selectedDate.set(null);
      this.onChange('');
      return;
    }

    const parsedDate = this.parseISODateValue(inputValue);
    if (parsedDate) {
      this.selectedDate.set(parsedDate);
      this.onChange(inputValue);
    }
  }

  onCalendarDateSelect(day: CalendarDay): void {
    if (day.isDisabled) {
      return;
    }

    this.selectedDate.set(day.date);
    this.closePanel(false);
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

  goToToday(): void {
    const today = new Date();
    this.currentMonth.set(today);
    this.selectedDate.set(today);
    this.closePanel(false);
  }

  override writeValue(value: unknown): void {
    if (!value) {
      this.selectedDate.set(null);
      super.writeValue('');
      return;
    }

    const input = String(value).trim();
    const date = this.parseISODateValue(input);

    if (!date) {
      this.selectedDate.set(null);
      super.writeValue('');
      return;
    }

    this.selectedDate.set(date);
    super.writeValue(value);
  }

  override clear(): void {
    this.selectedDate.set(null);
    super.clear();
  }

  openPanel(): void {
    this.overlayService.open(this.triggerElement, this.panelTemplate, this.panelWidth(), () => {
      if (this.selectedDate()) {
        this.currentMonth.set(new Date(this.selectedDate()!));
      }
      this.calendarView.set('days');
    });
  }

  getIcon(): IconName {
    return 'calendar';
  }

  private parseDateFromInput(inputValue: string): Date | null {
    const isoDate = new Date(inputValue);
    if (!isNaN(isoDate.getTime())) {
      return isoDate;
    }

    const datePatterns = [
      /(\d{1,2})\/(\d{1,2})\/(\d{4})/,
      /(\d{4})-(\d{1,2})-(\d{1,2})/,
      /(\d{1,2})-(\d{1,2})-(\d{4})/,
    ];

    for (const pattern of datePatterns) {
      const match = inputValue.match(pattern);
      if (!match) {
        continue;
      }

      if (pattern === datePatterns[0] || pattern === datePatterns[2]) {
        const month = parseInt(match[1], 10) - 1;
        const day = parseInt(match[2], 10);
        const year = parseInt(match[3], 10);
        return new Date(year, month, day);
      }

      const year = parseInt(match[1], 10);
      const month = parseInt(match[2], 10) - 1;
      const day = parseInt(match[3], 10);
      return new Date(year, month, day);
    }

    return null;
  }

  private parseISODateValue(value: string): Date | null {
    const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) {
      return null;
    }

    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const day = parseInt(match[3], 10);
    if (month < 1 || month > 12 || day < 1 || day > 31) {
      return null;
    }

    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
      return null;
    }

    return date;
  }

  private formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }

  private toISODate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
