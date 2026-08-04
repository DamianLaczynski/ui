import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TimeComponent } from 'ui';

@Component({
  selector: 'app-time-size-variant-demo',
  standalone: true,
  imports: [FormsModule, TimeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:1rem;align-items:start"
    >
      <ui-time
        label="Small filled"
        placeholder="HH:mm"
        size="small"
        inputVariant="filled"
        [(ngModel)]="smallValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-time
        label="Medium filled gray"
        placeholder="HH:mm"
        size="medium"
        inputVariant="filled-gray"
        [(ngModel)]="mediumValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-time
        label="Large underlined"
        placeholder="HH:mm"
        size="large"
        inputVariant="underlined"
        [(ngModel)]="largeValue"
        [ngModelOptions]="{ standalone: true }"
      />
    </div>
  `,
})
export class TimeSizeVariantDemoComponent {
  protected smallValue = '08:30';
  protected mediumValue = '11:00';
  protected largeValue = '15:45';
}
