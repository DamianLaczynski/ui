import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ErrorStateComponent } from 'ui';

@Component({
  selector: 'app-error-state-basic-demo',
  standalone: true,
  imports: [ErrorStateComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="width:100%;max-width:28rem;padding:1.5rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <ui-error-state
        title="Something went wrong"
        description="An unexpected problem occurred. Please try again in a moment."
      />
    </div>
  `,
})
export class ErrorStateBasicDemoComponent {}
