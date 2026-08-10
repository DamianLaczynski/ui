import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconComponent, SelectComponent, type SelectItem } from 'lui';

type EnvironmentItem = SelectItem & {
  data: {
    region: string;
    note: string;
  };
};

const environmentItems: EnvironmentItem[] = [
  {
    value: 'prod-eu',
    label: 'Production EU',
    icon: 'globe',
    data: { region: 'Frankfurt', note: 'Customer-facing traffic' },
  },
  {
    value: 'prod-us',
    label: 'Production US',
    icon: 'globe',
    data: { region: 'Virginia', note: 'Low-latency API edge' },
  },
  {
    value: 'stage',
    label: 'Staging',
    icon: 'beaker',
    data: { region: 'Shared cluster', note: 'Pre-release validation' },
  },
  {
    value: 'sandbox',
    label: 'Sandbox',
    icon: 'code',
    data: { region: 'Ephemeral', note: 'Safe experimentation' },
  },
];

@Component({
  selector: 'app-select-custom-template-example',
  imports: [FormsModule, SelectComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:46rem"
    >
      <div style="flex:1 1 20rem;min-width:18rem;max-width:26rem">
        <ui-select
          label="Deployment environment"
          placeholder="Choose environment"
          [items]="environmentItems"
          [clearable]="true"
          [(ngModel)]="selectedEnvironment"
          [ngModelOptions]="{ standalone: true }"
        >
          <ng-template #itemTemplate let-item let-selected="selected">
            <div
              style="display:flex;gap:0.5rem;width:100%;min-width:0;justify-content:space-between"
            >
              <div style="display:flex;gap:0.75rem;align-items:center;min-width:0">
                <ui-icon [icon]="item.icon || 'globe'" size="medium" />
                <div
                  style="display:flex;flex-direction:column;align-items:flex-start;gap:0.125rem;min-width:0"
                >
                  <span
                    style="font-weight:600;line-height:1.35;color:var(--color-neutral-foreground-rest)"
                  >
                    {{ item.label }}
                  </span>
                  <span
                    style="font-size:0.75rem;line-height:1.4;color:var(--color-neutral-foreground2-rest)"
                  >
                    {{ item.data.region }} · {{ item.data.note }}
                  </span>
                </div>
              </div>
              @if (selected) {
                <span
                  style="align-self:center;padding:0.125rem 0.5rem;border-radius:999px;background:var(--color-brand-background2-rest);color:var(--color-brand-foreground1-rest);font-size:0.75rem;font-weight:600"
                >
                  Selected
                </span>
              }
            </div>
          </ng-template>
        </ui-select>
      </div>

      <div
        style="min-width:14rem;padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <p
          style="margin:0 0 0.5rem;font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
        >
          Summary
        </p>
        <strong
          style="display:block;font-size:0.9375rem;font-weight:600;color:var(--color-neutral-foreground-rest)"
        >
          {{ selectedEnvironmentItem?.label || 'None' }}
        </strong>
        <p
          style="margin:0.35rem 0 0;font-size:0.75rem;line-height:1.4;color:var(--color-neutral-foreground2-rest)"
        >
          {{ selectedEnvironmentItem?.data?.region || 'No region selected' }}
        </p>
      </div>
    </div>
  `,
})
export class SelectCustomTemplateExampleComponent {
  protected readonly environmentItems = environmentItems;
  protected selectedEnvironment: string | number = 'prod-eu';

  protected get selectedEnvironmentItem(): EnvironmentItem | undefined {
    return this.environmentItems.find(item => item.value === this.selectedEnvironment);
  }
}
