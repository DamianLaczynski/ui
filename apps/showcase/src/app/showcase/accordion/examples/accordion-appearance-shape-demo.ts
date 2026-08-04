import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccordionComponent } from 'ui';

@Component({
  selector: 'app-accordion-appearance-shape-example',
  standalone: true,
  imports: [AccordionComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));gap:1rem;width:100%;max-width:48rem"
    >
      <ui-accordion label="Subtle rounded" appearance="subtle" shape="rounded">
        <p style="margin:0;color:var(--color-neutral-foreground-rest)">
          Good default for FAQ lists and settings sections.
        </p>
      </ui-accordion>

      <ui-accordion label="Transparent square" appearance="transparent" shape="square">
        <p style="margin:0;color:var(--color-neutral-foreground-rest)">
          Useful on dense surfaces where the parent card already defines the boundary.
        </p>
      </ui-accordion>

      <ui-accordion label="Filled rounded" appearance="filled" shape="rounded">
        <p style="margin:0;color:var(--color-neutral-foreground-rest)">
          Better when the expanded header should feel more prominent than surrounding text.
        </p>
      </ui-accordion>
    </div>
  `,
})
export class AccordionAppearanceShapeExampleComponent {}
