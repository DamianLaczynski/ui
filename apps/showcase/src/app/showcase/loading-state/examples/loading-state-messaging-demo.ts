import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LoadingStateComponent } from 'ui';

@Component({
  selector: 'app-loading-state-messaging-demo',
  standalone: true,
  imports: [LoadingStateComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));gap:1rem;width:100%;max-width:56rem"
    >
      <div
        style="padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <p
          style="margin:0 0 0.75rem;font-size:0.875rem;font-weight:600;color:var(--color-neutral-foreground2-rest)"
        >
          Compact
        </p>
        <ui-loading-state title="Loading data..." size="small" spinnerSize="small" />
      </div>

      <div
        style="padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <p
          style="margin:0 0 0.75rem;font-size:0.875rem;font-weight:600;color:var(--color-neutral-foreground2-rest)"
        >
          Standard
        </p>
        <ui-loading-state
          title="Loading your workspace"
          description="Fetching the latest information and preparing the view."
        />
      </div>

      <div
        style="padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <p
          style="margin:0 0 0.75rem;font-size:0.875rem;font-weight:600;color:var(--color-neutral-foreground2-rest)"
        >
          Large
        </p>
        <ui-loading-state
          title="Preparing report"
          description="This can take a moment for larger datasets."
          size="large"
          spinnerSize="large"
        />
      </div>
    </div>
  `,
})
export class LoadingStateMessagingDemoComponent {}
