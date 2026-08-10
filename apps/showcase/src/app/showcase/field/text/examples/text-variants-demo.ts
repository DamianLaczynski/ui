import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextComponent } from 'lui';

@Component({
  selector: 'app-text-variants-example',
  standalone: true,
  imports: [FormsModule, TextComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:0.875rem;width:100%;max-width:28rem">
      <ui-text
        label="Filled"
        inputVariant="filled"
        size="medium"
        [(ngModel)]="filled"
        [ngModelOptions]="{ standalone: true }"
      />
      <ui-text
        label="Filled gray"
        inputVariant="filled-gray"
        size="medium"
        [(ngModel)]="filledGray"
        [ngModelOptions]="{ standalone: true }"
      />
      <ui-text
        label="Filled lighter"
        inputVariant="filled-lighter"
        size="small"
        [(ngModel)]="filledLighter"
        [ngModelOptions]="{ standalone: true }"
      />
      <ui-text
        label="Underlined"
        inputVariant="underlined"
        size="large"
        [(ngModel)]="underlined"
        [ngModelOptions]="{ standalone: true }"
      />
    </div>
  `,
})
export class TextVariantsExampleComponent {
  protected filled = 'Quarterly planning';
  protected filledGray = 'Client success';
  protected filledLighter = 'Draft';
  protected underlined = 'Executive summary';
}
