import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, MessageBarComponent, TagComponent, WeekComponent } from 'lui';

@Component({
  selector: 'app-week-planning-panel-demo',
  standalone: true,
  imports: [FormsModule, ButtonComponent, MessageBarComponent, TagComponent, WeekComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(18rem,1fr));gap:1rem;align-items:start;max-width:46rem"
    >
      <div
        style="display:flex;flex-direction:column;gap:1rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem">
          <div style="font-size:0.9375rem;font-weight:600">Launch preparation</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Weeks are useful when planning releases, reporting cycles, and recurring operational
            work.
          </div>
        </div>

        <ui-week
          label="Go-live week"
          placeholder="Select week"
          displayFormat="week-year"
          [(ngModel)]="week"
          [ngModelOptions]="{ standalone: true }"
        />

        <ui-message-bar
          title="Release note"
          message="The selected week should match the deployment and communication timeline."
          variant="info"
          appearance="subtle"
          [dismissible]="false"
        />
      </div>

      <div
        style="display:flex;flex-direction:column;gap:0.875rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-wrap:wrap;gap:0.5rem">
          <ui-tag text="Operations" appearance="filled" variant="secondary" />
          <ui-tag text="Weekly cadence" appearance="subtle" variant="info" />
          <ui-tag text="Ready to schedule" appearance="subtle" variant="success" />
        </div>

        <div style="display:flex;flex-direction:column;gap:0.375rem">
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Selected week
          </div>
          <div style="font-size:0.9375rem;font-weight:600">{{ week || 'Not selected' }}</div>
        </div>

        <div
          style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
        >
          <ui-button type="button" variant="primary">Create plan</ui-button>
          <ui-button type="button" appearance="subtle" (click)="week = ''">Reset</ui-button>
        </div>
      </div>
    </div>
  `,
})
export class WeekPlanningPanelDemoComponent {
  protected week = '2026-W25';
}
