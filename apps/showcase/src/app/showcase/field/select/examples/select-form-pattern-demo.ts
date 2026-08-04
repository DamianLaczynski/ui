import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent, SelectComponent, type SelectItem } from 'ui';

const ownerItems: SelectItem[] = [
  { value: 'ava', label: 'Ava Lopez' },
  { value: 'nina', label: 'Nina Woods' },
  { value: 'zoe', label: 'Zoe Patel' },
  { value: 'theo', label: 'Theo Murphy' },
];

const reviewerItems: SelectItem[] = [
  { value: 'legal', label: 'Legal' },
  { value: 'ops', label: 'Operations' },
  { value: 'security', label: 'Security' },
  { value: 'support', label: 'Support' },
];

const releaseItems: SelectItem[] = [
  { value: 'patch', label: 'Patch release' },
  { value: 'minor', label: 'Minor release' },
  { value: 'major', label: 'Major release' },
];

@Component({
  selector: 'app-select-form-pattern-example',
  imports: [ReactiveFormsModule, ButtonComponent, SelectComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <form
      [formGroup]="form"
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:40rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      (ngSubmit)="submit()"
    >
      <div style="display:flex;flex-direction:column;gap:0.25rem">
        <div style="font-size:0.9375rem;font-weight:600">Release handoff</div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          A realistic form usually mixes single and multi-select fields with actions and a compact
          summary of the current choice set.
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));gap:1rem">
        <ui-select
          label="Release owner"
          placeholder="Select owner"
          helpText="Required before the handoff can be submitted."
          [items]="ownerItems"
          [searchable]="true"
          [clearable]="true"
          [required]="true"
          formControlName="owner"
        />

        <ui-select
          label="Release type"
          placeholder="Choose release type"
          [items]="releaseItems"
          formControlName="releaseType"
        />
      </div>

      <ui-select
        label="Required reviewers"
        placeholder="Choose one or more reviewers"
        [items]="reviewerItems"
        mode="multi"
        [searchable]="true"
        [clearable]="true"
        formControlName="reviewers"
      />

      <div
        style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem;min-width:10rem">
          <span
            style="font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
          >
            Owner
          </span>
          <strong
            style="font-size:0.9375rem;font-weight:600;color:var(--color-neutral-foreground-rest)"
          >
            {{ ownerLabel }}
          </strong>
        </div>
        <div style="display:flex;flex-direction:column;gap:0.25rem;min-width:11rem">
          <span
            style="font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
          >
            Reviewers
          </span>
          <strong
            style="font-size:0.9375rem;font-weight:600;color:var(--color-neutral-foreground-rest)"
          >
            {{ reviewerLabels }}
          </strong>
        </div>
        <div style="display:flex;flex-direction:column;gap:0.25rem;min-width:10rem">
          <span
            style="font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
          >
            Last submit
          </span>
          <strong
            style="font-size:0.9375rem;font-weight:600;color:var(--color-neutral-foreground-rest)"
          >
            {{ submitState }}
          </strong>
        </div>
      </div>

      <div
        style="display:flex;flex-wrap:wrap;gap:0.5rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <ui-button type="submit" variant="primary">Save handoff</ui-button>
        <ui-button type="button" variant="secondary" appearance="outline" (click)="reset()">
          Reset
        </ui-button>
      </div>
    </form>
  `,
})
export class SelectFormPatternExampleComponent {
  protected readonly ownerItems = ownerItems;
  protected readonly reviewerItems = reviewerItems;
  protected readonly releaseItems = releaseItems;
  protected submitState = 'Not submitted';

  protected readonly form = new FormGroup({
    owner: new FormControl<string | number>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    releaseType: new FormControl<string | number>('minor', { nonNullable: true }),
    reviewers: new FormControl<Array<string | number>>(['ops'], { nonNullable: true }),
  });

  protected get ownerLabel(): string {
    return ownerItems.find(item => item.value === this.form.controls.owner.value)?.label ?? 'None';
  }

  protected get reviewerLabels(): string {
    const selected = reviewerItems
      .filter(item => this.form.controls.reviewers.value.includes(item.value))
      .map(item => item.label);

    return selected.length > 0 ? selected.join(', ') : 'None';
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.submitState = 'Complete the required fields';
      return;
    }

    this.submitState = 'Saved';
  }

  protected reset(): void {
    this.form.reset({
      owner: '',
      releaseType: 'minor',
      reviewers: ['ops'],
    });
    this.submitState = 'Not submitted';
  }
}
