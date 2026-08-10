import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, TabsComponent, type Tab } from 'lui';

@Component({
  selector: 'app-tabs-overflow-demo',
  standalone: true,
  imports: [ButtonComponent, TabsComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:42rem">
      <div
        style="padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <ui-tabs
          [tabs]="visibleTabs"
          [showMoreButton]="true"
          [(selectedTabId)]="selectedTabId"
          appearance="subtle"
          variant="primary"
        >
          <ui-button moreButton type="button" variant="secondary" appearance="subtle" size="small">
            More
          </ui-button>
        </ui-tabs>
      </div>

      <div
        style="padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <p
          style="margin:0 0 0.5rem;font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
        >
          Hidden destinations
        </p>
        <div style="font-size:0.875rem;line-height:1.5;color:var(--color-neutral-foreground-rest)">
          {{ hiddenLabels }}
        </div>
      </div>
    </div>
  `,
})
export class TabsOverflowDemoComponent {
  protected readonly visibleTabs: Tab[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'files', label: 'Files' },
  ];

  private readonly hiddenTabs: Tab[] = [
    { id: 'approvals', label: 'Approvals' },
    { id: 'audit', label: 'Audit log' },
    { id: 'history', label: 'History' },
  ];

  protected selectedTabId: string | number = this.visibleTabs[0].id;

  protected get hiddenLabels(): string {
    return this.hiddenTabs.map(tab => tab.label).join(', ');
  }
}
