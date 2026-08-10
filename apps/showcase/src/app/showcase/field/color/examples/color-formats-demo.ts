import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorComponent } from 'lui';

@Component({
  selector: 'app-color-formats-example',
  standalone: true,
  imports: [FormsModule, ColorComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:44rem">
      <ui-color
        label="HEX token"
        format="hex"
        [(ngModel)]="hexValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-color
        label="RGB output"
        format="rgb"
        [(ngModel)]="rgbValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-color
        label="HSL output"
        format="hsl"
        [(ngModel)]="hslValue"
        [ngModelOptions]="{ standalone: true }"
      />
    </div>
  `,
})
export class ColorFormatsExampleComponent {
  protected hexValue = '#4F6BED';
  protected rgbValue = 'rgb(15, 123, 95)';
  protected hslValue = 'hsl(32, 100%, 50%)';
}
