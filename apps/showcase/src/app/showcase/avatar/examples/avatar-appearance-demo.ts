import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AvatarComponent } from 'lui';

@Component({
  selector: 'app-avatar-appearance-example',
  standalone: true,
  imports: [AvatarComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:center;justify-content:center;width:100%"
    >
      <ui-avatar variant="primary" appearance="filled" name="Active lane" />
      <ui-avatar variant="secondary" appearance="outline" name="Shared account" />
      <ui-avatar variant="success" appearance="tint" name="Verified bot" />
      <ui-avatar variant="warning" appearance="subtle" name="Trial seat" />
    </div>
  `,
})
export class AvatarAppearanceExampleComponent {}
