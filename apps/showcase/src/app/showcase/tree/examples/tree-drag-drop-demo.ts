import { CommonModule } from '@angular/common';
import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, TreeComponent, type TreeNode } from 'lui';

@Component({
  selector: 'app-tree-drag-drop-demo',
  standalone: true,
  imports: [CommonModule, ButtonComponent, TreeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:52rem"
    >
      <div
        style="flex:0 0 22rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <ui-tree
          [nodes]="nodes()"
          [draggable]="true"
          [dropZone]="true"
          [showSelectionIndicator]="true"
          (nodeMoved)="onNodeMoved($event)"
        />
      </div>

      <div
        style="flex:1 1 16rem;display:flex;flex-direction:column;gap:0.75rem;padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <div>
          <p
            style="margin:0 0 0.5rem;font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
          >
            Drag and drop
          </p>
          <div style="font-size:0.875rem;line-height:1.5">
            Reorder folders, move files into groups, then reset the structure.
          </div>
        </div>

        <ui-button variant="secondary" appearance="outline" size="small" (click)="resetTree()">
          Reset tree
        </ui-button>

        <div style="font-size:0.875rem;line-height:1.5;color:var(--color-neutral-foreground-rest)">
          {{ lastAction() || 'No move yet.' }}
        </div>
      </div>
    </div>
  `,
})
export class TreeDragDropDemoComponent {
  protected readonly nodes = signal<TreeNode[]>(this.createTree());
  protected readonly lastAction = signal('');

  protected resetTree(): void {
    this.nodes.set(this.createTree());
    this.lastAction.set('Tree reset to initial state.');
  }

  protected onNodeMoved(event: { node: TreeNode; target: TreeNode; position: string }): void {
    this.lastAction.set(`Moved "${event.node.label}" ${event.position} "${event.target.label}".`);
  }

  private createTree(): TreeNode[] {
    return [
      {
        id: 'inbox',
        label: 'Inbox',
        icon: 'folder',
        hasChildren: true,
        expanded: true,
        children: [
          { id: 'brief', label: 'Brief.pdf', icon: 'document' },
          { id: 'todo', label: 'Todo.md', icon: 'document' },
        ],
      },
      {
        id: 'assets',
        label: 'Assets',
        icon: 'image',
        hasChildren: true,
        expanded: true,
        children: [{ id: 'logo', label: 'Logo.svg', icon: 'image' }],
      },
      { id: 'done', label: 'Done', icon: 'checkmark' },
    ];
  }
}
