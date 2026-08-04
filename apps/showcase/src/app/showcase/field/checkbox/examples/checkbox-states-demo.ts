import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from 'ui';

@Component({
  selector: 'app-checkbox-states-example',
  standalone: true,
  imports: [FormsModule, CheckboxComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:36rem">
      <div
        style="display:grid;grid-template-columns:repeat(auto-fit,minmax(14rem,1fr));gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <ui-checkbox label="Disabled unchecked" [disabled]="true" [ngModel]="false" />
        <ui-checkbox label="Disabled checked" [disabled]="true" [ngModel]="true" />
        <ui-checkbox label="Readonly checked" [readonly]="true" [ngModel]="true" />
        <ui-checkbox
          label="Required confirmation"
          [required]="true"
          [(ngModel)]="requiredValue"
          [ngModelOptions]="{ standalone: true }"
        />
      </div>

      <div
        style="display:flex;flex-direction:column;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="font-size:0.875rem;font-weight:600">Partial selection</div>
        <ui-checkbox
          label="Select all project notifications"
          [(ngModel)]="masterValue"
          [(indeterminate)]="masterIndeterminate"
          [ngModelOptions]="{ standalone: true }"
        />
        <div style="display:flex;flex-direction:column;gap:0.5rem;padding-left:1.5rem">
          <ui-checkbox
            label="Critical incidents"
            [(ngModel)]="criticalValue"
            [ngModelOptions]="{ standalone: true }"
            (change)="syncMasterState()"
          />
          <ui-checkbox
            label="Billing alerts"
            [(ngModel)]="billingValue"
            [ngModelOptions]="{ standalone: true }"
            (change)="syncMasterState()"
          />
        </div>
      </div>
    </div>
  `,
})
export class CheckboxStatesExampleComponent {
  protected requiredValue = false;
  protected masterValue = false;
  protected masterIndeterminate = true;
  protected criticalValue = true;
  protected billingValue = false;

  protected syncMasterState(): void {
    const selectedCount = Number(this.criticalValue) + Number(this.billingValue);

    if (selectedCount === 0) {
      this.masterIndeterminate = false;
      this.masterValue = false;
      return;
    }

    if (selectedCount === 2) {
      this.masterIndeterminate = false;
      this.masterValue = true;
      return;
    }

    this.masterValue = false;
    this.masterIndeterminate = true;
  }
}
