import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MonthComponent } from 'ui';

@Component({
  selector: 'app-month-size-variant-demo',
  standalone: true,
  imports: [FormsModule, MonthComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:1rem;align-items:start"
    >
      <ui-month
        label="Small filled"
        placeholder="YYYY-MM"
        size="small"
        inputVariant="filled"
        [(ngModel)]="smallValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-month
        label="Medium filled gray"
        placeholder="YYYY-MM"
        size="medium"
        inputVariant="filled-gray"
        [(ngModel)]="mediumValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-month
        label="Large underlined"
        placeholder="YYYY-MM"
        size="large"
        inputVariant="underlined"
        [(ngModel)]="largeValue"
        [ngModelOptions]="{ standalone: true }"
      />
    </div>
  `,
})
export class MonthSizeVariantDemoComponent {
  protected smallValue = '2026-03';
  protected mediumValue = '2026-05';
  protected largeValue = '2026-08';
}
