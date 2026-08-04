import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, CardComponent } from 'ui';

@Component({
  selector: 'app-card-floating-actions-demo',
  standalone: true,
  imports: [ButtonComponent, CardComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(17rem,1fr));gap:1rem;width:100%;"
    >
      <ui-card [interactive]="true" ariaLabel="Card with floating quick action">
        <ui-button
          uiCardFloatingAction
          variant="secondary"
          appearance="subtle"
          icon="pin"
          [ariaLabel]="pinned() ? 'Unpin card' : 'Pin card'"
          (click)="togglePinned()"
        />

        <div
          uiCardPreview
          style="min-height:7.5rem;background:linear-gradient(135deg,#eef4ff 0%,#d3e3fb 100%);"
        ></div>

        <div uiCardHeader style="display:grid;gap:0.25rem;">
          <strong style="font-size:0.9375rem;">Floating utility action</strong>
          <span style="font-size:0.75rem;color:var(--color-neutral-foreground3-rest);">
            Keep the body clean when the action is secondary but should stay immediately visible
          </span>
        </div>

        <div uiCardBody>
          <p
            style="margin:0;font-size:0.875rem;line-height:1.5;color:var(--color-neutral-foreground2-rest);"
          >
            Pinned state:
            <strong style="color:var(--color-neutral-foreground-rest);">{{
              pinned() ? 'pinned' : 'not pinned'
            }}</strong>
          </p>
        </div>
      </ui-card>

      <ui-card ariaLabel="Card with projected preview and action rail">
        <ui-button
          uiCardFloatingAction
          variant="secondary"
          appearance="subtle"
          icon="more_horizontal"
          ariaLabel="More actions"
        />

        <div
          uiCardPreview
          style="display:grid;place-items:center;min-height:7.5rem;background:linear-gradient(135deg,#f7efe4 0%,#efd6b1 100%);font-size:0.8125rem;font-weight:600;color:var(--color-neutral-foreground2-rest);"
        >
          Preview slot
        </div>

        <div uiCardHeader style="display:grid;gap:0.25rem;">
          <strong style="font-size:0.9375rem;">Projected slots</strong>
          <span style="font-size:0.75rem;color:var(--color-neutral-foreground3-rest);"
            >uiCardPreview and uiCardFloatingAction adapt the same primitive to richer record
            layouts</span
          >
        </div>
      </ui-card>
    </div>
  `,
})
export class CardFloatingActionsDemoComponent {
  protected readonly pinned = signal(true);

  protected togglePinned(): void {
    this.pinned.update(value => !value);
  }
}
