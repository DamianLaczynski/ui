import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  HostListener,
  computed,
  inject,
  input,
  model,
  output,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { IconName } from '../icon';
import { MenuItem } from '../menu/models/menu-item.model';
import { TooltipDirective, TooltipPosition } from '../tooltip/tooltip.directive';
import { Variant, Appearance, Size, Shape } from '../utils';

export type SpeedDialLayoutType = 'linear' | 'circle' | 'semi-circle' | 'quarter-circle';

export type SpeedDialLinearDirection = 'up' | 'down' | 'left' | 'right';

export type SpeedDialQuarterDirection = 'up-left' | 'up-right' | 'down-left' | 'down-right';

export type SpeedDialDirection = SpeedDialLinearDirection | SpeedDialQuarterDirection;

function arcAngles(n: number, start: number, end: number): number[] {
  if (n <= 0) return [];
  if (n === 1) return [(start + end) / 2];
  return Array.from({ length: n }, (_, i) => start + (i / (n - 1)) * (end - start));
}

const speedDialCoordinationClosers = new Map<string, () => void>();

function registerSpeedDialCoordination(id: string, close: () => void): void {
  speedDialCoordinationClosers.set(id, close);
}

function unregisterSpeedDialCoordination(id: string): void {
  speedDialCoordinationClosers.delete(id);
}

function closeOtherSpeedDials(exceptId: string): void {
  for (const [id, close] of speedDialCoordinationClosers) {
    if (id !== exceptId) {
      close();
    }
  }
}

@Component({
  selector: 'ui-speed-dial',
  standalone: true,
  imports: [ButtonComponent, TooltipDirective],
  templateUrl: './speed-dial.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'speed-dial',
  },
})
export class SpeedDialComponent {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  private idleCloseTimer: ReturnType<typeof setTimeout> | null = null;

  readonly instanceId = `speed-dial-${Math.random().toString(36).slice(2, 11)}`;
  readonly menuId = `speed-dial-menu-${Math.random().toString(36).slice(2, 11)}`;

  items = input<MenuItem[]>([]);
  dialType = input<SpeedDialLayoutType>('linear');
  direction = input<SpeedDialDirection>('up');
  radius = input<number>(56);
  gap = input<number>(8);
  itemSizePx = input<number>(48);
  transitionDelay = input<number>(30);
  mask = input<boolean>(false);
  disabled = input<boolean>(false);
  hideOnClickOutside = input<boolean>(true);
  coordinateWithOthers = input<boolean>(true);
  autoCloseIdleMs = input<number | null>(null);
  rotateAnimation = input<boolean>(true);
  showTooltips = input<boolean>(false);
  tooltipOptions = input<{ tooltipPosition?: TooltipPosition }>({});

  ariaLabel = input<string>();

  showIcon = input<IconName>('add');
  hideIcon = input<IconName | undefined>(undefined);

  triggerButtonProps = input<{
    variant?: Variant;
    appearance?: Appearance;
    size?: Size;
    shape?: Shape;
  }>({});

  actionButtonProps = input<{
    variant?: Variant;
    appearance?: Appearance;
    size?: Size;
    shape?: Shape;
  }>({});

  visible = model<boolean>(false);

  click = output<MouseEvent>();
  show = output<Event>();
  hide = output<Event>();

  constructor() {
    registerSpeedDialCoordination(this.instanceId, () => this.closeFromCoordination());
    this.destroyRef.onDestroy(() => {
      unregisterSpeedDialCoordination(this.instanceId);
      this.clearIdleCloseTimer();
    });

    effect(() => {
      const open = this.visible();
      const ms = this.autoCloseIdleMs();
      if (!open) {
        this.clearIdleCloseTimer();
        return;
      }
      this.scheduleIdleClose(ms);
    });
  }

