import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { delay, of } from 'rxjs';
import {
  ButtonComponent,
  MessageBarComponent,
  ScrollContainerComponent,
  SearchComponent,
  type Node,
  type ScrollContainerDataSource,
} from 'lui';

interface InboxItem {
  id: number;
  label: string;
  icon: Node['icon'];
}

@Component({
  selector: 'app-scroll-container-inbox-panel-demo',
  standalone: true,
  imports: [ButtonComponent, MessageBarComponent, ScrollContainerComponent, SearchComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:34rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div
        style="display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:space-between;gap:1rem"
      >
        <div>
          <div style="font-size:0.9375rem;font-weight:600">Inbox panel</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            A scroll container often sits inside a real panel with search, status, and compact
            actions.
          </div>
        </div>
        <ui-button
          variant="secondary"
          appearance="outline"
          size="small"
          (click)="lastAction.set('Marked all as read')"
        >
          Mark all as read
        </ui-button>
      </div>

      <ui-message-bar
        variant="info"
        title="12 new updates"
        message="Scroll through recent reviews, mentions, and task activity."
        appearance="subtle"
      />

      <ui-search placeholder="Search messages" style="width:100%" />

      <div
        style="border:1px solid var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest);padding:0.5rem"
      >
        <ui-scroll-container
          [dataSource]="dataSource"
          [pageSize]="8"
          maxHeight="20rem"
          nodeSize="medium"
          appearance="subtle"
          shape="rounded"
          [asButton]="true"
          (itemClick)="lastAction.set($event.item.label)"
        />
      </div>

      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
          >Last action: <strong>{{ lastAction() || 'none' }}</strong></span
        >
      </div>
    </div>
  `,
})
export class ScrollContainerInboxPanelDemoComponent {
  protected readonly lastAction = signal('');

  protected readonly dataSource: ScrollContainerDataSource<InboxItem> = (page, pageSize) => {
    const start = (page - 1) * pageSize + 1;
    const items = Array.from({ length: pageSize }, (_, index) => ({
      id: start + index,
      label:
        index % 2 === 0
          ? `Review request ${start + index}`
          : `Mention from design ${start + index}`,
      icon: (index % 2 === 0 ? 'document' : 'mail') as Node['icon'],
    }));

    return of({
      items,
      hasNextPage: page < 4,
      hasPreviousPage: page > 1,
      totalCount: 32,
    }).pipe(delay(220));
  };
}
