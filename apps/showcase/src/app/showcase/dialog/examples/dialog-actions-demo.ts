import { Component, model, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, DialogComponent, QuickAction } from 'ui';

@Component({
  selector: 'app-dialog-actions-example',
  standalone: true,
  imports: [ButtonComponent, DialogComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:0.75rem;width:100%;max-width:22rem">
      <ui-button variant="secondary" appearance="outline" (click)="visible.set(true)">
        Open action chooser
      </ui-button>
      <div
        style="display:flex;flex-wrap:wrap;align-items:center;gap:0.5rem;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest);font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
      >
        Last action: <strong>{{ lastAction() || 'none' }}</strong>
      </div>
      <ui-dialog
        title="Send the report"
        [(visible)]="visible"
        [primaryAction]="sendNowAction()"
        [secondaryAction]="saveDraftAction()"
        [additionalActions]="additionalActions()"
      >
        <p>Choose whether the report should be shared now, scheduled, or saved as a draft.</p>
      </ui-dialog>
    </div>
  `,
})
export class DialogActionsExampleComponent {
  protected readonly visible = model(false);
  protected readonly lastAction = signal('');

  protected readonly sendNowAction = signal<QuickAction>({
    label: 'Send now',
    variant: 'primary',
    action: () => {
      this.lastAction.set('Send now');
      this.visible.set(false);
    },
  });

  protected readonly saveDraftAction = signal<QuickAction>({
    label: 'Save draft',
    variant: 'secondary',
    action: () => {
      this.lastAction.set('Save draft');
      this.visible.set(false);
    },
  });

  protected readonly additionalActions = signal<QuickAction[]>([
    {
      label: 'Schedule',
      variant: 'secondary',
      appearance: 'outline',
      action: () => {
        this.lastAction.set('Schedule');
        this.visible.set(false);
      },
    },
    {
      label: 'Preview',
      variant: 'secondary',
      appearance: 'subtle',
      action: () => {
        this.lastAction.set('Preview');
        this.visible.set(false);
      },
    },
  ]);
}
