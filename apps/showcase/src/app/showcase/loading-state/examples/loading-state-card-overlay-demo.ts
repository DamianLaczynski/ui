import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, CardComponent, LoadingStateComponent } from 'lui';

@Component({
  selector: 'app-loading-state-card-overlay-demo',
  standalone: true,
  imports: [ButtonComponent, CardComponent, LoadingStateComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:34rem">
      <div style="display:flex;justify-content:flex-start">
        <ui-button variant="secondary" appearance="outline" size="small" (click)="toggleLoading()">
          {{ isLoading() ? 'Stop loading' : 'Show loading' }}
        </ui-button>
      </div>

      <ui-loading-state
        [overlay]="true"
        [isLoading]="isLoading()"
        [blurContent]="true"
        title="Refreshing card"
        description="Updating metrics and recent activity."
      >
        <ui-card appearance="filled" ariaLabel="Workspace summary">
          <div uiCardHeader><strong>Workspace summary</strong></div>
          <div uiCardBody style="display:flex;flex-direction:column;gap:0.5rem">
            <div>Active projects: 12</div>
            <div>Pending reviews: 4</div>
            <div>Last sync: 2 minutes ago</div>
          </div>
        </ui-card>
      </ui-loading-state>
    </div>
  `,
})
export class LoadingStateCardOverlayDemoComponent {
  protected readonly isLoading = signal(true);

  protected toggleLoading(): void {
    this.isLoading.update(value => !value);
  }
}
