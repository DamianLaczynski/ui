import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TreeNodeComponent, type TreeNode } from 'ui';

@Component({
  selector: 'app-tree-node-basic-demo',
  standalone: true,
  imports: [TreeNodeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:46rem"
    >
      <div
        style="flex:1 1 18rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <p
          style="margin:0 0 0.75rem;font-size:0.875rem;font-weight:600;color:var(--color-neutral-foreground2-rest)"
        >
          Leaf row
        </p>
        <ui-tree-node [node]="leafNode" />
      </div>

      <div
        style="flex:1 1 18rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <p
          style="margin:0 0 0.75rem;font-size:0.875rem;font-weight:600;color:var(--color-neutral-foreground2-rest)"
        >
          Parent row
        </p>
        <ui-tree-node [node]="parentNode" />
      </div>
    </div>
  `,
})
export class TreeNodeBasicDemoComponent {
  protected readonly leafNode: TreeNode = {
    id: 'leaf',
    label: 'Readme.md',
    icon: 'document',
    hasChildren: false,
  };

  protected readonly parentNode: TreeNode = {
    id: 'parent',
    label: 'Project files',
    icon: 'folder',
    hasChildren: true,
    expanded: true,
    children: [
      { id: 'brief', label: 'Brief.docx', icon: 'document', hasChildren: false },
      { id: 'notes', label: 'Notes.md', icon: 'document', hasChildren: false },
    ],
  };
}
