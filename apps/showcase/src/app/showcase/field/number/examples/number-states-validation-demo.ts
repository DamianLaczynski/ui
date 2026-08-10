import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NumberComponent } from 'lui';

@Component({
  selector: 'app-number-states-validation-demo',
  standalone: true,
  imports: [ReactiveFormsModule, NumberComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));gap:1rem;width:100%;max-width:48rem"
    >
      <ui-number
        label="Required quantity"
        placeholder="0"
        [formControl]="quantity"
        [required]="true"
        helpText="This field participates in reactive validation."
      />

      <ui-number
        label="Readonly base price"
        placeholder="0"
        [formControl]="readonlyPrice"
        [readonly]="true"
        helpText="Readonly is useful for calculated or locked values."
      />

      <ui-number
        label="Disabled archived value"
        placeholder="0"
        [formControl]="disabledValue"
        [disabled]="true"
        helpText="Disabled removes the field from interaction."
      />

      <ui-number
        label="Manual error state"
        placeholder="0"
        [formControl]="manualError"
        [errorText]="'Value exceeds available budget'"
      />
    </div>
  `,
})
export class NumberStatesValidationDemoComponent {
  protected readonly quantity = new FormControl<number | null>(null, {
    validators: [Validators.required, Validators.min(1)],
  });

  protected readonly readonlyPrice = new FormControl<number | null>(249, {
    nonNullable: false,
  });

  protected readonly disabledValue = new FormControl<number | null>({
    value: 1200,
    disabled: true,
  });

  protected readonly manualError = new FormControl<number | null>(3200);
}
