import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextareaComponent } from 'ui';

@Component({
  selector: 'app-textarea-states-demo',
  standalone: true,
  imports: [FormsModule, TextareaComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%">
      <div style="flex:1 1 16rem;min-width:15rem">
        <ui-textarea
          label="Readonly incident summary"
          [readonly]="true"
          [(ngModel)]="readonlyValue"
          [ngModelOptions]="{ standalone: true }"
          [rows]="5"
          helpText="Useful when the user can review the text here but edits happen elsewhere."
        />
      </div>

      <div style="flex:1 1 16rem;min-width:15rem">
        <ui-textarea
          label="Disabled notes"
          [disabled]="true"
          [rows]="4"
          placeholder="This note field is unavailable"
          helpText="Disabled removes interaction completely."
        />
      </div>

      <div style="flex:1 1 16rem;min-width:15rem">
        <ui-textarea
          label="Inline quality check"
          [(ngModel)]="draftNote"
          [ngModelOptions]="{ standalone: true }"
          [rows]="4"
          [errorText]="draftError"
          helpText="Aim for at least 20 characters when the note should be actionable."
        />
      </div>
    </div>
  `,
})
export class TextareaStatesDemoComponent {
  protected readonlyValue =
    'Customer reported a blocking checkout issue.\nEscalated to payments team.\nWaiting for retry confirmation.';

  protected draftNote = 'Too short';

  protected get draftError(): string {
    const value = this.draftNote.trim();
    if (!value.length) {
      return '';
    }
    return value.length < 20 ? 'Add a bit more context before saving.' : '';
  }
}
