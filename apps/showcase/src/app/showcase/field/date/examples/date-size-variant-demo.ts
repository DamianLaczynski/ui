import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateComponent } from 'lui';

@Component({
  selector: 'app-date-size-variant-demo',
  standalone: true,
  imports: [FormsModule, DateComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:1rem;align-items:start"
    >
      <ui-date
        label="Small filled"
        placeholder="YYYY-MM-DD"
        size="small"
        inputVariant="filled"
        [(ngModel)]="smallValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-date
        label="Medium filled gray"
        placeholder="YYYY-MM-DD"
        size="medium"
        inputVariant="filled-gray"
        [(ngModel)]="mediumValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-date
        label="Large underlined"
        placeholder="YYYY-MM-DD"
        size="large"
        inputVariant="underlined"
        [(ngModel)]="largeValue"
        [ngModelOptions]="{ standalone: true }"
      />
    </div>
  `,
})
export class DateSizeVariantDemoComponent {
  protected smallValue = '2026-05-08';
  protected mediumValue = '2026-05-12';
  protected largeValue = '2026-05-21';
}
