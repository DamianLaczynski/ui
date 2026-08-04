import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent, TextareaComponent } from 'ui';

@Component({
  selector: 'app-textarea-form-demo',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, TextareaComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <form
      [formGroup]="draftForm"
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:54rem"
    >
      <div
        style="flex:1 1 22rem;min-width:18rem;display:flex;flex-direction:column;gap:1rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem">
          <div style="font-size:0.9375rem;font-weight:600">Brief authoring form</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Textareas often come in groups: short summary, context block, and handoff notes.
          </div>
        </div>

        <ui-textarea
          label="Summary"
          [rows]="3"
          placeholder="Summarize the request"
          formControlName="summary"
        />

        <ui-textarea
          label="Context"
          [rows]="5"
          placeholder="Describe background, constraints, and goals"
          formControlName="context"
          inputVariant="filled-gray"
        />

        <ui-textarea
          label="Handoff notes"
          [rows]="4"
          placeholder="Anything the next owner should know"
          formControlName="handoff"
        />

        <div
          style="display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
        >
          <ui-button type="button" variant="primary">Save brief</ui-button>
          <ui-button type="button" variant="secondary" appearance="outline" (click)="reset()">
            Reset
          </ui-button>
        </div>
      </div>

      <div
        style="flex:0 0 18rem;min-width:16rem;padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <p
          style="margin:0 0 0.5rem;font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
        >
          Content lengths
        </p>
        <div
          style="display:flex;flex-direction:column;gap:0.5rem;font-size:0.875rem;line-height:1.4"
        >
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Summary</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
              draftForm.controls.summary.value.length
            }}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Context</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
              draftForm.controls.context.value.length
            }}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Handoff</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
              draftForm.controls.handoff.value.length
            }}</strong>
          </div>
        </div>
      </div>
    </form>
  `,
})
export class TextareaFormDemoComponent {
  protected readonly defaults = {
    summary: 'Refresh the project detail view and reduce visual noise around the activity panel.',
    context:
      'Users struggle to scan the current panel because metadata, comments, and actions sit at the same visual weight.',
    handoff: 'Keep the layout compatible with existing drawer and tabs patterns.',
  };

  protected readonly draftForm = new FormGroup({
    summary: new FormControl(this.defaults.summary, { nonNullable: true }),
    context: new FormControl(this.defaults.context, { nonNullable: true }),
    handoff: new FormControl(this.defaults.handoff, { nonNullable: true }),
  });

  protected reset(): void {
    this.draftForm.reset(this.defaults);
  }
}
