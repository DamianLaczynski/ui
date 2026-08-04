import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DividerComponent } from 'ui';

@Component({
  selector: 'app-divider-alignment-example',
  standalone: true,
  imports: [DividerComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:36rem;min-width:16rem;"
    >
      <ui-divider alignment="start" text="Start aligned" />
      <ui-divider alignment="center" text="Center aligned" />
      <ui-divider alignment="end" text="End aligned" />
    </div>
  `,
})
export class DividerAlignmentExampleComponent {}
