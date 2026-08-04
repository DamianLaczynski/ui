import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { delay, of } from 'rxjs';
import {
  ButtonComponent,
  ScrollContainerComponent,
  type Node,
  type ScrollContainerDataSource,
} from 'ui';

interface EventItem {
  id: number;
  label: string;
  icon: Node['icon'];
}

@Component({
  selector: 'app-scroll-container-events-demo',
  standalone: true,
  imports: [ButtonComponent, ScrollContainerComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:30rem">
      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <ui-button variant="secondary" appearance="outline" (click)="reset()"
          >Reset counters</ui-button
        >
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
          >Load events: <strong>{{ loadMoreCount() }}</strong></span
        >
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
          >Complete: <strong>{{ completed() ? 'yes' : 'no' }}</strong></span
        >
      </div>

      <div
        style="border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest);padding:0.5rem"
      >
        <ui-scroll-container
          [dataSource]="dataSource"
          [pageSize]="6"
          maxHeight="20rem"
          nodeSize="medium"
          appearance="subtle"
          (loadMore)="onLoadMore()"
          (loadComplete)="completed.set(true)"
        />
      </div>
    </div>
  `,
})
export class ScrollContainerEventsDemoComponent {
  protected readonly loadMoreCount = signal(0);
  protected readonly completed = signal(false);

  protected readonly dataSource: ScrollContainerDataSource<EventItem> = (page, pageSize) => {
    const start = (page - 1) * pageSize + 1;
    const items = Array.from({ length: pageSize }, (_, index) => ({
      id: start + index,
      label: `Background job ${start + index}`,
      icon: (index % 2 === 0 ? 'arrow_sync' : 'checkmark_circle') as Node['icon'],
    }));

    return of({
      items,
      hasNextPage: page < 3,
      hasPreviousPage: page > 1,
      totalCount: 18,
    }).pipe(delay(180));
  };

  protected reset(): void {
    this.loadMoreCount.set(0);
    this.completed.set(false);
  }

  protected onLoadMore(): void {
    this.loadMoreCount.update(count => count + 1);
  }
}
