import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, ToastComponent } from 'ui';

@Component({
  selector: 'app-toast-options-example',
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
        title="With progress"
        message="Auto-dismiss timeline shown when duration is set."
        [duration]="8000"
        [showProgress]="true"
        [(visible)]="vProgress"
      />
      <ui-toast
        variant="info"
        title="No icon"
        message="Icon hidden; variant colors remain."
        [showIcon]="false"
        [(visible)]="vNoIcon"
      />
      <ui-toast
        variant="info"
        title="Not dismissible"
        message="Close control hidden."
        [dismissible]="false"
        [showProgress]="false"
        [(visible)]="vNoDismiss"
      />
    </div>
  `,
})
export class ToastOptionsExampleComponent {
  vProgress = true;
  vNoIcon = true;
  vNoDismiss = true;

  reset(): void {
    this.vProgress = this.vNoIcon = this.vNoDismiss = true;
  }
}
