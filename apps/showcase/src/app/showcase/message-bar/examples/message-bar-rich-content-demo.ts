import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, MessageBarComponent } from 'lui';

@Component({
  selector: 'app-message-bar-rich-content-example',
  standalone: true,
  imports: [ButtonComponent, MessageBarComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:46rem">
      <ui-message-bar
        title="Storage policy update"
        message="Automatic cleanup will archive inactive media after 30 days."
        variant="info"
        appearance="tint"
        [dismissible]="false"
      >
        <div
          style="margin-top:0.5rem;display:grid;grid-template-columns:repeat(auto-fit,minmax(9rem,1fr));gap:0.75rem"
        >
          <div
            style="display:flex;flex-direction:column;gap:0.2rem;padding:0.75rem;border-radius:0.75rem;background:color-mix(in srgb, currentColor 7%, transparent)"
          >
            <span style="font-size:0.75rem;opacity:0.8">Archived last week</span>
            <span style="font-size:0.9375rem;font-weight:600">148 assets</span>
          </div>
          <div
            style="display:flex;flex-direction:column;gap:0.2rem;padding:0.75rem;border-radius:0.75rem;background:color-mix(in srgb, currentColor 7%, transparent)"
          >
            <span style="font-size:0.75rem;opacity:0.8">Recovered space</span>
            <span style="font-size:0.9375rem;font-weight:600">12.6 GB</span>
          </div>
        </div>

        <div slot="actions" style="display:flex;flex-wrap:wrap;gap:0.5rem">
          <ui-button type="button" variant="primary" appearance="outline">Open policy</ui-button>
          <ui-button type="button" variant="secondary" appearance="outline"
            >Export report</ui-button
          >
        </div>
      </ui-message-bar>
    </div>
  `,
})
export class MessageBarRichContentExampleComponent {}
