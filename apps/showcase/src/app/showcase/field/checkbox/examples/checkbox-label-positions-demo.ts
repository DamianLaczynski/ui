import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from 'ui';

@Component({
  selector: 'app-checkbox-label-positions-example',
  standalone: true,
  imports: [FormsModule, CheckboxComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(12rem,1fr));gap:1rem;width:100%;max-width:40rem"
    >
      <ui-checkbox
        label="Label after"
        labelPosition="after"
        [(ngModel)]="afterValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-checkbox
        label="Label before"
        labelPosition="before"
        [(ngModel)]="beforeValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-checkbox
        label="Label above"
        labelPosition="above"
        [(ngModel)]="aboveValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-checkbox
        label="Label below"
        labelPosition="below"
        [(ngModel)]="belowValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <div
        style="display:flex;flex-direction:column;gap:0.375rem;padding:0.875rem 1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Hidden visible label
        </div>
        <ui-checkbox
          labelPosition="none"
          ariaLabel="Enable compact table rows"
          [(ngModel)]="hiddenLabelValue"
          [ngModelOptions]="{ standalone: true }"
        />
      </div>
    </div>
  `,
})
export class CheckboxLabelPositionsExampleComponent {
  protected afterValue = true;
  protected beforeValue = false;
  protected aboveValue = true;
  protected belowValue = false;
  protected hiddenLabelValue = true;
}
