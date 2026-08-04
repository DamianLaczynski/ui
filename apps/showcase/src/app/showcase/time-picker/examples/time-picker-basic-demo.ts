import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TimePickerComponent } from 'ui';

@Component({
  selector: 'app-time-picker-basic-demo',
  standalone: true,
  imports: [FormsModule, TimePickerComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:26rem;">
      <ui-time-picker
        [value]="selectedTime"
        [showLabel]="true"
        label="Start time"
        [step]="900"
        [use24HourFormat]="true"
        (timeChange)="selectedTime = $event"
      />

      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest);">
          Selected value:
          <strong style="color:var(--color-neutral-foreground1-rest)">{{
            selectedTime || 'Not set'
          }}</strong>
        </span>
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest);">
          Wheel interactions emit normalized <strong>HH:mm</strong> strings.
        </span>
      </div>
    </div>
  `,
})
export class TimePickerBasicDemoComponent {
  protected selectedTime = '09:30';
}