  triggerVariant = computed(() => this.triggerButtonProps().variant ?? 'primary');
  triggerAppearance = computed(() => this.triggerButtonProps().appearance ?? 'filled');
  triggerSize = computed(() => this.triggerButtonProps().size ?? 'medium');
  triggerShape = computed(() => this.triggerButtonProps().shape ?? 'circular');

  actionVariant = computed(() => this.actionButtonProps().variant ?? 'secondary');
  actionAppearance = computed(() => this.actionButtonProps().appearance ?? 'filled');
  actionSize = computed(() => this.actionButtonProps().size ?? 'medium');
  actionShape = computed(() => this.actionButtonProps().shape ?? 'circular');

  itemTransforms = computed(() => {
    const list = this.items();
    const n = list.length;
    if (n === 0) return [];
    const layout = this.dialType();
    const dir = this.direction();
    const r = Math.max(this.radius(), 8);
    const step = this.gap() + this.itemSizePx();

    switch (layout) {
      case 'linear': {
        const d = this.normalizeLinearDirection(dir);
        return list.map((_, i) => {
          const offset = step * (i + 1);
          switch (d) {
            case 'up':
              return `translate(-50%, -50%) translate(0, ${-offset}px)`;
            case 'down':
              return `translate(-50%, -50%) translate(0, ${offset}px)`;
            case 'left':
              return `translate(-50%, -50%) translate(${-offset}px, 0)`;
            case 'right':
              return `translate(-50%, -50%) translate(${offset}px, 0)`;
            default:
              return `translate(-50%, -50%) translate(0, ${-offset}px)`;
          }
        });
      }
      case 'circle': {
        return list.map((_, i) => {
          const θ = -Math.PI / 2 + (i * 2 * Math.PI) / n;
          const x = r * Math.cos(θ);
          const y = r * Math.sin(θ);
          return `translate(-50%, -50%) translate(${x}px, ${y}px)`;
        });
      }
      case 'semi-circle': {
        const d = this.normalizeSemiDirection(dir);
        let start = 0;
        let end = Math.PI;
        switch (d) {
          case 'down':
            start = 0;
            end = Math.PI;
            break;
          case 'up':
            start = Math.PI;
            end = 2 * Math.PI;
            break;
          case 'left':
            start = Math.PI / 2;
            end = (3 * Math.PI) / 2;
            break;
          case 'right':
            start = -Math.PI / 2;
            end = Math.PI / 2;
            break;
        }
        const angles = arcAngles(n, start, end);
        return angles.map(θ => {
          const x = r * Math.cos(θ);
          const y = r * Math.sin(θ);
          return `translate(-50%, -50%) translate(${x}px, ${y}px)`;
        });
      }
      case 'quarter-circle': {
        const d = this.normalizeQuarterDirection(dir);
        let start = Math.PI;
        let end = (3 * Math.PI) / 2;
        switch (d) {
          case 'up-left':
            start = Math.PI;
            end = (3 * Math.PI) / 2;
            break;
          case 'up-right':
            start = (3 * Math.PI) / 2;
            end = 2 * Math.PI;
            break;
          case 'down-left':
            start = Math.PI / 2;
            end = Math.PI;
            break;
          case 'down-right':
            start = 0;
            end = Math.PI / 2;
            break;
        }
        const angles = arcAngles(n, start, end);
        return angles.map(θ => {
          const x = r * Math.cos(θ);
          const y = r * Math.sin(θ);
          return `translate(-50%, -50%) translate(${x}px, ${y}px)`;
        });
      }
      default:
        return list.map(() => 'translate(-50%, -50%)');
    }
  });

  triggerIcon = computed(() => {
    const open = this.visible();
    const hide = this.hideIcon();
    if (hide && open) return hide;
    return this.showIcon();
  });

  triggerRotate = computed(() => {
    return this.rotateAnimation() && !this.hideIcon() && this.visible();
  });

  actionMenuTabIndex = computed((): number | undefined => (this.visible() ? undefined : -1));

