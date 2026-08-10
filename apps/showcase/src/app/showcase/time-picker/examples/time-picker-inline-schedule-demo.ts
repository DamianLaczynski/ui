import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, CardComponent, TimePickerComponent } from 'lui';

@Component({
  selector: 'app-time-picker-inline-schedule-demo',
  standalone: true,
  imports: [ButtonComponent, CardComponent, TimePickerComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <ui-card appearance="outline" borderStyle="dashed" ariaLabel="Support handoff row">
      <div uiCardHeader style="display:grid;gap:0.25rem;">
        <strong style="font-size:0.9375rem;">Support handoff</strong>
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground3-rest);">
          Inline time pickers work well in compact operational rows where users tweak one slot fast.
        </span>
      </div>

      <div
        uiCardBody
        style="display:flex;flex-wrap:wrap;gap:1rem 1.25rem;align-items:end;justify-content:space-between"
      >
        <div style="display:flex;flex-wrap:wrap;gap:1rem 1.25rem;align-items:end;">
          <ui-time-picker
            [value]="startValue"
            [inline]="true"
            [showLabel]="true"
            label="Starts"
            [step]="1800"
            [use24HourFormat]="true"
            (timeChange)="startValue = $event"
          />

          <ui-time-picker
            [value]="endValue"
            [inline]="true"
            [showLabel]="true"
            label="Ends"
            [step]="1800"
            [use24HourFormat]="true"
            (timeChange)="endValue = $event"
          />
        </div>

        <div style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;">
          <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest);">
            Current span:
            <strong style="color:var(--color-neutral-foreground1-rest)"
              >{{ startValue }} - {{ endValue }}</strong
            >
          </span>
          <ui-button variant="secondary" appearance="outline" (click)="reset()">Reset</ui-button>
        </div>
      </div>
    </ui-card>
  `,
})
export class TimePickerInlineScheduleDemoComponent {
  protected startValue = '09:00';
  protected endValue = '17:00';

  protected reset(): void {
    this.startValue = '09:00';
    this.endValue = '17:00';
  }
}
