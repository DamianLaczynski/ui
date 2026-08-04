import { Component, model, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, DialogComponent, QuickAction, TextComponent } from 'ui';

@Component({
  selector: 'app-dialog-rename-flow-example',
  standalone: true,
  imports: [FormsModule, ButtonComponent, DialogComponent, TextComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:0.75rem;width:100%;max-width:24rem">
      <ui-button variant="primary" (click)="visible.set(true)">Rename workspace</ui-button>
      <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
        Current name: <strong>{{ currentName() }}</strong>
      </div>

      <ui-dialog
        title="Rename workspace"
        [(visible)]="visible"
        width="34rem"
        [primaryAction]="saveAction()"
        [secondaryAction]="cancelAction()"
      >
        <div style="display:flex;flex-direction:column;gap:1rem">
          <div
            style="font-size:0.875rem;line-height:1.55;color:var(--color-neutral-foreground2-rest)"
          >
            Update the public workspace name. This will be visible in navigation, email
            notifications, and shared review pages.
          </div>

          <ui-text
            label="Workspace name"
            placeholder="Enter workspace name"
            helpText="Keep it short and recognizable for the whole team."
            [(ngModel)]="draftName"
            [ngModelOptions]="{ standalone: true }"
          />

          <div
            style="padding:0.875rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem;background:var(--color-neutral-background2-rest)"
          >
            <div
              style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest);margin-bottom:0.25rem"
            >
              Preview
            </div>
            <div style="font-size:0.9375rem;font-weight:600">
              {{ draftName.trim() || 'Untitled workspace' }}
            </div>
          </div>
        </div>
      </ui-dialog>
    </div>
  `,
})
export class DialogRenameFlowExampleComponent {
  protected readonly visible = model(false);
  protected readonly currentName = signal('Product Ops Europe');
  protected draftName = 'Product Ops Europe';

  protected readonly saveAction = signal<QuickAction>({
    label: 'Save name',
    variant: 'primary',
    action: () => {
      const next = this.draftName.trim();
      this.currentName.set(next || this.currentName());
      this.visible.set(false);
    },
  });

  protected readonly cancelAction = signal<QuickAction>({
    label: 'Cancel',
    variant: 'secondary',
    action: () => {
      this.draftName = this.currentName();
      this.visible.set(false);
    },
  });
}
