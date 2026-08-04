import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TabsComponent, type Tab } from 'ui';

type BasicTab = Tab & {
  description: string;
};

@Component({
  selector: 'app-tabs-basic-demo',
  standalone: true,
  imports: [TabsComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:40rem">
      <ui-tabs
        [tabs]="tabs"
        [(selectedTabId)]="selectedTabId"
        appearance="subtle"
        variant="primary"
      />

      <div
        style="padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="font-size:0.9375rem;font-weight:600">{{ selectedTab.label }}</div>
        <div
          style="margin-top:0.375rem;font-size:0.875rem;line-height:1.5;color:var(--color-neutral-foreground2-rest)"
        >
          {{ selectedTab.description }}
        </div>
      </div>
    </div>
  `,
})
export class TabsBasicDemoComponent {
  protected readonly tabs: BasicTab[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'book',
      description:
        'Use tabs to switch between closely related views without leaving the current surface.',
    },
    {
      id: 'activity',
      label: 'Activity',
      icon: 'history',
      description:
        'The active tab can drive the content below while staying a lightweight local navigation pattern.',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'settings',
      description:
        'This is a good fit for panels, drawers, dashboards, and detail views with a few sibling sections.',
    },
  ];

  protected selectedTabId: string | number = this.tabs[0].id;

  protected get selectedTab(): BasicTab {
    return this.tabs.find(tab => tab.id === this.selectedTabId) ?? this.tabs[0];
  }
}
