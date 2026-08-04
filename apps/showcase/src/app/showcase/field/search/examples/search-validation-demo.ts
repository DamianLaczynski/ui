import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent, SearchComponent } from 'ui';

@Component({
  selector: 'app-search-validation-demo',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, SearchComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <form
      [formGroup]="searchForm"
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:34rem"
      (ngSubmit)="markTouched()"
    >
      <ui-search
        label="Search policy articles"
        placeholder="Enter at least 3 characters"
        helpText="Required. Use 3 or more characters to reduce noisy results."
        formControlName="query"
        [errorText]="queryError"
      />

      <div style="display:flex;flex-wrap:wrap;gap:0.75rem">
        <ui-button type="submit">Validate</ui-button>
        <ui-button type="button" appearance="outline" (click)="fillExample()"
          >Use example</ui-button
        >
      </div>
    </form>
  `,
})
export class SearchValidationDemoComponent {
  protected readonly searchForm = new FormGroup({
    query: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
  });

  protected get queryError(): string {
    const control = this.searchForm.controls.query;
    if (!control.touched && !control.dirty) {
      return '';
    }
    if (control.hasError('required')) {
      return 'Search query is required.';
    }
    if (control.hasError('minlength')) {
      return 'Enter at least 3 characters.';
    }
    return '';
  }

  protected markTouched(): void {
    this.searchForm.markAllAsTouched();
  }

  protected fillExample(): void {
    this.searchForm.controls.query.setValue('remote work policy');
    this.searchForm.controls.query.markAsTouched();
  }
}
