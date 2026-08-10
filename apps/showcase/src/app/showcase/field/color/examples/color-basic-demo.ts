import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorComponent } from 'lui';

@Component({
  selector: 'app-color-basic-example',
  standalone: true,
  imports: [FormsModule, ColorComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:30rem">
      <ui-color
        label="Brand primary"
        helpText="Used for buttons, links, and highlighted states."
        [(ngModel)]="primary"
        [ngModelOptions]="{ standalone: true }"
        format="hex"
      />

      <ui-color
        label="Accent fill"
        helpText="Supports alpha for badges and subtle fills."
        [(ngModel)]="accent"
        [ngModelOptions]="{ standalone: true }"
        format="hex"
        [showAlpha]="true"
      />
    </div>
  `,
})
export class ColorBasicExampleComponent {
  protected primary = '#0F6CBD';
  protected accent = '#C239B31F';
}
