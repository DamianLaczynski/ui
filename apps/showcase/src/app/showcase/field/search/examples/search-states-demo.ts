import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from 'lui';

@Component({
  selector: 'app-search-states-demo',
  standalone: true,
  imports: [FormsModule, SearchComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%">
      <div style="flex:1 1 16rem;min-width:15rem">
        <ui-search
          label="Readonly search"
          [readonly]="true"
          [(ngModel)]="readonlyValue"
          [ngModelOptions]="{ standalone: true }"
          helpText="Useful when showing the active query without allowing edits."
        />
      </div>

      <div style="flex:1 1 16rem;min-width:15rem">
        <ui-search
          label="Disabled search"
          [disabled]="true"
          placeholder="Search is unavailable"
          helpText="Disabled removes interaction completely."
        />
      </div>

      <div style="flex:1 1 16rem;min-width:15rem">
        <ui-search
          label="Minimum query length"
          [(ngModel)]="shortQuery"
          [ngModelOptions]="{ standalone: true }"
          [errorText]="shortQueryError"
          helpText="Require at least 3 characters before searching."
        />
      </div>
    </div>
  `,
})
export class SearchStatesDemoComponent {
  protected readonlyValue = 'Archived incidents';
  protected shortQuery = 'ab';

  protected get shortQueryError(): string {
    if (!this.shortQuery) {
      return '';
    }
    return this.shortQuery.trim().length < 3 ? 'Enter at least 3 characters.' : '';
  }
}
