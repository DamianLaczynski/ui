import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NumberComponent } from 'lui';

@Component({
  selector: 'app-number-basic-demo',
  standalone: true,
  imports: [FormsModule, NumberComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(14rem,1fr));gap:1rem;width:100%;max-width:44rem"
    >
      <ui-number
        label="Seats"
        placeholder="0"
        [(ngModel)]="seats"
        [ngModelOptions]="{ standalone: true }"
        helpText="Simple integer input for counts and quantities."
      />

      <ui-number
        label="Budget"
        placeholder="0.00"
        [(ngModel)]="budget"
        [ngModelOptions]="{ standalone: true }"
        [step]="0.01"
        helpText="Decimal input is useful for money-like values."
      />
    </div>
  `,
})
export class NumberBasicDemoComponent {
  protected seats = 12;
  protected budget = 2500;
}
