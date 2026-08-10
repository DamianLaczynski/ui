import { Component, computed, signal, ChangeDetectionStrategy } from '@angular/core';
import { PaginationComponent, PaginationConfig } from 'lui';

@Component({
  selector: 'app-pagination-page-size-example',
  standalone: true,
  imports: [PaginationComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:44rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="display:flex;flex-direction:column;gap:0.25rem">
        <div style="font-size:0.9375rem;font-weight:600">Results explorer</div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Let users change page size when they need to trade scan speed against row density.
        </div>
      </div>

      <ui-pagination
        [config]="paginationConfig()"
        (pageChange)="currentPage.set($event)"
        (pageSizeChange)="onPageSizeChange($event)"
      />

      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.125rem;min-width:8rem">
          <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">Page</span>
          <strong>{{ currentPage() }}</strong>
        </div>
        <div style="display:flex;flex-direction:column;gap:0.125rem;min-width:8rem">
          <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)"
            >Per page</span
          >
          <strong>{{ pageSize() }}</strong>
        </div>
        <div style="display:flex;flex-direction:column;gap:0.125rem;min-width:8rem">
          <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)"
            >Total pages</span
          >
          <strong>{{ totalPages() }}</strong>
        </div>
      </div>
    </div>
  `,
})
export class PaginationPageSizeExampleComponent {
  protected readonly currentPage = signal(1);
  protected readonly pageSize = signal(20);
  private readonly totalItems = 486;

  protected readonly totalPages = computed(() => Math.ceil(this.totalItems / this.pageSize()));

  protected readonly paginationConfig = computed<PaginationConfig>(() => ({
    currentPage: this.currentPage(),
    totalPages: this.totalPages(),
    totalItems: this.totalItems,
    pageSize: this.pageSize(),
    showPageNumbers: true,
    maxVisiblePages: 7,
    showFirstLast: true,
    showInfo: true,
    showPageSizeSelector: true,
    pageSizeOptions: [10, 20, 50, 100],
  }));

  protected onPageSizeChange(size: number): void {
    this.pageSize.set(size);
    this.currentPage.set(1);
  }
}
