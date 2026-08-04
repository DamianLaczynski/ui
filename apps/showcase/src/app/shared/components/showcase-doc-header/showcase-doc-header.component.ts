import { Component, computed, input, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, MenuComponent, MenuItem } from 'ui';

@Component({
  selector: 'app-showcase-doc-header',
  standalone: true,
  imports: [ButtonComponent, MenuComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <header class="showcase-doc__header">
      <div class="showcase-doc__header-top">
        <h1 class="showcase-doc__title">{{ title() }}</h1>
        @if (markdownAssetPath()) {
          <ui-menu
            triggerVariant="split"
            icon="copy"
            variant="secondary"
            appearance="outline"
            text="Copy Markdown"
            [menuItems]="copyMenuItems()"
            (primaryClick)="copyMarkdown()"
          />
        } @else {
          <ui-button icon="copy" variant="secondary" appearance="outline" (click)="copyMarkdown()"
            >Copy Markdown</ui-button
          >
        }
      </div>
      <p class="showcase-doc__description">{{ description() }}</p>
    </header>
  `,
})
export class ShowcaseDocHeaderComponent {
  title = input.required<string>();
  description = input.required<string>();
  markdown = input.required<string>();
  markdownAssetPath = input<string>('');

  readonly copyMenuItems = computed<MenuItem[]>(() => {
    if (!this.markdownAssetPath()) return [];
    return [
      {
        id: 'copy-markdown-static-link',
        label: 'Copy Markdown link to static file',
        icon: 'link',
        action: () => void this.copyMarkdownLinkToStaticFile(),
      },
    ];
  });

  async copyMarkdown(): Promise<void> {
    await this.copy(this.markdown());
  }

  private async copyMarkdownLinkToStaticFile(): Promise<void> {
    const path = this.markdownAssetPath();
    if (!path) return;
    const href = typeof window !== 'undefined' ? new URL(path, window.location.origin).href : path;
    await this.copy(`${href}`);
  }

  private async copy(value: string): Promise<void> {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
    } catch {}
  }
}
