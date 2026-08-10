import { Component, signal, viewChild, ChangeDetectionStrategy } from '@angular/core';
import { delay, of } from 'rxjs';
import {
  ButtonComponent,
  ScrollContainerComponent,
  type Node,
  type ScrollContainerDataSource,
} from 'lui';

interface ProgrammaticItem {
  id: number;
  label: string;
  icon: Node['icon'];
}

@Component({
  selector: 'app-scroll-container-programmatic-demo',
  standalone: true,
  imports: [ButtonComponent, ScrollContainerComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:30rem">
      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <ui-button variant="secondary" appearance="outline" size="small" (click)="scrollToTop()"
          >Scroll to top</ui-button
        >
        <ui-button variant="secondary" appearance="outline" size="small" (click)="scrollToBottom()"
          >Scroll to bottom</ui-button
        >
        <ui-button variant="secondary" appearance="outline" size="small" (click)="refresh()"
          >Refresh</ui-button
        >
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
          >Status: <strong>{{ status() }}</strong></span
        >
      </div>

      <div
        style="border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest);padding:0.5rem"
      >
        <ui-scroll-container
          #container
          [dataSource]="dataSource"
          [pageSize]="10"
          maxHeight="22rem"
          nodeSize="small"
          appearance="subtle"
        />
      </div>
    </div>
  `,
})
export class ScrollContainerProgrammaticDemoComponent {
  protected readonly container = viewChild<ScrollContainerComponent<ProgrammaticItem>>('container');
  protected readonly status = signal('idle');

  protected readonly dataSource: ScrollContainerDataSource<ProgrammaticItem> = (page, pageSize) => {
    const start = (page - 1) * pageSize + 1;
    const items = Array.from({ length: pageSize }, (_, index) => ({
      id: start + index,
      label: `Log line ${start + index}`,
      icon: (index % 2 === 0 ? 'document' : 'text_bullet_list_ltr') as Node['icon'],
    }));

    return of({
      items,
      hasNextPage: page < 6,
      hasPreviousPage: page > 1,
      totalCount: 60,
    }).pipe(delay(150));
  };

  protected scrollToTop(): void {
    this.container()?.scrollToTop();
    this.status.set('Scrolled to top');
  }

  protected scrollToBottom(): void {
    this.container()?.scrollToBottom();
    this.status.set('Scrolled to bottom');
  }

  protected refresh(): void {
    this.container()?.refresh();
    this.status.set('Refreshed data source');
  }
}
