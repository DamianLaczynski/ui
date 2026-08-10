import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, ErrorStateComponent } from 'lui';

@Component({
  selector: 'app-error-state-custom-content-demo',
  standalone: true,
  imports: [ButtonComponent, ErrorStateComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="width:100%;max-width:34rem;padding:1.5rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <ui-error-state title="Fix the highlighted issues" icon="error_circle">
        <ng-template #content>
          <div
            style="display:flex;flex-direction:column;gap:0.875rem;align-items:center;text-align:center"
          >
            <div style="color:var(--color-shared-red-foreground);font-size:0.875rem">
              We found problems in your submission:
            </div>
            <div
              style="width:100%;max-width:24rem;padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest);text-align:left"
            >
              <div>Email address is required</div>
              <div>Password must be at least 8 characters</div>
              <div>Phone number format is invalid</div>
            </div>
            <ui-button variant="primary" size="small">Review form</ui-button>
          </div>
        </ng-template>
      </ui-error-state>
    </div>
  `,
})
export class ErrorStateCustomContentDemoComponent {}
