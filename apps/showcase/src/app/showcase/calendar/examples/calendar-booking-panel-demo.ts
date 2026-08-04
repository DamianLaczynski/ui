import { Component, computed, signal, ChangeDetectionStrategy } from '@angular/core';
import {
  ButtonComponent,
  CalendarComponent,
  CalendarDay,
  MessageBarComponent,
  TagComponent,
} from 'ui';

@Component({
  selector: 'app-calendar-booking-panel-demo',
  standalone: true,
  imports: [ButtonComponent, CalendarComponent, MessageBarComponent, TagComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:minmax(0,22rem) minmax(0,18rem);gap:1rem;align-items:start;max-width:44rem"
    >
      <div
        style="display:flex;flex-direction:column;gap:1rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem">
          <div style="font-size:0.9375rem;font-weight:600">Book a review window</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            A realistic calendar usually sits inside a booking or scheduling flow, not by itself.
          </div>
        </div>

        <ui-calendar
          [currentMonth]="currentMonth()"
          [selectedDate]="selectedDate()"
          [calendarView]="'days'"
          [size]="'medium'"
          [min]="minDate"
          [max]="maxDate"
          (dateSelect)="onDateSelect($event)"
          (previousMonth)="shiftMonth(-1)"
          (nextMonth)="shiftMonth(1)"
        />
      </div>

      <div
        style="display:flex;flex-direction:column;gap:0.875rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-wrap:wrap;gap:0.5rem">
          <ui-tag text="Remote" appearance="filled" variant="info" />
          <ui-tag text="45 min" appearance="subtle" variant="secondary" />
          <ui-tag text="Slots available" appearance="subtle" variant="success" />
        </div>

        <ui-message-bar variant="info" appearance="subtle">
          Review slots are available only on weekdays between May 12 and May 26.
        </ui-message-bar>

        <div style="display:flex;flex-direction:column;gap:0.375rem">
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Selection
          </div>
          <div style="font-size:0.9375rem;font-weight:600">{{ summary() }}</div>
        </div>

        <div
          style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
        >
          <ui-button type="button" variant="primary">Confirm slot</ui-button>
          <ui-button type="button" appearance="subtle" (click)="reset()">Reset</ui-button>
        </div>
      </div>
    </div>
  `,
})
export class CalendarBookingPanelDemoComponent {
  protected readonly minDate = '2026-05-12';
  protected readonly maxDate = '2026-05-26';
  protected readonly currentMonth = signal(new Date(2026, 4, 1));
  protected readonly selectedDate = signal<Date | null>(new Date(2026, 4, 19));

  protected readonly summary = computed(() =>
    this.selectedDate()
      ? this.selectedDate()!.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        })
      : 'Choose a review slot.',
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
    this.currentMonth.set(new Date(2026, 4, 1));
    this.selectedDate.set(new Date(2026, 4, 19));
  }
}
