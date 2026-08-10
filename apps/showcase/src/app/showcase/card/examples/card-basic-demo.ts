import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, CardComponent, BadgeComponent } from 'lui';

@Component({
  selector: 'app-card-basic-demo',
  standalone: true,
  imports: [ButtonComponent, CardComponent, BadgeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:1rem;width:100%;"
    >
      <ui-card appearance="filled" [interactive]="true" ariaLabel="Quarterly planning card">
        <div
          uiCardPreview
          style="min-height:7rem;background:linear-gradient(135deg,#dcecff 0%,#bdd7f7 100%);"
        ></div>

        <div uiCardHeader style="display:grid;gap:0.25rem;">
          <strong style="font-size:1rem;line-height:1.35;">Quarterly planning</strong>
          <span style="font-size:0.8125rem;color:var(--color-neutral-foreground3-rest);">
            6 milestones aligned across product and engineering
          </span>
        </div>

        <div uiCardBody style="display:grid;gap:0.75rem;">
          <p
            style="margin:0;font-size:0.875rem;line-height:1.5;color:var(--color-neutral-foreground2-rest);"
          >
            Keep the primary summary short and push secondary details into compact metadata or
            follow-up views.
          </p>
        </div>

        <div uiCardFooter style="display:flex;gap:0.5rem;flex-wrap:wrap;">
          <ui-button variant="primary" appearance="filled">Open</ui-button>
          <ui-button variant="secondary" appearance="outline">Share</ui-button>
        </div>
      </ui-card>

      <ui-card appearance="filled" borderStyle="dashed" ariaLabel="Support inbox card">
        <div uiCardHeader style="display:grid;gap:0.25rem;">
          <strong style="font-size:1rem;line-height:1.35;">Support inbox</strong>
          <span style="font-size:0.8125rem;color:var(--color-neutral-foreground3-rest);">
            14 unresolved conversations
          </span>
        </div>

        <div uiCardBody style="display:grid;gap:0.75rem;">
          <p
            style="margin:0;font-size:0.875rem;line-height:1.5;color:var(--color-neutral-foreground2-rest);"
          >
            Outline cards work well when the surrounding page already has elevation and you only
            need clear grouping.
          </p>
          <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
            <ui-badge text="4 urgent" shape="circular" variant="danger" appearance="filled" />
            <ui-badge
              text="7 waiting on customer"
              shape="circular"
              variant="info"
              appearance="filled"
            />
          </div>
        </div>
      </ui-card>
    </div>
  `,
})
export class CardBasicDemoComponent {}
