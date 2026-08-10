import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccordionComponent, ButtonComponent } from 'lui';

@Component({
  selector: 'app-accordion-quick-actions-example',
  standalone: true,
  imports: [AccordionComponent, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:42rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="display:flex;flex-direction:column;gap:0.25rem">
        <div style="font-size:0.9375rem;font-weight:600">Deployment checklist</div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Quick actions are useful when users need header-level commands like edit, duplicate, or
          remove without opening every section first.
        </div>
      </div>

      <ui-accordion
        label="Production rollout"
        icon="rocket"
        [showQuickActions]="true"
        [quickActionsTemplate]="actions"
      >
        <div style="display:flex;flex-direction:column;gap:0.5rem">
          <p style="margin:0;color:var(--color-neutral-foreground-rest)">
            Confirm approvers, release notes, and rollback contacts before enabling the final
            rollout step.
          </p>
        </div>
      </ui-accordion>

      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)"
          >Last action</span
        >
        <strong style="font-size:0.875rem">{{ lastAction }}</strong>
      </div>

      <ng-template #actions>
        <div style="display:flex;gap:0.375rem;align-items:center">
          <ui-button
            type="button"
            variant="secondary"
            appearance="tint"
            icon="edit"
            (click)="setAction('Edited'); $event.stopPropagation()"
          />
          <ui-button
            type="button"
            variant="danger"
            appearance="tint"
            icon="delete"
            (click)="setAction('Removed'); $event.stopPropagation()"
          />
        </div>
      </ng-template>
    </div>
  `,
})
export class AccordionQuickActionsExampleComponent {
  protected lastAction = 'None';

  protected setAction(action: string): void {
    this.lastAction = action;
  }
}
