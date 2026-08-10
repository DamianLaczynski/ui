import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NodeComponent, type Node } from 'lui';

@Component({
  selector: 'app-node-appearance-variant-demo',
  standalone: true,
  imports: [NodeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(14rem,1fr));gap:1rem;width:100%;max-width:48rem"
    >
      <div
        style="display:flex;flex-direction:column;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="font-size:0.875rem;font-weight:600">Subtle navigation rows</div>
        <ui-node [node]="primaryNode" variant="primary" appearance="subtle" />
        <ui-node [node]="secondaryNode" variant="secondary" appearance="subtle" />
      </div>

      <div
        style="display:flex;flex-direction:column;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="font-size:0.875rem;font-weight:600">Filled status rows</div>
        <ui-node [node]="successNode" variant="success" appearance="filled" />
        <ui-node [node]="warningNode" variant="warning" appearance="filled" />
        <ui-node [node]="dangerNode" variant="danger" appearance="filled" />
      </div>
    </div>
  `,
})
export class NodeAppearanceVariantDemoComponent {
  protected readonly primaryNode: Node = {
    id: 'recent',
    label: 'Recent files',
    icon: 'clock',
  };

  protected readonly secondaryNode: Node = {
    id: 'shared',
    label: 'Shared with team',
    icon: 'people',
  };

  protected readonly successNode: Node = {
    id: 'synced',
    label: 'Marketing assets synced',
    icon: 'checkmark_circle',
  };

  protected readonly warningNode: Node = {
    id: 'review',
    label: 'Copy review pending',
    icon: 'warning',
  };

  protected readonly dangerNode: Node = {
    id: 'failed',
    label: 'Build failed on production',
    icon: 'error_circle',
  };
}
