import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccordionComponent } from 'ui';

@Component({
  selector: 'app-accordion-indicators-example',
  standalone: true,
  imports: [AccordionComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:1rem;width:100%;max-width:44rem"
    >
      <ui-accordion
        label="Selected section"
        [showSelectionIndicator]="true"
        indicatorPosition="vertical"
      >
        <p style="margin:0;color:var(--color-neutral-foreground-rest)">
          Vertical indicators work well when the accordion behaves like a list of active sections.
        </p>
      </ui-accordion>

      <ui-accordion
        label="Prominent step"
        [showSelectionIndicator]="true"
        indicatorPosition="horizontal"
        appearance="filled"
      >
        <p style="margin:0;color:var(--color-neutral-foreground-rest)">
          Horizontal indicators fit better when the header chrome is visually stronger.
        </p>
      </ui-accordion>
    </div>
  `,
})
export class AccordionIndicatorsExampleComponent {}
