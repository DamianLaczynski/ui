import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CardComponent, EmptyStateComponent, type QuickAction } from 'lui';

@Component({
  selector: 'app-empty-state-actions-demo',
  standalone: true,
  imports: [CardComponent, EmptyStateComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:54rem"
    >
      <ui-card style="flex:0 0 28rem;" ariaLabel="Empty state with actions">
        <ui-empty-state
          title="No team members"
          description="Invite people to collaborate or import users from another workspace."
          icon="people"
          [primaryAction]="inviteAction"
          [secondaryAction]="importAction"
        />
      </ui-card>

      <ui-card appearance="outline" borderStyle="dashed" ariaLabel="Small outline card">
        <p
          style="margin:0 0 0.5rem;font-size:0.75rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-neutral-foreground2-rest)"
        >
          Last action
        </p>
        <div style="font-size:0.875rem;line-height:1.5;color:var(--color-neutral-foreground-rest)">
          {{ lastAction() || 'No action yet.' }}
        </div>
      </ui-card>
    </div>
  `,
})
export class EmptyStateActionsDemoComponent {
  protected readonly lastAction = signal('');

  protected readonly inviteAction: QuickAction = {
    label: 'Invite people',
    variant: 'primary',
    icon: 'person_add',
    action: () => this.lastAction.set('Invite people'),
  };

  protected readonly importAction: QuickAction = {
    label: 'Import users',
    variant: 'secondary',
    icon: 'send',
    action: () => this.lastAction.set('Import users'),
  };
}
