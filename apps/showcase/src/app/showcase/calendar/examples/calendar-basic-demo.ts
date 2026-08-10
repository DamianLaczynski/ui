import { Component, computed, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, CalendarComponent, CalendarDay } from 'lui';

@Component({
  selector: 'app-calendar-basic-demo',
  standalone: true,
  imports: [ButtonComponent, CalendarComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;max-width:22rem">
      <ui-calendar
        [currentMonth]="currentMonth()"
        [selectedDate]="selectedDate()"
        [calendarView]="'days'"
        [size]="'medium'"
        [showMonthYearPicker]="true"
        (dateSelect)="onDateSelect($event)"
        (previousMonth)="shiftMonth(-1)"
        (nextMonth)="shiftMonth(1)"
      />

      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <ui-button type="button" appearance="subtle" (click)="reset()">Clear date</ui-button>
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">
          {{ summary() }}
        </span>
      </div>
    </div>
  `,
})
export class CalendarBasicDemoComponent {
  protected readonly currentMonth = signal(new Date(2026, 4, 1));
  protected readonly selectedDate = signal<Date | null>(new Date(2026, 4, 14));

  protected readonly summary = computed(() =>
    this.selectedDate()
      ? `Selected date: ${this.selectedDate()!.toLocaleDateString('en-US', { dateStyle: 'medium' })}`
      : 'No date selected.',
  );

  protected onDateSelect(day: CalendarDay): void {
    this.selectedDate.set(day.date);
  }

  protected shiftMonth(delta: number): void {
    const next = new Date(this.currentMonth());
    next.setMonth(next.getMonth() + delta);
    this.currentMonth.set(next);
  }

  protected reset(): void {
    this.selectedDate.set(null);
    this.currentMonth.set(new Date(2026, 4, 1));
  }
}
