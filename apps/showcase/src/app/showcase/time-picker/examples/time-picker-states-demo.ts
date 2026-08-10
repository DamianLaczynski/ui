import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, TimePickerComponent } from 'lui';

@Component({
  selector: 'app-time-picker-states-demo',
  standalone: true,
  imports: [FormsModule, ButtonComponent, TimePickerComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;">
      <div
        style="display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:1rem;align-items:start"
      >
        <ui-time-picker
          [value]="activeValue"
          [showLabel]="true"
          label="Active picker"
          [step]="900"
          [use24HourFormat]="true"
          (timeChange)="activeValue = $event"
        />

        <ui-time-picker
          [value]="'09:30'"
          [showLabel]="true"
          label="Disabled picker"
          [step]="900"
          [use24HourFormat]="true"
          [disabled]="true"
        />

        <ui-time-picker
          [value]="amPmValue"
          [showLabel]="true"
          label="Disabled 12 hour picker"
          [step]="1800"
          [use24HourFormat]="false"
          [disabled]="disabledTwelveHour"
          (timeChange)="amPmValue = $event"
        />
      </div>

      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <ui-button variant="secondary" appearance="outline" (click)="toggleDisabled12h()">
          {{ disabledTwelveHour ? 'Enable' : 'Disable' }} 12h picker
        </ui-button>
        <ui-button variant="secondary" appearance="outline" (click)="reset()">Reset</ui-button>
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest);">
          Active value:
          <strong style="color:var(--color-neutral-foreground1-rest)">{{ activeValue }}</strong>
        </span>
      </div>
    </div>
  `,
})
export class TimePickerStatesDemoComponent {
  protected activeValue = '13:15';
  protected amPmValue = '16:30';
  protected disabledTwelveHour = true;

  protected toggleDisabled12h(): void {
    this.disabledTwelveHour = !this.disabledTwelveHour;
  }

  protected reset(): void {
    this.activeValue = '13:15';
    this.amPmValue = '16:30';
    this.disabledTwelveHour = true;
  }
}
