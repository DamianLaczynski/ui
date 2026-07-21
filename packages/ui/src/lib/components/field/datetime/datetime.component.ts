import {
  Component,
  ElementRef,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  signal,
  NgZone,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { FieldComponent } from '../field/field.component';
import { ActionButtonComponent } from '../action-button.component';
import { CalendarComponent, CalendarDay, CalendarView } from '../../calendar';
import {
  extractDateAndFlexibleTimeSegments,
  formatHhmmForDisplay,
  parseFlexibleTimeToHhmm,
  TimePickerComponent,
} from '../../time-picker';
import {
  DEFAULT_CONNECTED_POSITIONS,
  DEFAULT_VIEWPORT_MARGIN,
  OverlayHandle,
  openConnectedOverlay,
} from '../../overlay/open-connected-overlay';
import { ButtonComponent } from '../../button';
import { IconName } from '../../icon';
import { Subscription } from 'rxjs';

const MOBILE_BREAKPOINT = '(max-width: 768px)';

@Component({
  selector: 'ui-datetime',
  standalone: true,
  imports: [
    CommonModule,
    A11yModule,
    OverlayModule,
    FieldComponent,
    ActionButtonComponent,
    CalendarComponent,
    TimePickerComponent,
    ButtonComponent,
  ],
  templateUrl: './datetime.component.html',
  host: {
    '[style.display]': '"block"',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatetimeComponent),
      multi: true,
    },
  ],
  styles: [
    `
      :host {
        width: 100%;
      }
    `,
  ],
})
export class DatetimeComponent extends FieldComponent implements OnDestroy {
  private overlay = inject(Overlay);
  private viewContainerRef = inject(ViewContainerRef);
  private scrollDispatcher = inject(ScrollDispatcher);
  private ngZone = inject(NgZone);
  private breakpointObserver = inject(BreakpointObserver);
  private overlayHandle: OverlayHandle | null = null;

  min = input<string>('');
  max = input<string>('');
  step = input<number | string>('');
  panelWidth = input<number | undefined>(undefined);
  use24HourFormat = input<boolean>(true);
  useNativeOnMobile = input<boolean>(true);

  isOpen = signal<boolean>(false);
  isMobile = signal(false);
  private breakpointSub?: Subscription;
  currentMonth = signal<Date>(new Date());
  selectedDate = signal<Date | null>(null);
  selectedTime = signal<string>('');
  calendarView = signal<CalendarView>('days');

  @ViewChild('triggerElement') triggerElement!: ElementRef;
  @ViewChild('panelTemplate') panelTemplate!: TemplateRef<unknown>;

  displayText = computed(() => {
    const date = this.selectedDate();
    const time = this.selectedTime();
    if (!date && !time) {
      return '';
    }
    const timeShown = formatHhmmForDisplay(time, this.use24HourFormat());
    if (date && time) {
      return `${this.formatDate(date)} ${timeShown}`;
    }
    return date ? this.formatDate(date) : timeShown;
  });

  constructor() {
    super();

    this.breakpointSub = this.breakpointObserver.observe(MOBILE_BREAKPOINT).subscribe(result => {
      this.isMobile.set(result.matches);
    });

    effect(() => {
      const date = this.selectedDate();
      const time = this.selectedTime();
      this.value = date && time ? `${this.toISODate(date)}T${time}` : '';
      this.onChange(this.value);
    });
  }

  ngOnDestroy(): void {
    this.breakpointSub?.unsubscribe();
    this.overlayHandle?.destroy();
  }

  togglePanel(): void {
    if (this.disabled() || this.readonly()) {
      return;
    }

    if (this.isOpen()) {
      this.closePanel(false);
    } else {
      this.openPanel();
    }
  }

  closePanel(shouldFocusTrigger: boolean = false): void {
    this.overlayHandle?.destroy();
    this.overlayHandle = null;
    this.isOpen.set(false);

    if (
      shouldFocusTrigger &&
      this.triggerElement?.nativeElement &&
      document.contains(this.triggerElement.nativeElement)
    ) {
      try {
        setTimeout(() => this.triggerElement.nativeElement.focus({ preventScroll: true }), 0);
      } catch {
        // no-op
      }
    }
  }

