import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { delay, of } from 'rxjs';
import { ScrollContainerComponent, type ScrollContainerDataSource, type Node } from 'ui';

interface BasicItem {
  id: number;
  label: string;
  icon: Node['icon'];
}

@Component({
  selector: 'app-scroll-container-basic-demo',
  standalone: true,
  imports: [ScrollContainerComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:26rem">
      <div
        style="display:flex;flex-wrap:wrap;gap:1rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
          >Loaded pages: <strong>{{ loadedPages() }}</strong></span
        >
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
          >Last page size: <strong>{{ lastPageSize() }}</strong></span
        >
      </div>

      <div
        style="border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest);padding:0.5rem"
      >
        <ui-scroll-container
          [dataSource]="dataSource"
          [pageSize]="10"
          maxHeight="22rem"
          nodeSize="medium"
          appearance="subtle"
          shape="rounded"
          (loadMore)="onLoadMore($event.page, $event.items.length)"
        />
      </div>
    </div>
  `,
})
export class ScrollContainerBasicDemoComponent {
  protected readonly loadedPages = signal(1);
  protected readonly lastPageSize = signal(10);

  protected readonly dataSource: ScrollContainerDataSource<BasicItem> = (page, pageSize) => {
    const start = (page - 1) * pageSize + 1;
    const items = Array.from({ length: pageSize }, (_, index) => ({
      id: start + index,
      label: `Activity row ${start + index}`,
      icon: (index % 2 === 0 ? 'document' : 'clock') as Node['icon'],
    }));

    return of({
      items,
      hasNextPage: page < 5,
      hasPreviousPage: page > 1,
      totalCount: 50,
    }).pipe(delay(250));
  };

  protected onLoadMore(page: number, size: number): void {
    this.loadedPages.set(page);
    this.lastPageSize.set(size);
  }
}
