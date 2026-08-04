import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { BreadcrumbComponent, type Breadcrumb } from 'ui';

const FULL_WORKSPACE_PATH: Breadcrumb[] = [
  { id: 'root', label: 'Workspace', icon: 'grid' },
  { id: 'teams', label: 'Engineering', icon: 'people' },
  { id: 'platform', label: 'Platform', icon: 'folder' },
  { id: 'release', label: 'Release coordination', icon: 'calendar' },
  { id: 'docs', label: 'Runbooks', icon: 'book', selected: true },
];

@Component({
  selector: 'app-breadcrumb-workspace-example',
  standalone: true,
  imports: [BreadcrumbComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:0.875rem;width:100%;max-width:40rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <ui-breadcrumb
        [items]="path()"
        appearance="transparent"
        [showIcons]="true"
        [responsiveOverflow]="false"
        (itemClick)="navigate($event)"
      />

      <div style="display:flex;flex-direction:column;gap:0.25rem">
        <div style="font-size:0.9375rem;font-weight:600">Runbooks</div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Operational procedures, rollback notes, and escalation paths for the platform team.
        </div>
      </div>
    </div>
  `,
})
export class BreadcrumbWorkspaceExampleComponent {
  protected readonly path = signal<Breadcrumb[]>(FULL_WORKSPACE_PATH);

  protected navigate(item: Breadcrumb): void {
    const index = FULL_WORKSPACE_PATH.findIndex(entry => entry.id === item.id);
    this.path.set(
      FULL_WORKSPACE_PATH.slice(0, index + 1).map((entry, currentIndex, arr) => ({
        ...entry,
        selected: currentIndex === arr.length - 1,
      })),
    );
  }
}
