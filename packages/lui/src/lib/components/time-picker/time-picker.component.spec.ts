/// <reference types="vitest/globals" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimePickerComponent } from './time-picker.component';

describe('TimePickerComponent', () => {
  let fixture: ComponentFixture<TimePickerComponent>;
  let component: TimePickerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimePickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function getWheels(): { hourWheel: HTMLDivElement; minuteWheel: HTMLDivElement } {
    const wheels = fixture.nativeElement.querySelectorAll(
      '.time-picker__wheel',
    ) as NodeListOf<HTMLDivElement>;
    return {
      hourWheel: wheels[0],
      minuteWheel: wheels[1],
    };
  }

  function mockWheelGeometry(wheel: HTMLDivElement, height = 200): void {
    vi.spyOn(wheel, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      right: 84,
      bottom: height,
      width: 84,
      height,
      toJSON: () => ({}),
    } as DOMRect);
  }

  function mockPointerCapture(wheel: HTMLDivElement): void {
    Object.defineProperty(wheel, 'setPointerCapture', {
      value: vi.fn(),
      writable: true,
    });
    Object.defineProperty(wheel, 'releasePointerCapture', {
      value: vi.fn(),
      writable: true,
    });
    Object.defineProperty(wheel, 'hasPointerCapture', {
      value: vi.fn(() => true),
      writable: true,
    });
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render hour and minute wheels', () => {
    const { hourWheel, minuteWheel } = getWheels();
    expect(hourWheel).toBeTruthy();
    expect(minuteWheel).toBeTruthy();
  });

  it('should initialize hour/minute options for 24h mode', () => {
    expect(component.hourOptions.length).toBe(24);
    expect(component.hourOptions[0]).toBe(0);
    expect(component.hourOptions[23]).toBe(23);

    expect(component.minuteOptions[0]).toBe(0);
    expect(component.minuteOptions[1]).toBe(1);
  });

  it('should build minute options from step input', () => {
    fixture.componentRef.setInput('step', 900);
    fixture.detectChanges();

    expect(component.minuteOptions).toEqual([0, 15, 30, 45]);
  });

  it('should switch to 12h options when use24HourFormat is false', () => {
    fixture.componentRef.setInput('use24HourFormat', false);
    fixture.detectChanges();

    expect(component.hourOptions.length).toBe(12);
    expect(component.hourOptions[0]).toBe(1);
    expect(component.hourOptions[11]).toBe(12);
  });

  it('should map 24h value to 12h clock when use24HourFormat is false', () => {
    fixture.componentRef.setInput('use24HourFormat', false);
    fixture.componentRef.setInput('value', '16:35');
    fixture.detectChanges();

    expect(component.selectedHour()).toBe(4);
    expect(component.selectedMeridiem()).toBe('pm');
  });

  it('should emit 24h time when meridiem changes in 12h mode', () => {
    fixture.componentRef.setInput('use24HourFormat', false);
    fixture.componentRef.setInput('value', '09:05');
    fixture.detectChanges();

    const emitted: string[] = [];
    component.timeChange.subscribe(value => emitted.push(value));

    component.onMeridiemSelect('pm');

    expect(emitted.at(-1)).toBe('21:05');
  });

  it('should sync selected values from value input', () => {
    fixture.componentRef.setInput('value', '16:35');
    fixture.detectChanges();

    expect(component.selectedHour()).toBe(16);
    expect(component.selectedMinute()).toBe(35);
  });

  it('should move up on click above center', () => {
    const { hourWheel } = getWheels();
    mockWheelGeometry(hourWheel, 200);

    const prev = component.selectedHour();
    const prevIndex = component.hourOptions.indexOf(prev);

    component.onOptionClick('hour', new MouseEvent('click', { clientY: 40 }));

    expect(component.selectedHour()).toBe(
      component.hourOptions[
        (prevIndex - 1 + component.hourOptions.length) % component.hourOptions.length
      ],
    );
  });

  it('should move down on click below center', () => {
    const { minuteWheel } = getWheels();
    mockWheelGeometry(minuteWheel, 200);

    const prev = component.selectedMinute();
    const prevIndex = component.minuteOptions.indexOf(prev);

    component.onOptionClick('minute', new MouseEvent('click', { clientY: 160 }));

    expect(component.selectedMinute()).toBe(
      component.minuteOptions[(prevIndex + 1) % component.minuteOptions.length],
    );
  });

  it('should not change on click exactly at center', () => {
    const { hourWheel } = getWheels();
    mockWheelGeometry(hourWheel, 200);

    const prev = component.selectedHour();
    component.onOptionClick('hour', new MouseEvent('click', { clientY: 100 }));

    expect(component.selectedHour()).toBe(prev);
  });

  it('should not react to click when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const { hourWheel } = getWheels();
    mockWheelGeometry(hourWheel, 200);

    const prev = component.selectedHour();
    component.onOptionClick('hour', new MouseEvent('click', { clientY: 40 }));

    expect(component.selectedHour()).toBe(prev);
  });

  it('should change by one step on wheel event', () => {
    const prev = component.selectedMinute();
    const prevIndex = component.minuteOptions.indexOf(prev);

    const event = new WheelEvent('wheel', { deltaY: 100, deltaMode: 0 });
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
    component.onWheel('minute', event);

    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(component.selectedMinute()).toBe(
      component.minuteOptions[(prevIndex + 1) % component.minuteOptions.length],
    );
  });

  it('should wrap infinitely on ArrowDown from last option', () => {
    const opts = component.minuteOptions;
    component.selectedMinute.set(opts[opts.length - 1]);
    (component as any).syncMinuteScrollToSelected(false);

    component.onWheelKeyDown('minute', new KeyboardEvent('keydown', { key: 'ArrowDown' }));

    expect(component.selectedMinute()).toBe(opts[0]);
  });

  it('should wrap infinitely on ArrowUp from first option', () => {
    const opts = component.hourOptions;
    component.selectedHour.set(opts[0]);
    (component as any).syncHourScrollToSelected(false);

    component.onWheelKeyDown('hour', new KeyboardEvent('keydown', { key: 'ArrowUp' }));

    expect(component.selectedHour()).toBe(opts[opts.length - 1]);
  });

  it('should change by 5 on PageDown/PageUp', () => {
    const opts = component.minuteOptions;
    component.selectedMinute.set(10);
    (component as any).syncMinuteScrollToSelected(false);

    component.onWheelKeyDown('minute', new KeyboardEvent('keydown', { key: 'PageDown' }));
    expect(component.selectedMinute()).toBe(opts[(10 + 5) % opts.length]);

    component.onWheelKeyDown('minute', new KeyboardEvent('keydown', { key: 'PageUp' }));
    expect(component.selectedMinute()).toBe(10);
  });

  it('should ignore Home and End keys', () => {
    const before = component.selectedMinute();

    component.onWheelKeyDown('minute', new KeyboardEvent('keydown', { key: 'Home' }));
    component.onWheelKeyDown('minute', new KeyboardEvent('keydown', { key: 'End' }));

    expect(component.selectedMinute()).toBe(before);
  });

  it('should emit timeChange when value changes via click', () => {
    const { hourWheel } = getWheels();
    mockWheelGeometry(hourWheel, 200);

    const emitted: string[] = [];
    component.timeChange.subscribe(value => emitted.push(value));

    component.onOptionClick('hour', new MouseEvent('click', { clientY: 160 }));

    expect(emitted.length).toBeGreaterThan(0);
    expect(emitted[emitted.length - 1]).toMatch(/^\d{2}:\d{2}$/);
  });

  it('should not activate drag on pointer down/up without movement', () => {
    const prev = component.selectedHour();

    component.onWheelPointerDown(
      'hour',
      new PointerEvent('pointerdown', { pointerId: 1, clientY: 100 }),
    );
    component.onWheelPointerUp(
      'hour',
      new PointerEvent('pointerup', { pointerId: 1, clientY: 100 }),
    );

    expect(component.isHourDragging()).toBe(false);
    expect(component.selectedHour()).toBe(prev);
  });

  it('should activate drag and change value after sufficient movement', () => {
    const { hourWheel } = getWheels();
    mockPointerCapture(hourWheel);

    const prev = component.selectedHour();

    component.onWheelPointerDown(
      'hour',
      new PointerEvent('pointerdown', { pointerId: 7, clientY: 100 }),
    );
    component.onWheelPointerMove(
      'hour',
      new PointerEvent('pointermove', { pointerId: 7, clientY: 80 }),
    );

    expect(component.isHourDragging()).toBe(true);
    expect(component.selectedHour()).not.toBe(prev);

    component.onWheelPointerUp(
      'hour',
      new PointerEvent('pointerup', { pointerId: 7, clientY: 80 }),
    );
    expect(component.isHourDragging()).toBe(false);
  });

  it('should ignore interactions with unmatched pointer id', () => {
    const prev = component.selectedMinute();

    component.onWheelPointerDown(
      'minute',
      new PointerEvent('pointerdown', { pointerId: 10, clientY: 100 }),
    );
    component.onWheelPointerMove(
      'minute',
      new PointerEvent('pointermove', { pointerId: 11, clientY: 20 }),
    );
    component.onWheelPointerUp(
      'minute',
      new PointerEvent('pointerup', { pointerId: 11, clientY: 20 }),
    );

    expect(component.selectedMinute()).toBe(prev);
  });

  it('should associate label with hour wheel id when label is shown', () => {
    fixture.componentRef.setInput('showLabel', true);
    fixture.componentRef.setInput('label', 'Pick time');
    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector('.time-picker__label') as HTMLLabelElement;
    const hourWheel = fixture.nativeElement.querySelector(
      '#time-picker-hour-wheel',
    ) as HTMLDivElement;

    expect(label).toBeTruthy();
    expect(hourWheel).toBeTruthy();
    expect(label.getAttribute('for')).toBe('time-picker-hour-wheel');
  });

  it('should mark only one option as selected per wheel', () => {
    fixture.detectChanges();

    const { hourWheel, minuteWheel } = getWheels();
    const selectedHours = hourWheel.querySelectorAll('[role="option"][aria-selected="true"]');
    const selectedMinutes = minuteWheel.querySelectorAll('[role="option"][aria-selected="true"]');

    expect(selectedHours.length).toBe(1);
    expect(selectedMinutes.length).toBe(1);
  });
});
