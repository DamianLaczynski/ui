import { CommonModule } from '@angular/common';
import { Component, TemplateRef, signal, viewChild, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, NavComponent, type NavNode } from 'ui';

@Component({
  selector: 'app-nav-quick-actions-demo',
  standalone: true,
  imports: [CommonModule, ButtonComponent, NavComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:46rem"
    >
      <div
        style="flex:0 0 19rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <ui-nav
          [items]="items"
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

    <ng-template #navQuickActionsTemplate let-node>
      <div style="display:flex;gap:0.375rem">
        <ui-button
          appearance="tint"
          variant="secondary"
          icon="pin"
          (click)="onQuickAction('Pin', node); $event.stopPropagation()"
        />
        <ui-button
          appearance="tint"
          variant="danger"
          icon="delete"
          (click)="onQuickAction('Remove', node); $event.stopPropagation()"
        />
      </div>
    </ng-template>
  `,
})
export class NavQuickActionsDemoComponent {
  protected readonly items: NavNode[] = [
    { id: 'backlog', label: 'Backlog', icon: 'list' },
    { id: 'active-sprint', label: 'Active sprint', icon: 'rocket', selected: true },
    { id: 'review-queue', label: 'Review queue', icon: 'edit' },
  ];

  protected readonly lastAction = signal('');
  protected quickActionsTemplateRef = viewChild<TemplateRef<any>>('navQuickActionsTemplate');

  protected onQuickAction(action: string, node: NavNode): void {
    this.lastAction.set(`${action} on "${node.label}"`);
  }
}
