import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ErrorStateComponent, type QuickAction } from 'lui';

@Component({
  selector: 'app-error-state-actions-demo',
  standalone: true,
  imports: [ErrorStateComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:56rem"
    >
      <div
        style="flex:0 0 30rem;padding:1.5rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <ui-error-state
          title="Upload failed"
          description="The file could not be uploaded. Retry the operation or contact support if the problem persists."
          icon="arrow_upload"
          [primaryAction]="retryAction"
          [secondaryAction]="supportAction"
        />
      </div>

      <div
        style="flex:1 1 16rem;padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <p
          style="margin:0 0 0.5rem;font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
        >
          Last action
        </p>
        <div style="font-size:0.875rem;line-height:1.5;color:var(--color-neutral-foreground-rest)">
          {{ lastAction() || 'No action yet.' }}
        </div>
      </div>
    </div>
  `,
})
export class ErrorStateActionsDemoComponent {
  protected readonly lastAction = signal('');

  protected readonly retryAction: QuickAction = {
    label: 'Try again',
    variant: 'primary',
    icon: 'arrow_sync',
    action: () => this.lastAction.set('Try again'),
  };

  protected readonly supportAction: QuickAction = {
    label: 'Contact support',
    variant: 'secondary',
    icon: 'person_support',
    action: () => this.lastAction.set('Contact support'),
  };
}
