import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TimeSpanComponent } from 'ui';

@Component({
  selector: 'app-time-span-size-variant-demo',
  standalone: true,
  imports: [FormsModule, TimeSpanComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(17rem,1fr));gap:1rem;align-items:start"
    >
      <ui-time-span
        label="Small filled"
        placeholder="45m"
        size="small"
        inputVariant="filled"
        [showHours]="true"
        [showMinutes]="true"
        [(ngModel)]="smallValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-time-span
        label="Medium filled gray"
        placeholder="2h"
        size="medium"
        inputVariant="filled-gray"
        [showHours]="true"
        [showMinutes]="true"
        [(ngModel)]="mediumValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-time-span
        label="Large underlined"
        placeholder="3d"
        size="large"
        inputVariant="underlined"
        [showDays]="true"
        [showHours]="true"
        [showMinutes]="true"
        [(ngModel)]="largeValue"
        [ngModelOptions]="{ standalone: true }"
      />
    </div>
  `,
})
export class TimeSpanSizeVariantDemoComponent {
  protected smallValue = 'PT45M';
  protected mediumValue = 'PT2H';
  protected largeValue = 'P3DT2H';
}
