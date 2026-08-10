import { Component, model, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, DialogComponent, QuickAction } from 'lui';

@Component({
  selector: 'app-dialog-basic-example',
  standalone: true,
  imports: [ButtonComponent, DialogComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:0.75rem">
      <ui-button variant="primary" (click)="visible.set(true)">Delete project</ui-button>
      <ui-dialog
        title="Delete this project?"
        [(visible)]="visible"
        [primaryAction]="primaryAction()"
        [secondaryAction]="secondaryAction()"
      >
        <p>
          All automation rules and scheduled exports for this project will be removed. This action
          cannot be undone.
        </p>
      </ui-dialog>
    </div>
  `,
})
export class DialogBasicExampleComponent {
  protected readonly visible = model(false);

  protected readonly primaryAction = signal<QuickAction>({
    label: 'Delete project',
    variant: 'danger',
    action: () => this.visible.set(false),
  });

  protected readonly secondaryAction = signal<QuickAction>({
    label: 'Cancel',
    variant: 'secondary',
    action: () => this.visible.set(false),
  });
}
