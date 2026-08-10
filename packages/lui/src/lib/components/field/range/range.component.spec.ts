/// <reference types="vitest/globals" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RangeComponent } from './range.component';

describe('RangeComponent', () => {
  let fixture: ComponentFixture<RangeComponent>;
  let component: RangeComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RangeComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function mockTrackRect(wrapper: HTMLElement, width = 100): void {
    vi.spyOn(wrapper, 'getBoundingClientRect').mockReturnValue({
      left: 0,
      right: width,
      width,
      top: 0,
      bottom: 24,
      height: 24,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    } as DOMRect);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default track min 0 and max 100', () => {
    expect(component.min()).toBe(0);
    expect(component.max()).toBe(100);
  });

  it('should write and read value via ControlValueAccessor', () => {
    component.writeValue({ min: 20, max: 80 });
    expect(component.lowValue()).toBe(20);
    expect(component.highValue()).toBe(80);
  });

  it('should use full span when writeValue receives null', () => {
    component.writeValue(null);
    expect(component.lowValue()).toBe(0);
    expect(component.highValue()).toBe(100);
  });

  it('should update on lower input event when not readonly', () => {
    const inputs = fixture.nativeElement.querySelectorAll('input');
    const lower = inputs[0] as HTMLInputElement;
    lower.value = '30';
    lower.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.lowValue()).toBe(30);
  });

  it('should emit change on lower change event', () => {
    let emitted: { min: number; max: number } | undefined;
    component.change.subscribe((v: { min: number; max: number }) => (emitted = v));
    component.writeValue({ min: 10, max: 90 });
    fixture.detectChanges();
    const inputs = fixture.nativeElement.querySelectorAll('input');
    const lower = inputs[0] as HTMLInputElement;
    lower.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(emitted).toEqual({ min: 10, max: 90 });
  });

  it('should not update when readonly', () => {
    fixture.componentRef.setInput('readonly', true);
    component.writeValue({ min: 20, max: 80 });
    fixture.detectChanges();
    const inputs = fixture.nativeElement.querySelectorAll('input');
    const lower = inputs[0] as HTMLInputElement;
    lower.value = '50';
    lower.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.lowValue()).toBe(20);
  });

  it('should compute thumb percentages from endpoints', () => {
    fixture.componentRef.setInput('min', 0);
    fixture.componentRef.setInput('max', 100);
    component.writeValue({ min: 25, max: 75 });
    fixture.detectChanges();
    expect(component.leftThumbPercent()).toBe(25);
    expect(component.rightThumbPercent()).toBe(75);
  });

  it('should keep left endpoint fixed when moving right endpoint past it (sorted model only)', () => {
    component.writeValue({ min: 20, max: 80 });
    fixture.detectChanges();
    const inputs = fixture.nativeElement.querySelectorAll('input');
    const lower = inputs[0] as HTMLInputElement;
    const upper = inputs[1] as HTMLInputElement;
    upper.value = '10';
    upper.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(lower.value).toBe('20');
    expect(upper.value).toBe('10');
    expect(component.lowValue()).toBe(10);
    expect(component.highValue()).toBe(20);
  });

  it('should set lower thumb to min with Home', () => {
    fixture.componentRef.setInput('min', 10);
    fixture.componentRef.setInput('max', 100);
    component.writeValue({ min: 40, max: 80 });
    fixture.detectChanges();
    const lower = fixture.nativeElement.querySelectorAll('input')[0];
    lower.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Home', bubbles: true, cancelable: true }),
    );
    fixture.detectChanges();
    expect(component.lowValue()).toBe(10);
    expect(component.highValue()).toBe(80);
  });

  it('should set upper thumb to track min with Home (not lower endpoint)', () => {
    fixture.componentRef.setInput('min', 10);
    fixture.componentRef.setInput('max', 100);
    component.writeValue({ min: 40, max: 80 });
    fixture.detectChanges();
    const upper = fixture.nativeElement.querySelectorAll('input')[1];
    upper.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Home', bubbles: true, cancelable: true }),
    );
    fixture.detectChanges();
    expect(component.lowValue()).toBe(10);
    expect(component.highValue()).toBe(40);
    const inputsAfter = fixture.nativeElement.querySelectorAll('input');
    expect((inputsAfter[0] as HTMLInputElement).value).toBe('40');
    expect((inputsAfter[1] as HTMLInputElement).value).toBe('10');
  });

  it('should clear dragging on pointerup after pointerdown on track', () => {
    component.writeValue({ min: 20, max: 80 });
    fixture.detectChanges();
    const wrapper = fixture.nativeElement.querySelector('.range-input-wrapper') as HTMLElement;
    mockTrackRect(wrapper);
    const down = new PointerEvent('pointerdown', {
      bubbles: true,
      cancelable: true,
      clientX: 50,
      pointerId: 1,
      pointerType: 'mouse',
      button: 0,
      isPrimary: true,
    });
    component.onTrackPointerDownCapture(down);
    fixture.detectChanges();
    expect(component.isDragging()).toBe(true);
    const up = new PointerEvent('pointerup', {
      bubbles: true,
      cancelable: true,
      pointerId: 1,
      pointerType: 'mouse',
      button: 0,
    });
    component.onTrackPointerUp(up);
    fixture.detectChanges();
    expect(component.isDragging()).toBe(false);
  });

  it('should clear dragging on pointercancel like pointerup', () => {
    component.writeValue({ min: 0, max: 100 });
    fixture.detectChanges();
    const wrapper = fixture.nativeElement.querySelector('.range-input-wrapper') as HTMLElement;
    mockTrackRect(wrapper);
    const down = new PointerEvent('pointerdown', {
      bubbles: true,
      cancelable: true,
      clientX: 30,
      pointerId: 2,
      pointerType: 'touch',
      button: 0,
      isPrimary: true,
    });
    component.onTrackPointerDownCapture(down);
    fixture.detectChanges();
    expect(component.isDragging()).toBe(true);
    const cancel = new PointerEvent('pointercancel', {
      bubbles: true,
      cancelable: true,
      pointerId: 2,
      pointerType: 'touch',
      button: 0,
    });
    component.onTrackPointerCancel(cancel);
    fixture.detectChanges();
    expect(component.isDragging()).toBe(false);
  });

  it('should move nearest thumb on track pointerdown when thumbs overlap', () => {
    fixture.componentRef.setInput('min', 0);
    fixture.componentRef.setInput('max', 100);
    component.writeValue({ min: 50, max: 50 });
    fixture.detectChanges();
    const wrapper = fixture.nativeElement.querySelector('.range-input-wrapper') as HTMLElement;
    mockTrackRect(wrapper);
    const down = new PointerEvent('pointerdown', {
      bubbles: true,
      cancelable: true,
      clientX: 20,
      pointerId: 3,
      pointerType: 'mouse',
      button: 0,
      isPrimary: true,
    });
    component.onTrackPointerDownCapture(down);
    fixture.detectChanges();
    expect(component.lowValue()).toBe(20);
    expect(component.highValue()).toBe(50);
  });

  it('should pick upper thumb when pointer is nearer the right on overlap', () => {
    fixture.componentRef.setInput('min', 0);
    fixture.componentRef.setInput('max', 100);
    component.writeValue({ min: 50, max: 50 });
    fixture.detectChanges();
    const wrapper = fixture.nativeElement.querySelector('.range-input-wrapper') as HTMLElement;
    mockTrackRect(wrapper);
    const down = new PointerEvent('pointerdown', {
      bubbles: true,
      cancelable: true,
      clientX: 85,
      pointerId: 4,
      pointerType: 'mouse',
      button: 0,
      isPrimary: true,
    });
    component.onTrackPointerDownCapture(down);
    fixture.detectChanges();
    expect(component.lowValue()).toBe(50);
    expect(component.highValue()).toBe(85);
  });

  it('should expose custom aria-valuetext on thumbs when ariaValueText is set', () => {
    fixture.componentRef.setInput('ariaValueText', 'Custom range');
    component.writeValue({ min: 10, max: 90 });
    fixture.detectChanges();
    const inputs = fixture.nativeElement.querySelectorAll('input');
    expect(inputs[0].getAttribute('aria-valuetext')).toBe('Custom range');
    expect(inputs[1].getAttribute('aria-valuetext')).toBe('Custom range');
  });
});
