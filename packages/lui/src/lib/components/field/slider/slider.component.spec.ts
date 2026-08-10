/// <reference types="vitest/globals" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SliderComponent } from './slider.component';

describe('SliderComponent', () => {
  let fixture: ComponentFixture<SliderComponent>;
  let component: SliderComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default min 0 and max 100', () => {
    expect(component.min()).toBe(0);
    expect(component.max()).toBe(100);
  });

  it('should write and read value via ControlValueAccessor', () => {
    component.writeValue(50);
    expect(component.currentValue()).toBe(50);
  });

  it('should use min when writeValue receives null', () => {
    component.writeValue(null);
    expect(component.currentValue()).toBe(0);
  });

  it('should update value on input event when not readonly', () => {
    const input = fixture.nativeElement.querySelector('input');
    input.value = '75';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.currentValue()).toBe(75);
  });

  it('should not update value on input event when readonly', () => {
    fixture.componentRef.setInput('readonly', true);
    component.writeValue(50);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    input.value = '80';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.currentValue()).toBe(50);
  });

  it('should not update value on input event when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    component.writeValue(50);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    input.value = '80';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.currentValue()).toBe(50);
  });

  it('should emit change event on value change when not readonly', () => {
    let emitted: number | undefined;
    component.change.subscribe((v: number) => (emitted = v));
    const input = fixture.nativeElement.querySelector('input');
    input.value = '60';
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(emitted).toBe(60);
  });

  it('should not emit change event when readonly', () => {
    let emitted = false;
    component.change.subscribe(() => (emitted = true));
    fixture.componentRef.setInput('readonly', true);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    input.value = '70';
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(emitted).toBe(false);
  });

  it('should prevent keydown when readonly', () => {
    fixture.componentRef.setInput('readonly', true);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    const event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
    const preventSpy = vi.spyOn(event, 'preventDefault');
    input.dispatchEvent(event);
    expect(preventSpy).toHaveBeenCalled();
  });

  it('should add slider--readonly class when readonly', () => {
    fixture.componentRef.setInput('readonly', true);
    fixture.detectChanges();
    const wrapper = fixture.nativeElement.querySelector('.slider-wrapper');
    expect(wrapper.classList.contains('slider--readonly')).toBe(true);
  });

  it('should add slider-input--readonly class to input when readonly', () => {
    fixture.componentRef.setInput('readonly', true);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    expect(input.classList.contains('slider-input--readonly')).toBe(true);
  });

  it('should remove slider input from tab order when readonly', () => {
    fixture.componentRef.setInput('readonly', true);
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.tabIndex).toBe(-1);
  });

  it('should respect custom min and max', () => {
    fixture.componentRef.setInput('min', 10);
    fixture.componentRef.setInput('max', 50);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    expect(input.min).toBe('10');
    expect(input.max).toBe('50');
  });

  it('should respect step', () => {
    fixture.componentRef.setInput('step', 5);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    expect(input.step).toBe('5');
  });

  it('should compute fill percentage correctly', () => {
    fixture.componentRef.setInput('min', 0);
    fixture.componentRef.setInput('max', 100);
    component.writeValue(50);
    fixture.detectChanges();
    expect(component.fillPercentage()).toBe(50);
  });

  it('should not set dragging state on mousedown when readonly', () => {
    fixture.componentRef.setInput('readonly', true);
    fixture.detectChanges();
    const wrapper = fixture.nativeElement.querySelector('.slider-input-wrapper');
    wrapper.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    fixture.detectChanges();
    const slider = fixture.nativeElement.querySelector('.slider-wrapper');
    expect(slider.classList.contains('slider--dragging')).toBe(false);
  });

  it('should not set dragging state on mousedown when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const wrapper = fixture.nativeElement.querySelector('.slider-input-wrapper');
    wrapper.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    fixture.detectChanges();
    const slider = fixture.nativeElement.querySelector('.slider-wrapper');
    expect(slider.classList.contains('slider--dragging')).toBe(false);
  });

  it('should call onChange when value changes', () => {
    const onChangeSpy = vi.fn();
    component.registerOnChange(onChangeSpy);
    const input = fixture.nativeElement.querySelector('input');
    input.value = '25';
    input.dispatchEvent(new Event('input'));
    expect(onChangeSpy).toHaveBeenCalledWith(25);
  });

  it('should call onTouched on blur', () => {
    const onTouchedSpy = vi.fn();
    component.registerOnTouched(onTouchedSpy);
    const input = fixture.nativeElement.querySelector('input');
    input.dispatchEvent(new FocusEvent('blur'));
    expect(onTouchedSpy).toHaveBeenCalled();
  });

  it('should increase value with ArrowRight key', () => {
    component.writeValue(50);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    const event = new KeyboardEvent('keydown', {
      key: 'ArrowRight',
      bubbles: true,
      cancelable: true,
    });
    input.dispatchEvent(event);
    fixture.detectChanges();

    expect(component.currentValue()).toBe(51);
  });

  it('should decrease value with ArrowLeft key', () => {
    component.writeValue(50);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    const event = new KeyboardEvent('keydown', {
      key: 'ArrowLeft',
      bubbles: true,
      cancelable: true,
    });
    input.dispatchEvent(event);
    fixture.detectChanges();

    expect(component.currentValue()).toBe(49);
  });

  it('should set min value with Home key', () => {
    fixture.componentRef.setInput('min', 10);
    fixture.componentRef.setInput('max', 100);
    component.writeValue(50);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    const event = new KeyboardEvent('keydown', { key: 'Home', bubbles: true, cancelable: true });
    input.dispatchEvent(event);
    fixture.detectChanges();

    expect(component.currentValue()).toBe(10);
  });

  it('should set max value with End key', () => {
    fixture.componentRef.setInput('min', 10);
    fixture.componentRef.setInput('max', 100);
    component.writeValue(50);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    const event = new KeyboardEvent('keydown', { key: 'End', bubbles: true, cancelable: true });
    input.dispatchEvent(event);
    fixture.detectChanges();

    expect(component.currentValue()).toBe(100);
  });
});
