import { Component, computed, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, CalendarComponent, CalendarDay } from 'ui';

@Component({
  selector: 'app-calendar-range-demo',
  standalone: true,
  imports: [ButtonComponent, CalendarComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;max-width:22rem">
      <ui-calendar
        [currentMonth]="currentMonth()"
        [selectedDate]="null"
        [startDate]="startDate()"
        [endDate]="endDate()"
        [hoveredDate]="hoveredDate()"
        [calendarView]="'days'"
        [size]="'medium'"
        [showMonthYearPicker]="true"
        [isDayInHoverRangeFn]="isDayInHoverRange.bind(this)"
        (dateSelect)="onDateSelect($event)"
        (dateHover)="onDateHover($event)"
        (dateLeave)="onDateLeave()"
        (previousMonth)="shiftMonth(-1)"
        (nextMonth)="shiftMonth(1)"
      />

      <div
        style="display:flex;flex-direction:column;gap:0.5rem;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-wrap:wrap;gap:0.5rem;align-items:center">
          <ui-button type="button" appearance="subtle" (click)="reset()">Reset range</ui-button>
          <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">
            Pick a start date, then an end date.
          </span>
        </div>
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">
          {{ summary() }}
        </span>
      </div>
    </div>
  `,
})
export class CalendarRangeDemoComponent {
  protected readonly currentMonth = signal(new Date(2026, 6, 1));
  protected readonly startDate = signal<Date | null>(new Date(2026, 6, 10));
  protected readonly endDate = signal<Date | null>(new Date(2026, 6, 14));
  protected readonly hoveredDate = signal<Date | null>(null);
  protected readonly activeSelection = signal<'start' | 'end'>('start');

  protected readonly summary = computed(() => {
    const start = this.startDate();
    const end = this.endDate();
    if (!start && !end) {
      return 'No range selected.';
    }

    return `Range: ${start ? start.toLocaleDateString('en-US', { dateStyle: 'medium' }) : 'None'} - ${end ? end.toLocaleDateString('en-US', { dateStyle: 'medium' }) : 'Pending'}`;
  });

  protected onDateSelect(day: CalendarDay): void {
    const selected = day.date;

    if (!this.startDate() || this.activeSelection() === 'start') {
      this.startDate.set(selected);
      this.endDate.set(null);
      this.activeSelection.set('end');
      return;
    }

    const start = this.startDate()!;
    if (selected < start) {
      this.endDate.set(start);
      this.startDate.set(selected);
    } else {
      this.endDate.set(selected);
    }

    this.hoveredDate.set(null);
    this.activeSelection.set('start');
  }

  protected onDateHover(day: CalendarDay): void {
    if (
      !day.isDisabled &&
      this.startDate() &&
      !this.endDate() &&
      this.activeSelection() === 'end'
    ) {
      this.hoveredDate.set(day.date);
    }
  }

  protected onDateLeave(): void {
    this.hoveredDate.set(null);
  }

  protected isDayInHoverRange(day: CalendarDay): boolean {
    const start = this.startDate();
    const hovered = this.hoveredDate();
    const end = this.endDate();

    if (!start || !hovered || end) {
      return false;
    }

    const date = day.date.getTime();
    const startTime = start.getTime();
    const hoveredTime = hovered.getTime();
    const min = Math.min(startTime, hoveredTime);
    const max = Math.max(startTime, hoveredTime);

    return date > min && date < max;
  }

  protected shiftMonth(delta: number): void {
    const next = new Date(this.currentMonth());
    next.setMonth(next.getMonth() + delta);
    this.currentMonth.set(next);
  }

  protected reset(): void {
    this.currentMonth.set(new Date(2026, 6, 1));
    this.startDate.set(new Date(2026, 6, 10));
    this.endDate.set(new Date(2026, 6, 14));
    this.hoveredDate.set(null);
    this.activeSelection.set('start');
  }
}
