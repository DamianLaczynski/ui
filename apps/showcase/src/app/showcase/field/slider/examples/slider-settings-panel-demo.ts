import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderComponent, SwitchComponent } from 'ui';

const dashedCardStyle =
  'padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest);min-width:11rem';

@Component({
  selector: 'app-slider-settings-panel-example',
  standalone: true,
  imports: [FormsModule, SliderComponent, SwitchComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:52rem;"
    >
      <div
        style="flex:1 1 22rem;display:flex;min-width:16rem;max-width:34rem;flex-direction:column;gap:1rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem">
          <div style="font-size:0.9375rem;font-weight:600">Notification settings</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Tune how strongly the system should notify account owners.
          </div>
        </div>

        <ui-slider
          label="Escalation threshold"
          [min]="0"
          [max]="100"
          [step]="5"
          [showMinMax]="true"
          [(ngModel)]="threshold"
          [ngModelOptions]="{ standalone: true }"
          [ariaValueText]="getThresholdText"
          helpText="Higher values reduce low-priority alerts."
        />

        <ui-slider
          label="Reminder frequency"
          [min]="1"
          [max]="7"
          [step]="1"
          [showStepMarkers]="true"
          [showMinMax]="true"
          [formatValue]="formatDays"
          [(ngModel)]="reminderDays"
          [ngModelOptions]="{ standalone: true }"
          [ariaValueText]="getReminderText"
        />

        <ui-switch
          label="Notify executive sponsors"
          [(ngModel)]="notifySponsors"
          [ngModelOptions]="{ standalone: true }"
        />
      </div>
      <div [attr.style]="dashedCardStyle">
        <p
          style="margin:0 0 0.5rem;font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
        >
          Values
        </p>
        <div
          style="display:flex;flex-direction:column;gap:0.45rem;font-size:0.875rem;line-height:1.4"
        >
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Threshold</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)"
              >{{ threshold }}%</strong
            >
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Reminder</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
              formatDays(reminderDays)
            }}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Sponsors</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
              notifySponsors ? 'On' : 'Off'
            }}</strong>
          </div>
          <div
            style="margin-top:0.25rem;padding-top:0.5rem;font-size:0.75rem;color:var(--color-neutral-foreground2-rest);border-top:1px solid color-mix(in srgb,var(--color-neutral-stroke-rest) 65%,transparent)"
          >
            {{ getThresholdText(threshold) }} · {{ getReminderText(reminderDays) }}
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SliderSettingsPanelExampleComponent {
  readonly dashedCardStyle = dashedCardStyle;

  protected threshold = 65;
  protected reminderDays = 3;
  protected notifySponsors = true;

  protected readonly formatDays = (value: number) => `${value}d`;
  protected readonly getThresholdText = (value: number) => `${value} percent threshold`;
  protected readonly getReminderText = (value: number) => `Every ${value} days`;
}
