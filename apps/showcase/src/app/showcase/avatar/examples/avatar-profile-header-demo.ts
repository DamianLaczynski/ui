import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AvatarComponent, ButtonComponent } from 'ui';

@Component({
  selector: 'app-avatar-profile-header-example',
  standalone: true,
  imports: [AvatarComponent, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:center;width:100%;max-width:40rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.875rem"
    >
      <ui-avatar
        size="large"
        shape="circular"
        image="https://i.pravatar.cc/150?img=15"
        name="Nadia Ibrahim"
      />
      <div style="flex:1;min-width:12rem;display:flex;flex-direction:column;gap:0.2rem">
        <span style="font-size:1rem;font-weight:600">Nadia Ibrahim</span>
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Program manager · Berlin
        </span>
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Last active today · 14 direct reports in directory
        </span>
      </div>
      <ui-button type="button" variant="primary">Message</ui-button>
    </div>
  `,
})
export class AvatarProfileHeaderExampleComponent {}
