import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent } from 'ui';

@Component({
  selector: 'app-button-other-example',
  standalone: true,
  imports: [ButtonComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:0.75rem;width:100%;max-width:22rem">
      <ui-button variant="primary" [fullWidth]="true">Full width</ui-button>
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:0.75rem">
        <ui-button variant="secondary" appearance="outline" [selected]="false" icon="star">
          Selectable off
        </ui-button>
        <ui-button
          variant="secondary"
          appearance="outline"
          [selectable]="true"
          [selected]="true"
          icon="star"
        >
          Selectable on
        </ui-button>
      </div>
    </div>
  `,
})
export class ButtonOtherExampleComponent {}
