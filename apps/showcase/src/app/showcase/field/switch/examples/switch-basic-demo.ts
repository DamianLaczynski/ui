import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SwitchComponent } from 'lui';

@Component({
  selector: 'app-switch-basic-example',
  standalone: true,
  imports: [FormsModule, SwitchComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:0.875rem;width:100%;max-width:30rem">
      <ui-switch
        label="Enable desktop notifications"
        helpText="Important mentions and task activity only."
        [(ngModel)]="desktopNotifications"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-switch
        label="Auto-save drafts"
        helpText="Saves edits every 30 seconds while you work."
        [(ngModel)]="autosaveDrafts"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-switch
        label="Share anonymous usage insights"
        [(ngModel)]="shareInsights"
        [ngModelOptions]="{ standalone: true }"
      />
    </div>
  `,
})
export class SwitchBasicExampleComponent {
  protected desktopNotifications = true;
  protected autosaveDrafts = true;
  protected shareInsights = false;
}
