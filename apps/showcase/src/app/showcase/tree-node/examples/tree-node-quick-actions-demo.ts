import { CommonModule } from '@angular/common';
import { Component, TemplateRef, signal, viewChild, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, TreeNodeComponent, type TreeNode } from 'ui';

@Component({
  selector: 'app-tree-node-quick-actions-demo',
  standalone: true,
  imports: [CommonModule, ButtonComponent, TreeNodeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:52rem"
    >
      <div
        style="flex:0 0 24rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <ui-tree-node
          [node]="node"
          [showQuickActions]="true"
          [quickActionsTemplate]="quickActionsTemplateRef() ?? null"
        />
      </div>

      <div
        style="flex:1 1 16rem;padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <p
          style="margin:0 0 0.5rem;font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
        >
          Last action
        </p>
        <div style="font-size:0.875rem;line-height:1.5;color:var(--color-neutral-foreground-rest)">
          {{ lastAction() || 'No quick action used yet.' }}
        </div>
      </div>
    </div>

    <ng-template #quickActions let-node>
      <div style="display:flex;gap:0.375rem">
        <ui-button
          appearance="tint"
          variant="secondary"
          icon="edit"
          (click)="onQuickAction('Rename', node); $event.stopPropagation()"
        />
        <ui-button
          appearance="tint"
          variant="danger"
          icon="delete"
          (click)="onQuickAction('Archive', node); $event.stopPropagation()"
        />
      </div>
    </ng-template>
  `,
})
export class TreeNodeQuickActionsDemoComponent {
  protected readonly node: TreeNode = {
    id: 'quick-actions',
    label: 'Q2 planning',
    icon: 'folder',
    hasChildren: true,
    expanded: true,
    children: [
      { id: 'timeline', label: 'Timeline.xlsx', icon: 'document', hasChildren: false },
      { id: 'risks', label: 'Risks.md', icon: 'document', hasChildren: false },
    ],
  };

  protected readonly lastAction = signal('');
  protected quickActionsTemplateRef = viewChild<TemplateRef<any>>('quickActions');

  protected onQuickAction(action: string, node: TreeNode): void {
    this.lastAction.set(`${action} on "${node.label}"`);
  }
}
