import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  ButtonComponent,
  TextComponent,
  getValidationErrorMessage,
  shouldShowValidationError,
} from 'ui';

@Component({
  selector: 'app-text-states-validation-example',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, TextComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:34rem">
      <form
        [formGroup]="draftForm"
        (ngSubmit)="onSubmit()"
        style="display:flex;flex-direction:column;gap:1.125rem;margin:0;padding:1rem 1.125rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem;padding-bottom:0.25rem">
          <span style="font-size:0.9375rem;font-weight:600">Workspace onboarding draft</span>
          <p
            style="margin:0;font-size:0.8125rem;line-height:1.5;color:var(--color-neutral-foreground2-rest)"
          >
            Bind <code>errorText</code> from your form control in the application layer.
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">
              Save draft
            </strong>
            marks every control touched so required, min length and pattern appear together.
          </p>
        </div>

        <ui-text
          label="Invite email"
          placeholder="operations@yourcompany.org"
          [required]="true"
          autocomplete="email"
          formControlName="inviteEmail"
          [errorText]="fieldError(draftForm.controls.inviteEmail, 'Invite email')"
        />

        <ui-text
          label="Coupon code"
          placeholder="SAVE-10NOW"
          helpText="Optional. If filled, must look like PREFIX-SUFFIX (letters/digits around a hyphen)."
          formControlName="coupon"
          [errorText]="fieldError(draftForm.controls.coupon, 'Coupon code')"
        />

        <ui-text
          label="Project code"
          placeholder="min four chars"
          helpText="At least 4 characters."
          formControlName="projectCode"
          [errorText]="fieldError(draftForm.controls.projectCode, 'Project code')"
        />

        <ui-text
          label="Display slot name"
          placeholder="Morning brief"
          [required]="true"
          helpText="Required; at least 2 characters."
          formControlName="slotName"
          [errorText]="fieldError(draftForm.controls.slotName, 'Display slot name')"
        />

        <div
          style="display:flex;flex-direction:column;gap:0.5rem;padding-top:0.35rem;border-top:1px solid color-mix(in srgb,var(--color-neutral-stroke-rest) 70%,transparent)"
        >
          <ui-text
            label="Workspace subdomain"
            placeholder="finance-apac"
            helpText="Mocked API conflict via manual errorText."
            formControlName="subdomain"
            [(errorText)]="manualError"
          />
          <button
            type="button"
            style="align-self:flex-start;padding:0.35rem 0.75rem;border-radius:0.5rem;border:1px solid var(--color-neutral-stroke-rest);background:var(--color-neutral-background2-rest);font-size:0.8125rem;cursor:pointer;color:var(--color-neutral-foreground-rest)"
            (click)="toggleManualError()"
          >
            {{
              manualError.trim()
                ? 'Clear mocked API conflict'
                : 'Simulate server conflict (manual error)'
            }}
          </button>
        </div>

        <div style="padding-top:0.25rem">
          @if (saveNotice()) {
            <p
              style="margin:0 0 0.625rem;font-size:0.8125rem;line-height:1.45;color:var(--color-brand-primary)"
              role="status"
            >
              {{ saveNotice() }}
            </p>
          }

          @if (!saveNotice()) {
            <p
              style="margin:0 0 0.625rem;font-size:0.8125rem;line-height:1.45;color:var(--color-neutral-foreground2-rest)"
            >
              {{ submitHint }}
            </p>
          }

          <div style="display:flex;flex-wrap:wrap;gap:0.625rem">
            <ui-button type="submit" variant="primary">Save draft</ui-button>
            <ui-button type="button" variant="secondary" appearance="outline" (click)="discard()">
              Discard changes
            </ui-button>
          </div>
        </div>
      </form>

      <ui-text
        label="Readonly workspace id"
        [readonly]="true"
        [showClearButton]="false"
        [formControl]="workspaceId"
        helpText="System-generated identifier (not part of this draft form)."
      />

      <ui-text
        label="Disabled archived field"
        [formControl]="archivedName"
        helpText="Disabled fields stay out of the draft group."
      />
    </div>
  `,
})
export class TextStatesValidationExampleComponent {
  protected manualError = '';
  protected readonly saveNotice = signal('');
  protected readonly submitHint =
    'Save draft submits only when fields pass validators and no mocked API conflict is active.';

  protected readonly workspaceId = new FormControl('ws_29M4LX8', {
    nonNullable: true,
  });

  protected readonly archivedName = new FormControl(
    { value: 'Legacy intake form', disabled: true },
    { nonNullable: true },
  );

  private readonly couponPrefixSuffix = /^[A-Z0-9]+-[A-Z0-9]+$/i;

  private readonly starter = {
    inviteEmail: '',
    coupon: 'notvalidcoupon',
    projectCode: 'ab',
    slotName: 'x',
    subdomain: 'finance-apac',
  } as const;

  protected readonly draftForm = new FormGroup({
    inviteEmail: new FormControl(this.starter.inviteEmail, {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    coupon: new FormControl(this.starter.coupon, {
      nonNullable: true,
      validators: [
        (c: AbstractControl<string>): ValidationErrors | null => {
          const raw = (c.value ?? '').trim();
          if (!raw.length) return null;
          return this.couponPrefixSuffix.test(raw) ? null : { pattern: true };
        },
      ],
    }),
    projectCode: new FormControl(this.starter.projectCode, {
      nonNullable: true,
      validators: [Validators.minLength(4)],
    }),
    slotName: new FormControl(this.starter.slotName, {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    subdomain: new FormControl(this.starter.subdomain, {
      nonNullable: true,
    }),
  });

  protected fieldError(control: AbstractControl, label: string): string {
    if (!shouldShowValidationError(control)) {
      return '';
    }

    return getValidationErrorMessage(control.errors, control, label);
  }

  protected toggleManualError(): void {
    this.manualError = this.manualError.trim()
      ? ''
      : 'That subdomain is already provisioned elsewhere. Pick a different slug.';
    this.saveNotice.set('');
  }

  protected discard(): void {
    this.manualError = '';
    this.saveNotice.set('');
    this.draftForm.reset({ ...this.starter });
    this.workspaceId.patchValue('ws_29M4LX8');
  }

  protected onSubmit(): void {
    this.saveNotice.set('');
    this.draftForm.markAllAsTouched();

    if (this.manualError.trim()) {
      return;
    }

    if (this.draftForm.invalid) {
      return;
    }

    this.saveNotice.set('Draft validates — controls would POST in a wired application.');
  }
}
