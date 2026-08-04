import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LoadingStateComponent } from 'ui';

@Component({
  selector: 'app-loading-state-basic-demo',
  standalone: true,
  imports: [LoadingStateComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="width:100%;max-width:26rem;padding:1.5rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <ui-loading-state />
    </div>
  `,
})
export class LoadingStateBasicDemoComponent {}
