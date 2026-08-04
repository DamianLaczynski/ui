import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorComponent } from 'ui';

@Component({
  selector: 'app-color-tools-example',
  standalone: true,
  imports: [FormsModule, ColorComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));gap:1rem;width:100%;max-width:44rem"
    >
      <ui-color
        label="With alpha"
        helpText="Useful for overlays and subtle surfaces."
        [showAlpha]="true"
        [(ngModel)]="alphaValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-color
        label="Without eye dropper"
        helpText="Keeps the field simpler in locked-down workflows."
        [showEyeDropper]="false"
        [(ngModel)]="simpleValue"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-color
        label="Readonly token"
        helpText="Visible but not editable in this state."
        [readonly]="true"
        [(ngModel)]="readonlyValue"
        [ngModelOptions]="{ standalone: true }"
      />
    </div>
  `,
})
export class ColorToolsExampleComponent {
  protected alphaValue = '#0F6CBDCC';
  protected simpleValue = '#7A5CFA';
  protected readonlyValue = '#107C10';
}
