import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent, TextComponent } from 'lui';

@Component({
  selector: 'app-text-profile-form-example',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, TextComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <form
      [formGroup]="form"
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:34rem"
    >
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(14rem,1fr));gap:1rem">
        <ui-text
          label="First name"
          placeholder="Enter first name"
          formControlName="firstName"
          helpText="Required for the public profile."
        />
        <ui-text
          label="Last name"
          placeholder="Enter last name"
          formControlName="lastName"
          helpText="Required for the public profile."
        />
      </div>

      <ui-text
        label="Job title"
        placeholder="Enter job title"
        formControlName="jobTitle"
        helpText="Shown in directory cards and mentions."
      />

      <ui-text
        label="Internal nickname"
        placeholder="Optional short label"
        formControlName="nickname"
        inputVariant="filled-gray"
        [showClearButton]="true"
        helpText="Used only inside admin and support views."
      />

      <div
        style="display:flex;flex-wrap:wrap;gap:0.5rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <ui-button type="button" variant="primary" [disabled]="form.invalid"
          >Save profile</ui-button
        >
        <ui-button
          type="button"
          variant="secondary"
          appearance="outline"
          (click)="form.reset(defaults)"
        >
          Reset
        </ui-button>
      </div>
    </form>
  `,
})
export class TextProfileFormExampleComponent {
  protected readonly defaults = {
    firstName: 'Alicia',
    lastName: 'Carter',
    jobTitle: 'Enterprise Customer Success Lead',
    nickname: 'AC',
  };

  protected readonly form = new FormGroup({
    firstName: new FormControl(this.defaults.firstName, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    lastName: new FormControl(this.defaults.lastName, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    jobTitle: new FormControl(this.defaults.jobTitle, {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    nickname: new FormControl(this.defaults.nickname, {
      nonNullable: true,
    }),
  });
}
