import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextareaComponent } from 'lui';

@Component({
  selector: 'app-textarea-basic-demo',
  standalone: true,
  imports: [FormsModule, TextareaComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%">
      <div
        style="flex:1 1 18rem;min-width:16rem;display:flex;flex-direction:column;gap:1rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem">
          <div style="font-size:0.9375rem;font-weight:600">General notes</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Good default for comments, descriptions, and longer form answers.
          </div>
        </div>

        <ui-textarea
          label="Notes"
          placeholder="Add any notes for the team"
          [rows]="4"
          helpText="Use concise sentences when the text will be scanned by others."
        />
      </div>

      <div
        style="flex:1 1 18rem;min-width:16rem;display:flex;flex-direction:column;gap:1rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem">
          <div style="font-size:0.9375rem;font-weight:600">Editable summary</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Useful when a longer value is already present and needs refinement.
          </div>
        </div>

        <ui-textarea
          label="Release summary"
          placeholder="Summarize the update"
          [(ngModel)]="summary"
          [ngModelOptions]="{ standalone: true }"
          [rows]="5"
          helpText="The current value shows how the field behaves with existing multiline content."
        />
      </div>
    </div>
  `,
})
export class TextareaBasicDemoComponent {
  protected summary =
    'Release includes drawer motion tuning, breadcrumb responsive fixes, and search showcase updates.\nKeep the summary short and scannable.';
}
