import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, NodeComponent, type Node } from 'lui';

@Component({
  selector: 'app-node-drag-drop-demo',
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
          Status: <strong>{{ status() }}</strong>
        </span>
      </div>

      <div
        style="display:flex;flex-direction:column;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <ui-node
          [node]="sourceNode"
          appearance="outline"
          [draggable]="true"
          (dragStart)="status.set('Dragging ' + $event.node.label)"
          (dragEnd)="status.set('Drag ended')"
        />

        <ui-node
          [node]="targetNode"
          appearance="subtle"
          variant="secondary"
          [dropZone]="true"
          (dragOver)="status.set('Drop inside ' + $event.node.label)"
          (drop)="status.set('Dropped inside ' + $event.node.label)"
        />
      </div>
    </div>
  `,
})
export class NodeDragDropDemoComponent {
  protected readonly status = signal('Drag the source row into the target row');

  protected readonly sourceNode: Node = {
    id: 'source',
    label: 'Release tasks',
    icon: 're_order_dots_vertical',
  };

  protected readonly targetNode: Node = {
    id: 'target',
    label: 'Sprint planning board',
    icon: 'board',
  };

  protected reset(): void {
    this.status.set('Drag the source row into the target row');
  }
}
