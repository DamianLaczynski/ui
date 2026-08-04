import { CommonModule } from '@angular/common';
import { Component, TemplateRef, viewChild, ChangeDetectionStrategy } from '@angular/core';
import { NavComponent, type NavNode } from 'ui';

@Component({
  selector: 'app-nav-content-template-demo',
  standalone: true,
  imports: [CommonModule, NavComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="width:100%;max-width:19rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <ui-nav [items]="items" [contentTemplate]="contentTemplateRef() ?? null" />
    </div>

    <ng-template #navContentTemplate let-node>
      <div
        style="display:flex;align-items:center;justify-content:space-between;gap:0.5rem;width:100%"
      >
        <span>{{ node.label }}</span>
        <span
          style="min-width:1.5rem;padding:0.125rem 0.45rem;border-radius:999px;background:var(--color-neutral-background3-rest);font-size:0.75rem;text-align:center"
        >
          {{ getCount(node.id) }}
        </span>
      </div>
    </ng-template>
  `,
})
export class NavContentTemplateDemoComponent {
  protected readonly items: NavNode[] = [
    { id: 'inbox', label: 'Inbox', icon: 'mail', selected: true },
    { id: 'mentions', label: 'Mentions', icon: 'person_accounts' },
    { id: 'drafts', label: 'Drafts', icon: 'document' },
    { id: 'archive', label: 'Archive', icon: 'archive' },
  ];

  protected contentTemplateRef = viewChild<TemplateRef<any>>('navContentTemplate');

  protected getCount(id: string): number {
    const counts: Record<string, number> = {
      inbox: 12,
      mentions: 4,
      drafts: 2,
      archive: 31,
    };
    return counts[id] ?? 0;
  }
}
