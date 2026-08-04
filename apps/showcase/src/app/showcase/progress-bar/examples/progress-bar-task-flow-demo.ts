import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, ProgressBarComponent } from 'ui';

@Component({
  selector: 'app-progress-bar-task-flow-example',
  standalone: true,
  imports: [ButtonComponent, ProgressBarComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:38rem">
      <div
        style="display:flex;flex-direction:column;gap:0.875rem;padding:1rem 1.125rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div
          style="display:flex;justify-content:space-between;gap:1rem;align-items:flex-start;flex-wrap:wrap"
        >
          <div style="display:flex;flex-direction:column;gap:0.25rem">
            <div style="font-size:0.9375rem;font-weight:600">Workspace migration</div>
            <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
              {{ statusText() }}
            </div>
          </div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            {{ currentStepLabel() }}
          </div>
        </div>

        <ui-progress-bar
          [variant]="currentVariant()"
          [type]="currentType()"
          [value]="currentValue()"
          size="large"
          ariaLabel="Workspace migration"
          [ariaValueText]="currentAriaValueText()"
        />

        <div
          style="display:grid;grid-template-columns:repeat(auto-fit,minmax(9rem,1fr));gap:0.75rem"
        >
          @for (step of steps; track step.label) {
            <div
              style="display:flex;flex-direction:column;gap:0.2rem;padding:0.75rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem"
            >
              <div style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">
                {{ step.label }}
              </div>
              <div style="font-size:0.875rem;font-weight:600">{{ step.value }}</div>
            </div>
          }
        </div>

        <div
          style="display:flex;flex-wrap:wrap;gap:0.5rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
        >
          <ui-button type="button" variant="secondary" appearance="outline" (click)="reset()">
            Reset
          </ui-button>
          <ui-button
            type="button"
            variant="primary"
            (click)="advance()"
            [disabled]="state() === 'done'"
          >
            Advance
          </ui-button>
          <ui-button
            type="button"
            variant="danger"
            appearance="outline"
            (click)="fail()"
            [disabled]="state() === 'failed'"
          >
            Mark failed
          </ui-button>
        </div>
      </div>
    </div>
  `,
})
export class ProgressBarTaskFlowExampleComponent {
  protected readonly state = signal<'queued' | 'running' | 'verifying' | 'done' | 'failed'>(
    'queued',
  );

  protected readonly steps = [
    { label: 'Content', value: '124 files' },
    { label: 'Permissions', value: '18 groups' },
    { label: 'Verification', value: 'Pending' },
  ];

  protected readonly statusText = () => {
    switch (this.state()) {
      case 'queued':
        return 'Queued and waiting for a migration slot.';
      case 'running':
        return 'Files are moving to the new workspace.';
      case 'verifying':
        return 'Migration finished. Running permission and link checks.';
      case 'done':
        return 'Migration completed successfully.';
      case 'failed':
        return 'Migration stopped. Review logs before retrying.';
    }
  };

  protected readonly currentStepLabel = () => {
    switch (this.state()) {
      case 'queued':
        return 'Step 1 of 3';
      case 'running':
        return 'Step 2 of 3';
      case 'verifying':
        return 'Step 3 of 3';
      case 'done':
        return 'Completed';
      case 'failed':
        return 'Attention needed';
    }
  };

  protected readonly currentType = () =>
    this.state() === 'queued' ? 'indeterminate' : 'determinate';

  protected readonly currentVariant = () => {
    switch (this.state()) {
      case 'done':
        return 'success';
      case 'failed':
        return 'danger';
      case 'verifying':
        return 'info';
      default:
        return 'primary';
    }
  };

  protected readonly currentValue = () => {
    switch (this.state()) {
      case 'queued':
        return 0;
      case 'running':
        return 52;
      case 'verifying':
        return 88;
      case 'done':
        return 100;
      case 'failed':
        return 52;
    }
  };

  protected readonly currentAriaValueText = () => {
    switch (this.state()) {
      case 'queued':
        return 'Waiting to start';
      case 'running':
        return 'Step 2 of 3, 52 percent complete';
      case 'verifying':
        return 'Step 3 of 3, verification in progress';
      case 'done':
        return 'Migration completed';
      case 'failed':
        return 'Migration failed during transfer';
    }
  };

  protected advance(): void {
    switch (this.state()) {
      case 'queued':
        this.state.set('running');
        break;
      case 'running':
        this.state.set('verifying');
        break;
      case 'verifying':
        this.state.set('done');
        break;
      default:
        break;
    }
  }

  protected fail(): void {
    this.state.set('failed');
  }

  protected reset(): void {
    this.state.set('queued');
  }
}
