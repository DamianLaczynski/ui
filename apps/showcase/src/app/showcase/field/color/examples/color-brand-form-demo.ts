import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ColorComponent } from 'ui';

@Component({
  selector: 'app-color-brand-form-example',
  standalone: true,
  imports: [ReactiveFormsModule, ColorComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:52rem"
    >
      <form
        [formGroup]="form"
        style="flex:1 1 22rem;display:flex;min-width:16rem;max-width:34rem;flex-direction:column;gap:1rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <ui-color
          label="Primary brand"
          helpText="Default buttons and active states."
          formControlName="primary"
          format="hex"
        />

        <ui-color
          label="Secondary brand"
          helpText="Supporting emphasis and secondary tokens."
          formControlName="secondary"
          format="hex"
        />

        <ui-color
          label="Accent overlay"
          helpText="Used for highlighted backgrounds and data accents."
          formControlName="accent"
          format="hex"
          [showAlpha]="true"
        />
      </form>

      <div
        style="padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest);min-width:12rem"
      >
        <p
          style="margin:0 0 0.5rem;font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
        >
          Values
        </p>
        <div
          style="display:flex;flex-direction:column;gap:0.45rem;font-size:0.875rem;line-height:1.4"
        >
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Primary</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
              form.controls.primary.getRawValue()
            }}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Secondary</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
              form.controls.secondary.getRawValue()
            }}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Accent</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
              form.controls.accent.getRawValue()
            }}</strong>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ColorBrandFormExampleComponent {
  protected readonly form = new FormGroup({
    primary: new FormControl('#0F6CBD', { nonNullable: true }),
    secondary: new FormControl('#107C10', { nonNullable: true }),
    accent: new FormControl('#C239B31F', { nonNullable: true }),
  });
}
