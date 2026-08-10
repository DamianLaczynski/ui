import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DividerComponent } from 'lui';

@Component({
  selector: 'app-divider-basic-example',
  standalone: true,
  imports: [DividerComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:34rem;min-width:16rem;"
    >
      <div style="font-size:0.875rem">Overview section</div>
      <ui-divider />
      <div style="font-size:0.875rem">Details section</div>
      <ui-divider text="Section break" />
      <div style="font-size:0.875rem">Follow-up section</div>
    </div>
  `,
})
export class DividerBasicExampleComponent {}
