import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { delay, of } from 'rxjs';
import {
  ButtonComponent,
  ScrollContainerComponent,
  type Node,
  type ScrollContainerDataSource,
} from 'ui';

interface SelectionItem {
  id: number;
  label: string;
  icon: Node['icon'];
  meta: string;
}

@Component({
  selector: 'app-scroll-container-selection-demo',
  standalone: true,
  imports: [ButtonComponent, ScrollContainerComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:30rem">
      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <ui-button variant="secondary" appearance="outline" (click)="clear()"
          >Clear selection</ui-button
        >
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
          >Selected: <strong>{{ selectedLabel() || 'none' }}</strong></span
        >
      </div>

      <div
        style="border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest);padding:0.5rem"
      >
        <ui-scroll-container
          [dataSource]="dataSource"
          [pageSize]="12"
          maxHeight="24rem"
          nodeSize="medium"
          appearance="filled"
          shape="rounded"
          [showSelectionIndicator]="true"
          indicatorPosition="horizontal"
          (itemSelect)="selectedLabel.set($event.item.label)"
        />
      </div>
    </div>
  `,
})
export class ScrollContainerSelectionDemoComponent {
  protected readonly selectedLabel = signal('');

  protected readonly dataSource: ScrollContainerDataSource<SelectionItem> = (page, pageSize) => {
    const start = (page - 1) * pageSize + 1;
    const items = Array.from({ length: pageSize }, (_, index) => ({
      id: start + index,
      label: `Inbox thread ${start + index}`,
      icon: (index % 3 === 0 ? 'mail' : 'chat') as Node['icon'],
      meta: index % 2 === 0 ? 'Unread' : 'Updated today',
    }));

    return of({
      items,
      hasNextPage: page < 4,
      hasPreviousPage: page > 1,
      totalCount: 48,
    }).pipe(delay(220));
  };

  protected clear(): void {
    this.selectedLabel.set('');
  }
}
