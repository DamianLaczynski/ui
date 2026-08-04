import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavComponent, type NavNode } from 'ui';

@Component({
  selector: 'app-nav-deep-tree-demo',
  standalone: true,
  imports: [NavComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="width:100%;max-width:19rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <ui-nav [items]="items" [showSelectionIndicator]="true" indicatorPosition="vertical" />
    </div>
  `,
})
export class NavDeepTreeDemoComponent {
  protected readonly items: NavNode[] = [
    {
      id: 'workspace',
      label: 'Workspace',
      icon: 'building_bank_toolbox',
      hasChildren: true,
      expanded: true,
      children: [
        {
          id: 'projects',
          label: 'Projects',
          icon: 'folder',
          hasChildren: true,
          expanded: true,
          children: [
            {
              id: 'alpha',
              label: 'Project Alpha',
              icon: 'document',
              hasChildren: true,
              expanded: true,
              children: [
                { id: 'overview', label: 'Overview', selected: true },
                { id: 'tasks', label: 'Tasks' },
                { id: 'releases', label: 'Releases' },
              ],
            },
            {
              id: 'beta',
              label: 'Project Beta',
              icon: 'document',
              hasChildren: true,
              children: [
                { id: 'overview-beta', label: 'Overview' },
                { id: 'files-beta', label: 'Files' },
              ],
            },
          ],
        },
        {
          id: 'operations',
          label: 'Operations',
          icon: 'settings',
          hasChildren: true,
          children: [
            { id: 'incidents', label: 'Incidents' },
            { id: 'runbooks', label: 'Runbooks' },
          ],
        },
      ],
    },
  ];
}
