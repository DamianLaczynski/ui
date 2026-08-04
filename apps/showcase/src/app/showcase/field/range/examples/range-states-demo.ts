import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NumericRange, RangeComponent } from 'ui';

@Component({
  selector: 'app-range-states-demo',
  standalone: true,
  imports: [FormsModule, RangeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:40rem;">
      <ui-range
        label="Readonly policy window"
        helpText="Use readonly when the current band should stay visible but cannot be adjusted here."
        [readonly]="true"
        [showMinMax]="true"
        [formatValue]="formatHour"
        [(ngModel)]="readonlyRange"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-range
        label="Disabled limit"
        helpText="Disabled removes the control from active interaction."
        [disabled]="true"
        [showMinMax]="true"
        [(ngModel)]="disabledRange"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-range
        label="Approval band"
        helpText="Validation can explain why a range needs adjustment."
        errorText="The minimum and maximum values should be at least 20 points apart."
        [showMinMax]="true"
        [(ngModel)]="errorRange"
        [ngModelOptions]="{ standalone: true }"
      />
    </div>
  `,
})
export class RangeStatesDemoComponent {
  protected readonlyRange: NumericRange = { min: 9, max: 17 };
  protected disabledRange: NumericRange = { min: 25, max: 75 };
  protected errorRange: NumericRange = { min: 40, max: 50 };

  protected readonly formatHour = (value: number) => `${String(value).padStart(2, '0')}:00`;
}
