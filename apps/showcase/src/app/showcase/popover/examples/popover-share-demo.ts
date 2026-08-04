import { Component, TemplateRef, signal, viewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AvatarComponent,
  ButtonComponent,
  DividerComponent,
  PopoverDirective,
  SwitchComponent,
  TagComponent,
  TextComponent,
} from 'ui';

@Component({
  selector: 'app-popover-share-demo',
  standalone: true,
  imports: [
    FormsModule,
    AvatarComponent,
    ButtonComponent,
    DividerComponent,
    PopoverDirective,
    SwitchComponent,
    TagComponent,
    TextComponent,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:0.875rem;width:100%;max-width:30rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:flex-start;justify-content:space-between"
      >
        <div style="min-width:0">
          <div style="font-size:0.9375rem;font-weight:600">Q2 launch brief</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Shared with product, marketing, and customer success.
          </div>
        </div>

        <ui-button
          type="button"
          variant="primary"
          appearance="outline"
          icon="share"
          [uiPopover]="shareTpl"
          uiPopoverPosition="bottom"
          uiPopoverSize="large"
          uiPopoverAriaLabel="Share document"
        >
          Share
        </ui-button>
      </div>

      <div style="font-size:0.8125rem;color:var(--color-neutral-foreground3-rest)">
        Last action: {{ lastAction() }}
      </div>
    </div>

    <ng-template #shareTpl>
      <div class="popover-panel" style="min-width:21rem">
        <div class="popover-panel__header">
          <div class="popover-panel__title">Share brief</div>
          <div class="popover-panel__description">
            Invite teammates or copy a view-only link for stakeholders outside the workspace.
          </div>
        </div>

        <div class="popover-panel__body">
          <ui-text
            label="Invite by email"
            placeholder="name@company.com"
            [(ngModel)]="inviteEmail"
            [ngModelOptions]="{ standalone: true }"
          />

          <div style="display:flex;flex-wrap:wrap;gap:0.5rem">
            <ui-button type="button" variant="primary" icon="person_add" (click)="sendInvite()">
              Send invite
            </ui-button>
            <ui-button
              type="button"
              variant="secondary"
              appearance="outline"
              icon="copy"
              (click)="copyLink()"
            >
              Copy link
            </ui-button>
          </div>

          <ui-switch
            label="Anyone with the link can view"
            labelPosition="before"
            [(ngModel)]="linkAccessEnabled"
            [ngModelOptions]="{ standalone: true }"
          />

          @if (linkAccessEnabled) {
            <ui-text
              label="Share link"
              [ngModel]="shareLink"
              [ngModelOptions]="{ standalone: true }"
              [readonly]="true"
            />
          }

          <ui-divider />

          <div style="display:flex;flex-direction:column;gap:0.75rem">
            <div style="font-size:0.8125rem;font-weight:600">People with access</div>

            @for (person of collaborators; track person.email) {
              <div style="display:flex;align-items:center;gap:0.75rem">
                <ui-avatar [initials]="person.initials" [name]="person.name" size="small" />
                <div style="flex:1;min-width:0">
                  <div style="font-size:0.875rem;font-weight:600">{{ person.name }}</div>
                  <div
                    style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:0.75rem;color:var(--color-neutral-foreground2-rest)"
                  >
                    {{ person.email }}
                  </div>
                </div>
                <ui-tag [text]="person.role" appearance="subtle" variant="secondary" size="small" />
              </div>
            }
          </div>
        </div>
      </div>
    </ng-template>
  `,
})
export class PopoverShareDemoComponent {
  protected shareTpl = viewChild.required<TemplateRef<unknown>>('shareTpl');
  protected shareLink = 'https://ui.laczynski.dev/docs/popover?share=q2-launch-brief';
  protected inviteEmail = '';
  protected linkAccessEnabled = true;
  protected lastAction = signal('Not copied yet');

  protected readonly collaborators = [
    { name: 'River Chen', email: 'river.chen@northwind.dev', initials: 'RC', role: 'Can edit' },
    { name: 'Morgan Kelly', email: 'morgan.k@northwind.dev', initials: 'MK', role: 'Can view' },
  ];

  protected copyLink(): void {
    this.lastAction.set('Link copied to clipboard');
  }

  protected sendInvite(): void {
    const email = this.inviteEmail.trim();
    this.lastAction.set(email ? `Invite sent to ${email}` : 'Enter an email address first');
  }
}
