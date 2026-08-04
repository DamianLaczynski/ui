import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailComponent } from 'ui';

@Component({
  selector: 'app-email-layout-demo',
  standalone: true,
  imports: [EmailComponent, FormsModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:grid;gap:1rem">
      <div
        style="display:grid;gap:1rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <ui-email
          label="Before label"
          labelPosition="before"
          placeholder="owner@project.com"
          [(ngModel)]="beforeValue"
        />

        <ui-email
          label="After label"
          labelPosition="after"
          placeholder="finance@company.com"
          [(ngModel)]="afterValue"
        />
      </div>

      <div
        style="display:grid;gap:0.875rem;padding:1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <ui-email label="Small" size="small" placeholder="small@contoso.com" />
        <ui-email label="Medium" size="medium" placeholder="medium@contoso.com" />
        <ui-email label="Large" size="large" placeholder="large@contoso.com" />
      </div>
    </div>
  `,
})
export class EmailLayoutDemoComponent {
  protected beforeValue = '';
  protected afterValue = '';
}
