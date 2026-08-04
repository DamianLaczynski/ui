import { Component, model, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, DrawerComponent, QuickAction } from 'ui';

@Component({
  selector: 'app-drawer-types-example',
  standalone: true,
  imports: [ButtonComponent, DrawerComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:44rem">
      <div style="display:flex;flex-wrap:wrap;gap:0.75rem">
        <ui-button appearance="outline" (click)="overlayVisible.set(true)"
          >Overlay drawer</ui-button
        >
        <ui-button appearance="outline" (click)="inlineVisible.set(true)">Inline drawer</ui-button>
      </div>

      <div
        style="display:flex;flex-direction:column;gap:0.75rem;min-height:28rem;padding:1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest);overflow:hidden"
      >
        <div
          style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:0.75rem;padding:0.75rem 0.875rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
        >
          <div style="display:flex;flex-direction:column;gap:0.25rem;min-width:0">
            <strong style="font-size:0.875rem;color:var(--color-neutral-foreground-rest)"
              >Inline drawer reflows the workspace</strong
            >
            <span
              style="font-size:0.8125rem;line-height:1.45;color:var(--color-neutral-foreground3-rest)"
            >
              Open the panel to see the content column shrink smoothly instead of jumping.
            </span>
          </div>
          <ui-button appearance="outline" (click)="inlineVisible.set(!inlineVisible())">
            {{ inlineVisible() ? 'Hide panel' : 'Show panel' }}
          </ui-button>
        </div>

        <div style="display:flex;flex:1;align-items:stretch;gap:1rem;min-height:0;overflow:hidden">
          <div
            style="flex:1 1 18rem;min-width:0;display:flex;flex-direction:column;gap:0.75rem;padding:0.875rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest);font-size:0.875rem;line-height:1.55;color:var(--color-neutral-foreground2-rest)"
          >
            <p style="margin:0">
              This bordered region represents page content. Inline mode keeps the panel inside the
              host layout, so it should feel attached to the workspace rather than floating above
              it.
            </p>
            <p style="margin:0">
              The overlay variant is rendered below, outside this card, spanning the full viewport.
            </p>
            <div style="display:flex;flex-wrap:wrap;gap:0.5rem">
              <span
                style="padding:0.25rem 0.625rem;border-radius:999px;background:var(--color-neutral-background2-rest);color:var(--color-neutral-foreground3-rest);font-size:0.75rem"
                >Filters</span
              >
              <span
                style="padding:0.25rem 0.625rem;border-radius:999px;background:var(--color-neutral-background2-rest);color:var(--color-neutral-foreground3-rest);font-size:0.75rem"
                >Review</span
              >
              <span
                style="padding:0.25rem 0.625rem;border-radius:999px;background:var(--color-neutral-background2-rest);color:var(--color-neutral-foreground3-rest);font-size:0.75rem"
                >Side tools</span
              >
            </div>
          </div>

          <div
            style="display:flex;align-items:stretch;justify-content:flex-end;flex-shrink:0;min-height:0"
          >
            <ui-drawer
              title="Inline panel"
              type="inline"
              position="right"
              size="medium"
              [(visible)]="inlineVisible"
              [primaryAction]="closeInlineAction()"
            >
              <div
                style="display:flex;flex-direction:column;gap:0.75rem;color:var(--color-neutral-foreground-rest);font-size:0.875rem;line-height:1.55"
              >
                <p style="margin:0">
                  Use inline drawers for filters, contextual review, or stacked tools that should
                  feel anchored to the workspace instead of masking the whole app.
                </p>
                <p style="margin:0">
                  When you need a focused task that blocks the rest of the UI, prefer an overlay
                  drawer.
                </p>
              </div>
            </ui-drawer>
          </div>
        </div>

        <div
          style="display:flex;flex-wrap:wrap;gap:0.75rem;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
        >
          <div
            style="flex:1 1 12rem;min-width:0;padding:0.75rem;border-radius:0.75rem;background:var(--color-neutral-background2-rest)"
          >
            <strong style="display:block;margin-bottom:0.375rem;font-size:0.8125rem"
              >Main list</strong
            >
            <span style="font-size:0.75rem;color:var(--color-neutral-foreground3-rest)"
              >Stays visible while the inline panel opens.</span
            >
          </div>
          <div
            style="flex:1 1 12rem;min-width:0;padding:0.75rem;border-radius:0.75rem;background:var(--color-neutral-background2-rest)"
          >
            <strong style="display:block;margin-bottom:0.375rem;font-size:0.8125rem"
              >Inspector area</strong
            >
            <span style="font-size:0.75rem;color:var(--color-neutral-foreground3-rest)"
              >Good fit for contextual tools and side editing.</span
            >
          </div>
          <div
            style="flex:1 1 12rem;min-width:0;padding:0.75rem;border-radius:0.75rem;background:var(--color-neutral-background2-rest)"
          >
            <strong style="display:block;margin-bottom:0.375rem;font-size:0.8125rem"
              >Viewport context</strong
            >
            <span style="font-size:0.75rem;color:var(--color-neutral-foreground3-rest)"
              >Helps users keep spatial awareness during edits.</span
            >
          </div>
        </div>
      </div>

      <ui-drawer
        title="Overlay panel"
        type="overlay"
        [(visible)]="overlayVisible"
        [primaryAction]="closeOverlayAction()"
      >
        <p>
          Overlay mode pauses the chrome behind the panel and is ideal for confirmations, multi-step
          edits, or transient forms.
        </p>
      </ui-drawer>
    </div>
  `,
})
export class DrawerTypesExampleComponent {
  protected readonly overlayVisible = model(false);
  protected readonly inlineVisible = model(false);

  protected readonly closeInlineAction = signal<QuickAction>({
    label: 'Done',
    variant: 'primary',
    action: () => this.inlineVisible.set(false),
  });

  protected readonly closeOverlayAction = signal<QuickAction>({
    label: 'Done',
    variant: 'primary',
    action: () => this.overlayVisible.set(false),
  });
}
