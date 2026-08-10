import { CommonModule } from '@angular/common';
import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, TreeComponent, type TreeNode } from 'lui';

@Component({
  selector: 'app-tree-quick-actions-demo',
  standalone: true,
  imports: [CommonModule, ButtonComponent, TreeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:50rem"
    >
      <div
        style="flex:0 0 22rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <ui-tree [nodes]="nodes" [showQuickActions]="true">
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
        </ui-tree>
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
  `,
})
export class TreeQuickActionsDemoComponent {
  protected readonly nodes: TreeNode[] = [
    {
      id: 'design',
      label: 'Design',
      icon: 'folder',
      hasChildren: true,
      expanded: true,
      children: [
        { id: 'mocks', label: 'Mockups.fig', icon: 'document' },
        { id: 'tokens', label: 'Tokens.json', icon: 'document' },
      ],
    },
    { id: 'handoff', label: 'Handoff notes', icon: 'document' },
  ];

  protected readonly lastAction = signal('');

  protected onQuickAction(action: string, node: TreeNode): void {
    this.lastAction.set(`${action} on "${node.label}"`);
  }
}
