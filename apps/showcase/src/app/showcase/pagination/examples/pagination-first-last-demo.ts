import { Component, computed, signal, ChangeDetectionStrategy } from '@angular/core';
import { PaginationComponent, PaginationConfig } from 'ui';

@Component({
  selector: 'app-pagination-first-last-example',
  standalone: true,
  imports: [PaginationComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:42rem">
      <ui-pagination
        [config]="withJumpConfig()"
        size="medium"
        (pageChange)="currentPage.set($event)"
      />

      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem;min-width:12rem">
          <span
            style="font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
          >
            Why use this
          </span>
          <span style="font-size:0.875rem;color:var(--color-neutral-foreground-rest)">
            Faster jumps make sense when users routinely move across distant pages, such as audit
            logs or archived records.
          </span>
        </div>
        <div style="display:flex;flex-direction:column;gap:0.25rem;min-width:8rem">
          <span
            style="font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
          >
            Current page
          </span>
          <strong style="font-size:0.9375rem">{{ currentPage() }}</strong>
        </div>
      </div>
    </div>
  `,
})
export class PaginationFirstLastExampleComponent {
  protected readonly currentPage = signal(27);

  private readonly config: PaginationConfig = {
    currentPage: 27,
    totalPages: 80,
    totalItems: 1600,
    pageSize: 20,
    showPageNumbers: true,
    maxVisiblePages: 7,
    showFirstLast: true,
    showInfo: true,
    showPageSizeSelector: false,
  };

  protected readonly withJumpConfig = computed<PaginationConfig>(() => ({
    ...this.config,
    currentPage: this.currentPage(),
  }));
}
