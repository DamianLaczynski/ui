import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent } from 'lui';

@Component({
  selector: 'app-button-shapes-example',
  standalone: true,
  imports: [ButtonComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-wrap:wrap;align-items:center;gap:0.75rem">
      <ui-button variant="primary" shape="rounded">Rounded</ui-button>
      <ui-button variant="primary" shape="square">Square</ui-button>
      <ui-button variant="primary" shape="circular" icon="heart" ariaLabel="Like" />
    </div>
  `,
})
export class ButtonShapesExampleComponent {}
