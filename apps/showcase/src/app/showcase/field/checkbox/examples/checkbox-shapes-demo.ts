import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from 'lui';

@Component({
  selector: 'app-checkbox-shapes-example',
  standalone: true,
  imports: [FormsModule, CheckboxComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:34rem">
      <div style="display:flex;flex-direction:column;gap:0.75rem">
        <ui-checkbox
          label="Rounded default"
          shape="rounded"
          size="medium"
          [(ngModel)]="roundedValue"
          [ngModelOptions]="{ standalone: true }"
        />

        <ui-checkbox
          label="Circular compact"
          shape="circular"
          size="small"
          [(ngModel)]="circularValue"
          [ngModelOptions]="{ standalone: true }"
        />

        <ui-checkbox
          label="Square prominent"
          shape="square"
          size="large"
          [(ngModel)]="squareValue"
          [ngModelOptions]="{ standalone: true }"
        />
      </div>
    </div>
  `,
})
export class CheckboxShapesExampleComponent {
  protected roundedValue = true;
  protected circularValue = false;
  protected squareValue = true;
}
