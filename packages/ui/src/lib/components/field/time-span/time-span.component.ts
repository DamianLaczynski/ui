import {
  Component,
  forwardRef,
  input,
  output,
  signal,
  computed,
  ElementRef,
  ViewChild,
  ViewContainerRef,
  TemplateRef,
  OnDestroy,
  inject,
  NgZone,
} from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { FieldComponent } from '../field/field.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActionButtonComponent } from '../action-button.component';
import {
  openConnectedOverlay,
  OverlayHandle,
  DEFAULT_CONNECTED_POSITIONS,
  DEFAULT_VIEWPORT_MARGIN,
} from '../../overlay/open-connected-overlay';

export interface TimeSpanValue {
  years?: number;
  months?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

export interface TimeSpanUnit {
  key: keyof TimeSpanValue;
  label: string;
  shortLabel: string;
  enabled: boolean;
}

interface WheelOption {
  value: number | null;
  isSelected: boolean;
}

interface DragState {
  pointerId: number;
  startY: number;
  lastY: number;
  pixelRemainder: number;
  dragging: boolean;
}

const TIME_SPAN_UNITS: Record<keyof TimeSpanValue, Omit<TimeSpanUnit, 'enabled'>> = {
  years: { key: 'years', label: 'Years', shortLabel: 'Y' },
  months: { key: 'months', label: 'Months', shortLabel: 'M' },
  days: { key: 'days', label: 'Days', shortLabel: 'D' },
  hours: { key: 'hours', label: 'Hours', shortLabel: 'H' },
  minutes: { key: 'minutes', label: 'Minutes', shortLabel: 'M' },
  seconds: { key: 'seconds', label: 'Seconds', shortLabel: 'S' },
};

const ISO8601_DURATION_PREFIX = 'P';
const ISO8601_TIME_SEPARATOR = 'T';

// Unit conversion limits
// Note: ISO 8601 does not define a fixed number of days per month
// (months can have 28-31 days depending on the calendar month)
// Therefore, we do NOT convert days to months automatically
const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;
const MONTHS_PER_YEAR = 12;

@Component({
  selector: 'ui-time-span',
  imports: [A11yModule, OverlayModule, FieldComponent, ActionButtonComponent],
  templateUrl: './time-span.component.html',
  host: {
    '[style.display]': '"block"',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimeSpanComponent),
      multi: true,
    },
  ],
})
export class TimeSpanComponent extends FieldComponent implements OnDestroy {
  private overlay = inject(Overlay);
  private viewContainerRef = inject(ViewContainerRef);
  private scrollDispatcher = inject(ScrollDispatcher);
  private ngZone = inject(NgZone);
  private overlayHandle: OverlayHandle | null = null;

  // Configuration inputs
  showYears = input<boolean>(false);
  showMonths = input<boolean>(false);
  showDays = input<boolean>(true);
  showHours = input<boolean>(true);
  showMinutes = input<boolean>(true);
  showSeconds = input<boolean>(false);
  clearable = input<boolean>(false);
  maxHeight = input<string>('400px');

  // Outputs
  valueChange = output<string>();
  opened = output<void>();
  closed = output<void>();

  // State
  isOpen = signal<boolean>(false);
  internalValue = signal<TimeSpanValue>({});
  private draggingState = signal<Partial<Record<keyof TimeSpanValue, boolean>>>({});
  private dragStates: Partial<Record<keyof TimeSpanValue, DragState>> = {};

  @ViewChild('triggerElement') triggerElement!: ElementRef;
  @ViewChild('panelTemplate') panelTemplate!: TemplateRef<any>;

  private readonly sizeToItemHeight: Record<'small' | 'medium' | 'large', number> = {
    small: 32,
    medium: 40,
    large: 48,
  };
  private readonly dragActivationPx = 4;

  // Computed units based on configuration
  availableUnits = computed<TimeSpanUnit[]>(() => {
    const units: TimeSpanUnit[] = [];
    const unitConfigs: Array<{ key: keyof TimeSpanValue; show: boolean }> = [
      { key: 'years', show: this.showYears() },
      { key: 'months', show: this.showMonths() },
      { key: 'days', show: this.showDays() },
      { key: 'hours', show: this.showHours() },
      { key: 'minutes', show: this.showMinutes() },
      { key: 'seconds', show: this.showSeconds() },
    ];

    for (const { key, show } of unitConfigs) {
      if (show) {
        units.push({ ...TIME_SPAN_UNITS[key], enabled: true });
      }
    }

    return units;
  });

