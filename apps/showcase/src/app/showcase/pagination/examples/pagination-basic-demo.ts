import { Component, computed, signal, ChangeDetectionStrategy } from '@angular/core';
import { PaginationComponent, PaginationConfig } from 'lui';

@Component({
  selector: 'app-pagination-basic-example',
  standalone: true,
  imports: [PaginationComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:44rem"
    >
      <div style="flex:1 1 22rem;min-width:18rem">
        <ui-pagination [config]="paginationConfig()" (pageChange)="currentPage.set($event)" />
      </div>

      <div
        style="min-width:13rem;padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <p
          style="margin:0 0 0.5rem;font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
        >
          State
        </p>
        <div
          style="display:flex;flex-direction:column;gap:0.375rem;font-size:0.875rem;line-height:1.4"
        >
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Current page</span>
            <strong>{{ currentPage() }}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Total pages</span>
            <strong>{{ config.totalPages }}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Total items</span>
            <strong>{{ config.totalItems }}</strong>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class PaginationBasicExampleComponent {
  protected readonly currentPage = signal(3);

  protected readonly config: PaginationConfig = {
    currentPage: 3,
    totalPages: 12,
    totalItems: 234,
    pageSize: 20,
    showPageNumbers: true,
    maxVisiblePages: 7,
    showFirstLast: false,
    showInfo: true,
    showPageSizeSelector: false,
  };

  protected readonly paginationConfig = computed<PaginationConfig>(() => ({
    ...this.config,
    currentPage: this.currentPage(),
  }));
}
