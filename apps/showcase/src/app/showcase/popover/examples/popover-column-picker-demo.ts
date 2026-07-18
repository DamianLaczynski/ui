import { Component, TemplateRef, computed, model, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, PopoverDirective, SwitchComponent } from 'ui';

type ColumnKey = 'region' | 'accounts' | 'mrr' | 'owner';

interface ColumnOption {
  key: ColumnKey;
  label: string;
  hint: string;
}

@Component({
  selector: 'app-popover-column-picker-demo',
  standalone: true,
  imports: [FormsModule, ButtonComponent, PopoverDirective, SwitchComponent],
  template: `
    <div
      style="display:flex;flex-direction:column;gap:0.75rem;width:100%;max-width:40rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;justify-content:space-between"
      >
        <div style="font-size:0.9375rem;font-weight:600">Revenue by region</div>
        <ui-button
          type="button"
          variant="secondary"
          appearance="outline"
          icon="table"
          [uiPopover]="columnsTpl"
          [(uiPopoverOpen)]="open"
          uiPopoverAriaLabel="Choose visible columns"
          uiPopoverPosition="bottom"
        >
          Columns ({{ visibleColumnCount() }})
        </ui-button>
      </div>

      <div
        style="overflow:auto;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem"
      >
        <table style="width:100%;border-collapse:collapse;font-size:0.8125rem">
          <thead>
            <tr style="background:var(--color-neutral-background2-rest);text-align:left">
              @if (columns.region) {
                <th style="padding:0.625rem 0.75rem">Region</th>
              }
              @if (columns.accounts) {
                <th style="padding:0.625rem 0.75rem">Accounts</th>
              }
              @if (columns.mrr) {
                <th style="padding:0.625rem 0.75rem">MRR</th>
              }
              @if (columns.owner) {
                <th style="padding:0.625rem 0.75rem">Owner</th>
              }
            </tr>
          </thead>
          <tbody>
            <tr>
              @if (columns.region) {
                <td
                  style="padding:0.625rem 0.75rem;border-top:1px solid var(--color-neutral-stroke-rest)"
                >
                  DACH
                </td>
              }
              @if (columns.accounts) {
                <td
                  style="padding:0.625rem 0.75rem;border-top:1px solid var(--color-neutral-stroke-rest)"
                >
                  42
                </td>
              }
              @if (columns.mrr) {
                <td
                  style="padding:0.625rem 0.75rem;border-top:1px solid var(--color-neutral-stroke-rest)"
                >
                  €128k
                </td>
              }
              @if (columns.owner) {
                <td
                  style="padding:0.625rem 0.75rem;border-top:1px solid var(--color-neutral-stroke-rest)"
                >
                  Morgan Kelly
                </td>
              }
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <ng-template #columnsTpl>
      <div class="popover-panel" style="min-width:17rem">
        <div class="popover-panel__header">
          <div class="popover-panel__title">Visible columns</div>
          <div class="popover-panel__description">
            Toggle columns on or off. At least one metric should stay visible.
          </div>
        </div>

        <div class="popover-panel__body">
          @for (option of columnOptions; track option.key) {
            <div style="display:flex;align-items:center;justify-content:space-between;gap:1rem">
              <ui-switch
                labelPosition="none"
                [ariaLabel]="'Show ' + option.label + ' column'"
                [(ngModel)]="draft[option.key]"
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
          <ui-button type="button" variant="secondary" appearance="subtle" (click)="resetDraft()">
            Reset
          </ui-button>
          <ui-button type="button" variant="primary" (click)="applyColumns()">Apply</ui-button>
        </div>
      </div>
    </ng-template>
  `,
})
export class PopoverColumnPickerDemoComponent {
  protected columnsTpl = viewChild.required<TemplateRef<unknown>>('columnsTpl');
  protected open = model(false);

  protected columns: Record<ColumnKey, boolean> = {
    region: true,
    accounts: true,
    mrr: true,
    owner: false,
  };

  protected draft: Record<ColumnKey, boolean> = { ...this.columns };

  protected readonly columnOptions: ColumnOption[] = [
    { key: 'region', label: 'Region', hint: 'Geography column' },
    { key: 'accounts', label: 'Accounts', hint: 'Active customer count' },
    { key: 'mrr', label: 'MRR', hint: 'Monthly recurring revenue' },
    { key: 'owner', label: 'Owner', hint: 'Account owner name' },
  ];

  protected visibleColumnCount = computed(() => Object.values(this.columns).filter(Boolean).length);

  protected resetDraft(): void {
    this.draft = { ...this.columns };
  }

  protected applyColumns(): void {
    this.columns = { ...this.draft };
    this.open.set(false);
  }
}
