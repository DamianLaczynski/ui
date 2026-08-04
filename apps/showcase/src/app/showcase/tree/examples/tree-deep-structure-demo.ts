import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TreeComponent, type TreeNode } from 'ui';

@Component({
  selector: 'app-tree-deep-structure-demo',
  standalone: true,
  imports: [TreeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:52rem"
    >
      <div
        style="flex:0 0 22rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <ui-tree [nodes]="nodes" [showSelectionIndicator]="true" [selectOnClick]="true" />
      </div>

      <div
        style="flex:1 1 18rem;padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <p
          style="margin:0 0 0.5rem;font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
        >
          Suggested use
        </p>
        <div style="display:grid;gap:0.5rem;font-size:0.875rem;line-height:1.5">
          <div>
            Use deeper trees for repositories, operations, or content maps with real nesting.
          </div>
          <div>Keep the active branch expanded so the selected path remains readable.</div>
          <div>Avoid turning a flat list into a tree if the relationships are not meaningful.</div>
        </div>
      </div>
    </div>
  `,
})
export class TreeDeepStructureDemoComponent {
  protected readonly nodes: TreeNode[] = [
    {
      id: 'workspace',
      label: 'Workspace',
      icon: 'folder',
      hasChildren: true,
      expanded: true,
      children: [
        {
          id: 'apps',
          label: 'Apps',
          icon: 'grid',
          hasChildren: true,
          expanded: true,
          children: [
            {
              id: 'showcase',
              label: 'showcase',
              icon: 'folder',
              hasChildren: true,
              expanded: true,
              children: [
                { id: 'app', label: 'app', icon: 'folder' },
                {
                  id: 'components',
                  label: 'components',
                  icon: 'folder',
                  hasChildren: true,
                  expanded: true,
                  children: [
                    { id: 'header', label: 'showcase-doc-header.ts', icon: 'document' },
                    { id: 'page', label: 'showcase-doc-page.ts', icon: 'document', selected: true },
                  ],
                },
              ],
            },
            { id: 'landing', label: 'landing', icon: 'folder' },
          ],
        },
        {
          id: 'packages',
          label: 'Packages',
          icon: 'box',
          hasChildren: true,
          children: [{ id: 'ui', label: 'ui', icon: 'folder' }],
        },
      ],
    },
  ];
}
