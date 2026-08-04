import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TelComponent } from 'ui';

@Component({
  selector: 'app-tel-basic-demo',
  standalone: true,
  imports: [FormsModule, TelComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%">
      <div
        style="flex:1 1 18rem;min-width:16rem;display:flex;flex-direction:column;gap:1rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem">
          <div style="font-size:0.9375rem;font-weight:600">Primary contact number</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Good default for account, customer, or workspace contact details.
          </div>
        </div>

        <ui-tel
          label="Phone number"
          placeholder="+1 (555) 123-4567"
          helpText="Use international format when the number may be called across regions."
        />
      </div>

      <div
        style="flex:1 1 18rem;min-width:16rem;display:flex;flex-direction:column;gap:1rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem">
          <div style="font-size:0.9375rem;font-weight:600">Editable current number</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Shows the built-in clear action when a value is already present.
          </div>
        </div>

        <ui-tel
          label="Support line"
          placeholder="+48 600 700 800"
          [(ngModel)]="supportLine"
          [ngModelOptions]="{ standalone: true }"
          helpText="Use clear to replace the number quickly."
        />
      </div>
    </div>
  `,
})
export class TelBasicDemoComponent {
  protected supportLine = '+48 600 700 800';
}
