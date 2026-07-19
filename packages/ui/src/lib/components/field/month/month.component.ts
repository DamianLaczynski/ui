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
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { BreakpointObserver } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { Subscription } from 'rxjs';
import { DateFieldOverlayService } from '../base-date-field/base-date-field.component';
import { FieldComponent } from '../field/field.component';
import { ActionButtonComponent } from '../action-button.component';
import { CalendarComponent, CalendarView } from '../../calendar';
import { ButtonComponent } from '../../button';
import { IconName } from '../../icon';

const MOBILE_BREAKPOINT = '(max-width: 768px)';

@Component({
  selector: 'ui-month',
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
  templateUrl: './month.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MonthComponent),
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
export class MonthComponent extends FieldComponent implements OnDestroy {
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
  calendarView = signal<CalendarView>('months');

  displayText = computed(() => {
    const date = this.selectedDate();
    if (!date) {
      return '';
    }
    return this.formatMonth(date);
  });

  constructor() {
    super();

    this.breakpointSub = this.breakpointObserver.observe(MOBILE_BREAKPOINT).subscribe(result => {
      this.isMobile.set(result.matches);
    });

    effect(() => {
      const date = this.selectedDate();
      this.value = date ? this.toISOMonth(date) : '';
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
      this.calendarView.set('months');
    });
  }

  closePanel(shouldFocusTrigger: boolean = false): void {
    this.overlayService.close(shouldFocusTrigger, this.triggerElement);
  }

  onCalendarMonthSelect(monthIndex: number): void {
    const newDate = new Date(this.currentMonth());
    newDate.setMonth(monthIndex);
    this.selectedDate.set(newDate);
    this.closePanel(false);
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
    const date = this.parseISOMonthValue(input);

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
      this.calendarView.set('months');
    });
  }

  getIcon(): IconName {
    return 'calendar_month';
  }

  onNativeMonthChange(event: Event): void {
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

    const date = this.parseISOMonthValue(inputValue);
    if (date) {
      this.selectedDate.set(date);
      this.onChange(inputValue);
    }
  }

  private parseISOMonthValue(value: string): Date | null {
    const match = value.match(/^(\d{4})-(\d{2})$/);
    if (!match) {
      return null;
    }

    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    if (month < 1 || month > 12) {
      return null;
    }

    return new Date(year, month - 1, 1);
  }

  private formatMonth(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  }

  private toISOMonth(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  }
}
