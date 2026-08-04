import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, DatetimeComponent } from 'ui';

@Component({
  selector: 'app-datetime-basic-demo',
  standalone: true,
  imports: [FormsModule, ButtonComponent, DatetimeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;max-width:24rem">
      <ui-datetime
        label="Meeting start"
        placeholder="YYYY-MM-DD HH:mm"
        [(ngModel)]="value"
        [ngModelOptions]="{ standalone: true }"
      />

      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
      >
        <ui-button type="button" appearance="subtle" (click)="value = ''">Clear</ui-button>
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">
          {{ value || 'No date and time selected.' }}
        </span>
      </div>
    </div>
  `,
})
export class DatetimeBasicDemoComponent {
  protected value = '2026-05-12T09:30';
}
