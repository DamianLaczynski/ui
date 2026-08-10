import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, ErrorStateComponent, TextComponent } from 'lui';

@Component({
  selector: 'app-error-state-panel-layout-demo',
  standalone: true,
  imports: [ButtonComponent, ErrorStateComponent, TextComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:60rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div
        style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:0.75rem"
      >
        <ui-text placeholder="Search activity..." style="width:16rem" />
        <ui-button variant="secondary" appearance="outline">Filter</ui-button>
      </div>

      <div
        style="display:flex;align-items:center;justify-content:center;min-height:18rem;padding:1.5rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <ui-error-state
          title="Could not load activity"
          description="The activity panel failed to refresh. Retry the request or come back later."
          icon="history"
        />
      </div>
    </div>
  `,
})
export class ErrorStatePanelLayoutDemoComponent {}
