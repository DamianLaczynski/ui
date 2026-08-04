import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NodeComponent, type Node } from 'ui';

@Component({
  selector: 'app-node-size-shape-demo',
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
        <div style="font-size:0.875rem;font-weight:600">Density</div>
        <ui-node [node]="smallNode" size="small" appearance="outline" />
        <ui-node [node]="mediumNode" size="medium" appearance="outline" />
        <ui-node [node]="largeNode" size="large" appearance="outline" />
      </div>

      <div
        style="display:flex;flex-direction:column;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="font-size:0.875rem;font-weight:600">Shape</div>
        <ui-node [node]="roundedNode" shape="rounded" appearance="subtle" />
        <ui-node [node]="squareNode" shape="square" appearance="subtle" />
        <ui-node [node]="circularNode" shape="circular" appearance="subtle" />
      </div>
    </div>
  `,
})
export class NodeSizeShapeDemoComponent {
  protected readonly smallNode: Node = { id: 'small', label: 'Compact row', icon: 'document' };
  protected readonly mediumNode: Node = { id: 'medium', label: 'Default row', icon: 'document' };
  protected readonly largeNode: Node = { id: 'large', label: 'Comfortable row', icon: 'document' };

  protected readonly roundedNode: Node = { id: 'rounded', label: 'Rounded item', icon: 'folder' };
  protected readonly squareNode: Node = { id: 'square', label: 'Square item', icon: 'folder' };
  protected readonly circularNode: Node = {
    id: 'circular',
    label: 'Circular item',
    icon: 'folder',
  };
}
