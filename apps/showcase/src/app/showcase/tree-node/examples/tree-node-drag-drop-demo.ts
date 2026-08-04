import { CommonModule } from '@angular/common';
import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, TreeNodeComponent, type TreeNode } from 'ui';

@Component({
  selector: 'app-tree-node-drag-drop-demo',
  standalone: true,
  imports: [CommonModule, ButtonComponent, TreeNodeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:54rem"
    >
      <div
        style="flex:0 0 24rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <ui-tree-node
          [node]="node()"
          [draggable]="true"
          [dropZone]="true"
          (drop)="onDrop($event)"
        />
      </div>

      <div
        style="flex:1 1 18rem;display:flex;flex-direction:column;gap:0.75rem;padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <div style="font-size:0.875rem;line-height:1.5">
          Reorder child items inside one branch to preview drop zones on <code>ui-tree-node</code>.
        </div>

        <ui-button variant="secondary" appearance="outline" size="small" (click)="resetNode()">
          Reset branch
        </ui-button>

        <div style="font-size:0.875rem;line-height:1.5;color:var(--color-neutral-foreground-rest)">
          {{ lastAction() || 'No move yet.' }}
        </div>
      </div>
    </div>
  `,
})
export class TreeNodeDragDropDemoComponent {
  protected readonly node = signal<TreeNode>(this.createNode());
  protected readonly lastAction = signal('');

  protected onDrop(event: { node: TreeNode; position: 'before' | 'after' | 'inside' }): void {
    this.lastAction.set(`Drop target: "${event.node.label}" (${event.position}).`);
  }

  protected resetNode(): void {
    this.node.set(this.createNode());
    this.lastAction.set('Branch reset to initial state.');
  }

  private createNode(): TreeNode {
    return {
      id: 'drop-root',
      label: 'Assets',
      icon: 'folder',
      hasChildren: true,
      expanded: true,
      children: [
        { id: 'cover', label: 'Cover.png', icon: 'image', hasChildren: false },
        { id: 'icons', label: 'Icons.svg', icon: 'image', hasChildren: false },
        { id: 'copy', label: 'Copy.txt', icon: 'document', hasChildren: false },
      ],
    };
  }
}
