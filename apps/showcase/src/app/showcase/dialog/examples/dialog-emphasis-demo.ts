import { Component, model, signal } from '@angular/core';
import { ButtonComponent, DialogComponent, QuickAction } from 'ui';

@Component({
  selector: 'app-dialog-emphasis-example',
  standalone: true,
  imports: [ButtonComponent, DialogComponent],
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:0.75rem">
      <ui-button variant="danger" appearance="outline" (click)="visible.set(true)">
        Delete role
      </ui-button>
      <ui-dialog
        title="Delete role"
        [(visible)]="visible"
        [primaryAction]="primaryAction()"
        [secondaryAction]="secondaryAction()"
      >
        <p>
          Delete role <strong>{{ roleName }}</strong
          >? Users will lose permissions granted only through this role.
        </p>
      </ui-dialog>
    </div>
  `,
})
export class DialogEmphasisExampleComponent {
  protected readonly visible = model(false);
  protected readonly roleName = 'Billing administrators';

  protected readonly primaryAction = signal<QuickAction>({
    label: 'Delete',
    variant: 'danger',
    action: () => this.visible.set(false),
  });

  protected readonly secondaryAction = signal<QuickAction>({
    label: 'Cancel',
    variant: 'secondary',
    action: () => this.visible.set(false),
  });
}
