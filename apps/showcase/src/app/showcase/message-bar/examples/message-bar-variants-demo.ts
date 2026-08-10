import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MessageBarComponent } from 'lui';

@Component({
  selector: 'app-message-bar-variants-example',
  standalone: true,
  imports: [MessageBarComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:0.75rem;width:100%;max-width:44rem">
      <ui-message-bar
        title="Migration scheduled"
        message="The workspace move begins tonight at 22:00."
        variant="primary"
        [dismissible]="false"
      />
      <ui-message-bar
        title="Saved successfully"
        message="Your contract settings were updated and shared with the team."
        variant="success"
        [dismissible]="false"
      />
      <ui-message-bar
        title="Storage nearing limit"
        message="Uploads may stop soon unless you archive or buy more space."
        variant="warning"
        [dismissible]="false"
      />
      <ui-message-bar
        title="Payment failed"
        message="Subscription renewal could not be completed. Update billing to avoid suspension."
        variant="danger"
        [dismissible]="false"
      />
    </div>
  `,
})
export class MessageBarVariantsExampleComponent {}
