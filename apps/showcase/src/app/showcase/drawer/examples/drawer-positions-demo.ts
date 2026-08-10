import { Component, model, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, DrawerComponent, QuickAction } from 'lui';

const bodyStackStyle =
  'display:flex;flex-direction:column;gap:0.875rem;color:var(--color-neutral-foreground-rest);font-size:0.875rem;line-height:1.55';

@Component({
  selector: 'app-drawer-positions-example',
  standalone: true,
  imports: [ButtonComponent, DrawerComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:0.75rem">
      <ui-button appearance="outline" (click)="leftVisible.set(true)">Left small</ui-button>
      <ui-button appearance="outline" (click)="rightVisible.set(true)"
        >Right large · scroll</ui-button
      >
      <ui-button appearance="outline" (click)="bottomVisible.set(true)">Bottom medium</ui-button>

      <ui-drawer
        title="Left rail tools"
        position="left"
        size="small"
        [(visible)]="leftVisible"
        [primaryAction]="closeLeftAction()"
      >
        <div [attr.style]="bodyStackStyle">
          <p style="margin:0">
            The compact width suits navigation rails, shortcuts to sibling views, or secondary
            actions that should not dominate the canvas.
          </p>
          <p style="margin:0"><strong style="font-weight:600">Quick links</strong></p>
          <ul style="margin:0;padding-left:1.25rem">
            <li style="margin-bottom:0.35rem">Create record in current context</li>
            <li style="margin-bottom:0.35rem">Export filtered table to CSV</li>
            <li style="margin-bottom:0">Open keyboard shortcuts reference</li>
          </ul>
        </div>
      </ui-drawer>

      <ui-drawer
        title="Right inspection panel"
        position="right"
        size="large"
        [(visible)]="rightVisible"
        [primaryAction]="closeRightAction()"
      >
        <div [attr.style]="bodyStackStyle">
          @for (paragraph of scrollParagraphs; track $index) {
            <p style="margin:0">{{ paragraph }}</p>
          }
        </div>
      </ui-drawer>

      <ui-drawer
        title="Bottom review tray"
        position="bottom"
        size="medium"
        [(visible)]="bottomVisible"
        [primaryAction]="closeBottomAction()"
      >
        <div [attr.style]="bodyStackStyle">
          <p style="margin:0">
            Bottom placements work well for cart summaries, approvals, or short step-through flows
            that should stay attached to the page chrome.
          </p>
          <p style="margin:0">
            This copy stays concise on purpose — open “Right large · scroll” to see the drawer body
            scroll when content exceeds the available height.
          </p>
        </div>
      </ui-drawer>
    </div>
  `,
})
export class DrawerPositionsExampleComponent {
  readonly bodyStackStyle = bodyStackStyle;

  protected readonly scrollParagraphs = [
    'Before shipping changes, double-check workspace membership and downstream permissions.',
    'Workspace admins may transfer ownership, archive projects, and restore soft-deleted items for 30 days.',
    'Version notes are lightweight — still add why each rollout matters for future auditors.',
    'Directory sync refreshes nightly; local entitlement edits still persist immediately after save.',
    'Email alerts can be silenced module-by-module unless they are tagged as security-critical.',
    'Exports that include personal information must honor your retention policy; queue large payloads.',
    'Keyboard shortcuts activate only while focus lives within the interactive surface of the shell.',
    'Idle sessions extend tokens automatically when the tab stays foreground and trusted.',
    'Draft templates remain private until co-authors explicitly publish a stable revision.',
    'Full API manuals live next to onboarding guides — link banners stay pinned in workspace footers.',
    'When performance regresses capture the tracing id from network responses before filing support.',
    'Permission deltas propagate globally within seconds once the optimistic save completes.',
  ];

  protected readonly leftVisible = model(false);
  protected readonly rightVisible = model(false);
  protected readonly bottomVisible = model(false);

  protected readonly closeLeftAction = signal<QuickAction>({
    label: 'Close',
    variant: 'primary',
    action: () => this.leftVisible.set(false),
  });

  protected readonly closeRightAction = signal<QuickAction>({
    label: 'Close',
    variant: 'primary',
    action: () => this.rightVisible.set(false),
  });

  protected readonly closeBottomAction = signal<QuickAction>({
    label: 'Close',
    variant: 'primary',
    action: () => this.bottomVisible.set(false),
  });
}
