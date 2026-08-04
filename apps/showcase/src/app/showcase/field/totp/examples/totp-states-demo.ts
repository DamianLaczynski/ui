import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TotpComponent } from 'ui';

@Component({
  selector: 'app-totp-states-demo',
  standalone: true,
  imports: [FormsModule, TotpComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%">
      <div style="flex:1 1 16rem;min-width:15rem">
        <ui-totp
          label="Readonly backup code"
          [readonly]="true"
          [(ngModel)]="readonlyCode"
          [ngModelOptions]="{ standalone: true }"
          helpText="Useful when showing a generated code without allowing edits."
        />
      </div>

      <div style="flex:1 1 16rem;min-width:15rem">
        <ui-totp
          label="Disabled verification"
          [disabled]="true"
          helpText="Disabled removes interaction entirely."
        />
      </div>

      <div style="flex:1 1 16rem;min-width:15rem">
        <ui-totp
          label="Incorrect code"
          [(ngModel)]="invalidCode"
          [ngModelOptions]="{ standalone: true }"
          [errorText]="invalidError"
          helpText="Example of a failed verification state."
        />
      </div>
    </div>
  `,
})
export class TotpStatesDemoComponent {
  protected readonlyCode = '654321';
  protected invalidCode = '123';

  protected get invalidError(): string {
    if (!this.invalidCode) {
      return '';
    }
    return this.invalidCode.length === 6 ? 'Invalid verification code.' : '';
  }
}
