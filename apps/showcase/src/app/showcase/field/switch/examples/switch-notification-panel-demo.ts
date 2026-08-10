import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, SliderComponent, SwitchComponent } from 'lui';

@Component({
  selector: 'app-switch-notification-panel-example',
  standalone: true,
  imports: [FormsModule, ButtonComponent, SliderComponent, SwitchComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:35rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="display:flex;flex-direction:column;gap:0.25rem">
        <div style="font-size:0.9375rem;font-weight:600">Incident notification policy</div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Configure how aggressively owners are notified when service health degrades.
        </div>
      </div>

      <ui-switch
        label="Smart alerts"
        helpText="Filter low-signal events and escalate only when incidents become actionable."
        [(ngModel)]="smartAlerts"
        [ngModelOptions]="{ standalone: true }"
      />

      <div style="display:flex;flex-direction:column;gap:0.75rem;padding-left:0.25rem">
        <ui-switch
          label="Escalate to manager after 15 minutes"
          [disabled]="!smartAlerts"
          [(ngModel)]="escalateManager"
          [ngModelOptions]="{ standalone: true }"
        />

        <ui-switch
          label="Send overnight SMS fallback"
          [disabled]="!smartAlerts"
          [(ngModel)]="smsFallback"
          [ngModelOptions]="{ standalone: true }"
        />

        <ui-slider
          label="Noise threshold"
          [min]="0"
          [max]="100"
          [step]="5"
          [showMinMax]="true"
          [disabled]="!smartAlerts"
          [(ngModel)]="threshold"
          [ngModelOptions]="{ standalone: true }"
          [ariaValueText]="describeThreshold"
          helpText="Higher values reduce low-priority notifications."
        />
      </div>

      <div style="display:flex;gap:0.75rem;flex-wrap:wrap">
        <ui-button type="button" variant="primary">Save policy</ui-button>
        <ui-button type="button" variant="secondary" appearance="outline">Preview digest</ui-button>
      </div>
    </div>
  `,
})
export class SwitchNotificationPanelExampleComponent {
  protected smartAlerts = true;
  protected escalateManager = true;
  protected smsFallback = false;
  protected threshold = 65;

  protected readonly describeThreshold = (value: number) => `${value} percent threshold`;
}
