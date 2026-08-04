import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TotpComponent } from 'ui';

@Component({
  selector: 'app-totp-digits-demo',
  standalone: true,
  imports: [TotpComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%">
      <div style="flex:1 1 16rem;min-width:15rem">
        <ui-totp
          label="PIN code"
          [digitsCount]="4"
          size="small"
          helpText="Useful for shorter confirmation or device unlock flows."
        />
      </div>

      <div style="flex:1 1 16rem;min-width:15rem">
        <ui-totp
          label="Standard 2FA"
          [digitsCount]="6"
          size="medium"
          helpText="Most authenticator and SMS verification flows use 6 digits."
        />
      </div>

      <div style="flex:1 1 16rem;min-width:15rem">
        <ui-totp
          label="Extended recovery code"
          [digitsCount]="8"
          size="large"
          helpText="Longer codes fit higher-assurance verification or backup flows."
        />
      </div>
    </div>
  `,
})
export class TotpDigitsDemoComponent {}
