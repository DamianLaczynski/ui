import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TreeNodeComponent, type TreeNode } from 'lui';

@Component({
  selector: 'app-tree-node-states-demo',
  standalone: true,
  imports: [TreeNodeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(14rem,1fr));gap:1rem;width:100%;max-width:52rem"
    >
      <div
        style="padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <p
          style="margin:0 0 0.75rem;font-size:0.875rem;font-weight:600;color:var(--color-neutral-foreground2-rest)"
        >
          Default
        </p>
        <ui-tree-node [node]="defaultNode" />
      </div>

      <div
        style="padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <p
          style="margin:0 0 0.75rem;font-size:0.875rem;font-weight:600;color:var(--color-neutral-foreground2-rest)"
        >
          Selected
        </p>
        <ui-tree-node [node]="selectedNode" [showSelectionIndicator]="true" />
      </div>

      <div
        style="padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <p
          style="margin:0 0 0.75rem;font-size:0.875rem;font-weight:600;color:var(--color-neutral-foreground2-rest)"
        >
          Disabled
        </p>
        <ui-tree-node [node]="disabledNode" />
      </div>
    </div>
  `,
})
export class TreeNodeStatesDemoComponent {
  protected readonly defaultNode: TreeNode = {
    id: 'default',
    label: 'Design tokens.json',
    icon: 'document',
    hasChildren: false,
  };

  protected readonly selectedNode: TreeNode = {
    id: 'selected',
    label: 'Brand assets',
    icon: 'folder',
    selected: true,
    hasChildren: true,
    expanded: true,
    children: [{ id: 'logo', label: 'Logo.svg', icon: 'image', hasChildren: false }],
  };

  protected readonly disabledNode: TreeNode = {
    id: 'disabled',
    label: 'Archived release',
    icon: 'archive',
    disabled: true,
    hasChildren: false,
  };
}
