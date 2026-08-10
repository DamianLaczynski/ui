import { Component, ChangeDetectionStrategy } from '@angular/core';
import { UrlComponent } from 'lui';

@Component({
  selector: 'app-url-layout-demo',
  standalone: true,
  imports: [UrlComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:46rem">
      <div
        style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="flex:1 1 15rem;min-width:14rem">
          <ui-url
            label="Compact source link"
            size="small"
            inputVariant="filled-lighter"
            placeholder="https://"
          />
        </div>

        <div style="flex:1 1 15rem;min-width:14rem">
          <ui-url
            label="Partner page"
            labelPosition="before"
            size="medium"
            inputVariant="filled-gray"
            placeholder="https://partner.example.com"
          />
        </div>
      </div>

      <div
        style="display:flex;flex-direction:column;gap:0.875rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="font-size:0.9375rem;font-weight:600">Prominent published link</div>
        <ui-url
          label="Launch page URL"
          size="large"
          inputVariant="filled"
          placeholder="https://launch.example.com"
          helpText="Use a larger field when link editing is a primary part of the task."
        />
      </div>
    </div>
  `,
})
export class UrlLayoutDemoComponent {}
