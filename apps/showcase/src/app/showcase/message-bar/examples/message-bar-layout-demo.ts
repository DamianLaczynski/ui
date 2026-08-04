import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MessageBarComponent } from 'ui';

@Component({
  selector: 'app-message-bar-layout-example',
  standalone: true,
  imports: [MessageBarComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:46rem">
      <ui-message-bar
        title="Single-line row"
        message="A new policy update is available."
        variant="secondary"
        appearance="outline"
        [multiline]="false"
      />

      <ui-message-bar
        title="Multiline panel notice"
        message="Identity verification is required before new team members can access billing and security settings. Complete verification to keep invites enabled."
        variant="warning"
        appearance="tint"
        [multiline]="true"
      />
    </div>
  `,
})
export class MessageBarLayoutExampleComponent {}
