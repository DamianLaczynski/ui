import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, SearchComponent } from 'ui';

@Component({
  selector: 'app-search-filter-bar-demo',
  standalone: true,
  imports: [ButtonComponent, FormsModule, SearchComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:44rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="display:flex;flex-direction:column;gap:0.25rem">
        <div style="font-size:0.9375rem;font-weight:600">Issues filter bar</div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Search often lives beside quick filters and reset actions, not as a standalone input.
        </div>
      </div>

      <div
        style="display:flex;gap:0.75rem;flex-wrap:wrap;align-items:flex-end;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <div style="flex:1 1 16rem;min-width:14rem">
          <ui-search
            label="Search issues"
            placeholder="Search title or id"
            [(ngModel)]="searchQuery"
            [ngModelOptions]="{ standalone: true }"
          />
        </div>
        <ui-button type="button" variant="secondary" appearance="outline">Open only</ui-button>
        <ui-button type="button" variant="secondary" appearance="outline">Assigned to me</ui-button>
        <ui-button type="button" appearance="subtle" (click)="clearFilters()">Reset</ui-button>
      </div>

      <div
        style="padding:0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <p
          style="margin:0 0 0.5rem;font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
        >
          Active query
        </p>
        <div style="font-size:0.875rem;color:var(--color-neutral-foreground-rest)">
          {{ searchQuery || 'No query applied.' }}
        </div>
      </div>
    </div>
  `,
})
export class SearchFilterBarDemoComponent {
  protected searchQuery = 'drawer animation';

  protected clearFilters(): void {
    this.searchQuery = '';
  }
}
