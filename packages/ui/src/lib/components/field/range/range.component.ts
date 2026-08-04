import {
  Component,
  computed,
  ElementRef,
  forwardRef,
  input,
  model,
  signal,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FieldComponent } from '../field/field.component';

export interface NumericRange {
  min: number;
  max: number;
}

/** @deprecated Use {@link NumericRange} */
export type SliderRangeValue = NumericRange;

@Component({
  selector: 'ui-range',
  imports: [CommonModule, FieldComponent],
  templateUrl: './range.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RangeComponent),
      multi: true,
    },
  ],
})
export class RangeComponent extends FieldComponent implements ControlValueAccessor {
  @ViewChild('trackWrapper', { read: ElementRef }) trackWrapper!: ElementRef<HTMLElement>;
  @ViewChild('lowerInput') lowerInputEl!: ElementRef<HTMLInputElement>;
  @ViewChild('upperInput') upperInputEl!: ElementRef<HTMLInputElement>;

  valueModel = model<NumericRange>({ min: 0, max: 100 });

  min = input<number>(0);
  max = input<number>(100);
  step = input<number>(1);
  formatValue = input<(value: number) => string>(value => value.toString());
  ariaValueText = input<string | ((value: NumericRange) => string) | null>(null);
  showStepMarkers = input<boolean>(false);
  showMinMax = input<boolean>(false);

  protected leftEndpoint = signal(0);
  protected rightEndpoint = signal(100);

  private dragging = signal(false);
  private draggingThumb = signal<'lower' | 'upper' | null>(null);
  private pointerHitThumb = signal<'lower' | 'upper' | null>(null);

  readonly isDragging = computed(() => this.dragging());

  readonly rangeClasses = computed(() => {
    const classes = ['range'];
    classes.push(`range--${this.size()}`);
    if (this.disabled()) {
      classes.push('range--disabled');
    }
    if (this.readonly()) {
      classes.push('range--readonly');
    }
    if (this.dragging()) {
      classes.push('range--dragging');
    }
    return classes.join(' ');
  });

  readonly lowValue = computed(() => {
    const l = this.leftEndpoint();
    const r = this.rightEndpoint();
    return Math.min(l, r);
  });

  readonly highValue = computed(() => {
    const l = this.leftEndpoint();
    const r = this.rightEndpoint();
    return Math.max(l, r);
  });

  readonly leftThumbPercent = computed(() => {
    const range = this.max() - this.min();
    if (range <= 0) return 0;
    return Math.min(100, Math.max(0, ((this.leftEndpoint() - this.min()) / range) * 100));
  });

  readonly rightThumbPercent = computed(() => {
    const range = this.max() - this.min();
    if (range <= 0) return 0;
    return Math.min(100, Math.max(0, ((this.rightEndpoint() - this.min()) / range) * 100));
  });

  readonly computedAriaLabel = computed(() => {
    const explicit = this.ariaLabel()?.trim();
    if (explicit) {
      return explicit;
    }
    const fallback = this.label()?.trim();
    return fallback || null;
  });

  readonly computedAriaValueText = computed(() => {
    const aria = this.ariaValueText();
    if (!aria) return null;
    if (typeof aria === 'function') return aria({ min: this.lowValue(), max: this.highValue() });
    return aria;
  });

  readonly lowerAriaValueTextAttr = computed(() => {
    const custom = this.computedAriaValueText();
    return custom != null && custom !== '' ? custom : this.formatValue()(this.leftEndpoint());
  });

  readonly upperAriaValueTextAttr = computed(() => {
    const custom = this.computedAriaValueText();
    return custom != null && custom !== '' ? custom : this.formatValue()(this.rightEndpoint());
  });

  readonly stepsPercent = computed(() => {
    if (!this.showStepMarkers()) return null;
    const s = this.step();
    const minVal = this.min();
    const maxVal = this.max();
    if (s <= 0 || maxVal <= minVal) return null;
    const range = maxVal - minVal;
    const numSteps = Math.round(range / s);
    if (numSteps < 2) return null;
    return `${100 / numSteps}%`;
  });

