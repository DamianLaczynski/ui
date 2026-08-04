import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextComponent } from 'ui';

@Component({
  selector: 'app-text-label-clear-example',
  standalone: true,
  imports: [FormsModule, TextComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:30rem">
      <ui-text
        label="Label above"
        labelPosition="above"
        placeholder="Default layout"
        [(ngModel)]="above"
        [ngModelOptions]="{ standalone: true }"
      />
      <ui-text
        label="Inline before"
        labelPosition="before"
        placeholder="Compact row"
        [(ngModel)]="before"
        [ngModelOptions]="{ standalone: true }"
      />
      <ui-text
        label="Inline after"
        labelPosition="after"
        placeholder="Trailing label"
        [(ngModel)]="after"
        [ngModelOptions]="{ standalone: true }"
      />
      <ui-text
        label="Below label"
        labelPosition="below"
        placeholder="Label rendered after the control"
        [(ngModel)]="below"
        [ngModelOptions]="{ standalone: true }"
      />
    </div>
  `,
})
export class TextLabelClearExampleComponent {
  protected above = 'Budget FY27';
  protected before = 'EMEA';
  protected after = 'Internal';
  protected below = 'Reference field';
}
