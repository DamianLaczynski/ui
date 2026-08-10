import { Component, computed, signal, ChangeDetectionStrategy } from '@angular/core';
import { PaginationComponent, PaginationConfig } from 'lui';

type ResultRow = {
  title: string;
  owner: string;
  status: string;
};

const allRows: ResultRow[] = Array.from({ length: 57 }, (_, index) => ({
  title: `Quarterly report ${index + 1}`,
  owner: ['Ava Lopez', 'Nina Woods', 'Theo Murphy'][index % 3],
  status: ['Ready', 'Needs review', 'Draft'][index % 3],
}));

@Component({
  selector: 'app-pagination-results-layout-example',
  standalone: true,
  imports: [PaginationComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:46rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:flex-end;justify-content:space-between"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem">
          <div style="font-size:0.9375rem;font-weight:600">Reports</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Pair pagination with a real list so users can see scan rhythm, item count, and page
            changes in context.
          </div>
        </div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          {{ visibleRows().length }} rows on this page
        </div>
      </div>

      <div
        style="display:flex;flex-direction:column;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.875rem;overflow:hidden"
      >
        @for (row of visibleRows(); track row.title) {
          <div
            style="display:flex;flex-wrap:wrap;gap:0.5rem 1rem;align-items:center;justify-content:space-between;padding:0.875rem 1rem;background:var(--color-neutral-background-rest);border-bottom:1px solid color-mix(in srgb,var(--color-neutral-stroke-rest) 65%,transparent)"
          >
            <div style="display:flex;flex-direction:column;gap:0.125rem;min-width:12rem">
              <strong style="font-size:0.875rem">{{ row.title }}</strong>
              <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">
                {{ row.owner }}
              </span>
            </div>
            <span
              style="padding:0.125rem 0.5rem;border-radius:999px;background:var(--color-neutral-background3-rest);font-size:0.75rem;color:var(--color-neutral-foreground2-rest)"
            >
              {{ row.status }}
            </span>
          </div>
        }
      </div>

      <ui-pagination
        [config]="paginationConfig()"
        (pageChange)="currentPage.set($event)"
        (pageSizeChange)="onPageSizeChange($event)"
      />
    </div>
  `,
})
export class PaginationResultsLayoutExampleComponent {
  protected readonly currentPage = signal(2);
  protected readonly pageSize = signal(10);
  private readonly rows = allRows;

  protected readonly totalPages = computed(() => Math.ceil(this.rows.length / this.pageSize()));

  protected readonly visibleRows = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.rows.slice(start, start + this.pageSize());
  });

  protected readonly paginationConfig = computed<PaginationConfig>(() => ({
    currentPage: this.currentPage(),
    totalPages: this.totalPages(),
    totalItems: this.rows.length,
    pageSize: this.pageSize(),
    showPageNumbers: true,
    maxVisiblePages: 5,
    showFirstLast: true,
    showInfo: true,
    showPageSizeSelector: true,
    pageSizeOptions: [10, 20, 50],
  }));

  protected onPageSizeChange(size: number): void {
    this.pageSize.set(size);
    this.currentPage.set(1);
  }
}
