import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UrlComponent } from 'ui';

@Component({
  selector: 'app-url-states-demo',
  standalone: true,
  imports: [FormsModule, UrlComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%">
      <div style="flex:1 1 16rem;min-width:15rem">
        <ui-url
          label="Readonly canonical URL"
          [readonly]="true"
          [(ngModel)]="readonlyUrl"
          [ngModelOptions]="{ standalone: true }"
          helpText="Useful when the link is visible here but managed somewhere else."
        />
      </div>

      <div style="flex:1 1 16rem;min-width:15rem">
        <ui-url
          label="Disabled public page"
          [disabled]="true"
          placeholder="https://example.com"
          helpText="Disabled removes interaction entirely."
        />
      </div>

      <div style="flex:1 1 16rem;min-width:15rem">
        <ui-url
          label="Inline format check"
          [(ngModel)]="draftUrl"
          [ngModelOptions]="{ standalone: true }"
          [errorText]="draftError"
          helpText="Example: https://product.example.com"
        />
      </div>
    </div>
  `,
})
export class UrlStatesDemoComponent {
  protected readonlyUrl = 'https://contoso.com/support/status';
  protected draftUrl = 'example';

  protected get draftError(): string {
    if (!this.draftUrl) {
      return '';
    }
    return /^https?:\/\//i.test(this.draftUrl) ? '' : 'Include http:// or https://.';
  }
}
