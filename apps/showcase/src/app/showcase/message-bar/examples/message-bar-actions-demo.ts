import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { MessageBarComponent, QuickAction } from 'lui';

@Component({
  selector: 'app-message-bar-actions-example',
  standalone: true,
  imports: [MessageBarComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:0.75rem;width:100%;max-width:46rem">
      @if (!dismissed()) {
        <ui-message-bar
          title="Invoice sync failed"
          message="Three invoices could not be matched to customers. Review the import and retry."
          variant="danger"
          appearance="outline"
          [actions]="actions"
          (actionSelect)="lastAction.set($event.label)"
          (dismiss)="dismissed.set(true)"
        />
      } @else {
        <ui-message-bar
          title="Notice dismissed"
          message="In a real app you would usually keep this hidden until the next relevant state change."
          variant="secondary"
          appearance="subtle"
          [dismissible]="false"
          [showIcon]="false"
        />
      }

      <div
        style="display:flex;flex-wrap:wrap;align-items:center;gap:0.5rem;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest);font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
      >
        Last action: <strong>{{ lastAction() || 'none' }}</strong>
      </div>
    </div>
  `,
})
export class MessageBarActionsExampleComponent {
  protected readonly dismissed = signal(false);
  protected readonly lastAction = signal('');

  protected readonly actions: QuickAction[] = [
    {
      label: 'Review errors',
      variant: 'danger',
      appearance: 'outline',
      action: () => this.lastAction.set('Review errors'),
    },
    {
      label: 'Retry sync',
      variant: 'secondary',
      appearance: 'outline',
      action: () => this.lastAction.set('Retry sync'),
    },
  ];
}
