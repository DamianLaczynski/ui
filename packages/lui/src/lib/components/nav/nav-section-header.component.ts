import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ui-nav-section-header',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div class="nav-section-header">
      <div class="nav-section-header__left-lockup">
        <div class="nav-section-header__text">{{ label() }}</div>
      </div>
    </div>
  `,
})
export class NavSectionHeaderComponent {
  label = input.required<string>();
}
