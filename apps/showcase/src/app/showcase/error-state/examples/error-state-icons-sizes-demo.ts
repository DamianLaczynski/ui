import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ErrorStateComponent } from 'ui';

@Component({
  selector: 'app-error-state-icons-sizes-demo',
  standalone: true,
  imports: [ErrorStateComponent],
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
          Small
        </p>
        <ui-error-state
          title="Sync failed"
          description="Please try again."
          icon="arrow_sync"
          size="small"
        />
      </div>

      <div
        style="padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <p
          style="margin:0 0 0.75rem;font-size:0.875rem;font-weight:600;color:var(--color-neutral-foreground2-rest)"
        >
          Medium
        </p>
        <ui-error-state
          title="Connection error"
          description="We could not reach the server. Check your connection and try again."
          icon="wifi_off"
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
        <ui-error-state
          title="Import failed"
          description="The uploaded file could not be processed due to invalid data."
          icon="document_dismiss"
          size="large"
        />
      </div>
    </div>
  `,
})
export class ErrorStateIconsSizesDemoComponent {}
