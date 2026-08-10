import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { RatingComponent } from 'lui';

@Component({
  selector: 'app-rating-basic-example',
  standalone: true,
  imports: [RatingComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:0.75rem;align-items:flex-start">
      <ui-rating [value]="value()" [max]="5" [showValue]="true" (valueChange)="value.set($event)" />
      <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
        Current value {{ value() }} of 5
      </span>
    </div>
  `,
})
export class RatingBasicExampleComponent {
  protected readonly value = signal(3);
}
