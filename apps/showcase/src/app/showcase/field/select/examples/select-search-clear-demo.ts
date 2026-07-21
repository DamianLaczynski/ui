import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectComponent, type SelectItem } from 'ui';

const countryItems: SelectItem[] = [
  { value: 'pl', label: 'Poland' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'it', label: 'Italy' },
  { value: 'es', label: 'Spain' },
  { value: 'pt', label: 'Portugal' },
  { value: 'nl', label: 'Netherlands' },
  { value: 'se', label: 'Sweden' },
  { value: 'uk', label: 'United Kingdom', disabled: true },
];

const reviewerItems: SelectItem[] = [
  { value: 'ava', label: 'Ava Lopez' },
  { value: 'miles', label: 'Miles Carter' },
  { value: 'zoe', label: 'Zoe Patel' },
  { value: 'nina', label: 'Nina Woods' },
  { value: 'liam', label: 'Liam Scott', disabled: true },
];

@Component({
  selector: 'app-select-search-clear-example',
  imports: [FormsModule, SelectComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:38rem">
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:1rem">
        <ui-select
          label="Shipping country"
          placeholder="Search countries"
          helpText="Client-side search filters the static item list."
          [items]="countryItems"
          [searchable]="true"
          [clearable]="true"
          [(ngModel)]="selectedCountry"
          [ngModelOptions]="{ standalone: true }"
        />

        <ui-select
          label="Reviewers"
          placeholder="Search people"
          [items]="reviewerItems"
          mode="multi"
          [searchable]="true"
          [clearable]="true"
          [(ngModel)]="selectedReviewers"
          [ngModelOptions]="{ standalone: true }"
        />
      </div>

      <div
        style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem;min-width:10rem">
          <span
            style="font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
          >
            Country
          </span>
          <strong
            style="font-size:0.9375rem;font-weight:600;color:var(--color-neutral-foreground-rest)"
          >
            {{ selectedCountryLabel }}
          </strong>
        </div>
        <div style="display:flex;flex-direction:column;gap:0.25rem;min-width:12rem">
          <span
            style="font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
          >
            Reviewers
          </span>
          <strong
            style="font-size:0.9375rem;font-weight:600;color:var(--color-neutral-foreground-rest)"
          >
            {{ selectedReviewerLabels }}
          </strong>
        </div>
      </div>
    </div>
  `,
})
export class SelectSearchClearExampleComponent {
  protected readonly countryItems = countryItems;
  protected readonly reviewerItems = reviewerItems;
  protected selectedCountry = 'pl';
  protected selectedReviewers: Array<string | number> = ['ava', 'zoe'];

  protected get selectedCountryLabel(): string {
    return this.countryItems.find(item => item.value === this.selectedCountry)?.label ?? 'None';
  }

  protected get selectedReviewerLabels(): string {
    const labels = this.reviewerItems
      .filter(item => this.selectedReviewers.includes(item.value))
      .map(item => item.label);

    return labels.length > 0 ? labels.join(', ') : 'None';
  }
}
