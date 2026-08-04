import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TreeComponent, type TreeNode } from 'ui';

@Component({
  selector: 'app-tree-content-template-demo',
  standalone: true,
  imports: [CommonModule, TreeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="width:100%;max-width:24rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <ui-tree [nodes]="nodes">
        <ng-template #content let-node>
          <div
            style="display:flex;align-items:center;justify-content:space-between;gap:0.75rem;width:100%;min-width:0"
          >
            <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">{{
              node.label
            }}</span>
            <span
              style="flex:none;min-width:2rem;padding:0.125rem 0.45rem;border-radius:999px;background:var(--color-neutral-background3-rest);font-size:0.75rem;text-align:center;color:var(--color-neutral-foreground2-rest)"
            >
              {{ getMeta(node.id) }}
            </span>
          </div>
        </ng-template>
      </ui-tree>
    </div>
  `,
})
export class TreeContentTemplateDemoComponent {
  protected readonly nodes: TreeNode[] = [
    {
      id: 'backlog',
      label: 'Backlog',
      icon: 'list',
      hasChildren: true,
      expanded: true,
      children: [
        { id: 'triage', label: 'Triage', icon: 'document' },
        { id: 'ready', label: 'Ready for build', icon: 'rocket' },
      ],
    },
    { id: 'review', label: 'Review queue', icon: 'edit' },
    { id: 'done', label: 'Done this sprint', icon: 'checkmark' },
  ];

  protected getMeta(id: string): string {
    const values: Record<string, string> = {
      backlog: '12',
      triage: '4',
      ready: '8',
      review: '3',
      done: '24',
    };
    return values[id] ?? '';
  }
}
