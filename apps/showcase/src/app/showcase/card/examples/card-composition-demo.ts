import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AvatarComponent, ButtonComponent, CardComponent } from 'ui';

@Component({
  selector: 'app-card-composition-demo',
  standalone: true,
  imports: [AvatarComponent, ButtonComponent, CardComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(17rem,1fr));gap:1rem;width:100%;"
    >
      <ui-card appearance="filled" [interactive]="true" ariaLabel="Product card">
        <div
          uiCardPreview
          style="min-height:9rem;background:radial-gradient(circle at 25% 20%,rgba(255,255,255,0.6),transparent 28%),linear-gradient(145deg,#edf5ff 0%,#c9dbf4 100%);"
        ></div>

        <div uiCardHeader style="display:grid;gap:0.25rem;">
          <strong style="font-size:1rem;line-height:1.35;">Noise-canceling headphones</strong>
          <span style="font-size:0.8125rem;color:var(--color-neutral-foreground3-rest);"
            >$249 · In stock</span
          >
        </div>

        <div uiCardBody style="display:grid;gap:0.75rem;">
          <p
            style="margin:0;font-size:0.875rem;line-height:1.5;color:var(--color-neutral-foreground2-rest);"
          >
            Keep commerce cards focused on product value, stock state, and one primary purchase
            action.
          </p>
        </div>

        <div uiCardFooter style="display:flex;gap:0.5rem;flex-wrap:wrap;">
          <ui-button variant="primary" appearance="filled">Add to cart</ui-button>
          <ui-button variant="secondary" appearance="outline">Compare</ui-button>
        </div>
      </ui-card>

      <ui-card appearance="filled-alternative" [interactive]="true" ariaLabel="Team member card">
        <div uiCardHeader style="display:flex;align-items:flex-start;gap:0.75rem;">
          <ui-avatar name="Adriana Nowak" variant="primary" appearance="filled" />
          <div style="display:grid;gap:0.25rem;min-width:0;flex:1;">
            <strong style="font-size:1rem;line-height:1.35;">Adriana Nowak</strong>
            <span style="font-size:0.8125rem;color:var(--color-neutral-foreground3-rest);"
              >Senior Product Designer</span
            >
          </div>
        </div>

        <div uiCardBody style="display:grid;gap:0.75rem;">
          <p
            style="margin:0;font-size:0.875rem;line-height:1.5;color:var(--color-neutral-foreground2-rest);"
          >
            Profile cards work best when they answer who this person is, what they own, and the next
            likely action.
          </p>
          <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
            <span
              style="padding:0.25rem 0.5rem;border-radius:999px;background:var(--color-neutral-background-rest);font-size:0.75rem;color:var(--color-neutral-foreground2-rest);"
            >
              Design systems
            </span>
            <span
              style="padding:0.25rem 0.5rem;border-radius:999px;background:var(--color-neutral-background-rest);font-size:0.75rem;color:var(--color-neutral-foreground2-rest);"
            >
              Research ops
            </span>
          </div>
        </div>

        <div uiCardFooter style="display:flex;gap:0.5rem;flex-wrap:wrap;">
          <ui-button variant="primary" appearance="filled">Message</ui-button>
          <ui-button variant="secondary" appearance="outline">View profile</ui-button>
        </div>
      </ui-card>
    </div>
  `,
})
export class CardCompositionDemoComponent {}
