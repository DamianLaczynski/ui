import { RouterLink } from '@angular/router';
import { Component, computed, input, signal, ChangeDetectionStrategy } from '@angular/core';
import { BadgeComponent, ButtonComponent, TableOfContentComponent, type Variant } from 'ui';
import { highlightTypeScript } from '@shared/utils/showcase/code-highlight.util';
import {
  GuideDocCardStatusTone,
  GuideDocCodeBlock,
  GuideDocPageConfig,
} from './guide-doc-page.models';
import { guideConfigToMarkdown } from './guide-doc-markdown.util';
import { ShowcaseDocHeaderComponent } from '../showcase-doc-header/showcase-doc-header.component';

@Component({
  selector: 'app-guide-doc-page',
  standalone: true,
  imports: [
    RouterLink,
    BadgeComponent,
    ButtonComponent,
    TableOfContentComponent,
    ShowcaseDocHeaderComponent,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div class="showcase-doc-layout showcase-doc-layout--with-toc">
      <ui-table-of-content
        headingSelector="h2, h3, h4, h5, h6"
        variant="primary"
        appearance="subtle"
        [sticky]="true"
        [offsetTop]="20"
        [containerSelector]="'.' + config().containerClass"
        [minLevel]="1"
        [maxLevel]="3"
      />

      <div class="showcase-doc-layout__content">
        <div class="showcase-doc" [class]="'showcase-doc ' + config().containerClass">
          <app-showcase-doc-header
            [title]="config().title"
            [description]="config().description"
            [markdown]="pageMarkdown()"
            [markdownAssetPath]="config().markdownAssetPath ?? ''"
          />

          @for (section of config().sections; track section.id) {
            <section class="showcase-doc__import-section" [id]="section.id">
              <h2 class="showcase-doc__section-title">{{ section.title }}</h2>

              @if (section.description) {
                <p
                  class="showcase-doc__section-description"
                  [innerHTML]="formatRichText(section.description)"
                ></p>
              }

              @for (block of section.blocks; track $index) {
                @switch (block.type) {
                  @case ('paragraph') {
                    <p
                      class="showcase-doc__section-description"
                      [innerHTML]="formatRichText(block.content)"
                    ></p>
                  }
                  @case ('list') {
                    <ul class="showcase-doc__api-related">
                      @for (item of block.items; track item) {
                        <li [innerHTML]="formatRichText(item)"></li>
                      }
                    </ul>
                  }
                  @case ('note') {
                    <div class="showcase-doc__api-notes">
                      <p [innerHTML]="formatRichText(block.content)"></p>
                    </div>
                  }
                  @case ('code') {
                    <div class="showcase-doc__example-code showcase-doc__example-code--expanded">
                      <div class="showcase-doc__example-code-actions">
                        <ui-button
                          variant="secondary"
                          appearance="outline"
                          [icon]="
                            copiedBlockId() === codeBlockId(section.id, $index)
                              ? 'checkmark'
                              : 'copy'
                          "
                          [ariaLabel]="
                            copiedBlockId() === codeBlockId(section.id, $index)
                              ? 'Copied'
                              : 'Copy code'
                          "
                          (click)="copyCode(codeBlockId(section.id, $index), block.code)"
                        />
                      </div>
                      <div class="showcase-doc__example-code-scroll">
                        <pre><code [innerHTML]="highlightCode(block)"></code></pre>
                      </div>
                    </div>
                  }
                  @case ('cards') {
                    <div
                      class="showcase-doc__guide-stack"
                      [class.showcase-doc__guide-grid]="block.layout === 'grid'"
                      [class.showcase-doc__guide-grid--large]="block.layout === 'grid'"
                    >
                      @for (card of block.cards; track card.id) {
                        <article class="showcase-doc__guide-card">
                          @if (card.eyebrow || card.statusLabel) {
                            <div class="showcase-doc__guide-item-head">
                              @if (card.eyebrow) {
                                <p class="showcase-doc__guide-meta">{{ card.eyebrow }}</p>
                              }
                              @if (card.statusLabel) {
                                <span class="showcase-doc__guide-status-wrap">
                                  <ui-badge
                                    [text]="card.statusLabel"
                                    [variant]="guideCardBadgeVariant(card.statusTone)"
                                    appearance="tint"
                                    size="small"
                                    shape="circular"
                                  />
                                </span>
                              }
                            </div>
                          }

                          <h3>{{ card.title }}</h3>

                          @if (card.description) {
                            <p [innerHTML]="formatRichText(card.description)"></p>
                          }

                          @if (card.code) {
                            <pre class="showcase-doc__guide-code"><code>{{ card.code }}</code></pre>
                          }

                          @if (card.items?.length) {
                            <ul class="showcase-doc__guide-list">
                              @for (item of card.items; track item) {
                                <li [innerHTML]="formatRichText(item)"></li>
                              }
                            </ul>
                          }
                        </article>
                      }
                    </div>
                  }
                  @case ('links') {
                    <div class="showcase-doc__guide-grid showcase-doc__guide-grid--large">
                      @for (link of block.links; track link.id) {
                        <a class="showcase-doc__guide-card-link" [routerLink]="link.routerLink">
                          <h3>{{ link.title }}</h3>
                          <p>{{ link.description }}</p>
                        </a>
                      }
                    </div>
                  }
                }
              }
            </section>
          }
        </div>
      </div>
    </div>
  `,
})
export class GuideDocPageComponent {
  readonly config = input.required<GuideDocPageConfig>();

  readonly copiedBlockId = signal<string | null>(null);

  guideCardBadgeVariant(tone: GuideDocCardStatusTone | undefined): Variant {
    switch (tone ?? 'planned') {
      case 'shipped':
        return 'success';
      case 'in-progress':
        return 'warning';
      default:
        return 'primary';
    }
  }

  readonly pageMarkdown = computed(() => guideConfigToMarkdown(this.config()));

  codeBlockId(sectionId: string, index: number): string {
    return `${sectionId}-code-${index}`;
  }

  highlightCode(block: GuideDocCodeBlock): string {
    return highlightTypeScript(block.code);
  }

  async copyCode(blockId: string, code: string): Promise<void> {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      return;
    }

    try {
      await navigator.clipboard.writeText(code);
      this.copiedBlockId.set(blockId);
      setTimeout(() => {
        if (this.copiedBlockId() === blockId) {
          this.copiedBlockId.set(null);
        }
      }, 1800);
    } catch {}
  }

  formatRichText(content: string): string {
    const escaped = content
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;');

    return escaped
      .replace(/`([^`]+)`/g, '<code class="showcase-doc__api-code">$1</code>')
      .replaceAll('\n', '<br />');
  }
}
