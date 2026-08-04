import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, SelectComponent, type SelectItem } from 'ui';

const channelItems: SelectItem[] = [
  { value: 'email', label: 'Email', icon: 'mail' },
  { value: 'teams', label: 'Teams', icon: 'chat' },
  { value: 'sms', label: 'SMS', icon: 'phone' },
  { value: 'push', label: 'Push', icon: 'alert' },
  { value: 'slack', label: 'Slack', icon: 'send' },
];

@Component({
  selector: 'app-select-multi-example',
  imports: [FormsModule, ButtonComponent, SelectComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:30rem">
      <ui-select
        label="Notification channels"
        placeholder="Select one or more channels"
        helpText="Multi mode keeps the list open and shows selected labels as comma-separated text in the trigger."
        [items]="channelItems"
        mode="multi"
        [searchable]="true"
        [clearable]="true"
        [(ngModel)]="selectedChannels"
        [ngModelOptions]="{ standalone: true }"
      />

      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;justify-content:space-between;padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem">
          <span
            style="font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
          >
            Selected
          </span>
          <strong
            style="font-size:0.9375rem;font-weight:600;color:var(--color-neutral-foreground-rest)"
          >
            {{ selectedChannelLabels }}
          </strong>
        </div>

        <ui-button
          type="button"
          variant="secondary"
          appearance="outline"
          (click)="resetSelection()"
        >
          Reset
        </ui-button>
      </div>
    </div>
  `,
})
export class SelectMultiExampleComponent {
  protected readonly channelItems = channelItems;
  protected selectedChannels: Array<string | number> = ['email', 'teams'];

  protected get selectedChannelLabels(): string {
    const selected = this.channelItems
      .filter(item => this.selectedChannels.includes(item.value))
      .map(item => item.label);

    return selected.length > 0 ? selected.join(', ') : 'None';
  }

  protected resetSelection(): void {
    this.selectedChannels = [];
  }
}
