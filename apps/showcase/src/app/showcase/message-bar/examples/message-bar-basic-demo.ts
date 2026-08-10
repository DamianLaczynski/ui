import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MessageBarComponent } from 'lui';

@Component({
  selector: 'app-message-bar-basic-example',
  standalone: true,
  imports: [MessageBarComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:42rem">
      <ui-message-bar
        title="Sync paused"
        message="The workspace will resume syncing when your connection is stable again."
        variant="info"
        appearance="tint"
        [dismissible]="false"
      />
    </div>
  `,
})
export class MessageBarBasicExampleComponent {}
