import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, ToastComponent } from 'lui';

@Component({
  selector: 'app-toast-appearance-example',
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
        variant="info"
        appearance="filled"
        title="Filled"
        message="Strongest surface emphasis."
        [(visible)]="vFilled"
      />
      <ui-toast
        variant="info"
        appearance="outline"
        title="Outline"
        message="Lighter chrome with a border."
        [(visible)]="vOutline"
      />
      <ui-toast
        variant="info"
        appearance="subtle"
        title="Subtle"
        message="Low contrast alongside dense UI."
        [(visible)]="vSubtle"
      />
      <ui-toast
        variant="info"
        appearance="tint"
        title="Tint"
        message="Tinted surface between filled and outline."
        [(visible)]="vTint"
      />
      <ui-toast
        variant="info"
        appearance="transparent"
        title="Transparent"
        message="Minimal chrome; relies on variant color tokens."
        [(visible)]="vTransparent"
      />
    </div>
  `,
})
export class ToastAppearanceExampleComponent {
  vFilled = true;
  vOutline = true;
  vSubtle = true;
  vTint = true;
  vTransparent = true;

  reset(): void {
    this.vFilled = this.vOutline = this.vSubtle = this.vTint = this.vTransparent = true;
  }
}
