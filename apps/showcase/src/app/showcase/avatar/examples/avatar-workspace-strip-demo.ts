import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AvatarComponent, ButtonComponent } from 'ui';

@Component({
  selector: 'app-avatar-workspace-strip-example',
  standalone: true,
  imports: [AvatarComponent, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-wrap:wrap;align-items:center;gap:0.75rem;justify-content:space-between;width:100%;max-width:42rem;padding:0.875rem 1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem"
    >
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:0.5rem">
        <span style="font-size:0.8125rem;font-weight:600">Design review</span>
        <span
          style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest);padding:0 0.35rem"
        >
          ·
        </span>
        <div style="display:flex;align-items:center">
          <ui-avatar
            size="small"
            shape="circular"
            image="https://i.pravatar.cc/150?img=3"
            name="Ana Costa"
          />
          <ui-avatar
            style="margin-left:-0.35rem"
            size="small"
            shape="circular"
            name="Leo Hart"
            initials="LH"
          />
          <ui-avatar
            style="margin-left:-0.35rem"
            size="small"
            shape="circular"
            name="Priya Nair"
            initials="PN"
          />
        </div>
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">+4</span>
      </div>
      <ui-button type="button" variant="secondary" appearance="outline">Join room</ui-button>
    </div>
  `,
})
export class AvatarWorkspaceStripExampleComponent {}
