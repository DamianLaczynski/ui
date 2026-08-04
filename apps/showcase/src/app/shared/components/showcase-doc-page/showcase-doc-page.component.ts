import { NgComponentOutlet } from '@angular/common';
import { Component, computed, inject, input, signal, ChangeDetectionStrategy } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { toObservable } from '@angular/core/rxjs-interop';
import { Tab, TableOfContentComponent, TabsComponent } from 'ui';
import { ShowcaseDocAssetService } from '@shared/services/showcase-doc-asset.service';
import { highlightTypeScript } from '@shared/utils/showcase/code-highlight.util';
import { switchMap } from 'rxjs/operators';
import { ShowcaseDocHeaderComponent } from '../showcase-doc-header/showcase-doc-header.component';
import { ShowcaseFeatureSectionComponent } from '../showcase-feature-section/showcase-feature-section.component';
import {
  ShowcaseDocAccessibilityBlock,
  ShowcaseDocApiBlock,
  ShowcaseDocApiColumnKind,
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig,
} from './showcase-doc-page.models';

@Component({
  selector: 'app-showcase-doc-page',
  standalone: true,
  imports: [
    NgComponentOutlet,
    TabsComponent,
    TableOfContentComponent,
    ShowcaseDocHeaderComponent,
    ShowcaseFeatureSectionComponent,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div class="showcase-doc-layout showcase-doc-layout--with-toc">
      @for (tocTabId of [activeTabId()]; track tocTabId) {
        <ui-table-of-content
          headingSelector="h2, h3, h4, h5, h6"
          ignoreWithinSelector=".showcase-doc__example-preview"
          variant="primary"
          appearance="subtle"
          [sticky]="true"
          [offsetTop]="20"
          [containerSelector]="'.' + config().containerClass"
          [minLevel]="1"
          [maxLevel]="3"
        />
      }
      <div class="showcase-doc-layout__content">
        <div class="showcase-doc" [class]="'showcase-doc ' + config().containerClass">
          <app-showcase-doc-header
            [title]="config().title"
            [description]="config().description"
            [markdown]="pageMarkdown()"
            [markdownAssetPath]="assetPaths().markdown"
          />

          <div class="showcase-doc__page-tabs showcase-doc__page-tabs--full">
            <ui-tabs
              [tabs]="pageTabs"
              [selectedTabId]="activeTabId()"
              [fullWidth]="true"
              size="large"
              [variant]="'primary'"
              appearance="subtle"
              (selectedTabIdChange)="activeTabId.set($event)"
            />
          </div>

          @if (activeTabId() === 'features') {
            <section class="showcase-doc__import-section" id="import">
              <h2 class="showcase-doc__section-title">Import</h2>
              <div class="showcase-doc__import-code">
                <pre><code [innerHTML]="highlightedImportCode()"></code></pre>
              </div>
            </section>

            @for (feature of config().featureSections; track feature.id) {
              <app-showcase-feature-section
                [id]="feature.id"
                [title]="feature.title"
                [description]="feature.description"
                [code]="featureCode(feature.codeKey)"
              >
                <ng-container *ngComponentOutlet="feature.component" />
              </app-showcase-feature-section>
            }
            @if (config().accessibility.length) {
              <section class="showcase-doc__import-section" id="accessibility">
                <h2 class="showcase-doc__section-title">Accessibility</h2>

                @for (block of config().accessibility; track block.title) {
                  <h3 class="showcase-doc__api-subheading">{{ block.title }}</h3>
                  <div class="showcase-doc__section-description">
                    @for (part of accessibilityParts(block); track $index) {
                      @if (part.type === 'html') {
                        <p [innerHTML]="formatAccessibilityHtml(part.content)"></p>
                      } @else {
                        <div class="showcase-doc__api-table-wrap">
                          <table class="showcase-doc__api-table">
                            <thead>
                              <tr>
                                @for (header of part.headers; track header) {
                                  <th>{{ header }}</th>
                                }
                              </tr>
                            </thead>
                            <tbody>
                              @for (row of part.rows; track $index) {
                                <tr>
                                  @for (cell of row; track $index; let cellIndex = $index) {
                                    <td>
                                      @if (cellIndex === 0) {
                                        <code class="showcase-doc__api-code">{{ cell }}</code>
                                      } @else {
                                        <span>{{ cell }}</span>
                                      }
                                    </td>
                                  }
                                </tr>
                              }
                            </tbody>
                          </table>
                        </div>
                      }
                    }
                  </div>
                }
              </section>
            }
          } @else {
            <section class="showcase-doc__api">
              <h2 class="showcase-doc__section-title">API reference</h2>
              <div class="showcase-doc__import-code">
                <pre><code [innerHTML]="highlightedImportCode()"></code></pre>
              </div>

              @for (section of config().apiSections; track section.title) {
                <h3 class="showcase-doc__api-subheading" [innerHTML]="section.title"></h3>

                @if (section.lead) {
                  <p
                    class="showcase-doc__section-description showcase-doc__section-description--lead"
                    [innerHTML]="section.lead"
                  ></p>
                }

                @for (block of section.blocks; track $index) {
                  @switch (block.type) {
                    @case ('table') {
                      <h4 class="showcase-doc__api-subheading showcase-doc__api-subheading--nested">
                        {{ block.title }}
                      </h4>
                      <div class="showcase-doc__api-table-wrap">
                        <table class="showcase-doc__api-table">
                          <thead>
                            <tr>
                              @for (column of block.columns; track column) {
                                <th>{{ column }}</th>
                              }
                            </tr>
                          </thead>
                          <tbody>
                            @for (row of block.rows; track $index) {
                              <tr>
                                @for (cell of row; track $index; let cellIndex = $index) {
                                  <td
                                    [class.showcase-doc__api-desc-cell]="
                                      isDescCell(block, cellIndex)
                                    "
                                  >
                                    @switch (columnKind(block, cellIndex)) {
                                      @case ('code') {
                                        <code class="showcase-doc__api-code">{{ cell }}</code>
                                      }
                                      @case ('type') {
                                        <span class="showcase-doc__api-type">{{ cell }}</span>
                                      }
                                      @case ('default') {
                                        @if (cell !== null) {
                                          <code class="showcase-doc__api-default">{{ cell }}</code>
                                        } @else {
                                          <span
                                            class="showcase-doc__api-default showcase-doc__api-default--empty"
                                            >-</span
                                          >
                                        }
                                      }
                                      @default {
                                        <span [innerHTML]="cell ?? ''"></span>
                                      }
                                    }
                                  </td>
                                }
                              </tr>
                            }
                          </tbody>
                        </table>
                      </div>
                    }
                    @case ('notes') {
                      <div class="showcase-doc__api-notes">
                        @for (paragraph of block.paragraphs; track $index) {
                          <p [innerHTML]="paragraph"></p>
                        }
                      </div>
                    }
                    @case ('list') {
                      <h4 class="showcase-doc__api-subheading showcase-doc__api-subheading--nested">
                        {{ block.title }}
                      </h4>
                      <ul class="showcase-doc__api-related">
                        @for (item of block.items; track $index) {
                          <li [innerHTML]="item"></li>
                        }
                      </ul>
                    }
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
export class ShowcaseDocPageComponent {
  private readonly docAssets = inject(ShowcaseDocAssetService);

  readonly config = input.required<ShowcaseDocPageConfig>();
  readonly assetPaths = input.required<ShowcaseDocAssetPaths>();

  private readonly docs = toSignal(
    toObservable(this.assetPaths).pipe(
      switchMap(assetPaths => this.docAssets.loadMany(assetPaths)),
    ),
    {
      initialValue: { markdown: '' },
    },
  );

  readonly pageTabs: Tab[] = [
    { id: 'features', label: 'FEATURES' },
    { id: 'api', label: 'API' },
  ];

  readonly activeTabId = signal<string | number>('features');
  readonly pageMarkdown = computed(() => (this.docs().markdown ?? '').trim());
  readonly highlightedImportCode = computed(() => highlightTypeScript(this.config().importCode));

  featureCode(key: string): string {
    const docs = this.docs() as Record<string, string | undefined>;
    return (docs[key] ?? '').trim();
  }

  columnKind(block: ShowcaseDocApiBlock, index: number): ShowcaseDocApiColumnKind {
    return block.type === 'table' ? (block.columnKinds[index] ?? 'text') : 'text';
  }

  isDescCell(block: ShowcaseDocApiBlock, index: number): boolean {
    return block.type === 'table' && index === block.columns.length - 1;
  }

  accessibilityParts(
    block: ShowcaseDocAccessibilityBlock,
  ): Array<
    { type: 'html'; content: string } | { type: 'table'; headers: string[]; rows: string[][] }
  > {
    const segments = block.body.split('\n\n');
    return segments.map(segment => {
      const lines = segment.trim().split('\n');
      if (lines.length >= 2 && lines[0].includes('|') && lines[1].includes('---')) {
        const headers = lines[0]
          .split('|')
          .map(part => part.trim())
          .filter(Boolean);
        const rows = lines.slice(2).map(line =>
          line
            .split('|')
            .map(part => part.trim())
            .filter(Boolean),
        );
        return { type: 'table' as const, headers, rows };
      }

      return { type: 'html' as const, content: segment };
    });
  }

  formatAccessibilityHtml(content: string): string {
    const escaped = content
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;');

    return escaped
      .replace(/`([^`]+)`/g, '<code class="showcase-doc__api-code">$1</code>')
      .replaceAll('\n', '<br />');
  }
}
