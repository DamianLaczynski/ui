import { Component, model, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, DrawerComponent, QuickAction } from 'lui';

@Component({
  selector: 'app-drawer-behavior-example',
  standalone: true,
  imports: [ButtonComponent, DrawerComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:0.75rem">
      <ui-button appearance="outline" (click)="dynamicVisible.set(true)"
        >Dynamic backdrop</ui-button
      >
      <ui-button appearance="outline" (click)="staticVisible.set(true)">Static backdrop</ui-button>
      <ui-button variant="danger" appearance="outline" (click)="alertVisible.set(true)">
        Alert drawer
      </ui-button>

      <ui-drawer
        title="Standard behavior"
        backdrop="dynamic"
        [(visible)]="dynamicVisible"
        [primaryAction]="closeDynamicAction()"
      >
        <p>This drawer closes on backdrop click and Escape.</p>
      </ui-drawer>

      <ui-drawer
        title="Static backdrop"
        backdrop="static"
        [(visible)]="staticVisible"
        [primaryAction]="closeStaticAction()"
      >
        <p>
          Backdrop clicks are ignored here, so users must close with the close button or footer
          actions.
        </p>
      </ui-drawer>

      <ui-drawer
        title="Blocking review required"
        backdrop="static"
        modalType="alert"
        [closable]="true"
        [(visible)]="alertVisible"
        [primaryAction]="resolveAlertAction()"
        [secondaryAction]="dismissAlertAction()"
      >
        <p>
          Alert mode disables Escape and backdrop dismissal. Use it only when the task really
          demands that level of interruption.
        </p>
      </ui-drawer>
    </div>
  `,
})
export class DrawerBehaviorExampleComponent {
  protected readonly dynamicVisible = model(false);
  protected readonly staticVisible = model(false);
  protected readonly alertVisible = model(false);

  protected readonly closeDynamicAction = signal<QuickAction>({
    label: 'Done',
    variant: 'primary',
    action: () => this.dynamicVisible.set(false),
  });

  protected readonly closeStaticAction = signal<QuickAction>({
    label: 'Done',
    variant: 'primary',
    action: () => this.staticVisible.set(false),
  });

  protected readonly resolveAlertAction = signal<QuickAction>({
    label: 'Review now',
    variant: 'primary',
    action: () => this.alertVisible.set(false),
  });

  protected readonly dismissAlertAction = signal<QuickAction>({
    label: 'Defer',
    variant: 'secondary',
    action: () => this.alertVisible.set(false),
  });
}
