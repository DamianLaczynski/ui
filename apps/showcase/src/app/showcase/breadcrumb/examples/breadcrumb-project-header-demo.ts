import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BreadcrumbComponent, ButtonComponent, type Breadcrumb } from 'lui';

@Component({
  selector: 'app-breadcrumb-project-header-example',
  standalone: true,
  imports: [BreadcrumbComponent, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:44rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <ui-breadcrumb
        [items]="items"
        appearance="subtle"
        [showIcons]="true"
        [showSelectionIndicator]="true"
        [responsiveOverflow]="false"
      />

      <div
        style="display:flex;justify-content:space-between;gap:1rem;align-items:flex-start;flex-wrap:wrap"
      >
        <div style="display:flex;flex-direction:column;gap:0.35rem;min-width:16rem">
          <div style="font-size:1rem;font-weight:600">Migration plan review</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Final content pass before the May release freeze. 3 approvals still pending.
          </div>
        </div>

        <div style="display:flex;gap:0.5rem;flex-wrap:wrap">
          <ui-button type="button" variant="secondary" appearance="outline">Share</ui-button>
          <ui-button type="button" variant="primary">Open board</ui-button>
        </div>
      </div>
    </div>
  `,
})
export class BreadcrumbProjectHeaderExampleComponent {
  protected readonly items: Breadcrumb[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'programs', label: 'Programs', icon: 'briefcase' },
    { id: 'migration', label: 'Migration', icon: 'arrow_swap' },
    { id: 'review', label: 'Review', icon: 'clipboard_task', selected: true },
  ];
}
