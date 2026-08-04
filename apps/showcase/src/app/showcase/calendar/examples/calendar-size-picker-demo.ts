import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CalendarComponent, CalendarDay } from 'ui';

@Component({
  selector: 'app-calendar-size-picker-demo',
  standalone: true,
  imports: [CalendarComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));gap:1rem;align-items:start"
    >
      @for (item of examples; track item.title) {
        <div
          style="display:flex;flex-direction:column;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
        >
          <div style="display:flex;flex-direction:column;gap:0.25rem">
            <div style="font-size:0.875rem;font-weight:600">{{ item.title }}</div>
            <div style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">
              {{ item.note }}
            </div>
          </div>

          <ui-calendar
            [currentMonth]="currentMonth()"
            [selectedDate]="selectedDate()"
            [calendarView]="'days'"
            [size]="item.size"
            [showMonthYearPicker]="item.showMonthYearPicker"
            (dateSelect)="onDateSelect($event)"
            (previousMonth)="shiftMonth(-1)"
            (nextMonth)="shiftMonth(1)"
          />
        </div>
      }
    </div>
  `,
})
export class CalendarSizePickerDemoComponent {
  protected readonly currentMonth = signal(new Date(2026, 4, 1));
  protected readonly selectedDate = signal<Date | null>(new Date(2026, 4, 18));

  protected readonly examples = [
    {
      title: 'Small with picker',
      note: 'Compact date selection inside denser forms or filters.',
      size: 'small' as const,
      showMonthYearPicker: true,
    },
    {
      title: 'Medium without picker',
      note: 'Keeps the header quieter when month switching should stay button driven.',
      size: 'medium' as const,
      showMonthYearPicker: false,
    },
    {
      title: 'Large with picker',
      note: 'Useful for touch-friendly or emphasized scheduling surfaces.',
      size: 'large' as const,
      showMonthYearPicker: true,
    },
  ];

  protected onDateSelect(day: CalendarDay): void {
    this.selectedDate.set(day.date);
  }

  protected shiftMonth(delta: number): void {
    const next = new Date(this.currentMonth());
    next.setMonth(next.getMonth() + delta);
    this.currentMonth.set(next);
  }
}
