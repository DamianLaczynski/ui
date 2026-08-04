import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, Step, StepperComponent } from 'ui';

@Component({
  selector: 'app-stepper-basic-example',
  standalone: true,
  imports: [ButtonComponent, StepperComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:48rem">
      <ui-stepper
        [steps]="steps()"
        [activeStepIndex]="active()"
        [clickable]="true"
        (stepChange)="active.set($event.index)"
      />
      <div style="display:flex;flex-wrap:wrap;gap:0.5rem">
        <ui-button type="button" variant="secondary" [disabled]="active() === 0" (click)="prev()">
          Back
        </ui-button>
        <ui-button
          type="button"
          variant="primary"
          [disabled]="active() >= steps().length - 1"
          (click)="next()"
        >
          Next
        </ui-button>
      </div>
    </div>
  `,
})
export class StepperBasicExampleComponent {
  protected readonly steps = signal<Step[]>([
    { id: 'scope', label: 'Scope' },
    { id: 'details', label: 'Details' },
    { id: 'publish', label: 'Publish' },
  ]);

  protected readonly active = signal(0);

  protected prev(): void {
    this.active.update(i => Math.max(0, i - 1));
  }

  protected next(): void {
    this.active.update(i => Math.min(this.steps().length - 1, i + 1));
  }
}
