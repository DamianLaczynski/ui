import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, PasswordComponent } from 'lui';

@Component({
  selector: 'app-password-strength-demo',
  standalone: true,
  imports: [ButtonComponent, FormsModule, PasswordComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%">
      <div
        style="flex:1 1 20rem;min-width:18rem;max-width:30rem;display:flex;flex-direction:column;gap:0.875rem"
      >
        <ui-password
          label="Create password"
          placeholder="Create a strong password"
          autocomplete="new-password"
          [(ngModel)]="password"
          [ngModelOptions]="{ standalone: true }"
          [helpText]="strengthHelpText"
          [errorText]="strengthErrorText"
        />

        <div
          style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:0.375rem"
          aria-hidden="true"
        >
          @for (segment of [1, 2, 3, 4]; track segment) {
            <div
              style="height:0.375rem;border-radius:999px;background:color-mix(in srgb,var(--color-neutral-stroke-rest) 70%,transparent)"
            >
              <div
                [style.width]="segment <= strengthSegments ? '100%' : '0%'"
                [style.height]="'100%'"
                [style.borderRadius]="'inherit'"
                [style.transition]="'width 180ms ease, background-color 180ms ease'"
                [style.background]="strengthColor"
              ></div>
            </div>
          }
        </div>

        <div
          style="display:flex;justify-content:space-between;gap:1rem;font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)"
        >
          <span>Strength</span>
          <strong [style.color]="strengthColor" style="font-weight:600">{{ strengthLabel }}</strong>
        </div>
      </div>

      <div
        style="flex:0 0 17rem;display:flex;flex-direction:column;gap:0.75rem;min-width:15rem;padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <p
          style="margin:0;font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
        >
          Strength checks
        </p>

        <div
          style="display:flex;flex-direction:column;gap:0.45rem;font-size:0.875rem;line-height:1.4"
        >
          @for (check of checks; track check.label) {
            <div style="display:flex;justify-content:space-between;gap:1rem">
              <span style="color:var(--color-neutral-foreground2-rest)">{{ check.label }}</span>
              <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
                check.passed ? 'Yes' : 'No'
              }}</strong>
            </div>
          }
        </div>

        <div
          style="display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center;padding-top:0.75rem;border-top:1px solid color-mix(in srgb,var(--color-neutral-stroke-rest) 65%,transparent)"
        >
          <ui-button type="button" appearance="outline" (click)="useExample('VaultTeam2026!')">
            Use strong example
          </ui-button>
        </div>
      </div>
    </div>
  `,
})
export class PasswordStrengthDemoComponent {
  protected password = '';

  protected get checks() {
    return [
      { label: '8+ characters', passed: this.password.length >= 8 },
      { label: 'Uppercase', passed: /[A-Z]/.test(this.password) },
      { label: 'Number', passed: /\d/.test(this.password) },
      { label: 'Special character', passed: /[^A-Za-z0-9]/.test(this.password) },
    ];
  }

  protected get strengthSegments(): number {
    return this.checks.filter(check => check.passed).length;
  }

  protected get strengthColor(): string {
    if (this.strengthSegments <= 1) {
      return 'var(--color-shared-red-foreground)';
    }
    if (this.strengthSegments <= 3) {
      return 'var(--color-shared-orange-foreground)';
    }
    return 'var(--color-shared-green-foreground)';
  }

  protected get strengthLabel(): string {
    if (!this.password) {
      return 'Not started';
    }
    if (this.strengthSegments <= 1) {
      return 'Weak';
    }
    if (this.strengthSegments <= 3) {
      return 'Medium';
    }
    return 'Strong';
  }

  protected get strengthErrorText(): string {
    if (!this.password || this.strengthSegments >= 4) {
      return '';
    }
    return 'Add length, uppercase, numbers, and symbols before saving.';
  }

  protected get strengthHelpText(): string {
    if (!this.password) {
      return 'Use at least 8 characters, uppercase, numbers, and symbols.';
    }
    if (this.strengthSegments <= 1) {
      return 'Weak password.';
    }
    if (this.strengthSegments <= 3) {
      return 'Almost there. Add one more requirement.';
    }
    return 'Strong password.';
  }

  protected useExample(value: string): void {
    this.password = value;
  }
}
