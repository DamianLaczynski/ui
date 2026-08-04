import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from 'ui';

@Component({
  selector: 'app-checkbox-basic-example',
  standalone: true,
  imports: [FormsModule, CheckboxComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:0.875rem;width:100%;max-width:30rem">
      <ui-checkbox
        label="Accept terms and conditions"
        [(ngModel)]="acceptTerms"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-checkbox
        label="Subscribe to product updates"
        helpText="Release notes and feature announcements about twice a month."
        [(ngModel)]="subscribeUpdates"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-checkbox
        label="Remember this device for 30 days"
        [(ngModel)]="rememberDevice"
        [ngModelOptions]="{ standalone: true }"
      />
    </div>
  `,
})
export class CheckboxBasicExampleComponent {
  protected acceptTerms = false;
  protected subscribeUpdates = true;
  protected rememberDevice = true;
}
