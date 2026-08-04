import { Component, computed, input, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent } from 'ui';
import { highlightTypeScript } from '@shared/utils/showcase/code-highlight.util';

@Component({
  selector: 'app-showcase-feature-section',
  standalone: true,
  imports: [ButtonComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <section class="showcase-doc__example" [id]="id()">
      <div class="showcase-doc__example-header">
        <div>
          <h2 class="showcase-doc__example-title">{{ title() }}</h2>
          <p class="showcase-doc__example-description">{{ description() }}</p>
        </div>
      </div>

      <div class="showcase-doc__example-preview">
        <ng-content />
      </div>

      <div
        class="showcase-doc__example-code"
        [class.showcase-doc__example-code--expanded]="expanded()"
      >
        <div class="showcase-doc__example-code-actions">
          <ui-button
            variant="secondary"
            appearance="outline"
            [icon]="expanded() ? 'arrow_minimize' : 'arrow_maximize'"
            [ariaLabel]="expanded() ? 'Collapse code' : 'Expand code'"
            (click)="toggleExpanded()"
          />
          <ui-button
            variant="secondary"
            appearance="outline"
            [icon]="copied() ? 'checkmark' : 'copy'"
            [ariaLabel]="copied() ? 'Copied' : 'Copy code'"
            (click)="copyCode()"
          />
        </div>
        <div class="showcase-doc__example-code-scroll">
          <pre><code [innerHTML]="highlightedCode()"></code></pre>
        </div>
      </div>
    </section>
  `,
})
export class ShowcaseFeatureSectionComponent {
  id = input.required<string>();
  title = input.required<string>();
  description = input.required<string>();
  code = input.required<string>();

  copied = signal(false);
  expanded = signal(false);
  highlightedCode = computed(() => highlightTypeScript(this.code()));

  toggleExpanded(): void {
    this.expanded.update(value => !value);
  }

  async copyCode(): Promise<void> {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      return;
    }

    try {
      await navigator.clipboard.writeText(this.code());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1800);
    } catch {}
  }
}
