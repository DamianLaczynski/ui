import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, MessageBarComponent, TagComponent, TimeSpanComponent } from 'ui';

@Component({
  selector: 'app-time-span-policy-panel-demo',
  standalone: true,
  imports: [FormsModule, ButtonComponent, MessageBarComponent, TagComponent, TimeSpanComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(18rem,1fr));gap:1rem;align-items:start;max-width:48rem"
    >
      <div
        style="display:flex;flex-direction:column;gap:1rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem">
          <div style="font-size:0.9375rem;font-weight:600">Session policy</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Time span is strongest when users need a reusable duration rather than one calendar
            date.
          </div>
        </div>

        <ui-time-span
          label="Session timeout"
          helpText="Use hours and minutes for the active timeout policy."
          [showHours]="true"
          [showMinutes]="true"
          [clearable]="true"
          [(ngModel)]="value"
          [ngModelOptions]="{ standalone: true }"
        />

        <ui-message-bar
          title="Policy note"
          message="The selected duration is stored as an ISO 8601 value and reused by the backend policy engine."
          variant="info"
          appearance="subtle"
          [dismissible]="false"
        />
      </div>

      <div
        style="display:flex;flex-direction:column;gap:0.875rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-wrap:wrap;gap:0.5rem">
          <ui-tag text="Security" appearance="filled" variant="secondary" />
          <ui-tag text="ISO 8601 output" appearance="subtle" variant="info" />
          <ui-tag text="Ready to apply" appearance="subtle" variant="success" />
        </div>

        <div style="display:flex;flex-direction:column;gap:0.375rem">
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Selected duration
          </div>
          <div style="font-size:0.9375rem;font-weight:600">{{ value || 'Not selected' }}</div>
        </div>

        <div
          style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
        >
          <ui-button type="button" variant="primary">Apply policy</ui-button>
          <ui-button type="button" appearance="subtle" (click)="value = ''">Reset</ui-button>
        </div>
      </div>
    </div>
  `,
})
export class TimeSpanPolicyPanelDemoComponent {
  protected value = 'PT8H30M';
}