  readonly visualStyle = computed<Record<string, string>>(() => {
    const pL = this.leftThumbPercent();
    const pR = this.rightThumbPercent();
    const fillStart = Math.min(pL, pR);
    const fillEnd = Math.max(pL, pR);
    const stepsPercent = this.stepsPercent();
    const style: Record<string, string> = {
      '--range-low': `${fillStart}%`,
      '--range-high': `${fillEnd}%`,
    };
    if (stepsPercent) {
      style['--slider-steps-percent'] = stepsPercent;
    }
    return style;
  });

  readonly lowerThumbStyle = computed<Record<string, string>>(() => {
    const progress = `${this.leftThumbPercent()}%`;
    const position = `clamp(var(--slider-thumb-radius), ${progress}, calc(100% - var(--slider-thumb-radius)))`;
    return {
      insetInlineStart: position,
      transform: 'translate(var(--slider-thumb-translate-x), -50%)',
    };
  });

  readonly upperThumbStyle = computed<Record<string, string>>(() => {
    const progress = `${this.rightThumbPercent()}%`;
    const position = `clamp(var(--slider-thumb-radius), ${progress}, calc(100% - var(--slider-thumb-radius)))`;
    return {
      insetInlineStart: position,
      transform: 'translate(var(--slider-thumb-translate-x), -50%)',
    };
  });

  readonly lowerInputZIndex = computed(() => {
    const d = this.draggingThumb();
    if (d === 'lower') return 30;
    if (d === 'upper') return 10;
    const pref = this.pointerHitThumb();
    if (pref === 'lower') return 22;
    if (pref === 'upper') return 21;
    const mid = (this.leftThumbPercent() + this.rightThumbPercent()) / 2;
    return mid < 50 ? 22 : 21;
  });

  readonly upperInputZIndex = computed(() => {
    const d = this.draggingThumb();
    if (d === 'upper') return 30;
    if (d === 'lower') return 10;
    const pref = this.pointerHitThumb();
    if (pref === 'upper') return 22;
    if (pref === 'lower') return 21;
    const mid = (this.leftThumbPercent() + this.rightThumbPercent()) / 2;
    return mid < 50 ? 21 : 22;
  });

  readonly rangeGroupAriaLabel = computed(() => {
    const base = this.computedAriaLabel();
    return base ? `${base} range` : 'Range';
  });

  readonly lowerAriaLabel = computed(() => {
    const base = this.computedAriaLabel();
    return base ? `${base} minimum` : 'Minimum';
  });

  readonly upperAriaLabel = computed(() => {
    const base = this.computedAriaLabel();
    return base ? `${base} maximum` : 'Maximum';
  });

  private pointerToPercent(clientX: number, rect: DOMRect): number {
    const el = this.trackWrapper?.nativeElement;
    const w = rect.width || 1;
    const rtl =
      el && typeof getComputedStyle !== 'undefined' && getComputedStyle(el).direction === 'rtl';
    if (rtl) {
      return Math.min(100, Math.max(0, ((rect.right - clientX) / w) * 100));
    }
    return Math.min(100, Math.max(0, ((clientX - rect.left) / w) * 100));
  }

  private updateHitThumbFromClientX(clientX: number): void {
    const el = this.trackWrapper?.nativeElement;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = this.pointerToPercent(clientX, rect);
    const low = this.leftThumbPercent();
    const high = this.rightThumbPercent();
    const distLow = Math.abs(pct - low);
    const distHigh = Math.abs(pct - high);
    this.pointerHitThumb.set(distLow <= distHigh ? 'lower' : 'upper');
  }

  onTrackPointerMove(event: Event): void {
    const pointerEvent = event as PointerEvent;
    if (this.disabled() || this.readonly()) return;
    if (this.dragging()) {
      const thumb = this.draggingThumb();
      if (thumb) {
        this.applyClientXToThumb(pointerEvent.clientX, thumb);
      }
      return;
    }
    this.updateHitThumbFromClientX(pointerEvent.clientX);
  }

