import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, MessageBarComponent, MonthComponent, TagComponent } from 'ui';

@Component({
  selector: 'app-month-reporting-panel-demo',
  standalone: true,
  imports: [FormsModule, ButtonComponent, MessageBarComponent, MonthComponent, TagComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(18rem,1fr));gap:1rem;align-items:start;max-width:46rem"
    >
      <div
        style="display:flex;flex-direction:column;gap:1rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem">
          <div style="font-size:0.9375rem;font-weight:600">Reporting cycle</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Month pickers are common in budgets, reporting cycles, and recurring planning workflows.
          </div>
        </div>

        <ui-month
          label="Report month"
          placeholder="YYYY-MM"
          [(ngModel)]="month"
          [ngModelOptions]="{ standalone: true }"
        />

        <ui-message-bar
          title="Submission note"
          message="The selected month drives budget aggregation and report ownership."
          variant="info"
          appearance="subtle"
          [dismissible]="false"
        />
      </div>

      <div
        style="display:flex;flex-direction:column;gap:0.875rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-wrap:wrap;gap:0.5rem">
          <ui-tag text="Finance" appearance="filled" variant="secondary" />
          <ui-tag text="Monthly cadence" appearance="subtle" variant="info" />
          <ui-tag text="Ready to review" appearance="subtle" variant="success" />
        </div>

        <div style="display:flex;flex-direction:column;gap:0.375rem">
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Selected month
          </div>
          <div style="font-size:0.9375rem;font-weight:600">{{ month || 'Not selected' }}</div>
        </div>

        <div
          style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
        >
          <ui-button type="button" variant="primary">Generate report</ui-button>
          <ui-button type="button" appearance="subtle" (click)="month = ''">Reset</ui-button>
        </div>
      </div>
    </div>
  `,
})
export class MonthReportingPanelDemoComponent {
  protected month = '2026-09';
}
