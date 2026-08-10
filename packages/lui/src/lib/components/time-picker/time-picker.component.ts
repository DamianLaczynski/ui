import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  effect,
  input,
  output,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { RadioButtonItem } from '../field/radio-button-group/radio-button-group.component';
import { RadioButtonGroupComponent } from '../field/radio-button-group/radio-button-group.component';

type WheelType = 'hour' | 'minute';

type Meridiem = 'am' | 'pm';

function hour24From12(h12: number, meridiem: Meridiem): number {
  if (meridiem === 'am') {
    return h12 === 12 ? 0 : h12;
  }
  return h12 === 12 ? 12 : h12 + 12;
}

function hour12PartsFrom24(h24: number): { h12: number; meridiem: Meridiem } {
  if (h24 === 0) {
    return { h12: 12, meridiem: 'am' };
  }
  if (h24 < 12) {
    return { h12: h24, meridiem: 'am' };
  }
  if (h24 === 12) {
    return { h12: 12, meridiem: 'pm' };
  }
  return { h12: h24 - 12, meridiem: 'pm' };
}

interface DragState {
  pointerId: number;
  startY: number;
  lastY: number;
  pixelRemainder: number;
  dragging: boolean;
}

@Component({
  selector: 'ui-time-picker',
  standalone: true,
  templateUrl: './time-picker.component.html',
  imports: [FormsModule, RadioButtonGroupComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }
    `,
  ],
})
export class TimePickerComponent implements AfterViewInit, OnDestroy {
  value = input<string>('');
  step = input<number | string>('');
  size = input<'small' | 'medium' | 'large'>('medium');
  use24HourFormat = input<boolean>(true);
  inline = input<boolean>(false);
  showLabel = input<boolean>(false);
  label = input<string>('Time');
  disabled = input<boolean>(false);

  timeChange = output<string>();

  readonly meridiemItems: RadioButtonItem[] = [
    { id: 'am', label: 'AM', value: 'am' as Meridiem },
    { id: 'pm', label: 'PM', value: 'pm' as Meridiem },
  ];

  private static nextMeridiemId = 0;

  readonly meridiemGroupName = `ui-time-picker-mer-${TimePickerComponent.nextMeridiemId++}`;

  selectedHour = signal<number>(12);
  selectedMinute = signal<number>(0);
  selectedMeridiem = signal<Meridiem>('am');
  private lastHour24 = signal<number>(12);
  isHourDragging = signal<boolean>(false);
  isMinuteDragging = signal<boolean>(false);

  hourOptions: number[] = [];
  minuteOptions: number[] = [];
  hourWheelOptions: number[] = [];
  minuteWheelOptions: number[] = [];

  @ViewChild('hourWheel') private hourWheelRef?: ElementRef<HTMLDivElement>;
  @ViewChild('minuteWheel') private minuteWheelRef?: ElementRef<HTMLDivElement>;

  private readonly wheelRepeatCount = 3;
  private readonly sizeToItemHeight: Record<'small' | 'medium' | 'large', number> = {
    small: 32,
    medium: 40,
    large: 48,
  };

  private isViewReady = false;

  private hourAnimationFrameId: number | null = null;
  private minuteAnimationFrameId: number | null = null;
  private hourVisualIndex: number | null = null;
  private minuteVisualIndex: number | null = null;

  private hourDragState: DragState | null = null;
  private minuteDragState: DragState | null = null;
  private readonly dragActivationPx = 4;

  constructor() {
    const initialValue = this.value();
    if (initialValue) {
      const parsed = this.parseTimeString(initialValue);
      this.lastHour24.set(parsed.hour);
      this.selectedMinute.set(parsed.minute);
    } else {
      const now = new Date();
      this.lastHour24.set(now.getHours());
      this.selectedMinute.set(now.getMinutes());
    }

    effect(() => {
      const format24h = this.use24HourFormat();
      const minuteStep = this.getMinuteStep();
      const h24 = this.lastHour24();
      const currentMinute = this.selectedMinute();

      this.hourOptions = this.buildHourOptions(format24h);
      this.minuteOptions = this.buildMinuteOptions(minuteStep);
      this.hourWheelOptions = this.repeatOptions(this.hourOptions);
      this.minuteWheelOptions = this.repeatOptions(this.minuteOptions);

      if (format24h) {
        this.selectedHour.set(this.normalizeToOptions(h24, this.hourOptions));
      } else {
        const { h12, meridiem } = hour12PartsFrom24(h24);
        this.selectedMeridiem.set(meridiem);
        this.selectedHour.set(this.normalizeToOptions(h12, this.hourOptions));
      }

      this.selectedMinute.set(this.normalizeToOptions(currentMinute, this.minuteOptions));

      if (this.isViewReady) {
        this.syncHourScrollToSelected(false);
        this.syncMinuteScrollToSelected(false);
      }
    });

    effect(() => {
      const timeValue = this.value();
      this.use24HourFormat();
      this.step();

      if (!timeValue) {
        return;
      }

      const parsed = this.parseTimeString(timeValue);
      const normalizedMinute = this.normalizeToOptions(
        parsed.minute,
        this.buildMinuteOptions(this.getMinuteStep()),
      );

      this.lastHour24.set(parsed.hour);

      if (this.selectedMinute() !== normalizedMinute) {
        this.selectedMinute.set(normalizedMinute);
      }

      if (this.isViewReady) {
        this.syncHourScrollToSelected(true);
        this.syncMinuteScrollToSelected(true);
      }
    });
  }

  ngAfterViewInit(): void {
    this.isViewReady = true;
    this.syncHourScrollToSelected(false);
    this.syncMinuteScrollToSelected(false);
  }

  ngOnDestroy(): void {
    this.cancelWheelAnimation('hour');
    this.cancelWheelAnimation('minute');
  }

  getHourClass(index: number, value: number): string {
    const classes = ['time-picker__option'];
    if (this.isHourSelected(index, value)) {
      classes.push('time-picker__option--selected');
    }
    return classes.join(' ');
  }

  getMinuteClass(index: number, value: number): string {
    const classes = ['time-picker__option'];
    if (this.isMinuteSelected(index, value)) {
      classes.push('time-picker__option--selected');
    }
    return classes.join(' ');
  }

  formatHourLabel(hour: number): string {
    return String(hour).padStart(2, '0');
  }

  formatMinuteLabel(minute: number): string {
    return String(minute).padStart(2, '0');
  }

  onMeridiemSelect(next: unknown): void {
    if (this.use24HourFormat() || this.disabled()) {
      return;
    }

    if (typeof next !== 'string' || (next !== 'am' && next !== 'pm')) {
      return;
    }

    if (this.selectedMeridiem() === next) {
      return;
    }

    this.selectedMeridiem.set(next as Meridiem);
    this.emitCurrentTime();
  }

  onOptionClick(type: WheelType, event: MouseEvent): void {
    if (this.disabled()) {
      return;
    }

    const wheel = this.getWheelElement(type);
    if (!wheel) {
      return;
    }

    const wheelRect = wheel.getBoundingClientRect();
    const wheelCenterY = wheelRect.top + wheelRect.height / 2;
    const target = event.currentTarget as HTMLElement | null;
    const targetCenterY = target
      ? target.getBoundingClientRect().top + target.getBoundingClientRect().height / 2
      : event.clientY;
    const step = targetCenterY < wheelCenterY ? -1 : targetCenterY > wheelCenterY ? 1 : 0;

    if (step === 0) {
      return;
    }

    this.changeByStep(type, step, true, true);
  }

  onWheelKeyDown(type: WheelType, event: KeyboardEvent): void {
    if (this.disabled()) {
      return;
    }

    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        this.changeByStep(type, -1, true, true);
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.changeByStep(type, 1, true, true);
        break;
      case 'PageUp':
        event.preventDefault();
        this.changeByStep(type, -5, true, true);
        break;
      case 'PageDown':
        event.preventDefault();
        this.changeByStep(type, 5, true, true);
        break;
      default:
        break;
    }
  }

  onWheel(type: WheelType, event: WheelEvent): void {
    if (this.disabled()) {
      return;
    }

    const normalizedDelta = this.normalizeWheelDelta(event);
    if (normalizedDelta === 0) {
      return;
    }

    event.preventDefault();
    this.cancelWheelAnimation(type);

    // One wheel event = exactly one value step.
    const step = normalizedDelta > 0 ? 1 : -1;
    if (normalizedDelta !== 0) {
      this.changeByStep(type, step, true, true);
    }
  }

  onWheelPointerDown(type: WheelType, event: PointerEvent): void {
    if (this.disabled()) {
      return;
    }

    if (event.pointerType === 'mouse' && event.button !== 0) {
      return;
    }

    const element = this.getWheelElement(type);
    if (!element) {
      return;
    }

    const state: DragState = {
      pointerId: event.pointerId,
      startY: event.clientY,
      lastY: event.clientY,
      pixelRemainder: 0,
      dragging: false,
    };

    if (type === 'hour') {
      this.hourDragState = state;
    } else {
      this.minuteDragState = state;
    }
  }

  onWheelPointerMove(type: WheelType, event: PointerEvent): void {
    const state = type === 'hour' ? this.hourDragState : this.minuteDragState;
    if (!state || state.pointerId !== event.pointerId) {
      return;
    }

    const travelFromStart = Math.abs(event.clientY - state.startY);
    if (!state.dragging && travelFromStart >= this.dragActivationPx) {
      const element = this.getWheelElement(type);
      if (!element) {
        return;
      }

      this.cancelWheelAnimation(type);
      state.dragging = true;
      if (type === 'hour') {
        this.isHourDragging.set(true);
      } else {
        this.isMinuteDragging.set(true);
      }
      element.setPointerCapture(event.pointerId);
    }

    if (!state.dragging) {
      return;
    }

    const deltaY = event.clientY - state.lastY;
    state.lastY = event.clientY;
    state.pixelRemainder += deltaY;

    const dragThreshold = this.getDragThreshold();
    let steps = 0;
    while (Math.abs(state.pixelRemainder) >= dragThreshold) {
      const step = state.pixelRemainder > 0 ? -1 : 1;
      state.pixelRemainder -= state.pixelRemainder > 0 ? dragThreshold : -dragThreshold;
      steps += step;
    }

    if (steps !== 0) {
      this.changeByStep(type, steps, true, true);
    }

    event.preventDefault();
  }

  onWheelPointerUp(type: WheelType, event: PointerEvent): void {
    const state = type === 'hour' ? this.hourDragState : this.minuteDragState;
    if (!state || state.pointerId !== event.pointerId) {
      return;
    }

    const element = this.getWheelElement(type);
    if (element && state.dragging && element.hasPointerCapture(event.pointerId)) {
      element.releasePointerCapture(event.pointerId);
    }

    if (type === 'hour') {
      this.hourDragState = null;
      this.isHourDragging.set(false);
    } else {
      this.minuteDragState = null;
      this.isMinuteDragging.set(false);
    }

    if (state.dragging) {
      if (type === 'hour') {
        this.syncHourScrollToSelected(true);
      } else {
        this.syncMinuteScrollToSelected(true);
      }
    }
  }

  private getWheelElement(type: WheelType): HTMLDivElement | null {
    if (type === 'hour') {
      return this.hourWheelRef?.nativeElement ?? null;
    }

    return this.minuteWheelRef?.nativeElement ?? null;
  }

  isHourSelected(index: number, value: number): boolean {
    if (this.hourVisualIndex != null) {
      return index === this.hourVisualIndex;
    }
    return (
      value === this.selectedHour() && this.isIndexInMiddleSegment(index, this.hourOptions.length)
    );
  }

  isMinuteSelected(index: number, value: number): boolean {
    if (this.minuteVisualIndex != null) {
      return index === this.minuteVisualIndex;
    }
    return (
      value === this.selectedMinute() &&
      this.isIndexInMiddleSegment(index, this.minuteOptions.length)
    );
  }

  private isIndexInMiddleSegment(index: number, baseLength: number): boolean {
    if (baseLength === 0) {
      return false;
    }

    return index >= baseLength && index < baseLength * 2;
  }

  private syncHourScrollToSelected(smooth: boolean): void {
    if (!this.hourOptions.length) {
      return;
    }

    const selected = this.normalizeToOptions(this.selectedHour(), this.hourOptions);
    const baseIndex = this.hourOptions.indexOf(selected);
    if (baseIndex < 0) {
      return;
    }

    const visualIndex = this.hourOptions.length + baseIndex;
    this.hourVisualIndex = visualIndex;
    this.scrollWheelToIndex('hour', visualIndex, smooth);
  }

  private syncMinuteScrollToSelected(smooth: boolean): void {
    if (!this.minuteOptions.length) {
      return;
    }

    const selected = this.normalizeToOptions(this.selectedMinute(), this.minuteOptions);
    const baseIndex = this.minuteOptions.indexOf(selected);
    if (baseIndex < 0) {
      return;
    }

    const visualIndex = this.minuteOptions.length + baseIndex;
    this.minuteVisualIndex = visualIndex;
    this.scrollWheelToIndex('minute', visualIndex, smooth);
  }

  private scrollWheelToIndex(type: WheelType, index: number, smooth: boolean): void {
    const element = this.getWheelElement(type);
    if (!element) {
      return;
    }

    const top = index * this.getItemHeight();
    this.setWheelScrollTop(type, element, top, smooth);
  }

  private changeByStep(type: WheelType, delta: number, smooth: boolean, emit: boolean): void {
    const baseOptions = type === 'hour' ? this.hourOptions : this.minuteOptions;
    const wheelOptions = type === 'hour' ? this.hourWheelOptions : this.minuteWheelOptions;
    if (!baseOptions.length || delta === 0) {
      return;
    }

    const currentValue = type === 'hour' ? this.selectedHour() : this.selectedMinute();
    const currentIndex = baseOptions.indexOf(currentValue);
    if (currentIndex < 0) {
      return;
    }

    const total = wheelOptions.length;
    const base = baseOptions.length;
    const currentVisual =
      (type === 'hour' ? this.hourVisualIndex : this.minuteVisualIndex) ?? base + currentIndex;
    const rawTarget = this.mod(currentVisual + delta, total);
    const nextValue = wheelOptions[rawTarget];
    const wrapped =
      (delta > 0 && rawTarget < currentVisual) || (delta < 0 && rawTarget > currentVisual);

    if (type === 'hour') {
      this.selectedHour.set(nextValue);
      this.hourVisualIndex = rawTarget;
    } else {
      this.selectedMinute.set(nextValue);
      this.minuteVisualIndex = rawTarget;
    }

    this.scrollWheelToIndex(type, rawTarget, wrapped ? false : smooth);
    this.recenterVisualIndexIfNeeded(type, rawTarget, smooth);

    if (emit) {
      this.emitCurrentTime();
    }
  }

  private getItemHeight(): number {
    return this.sizeToItemHeight[this.size()] ?? this.sizeToItemHeight.medium;
  }

  private setWheelScrollTop(
    type: WheelType,
    element: HTMLDivElement,
    top: number,
    smooth: boolean,
  ): void {
    this.cancelWheelAnimation(type);
    if (!smooth) {
      this.applyScrollTop(element, top);
      return;
    }

    const startTop = element.scrollTop;
    const delta = top - startTop;
    if (delta === 0) {
      return;
    }

    const duration = 140;
    const startTime = this.now();
    const step = () => {
      const elapsed = this.now() - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      this.applyScrollTop(element, startTop + delta * eased);

      if (progress < 1) {
        this.setAnimationFrameId(type, this.nextFrame(step));
      } else {
        this.setAnimationFrameId(type, null);
      }
    };

    this.setAnimationFrameId(type, this.nextFrame(step));
  }

  private applyScrollTop(element: HTMLDivElement, top: number): void {
    if (typeof element.scrollTo === 'function') {
      element.scrollTo({ top, behavior: 'auto' });
    } else {
      element.scrollTop = top;
    }
  }

  private cancelWheelAnimation(type: WheelType): void {
    const id = this.getAnimationFrameId(type);
    if (id == null) {
      return;
    }

    if (typeof cancelAnimationFrame === 'function') {
      cancelAnimationFrame(id);
    } else {
      clearTimeout(id);
    }

    this.setAnimationFrameId(type, null);
  }

  private getAnimationFrameId(type: WheelType): number | null {
    return type === 'hour' ? this.hourAnimationFrameId : this.minuteAnimationFrameId;
  }

  private setAnimationFrameId(type: WheelType, id: number | null): void {
    if (type === 'hour') {
      this.hourAnimationFrameId = id;
    } else {
      this.minuteAnimationFrameId = id;
    }
  }

  private nextFrame(callback: FrameRequestCallback): number {
    if (typeof requestAnimationFrame === 'function') {
      return requestAnimationFrame(callback);
    }

    return setTimeout(() => callback(this.now()), 16) as unknown as number;
  }

  private now(): number {
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
      return performance.now();
    }

    return Date.now();
  }

  private recenterVisualIndexIfNeeded(type: WheelType, visualIndex: number, smooth: boolean): void {
    const base = type === 'hour' ? this.hourOptions.length : this.minuteOptions.length;
    if (!base) {
      return;
    }

    const middleStart = base;
    const middleEnd = base * 2 - 1;
    if (visualIndex >= middleStart && visualIndex <= middleEnd) {
      return;
    }

    const recentered = visualIndex < middleStart ? visualIndex + base : visualIndex - base;
    const delay = smooth ? 150 : 0;
    setTimeout(() => {
      const element = this.getWheelElement(type);
      if (!element) {
        return;
      }

      if (type === 'hour') {
        this.hourVisualIndex = recentered;
      } else {
        this.minuteVisualIndex = recentered;
      }

      this.setWheelScrollTop(type, element, recentered * this.getItemHeight(), false);
    }, delay);
  }

  private mod(value: number, divisor: number): number {
    return ((value % divisor) + divisor) % divisor;
  }

  private getDragThreshold(): number {
    return Math.max(8, this.getItemHeight() * 0.33);
  }

  private normalizeWheelDelta(event: WheelEvent): number {
    if (event.deltaMode === 1) {
      return event.deltaY * 16;
    }

    if (event.deltaMode === 2) {
      return event.deltaY * this.getItemHeight();
    }

    return event.deltaY;
  }

  private buildHourOptions(format24h: boolean): number[] {
    if (format24h) {
      return Array.from({ length: 24 }, (_, index) => index);
    }

    return Array.from({ length: 12 }, (_, index) => index + 1);
  }

  private buildMinuteOptions(stepMinutes: number): number[] {
    const safeStep = Math.max(1, Math.min(59, stepMinutes));
    const values: number[] = [];

    for (let minute = 0; minute < 60; minute += safeStep) {
      values.push(minute);
    }

    if (!values.includes(0)) {
      values.unshift(0);
    }

    return values;
  }

  private repeatOptions(options: number[]): number[] {
    return Array.from({ length: this.wheelRepeatCount }, () => options).flat();
  }

  private normalizeToOptions(value: number, options: number[]): number {
    if (!options.length) {
      return value;
    }

    if (options.includes(value)) {
      return value;
    }

    let nearest = options[0];
    let nearestDiff = Math.abs(value - nearest);

    for (const option of options) {
      const diff = Math.abs(value - option);
      if (diff < nearestDiff) {
        nearest = option;
        nearestDiff = diff;
      }
    }

    return nearest;
  }

  private formatTime(hour: number, minute: number): string {
    return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
  }

  private emitCurrentTime(): void {
    const minute = this.selectedMinute();
    const h24 = this.use24HourFormat()
      ? this.selectedHour()
      : hour24From12(this.selectedHour(), this.selectedMeridiem());

    this.lastHour24.set(h24);
    this.timeChange.emit(this.formatTime(h24, minute));
  }

  private getMinuteStep(): number {
    const stepValue = this.step();
    if (!stepValue) {
      return 1;
    }

    const parsedStep = typeof stepValue === 'string' ? parseInt(stepValue, 10) : stepValue;
    if (!parsedStep || parsedStep <= 0) {
      return 1;
    }

    return Math.max(1, Math.floor(parsedStep / 60)) || 1;
  }

  private parseTimeString(timeStr: string): { hour: number; minute: number } {
    const [hourStr, minuteStr] = timeStr.split(':');
    return {
      hour: parseInt(hourStr, 10) || 0,
      minute: parseInt(minuteStr, 10) || 0,
    };
  }
}
