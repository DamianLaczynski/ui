import { Component, ChangeDetectionStrategy } from '@angular/core';
import { delay, of } from 'rxjs';
import { ScrollContainerComponent, type ScrollContainerDataSource } from 'ui';

interface TemplateItem {
  id: number;
  label: string;
  description: string;
  status: string;
}

@Component({
  selector: 'app-scroll-container-custom-template-demo',
  standalone: true,
  imports: [ScrollContainerComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:34rem">
      <div style="font-size:0.875rem;line-height:1.5;color:var(--color-neutral-foreground2-rest)">
        Use a custom row template when each item needs more metadata than a plain node row, but keep
        the layout compact enough to scroll comfortably.
      </div>

      <div
        style="border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest);padding:0.5rem"
      >
        <ui-scroll-container
          [dataSource]="dataSource"
          [pageSize]="8"
          maxHeight="24rem"
          [useNodeComponent]="false"
        >
          <ng-template #itemTemplate let-item>
            <div
              style="display:flex;align-items:flex-start;justify-content:space-between;gap:0.75rem;padding:0.875rem 1rem;border-bottom:1px solid var(--color-neutral-stroke-rest)"
            >
              <div style="display:flex;flex-direction:column;gap:0.1875rem;min-width:0">
                <div
                  style="font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"
                >
                  {{ item.label }}
                </div>
                <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
                  {{ item.description }}
                </div>
              </div>
              <div
                style="flex:0 0 auto;padding:0.1875rem 0.5rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:999px;background:var(--color-neutral-background2-rest);font-size:0.75rem;color:var(--color-neutral-foreground2-rest)"
              >
                {{ item.status }}
              </div>
            </div>
          </ng-template>
        </ui-scroll-container>
      </div>
    </div>
  `,
})
export class ScrollContainerCustomTemplateDemoComponent {
  protected readonly dataSource: ScrollContainerDataSource<TemplateItem> = (page, pageSize) => {
    const start = (page - 1) * pageSize + 1;
    const items = Array.from({ length: pageSize }, (_, index) => ({
      id: start + index,
      label: `Deployment note ${start + index}`,
      description: 'Short contextual metadata fits well in a denser audit or activity stream.',
      status: index % 2 === 0 ? 'Updated' : 'Review',
    }));

    return of({
      items,
      hasNextPage: page < 3,
      hasPreviousPage: page > 1,
      totalCount: 24,
    }).pipe(delay(260));
  };
}
