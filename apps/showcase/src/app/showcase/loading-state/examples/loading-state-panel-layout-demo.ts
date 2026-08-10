import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, LoadingStateComponent, MessageBarComponent, TextComponent } from 'lui';

@Component({
  selector: 'app-loading-state-panel-layout-demo',
  standalone: true,
  imports: [ButtonComponent, LoadingStateComponent, MessageBarComponent, TextComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:60rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div
        style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:0.75rem"
      >
        <ui-text placeholder="Search updates..." style="width:16rem" />
        <ui-button variant="secondary" appearance="outline">Filter</ui-button>
      </div>

      <ui-message-bar
        title="Sync in progress"
        message="Recent updates are still being aggregated. The panel stays readable while the content refreshes."
        variant="secondary"
        appearance="subtle"
        [dismissible]="false"
      />

      <ui-loading-state
        [overlay]="true"
        [isLoading]="true"
        [blurContent]="true"
        title="Updating activity"
        spinnerSize="small"
      >
        <div
          style="display:grid;gap:0.75rem;padding:1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
        >
          <div
            style="padding:0.875rem;border-radius:0.75rem;background:var(--color-neutral-background-rest)"
          >
            Latest deployment completed
          </div>
          <div
            style="padding:0.875rem;border-radius:0.75rem;background:var(--color-neutral-background-rest)"
          >
            Three new comments on design review
          </div>
          <div
            style="padding:0.875rem;border-radius:0.75rem;background:var(--color-neutral-background-rest)"
          >
            Import queue is processing 12 files
          </div>
        </div>
      </ui-loading-state>
    </div>
  `,
})
export class LoadingStatePanelLayoutDemoComponent {}
