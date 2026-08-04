import { Component, model, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, DialogComponent, QuickAction } from 'ui';

@Component({
  selector: 'app-dialog-static-example',
  standalone: true,
  imports: [ButtonComponent, DialogComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:0.75rem">
      <ui-button variant="danger" (click)="visible.set(true)">Open blocking dialog</ui-button>
      <ui-dialog
        title="Choose how to handle this conflict"
        backdrop="static"
        [closable]="false"
        [(visible)]="visible"
        [primaryAction]="mergeAction()"
        [secondaryAction]="cancelImportAction()"
      >
        <p>
          This import contains duplicate customer IDs. You must resolve the conflict before
          continuing.
        </p>
      </ui-dialog>
    </div>
  `,
})
export class DialogStaticExampleComponent {
  protected readonly visible = model(false);

  protected readonly mergeAction = signal<QuickAction>({
    label: 'Review duplicates',
    variant: 'primary',
    action: () => this.visible.set(false),
  });

  protected readonly cancelImportAction = signal<QuickAction>({
    label: 'Cancel import',
    variant: 'secondary',
    action: () => this.visible.set(false),
  });
}
