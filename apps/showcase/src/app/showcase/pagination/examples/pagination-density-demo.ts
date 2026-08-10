import { Component, computed, signal, ChangeDetectionStrategy } from '@angular/core';
import { PaginationComponent, PaginationConfig } from 'lui';

@Component({
  selector: 'app-pagination-density-example',
  standalone: true,
  imports: [PaginationComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:42rem">
      <div style="display:flex;flex-direction:column;gap:0.5rem">
        <div style="font-size:0.875rem;color:var(--color-neutral-foreground2-rest)">
          Small works in dense tables, medium is the default for most views, and large is better
          when pagination needs more touch room.
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:0.875rem">
        <ui-pagination [config]="config()" size="small" (pageChange)="currentPage.set($event)" />
        <ui-pagination [config]="config()" size="medium" (pageChange)="currentPage.set($event)" />
        <ui-pagination [config]="config()" size="large" (pageChange)="currentPage.set($event)" />
      </div>
    </div>
  `,
})
export class PaginationDensityExampleComponent {
  protected readonly currentPage = signal(4);

  protected readonly config = computed<PaginationConfig>(() => ({
    currentPage: this.currentPage(),
    totalPages: 14,
    totalItems: 280,
    pageSize: 20,
    showPageNumbers: true,
    maxVisiblePages: 5,
    showFirstLast: false,
    showInfo: false,
    showPageSizeSelector: false,
  }));
}
