import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, ToastComponent } from 'lui';

@Component({
  selector: 'app-toast-sizes-example',
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
        size="small"
        variant="primary"
        title="Small"
        message="Compact spacing."
        [(visible)]="vSmall"
      />
      <ui-toast
        size="medium"
        variant="primary"
        title="Medium"
        message="Default density."
        [(visible)]="vMedium"
      />
      <ui-toast
        size="large"
        variant="primary"
        title="Large"
        message="Prominent feedback."
        [(visible)]="vLarge"
      />
    </div>
  `,
})
export class ToastSizesExampleComponent {
  vSmall = true;
  vMedium = true;
  vLarge = true;

  reset(): void {
    this.vSmall = this.vMedium = this.vLarge = true;
  }
}
