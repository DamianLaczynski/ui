import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, UrlComponent } from 'ui';

@Component({
  selector: 'app-url-link-panel-demo',
  standalone: true,
  imports: [ButtonComponent, FormsModule, UrlComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:42rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="display:flex;flex-direction:column;gap:0.375rem">
        <div style="font-size:1rem;font-weight:600">Share destination panel</div>
        <div
          style="font-size:0.875rem;color:var(--color-neutral-foreground2-rest);line-height:1.45"
        >
          A realistic URL surface combines the destination field, context about where the link will
          be used, and immediate next-step actions.
        </div>
      </div>

      <ui-url
        label="Destination URL"
        placeholder="https://launch.example.com"
        [(ngModel)]="destinationUrl"
        [ngModelOptions]="{ standalone: true }"
        helpText="This link will be shared in the release announcement."
      />

      <div
        style="display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <ui-button type="button" variant="primary">Save link</ui-button>
        <ui-button
          type="button"
          variant="secondary"
          appearance="outline"
          (click)="destinationUrl = ''"
        >
          Clear
        </ui-button>
      </div>
    </div>
  `,
})
export class UrlLinkPanelDemoComponent {
  protected destinationUrl = 'https://launch.example.com/2026/spring';
}
