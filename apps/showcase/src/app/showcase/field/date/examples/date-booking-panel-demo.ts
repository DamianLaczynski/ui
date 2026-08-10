import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, DateComponent, MessageBarComponent, TagComponent } from 'lui';

@Component({
  selector: 'app-date-booking-panel-demo',
  standalone: true,
  imports: [FormsModule, ButtonComponent, DateComponent, MessageBarComponent, TagComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(18rem,1fr));gap:1rem;align-items:start;max-width:48rem"
    >
      <div
        style="display:flex;flex-direction:column;gap:1rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem">
          <div style="font-size:0.9375rem;font-weight:600">Visit booking</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Date is strongest when users need one specific day with surrounding booking context.
          </div>
        </div>

        <ui-date
          label="Visit date"
          placeholder="YYYY-MM-DD"
          [(ngModel)]="value"
          [ngModelOptions]="{ standalone: true }"
        />

        <ui-message-bar
          title="Availability note"
          message="Confirm the selected day with the team before sending the final confirmation."
          variant="info"
          appearance="subtle"
          [dismissible]="false"
        />
      </div>

      <div
        style="display:flex;flex-direction:column;gap:0.875rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-wrap:wrap;gap:0.5rem">
          <ui-tag text="On-site" appearance="filled" variant="secondary" />
          <ui-tag text="Weekday slot" appearance="subtle" variant="info" />
          <ui-tag text="Ready to confirm" appearance="subtle" variant="success" />
        </div>

        <div style="display:flex;flex-direction:column;gap:0.375rem">
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Selected day
          </div>
          <div style="font-size:0.9375rem;font-weight:600">{{ value || 'Not selected' }}</div>
        </div>

        <div
          style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
        >
          <ui-button type="button" variant="primary">Confirm visit</ui-button>
          <ui-button type="button" appearance="subtle" (click)="value = ''">Reset</ui-button>
        </div>
      </div>
    </div>
  `,
})
export class DateBookingPanelDemoComponent {
  protected value = '2026-05-22';
}
