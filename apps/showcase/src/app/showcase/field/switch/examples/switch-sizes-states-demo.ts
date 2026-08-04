import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SwitchComponent } from 'ui';

@Component({
  selector: 'app-switch-sizes-states-example',
  standalone: true,
  imports: [FormsModule, SwitchComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:36rem">
      <div style="display:flex;flex-direction:column;gap:0.75rem">
        <ui-switch
          label="Compact density"
          size="small"
          [(ngModel)]="compactValue"
          [ngModelOptions]="{ standalone: true }"
        />

        <ui-switch
          label="Default density"
          size="medium"
          [(ngModel)]="defaultValue"
          [ngModelOptions]="{ standalone: true }"
        />

        <ui-switch
          label="Prominent density"
          size="large"
          [(ngModel)]="prominentValue"
          [ngModelOptions]="{ standalone: true }"
        />
      </div>

      <div
        style="display:grid;grid-template-columns:repeat(auto-fit,minmax(14rem,1fr));gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <ui-switch label="Disabled off" [disabled]="true" [ngModel]="false" />
        <ui-switch label="Disabled on" [disabled]="true" [ngModel]="true" />
        <ui-switch label="Readonly on" [readonly]="true" [ngModel]="true" />
        <ui-switch label="Readonly off" [readonly]="true" [ngModel]="false" />
      </div>
    </div>
  `,
})
export class SwitchSizesStatesExampleComponent {
  protected compactValue = false;
  protected defaultValue = true;
  protected prominentValue = true;
}