  onTrackPointerDownCapture(event: Event): void {
    const pointerEvent = event as PointerEvent;
    if (this.disabled() || this.readonly()) return;
    if (pointerEvent.pointerType === 'mouse' && pointerEvent.button !== 0) return;
    this.updateHitThumbFromClientX(pointerEvent.clientX);
    const thumb = this.pointerHitThumb() ?? 'lower';
    pointerEvent.preventDefault();
    pointerEvent.stopPropagation();
    const host = this.trackWrapper?.nativeElement;
    if (host?.setPointerCapture) {
      host.setPointerCapture(pointerEvent.pointerId);
    }
    this.dragging.set(true);
    this.draggingThumb.set(thumb);
    const activeEl =
      thumb === 'lower' ? this.lowerInputEl?.nativeElement : this.upperInputEl?.nativeElement;
    activeEl?.focus({ preventScroll: true });
    this.applyClientXToThumb(pointerEvent.clientX, thumb);
  }

  onTrackPointerUp(event: Event): void {
    if (!this.dragging()) return;
    const pointerEvent = event as PointerEvent;
    const host = this.trackWrapper?.nativeElement;
    if (host?.hasPointerCapture?.(pointerEvent.pointerId)) {
      host.releasePointerCapture(pointerEvent.pointerId);
    }
    this.change.emit(this.valueModel());
    this.dragging.set(false);
    this.draggingThumb.set(null);
  }

  onTrackPointerCancel(event: Event): void {
    this.onTrackPointerUp(event);
  }

  private valueFromClientX(clientX: number): number {
    const el = this.trackWrapper?.nativeElement;
    if (!el) return this.min();
    const rect = el.getBoundingClientRect();
    const pct = this.pointerToPercent(clientX, rect);
    const tMin = this.min();
    const tMax = this.max();
    const raw = tMin + (pct / 100) * (tMax - tMin);
    return this.snapEndpoint(raw);
  }

  private applyClientXToThumb(clientX: number, thumb: 'lower' | 'upper'): void {
    const v = this.valueFromClientX(clientX);
    if (thumb === 'lower') {
      this.leftEndpoint.set(v);
    } else {
      this.rightEndpoint.set(v);
    }
    this.syncCvaModelFromEndpoints();
  }

  onTrackPointerLeave(): void {
    if (this.dragging()) return;
    this.pointerHitThumb.set(null);
  }

  onRangeInputFocus(thumb: 'lower' | 'upper', event: FocusEvent): void {
    this.pointerHitThumb.set(thumb);
    this.onFocus(event);
  }

  private snapEndpoint(n: number): number {
    const tMin = this.min();
    const tMax = this.max();
    const s = this.step();
    let v = Math.min(tMax, Math.max(tMin, n));
    if (s > 0) {
      const k = Math.round((v - tMin) / s);
      v = tMin + k * s;
    }
    return v;
  }

  private clampRange(v: NumericRange): NumericRange {
    const tMin = this.min();
    const tMax = this.max();
    const s = this.step();
    let lo = Math.min(tMax, Math.max(tMin, v.min));
    let hi = Math.min(tMax, Math.max(tMin, v.max));
    if (hi < lo) {
      const t = lo;
      lo = hi;
      hi = t;
    }
    if (s > 0) {
      const snap = (n: number) => {
        const k = Math.round((n - tMin) / s);
        return tMin + k * s;
      };
      lo = snap(lo);
      hi = snap(hi);
      if (hi < lo) {
        hi = lo;
      }
    }
    return { min: lo, max: hi };
  }

  private syncCvaModelFromEndpoints(): void {
    if (this.disabled() || this.readonly()) return;
    const lo = this.leftEndpoint();
    const hi = this.rightEndpoint();
    const sorted = { min: Math.min(lo, hi), max: Math.max(lo, hi) };
    this.value = sorted;
    this.valueModel.set(sorted);
    this.onChange(sorted);
  }

  onLowerInput(): void {
    if (this.disabled() || this.readonly()) return;
    const raw = parseFloat(this.lowerInputEl.nativeElement.value);
    if (!Number.isFinite(raw)) return;
    this.leftEndpoint.set(this.snapEndpoint(raw));
    this.syncCvaModelFromEndpoints();
  }

  onUpperInput(): void {
    if (this.disabled() || this.readonly()) return;
    const raw = parseFloat(this.upperInputEl.nativeElement.value);
    if (!Number.isFinite(raw)) return;
    this.rightEndpoint.set(this.snapEndpoint(raw));
    this.syncCvaModelFromEndpoints();
  }

