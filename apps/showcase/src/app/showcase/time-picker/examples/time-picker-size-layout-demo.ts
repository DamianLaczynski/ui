import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TimePickerComponent } from 'lui';

@Component({
  selector: 'app-time-picker-size-layout-demo',
  standalone: true,
  imports: [FormsModule, TimePickerComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:grid;gap:1rem;width:100%;">
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(13rem,1fr));gap:1rem;">
        <div style="display:grid;gap:0.75rem;">
          <span
            style="font-size:0.8125rem;font-weight:600;color:var(--color-neutral-foreground2-rest);"
            >Small</span
          >
          <ui-time-picker
            [value]="smallValue"
            size="small"
            [step]="900"
            [use24HourFormat]="true"
            (timeChange)="smallValue = $event"
          />
        </div>

        <div style="display:grid;gap:0.75rem;">
          <span
            style="font-size:0.8125rem;font-weight:600;color:var(--color-neutral-foreground2-rest);"
            >Medium</span
          >
          <ui-time-picker
            [value]="mediumValue"
            size="medium"
            [step]="900"
            [use24HourFormat]="true"
            (timeChange)="mediumValue = $event"
          />
        </div>

        <div style="display:grid;gap:0.75rem;">
          <span
            style="font-size:0.8125rem;font-weight:600;color:var(--color-neutral-foreground2-rest);"
            >Large</span
          >
          <ui-time-picker
            [value]="largeValue"
            size="large"
            [step]="900"
            [use24HourFormat]="true"
            (timeChange)="largeValue = $event"
          />
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:1rem;">
        <div style="display:grid;gap:0.75rem;">
          <span
            style="font-size:0.8125rem;font-weight:600;color:var(--color-neutral-foreground2-rest);"
            >Inline without label</span
          >
          <ui-time-picker
            [value]="inlineValue"
            [inline]="true"
            [step]="1800"
            [use24HourFormat]="true"
            (timeChange)="inlineValue = $event"
          />
        </div>

        <div style="display:grid;gap:0.75rem;">
          <span
            style="font-size:0.8125rem;font-weight:600;color:var(--color-neutral-foreground2-rest);"
            >Inline with visible label</span
          >
          <ui-time-picker
            [value]="inlineLabelValue"
            [inline]="true"
            [showLabel]="true"
            label="Review slot"
            [step]="1800"
            [use24HourFormat]="true"
            (timeChange)="inlineLabelValue = $event"
          />
        </div>
      </div>
    </div>
  `,
})
export class TimePickerSizeLayoutDemoComponent {
  protected smallValue = '08:30';
  protected mediumValue = '11:00';
  protected largeValue = '15:30';
  protected inlineValue = '10:00';
  protected inlineLabelValue = '14:30';
}
