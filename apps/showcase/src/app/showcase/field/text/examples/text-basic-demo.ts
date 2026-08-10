import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextComponent } from 'lui';

@Component({
  selector: 'app-text-basic-example',
  standalone: true,
  imports: [FormsModule, TextComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:24rem">
      <ui-text
        label="Workspace name"
        placeholder="Enter workspace name"
        helpText="Visible to everyone in your organization."
        [(ngModel)]="value"
        [ngModelOptions]="{ standalone: true }"
      />
    </div>
  `,
})
export class TextBasicExampleComponent {
  protected value = 'Product Ops Europe';
}
