import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailComponent } from 'lui';

@Component({
  selector: 'app-email-basic-demo',
  standalone: true,
  imports: [EmailComponent, FormsModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:grid;gap:1rem;max-width:32rem">
      <ui-email
        label="Work email"
        placeholder="name@company.com"
        helpText="Use the address where you receive workspace notifications."
        [(ngModel)]="workEmail"
      />

      <div
        style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:0.75rem;padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <div style="display:grid;gap:0.125rem">
          <strong style="font-size:0.875rem;color:var(--color-neutral-foreground-rest)"
            >Current value</strong
          >
          <span style="font-size:0.8125rem;color:var(--color-neutral-foreground3-rest)">
            {{ workEmail || 'Empty' }}
          </span>
        </div>
      </div>
    </div>
  `,
})
export class EmailBasicDemoComponent {
  protected workEmail = 'alex.taylor@contoso.com';
}
