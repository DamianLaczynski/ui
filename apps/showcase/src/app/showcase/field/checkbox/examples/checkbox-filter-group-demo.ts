import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from 'lui';

@Component({
  selector: 'app-checkbox-filter-group-example',
  standalone: true,
  imports: [FormsModule, CheckboxComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:0.875rem;width:100%;max-width:26rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="display:flex;flex-direction:column;gap:0.25rem">
        <div style="font-size:0.9375rem;font-weight:600">Issue filters</div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Narrow backlog results without leaving the current view.
        </div>
      </div>

      <ui-checkbox
        label="Assigned to me"
        [(ngModel)]="assignedToMe"
        [ngModelOptions]="{ standalone: true }"
      />
      <ui-checkbox
        label="Created this week"
        [(ngModel)]="createdThisWeek"
        [ngModelOptions]="{ standalone: true }"
      />
      <ui-checkbox
        label="Includes blocked tasks"
        [(ngModel)]="includesBlocked"
        [ngModelOptions]="{ standalone: true }"
      />
      <ui-checkbox
        label="Has customer impact"
        [(ngModel)]="customerImpact"
        [ngModelOptions]="{ standalone: true }"
      />
    </div>
  `,
})
export class CheckboxFilterGroupExampleComponent {
  protected assignedToMe = true;
  protected createdThisWeek = false;
  protected includesBlocked = true;
  protected customerImpact = false;
}
