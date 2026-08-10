import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, SwitchComponent } from 'lui';

@Component({
  selector: 'app-switch-helper-validation-example',
  standalone: true,
  imports: [FormsModule, ButtonComponent, SwitchComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <form
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:32rem"
      (ngSubmit)="submit()"
    >
      <ui-switch
        label="Allow production deploy"
        helpText="This enables direct deployment from the release checklist."
        [(ngModel)]="allowDeploy"
        [ngModelOptions]="{ standalone: true }"
      />

      <ui-switch
        label="I confirm I reviewed the rollback plan"
        [required]="true"
        [(errorText)]="confirmationError"
        [(ngModel)]="rollbackConfirmed"
        name="rollbackConfirmed"
      />

      <div
        style="display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <ui-button type="submit" variant="primary">Continue</ui-button>
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          {{ statusText }}
        </span>
      </div>
    </form>
  `,
})
export class SwitchHelperValidationExampleComponent {
  protected allowDeploy = true;
  protected rollbackConfirmed = false;
  protected confirmationError = '';
  protected statusText = 'Validation appears only when the confirmation is still missing.';

  protected submit(): void {
    if (!this.rollbackConfirmed) {
      this.confirmationError = 'Review confirmation is required before continuing.';
      this.statusText = 'Confirmation is still missing.';
      return;
    }

    this.confirmationError = '';
    this.statusText = 'Release checks are complete. The flow can continue.';
  }
}
