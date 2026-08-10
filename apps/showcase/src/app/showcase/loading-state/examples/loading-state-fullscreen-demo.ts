import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, LoadingStateComponent } from 'lui';

@Component({
  selector: 'app-loading-state-fullscreen-demo',
  standalone: true,
  imports: [ButtonComponent, LoadingStateComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:52rem"
    >
      <div
        style="flex:1 1 18rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <p
          style="margin:0 0 0.75rem;font-size:0.875rem;line-height:1.5;color:var(--color-neutral-foreground2-rest)"
        >
          Use fullscreen loading only for blocking transitions such as app bootstrap, secure
          redirects, or major workspace switches.
        </p>
        <ui-button variant="primary" (click)="showDemo()">Show fullscreen loading</ui-button>
      </div>

      <div
        style="flex:1 1 16rem;padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <div style="display:grid;gap:0.5rem;font-size:0.875rem;line-height:1.5">
          <div>Keep the message short and reassuring.</div>
          <div>Avoid fullscreen loading for small inline refreshes.</div>
        </div>
      </div>
    </div>

    @if (showOverlay()) {
      <ui-loading-state
        [overlay]="true"
        [fullScreen]="true"
        title="Switching workspace"
        description="Preparing your environment and restoring recent context."
        size="large"
        spinnerSize="large"
      />
    }
  `,
})
export class LoadingStateFullscreenDemoComponent {
  protected readonly showOverlay = signal(false);

  protected showDemo(): void {
    this.showOverlay.set(true);
    setTimeout(() => this.showOverlay.set(false), 2200);
  }
}
