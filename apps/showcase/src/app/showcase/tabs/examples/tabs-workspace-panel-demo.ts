import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TabsComponent, type Tab } from 'ui';

type WorkspaceTab = Tab & {
  headline: string;
  summary: string;
  statLabel: string;
  statValue: string;
};

@Component({
  selector: 'app-tabs-workspace-panel-demo',
  standalone: true,
  imports: [TabsComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:44rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="display:flex;flex-direction:column;gap:0.375rem">
        <div style="font-size:1rem;font-weight:600">Workspace detail panel</div>
        <div
          style="font-size:0.875rem;color:var(--color-neutral-foreground2-rest);line-height:1.45"
        >
          A realistic tabs surface uses the tablist as local navigation and swaps the panel content
          underneath it.
        </div>
      </div>

      <ui-tabs
        [tabs]="tabs"
        [(selectedTabId)]="selectedTabId"
        appearance="subtle"
        variant="primary"
      />

      <div
        style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <div style="flex:1 1 16rem;display:flex;flex-direction:column;gap:0.25rem;min-width:14rem">
          <span
            style="font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
          >
            {{ activeTab.statLabel }}
          </span>
          <strong
            style="font-size:1.125rem;font-weight:600;color:var(--color-neutral-foreground-rest)"
          >
            {{ activeTab.statValue }}
          </strong>
        </div>
        <div style="flex:2 1 20rem;min-width:16rem">
          <div style="font-size:0.9375rem;font-weight:600">{{ activeTab.headline }}</div>
          <div
            style="margin-top:0.375rem;font-size:0.875rem;line-height:1.5;color:var(--color-neutral-foreground2-rest)"
          >
            {{ activeTab.summary }}
          </div>
        </div>
      </div>
    </div>
  `,
})
export class TabsWorkspacePanelDemoComponent {
  protected readonly tabs: WorkspaceTab[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'book',
      headline: 'Workspace health snapshot',
      summary:
        'Use a short overview tab for current status, owners, and top-level signals before the user dives into lower-level sections.',
      statLabel: 'Active projects',
      statValue: '12',
    },
    {
      id: 'members',
      label: 'Members',
      icon: 'people',
      headline: 'Members and roles',
      summary:
        'Tabs help separate role management and access details from the main summary without moving the user to a different route.',
      statLabel: 'Contributors',
      statValue: '38',
    },
    {
      id: 'automation',
      label: 'Automation',
      icon: 'design_ideas',
      headline: 'Workflow automation',
      summary:
        'Automation settings, rules, and notifications often belong in neighboring tabs because they are related but not needed all at once.',
      statLabel: 'Active rules',
      statValue: '7',
    },
  ];

  protected selectedTabId: string | number = this.tabs[0].id;

  protected get activeTab(): WorkspaceTab {
    return this.tabs.find(tab => tab.id === this.selectedTabId) ?? this.tabs[0];
  }
}
