import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, NodeComponent, type Node } from 'lui';

@Component({
  selector: 'app-node-selection-behavior-demo',
  standalone: true,
  imports: [ButtonComponent, NodeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:40rem">
      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <ui-button variant="secondary" appearance="outline" (click)="reset()">Reset</ui-button>
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Selected: <strong>{{ selectedLabel() || 'none' }}</strong>
        </span>
      </div>

      <div
        style="display:flex;flex-direction:column;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <ui-node
          [node]="inboxNode()"
          variant="primary"
          appearance="subtle"
          [showSelectionIndicator]="true"
          indicatorPosition="horizontal"
          [selectOnClick]="true"
          (nodeSelect)="select($event)"
        />
        <ui-node
          [node]="mentionsNode()"
          variant="secondary"
          appearance="filled"
          [showSelectionIndicator]="true"
          indicatorPosition="vertical"
          [asButton]="true"
          [selectOnClick]="true"
          (nodeSelect)="select($event)"
        />
        <ui-node
          [node]="archiveNode()"
          variant="secondary"
          appearance="outline"
          [selectOnClick]="false"
          [asButton]="true"
          (nodeClick)="clickOnly($event)"
        />
      </div>
    </div>
  `,
})
export class NodeSelectionBehaviorDemoComponent {
  protected readonly selectedId = signal<string | null>(null);
  protected readonly selectedLabel = signal('');

  protected readonly inboxNode = signal<Node>(this.buildNode('inbox', 'Inbox', 'mail'));
  protected readonly mentionsNode = signal<Node>(
    this.buildNode('mentions', 'Mentions', 'person_accounts'),
  );
  protected readonly archiveNode = signal<Node>(
    this.buildNode('archive', 'Archive only click action', 'archive'),
  );

  protected select(node: Node): void {
    this.selectedId.set(String(node.id));
    this.selectedLabel.set(node.label);
    this.syncNodes();
  }

  protected clickOnly(node: Node): void {
    this.selectedLabel.set(`${node.label} clicked`);
  }

  protected reset(): void {
    this.selectedId.set(null);
    this.selectedLabel.set('');
    this.syncNodes();
  }

  private syncNodes(): void {
    this.inboxNode.set(this.buildNode('inbox', 'Inbox', 'mail', this.selectedId() === 'inbox'));
    this.mentionsNode.set(
      this.buildNode('mentions', 'Mentions', 'person_accounts', this.selectedId() === 'mentions'),
    );
    this.archiveNode.set(
      this.buildNode(
        'archive',
        'Archive only click action',
        'archive',
        this.selectedId() === 'archive',
      ),
    );
  }

  private buildNode(id: string, label: string, icon: Node['icon'], selected = false): Node {
    return { id, label, icon, selected };
  }
}
