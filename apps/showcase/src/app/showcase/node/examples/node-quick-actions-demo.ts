import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, MenuComponent, NodeComponent, type MenuItem, type Node } from 'ui';

@Component({
  selector: 'app-node-quick-actions-demo',
  standalone: true,
  imports: [ButtonComponent, MenuComponent, NodeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:42rem">
      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <ui-button variant="secondary" appearance="outline" (click)="reset()">Reset</ui-button>
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Last action: <strong>{{ lastAction() || 'none' }}</strong>
        </span>
      </div>

      <div
        style="display:flex;flex-direction:column;gap:0.5rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        @for (node of nodes; track node.id) {
          <ui-node
            [node]="node"
            appearance="subtle"
            variant="secondary"
            [showQuickActions]="true"
            [quickActionsTemplate]="actionsMenu"
            (nodeClick)="lastAction.set(node.label)"
          />
        }
      </div>

      <ng-template #actionsMenu let-node>
        <ui-menu
          triggerVariant="dropdown"
          appearance="tint"
          [menuItems]="menuItems"
          [ariaLabel]="'Node actions'"
          (menuItemClick)="onMenuAction($event, node)"
        />
      </ng-template>
    </div>
  `,
})
export class NodeQuickActionsDemoComponent {
  protected readonly lastAction = signal('');

  protected readonly nodes: Node[] = [
    { id: 'brief', label: 'Creative brief', icon: 'document_text' },
    { id: 'assets', label: 'Campaign assets', icon: 'folder' },
    { id: 'launch', label: 'Launch checklist', icon: 'clipboard_task' },
  ];

  protected readonly menuItems: MenuItem[] = [
    { id: 'open', label: 'Open', icon: 'open' },
    { id: 'rename', label: 'Rename', icon: 'rename' },
    { id: 'archive', label: 'Archive', icon: 'archive' },
    { id: 'delete', label: 'Delete', icon: 'delete', variant: 'danger' },
  ];

  protected onMenuAction(item: MenuItem, node: Node): void {
    this.lastAction.set(`${item.label} on ${node.label}`);
  }

  protected reset(): void {
    this.lastAction.set('');
  }
}
