import { Component, TemplateRef, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, DividerComponent, PopoverDirective, SwitchComponent } from 'ui';

type FilterKey = 'open' | 'waiting' | 'escalated' | 'mine';

interface FilterOption {
  key: FilterKey;
  label: string;
  hint: string;
  grouped?: boolean;
}

@Component({
  selector: 'app-popover-filters-demo',
  standalone: true,
  imports: [FormsModule, ButtonComponent, DividerComponent, PopoverDirective, SwitchComponent],
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:42rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;justify-content:space-between"
      >
        <div>
          <div style="font-size:0.9375rem;font-weight:600">Customer issues</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            128 open tickets across billing, onboarding, and support queues.
          </div>
        </div>

        <ui-button
          type="button"
          variant="secondary"
          appearance="outline"
          icon="filter"
          [uiPopover]="filtersTpl"
          uiPopoverAriaLabel="Issue filters"
          uiPopoverPosition="bottom"
          uiPopoverSize="medium"
          [badge]="activeFilterCount() > 0 ? activeFilterCount().toString() : undefined"
          badgeVariant="primary"
        >
          Filters
        </ui-button>
      </div>

      <div style="display:flex;flex-wrap:wrap;gap:0.5rem">
        @for (chip of activeChips(); track chip) {
          <span
            style="padding:0.25rem 0.625rem;border-radius:999px;background:var(--color-neutral-background2-rest);font-size:0.75rem;color:var(--color-neutral-foreground2-rest)"
          >
            {{ chip }}
          </span>
        } @empty {
          <span style="font-size:0.8125rem;color:var(--color-neutral-foreground3-rest)">
            No filters applied yet.
          </span>
        }
      </div>
    </div>

    <ng-template #filtersTpl>
      <div class="popover-panel">
        <div class="popover-panel__header">
          <div class="popover-panel__title">Filter issues</div>
          <div class="popover-panel__description">
            Narrow the queue without leaving the board. Changes apply when you confirm.
          </div>
        </div>

        <div class="popover-panel__body">
          @for (option of filterOptions; track option.key) {
            @if (option.grouped) {
              <ui-divider />
            }
            <div style="display:flex;align-items:center;justify-content:space-between;gap:1rem">
              <ui-switch
                labelPosition="none"
                [ariaLabel]="'Filter by ' + option.label"
                [(ngModel)]="filters[option.key]"
                [ngModelOptions]="{ standalone: true }"
              />
              <div style="flex:1;min-width:0;text-align:right">
                <div style="font-size:0.875rem;font-weight:600">{{ option.label }}</div>
                <div style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">
                  {{ option.hint }}
                </div>
              </div>
            </div>
          }
        </div>

        <div class="popover-panel__footer">
          <ui-button type="button" variant="secondary" appearance="subtle" (click)="clearFilters()">
            Clear
          </ui-button>
          <ui-button type="button" variant="primary" (click)="applyFilters()"
            >Apply filters</ui-button
          >
        </div>
      </div>
    </ng-template>
  `,
})
export class PopoverFiltersDemoComponent {
  protected filtersTpl = viewChild.required<TemplateRef<unknown>>('filtersTpl');

  protected filters: Record<FilterKey, boolean> = {
    open: true,
    waiting: false,
    escalated: true,
    mine: false,
  };

  protected readonly filterOptions: FilterOption[] = [
    { key: 'open', label: 'Open', hint: 'Issues still in progress' },
    { key: 'waiting', label: 'Waiting on customer', hint: 'Blocked on customer reply' },
    { key: 'escalated', label: 'Escalated', hint: 'Raised to on-call queue' },
    { key: 'mine', label: 'Assigned to me', hint: 'Only tickets owned by you', grouped: true },
  ];

  protected applied = signal({ ...this.filters });

  protected activeFilterCount = signal(2);
  protected activeChips = signal<string[]>(['Open', 'Escalated']);

  protected clearFilters(): void {
    this.filters = { open: false, waiting: false, escalated: false, mine: false };
  }

  protected applyFilters(): void {
    this.applied.set({ ...this.filters });
    const chips: string[] = [];
    if (this.filters.open) chips.push('Open');
    if (this.filters.waiting) chips.push('Waiting on customer');
    if (this.filters.escalated) chips.push('Escalated');
    if (this.filters.mine) chips.push('Assigned to me');
    this.activeChips.set(chips);
    this.activeFilterCount.set(chips.length);
  }
}
