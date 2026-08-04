import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordComponent } from 'ui';

@Component({
  selector: 'app-password-autocomplete-demo',
  standalone: true,
  imports: [FormsModule, PasswordComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%">
      <div style="flex:1 1 16rem;min-width:15rem">
        <ui-password
          label="Current password"
          autocomplete="current-password"
          placeholder="Enter current password"
          helpText="Use this for sign-in and identity verification."
        />
      </div>

      <div style="flex:1 1 16rem;min-width:15rem">
        <ui-password
          label="New password"
          autocomplete="new-password"
          placeholder="Create a new password"
          helpText="Use this when the user is setting or resetting a password."
        />
      </div>

      <div style="flex:1 1 16rem;min-width:15rem">
        <ui-password
          label="Readonly recovery key"
          [readonly]="true"
          [(ngModel)]="recoveryKey"
          [ngModelOptions]="{ standalone: true }"
          helpText="Readonly keeps the value visible, but reveal and clear actions stay hidden."
        />
      </div>
    </div>
  `,
})
export class PasswordAutocompleteDemoComponent {
  protected recoveryKey = 'VaultKey-48F2-Delta';
}
