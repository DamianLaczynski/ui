import { Component, computed, signal, ChangeDetectionStrategy } from '@angular/core';
import { PaginationComponent, PaginationConfig } from 'ui';

@Component({
  selector: 'app-pagination-windowing-example',
  standalone: true,
  imports: [PaginationComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:40rem">
      <div
        style="display:flex;flex-direction:column;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="font-size:0.875rem;color:var(--color-neutral-foreground2-rest)">
          Use a shorter visible window and ellipsis compression when the dataset is large enough
          that showing every page button would become noise.
        </div>
        <ui-pagination [config]="compactWindowConfig()" (pageChange)="currentPage.set($event)" />
      </div>

      <div
        style="display:flex;flex-direction:column;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="font-size:0.875rem;color:var(--color-neutral-foreground2-rest)">
          A wider window is useful when pagination is one of the primary exploration controls in a
          data-heavy screen.
        </div>
        <ui-pagination [config]="wideWindowConfig()" (pageChange)="currentPage.set($event)" />
      </div>
    </div>
  `,
})
export class PaginationWindowingExampleComponent {
  protected readonly currentPage = signal(18);

  private readonly baseConfig: PaginationConfig = {
    currentPage: 18,
    totalPages: 48,
    totalItems: 960,
    pageSize: 20,
    showPageNumbers: true,
    maxVisiblePages: 5,
    showFirstLast: false,
    showInfo: true,
    showPageSizeSelector: false,
  };

  protected readonly compactWindowConfig = computed<PaginationConfig>(() => ({
    ...this.baseConfig,
    currentPage: this.currentPage(),
    maxVisiblePages: 5,
  }));

  protected readonly wideWindowConfig = computed<PaginationConfig>(() => ({
    ...this.baseConfig,
    currentPage: this.currentPage(),
    maxVisiblePages: 6,
  }));
}
