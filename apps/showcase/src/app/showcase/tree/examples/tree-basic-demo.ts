import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TreeComponent, type TreeNode } from 'lui';

@Component({
  selector: 'app-tree-basic-demo',
  standalone: true,
  imports: [TreeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="width:100%;max-width:22rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <ui-tree [nodes]="nodes" [showSelectionIndicator]="true" />
    </div>
  `,
})
export class TreeBasicDemoComponent {
  protected readonly nodes: TreeNode[] = [
    {
      id: 'docs',
      label: 'Documents',
      icon: 'folder',
      hasChildren: true,
      expanded: true,
      children: [
        { id: 'brief', label: 'Project brief.docx', icon: 'document' },
        { id: 'notes', label: 'Meeting notes.md', icon: 'document', selected: true },
      ],
    },
    {
      id: 'assets',
      label: 'Assets',
      icon: 'image',
      hasChildren: true,
      children: [{ id: 'hero', label: 'Hero banner.png', icon: 'image' }],
    },
    { id: 'archive', label: 'Archive', icon: 'archive' },
  ];
}
