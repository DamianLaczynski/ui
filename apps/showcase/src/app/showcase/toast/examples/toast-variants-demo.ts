import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, ToastComponent } from 'lui';

@Component({
  selector: 'app-toast-variants-example',
  standalone: true,
  imports: [ButtonComponent, ToastComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:0.75rem;width:100%;max-width:28rem">
      <div
        style="display:flex;flex-wrap:wrap;align-items:center;gap:0.5rem;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <ui-button type="button" variant="secondary" appearance="outline" (click)="reset()"
          >Reset</ui-button
        >
      </div>
      <ui-toast
        variant="primary"
        title="Primary"
        message="Brand emphasis."
        [(visible)]="vPrimary"
      />
      <ui-toast
        variant="secondary"
        title="Secondary"
        message="Neutral supporting actions."
        [(visible)]="vSecondary"
      />
      <ui-toast variant="info" title="Info" message="Neutral context." [(visible)]="vInfo" />
      <ui-toast
        variant="success"
        title="Success"
        message="Operation completed."
        [(visible)]="vSuccess"
      />
      <ui-toast
        variant="warning"
        title="Warning"
        message="Review before continuing."
        [(visible)]="vWarning"
      />
      <ui-toast
        variant="danger"
        title="Error"
        message="Something went wrong."
        [(visible)]="vDanger"
      />
    </div>
  `,
})
export class ToastVariantsExampleComponent {
  vPrimary = true;
  vSecondary = true;
  vInfo = true;
  vSuccess = true;
  vWarning = true;
  vDanger = true;

  reset(): void {
    this.vPrimary =
      this.vSecondary =
      this.vInfo =
      this.vSuccess =
      this.vWarning =
      this.vDanger =
        true;
  }
}
