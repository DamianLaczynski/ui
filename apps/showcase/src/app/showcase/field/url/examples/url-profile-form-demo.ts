import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent, UrlComponent } from 'lui';

@Component({
  selector: 'app-url-profile-form-demo',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, UrlComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <form
      [formGroup]="profileForm"
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:54rem"
    >
      <div
        style="flex:1 1 22rem;min-width:18rem;display:flex;flex-direction:column;gap:1rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-direction:column;gap:0.25rem">
          <div style="font-size:0.9375rem;font-weight:600">Profile links</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            URL fields often come in groups: website, portfolio, repository, or support page.
          </div>
        </div>

        <ui-url label="Website" placeholder="https://company.example" formControlName="website" />

        <ui-url
          label="GitHub repository"
          placeholder="https://github.com/org/repo"
          formControlName="github"
          inputVariant="filled-gray"
        />

        <ui-url
          label="Support page"
          placeholder="https://example.com/support"
          formControlName="support"
        />

        <div
          style="display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
        >
          <ui-button type="button" variant="primary">Save links</ui-button>
          <ui-button type="button" variant="secondary" appearance="outline" (click)="reset()">
            Reset
          </ui-button>
        </div>
      </div>

      <div
        style="flex:0 0 18rem;min-width:16rem;padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <p
          style="margin:0 0 0.5rem;font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
        >
          Current links
        </p>
        <div
          style="display:flex;flex-direction:column;gap:0.5rem;font-size:0.875rem;line-height:1.4"
        >
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Website</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
              profileForm.controls.website.value || 'None'
            }}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">GitHub</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
              profileForm.controls.github.value || 'None'
            }}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;gap:1rem">
            <span style="color:var(--color-neutral-foreground2-rest)">Support</span>
            <strong style="font-weight:600;color:var(--color-neutral-foreground-rest)">{{
              profileForm.controls.support.value || 'None'
            }}</strong>
          </div>
        </div>
      </div>
    </form>
  `,
})
export class UrlProfileFormDemoComponent {
  protected readonly defaults = {
    website: 'https://contoso.com',
    github: 'https://github.com/contoso/design-system',
    support: 'https://contoso.com/support',
  };

  protected readonly profileForm = new FormGroup({
    website: new FormControl(this.defaults.website, { nonNullable: true }),
    github: new FormControl(this.defaults.github, { nonNullable: true }),
    support: new FormControl(this.defaults.support, { nonNullable: true }),
  });

  protected reset(): void {
    this.profileForm.reset(this.defaults);
  }
}
