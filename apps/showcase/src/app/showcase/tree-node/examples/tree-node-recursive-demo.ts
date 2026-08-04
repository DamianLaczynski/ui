import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TreeNodeComponent, type TreeNode } from 'ui';

@Component({
  selector: 'app-tree-node-recursive-demo',
  standalone: true,
  imports: [TreeNodeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:54rem"
    >
      <div
        style="flex:0 0 24rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <ui-tree-node [node]="node" [showSelectionIndicator]="true" [expandOnClick]="true" />
      </div>

      <div
        style="flex:1 1 18rem;padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <p
          style="margin:0 0 0.5rem;font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
        >
          Recursive use
        </p>
        <div style="display:grid;gap:0.5rem;font-size:0.875rem;line-height:1.5">
          <div><code>ui-tree-node</code> can render nested children on its own.</div>
          <div>
            Use it directly when you need a single expandable branch, not a full tree container.
          </div>
          <div>For full collections of roots, prefer <code>ui-tree</code>.</div>
        </div>
      </div>
    </div>
  `,
})
export class TreeNodeRecursiveDemoComponent {
  protected readonly node: TreeNode = {
    id: 'root',
    label: 'Workspace',
    icon: 'folder',
    hasChildren: true,
    expanded: true,
    children: [
      {
        id: 'project-a',
        label: 'Project A',
        icon: 'folder',
        hasChildren: true,
        expanded: true,
        children: [
          { id: 'brief', label: 'Brief.docx', icon: 'document', hasChildren: false },
          { id: 'board', label: 'Board.url', icon: 'link', hasChildren: false, selected: true },
        ],
      },
      {
        id: 'project-b',
        label: 'Project B',
        icon: 'folder',
        hasChildren: true,
        children: [{ id: 'notes', label: 'Notes.md', icon: 'document', hasChildren: false }],
      },
    ],
  };
}
