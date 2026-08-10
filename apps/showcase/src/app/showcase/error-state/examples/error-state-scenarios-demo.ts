import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ErrorStateComponent } from 'lui';

@Component({
  selector: 'app-error-state-scenarios-demo',
  standalone: true,
  imports: [ErrorStateComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));gap:1rem;width:100%;max-width:58rem"
    >
      <div
        style="padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <p
          style="margin:0 0 0.75rem;font-size:0.875rem;font-weight:600;color:var(--color-neutral-foreground2-rest)"
        >
          Network
        </p>
        <ui-error-state
          title="Network connection failed"
          description="Unable to connect to the server. Check your internet connection and retry."
          icon="wifi_off"
        />
      </div>

      <div
        style="padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <p
          style="margin:0 0 0.75rem;font-size:0.875rem;font-weight:600;color:var(--color-neutral-foreground2-rest)"
        >
          Permissions
        </p>
        <ui-error-state
          title="Access denied"
          description="You do not have permission to view this resource. Contact an administrator if access is required."
          icon="shield"
        />
      </div>

      <div
        style="padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <p
          style="margin:0 0 0.75rem;font-size:0.875rem;font-weight:600;color:var(--color-neutral-foreground2-rest)"
        >
          Missing resource
        </p>
        <ui-error-state
          title="Page not found"
          description="The resource you requested no longer exists or the link is outdated."
          icon="document_dismiss"
        />
      </div>
    </div>
  `,
})
export class ErrorStateScenariosDemoComponent {}
