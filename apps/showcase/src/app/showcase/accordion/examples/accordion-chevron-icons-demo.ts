import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccordionComponent } from 'ui';

@Component({
  selector: 'app-accordion-chevron-icons-example',
  standalone: true,
  imports: [AccordionComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:0.75rem;width:100%;max-width:40rem">
      <ui-accordion
        label="Project summary"
        icon="document"
        chevronPosition="before"
        chevronIconCollapsed="add"
        chevronIconExpanded="subtract"
      >
        <p style="margin:0;color:var(--color-neutral-foreground-rest)">
          Custom chevrons can make expansion state feel more tailored, but keep the pattern
          consistent within one surface.
        </p>
      </ui-accordion>

      <ui-accordion label="Release notes" icon="rocket" chevronPosition="after">
        <p style="margin:0;color:var(--color-neutral-foreground-rest)">
          End-position chevrons work well when the leading side is reserved for status icons.
        </p>
      </ui-accordion>
    </div>
  `,
})
export class AccordionChevronIconsExampleComponent {}
