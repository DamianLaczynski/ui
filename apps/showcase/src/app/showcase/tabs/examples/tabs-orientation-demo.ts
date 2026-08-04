import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TabsComponent, type Tab } from 'ui';

type VerticalTab = Tab & {
  title: string;
  body: string;
};

@Component({
  selector: 'app-tabs-orientation-demo',
  standalone: true,
  imports: [TabsComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:minmax(12rem,14rem) minmax(0,1fr);gap:1rem;align-items:start;width:100%;max-width:48rem"
    >
      <div
        style="padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <ui-tabs
          [tabs]="tabs"
          [(selectedTabId)]="selectedTabId"
          orientation="vertical"
          appearance="transparent"
          variant="primary"
        />
      </div>

      <div
        style="padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest);min-width:0"
      >
        <div style="font-size:0.9375rem;font-weight:600">{{ selectedTab.title }}</div>
        <div
          style="margin-top:0.375rem;font-size:0.875rem;line-height:1.5;color:var(--color-neutral-foreground2-rest)"
        >
          {{ selectedTab.body }}
        </div>
      </div>
    </div>
  `,
})
export class TabsOrientationDemoComponent {
  protected readonly tabs: VerticalTab[] = [
    {
      id: 'general',
      label: 'General',
      title: 'General workspace settings',
      body: 'Vertical tabs work well when labels are longer or when the content area beside them is the main focus.',
    },
    {
      id: 'access',
      label: 'Access and roles',
      title: 'Access and roles',
      body: 'This pattern fits settings pages, onboarding surfaces, and detail panels with a few sibling groups.',
    },
    {
      id: 'retention',
      label: 'Retention policy',
      title: 'Retention policy',
      body: 'The tablist stays local to the panel, so users can move between related sections without a route change.',
    },
  ];

  protected selectedTabId: string | number = this.tabs[0].id;

  protected get selectedTab(): VerticalTab {
    return this.tabs.find(tab => tab.id === this.selectedTabId) ?? this.tabs[0];
  }
}
