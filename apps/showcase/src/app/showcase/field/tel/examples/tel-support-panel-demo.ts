import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, TelComponent } from 'lui';

@Component({
  selector: 'app-tel-support-panel-demo',
  standalone: true,
  imports: [ButtonComponent, FormsModule, TelComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:42rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="display:flex;flex-direction:column;gap:0.375rem">
        <div style="font-size:1rem;font-weight:600">Callback request panel</div>
        <div
          style="font-size:0.875rem;color:var(--color-neutral-foreground2-rest);line-height:1.45"
        >
          A stronger end-to-end example: collect the preferred callback number, show service window
          context, and keep the next action nearby.
        </div>
      </div>

      <ui-tel
        label="Preferred callback number"
        placeholder="+44 20 7946 0958"
        [(ngModel)]="callbackNumber"
        [ngModelOptions]="{ standalone: true }"
        helpText="Support calls back Monday to Friday, 9:00-17:00 CET."
      />

      <div
        style="display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <ui-button type="button" variant="primary">Request callback</ui-button>
        <ui-button type="button" variant="secondary" appearance="outline"
          >Use account number</ui-button
        >
      </div>
    </div>
  `,
})
export class TelSupportPanelDemoComponent {
  protected callbackNumber = '+44 20 7946 0958';
}
