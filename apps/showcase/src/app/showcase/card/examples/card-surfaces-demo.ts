import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CardComponent } from 'lui';

@Component({
  selector: 'app-card-surfaces-demo',
  standalone: true,
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:grid;gap:1rem;width:100%;">
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));gap:1rem;">
        <ui-card appearance="filled" ariaLabel="Filled card">
          <div uiCardHeader style="display:grid;gap:0.25rem;">
            <strong style="font-size:0.9375rem;">Filled</strong>
            <span style="font-size:0.75rem;color:var(--color-neutral-foreground3-rest);"
              >Dense, default emphasis</span
            >
          </div>
        </ui-card>

        <ui-card appearance="filled-alternative" ariaLabel="Filled alternative card">
          <div uiCardHeader style="display:grid;gap:0.25rem;">
            <strong style="font-size:0.9375rem;">Filled alternative</strong>
            <span style="font-size:0.75rem;color:var(--color-neutral-foreground3-rest);"
              >Slightly richer surface for nested modules</span
            >
          </div>
        </ui-card>

        <ui-card appearance="subtle" ariaLabel="Subtle card">
          <div uiCardHeader style="display:grid;gap:0.25rem;">
            <strong style="font-size:0.9375rem;">Subtle</strong>
            <span style="font-size:0.75rem;color:var(--color-neutral-foreground3-rest);"
              >Low-chrome shell for already structured layouts</span
            >
          </div>
        </ui-card>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));gap:1rem;">
        <ui-card appearance="outline" ariaLabel="Outline card">
          <div uiCardHeader style="display:grid;gap:0.25rem;">
            <strong style="font-size:0.9375rem;">Outline</strong>
            <span style="font-size:0.75rem;color:var(--color-neutral-foreground3-rest);"
              >Good when the surrounding page already supplies elevation and grouping</span
            >
          </div>
        </ui-card>

        <ui-card
          appearance="filled-alternative"
          borderStyle="none"
          ariaLabel="Soft card without border"
        >
          <div uiCardHeader style="display:grid;gap:0.25rem;">
            <strong style="font-size:0.9375rem;">Soft shell</strong>
            <span style="font-size:0.75rem;color:var(--color-neutral-foreground3-rest);"
              >Remove the border when cards should feel more like quiet content sections</span
            >
          </div>
        </ui-card>

        <ui-card appearance="outline" borderStyle="dashed" ariaLabel="Dashed border card">
          <div uiCardHeader style="display:grid;gap:0.25rem;">
            <strong style="font-size:0.9375rem;">Dashed border</strong>
            <span style="font-size:0.75rem;color:var(--color-neutral-foreground3-rest);"
              >Use border style when the shell should feel more editorial, draft-like, or
              utility-oriented</span
            >
          </div>
        </ui-card>
      </div>

      <ui-card appearance="outline" orientation="horizontal" ariaLabel="Horizontal media card">
        <div
          uiCardPreview
          style="width:10rem;min-height:100%;background:linear-gradient(135deg,#f8e9d7 0%,#efc9a1 100%);"
        ></div>

        <div uiCardHeader style="display:grid;gap:0.25rem;">
          <strong style="font-size:1rem;line-height:1.35;">Horizontal layout</strong>
          <span style="font-size:0.8125rem;color:var(--color-neutral-foreground3-rest);">
            Better when a preview should sit beside short metadata instead of above it
          </span>
        </div>

        <div uiCardBody>
          <p
            style="margin:0;font-size:0.875rem;line-height:1.5;color:var(--color-neutral-foreground2-rest);"
          >
            Horizontal cards are useful for compact media rows, attachment previews, and list-style
            summaries.
          </p>
        </div>
      </ui-card>
    </div>
  `,
})
export class CardSurfacesDemoComponent {}
