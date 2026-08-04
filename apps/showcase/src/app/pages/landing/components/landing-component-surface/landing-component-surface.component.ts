import { CommonModule } from '@angular/common';
import { Component, computed, input, signal, Type, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent, IconComponent } from 'ui';
import { ShowcaseComponent } from '../../landing-showcase-components';
import {
  LANDING_SURFACE_INPUTS_PLACEMENT,
  landingSurfaceInputExplicitCell,
  landingSurfaceInputSlotPlacement,
  landingSurfaceNonFieldExplicitCell,
  landingSurfaceOrderedInputIds,
  landingSurfaceOrderedNonFieldIds,
  landingSurfacePlacement,
} from './landing-surface-layout';
import { LANDING_SURFACE_PREVIEW_COMPONENTS } from './landing-surface-previews.registry';

@Component({
  selector: 'app-landing-component-surface',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonComponent, IconComponent],
  templateUrl: './landing-component-surface.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './landing-component-surface.component.scss',
})
export class LandingComponentSurfaceComponent {
  readonly showcaseComponents = input.required<ShowcaseComponent[]>();

  protected readonly surfaceExpanded = signal(false);

  protected toggleSurfaceExpanded(): void {
    this.surfaceExpanded.update(v => !v);
  }

  readonly orderedNonFieldShowcase = computed(() => {
    const list = this.showcaseComponents();
    const map = new Map(list.map(c => [c.id, c]));
    return landingSurfaceOrderedNonFieldIds(list.map(c => c.id))
      .map(id => map.get(id))
      .filter((c): c is ShowcaseComponent => !!c);
  });

  readonly orderedFieldShowcase = computed(() => {
    const list = this.showcaseComponents();
    const map = new Map(list.map(c => [c.id, c]));
    return landingSurfaceOrderedInputIds(list.map(c => c.id))
      .map(id => map.get(id))
      .filter((c): c is ShowcaseComponent => !!c);
  });

  placement(componentId: string) {
    return landingSurfacePlacement(componentId);
  }

  gridColumnStyle(componentId: string): string {
    const cell = landingSurfaceNonFieldExplicitCell(componentId);
    if (cell) return cell.gridColumn;
    const { colSpan } = this.placement(componentId);
    return `span ${colSpan}`;
  }

  gridRowStyle(componentId: string): string {
    const cell = landingSurfaceNonFieldExplicitCell(componentId);
    if (cell) return cell.gridRow;
    const { rowSpan } = this.placement(componentId);
    return `span ${rowSpan}`;
  }

  inputsGridColumnStyle(): string {
    return `span ${LANDING_SURFACE_INPUTS_PLACEMENT.colSpan}`;
  }

  inputsGridRowStyle(): string {
    return `span ${LANDING_SURFACE_INPUTS_PLACEMENT.rowSpan}`;
  }

  inputSlotGridColumnStyle(componentId: string): string {
    const cell = landingSurfaceInputExplicitCell(componentId);
    if (cell) return cell.gridColumn;
    return `span ${landingSurfaceInputSlotPlacement(componentId).colSpan}`;
  }

  inputSlotGridRowStyle(componentId: string): string {
    const cell = landingSurfaceInputExplicitCell(componentId);
    if (cell) return cell.gridRow;
    return `span ${landingSurfaceInputSlotPlacement(componentId).rowSpan}`;
  }

  isMicroTile(componentId: string): boolean {
    return this.placement(componentId).colSpan === 1;
  }

  getCompactPreview(componentId: string): Type<unknown> | null {
    return LANDING_SURFACE_PREVIEW_COMPONENTS[componentId] ?? null;
  }
}
