import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TagComponent } from 'ui';

@Component({
  selector: 'app-tag-selectable-filters-demo',
  standalone: true,
  imports: [TagComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:44rem">
      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:flex-start;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <ui-tag
          text="Assigned to me"
          appearance="tint"
          variant="primary"
          [selectable]="true"
          [(selected)]="assignedToMe"
        />
        <ui-tag
          text="Open"
          appearance="tint"
          variant="success"
          [selectable]="true"
          [(selected)]="openOnly"
        />
        <ui-tag
          text="Blocked"
          appearance="tint"
          variant="danger"
          [selectable]="true"
          [(selected)]="blockedOnly"
        />
        <ui-tag
          text="Needs review"
          appearance="tint"
          variant="warning"
          [selectable]="true"
          [(selected)]="needsReview"
        />
      </div>

      <div
        style="padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <p
          style="margin:0 0 0.5rem;font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
        >
          Active filters
        </p>
        <div style="font-size:0.875rem;line-height:1.5;color:var(--color-neutral-foreground-rest)">
          {{ activeFilters }}
        </div>
      </div>
    </div>
  `,
})
export class TagSelectableFiltersDemoComponent {
  protected assignedToMe = true;
  protected openOnly = false;
  protected blockedOnly = false;
  protected needsReview = true;

  protected get activeFilters(): string {
    const filters = [
      this.assignedToMe ? 'Assigned to me' : null,
      this.openOnly ? 'Open' : null,
      this.blockedOnly ? 'Blocked' : null,
      this.needsReview ? 'Needs review' : null,
    ].filter((value): value is string => !!value);

    return filters.length ? filters.join(', ') : 'No filters selected.';
  }
}