  onNativeDatetimeChange(event: Event): void {
    if (this.disabled() || this.readonly()) {
      return;
    }

    const target = event.target as HTMLInputElement;
    const inputValue = target.value.trim();
    if (!inputValue) {
      this.selectedDate.set(null);
      this.selectedTime.set('');
      this.onChange('');
      return;
    }

    const parsed = this.parseIncomingDatetime(inputValue);
    this.selectedDate.set(parsed.date);
    this.selectedTime.set(parsed.time);
    this.onChange(inputValue);
  }

  onDatetimeInputChange(event: Event): void {
    if (this.disabled() || this.readonly()) {
      return;
    }

    const target = event.target as HTMLInputElement;
    const inputValue = target.value.trim();
    if (!inputValue) {
      return;
    }

    const segments = extractDateAndFlexibleTimeSegments(inputValue);
    if (!segments) {
      return;
    }

    const parsedDate = this.parseDateFromInput(segments.datePart);
    if (!parsedDate) {
      return;
    }

    const hhmm = parseFlexibleTimeToHhmm(segments.timePart);
    if (!hhmm) {
      return;
    }

    this.selectedDate.set(parsedDate);
    this.selectedTime.set(hhmm);
  }

  onCalendarDateSelect(day: CalendarDay): void {
    if (day.isDisabled) {
      return;
    }
    this.selectedDate.set(day.date);
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

  onTimeChange(timeStr: string): void {
    this.selectedTime.set(timeStr);
  }

  goToToday(): void {
    const now = new Date();
    this.currentMonth.set(now);
    this.selectedDate.set(now);
  }

  goToNow(): void {
    const now = new Date();
    this.currentMonth.set(now);
    this.selectedDate.set(now);
    this.selectedTime.set(
      `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
    );
  }

  override writeValue(value: unknown): void {
    if (!value) {
      this.selectedDate.set(null);
      this.selectedTime.set('');
      super.writeValue('');
      return;
    }

    const parsed = this.parseIncomingDatetime(String(value));
    this.selectedDate.set(parsed.date);
    this.selectedTime.set(parsed.time);
    super.writeValue(value);
  }

  override clear(): void {
    this.selectedDate.set(null);
    this.selectedTime.set('');
    super.clear();
  }

  openPanel(): void {
    if (this.isOpen()) {
      return;
    }

    if (this.selectedDate()) {
      this.currentMonth.set(new Date(this.selectedDate()!));
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
        width: this.panelWidth() ? this.panelWidth() : undefined,
        hasBackdrop: false,
      },
      onClose: focusTrigger => {
        if (focusTrigger) {
          this.closePanel(true);
        } else {
          setTimeout(() => this.closePanel(false), 0);
        }
      },
    });

    this.isOpen.set(true);
  }

  getIcon(): IconName {
    return 'calendar_clock';
  }

  getNativeDatetimeMin(): string | null {
    const m = this.min();
    if (!m) return null;
    return m.includes('T') ? m : `${m}T00:00`;
  }

  getNativeDatetimeMax(): string | null {
    const m = this.max();
    if (!m) return null;
    return m.includes('T') ? m : `${m}T23:59`;
  }

  getNativeDatetimeStep(): string {
    const s = this.step();
    if (s === '' || s === undefined) return '60';
    return String(typeof s === 'number' ? s : parseInt(String(s), 10) || 60);
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

  private formatDate(date: Date): string {
    return date.toLocaleDateString(undefined, {
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

  private parseIncomingDatetime(value: string): { date: Date | null; time: string } {
    const localPattern = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::\d{2})?$/;
    const localMatch = value.match(localPattern);
    if (localMatch) {
      const year = parseInt(localMatch[1], 10);
      const month = parseInt(localMatch[2], 10) - 1;
      const day = parseInt(localMatch[3], 10);
      const hour = parseInt(localMatch[4], 10);
      const minute = parseInt(localMatch[5], 10);
      return {
        date: new Date(year, month, day),
        time: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
      };
    }

    const parsed = new Date(value);
    if (!isNaN(parsed.getTime())) {
      return {
        date: new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate()),
        time: `${String(parsed.getHours()).padStart(2, '0')}:${String(parsed.getMinutes()).padStart(2, '0')}`,
      };
    }

    const [datePart, timePart] = value.includes('T') ? value.split('T') : value.split(' ');
    if (!datePart) {
      return { date: null, time: '' };
    }

    return {
      date: this.parseDateFromInput(datePart),
      time: (timePart || '').slice(0, 5),
    };
  }
}
