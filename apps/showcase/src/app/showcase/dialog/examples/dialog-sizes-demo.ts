import { Component, model, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, DialogComponent, QuickAction } from 'lui';

@Component({
  selector: 'app-dialog-sizes-example',
  standalone: true,
  imports: [ButtonComponent, DialogComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:0.75rem">
      <ui-button appearance="outline" (click)="smallVisible.set(true)">Small</ui-button>
      <ui-button appearance="outline" (click)="mediumVisible.set(true)">Medium</ui-button>
      <ui-button appearance="outline" (click)="fullVisible.set(true)">Fullscreen</ui-button>

      <ui-dialog
        title="Small review"
        width="20rem"
        [(visible)]="smallVisible"
        [primaryAction]="okAction()"
      >
        <p>Use a small width when the task is short and the decision is narrow.</p>
      </ui-dialog>

      <ui-dialog
        title="Standard edit surface"
        width="38rem"
        [(visible)]="mediumVisible"
        [primaryAction]="okAction()"
      >
        <p>
          Medium width is a solid default for richer copy, small forms, and straightforward review
          tasks.
        </p>
      </ui-dialog>

      <ui-dialog
        title="Fullscreen editing flow"
        [fullscreen]="true"
        [(visible)]="fullVisible"
        [primaryAction]="publishAction()"
        [secondaryAction]="cancelAction()"
      >
        <div style="display:flex;flex-direction:column;gap:1rem;min-height:18rem">
          <div style="font-size:0.875rem;color:var(--color-neutral-foreground2-rest)">
            Fullscreen is better for complex editing, side-by-side review, or dense operational
            tasks.
          </div>
          <div
            style="display:grid;grid-template-columns:repeat(auto-fit,minmax(14rem,1fr));gap:0.75rem"
          >
            <div
              style="padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem"
            >
              Left panel content
            </div>
            <div
              style="padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem"
            >
              Right panel content
            </div>
          </div>
        </div>
      </ui-dialog>
    </div>
  `,
})
export class DialogSizesExampleComponent {
  protected readonly smallVisible = model(false);
  protected readonly mediumVisible = model(false);
  protected readonly fullVisible = model(false);

  protected readonly okAction = signal<QuickAction>({
    label: 'Close',
    variant: 'primary',
    action: () => {
      this.smallVisible.set(false);
      this.mediumVisible.set(false);
      this.fullVisible.set(false);
    },
  });

  protected readonly publishAction = signal<QuickAction>({
    label: 'Publish draft',
    variant: 'primary',
    action: () => this.fullVisible.set(false),
  });

  protected readonly cancelAction = signal<QuickAction>({
    label: 'Cancel',
    variant: 'secondary',
    action: () => this.fullVisible.set(false),
  });
}
