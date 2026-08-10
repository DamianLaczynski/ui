import { Component, model, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, DrawerComponent, QuickAction } from 'lui';

@Component({
  selector: 'app-drawer-basic-example',
  standalone: true,
  imports: [ButtonComponent, DrawerComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:0.75rem">
      <ui-button variant="primary" (click)="visible.set(true)">Open drawer</ui-button>
      <ui-drawer
        title="Customer notes"
        [(visible)]="visible"
        [primaryAction]="primaryAction()"
        [secondaryAction]="secondaryAction()"
      >
        <p>Review the latest support notes without leaving the account page.</p>
        <div style="display:flex;flex-direction:column;gap:0.75rem">
          <div
            style="padding:0.875rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem"
          >
            Renewal risk increased after delayed procurement review.
          </div>
          <div
            style="padding:0.875rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem"
          >
            Next suggested action: schedule finance follow-up before Friday.
          </div>
        </div>
      </ui-drawer>
    </div>
  `,
})
export class DrawerBasicExampleComponent {
  protected readonly visible = model(false);

  protected readonly primaryAction = signal<QuickAction>({
    label: 'Add note',
    variant: 'primary',
    action: () => this.visible.set(false),
  });

  protected readonly secondaryAction = signal<QuickAction>({
    label: 'Close',
    variant: 'secondary',
    action: () => this.visible.set(false),
  });
}
