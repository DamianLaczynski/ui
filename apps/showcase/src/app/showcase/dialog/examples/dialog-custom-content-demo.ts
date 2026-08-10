import { Component, model, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, DialogComponent, QuickAction } from 'lui';

@Component({
  selector: 'app-dialog-custom-content-example',
  standalone: true,
  imports: [ButtonComponent, DialogComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:0.75rem">
      <ui-button variant="secondary" appearance="outline" (click)="visible.set(true)">
        Review summary
      </ui-button>
      <ui-dialog
        title="Migration summary"
        [(visible)]="visible"
        width="38rem"
        [primaryAction]="primaryAction()"
        [secondaryAction]="secondaryAction()"
      >
        <div style="display:flex;flex-direction:column;gap:0.875rem">
          <div
            style="display:grid;grid-template-columns:repeat(auto-fit,minmax(10rem,1fr));gap:0.75rem"
          >
            <div
              style="display:flex;flex-direction:column;gap:0.2rem;padding:0.875rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem"
            >
              <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)"
                >Content</span
              >
              <span style="font-size:0.9375rem;font-weight:600">124 files</span>
            </div>
            <div
              style="display:flex;flex-direction:column;gap:0.2rem;padding:0.875rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem"
            >
              <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)"
                >Groups</span
              >
              <span style="font-size:0.9375rem;font-weight:600">18 permissions</span>
            </div>
            <div
              style="display:flex;flex-direction:column;gap:0.2rem;padding:0.875rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem"
            >
              <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)"
                >Duration</span
              >
              <span style="font-size:0.9375rem;font-weight:600">~12 minutes</span>
            </div>
          </div>
          <div
            style="font-size:0.875rem;line-height:1.55;color:var(--color-neutral-foreground2-rest)"
          >
            External share links will be revalidated during the move. Team members keep existing
            roles unless a target workspace policy blocks them.
          </div>
        </div>
      </ui-dialog>
    </div>
  `,
})
export class DialogCustomContentExampleComponent {
  protected readonly visible = model(false);

  protected readonly primaryAction = signal<QuickAction>({
    label: 'Continue',
    variant: 'primary',
    action: () => this.visible.set(false),
  });

  protected readonly secondaryAction = signal<QuickAction>({
    label: 'Back',
    variant: 'secondary',
    action: () => this.visible.set(false),
  });
}
