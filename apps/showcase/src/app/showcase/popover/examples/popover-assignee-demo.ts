import {
  Component,
  TemplateRef,
  computed,
  signal,
  viewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AvatarComponent,
  ButtonComponent,
  DividerComponent,
  PopoverDirective,
  SearchComponent,
} from 'ui';

interface AssigneeOption {
  id: string;
  name: string;
  role: string;
  image?: string;
  initials?: string;
}

@Component({
  selector: 'app-popover-assignee-demo',
  standalone: true,
  imports: [
    FormsModule,
    AvatarComponent,
    ButtonComponent,
    DividerComponent,
    PopoverDirective,
    SearchComponent,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:0.875rem;width:100%;max-width:34rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;justify-content:space-between"
      >
        <div style="min-width:0">
          <div style="font-size:0.9375rem;font-weight:600">API rate-limit alert</div>
          <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
            Owner:
            <strong>{{ selectedAssignee()?.name || 'Unassigned' }}</strong>
          </div>
        </div>

        <ui-button
          type="button"
          variant="secondary"
          appearance="outline"
          icon="person"
          [uiPopover]="assigneeTpl"
          uiPopoverPosition="bottom"
          uiPopoverSize="large"
          uiPopoverAriaLabel="Assign issue owner"
        >
          Assign
        </ui-button>
      </div>

      @if (selectedAssignee(); as assignee) {
        <div
          style="display:flex;align-items:center;gap:0.75rem;padding:0.75rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.75rem;background:var(--color-neutral-background2-rest)"
        >
          <ui-avatar
            [image]="assignee.image"
            [initials]="assignee.initials"
            [name]="assignee.name"
            size="medium"
          />
          <div style="min-width:0">
            <div style="font-size:0.875rem;font-weight:600">{{ assignee.name }}</div>
            <div style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">
              {{ assignee.role }}
            </div>
          </div>
        </div>
      }
    </div>

    <ng-template #assigneeTpl>
      <div class="popover-panel" style="min-width:18rem">
        <div class="popover-panel__header">
          <div class="popover-panel__title">Assign owner</div>
          <div class="popover-panel__description">
            Pick someone from the on-call rotation or search by name.
          </div>
        </div>

        <div class="popover-panel__body">
          <ui-search
            placeholder="Search teammates"
            size="medium"
            [(ngModel)]="query"
            [ngModelOptions]="{ standalone: true }"
          />

          <div style="display:flex;flex-direction:column;gap:0.375rem">
            @for (person of filteredAssignees(); track person.id) {
              <button
                type="button"
                (click)="selectAssignee(person)"
                style="display:flex;align-items:center;gap:0.75rem;width:100%;padding:0.5rem 0.625rem;border:1px solid transparent;border-radius:0.625rem;background:transparent;text-align:left;cursor:pointer"
                [style.background]="
                  selectedAssignee()?.id === person.id
                    ? 'var(--color-neutral-background2-rest)'
                    : 'transparent'
                "
              >
                <ui-avatar
                  [image]="person.image"
                  [initials]="person.initials"
                  [name]="person.name"
                  size="small"
                />
                <span style="min-width:0">
                  <span style="display:block;font-size:0.875rem;font-weight:600">{{
                    person.name
                  }}</span>
                  <span
                    style="display:block;font-size:0.75rem;color:var(--color-neutral-foreground2-rest)"
                  >
                    {{ person.role }}
                  </span>
                </span>
              </button>
            }
          </div>

          <ui-divider />

          <ui-button type="button" variant="secondary" appearance="subtle" icon="person_add">
            Invite teammate
          </ui-button>
        </div>
      </div>
    </ng-template>
  `,
})
export class PopoverAssigneeDemoComponent {
  protected assigneeTpl = viewChild.required<TemplateRef<unknown>>('assigneeTpl');
  protected query = '';
  protected selectedAssignee = signal<AssigneeOption | null>(null);

  protected readonly assignees: AssigneeOption[] = [
    {
      id: 'river',
      name: 'River Chen',
      role: 'Platform on-call',
      image: 'https://i.pravatar.cc/150?img=12',
    },
    { id: 'morgan', name: 'Morgan Kelly', role: 'Support lead', initials: 'MK' },
    { id: 'wei', name: 'Wei Zhang', role: 'Billing ops', initials: 'WZ' },
  ];

  protected filteredAssignees = computed(() => {
    const query = this.query.trim().toLowerCase();
    if (!query) {
      return this.assignees;
    }

    return this.assignees.filter(
      person =>
        person.name.toLowerCase().includes(query) || person.role.toLowerCase().includes(query),
    );
  });

  protected selectAssignee(person: AssigneeOption): void {
    this.selectedAssignee.set(person);
  }
}
