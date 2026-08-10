import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, Step, StepperComponent } from 'lui';

@Component({
  selector: 'app-stepper-linear-progress-example',
  standalone: true,
  imports: [ButtonComponent, StepperComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:48rem">
      <ui-stepper
        [steps]="steps()"
        [activeStepIndex]="active()"
        [linear]="true"
        [clickable]="true"
        [showDescriptions]="true"
        (stepChange)="active.set($event.index)"
      />
      <div
        style="display:flex;flex-wrap:wrap;gap:0.5rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <ui-button type="button" variant="secondary" [disabled]="active() === 0" (click)="prev()">
          Back
        </ui-button>
        <ui-button
          type="button"
          variant="primary"
          [disabled]="active() >= steps().length - 1"
          (click)="completeAndNext()"
        >
          Mark done and continue
        </ui-button>
        <ui-button type="button" variant="secondary" appearance="outline" (click)="reset()">
          Reset
        </ui-button>
      </div>
    </div>
  `,
})
export class StepperLinearProgressExampleComponent {
  protected readonly steps = signal<Step[]>([
    { id: 'a', label: 'Inventory', description: 'Pick sources' },
    { id: 'b', label: 'Mapping', description: 'Match fields' },
    { id: 'c', label: 'Run', description: 'Start job' },
  ]);

  protected readonly active = signal(0);

  protected prev(): void {
    this.active.update(i => Math.max(0, i - 1));
  }

  protected completeAndNext(): void {
    const i = this.active();
    const list = this.steps();
    this.steps.update(prev => prev.map((s, idx) => (idx === i ? { ...s, completed: true } : s)));
    if (i < list.length - 1) {
      this.active.set(i + 1);
    }
  }

  protected reset(): void {
    this.active.set(0);
    this.steps.set([
      { id: 'a', label: 'Inventory', description: 'Pick sources' },
      { id: 'b', label: 'Mapping', description: 'Match fields' },
      { id: 'c', label: 'Run', description: 'Start job' },
    ]);
  }
}
