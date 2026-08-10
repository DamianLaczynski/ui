/// <reference types="vitest/globals" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimeSpanComponent } from './time-span.component';

describe('TimeSpanComponent', () => {
  let fixture: ComponentFixture<TimeSpanComponent>;
  let component: TimeSpanComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeSpanComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TimeSpanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function createWheelElement(): HTMLDivElement {
    const wheel = document.createElement('div');
    vi.spyOn(wheel, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      right: 84,
      bottom: 200,
      width: 84,
      height: 200,
      toJSON: () => ({}),
    } as DOMRect);

    Object.defineProperty(wheel, 'setPointerCapture', { value: vi.fn(), writable: true });
    Object.defineProperty(wheel, 'releasePointerCapture', { value: vi.fn(), writable: true });
    Object.defineProperty(wheel, 'hasPointerCapture', { value: vi.fn(() => true), writable: true });
    return wheel;
  }

  function createOptionElement(top: number): HTMLButtonElement {
    const button = document.createElement('button');
    vi.spyOn(button, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: top,
      top,
      left: 0,
      right: 84,
      bottom: top + 40,
      width: 84,
      height: 40,
      toJSON: () => ({}),
    } as DOMRect);
    return button;
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should parse and serialize ISO 8601 duration', () => {
    const parsed = component.parseTimeSpanString('P1DT2H30M');
    expect(parsed).toEqual({ days: 1, hours: 2, minutes: 30 });
    expect(component.toTimeSpanString(parsed)).toBe('P1DT2H30M');
  });

  it('should display readable text in input while keeping ISO conversion', () => {
    component.writeValue('P1DT2H30M');
    expect(component.displayText()).toBe('1d 2h 30m');
    expect(component.toTimeSpanString(component.parseTimeSpanString('P1DT2H30M'))).toBe(
      'P1DT2H30M',
    );
  });

  it('should step up by one on click below selected area', () => {
    const wheel = createWheelElement();
    const option = createOptionElement(150);

    component.updateUnit('hours', 2);
    component.onOptionClick('hours', wheel, {
      currentTarget: option,
      clientY: 170,
    } as unknown as MouseEvent);

    expect(component.getUnitValue('hours')).toBe(3);
  });

  it('should step down by one on click above selected area', () => {
    const wheel = createWheelElement();
    const option = createOptionElement(20);

    component.updateUnit('hours', 2);
    component.onOptionClick('hours', wheel, {
      currentTarget: option,
      clientY: 40,
    } as unknown as MouseEvent);

    expect(component.getUnitValue('hours')).toBe(1);
  });

  it('should change by exactly one step on wheel event', () => {
    component.updateUnit('minutes', 10);

    const event = new WheelEvent('wheel', { deltaY: 120 });
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
    component.onUnitWheel('minutes', event);

    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(component.getUnitValue('minutes')).toBe(11);
  });

  it('should support keyboard navigation on wheel', () => {
    component.updateUnit('days', 3);

    component.onWheelKeyDown('days', new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    expect(component.getUnitValue('days')).toBe(2);

    component.onWheelKeyDown('days', new KeyboardEvent('keydown', { key: 'PageDown' }));
    expect(component.getUnitValue('days')).toBe(7);
  });

  it('should emit ISO value when unit changes', () => {
    const emitted: string[] = [];
    component.valueChange.subscribe(value => emitted.push(value));

    component.updateUnit('hours', 1);
    component.updateUnit('minutes', 30);

    expect(emitted[emitted.length - 1]).toBe('PT1H30M');
  });

  it('should parse readable input and emit ISO value', () => {
    const emitted: string[] = [];
    component.valueChange.subscribe(value => emitted.push(value));

    const event = {
      target: { value: '2d 4h 15m' },
    } as unknown as Event;

    component.onTimeSpanInputChange(event);

    expect(component.displayText()).toBe('2d 4h 15m');
    expect(emitted[emitted.length - 1]).toBe('P2DT4H15M');
  });

  it('should drag wheel and change value', () => {
    const wheel = createWheelElement();
    component.updateUnit('minutes', 10);

    component.onWheelPointerDown(
      'minutes',
      new PointerEvent('pointerdown', { pointerId: 1, clientY: 100, pointerType: 'mouse' }),
    );
    component.onWheelPointerMove(
      'minutes',
      wheel,
      new PointerEvent('pointermove', { pointerId: 1, clientY: 70, pointerType: 'mouse' }),
    );
    component.onWheelPointerUp(
      'minutes',
      wheel,
      new PointerEvent('pointerup', { pointerId: 1, clientY: 70, pointerType: 'mouse' }),
    );

    expect(component.getUnitValue('minutes')).toBeGreaterThan(10);
    expect(component.isUnitDragging('minutes')).toBe(false);
  });

  it('should ignore interactions when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    component.updateUnit('hours', 2);
    const event = new WheelEvent('wheel', { deltaY: 120 });
    component.onUnitWheel('hours', event);

    expect(component.getUnitValue('hours')).toBe(2);
  });
});
