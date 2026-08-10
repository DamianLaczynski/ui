import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, NumberComponent } from 'lui';

@Component({
  selector: 'app-number-step-ranges-demo',
  standalone: true,
  imports: [FormsModule, ButtonComponent, NumberComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:44rem">
      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <ui-button variant="secondary" appearance="outline" (click)="reset()">Reset</ui-button>
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
          >Qty: <strong>{{ quantity }}</strong></span
        >
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
          >Price: <strong>{{ price }}</strong></span
        >
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
          >Temp: <strong>{{ temperature }}</strong></span
        >
      </div>

      <div
        style="display:grid;grid-template-columns:repeat(auto-fit,minmax(13rem,1fr));gap:1rem;width:100%"
      >
        <ui-number
          label="Quantity"
          placeholder="0"
          [(ngModel)]="quantity"
          [ngModelOptions]="{ standalone: true }"
          [step]="1"
          [min]="0"
          [max]="100"
          helpText="Min 0, max 100, step 1."
        />

        <ui-number
          label="Unit price"
          placeholder="0.00"
          [(ngModel)]="price"
          [ngModelOptions]="{ standalone: true }"
          [step]="0.25"
          [min]="0"
          helpText="Quarter increments fit pricing or rate adjustments."
        />

        <ui-number
          label="Temperature"
          placeholder="0"
          [(ngModel)]="temperature"
          [ngModelOptions]="{ standalone: true }"
          [step]="5"
          [min]="-20"
          [max]="60"
          helpText="Fixed increments are useful for bounded operational values."
        />
      </div>
    </div>
  `,
})
export class NumberStepRangesDemoComponent {
  protected quantity = 10;
  protected price = 9.5;
  protected temperature = 20;
  protected readonly resetTick = signal(0);

  protected reset(): void {
    this.quantity = 10;
    this.price = 9.5;
    this.temperature = 20;
    this.resetTick.update(value => value + 1);
  }
}
