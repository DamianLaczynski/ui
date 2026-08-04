import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  BadgeComponent,
  ButtonComponent,
  CheckboxComponent,
  MessageBarComponent,
  Step,
  StepperComponent,
  TextComponent,
} from 'ui';

@Component({
  selector: 'app-stepper-onboarding-wizard-example',
  standalone: true,
  imports: [
    FormsModule,
    BadgeComponent,
    ButtonComponent,
    CheckboxComponent,
    MessageBarComponent,
    StepperComponent,
    TextComponent,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="box-sizing:border-box;width:100%;max-width:44rem;min-width:0;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
    >
      <div style="display:flex;flex-direction:column;gap:1rem;min-width:0;width:100%">
        @if (showError()) {
          <div style="min-width:0;width:100%">
            <ui-message-bar
              variant="warning"
              appearance="tint"
              title="Workspace name required"
              message="This label appears in the sidebar and search. Enter at least two characters."
              [dismissible]="true"
              (dismiss)="showError.set(false)"
            />
          </div>
        }

        <div style="min-width:0;width:100%">
          <ui-stepper
            [steps]="steps()"
            [activeStepIndex]="active()"
            [linear]="true"
            [clickable]="true"
            [showDescriptions]="true"
            (stepChange)="active.set($event.index)"
          />
        </div>

        @switch (active()) {
          @case (0) {
            <div style="display:flex;flex-direction:column;gap:0.75rem;padding-top:0.25rem">
              <ui-text
                label="Workspace name"
                placeholder="Northwind logistics"
                [(ngModel)]="workspaceName"
                [ngModelOptions]="{ standalone: true }"
              />
              <ui-text
                label="URL slug"
                placeholder="northwind-log"
                [(ngModel)]="slug"
                [ngModelOptions]="{ standalone: true }"
              />
            </div>
          }
          @case (1) {
            <div style="display:flex;flex-direction:column;gap:0.75rem;padding-top:0.25rem">
              <ui-text
                label="Billing contact"
                placeholder="finance@example.com"
                [(ngModel)]="billingEmail"
                [ngModelOptions]="{ standalone: true }"
              />
              <ui-checkbox
                label="Allow members to invite guests without approval"
                [(ngModel)]="guestsOk"
                [ngModelOptions]="{ standalone: true }"
              />
            </div>
          }
          @case (2) {
            <div
              style="display:flex;flex-direction:column;gap:0.875rem;min-width:0;width:100%;max-width:32rem;padding-top:0.25rem"
            >
              <div style="display:flex;flex-direction:column;gap:0.2rem">
                <span style="font-size:0.9375rem;font-weight:600;line-height:1.3"
                  >Review before creating</span
                >
                <span
                  style="font-size:0.8125rem;line-height:1.45;color:var(--color-neutral-foreground2-rest)"
                  >These values will be applied to the new workspace.</span
                >
              </div>
              <div
                style="display:grid;grid-template-columns:repeat(auto-fit,minmax(11.25rem,1fr));gap:0.75rem"
              >
                <div
                  style="display:flex;flex-direction:column;gap:0.25rem;padding:0.875rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem;background:var(--color-neutral-background-rest);min-width:0"
                >
                  <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)"
                    >Workspace name</span
                  >
                  <span
                    style="font-size:0.9375rem;font-weight:600;line-height:1.35;word-break:break-word"
                    >{{ workspaceName || '—' }}</span
                  >
                </div>
                <div
                  style="display:flex;flex-direction:column;gap:0.25rem;padding:0.875rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem;background:var(--color-neutral-background-rest);min-width:0"
                >
                  <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)"
                    >URL slug</span
                  >
                  <span
                    style="font-weight:600;line-height:1.35;word-break:break-all;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:0.875rem"
                    >{{ slug || '—' }}</span
                  >
                </div>
                <div
                  style="display:flex;flex-direction:column;gap:0.25rem;padding:0.875rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem;background:var(--color-neutral-background-rest);min-width:0"
                >
                  <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)"
                    >Billing contact</span
                  >
                  <span
                    style="font-size:0.875rem;font-weight:600;line-height:1.35;word-break:break-word"
                    >{{ billingEmail || '—' }}</span
                  >
                </div>
                <div
                  style="display:flex;flex-direction:column;gap:0.4rem;padding:0.875rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem;background:var(--color-neutral-background-rest);min-width:0"
                >
                  <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)"
                    >Guest invites</span
                  >
                  <ui-badge
                    size="large"
                    appearance="outline"
                    [variant]="guestsOk ? 'success' : 'secondary'"
                    [text]="guestsOk ? 'Allowed' : 'Restricted'"
                  />
                </div>
              </div>
            </div>
          }
        }

        <div style="display:flex;flex-wrap:wrap;gap:0.5rem;padding-top:0.25rem">
          <ui-button type="button" variant="secondary" [disabled]="active() === 0" (click)="back()">
            Back
          </ui-button>
          @if (active() < 2) {
            <ui-button type="button" variant="primary" (click)="forward()">Continue</ui-button>
          } @else {
            <ui-button type="button" variant="primary" (click)="create()"
              >Create workspace</ui-button
            >
          }
        </div>
      </div>
    </div>
  `,
})
export class StepperOnboardingWizardExampleComponent {
  protected workspaceName = '';

  protected slug = '';

  protected billingEmail = '';

  protected guestsOk = false;

  protected readonly showError = signal(false);

  protected readonly steps = signal<Step[]>([
    { id: 'w', label: 'Workspace', description: 'Identity' },
    { id: 'p', label: 'People', description: 'Access' },
    { id: 'r', label: 'Review', description: 'Confirm' },
  ]);

  protected readonly active = signal(0);

  protected back(): void {
    this.showError.set(false);
    this.active.update(i => Math.max(0, i - 1));
  }

  protected forward(): void {
    const i = this.active();
    if (i === 0 && this.workspaceName.trim().length < 2) {
      this.showError.set(true);
      return;
    }
    this.showError.set(false);
    this.steps.update(prev => prev.map((s, idx) => (idx === i ? { ...s, completed: true } : s)));
    if (i < this.steps().length - 1) {
      this.active.set(i + 1);
    }
  }

  protected create(): void {
    this.workspaceName = '';
    this.slug = '';
    this.billingEmail = '';
    this.guestsOk = false;
    this.showError.set(false);
    this.active.set(0);
    this.steps.set([
      { id: 'w', label: 'Workspace', description: 'Identity' },
      { id: 'p', label: 'People', description: 'Access' },
      { id: 'r', label: 'Review', description: 'Confirm' },
    ]);
  }
}
