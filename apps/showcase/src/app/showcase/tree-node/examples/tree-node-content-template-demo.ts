import { CommonModule } from '@angular/common';
import { Component, TemplateRef, viewChild, ChangeDetectionStrategy } from '@angular/core';
import { BadgeComponent, TreeNodeComponent, type TreeNode } from 'ui';

interface FileTreeNode extends TreeNode<FileTreeNode> {
  data?: {
    meta: string;
    status?: string;
  };
}

@Component({
  selector: 'app-tree-node-content-template-demo',
  standalone: true,
  imports: [CommonModule, BadgeComponent, TreeNodeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="width:100%;max-width:28rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <ui-tree-node [node]="node" [contentTemplate]="contentTemplateRef() ?? null">
        <ng-template #content let-node>
          <div
            style="display:flex;align-items:center;justify-content:space-between;gap:0.75rem;width:100%;min-width:0"
          >
            <div style="min-width:0;display:flex;flex-direction:column;gap:0.125rem">
              <span
                style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:600"
              >
                {{ node.label }}
              </span>
              <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">
                {{ node.data?.meta }}
              </span>
            </div>
            @if (node.data?.status) {
              <ui-badge
                [text]="node.data.status"
                size="small"
                appearance="subtle"
                variant="secondary"
                shape="rounded"
              />
            }
          </div>
        </ng-template>
      </ui-tree-node>
    </div>
  `,
})
export class TreeNodeContentTemplateDemoComponent {
  protected readonly node: FileTreeNode = {
    id: 'content-template',
    label: 'Release notes',
    icon: 'document',
    hasChildren: true,
    expanded: true,
    data: {
      meta: 'Updated 2 hours ago',
      status: 'Synced',
    },
    children: [
      {
        id: 'content-template-child',
        label: 'Draft.md',
        icon: 'document',
        hasChildren: false,
        data: {
          meta: '3 collaborators',
          status: 'Draft',
        },
      },
    ],
  };

  protected contentTemplateRef = viewChild<TemplateRef<any>>('content');
}