  private normalizeLinearDirection(dir: SpeedDialDirection): SpeedDialLinearDirection {
    const map: Record<string, SpeedDialLinearDirection> = {
      up: 'up',
      down: 'down',
      left: 'left',
      right: 'right',
    };
    return map[dir] ?? 'up';
  }

  private normalizeSemiDirection(dir: SpeedDialDirection): SpeedDialLinearDirection {
    const map: Record<string, SpeedDialLinearDirection> = {
      up: 'up',
      down: 'down',
      left: 'left',
      right: 'right',
    };
    return map[dir] ?? 'up';
  }

  private normalizeQuarterDirection(dir: SpeedDialDirection): SpeedDialQuarterDirection {
    const map: Record<string, SpeedDialQuarterDirection> = {
      'up-left': 'up-left',
      'up-right': 'up-right',
      'down-left': 'down-left',
      'down-right': 'down-right',
    };
    return map[dir] ?? 'up-left';
  }

  itemAriaLabel(item: MenuItem): string {
    return item.label?.trim() ? item.label : item.id;
  }

  tooltipPosition(): TooltipPosition {
    return this.tooltipOptions().tooltipPosition ?? 'top';
  }

  onTriggerClick(event: MouseEvent): void {
    event.stopPropagation();
    if (this.disabled()) return;
    this.click.emit(event);
    this.toggle(event);
  }

  toggle(event?: Event): void {
    if (this.disabled()) return;
    const next = !this.visible();
    if (next) {
      if (this.coordinateWithOthers()) {
        closeOtherSpeedDials(this.instanceId);
      }
      this.visible.set(true);
      this.show.emit(event ?? new Event('show'));
    } else {
      this.visible.set(false);
      this.hide.emit(event ?? new Event('hide'));
    }
  }

  onMaskClick(event: MouseEvent): void {
    event.stopPropagation();
    if (this.visible()) {
      this.visible.set(false);
      this.hide.emit(event);
    }
  }

  onItemAction(item: MenuItem, event: MouseEvent): void {
    event.stopPropagation();
    if (item.disabled) return;
    item.action?.();
    this.visible.set(false);
    this.hide.emit(event);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!isPlatformBrowser(this.platformId) || !this.hideOnClickOutside() || !this.visible()) {
      return;
    }
    const target = event.target as Node;
    if (this.elementRef.nativeElement.contains(target)) {
      return;
    }
    this.visible.set(false);
    this.hide.emit(event);
  }

  @HostListener('document:keydown', ['$event'])
  onDocumentKeydown(event: KeyboardEvent): void {
    if (!isPlatformBrowser(this.platformId) || !this.visible()) return;
    if (event.key === 'Escape') {
      event.stopPropagation();
      this.visible.set(false);
      this.hide.emit(event);
    }
  }

  trackById(_: number, item: MenuItem): string {
    return item.id;
  }

  itemTransitionDelayMs(index: number): number {
    const n = this.items().length;
    if (n === 0) return 0;
    const step = this.transitionDelay();
    if (this.visible()) {
      return index * step;
    }
    return (n - 1 - index) * step;
  }

  private scheduleIdleClose(ms: number | null): void {
    this.clearIdleCloseTimer();
    if (!isPlatformBrowser(this.platformId)) return;
    if (typeof ms !== 'number' || ms <= 0) return;
    this.idleCloseTimer = setTimeout(() => {
      this.idleCloseTimer = null;
      if (this.visible()) {
        this.visible.set(false);
        this.hide.emit(new Event('timeout'));
      }
    }, ms);
  }

  private clearIdleCloseTimer(): void {
    if (this.idleCloseTimer !== null) {
      clearTimeout(this.idleCloseTimer);
      this.idleCloseTimer = null;
    }
  }

  private closeFromCoordination(): void {
    if (!this.visible()) return;
    this.visible.set(false);
    this.hide.emit(new Event('hide'));
  }
}
