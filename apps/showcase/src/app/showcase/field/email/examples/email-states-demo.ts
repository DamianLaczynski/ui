import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailComponent } from 'ui';

@Component({
  selector: 'app-email-states-demo',
  standalone: true,
  imports: [EmailComponent, FormsModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:grid;gap:1rem;max-width:34rem">
      <ui-email
        label="Readonly address"
        [readonly]="true"
        helpText="Useful when the identifier can be copied but not changed."
        [(ngModel)]="readonlyValue"
      />

      <ui-email
        label="Disabled address"
        [disabled]="true"
        helpText="Disabled fields stay visible for context but are not editable."
        [(ngModel)]="disabledValue"
      />

      <ui-email
        label="Recovery email"
        autocomplete="email"
        placeholder="backup@example.com"
        helpText="Autocomplete stays aligned with native email semantics."
        [(ngModel)]="recoveryValue"
      />
    </div>
  `,
})
export class EmailStatesDemoComponent {
  protected readonlyValue = 'ops@contoso.com';
  protected disabledValue = 'billing@contoso.com';
  protected recoveryValue = '';
}
