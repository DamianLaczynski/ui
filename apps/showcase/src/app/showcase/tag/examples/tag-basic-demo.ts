import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TagComponent } from 'ui';

@Component({
  selector: 'app-tag-basic-demo',
  standalone: true,
  imports: [TagComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:42rem">
      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:flex-start;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <ui-tag text="Design system" appearance="filled" variant="secondary" />
        <ui-tag text="Internal" appearance="tint" variant="info" />
        <ui-tag text="Needs review" appearance="outline" variant="warning" />
        <ui-tag text="Approved" appearance="subtle" variant="success" />
      </div>

      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:flex-start;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <ui-tag
          text="Campaign launch"
          secondaryText="Q3"
          icon="rocket"
          appearance="filled"
          variant="primary"
        />
        <ui-tag
          text="Owner"
          secondaryText="Ava Lopez"
          icon="person"
          appearance="tint"
          variant="secondary"
        />
      </div>
    </div>
  `,
})
export class TagBasicDemoComponent {}
