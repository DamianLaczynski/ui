import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, TextareaComponent } from 'lui';

@Component({
  selector: 'app-textarea-feedback-panel-demo',
  standalone: true,
  imports: [ButtonComponent, FormsModule, TextareaComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:42rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="display:flex;flex-direction:column;gap:0.375rem">
        <div style="font-size:1rem;font-weight:600">Review feedback panel</div>
        <div
          style="font-size:0.875rem;color:var(--color-neutral-foreground2-rest);line-height:1.45"
        >
          A realistic textarea surface usually combines guidance, enough writing space, and the next
          action in one focused card.
        </div>
      </div>

      <ui-textarea
        label="Feedback for the author"
        placeholder="Summarize the main revisions and any blockers"
        [(ngModel)]="feedback"
        [ngModelOptions]="{ standalone: true }"
        [rows]="7"
        helpText="Keep feedback actionable and group related points together."
      />

      <div
        style="display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <ui-button type="button" variant="primary">Send feedback</ui-button>
        <ui-button type="button" variant="secondary" appearance="outline">Save draft</ui-button>
      </div>
    </div>
  `,
})
export class TextareaFeedbackPanelDemoComponent {
  protected feedback =
    'The overall direction is solid. Please tighten the spacing in the stats section and clarify the empty state copy before the next review.';
}
