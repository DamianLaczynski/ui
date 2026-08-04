import { Component, computed, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonGroupComponent } from 'ui';

@Component({
  selector: 'app-radio-button-group-settings-panel-demo',
  standalone: true,
  imports: [ReactiveFormsModule, RadioButtonGroupComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:44rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="font-size:0.9375rem;font-weight:600">Publishing settings</div>

      <div
        style="display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));gap:1rem;width:100%"
      >
        <ui-radio-button-group
          label="Audience"
          [formControl]="settingsForm.controls.audience"
          [items]="audienceItems"
        />

        <ui-radio-button-group
          label="Review mode"
          [formControl]="settingsForm.controls.reviewMode"
          [items]="reviewModeItems"
          orientation="vertical"
        />
      </div>

      <div
        style="display:flex;flex-wrap:wrap;gap:1rem;align-items:center;padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
          >Audience: <strong>{{ summary().audience }}</strong></span
        >
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
          >Review: <strong>{{ summary().reviewMode }}</strong></span
        >
      </div>
    </div>
  `,
})
export class RadioButtonGroupSettingsPanelDemoComponent {
  protected readonly audienceItems = [
    { id: 'team', label: 'Team', value: 'team' },
    { id: 'clients', label: 'Clients', value: 'clients' },
    { id: 'public', label: 'Public', value: 'public' },
  ];

  protected readonly reviewModeItems = [
    { id: 'summary', label: 'Summary only', value: 'summary' },
    { id: 'inline', label: 'Inline comments', value: 'inline' },
    { id: 'strict', label: 'Strict approval', value: 'strict' },
  ];

  protected readonly settingsForm = new FormGroup({
    audience: new FormControl('team', { nonNullable: true }),
    reviewMode: new FormControl('inline', { nonNullable: true }),
  });

  protected readonly summary = computed(() => ({
    audience: this.settingsForm.controls.audience.getRawValue(),
    reviewMode: this.settingsForm.controls.reviewMode.getRawValue(),
  }));
}
