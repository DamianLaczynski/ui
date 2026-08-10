import { Component, model, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, DrawerComponent, QuickAction } from 'lui';

@Component({
  selector: 'app-drawer-actions-example',
  standalone: true,
  imports: [ButtonComponent, DrawerComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:0.75rem;width:100%;max-width:24rem">
      <ui-button variant="secondary" appearance="outline" (click)="visible.set(true)">
        Open actions drawer
      </ui-button>
      <div
        style="display:flex;flex-wrap:wrap;align-items:center;gap:0.5rem;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest);font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
      >
        Last action: <strong>{{ lastAction() || 'none' }}</strong>
      </div>

      <ui-drawer
        title="Report options"
        [(visible)]="visible"
        [primaryAction]="primaryAction()"
        [secondaryAction]="secondaryAction()"
        [additionalActions]="additionalActions()"
      >
        <p>Choose how the report should be handled after generation.</p>
      </ui-drawer>
    </div>
  `,
})
export class DrawerActionsExampleComponent {
  protected readonly visible = model(false);
  protected readonly lastAction = signal('');

  protected readonly primaryAction = signal<QuickAction>({
    label: 'Publish',
    variant: 'primary',
    action: () => {
      this.lastAction.set('Publish');
      this.visible.set(false);
    },
  });

  protected readonly secondaryAction = signal<QuickAction>({
    label: 'Cancel',
    variant: 'secondary',
    action: () => {
      this.lastAction.set('Cancel');
      this.visible.set(false);
    },
  });

  protected readonly additionalActions = signal<QuickAction[]>([
    {
      label: 'Preview',
      variant: 'secondary',
      appearance: 'outline',
      action: () => this.lastAction.set('Preview'),
    },
    {
      label: 'Duplicate',
      variant: 'secondary',
      appearance: 'subtle',
      action: () => this.lastAction.set('Duplicate'),
    },
  ]);
}
