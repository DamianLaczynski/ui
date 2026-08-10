import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TreeComponent, type TreeNode } from 'lui';

@Component({
  selector: 'app-tree-interaction-demo',
  standalone: true,
  imports: [TreeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:48rem"
    >
      <div
        style="flex:1 1 18rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <p
          style="margin:0 0 0.75rem;font-size:0.875rem;font-weight:600;color:var(--color-neutral-foreground2-rest)"
        >
          File browser style
        </p>
        <ui-tree
          [nodes]="browserNodes"
          [showSelectionIndicator]="true"
          indicatorPosition="vertical"
          chevronPosition="before"
        />
      </div>

      <div
        style="flex:1 1 18rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <p
          style="margin:0 0 0.75rem;font-size:0.875rem;font-weight:600;color:var(--color-neutral-foreground2-rest)"
        >
          Select on click navigation
        </p>
        <ui-tree
          [nodes]="navigationNodes"
          [showSelectionIndicator]="true"
          indicatorPosition="horizontal"
          chevronPosition="after"
          [asButton]="true"
          [selectOnClick]="true"
          [expandOnClick]="true"
          variant="secondary"
        />
      </div>
    </div>
  `,
})
export class TreeInteractionDemoComponent {
  protected readonly browserNodes: TreeNode[] = [
    {
      id: 'src',
      label: 'src',
      icon: 'folder',
      hasChildren: true,
      expanded: true,
      children: [
        { id: 'app', label: 'app', icon: 'folder' },
        { id: 'styles', label: 'styles.scss', icon: 'document', selected: true },
      ],
    },
    { id: 'package', label: 'package.json', icon: 'document' },
  ];

  protected readonly navigationNodes: TreeNode[] = [
    {
      id: 'workspace',
      label: 'Workspace',
      icon: 'folder',
      hasChildren: true,
      expanded: true,
      children: [
        { id: 'overview', label: 'Overview', icon: 'home' },
        { id: 'activity', label: 'Activity', icon: 'pulse', selected: true },
      ],
    },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];
}
