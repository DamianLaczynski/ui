import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { BadgeComponent, Step, StepperComponent } from 'lui';

@Component({
  selector: 'app-stepper-vertical-example',
  standalone: true,
  imports: [BadgeComponent, StepperComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1.25rem;align-items:flex-start;width:100%;max-width:46rem"
    >
      <ui-stepper
        style="flex:0 0 auto"
        [steps]="steps()"
        [activeStepIndex]="active()"
        orientation="vertical"
        [showDescriptions]="true"
        [clickable]="true"
        (stepChange)="active.set($event.index)"
      />
      <div
        style="flex:1;min-width:14rem;display:flex;flex-direction:column;gap:0.5rem;padding:0.75rem 0"
      >
        <ui-badge appearance="tint" variant="secondary" text="Draft policy" />
        <p
          style="margin:0;font-size:0.875rem;color:var(--color-neutral-foreground2-rest);line-height:1.45"
        >
          Vertical steppers suit narrow rails next to a detail pane. Labels and descriptions stay
          aligned while the main surface swaps content.
        </p>
      </div>
    </div>
  `,
})
export class StepperVerticalExampleComponent {
  protected readonly steps = signal<Step[]>([
    { id: '1', label: 'Intake', description: 'Collect request' },
    { id: '2', label: 'Legal', description: 'Review wording' },
    { id: '3', label: 'Sign-off', description: 'Approver' },
  ]);

  protected readonly active = signal(0);
}
