import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavComponent, type NavNode } from 'ui';

@Component({
  selector: 'app-nav-sections-demo',
  standalone: true,
  imports: [NavComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="width:100%;max-width:19rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <ui-nav [items]="items" />
    </div>
  `,
})
export class NavSectionsDemoComponent {
  protected readonly items: NavNode[] = [
    { id: 'main-header', label: 'Main', isSectionHeader: true },
    { id: 'home', label: 'Home', icon: 'home', selected: true },
    { id: 'search', label: 'Search', icon: 'search' },
    { id: 'divider-1', label: 'divider', isDivider: true },
    { id: 'work-header', label: 'Workspaces', isSectionHeader: true },
    {
      id: 'design-system',
      label: 'Design system',
      icon: 'color',
      hasChildren: true,
      expanded: true,
      children: [
        { id: 'components', label: 'Components' },
        { id: 'guidelines', label: 'Guidelines' },
      ],
    },
    {
      id: 'platform',
      label: 'Platform',
      icon: 'apps',
      hasChildren: true,
      children: [
        { id: 'deployments', label: 'Deployments' },
        { id: 'feature-flags', label: 'Feature flags' },
      ],
    },
    { id: 'divider-2', label: 'divider', isDivider: true },
    { id: 'admin-header', label: 'Administration', isSectionHeader: true },
    { id: 'billing', label: 'Billing', icon: 'wallet' },
    { id: 'security', label: 'Security', icon: 'shield', disabled: true },
  ];
}
