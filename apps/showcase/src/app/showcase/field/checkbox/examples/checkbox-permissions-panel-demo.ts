import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent, CheckboxComponent } from 'lui';

@Component({
  selector: 'app-checkbox-permissions-panel-example',
  standalone: true,
  imports: [ButtonComponent, CheckboxComponent, FormsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:38rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="display:flex;flex-direction:column;gap:0.25rem">
        <div style="font-size:0.9375rem;font-weight:600">Workspace permissions</div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Configure what project coordinators can do without editing each permission separately.
        </div>
      </div>

      <ui-checkbox
        labelPosition="after"
        label="Project management access"
        [(ngModel)]="managementAccess"
        [(indeterminate)]="managementIndeterminate"
        [ngModelOptions]="{ standalone: true }"
        (change)="toggleManagementGroup()"
      />

      <form
        [formGroup]="permissionsForm"
        style="display:flex;flex-direction:column;gap:0.625rem;padding-left:1.5rem"
      >
        <ui-checkbox
          labelPosition="after"
          label="Create and archive projects"
          formControlName="projects"
          (change)="syncManagementState()"
        />
        <ui-checkbox
          labelPosition="after"
          label="Invite and remove members"
          formControlName="members"
          (change)="syncManagementState()"
        />
        <ui-checkbox
          labelPosition="after"
          label="Manage billing settings"
          formControlName="billing"
          (change)="syncManagementState()"
        />
      </form>

      <div
        style="display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <ui-button type="button" variant="primary">Save permissions</ui-button>
        <ui-button type="button" variant="secondary" appearance="outline">Cancel</ui-button>
      </div>

      <div
        style="padding:0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <p
          style="margin:0 0 0.5rem;font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
        >
          Values
        </p>
        <div
          style="display:flex;flex-direction:column;gap:0.45rem;font-size:0.875rem;line-height:1.4"
        >
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Management access</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
              managementIndeterminate ? 'Mixed' : managementAccess ? 'On' : 'Off'
            }}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Projects</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
              permissionsForm.controls.projects.getRawValue() ? 'On' : 'Off'
            }}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Members</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
              permissionsForm.controls.members.getRawValue() ? 'On' : 'Off'
            }}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Billing</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
              permissionsForm.controls.billing.getRawValue() ? 'On' : 'Off'
            }}</strong>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CheckboxPermissionsPanelExampleComponent {
  protected managementAccess = false;
  protected managementIndeterminate = true;

  protected readonly permissionsForm = new FormGroup({
    projects: new FormControl(true, { nonNullable: true }),
    members: new FormControl(false, { nonNullable: true }),
    billing: new FormControl(true, { nonNullable: true }),
  });

  protected toggleManagementGroup(): void {
    const nextValue = this.managementAccess;
    this.managementIndeterminate = false;
    this.permissionsForm.setValue({
      projects: nextValue,
      members: nextValue,
      billing: nextValue,
    });
  }

  protected syncManagementState(): void {
    const values = Object.values(this.permissionsForm.getRawValue());
    const selectedCount = values.filter(Boolean).length;

    if (selectedCount === 0) {
      this.managementAccess = false;
      this.managementIndeterminate = false;
      return;
    }

    if (selectedCount === values.length) {
      this.managementAccess = true;
      this.managementIndeterminate = false;
      return;
    }

    this.managementAccess = false;
    this.managementIndeterminate = true;
  }
}
