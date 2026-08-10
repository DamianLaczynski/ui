import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TagComponent } from 'lui';

type Token = {
  id: string;
  text: string;
  variant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
};

@Component({
  selector: 'app-tag-dismissible-demo',
  standalone: true,
  imports: [TagComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:44rem">
      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:flex-start;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        @for (token of tokens; track token.id) {
          <ui-tag
            [text]="token.text"
            [variant]="token.variant"
            appearance="filled"
            [dismissible]="true"
            (dismiss)="removeToken(token.id)"
          />
        }
      </div>

      <div
        style="padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <p
          style="margin:0 0 0.5rem;font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
        >
          Remaining tokens
        </p>
        <div style="font-size:0.875rem;line-height:1.5;color:var(--color-neutral-foreground-rest)">
          {{ tokens.length ? tokenLabels : 'All tokens removed.' }}
        </div>
      </div>
    </div>
  `,
})
export class TagDismissibleDemoComponent {
  protected tokens: Token[] = [
    { id: 'design', text: 'Design', variant: 'primary' },
    { id: 'frontend', text: 'Frontend', variant: 'info' },
    { id: 'urgent', text: 'Urgent', variant: 'danger' },
    { id: 'approved', text: 'Approved', variant: 'success' },
  ];

  protected get tokenLabels(): string {
    return this.tokens.map(token => token.text).join(', ');
  }

  protected removeToken(id: string): void {
    this.tokens = this.tokens.filter(token => token.id !== id);
  }
}
