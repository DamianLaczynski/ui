import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, LoadingStateComponent } from 'ui';

@Component({
  selector: 'app-loading-state-list-overlay-demo',
  standalone: true,
  imports: [ButtonComponent, LoadingStateComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:42rem">
      <div style="display:flex;justify-content:flex-start">
        <ui-button variant="secondary" appearance="outline" size="small" (click)="toggleLoading()">
          {{ isLoading() ? 'Stop loading' : 'Reload list' }}
        </ui-button>
      </div>

      <ui-loading-state
        [overlay]="true"
        [isLoading]="isLoading()"
        [blurContent]="false"
        title="Loading records"
        spinnerSize="small"
        size="small"
      >
        <div
          style="display:grid;gap:0.5rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
        >
          <div
            style="display:flex;justify-content:space-between;gap:1rem;padding:0.75rem 0.875rem;border-radius:0.75rem;background:var(--color-neutral-background2-rest)"
          >
            <span>Quarterly report</span>
            <span style="color:var(--color-neutral-foreground2-rest)">Ready</span>
          </div>
          <div
            style="display:flex;justify-content:space-between;gap:1rem;padding:0.75rem 0.875rem;border-radius:0.75rem;background:var(--color-neutral-background2-rest)"
          >
            <span>Customer import</span>
            <span style="color:var(--color-neutral-foreground2-rest)">Pending</span>
          </div>
          <div
            style="display:flex;justify-content:space-between;gap:1rem;padding:0.75rem 0.875rem;border-radius:0.75rem;background:var(--color-neutral-background2-rest)"
          >
            <span>Review queue</span>
            <span style="color:var(--color-neutral-foreground2-rest)">3 items</span>
          </div>
        </div>
      </ui-loading-state>
    </div>
  `,
})
export class LoadingStateListOverlayDemoComponent {
  protected readonly isLoading = signal(true);

  protected toggleLoading(): void {
    this.isLoading.update(value => !value);
  }
}
