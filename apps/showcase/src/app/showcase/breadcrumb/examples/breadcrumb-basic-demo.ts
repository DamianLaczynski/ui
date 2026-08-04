import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { BreadcrumbComponent, type Breadcrumb } from 'ui';

const FULL_PATH: Breadcrumb[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'workspace', label: 'Workspace', icon: 'folder' },
  { id: 'product', label: 'Product', icon: 'folder' },
  { id: 'settings', label: 'Settings', icon: 'settings', selected: true },
];

@Component({
  selector: 'app-breadcrumb-basic-example',
  standalone: true,
  imports: [BreadcrumbComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:0.75rem;width:100%;max-width:34rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <ui-breadcrumb
        [items]="path()"
        appearance="subtle"
        [responsiveOverflow]="false"
        (itemClick)="navigate($event)"
      />

      <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
        Click an ancestor item to jump back to that level.
      </div>
    </div>
  `,
})
export class BreadcrumbBasicExampleComponent {
  protected readonly path = signal<Breadcrumb[]>(FULL_PATH);

  protected navigate(item: Breadcrumb): void {
    const index = FULL_PATH.findIndex(entry => entry.id === item.id);
    this.path.set(
      FULL_PATH.slice(0, index + 1).map((entry, currentIndex, arr) => ({
        ...entry,
        selected: currentIndex === arr.length - 1,
      })),
    );
  }
}
