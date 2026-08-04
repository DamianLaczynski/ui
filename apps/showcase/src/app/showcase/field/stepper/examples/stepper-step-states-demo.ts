import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Step, StepperComponent } from 'ui';

@Component({
  selector: 'app-stepper-step-states-example',
  standalone: true,
  imports: [StepperComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="width:100%;max-width:52rem">
      <ui-stepper [steps]="steps" [activeStepIndex]="1" [clickable]="false" />
    </div>
  `,
})
export class StepperStepStatesExampleComponent {
  protected readonly steps: Step[] = [
    { id: 1, label: 'Done', completed: true },
    { id: 2, label: 'Active', completed: false },
    { id: 3, label: 'Blocked', error: true, completed: false },
    { id: 4, label: 'Review', warning: true, completed: false },
    { id: 5, label: 'Later', disabled: true, completed: false },
  ];
}
