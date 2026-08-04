import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, CardComponent } from 'ui';

@Component({
  selector: 'app-card-focus-mode-demo',
  standalone: true,
  imports: [ButtonComponent, CardComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:grid;gap:1rem;width:100%;">
      <ui-card appearance="outline" borderStyle="dashed" ariaLabel="Focus mode helper">
        <div
          uiCardBody
          style="font-size:0.8125rem;line-height:1.5;color:var(--color-neutral-foreground2-rest);"
        >
          Focus the cards below with Tab. On no-tab and tab-exit, press Enter on the card root to
          move into the inner actions.
        </div>
      </ui-card>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:1rem;">
        <ui-card [interactive]="true" focusMode="off" ariaLabel="Card with focus mode off">
          <div uiCardHeader style="display:grid;gap:0.25rem;">
            <strong style="font-size:0.9375rem;">focusMode="off"</strong>
            <span style="font-size:0.75rem;color:var(--color-neutral-foreground3-rest);"
              >Card acts as a surface; inner buttons use normal tab order</span
            >
          </div>
          <div uiCardFooter style="display:flex;gap:0.5rem;flex-wrap:wrap;">
            <ui-button variant="primary" appearance="outline">Open</ui-button>
            <ui-button variant="secondary" appearance="outline">Archive</ui-button>
          </div>
        </ui-card>

        <ui-card
          [interactive]="true"
          focusMode="tab-only"
          ariaLabel="Card with focus mode tab only"
        >
          <div uiCardHeader style="display:grid;gap:0.25rem;">
            <strong style="font-size:0.9375rem;">focusMode="tab-only"</strong>
            <span style="font-size:0.75rem;color:var(--color-neutral-foreground3-rest);"
              >Tab from the card root moves directly into the first embedded control</span
            >
          </div>
          <div uiCardFooter style="display:flex;gap:0.5rem;flex-wrap:wrap;">
            <ui-button variant="primary" appearance="outline">Inspect</ui-button>
            <ui-button variant="secondary" appearance="outline">Share</ui-button>
          </div>
        </ui-card>

        <ui-card [interactive]="true" focusMode="no-tab" ariaLabel="Card with focus mode no tab">
          <div uiCardHeader style="display:grid;gap:0.25rem;">
            <strong style="font-size:0.9375rem;">focusMode="no-tab"</strong>
            <span style="font-size:0.75rem;color:var(--color-neutral-foreground3-rest);"
              >Tab loops inside the card actions until Escape returns focus to the root</span
            >
          </div>
          <div uiCardFooter style="display:flex;gap:0.5rem;flex-wrap:wrap;">
            <ui-button variant="primary" appearance="outline">Review</ui-button>
            <ui-button variant="secondary" appearance="outline">Assign</ui-button>
          </div>
        </ui-card>

        <ui-card
          [interactive]="true"
          focusMode="tab-exit"
          ariaLabel="Card with focus mode tab exit"
        >
          <div uiCardHeader style="display:grid;gap:0.25rem;">
            <strong style="font-size:0.9375rem;">focusMode="tab-exit"</strong>
            <span style="font-size:0.75rem;color:var(--color-neutral-foreground3-rest);"
              >Tab can leave the card after the last action; Shift+Tab returns to the root</span
            >
          </div>
          <div uiCardFooter style="display:flex;gap:0.5rem;flex-wrap:wrap;">
            <ui-button variant="primary" appearance="outline">Resolve</ui-button>
            <ui-button variant="secondary" appearance="outline">Mute</ui-button>
          </div>
        </ui-card>
      </div>
    </div>
  `,
})
export class CardFocusModeDemoComponent {}