  // Display text for the input - shows user-friendly format
  displayText = computed(() => {
    const val = this.internalValue();
    return this.toReadableTimeSpanString(val);
  });

  // Check if value is empty
  isEmpty = computed(() => {
    const val = this.internalValue();
    return this.isTimeSpanValueEmpty(val);
  });

  constructor() {
    super();
  }

  ngOnDestroy(): void {
    this.overlayHandle?.destroy();
  }

  togglePanel(): void {
    if (this.disabled() || this.readonly()) {
      return;
    }
    if (this.isOpen()) {
      this.closePanel();
    } else {
      this.openPanel();
    }
  }

  openPanel(): void {
    if (this.isOpen()) return;

    this.overlayHandle = openConnectedOverlay({
      overlay: this.overlay,
      scrollDispatcher: this.scrollDispatcher,
      ngZone: this.ngZone,
      trigger: this.triggerElement,
      template: this.panelTemplate,
      viewContainerRef: this.viewContainerRef,
      config: {
        positions: DEFAULT_CONNECTED_POSITIONS,
        viewportMargin: DEFAULT_VIEWPORT_MARGIN,
      },
      onClose: focusTrigger => this.closePanel(focusTrigger),
    });

    this.isOpen.set(true);
    this.opened.emit();
  }

  closePanel(shouldFocusTrigger = false): void {
    this.overlayHandle?.destroy();
    this.overlayHandle = null;
    this.isOpen.set(false);
    if (shouldFocusTrigger && this.triggerElement?.nativeElement) {
      setTimeout(() => this.triggerElement.nativeElement.focus({ preventScroll: true }), 0);
    }
    this.closed.emit();
  }

  // Update value for a specific unit
  updateUnit(unit: keyof TimeSpanValue, value: number | null): void {
    const updatedValue = this.updateTimeSpanValue(this.internalValue(), unit, value);
    this.internalValue.set(updatedValue);
    this.emitValueChange(updatedValue);
  }

  // Get value for a specific unit
  getUnitValue(unit: keyof TimeSpanValue): number | null {
    return this.internalValue()[unit] || null;
  }

  getWheelOptions(unit: keyof TimeSpanValue): WheelOption[] {
    const current = this.getCurrentUnitValue(unit);
    const options: WheelOption[] = [];

    for (let offset = -2; offset <= 2; offset += 1) {
      const candidate = current + offset;
      options.push({
        value: candidate >= 0 ? candidate : null,
        isSelected: offset === 0,
      });
    }

    return options;
  }

  getOptionClass(option: WheelOption): string {
    const classes = ['time-span-wheel__option'];
    if (option.isSelected) {
      classes.push('time-span-wheel__option--selected');
    }
    if (option.value === null) {
      classes.push('time-span-wheel__option--empty');
    }
    return classes.join(' ');
  }

  formatWheelOption(unit: keyof TimeSpanValue, value: number | null): string {
    if (value === null) {
      return '';
    }

    if (unit === 'hours' || unit === 'minutes' || unit === 'seconds') {
      return String(value).padStart(2, '0');
    }

    return String(value);
  }

  isUnitDragging(unit: keyof TimeSpanValue): boolean {
    return !!this.draggingState()[unit];
  }

  onOptionClick(unit: keyof TimeSpanValue, wheelElement: HTMLDivElement, event: MouseEvent): void {
    if (this.disabled() || this.readonly()) {
      return;
    }

    const wheelRect = wheelElement.getBoundingClientRect();
    const wheelCenterY = wheelRect.top + wheelRect.height / 2;
    const target = event.currentTarget as HTMLElement | null;
    const targetCenterY = target
      ? target.getBoundingClientRect().top + target.getBoundingClientRect().height / 2
      : event.clientY;
    const step = targetCenterY < wheelCenterY ? -1 : targetCenterY > wheelCenterY ? 1 : 0;

    if (step !== 0) {
      this.changeByStep(unit, step);
    }
  }

