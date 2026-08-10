import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CalendarComponent, CalendarDay, CalendarView } from 'lui';

@Component({
  selector: 'app-calendar-views-demo',
  standalone: true,
  imports: [CalendarComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));gap:1rem;align-items:start"
    >
      <div
        style="display:flex;flex-direction:column;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="font-size:0.875rem;font-weight:600">Days view</div>
        <ui-calendar
          [currentMonth]="daysMonth()"
          [selectedDate]="selectedDate()"
          [calendarView]="'days'"
          [size]="'small'"
          (dateSelect)="onDateSelect($event)"
          (previousMonth)="shiftMonth(daysMonth, -1)"
          (nextMonth)="shiftMonth(daysMonth, 1)"
          (switchToMonthsView)="setView(daysView, 'months')"
        />
      </div>

      <div
        style="display:flex;flex-direction:column;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="font-size:0.875rem;font-weight:600">Months view</div>
        <ui-calendar
          [currentMonth]="monthsMonth()"
          [selectedDate]="selectedDate()"
          [calendarView]="'months'"
          [size]="'small'"
          (monthSelect)="onMonthSelect($event)"
          (previousYear)="shiftYear(monthsMonth, -1)"
          (nextYear)="shiftYear(monthsMonth, 1)"
          (switchToYearsView)="setView(monthsView, 'years')"
          (switchToDaysView)="setView(monthsView, 'days')"
        />
      </div>

      <div
        style="display:flex;flex-direction:column;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="font-size:0.875rem;font-weight:600">Years view</div>
        <ui-calendar
          [currentMonth]="yearsMonth()"
          [selectedDate]="selectedDate()"
          [calendarView]="'years'"
          [size]="'small'"
          (yearSelect)="onYearSelect($event)"
          (previousYearRange)="shiftYear(yearsMonth, -12)"
          (nextYearRange)="shiftYear(yearsMonth, 12)"
          (switchToMonthsView)="setView(yearsView, 'months')"
        />
      </div>
    </div>
  `,
})
export class CalendarViewsDemoComponent {
  protected readonly selectedDate = signal(new Date(2026, 4, 14));
  protected readonly daysMonth = signal(new Date(2026, 4, 1));
  protected readonly monthsMonth = signal(new Date(2026, 4, 1));
  protected readonly yearsMonth = signal(new Date(2026, 4, 1));
  protected readonly daysView = signal<CalendarView>('days');
  protected readonly monthsView = signal<CalendarView>('months');
  protected readonly yearsView = signal<CalendarView>('years');

  protected onDateSelect(day: CalendarDay): void {
    this.selectedDate.set(day.date);
  }

  protected onMonthSelect(monthIndex: number): void {
    const next = new Date(this.monthsMonth());
    next.setMonth(monthIndex);
    this.monthsMonth.set(next);
  }

  protected onYearSelect(year: number): void {
    const next = new Date(this.yearsMonth());
    next.setFullYear(year);
    this.yearsMonth.set(next);
  }

  protected shiftMonth(target: ReturnType<typeof signal<Date>>, delta: number): void {
    const next = new Date(target());
    next.setMonth(next.getMonth() + delta);
    target.set(next);
  }

  protected shiftYear(target: ReturnType<typeof signal<Date>>, delta: number): void {
    const next = new Date(target());
    next.setFullYear(next.getFullYear() + delta);
    target.set(next);
  }

  protected setView(target: ReturnType<typeof signal<CalendarView>>, view: CalendarView): void {
    target.set(view);
  }
}
