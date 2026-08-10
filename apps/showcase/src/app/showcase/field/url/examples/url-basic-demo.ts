import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UrlComponent } from 'lui';

@Component({
  selector: 'app-url-basic-demo',
  standalone: true,
  imports: [FormsModule, UrlComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%">
      <div
        style="flex:1 1 18rem;min-width:16rem;display:flex;flex-direction:column;gap:1rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem">
          <div style="font-size:0.9375rem;font-weight:600">Primary website</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Good default for organization, product, or profile links.
          </div>
        </div>

        <ui-url
          label="Website URL"
          placeholder="https://example.com"
          helpText="Prefer full URLs with protocol when the link leaves the product."
        />
      </div>

      <div
        style="flex:1 1 18rem;min-width:16rem;display:flex;flex-direction:column;gap:1rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem">
          <div style="font-size:0.9375rem;font-weight:600">Editable existing link</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Shows the built-in clear action when a URL is already present.
          </div>
        </div>

        <ui-url
          label="Documentation link"
          placeholder="https://docs.example.com"
          [(ngModel)]="docsUrl"
          [ngModelOptions]="{ standalone: true }"
          helpText="Use clear to replace the URL quickly."
        />
      </div>
    </div>
  `,
})
export class UrlBasicDemoComponent {
  protected docsUrl = 'https://docs.example.com/guides/getting-started';
}
