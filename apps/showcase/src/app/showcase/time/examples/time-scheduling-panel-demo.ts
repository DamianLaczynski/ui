import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, MessageBarComponent, TagComponent, TimeComponent } from 'lui';

@Component({
  selector: 'app-time-scheduling-panel-demo',
  standalone: true,
  imports: [FormsModule, ButtonComponent, MessageBarComponent, TagComponent, TimeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(18rem,1fr));gap:1rem;align-items:start;max-width:48rem"
    >
      <div
        style="display:flex;flex-direction:column;gap:1rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem">
          <div style="font-size:0.9375rem;font-weight:600">Call scheduling</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Time is strongest when users need one precise slot within an already known day.
          </div>
        </div>

        <ui-time
          label="Call time"
          placeholder="HH:mm"
          [step]="1800"
          [(ngModel)]="value"
          [ngModelOptions]="{ standalone: true }"
        />

        <ui-message-bar
          title="Availability note"
          message="Confirm the chosen slot with the customer before sending the final reminder."
          variant="info"
          appearance="subtle"
          [dismissible]="false"
        />
      </div>

      <div
        style="display:flex;flex-direction:column;gap:0.875rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-wrap:wrap;gap:0.5rem">
          <ui-tag text="Support" appearance="filled" variant="secondary" />
          <ui-tag text="30 minute slot" appearance="subtle" variant="info" />
          <ui-tag text="Ready to confirm" appearance="subtle" variant="success" />
        </div>

        <div style="display:flex;flex-direction:column;gap:0.375rem">
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Selected time
          </div>
          <div style="font-size:0.9375rem;font-weight:600">{{ value || 'Not selected' }}</div>
        </div>

        <div
          style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
        >
          <ui-button type="button" variant="primary">Confirm slot</ui-button>
          <ui-button type="button" appearance="subtle" (click)="value = ''">Reset</ui-button>
        </div>
      </div>
    </div>
  `,
})
export class TimeSchedulingPanelDemoComponent {
  protected value = '14:30';
}