  onLowerChange(): void {
    if (this.disabled() || this.readonly()) return;
    this.change.emit(this.valueModel());
  }

  onUpperChange(): void {
    if (this.disabled() || this.readonly()) return;
    this.change.emit(this.valueModel());
  }

  onLowerKeyDown(event: KeyboardEvent): void {
    this.handleThumbKeyDown(event, 'lower');
  }

  onUpperKeyDown(event: KeyboardEvent): void {
    this.handleThumbKeyDown(event, 'upper');
  }

  private handleThumbKeyDown(event: KeyboardEvent, thumb: 'lower' | 'upper'): void {
    if (this.disabled() || this.readonly()) {
      event.preventDefault();
      return;
    }

    const handled = new Set([
      'ArrowRight',
      'ArrowUp',
      'ArrowLeft',
      'ArrowDown',
      'PageUp',
      'PageDown',
      'Home',
      'End',
    ]);
    if (!handled.has(event.key)) {
      return;
    }

    event.preventDefault();

    const step = this.step() > 0 ? this.step() : 1;
    const lo = this.leftEndpoint();
    const hi = this.rightEndpoint();
    const tMin = this.min();
    const tMax = this.max();

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        if (thumb === 'lower') {
          this.leftEndpoint.set(this.snapEndpoint(Math.min(lo + step, tMax)));
        } else {
          this.rightEndpoint.set(this.snapEndpoint(Math.min(hi + step, tMax)));
        }
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        if (thumb === 'lower') {
          this.leftEndpoint.set(this.snapEndpoint(Math.max(lo - step, tMin)));
        } else {
          this.rightEndpoint.set(this.snapEndpoint(Math.max(hi - step, tMin)));
        }
        break;
      case 'PageUp':
        if (thumb === 'lower') {
          this.leftEndpoint.set(this.snapEndpoint(Math.min(lo + step * 10, tMax)));
        } else {
          this.rightEndpoint.set(this.snapEndpoint(Math.min(hi + step * 10, tMax)));
        }
        break;
      case 'PageDown':
        if (thumb === 'lower') {
          this.leftEndpoint.set(this.snapEndpoint(Math.max(lo - step * 10, tMin)));
        } else {
          this.rightEndpoint.set(this.snapEndpoint(Math.max(hi - step * 10, tMin)));
        }
        break;
      case 'Home':
        if (thumb === 'lower') {
          this.leftEndpoint.set(this.snapEndpoint(tMin));
        } else {
          this.rightEndpoint.set(this.snapEndpoint(tMin));
        }
        break;
      case 'End':
        if (thumb === 'lower') {
          this.leftEndpoint.set(this.snapEndpoint(tMax));
        } else {
          this.rightEndpoint.set(this.snapEndpoint(tMax));
        }
        break;
      default:
        break;
    }

    this.syncCvaModelFromEndpoints();
    this.change.emit(this.valueModel());
  }

  override onBlur(event: FocusEvent): void {
    this._isFocused = false;
    this.dragging.set(false);
    this.draggingThumb.set(null);
    this.pointerHitThumb.set(null);
    super.onBlur(event);
  }

  override writeValue(value: unknown): void {
    const tMin = this.min();
    const tMax = this.max();
    if (value !== null && value !== undefined && typeof value === 'object') {
      const o = value as Record<string, unknown>;
      const a = o['min'];
      const b = o['max'];
      const minNum = typeof a === 'number' ? a : parseFloat(String(a));
      const maxNum = typeof b === 'number' ? b : parseFloat(String(b));
      if (Number.isFinite(minNum) && Number.isFinite(maxNum)) {
        const clamped = this.clampRange({ min: minNum, max: maxNum });
        this.value = clamped;
        this.valueModel.set(clamped);
        this.leftEndpoint.set(clamped.min);
        this.rightEndpoint.set(clamped.max);
        return;
      }
    }
    const def = { min: tMin, max: tMax };
    this.value = def;
    this.valueModel.set(def);
    this.leftEndpoint.set(tMin);
    this.rightEndpoint.set(tMax);
  }
}
