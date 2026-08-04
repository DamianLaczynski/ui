import { Component, ChangeDetectionStrategy } from '@angular/core';
import { KbdComponent } from 'ui';

@Component({
  selector: 'app-kbd-basic-demo',
  standalone: true,
  imports: [KbdComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center">
      <ui-kbd text="Enter" />
      <ui-kbd text="Esc" />
      <ui-kbd text="Tab" />
      <ui-kbd text="Shift" />
      <ui-kbd text="Space" />
    </div>
  `,
})
export class KbdBasicDemoComponent {}
