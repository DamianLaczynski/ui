import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TreeNodeComponent, type TreeNode } from 'lui';

@Component({
  selector: 'app-tree-node-behavior-demo',
  standalone: true,
  imports: [TreeNodeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:50rem"
    >
      <div
        style="flex:1 1 18rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <p
          style="margin:0 0 0.75rem;font-size:0.875rem;font-weight:600;color:var(--color-neutral-foreground2-rest)"
        >
          Browser style
        </p>
        <ui-tree-node
          [node]="browserNode"
          chevronPosition="before"
          [showSelectionIndicator]="true"
          indicatorPosition="vertical"
        />
      </div>

      <div
        style="flex:1 1 18rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <p
          style="margin:0 0 0.75rem;font-size:0.875rem;font-weight:600;color:var(--color-neutral-foreground2-rest)"
        >
          Button-like interaction
        </p>
        <ui-tree-node
          [node]="actionNode"
          chevronPosition="after"
          [showSelectionIndicator]="true"
          indicatorPosition="horizontal"
          [asButton]="true"
          [expandOnClick]="true"
          [selectOnClick]="true"
          variant="secondary"
        />
      </div>
    </div>
  `,
})
export class TreeNodeBehaviorDemoComponent {
  protected readonly browserNode: TreeNode = {
    id: 'browser',
    label: 'src',
    icon: 'folder',
    selected: true,
    hasChildren: true,
    expanded: true,
    children: [
      { id: 'app', label: 'app', icon: 'folder', hasChildren: false },
      { id: 'styles', label: 'styles.scss', icon: 'document', hasChildren: false },
    ],
  };

  protected readonly actionNode: TreeNode = {
    id: 'action',
    label: 'Workspace',
    icon: 'folder',
    selected: true,
    hasChildren: true,
    expanded: true,
    children: [
      { id: 'overview', label: 'Overview', icon: 'home', hasChildren: false },
      { id: 'activity', label: 'Activity', icon: 'pulse', hasChildren: false },
    ],
  };
}
