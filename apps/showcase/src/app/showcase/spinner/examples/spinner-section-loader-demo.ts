import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SpinnerComponent } from 'ui';

@Component({
  selector: 'app-spinner-section-loader-example',
  standalone: true,
  imports: [SpinnerComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;min-height:10.5rem;align-items:center;justify-content:center;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem;background:var(--color-neutral-background-rest);min-width:16rem;"
    >
      <ui-spinner
        size="large"
        variant="primary"
        labelPosition="below"
        label="Fetching board"
        ariaLabel="Fetching board"
      />
    </div>
  `,
})
export class SpinnerSectionLoaderExampleComponent {}
