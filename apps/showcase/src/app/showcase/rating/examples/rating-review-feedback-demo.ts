import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent, RatingComponent, TextareaComponent } from 'lui';

@Component({
  selector: 'app-rating-review-feedback-example',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, RatingComponent, TextareaComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <form
      [formGroup]="form"
      (ngSubmit)="submit()"
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:32rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="display:flex;flex-direction:column;gap:0.35rem">
        <span style="font-size:0.875rem;font-weight:600">How was the session?</span>
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Pick a score before sending; comment stays optional.
        </span>
      </div>

      <ui-rating
        [value]="stars()"
        [max]="5"
        [showValue]="true"
        ariaLabel="Rate this session"
        (valueChange)="stars.set($event)"
      />

      <ui-textarea
        label="Optional comment"
        placeholder="What worked or should change next time?"
        formControlName="comment"
        [rows]="3"
      />

      <div style="display:flex;flex-wrap:wrap;gap:0.5rem;align-items:center">
        <ui-button type="submit" variant="primary" [disabled]="stars() === 0"
          >Send feedback</ui-button
        >
        <ui-button type="button" variant="secondary" appearance="outline" (click)="clear()">
          Clear
        </ui-button>
      </div>
    </form>
  `,
})
export class RatingReviewFeedbackExampleComponent {
  protected readonly stars = signal(0);

  protected readonly form = new FormGroup({
    comment: new FormControl('', { nonNullable: true }),
  });

  protected submit(): void {
    if (this.stars() === 0) {
      return;
    }
    this.clear();
  }

  protected clear(): void {
    this.stars.set(0);
    this.form.reset({ comment: '' });
  }
}
