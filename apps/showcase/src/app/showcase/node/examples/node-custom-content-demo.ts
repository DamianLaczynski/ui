import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BadgeComponent, NodeComponent, type Node } from 'ui';

@Component({
  selector: 'app-node-custom-content-demo',
  standalone: true,
  imports: [BadgeComponent, NodeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:0.75rem;width:100%;max-width:42rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <ui-node [node]="syncNode" appearance="subtle">
        <ng-template #content let-node>
          <div
            style="display:flex;align-items:center;justify-content:space-between;gap:0.75rem;width:100%;min-width:0"
          >
            <div style="display:flex;flex-direction:column;gap:0.1875rem;min-width:0">
              <div
                style="font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"
              >
                {{ node.label }}
              </div>
              <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
                Updated 2 minutes ago
              </div>
            </div>
            <ui-badge text="Synced" variant="success" appearance="subtle" size="small" />
          </div>
        </ng-template>
      </ui-node>

      <ui-node [node]="reviewNode" appearance="filled" variant="warning">
        <ng-template #content let-node>
          <div
            style="display:flex;align-items:center;justify-content:space-between;gap:0.75rem;width:100%;min-width:0"
          >
            <div style="display:flex;flex-direction:column;gap:0.1875rem;min-width:0">
              <div
                style="font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"
              >
                {{ node.label }}
              </div>
              <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
                3 unresolved comments
              </div>
            </div>
            <ui-badge text="Needs review" variant="warning" appearance="filled" size="small" />
          </div>
        </ng-template>
      </ui-node>
    </div>
  `,
})
export class NodeCustomContentDemoComponent {
  protected readonly syncNode: Node = {
    id: 'sync',
    label: 'Homepage.fig',
    icon: 'document',
  };

  protected readonly reviewNode: Node = {
    id: 'review',
    label: 'Q2 launch copy',
    icon: 'document_text',
  };
}
