/// <reference types="vitest/globals" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let fixture: ComponentFixture<CheckboxComponent>;
  let component: CheckboxComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render native checkbox input', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('.checkbox-input');
    expect(input).toBeTruthy();
    expect(input.type).toBe('checkbox');
  });

  it('should fallback aria-label to label', () => {
    fixture.componentRef.setInput('label', 'Accept terms');
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('.checkbox-input');
    expect(input.getAttribute('aria-label')).toBe('Accept terms');
  });

  it('should not set empty aria-label when label and ariaLabel are missing', () => {
    fixture.componentRef.setInput('label', '');
    fixture.componentRef.setInput('ariaLabel', '');
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('.checkbox-input');
    expect(input.hasAttribute('aria-label')).toBe(false);
  });

  it('should treat only true as checked in writeValue', () => {
    component.writeValue('true');
    fixture.detectChanges();

    expect(component.isChecked()).toBe(false);

    component.writeValue(true);
    fixture.detectChanges();

    expect(component.isChecked()).toBe(true);
  });

  it('should apply checked class when value is true', () => {
    component.writeValue(true);
    fixture.detectChanges();

    const wrapper: HTMLElement = fixture.nativeElement.querySelector('.checkbox-wrapper');
    expect(wrapper.classList.contains('checkbox--checked')).toBe(true);
  });

  it('should apply indeterminate class when indeterminate is true', () => {
    component.indeterminate.set(true);
    fixture.detectChanges();

    const wrapper: HTMLElement = fixture.nativeElement.querySelector('.checkbox-wrapper');
    expect(wrapper.classList.contains('checkbox--indeterminate')).toBe(true);
  });

  it('should switch indeterminate to checked on change', () => {
    component.indeterminate.set(true);
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('.checkbox-input');
    input.checked = false;
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.indeterminate()).toBe(false);
    expect(component.isChecked()).toBe(true);
  });

  it('should call onChange and emit change on checkbox change', () => {
    const onChangeSpy = vi.fn();
    const changeSpy = vi.fn();

    component.registerOnChange(onChangeSpy);
    component.change.subscribe(changeSpy);

    const input: HTMLInputElement = fixture.nativeElement.querySelector('.checkbox-input');
    input.checked = true;
    input.dispatchEvent(new Event('change'));

    expect(onChangeSpy).toHaveBeenCalledWith(true);
    expect(changeSpy).toHaveBeenCalledWith(true);
  });

  it('should prevent click when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const event = new MouseEvent('click', { cancelable: true });
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

    component.onCheckboxClick(event);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should prevent click when readonly', () => {
    fixture.componentRef.setInput('readonly', true);
    fixture.detectChanges();

    const event = new MouseEvent('click', { cancelable: true });
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

    component.onCheckboxClick(event);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should render label before when labelPosition is before', () => {
    fixture.componentRef.setInput('label', 'Accept terms');
    fixture.componentRef.setInput('labelPosition', 'before');
    fixture.detectChanges();

    const beforeLabel: HTMLElement = fixture.nativeElement.querySelector('.checkbox-label-before');
    expect(beforeLabel).toBeTruthy();
    expect(beforeLabel.textContent?.trim()).toBe('Accept terms');
  });

  it('should render label above when labelPosition is above', () => {
    fixture.componentRef.setInput('label', 'Accept terms');
    fixture.componentRef.setInput('labelPosition', 'above');
    fixture.detectChanges();

    const aboveLabel: HTMLElement = fixture.nativeElement.querySelector('.checkbox-label-above');
    expect(aboveLabel).toBeTruthy();
    expect(aboveLabel.textContent?.trim()).toBe('Accept terms');
  });
});
