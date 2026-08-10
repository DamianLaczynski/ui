import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ButtonComponent,
  DateRange,
  DateRangeComponent,
  MessageBarComponent,
  TagComponent,
} from 'lui';

@Component({
  selector: 'app-date-range-booking-panel-demo',
  standalone: true,
  imports: [FormsModule, ButtonComponent, DateRangeComponent, MessageBarComponent, TagComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(18rem,1fr));gap:1rem;align-items:start;max-width:48rem"
    >
      <div
        style="display:flex;flex-direction:column;gap:1rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem">
          <div style="font-size:0.9375rem;font-weight:600">Stay planning</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Date range is strongest when users need a clear start and end period with surrounding
            booking context.
          </div>
        </div>

        <ui-date-range
          label="Stay dates"
          helpText="Choose check-in and check-out dates."
          [(ngModel)]="value"
          [ngModelOptions]="{ standalone: true }"
        />

        <ui-message-bar
          title="Availability note"
          message="Confirm the selected stay with the guest before sending the final summary."
          variant="info"
          appearance="subtle"
          [dismissible]="false"
        />
      </div>

      <div
        style="display:flex;flex-direction:column;gap:0.875rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-wrap:wrap;gap:0.5rem">
          <ui-tag text="Travel" appearance="filled" variant="secondary" />
          <ui-tag text="Flexible dates" appearance="subtle" variant="info" />
          <ui-tag text="Ready to confirm" appearance="subtle" variant="success" />
        </div>

        <div style="display:flex;flex-direction:column;gap:0.375rem">
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Selected range
          </div>
          <div style="font-size:0.9375rem;font-weight:600">
            {{ value?.startDate || '...' }} - {{ value?.endDate || '...' }}
          </div>
        </div>

        <div
          style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
        >
          <ui-button type="button" variant="primary">Confirm stay</ui-button>
          <ui-button type="button" appearance="subtle" (click)="value = null">Reset</ui-button>
        </div>
      </div>
    </div>
  `,
})
export class DateRangeBookingPanelDemoComponent {
  protected value: DateRange | null = {
    startDate: '2026-07-08',
    endDate: '2026-07-15',
  };
}
