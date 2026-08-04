import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, CardComponent, MessageBarComponent, TimePickerComponent } from 'ui';

@Component({
  selector: 'app-time-picker-scheduling-panel-demo',
  standalone: true,
  imports: [ButtonComponent, CardComponent, MessageBarComponent, TimePickerComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <ui-card appearance="filled-alternative" ariaLabel="Interview scheduling panel">
      <div
        uiCardPreview
        style="min-height:7rem;background:linear-gradient(135deg,#dfe9fb 0%,#c8d9f4 100%)"
      ></div>

      <div uiCardHeader style="display:grid;gap:0.25rem;">
        <strong style="font-size:1rem;line-height:1.35;">Candidate review session</strong>
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground3-rest);">
          Choose a focused slot for the panel and keep timezone-sensitive handoff details nearby.
        </span>
      </div>

      <div uiCardBody style="display:grid;gap:1rem;">
        <ui-message-bar
          title="Panel availability"
          description="All reviewers are free between 13:00 and 18:00 CET."
          variant="info"
          appearance="subtle"
          size="small"
        />

        <div
          style="display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));gap:1rem;align-items:start"
        >
          <ui-time-picker
            [value]="reviewTime"
            [showLabel]="true"
            label="Interview starts"
            [step]="1800"
            [use24HourFormat]="false"
            (timeChange)="reviewTime = $event"
          />

          <ui-time-picker
            [value]="debriefTime"
            [showLabel]="true"
            label="Debrief starts"
            [step]="1800"
            [use24HourFormat]="false"
            (timeChange)="debriefTime = $event"
          />
        </div>

        <div
          style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
        >
          <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest);">
            Candidate review:
            <strong style="color:var(--color-neutral-foreground1-rest)">{{ reviewTime }}</strong>
          </span>
          <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest);">
            Debrief:
            <strong style="color:var(--color-neutral-foreground1-rest)">{{ debriefTime }}</strong>
          </span>
        </div>
      </div>

      <div uiCardFooter style="display:flex;flex-wrap:wrap;gap:0.75rem;">
        <ui-button variant="primary" appearance="filled">Confirm slot</ui-button>
        <ui-button variant="secondary" appearance="outline" (click)="reset()">Reset</ui-button>
      </div>
    </ui-card>
  `,
})
export class TimePickerSchedulingPanelDemoComponent {
  protected reviewTime = '14:00';
  protected debriefTime = '16:30';

  protected reset(): void {
    this.reviewTime = '14:00';
    this.debriefTime = '16:30';
  }
}