  onWheelKeyDown(unit: keyof TimeSpanValue, event: KeyboardEvent): void {
    if (this.disabled() || this.readonly()) {
      return;
    }

    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        this.changeByStep(unit, -1);
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.changeByStep(unit, 1);
        break;
      case 'PageUp':
        event.preventDefault();
        this.changeByStep(unit, -5);
        break;
      case 'PageDown':
        event.preventDefault();
        this.changeByStep(unit, 5);
        break;
      default:
        break;
    }
  }

  onUnitWheel(unit: keyof TimeSpanValue, event: WheelEvent): void {
    if (this.disabled() || this.readonly()) {
      return;
    }

    const normalizedDelta = this.normalizeWheelDelta(event);
    if (normalizedDelta === 0) {
      return;
    }

    event.preventDefault();
    const step = normalizedDelta > 0 ? 1 : -1;
    this.changeByStep(unit, step);
  }

  onWheelPointerDown(unit: keyof TimeSpanValue, event: PointerEvent): void {
    if (this.disabled() || this.readonly()) {
      return;
    }

    if (event.pointerType === 'mouse' && event.button !== 0) {
      return;
    }

    this.dragStates[unit] = {
      pointerId: event.pointerId,
      startY: event.clientY,
      lastY: event.clientY,
      pixelRemainder: 0,
      dragging: false,
    };
  }

  onWheelPointerMove(
    unit: keyof TimeSpanValue,
    wheelElement: HTMLDivElement,
    event: PointerEvent,
  ): void {
    const state = this.dragStates[unit];
    if (!state || state.pointerId !== event.pointerId) {
      return;
    }

    const travelFromStart = Math.abs(event.clientY - state.startY);
    if (!state.dragging && travelFromStart >= this.dragActivationPx) {
      state.dragging = true;
      wheelElement.setPointerCapture(event.pointerId);
      this.setUnitDragging(unit, true);
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
      this.changeByStep(unit, steps);
    }

    event.preventDefault();
  }

  onWheelPointerUp(
    unit: keyof TimeSpanValue,
    wheelElement: HTMLDivElement,
    event: PointerEvent,
  ): void {
    const state = this.dragStates[unit];
    if (!state || state.pointerId !== event.pointerId) {
      return;
    }

    if (state.dragging && wheelElement.hasPointerCapture(event.pointerId)) {
      wheelElement.releasePointerCapture(event.pointerId);
    }

    delete this.dragStates[unit];
    this.setUnitDragging(unit, false);
  }

  // Increment value for a specific unit
  incrementUnit(unit: keyof TimeSpanValue): void {
    if (this.disabled() || this.readonly()) {
      return;
    }

    const currentValue = this.getUnitValue(unit) || 0;
    this.updateUnit(unit, currentValue + 1);
  }

  // Decrement value for a specific unit
  decrementUnit(unit: keyof TimeSpanValue): void {
    if (this.disabled() || this.readonly()) {
      return;
    }

    const currentValue = this.getUnitValue(unit) || 0;
    if (currentValue > 0) {
      this.updateUnit(unit, currentValue - 1);
    }
  }

  // Handle input change for a specific unit
  onUnitInputChange(unit: keyof TimeSpanValue, event: Event): void {
    if (this.disabled() || this.readonly()) {
      return;
    }

    const target = event.target as HTMLInputElement;
    const value = target.value === '' ? null : parseInt(target.value, 10);

    if (value !== null && !isNaN(value) && value >= 0) {
      this.updateUnit(unit, value);
    } else if (value === null || isNaN(value)) {
      this.updateUnit(unit, null);
    }
  }

  // Clear all values
  clearSelection(): void {
    this.internalValue.set({});
    this.emitValueChange({});
  }

  private updateTimeSpanValue(
    current: TimeSpanValue,
    unit: keyof TimeSpanValue,
    value: number | null,
  ): TimeSpanValue {
    const updated = { ...current };
    if (this.isInvalidUnitValue(value)) {
      delete updated[unit];
    } else {
      updated[unit] = Math.max(0, Math.floor(value!));
    }
    return this.normalizeTimeSpanValue(updated);
  }

  /**
   * Normalize time span value by converting overflow to higher units
   * Examples: 60 seconds -> 1 minute, 60 minutes -> 1 hour, etc.
   */
  private normalizeTimeSpanValue(value: TimeSpanValue): TimeSpanValue {
    const normalized = { ...value };

    // Normalize seconds to minutes
    if (normalized.seconds && normalized.seconds >= SECONDS_PER_MINUTE) {
      const minutesToAdd = Math.floor(normalized.seconds / SECONDS_PER_MINUTE);
      normalized.minutes = (normalized.minutes || 0) + minutesToAdd;
      normalized.seconds = normalized.seconds % SECONDS_PER_MINUTE;
      if (normalized.seconds === 0) {
        delete normalized.seconds;
      }
    }

    // Normalize minutes to hours
    if (normalized.minutes && normalized.minutes >= MINUTES_PER_HOUR) {
      const hoursToAdd = Math.floor(normalized.minutes / MINUTES_PER_HOUR);
      normalized.hours = (normalized.hours || 0) + hoursToAdd;
      normalized.minutes = normalized.minutes % MINUTES_PER_HOUR;
      if (normalized.minutes === 0) {
        delete normalized.minutes;
      }
    }

    // Normalize hours to days
    if (normalized.hours && normalized.hours >= HOURS_PER_DAY) {
      const daysToAdd = Math.floor(normalized.hours / HOURS_PER_DAY);
      normalized.days = (normalized.days || 0) + daysToAdd;
      normalized.hours = normalized.hours % HOURS_PER_DAY;
      if (normalized.hours === 0) {
        delete normalized.hours;
      }
    }

    // Note: We do NOT normalize days to months because ISO 8601 does not define
    // a fixed number of days per month. Months are calendar units and can have
    // 28-31 days depending on the specific month and year.

    // Normalize months to years
    if (normalized.months && normalized.months >= MONTHS_PER_YEAR) {
      const yearsToAdd = Math.floor(normalized.months / MONTHS_PER_YEAR);
      normalized.years = (normalized.years || 0) + yearsToAdd;
      normalized.months = normalized.months % MONTHS_PER_YEAR;
      if (normalized.months === 0) {
        delete normalized.months;
      }
    }

    return normalized;
  }

  private isInvalidUnitValue(value: number | null): boolean {
    return value === null || value === undefined || value === 0 || isNaN(value);
  }

  private emitValueChange(value: TimeSpanValue): void {
    const outputValue = this.toTimeSpanString(value);
    this.value = outputValue;
    this.onChange(outputValue);
    this.valueChange.emit(outputValue);
  }

  private changeByStep(unit: keyof TimeSpanValue, delta: number): void {
    if (delta === 0) {
      return;
    }

    const current = this.getCurrentUnitValue(unit);
    const next = Math.max(0, current + delta);
    this.updateUnit(unit, next);
  }

  private getCurrentUnitValue(unit: keyof TimeSpanValue): number {
    return this.internalValue()[unit] ?? 0;
  }

  private setUnitDragging(unit: keyof TimeSpanValue, dragging: boolean): void {
    this.draggingState.update(current => {
      const next = { ...current };
      if (dragging) {
        next[unit] = true;
      } else {
        delete next[unit];
      }
      return next;
    });
  }

  private getItemHeight(): number {
    return this.sizeToItemHeight[this.size()] ?? this.sizeToItemHeight.medium;
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

  /**
   * Convert TimeSpanValue to ISO 8601 duration format string
   * Format: P[n]Y[n]M[n]DT[n]H[n]M[n]S
   * Examples: PT1H30M, P1DT2H30M, P1Y2M3DT4H5M6S
   */
  toTimeSpanString(value: TimeSpanValue): string {
    if (!value || this.isTimeSpanValueEmpty(value)) {
      return '';
    }

    const parts: string[] = [ISO8601_DURATION_PREFIX];
    this.appendDatePart(parts, value);
    this.appendTimePart(parts, value);

    return parts.join('');
  }

  private isTimeSpanValueEmpty(value: TimeSpanValue): boolean {
    return (
      !value.years &&
      !value.months &&
      !value.days &&
      !value.hours &&
      !value.minutes &&
      !value.seconds
    );
  }

  private appendDatePart(parts: string[], value: TimeSpanValue): void {
    if (value.years && value.years > 0) {
      parts.push(`${value.years}Y`);
    }
    if (value.months && value.months > 0) {
      parts.push(`${value.months}M`);
    }
    if (value.days && value.days > 0) {
      parts.push(`${value.days}D`);
    }
  }

  private appendTimePart(parts: string[], value: TimeSpanValue): void {
    const hours = value.hours || 0;
    const minutes = value.minutes || 0;
    const seconds = value.seconds || 0;

    if (hours > 0 || minutes > 0 || seconds > 0) {
      parts.push(ISO8601_TIME_SEPARATOR);
      if (hours > 0) {
        parts.push(`${hours}H`);
      }
      if (minutes > 0) {
        parts.push(`${minutes}M`);
      }
      if (seconds > 0) {
        parts.push(`${seconds}S`);
      }
    }
  }

  /**
   * Parse ISO 8601 duration format string to TimeSpanValue
   * Format: P[n]Y[n]M[n]DT[n]H[n]M[n]S
   * Examples: PT1H30M, P1DT2H30M, P1Y2M3DT4H5M6S
   *
   * ISO 8601 validation rules:
   * - Must start with 'P'
   * - Must have at least one unit after 'P' (cannot be just 'P' or 'PT')
   * - Units must be in order: Y, M, D, T, H, M, S
   * - If 'T' is present, must have at least one time unit (H, M, or S)
   * - Values must be non-negative integers
   */
  parseTimeSpanString(timeSpanString: string): TimeSpanValue {
    if (!timeSpanString?.trim()) {
      return {};
    }

    const trimmed = timeSpanString.trim();

    // Must start with 'P'
    if (!trimmed.startsWith(ISO8601_DURATION_PREFIX)) {
      return {};
    }

    // Cannot be just 'P' or 'PT' - must have at least one unit
    if (
      trimmed === ISO8601_DURATION_PREFIX ||
      trimmed === `${ISO8601_DURATION_PREFIX}${ISO8601_TIME_SEPARATOR}`
    ) {
      return {};
    }

    // Validate format with regex (basic validation)
    // Pattern: P followed by optional date parts (Y, M, D), optional T, optional time parts (H, M, S)
    // Must have at least one unit total
    const iso8601DurationPattern = /^P(?!$)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?$/;
    if (!iso8601DurationPattern.test(trimmed)) {
      return {};
    }

    const { datePart, timePart } = this.splitIso8601Parts(trimmed);

    // If 'T' separator is present, must have at least one time unit
    if (trimmed.includes(ISO8601_TIME_SEPARATOR) && !timePart) {
      return {};
    }

    const result = {
      ...this.parseDatePart(datePart),
      ...this.parseTimePart(timePart),
    };

    // Validate that at least one unit was parsed
    if (this.isTimeSpanValueEmpty(result)) {
      return {};
    }

    // Validate that all values are non-negative
    if (
      (result.years !== undefined && result.years < 0) ||
      (result.months !== undefined && result.months < 0) ||
      (result.days !== undefined && result.days < 0) ||
      (result.hours !== undefined && result.hours < 0) ||
      (result.minutes !== undefined && result.minutes < 0) ||
      (result.seconds !== undefined && result.seconds < 0)
    ) {
      return {};
    }

    return result;
  }

  private parseReadableTimeSpanString(input: string): TimeSpanValue {
    const normalized = input.trim().toLowerCase();
    if (!normalized) {
      return {};
    }

    const result: TimeSpanValue = {};
    const tokenRegex =
      /(\d+)\s*(years?|yrs?|yr|y|months?|mos?|mo|days?|day|d|hours?|hrs?|hr|h|minutes?|mins?|min|m|seconds?|secs?|sec|s)\b/g;

    let match: RegExpExecArray | null = tokenRegex.exec(normalized);
    while (match) {
      const value = parseInt(match[1], 10);
      const unitToken = match[2];

      if (!isNaN(value)) {
        if (/(^years?$)|(^yrs?$)|(^yr$)|(^y$)/.test(unitToken)) {
          result.years = value;
        } else if (/(^months?$)|(^mos?$)|(^mo$)/.test(unitToken)) {
          result.months = value;
        } else if (/(^days?$)|(^day$)|(^d$)/.test(unitToken)) {
          result.days = value;
        } else if (/(^hours?$)|(^hrs?$)|(^hr$)|(^h$)/.test(unitToken)) {
          result.hours = value;
        } else if (/(^minutes?$)|(^mins?$)|(^min$)|(^m$)/.test(unitToken)) {
          result.minutes = value;
        } else if (/(^seconds?$)|(^secs?$)|(^sec$)|(^s$)/.test(unitToken)) {
          result.seconds = value;
        }
      }

      match = tokenRegex.exec(normalized);
    }

    return this.normalizeTimeSpanValue(result);
  }

  private splitIso8601Parts(timeSpanString: string): {
    datePart: string;
    timePart: string;
  } {
    const tIndex = timeSpanString.indexOf(ISO8601_TIME_SEPARATOR);
    const datePart = tIndex > 0 ? timeSpanString.substring(1, tIndex) : timeSpanString.substring(1);
    const timePart = tIndex > 0 ? timeSpanString.substring(tIndex + 1) : '';
    return { datePart, timePart };
  }

  private parseDatePart(datePart: string): Partial<TimeSpanValue> {
    const result: Partial<TimeSpanValue> = {};
    const yearMatch = datePart.match(/(\d+)Y/);
    const monthMatch = datePart.match(/(\d+)M/);
    const dayMatch = datePart.match(/(\d+)D/);

    if (yearMatch) {
      result.years = parseInt(yearMatch[1], 10);
    }
    if (monthMatch) {
      result.months = parseInt(monthMatch[1], 10);
    }
    if (dayMatch) {
      result.days = parseInt(dayMatch[1], 10);
    }

    return result;
  }

  private parseTimePart(timePart: string): Partial<TimeSpanValue> {
    const result: Partial<TimeSpanValue> = {};
    const hourMatch = timePart.match(/(\d+)H/);
    const minuteMatch = timePart.match(/(\d+)M/);
    const secondMatch = timePart.match(/(\d+)S/);

    if (hourMatch) {
      result.hours = parseInt(hourMatch[1], 10);
    }
    if (minuteMatch) {
      result.minutes = parseInt(minuteMatch[1], 10);
    }
    if (secondMatch) {
      result.seconds = parseInt(secondMatch[1], 10);
    }

    return result;
  }

  // Override ControlValueAccessor methods
  override writeValue(value: any): void {
    if (this.isEmptyValue(value)) {
      this.internalValue.set({});
      super.writeValue('');
      return;
    }

    const timeSpanValue =
      typeof value === 'string'
        ? this.parseTimeSpanString(value)
        : this.convertObjectToTimeSpanValue(value);

    this.internalValue.set(timeSpanValue);
    const outputValue = this.toTimeSpanString(timeSpanValue);
    super.writeValue(outputValue);
  }

  private isEmptyValue(value: any): boolean {
    return value === null || value === undefined || value === '';
  }

  private convertObjectToTimeSpanValue(value: any): TimeSpanValue {
    const timeSpanValue: TimeSpanValue = {
      years: value.years || undefined,
      months: value.months || undefined,
      days: value.days || undefined,
      hours: value.hours || undefined,
      minutes: value.minutes || undefined,
      seconds: value.seconds || undefined,
    };

    // Remove undefined values
    Object.keys(timeSpanValue).forEach(key => {
      if (timeSpanValue[key as keyof TimeSpanValue] === undefined) {
        delete timeSpanValue[key as keyof TimeSpanValue];
      }
    });

    return timeSpanValue;
  }

  /**
   * Handle manual input change (user typing ISO 8601 format)
   */
  onTimeSpanInputChange(event: Event): void {
    if (this.disabled() || this.readonly()) {
      return;
    }

    const target = event.target as HTMLInputElement;
    const inputValue = target.value.trim();

    if (!inputValue) {
      this.internalValue.set({});
      this.emitValueChange({});
      return;
    }

    const parsedValue = this.parseInputTimeSpanString(inputValue);

    if (this.hasValidTimeSpanValue(parsedValue)) {
      this.internalValue.set(parsedValue);
      this.emitValueChange(parsedValue);
    }
    // If parsing fails, don't update - let user continue typing
  }

  private hasValidTimeSpanValue(value: TimeSpanValue): boolean {
    return !!(
      value.years ||
      value.months ||
      value.days ||
      value.hours ||
      value.minutes ||
      value.seconds
    );
  }

  private parseInputTimeSpanString(inputValue: string): TimeSpanValue {
    const isoParsed = this.parseTimeSpanString(inputValue);
    if (this.hasValidTimeSpanValue(isoParsed)) {
      return isoParsed;
    }

    return this.parseReadableTimeSpanString(inputValue);
  }

  private toReadableTimeSpanString(value: TimeSpanValue): string {
    if (!value || this.isTimeSpanValueEmpty(value)) {
      return '';
    }

    const parts: string[] = [];
    if (value.years) {
      parts.push(`${value.years}y`);
    }
    if (value.months) {
      parts.push(`${value.months}mo`);
    }
    if (value.days) {
      parts.push(`${value.days}d`);
    }
    if (value.hours) {
      parts.push(`${value.hours}h`);
    }
    if (value.minutes) {
      parts.push(`${value.minutes}m`);
    }
    if (value.seconds) {
      parts.push(`${value.seconds}s`);
    }

    return parts.join(' ');
  }

  /**
   * Handle keyboard navigation on trigger
   */
  override onKeyDown(event: KeyboardEvent): void {
    if (this.disabled()) {
      return;
    }

    switch (event.key) {
      case 'Enter':
        if (!this.isOpen()) {
          this.openPanel();
        }
        break;

      case 'Escape':
        if (this.isOpen()) {
          event.preventDefault();
          event.stopPropagation();
          this.closePanel();
        }
        break;
    }
  }
}
