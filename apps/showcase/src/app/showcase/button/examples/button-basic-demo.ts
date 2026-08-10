import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent } from 'lui';

@Component({
  selector: 'app-button-basic-example',
  standalone: true,
  imports: [ButtonComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-wrap:wrap;align-items:center;gap:0.75rem">
      <ui-button variant="primary">Submit</ui-button>
      <ui-button variant="secondary" appearance="outline">Cancel</ui-button>
    </div>
  `,
})
export class ButtonBasicExampleComponent {}
