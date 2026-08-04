import { Component, model, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, DrawerComponent, QuickAction, SwitchComponent, TextComponent } from 'ui';

@Component({
  selector: 'app-drawer-settings-panel-example',
  standalone: true,
  imports: [FormsModule, ButtonComponent, DrawerComponent, SwitchComponent, TextComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:0.75rem;width:100%;max-width:26rem">
      <ui-button variant="primary" (click)="visible.set(true)">Open settings panel</ui-button>
      <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
        Current label: <strong>{{ currentLabel() }}</strong>
      </div>

      <ui-drawer
        title="Automation settings"
        position="right"
        size="large"
        [(visible)]="visible"
        [primaryAction]="saveAction()"
        [secondaryAction]="cancelAction()"
      >
        <p>
          Adjust the automation label and notification behavior without leaving the workflow page.
        </p>
        <div style="display:flex;flex-direction:column;gap:1rem">
          <ui-text
            label="Automation label"
            placeholder="Enter label"
            [(ngModel)]="draftLabel"
            [ngModelOptions]="{ standalone: true }"
            helpText="Visible in activity logs and notification templates."
          />

          <div
            style="display:flex;flex-direction:column;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem"
          >
            <ui-switch
              label="Notify channel owners"
              [(ngModel)]="notifyOwners"
              [ngModelOptions]="{ standalone: true }"
            />
            <ui-switch
              label="Pause after failures"
              [(ngModel)]="pauseOnFailure"
              [ngModelOptions]="{ standalone: true }"
            />
          </div>
        </div>
      </ui-drawer>
    </div>
  `,
})
export class DrawerSettingsPanelExampleComponent {
  protected readonly visible = model(false);
  protected readonly currentLabel = signal('Weekly renewal digest');
  protected draftLabel = 'Weekly renewal digest';
  protected notifyOwners = true;
  protected pauseOnFailure = false;

  protected readonly saveAction = signal<QuickAction>({
    label: 'Save settings',
    variant: 'primary',
    action: () => {
      const next = this.draftLabel.trim();
      this.currentLabel.set(next || this.currentLabel());
      this.visible.set(false);
    },
  });

  protected readonly cancelAction = signal<QuickAction>({
    label: 'Cancel',
    variant: 'secondary',
    action: () => {
      this.draftLabel = this.currentLabel();
      this.visible.set(false);
    },
  });
}
