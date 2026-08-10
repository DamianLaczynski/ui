import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorComponent } from 'lui';

@Component({
  selector: 'app-color-surface-options-example',
  standalone: true,
  imports: [FormsModule, ColorComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:34rem">
      <ui-color
        label="Filled default"
        inputVariant="filled"
        size="medium"
        [(ngModel)]="filledValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-color
        label="Filled lighter compact"
        inputVariant="filled-lighter"
        size="small"
        [(ngModel)]="compactValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-color
        label="Underlined prominent"
        inputVariant="underlined"
        size="large"
        [(ngModel)]="prominentValue"
        [ngModelOptions]="{ standalone: true }"
      />
    </div>
  `,
})
export class ColorSurfaceOptionsExampleComponent {
  protected filledValue = '#0F6CBD';
  protected compactValue = '#EAA300';
  protected prominentValue = '#C239B3';
}
