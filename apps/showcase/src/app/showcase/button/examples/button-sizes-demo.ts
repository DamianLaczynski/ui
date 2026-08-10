import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent } from 'lui';

@Component({
  selector: 'app-button-sizes-example',
  standalone: true,
  imports: [ButtonComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-wrap:wrap;align-items:center;gap:0.75rem">
      <ui-button size="small" variant="primary">Small</ui-button>
      <ui-button size="medium" variant="primary">Medium</ui-button>
      <ui-button size="large" variant="primary">Large</ui-button>
    </div>
  `,
})
export class ButtonSizesExampleComponent {}
