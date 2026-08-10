/// <reference types="vitest/globals" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SwitchComponent } from './switch.component';

describe('SwitchComponent', () => {
  let fixture: ComponentFixture<SwitchComponent>;
  let component: SwitchComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render native checkbox input for accessibility', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('.switch-input');

    expect(input).toBeTruthy();
    expect(input.type).toBe('checkbox');
  });

  it('should fallback aria-label to component label', () => {
    fixture.componentRef.setInput('label', 'Enable notifications');
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('.switch-input');
    expect(input.getAttribute('aria-label')).toBe('Enable notifications');
  });

  it('should prefer explicit ariaLabel over label fallback', () => {
    fixture.componentRef.setInput('label', 'Enable notifications');
    fixture.componentRef.setInput('ariaLabel', 'Notifications switch');
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('.switch-input');
    expect(input.getAttribute('aria-label')).toBe('Notifications switch');
  });

  it('should not set empty aria-label when both ariaLabel and label are missing', () => {
    fixture.componentRef.setInput('label', '');
    fixture.componentRef.setInput('ariaLabel', '');
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('.switch-input');
    expect(input.hasAttribute('aria-label')).toBe(false);
  });

  it('should write false when writeValue receives null', () => {
    component.writeValue(null);
    fixture.detectChanges();

    expect(component.isChecked()).toBe(false);
  });

  it('should apply checked classes when value is true', () => {
    const localFixture = TestBed.createComponent(SwitchComponent);
    const localComponent = localFixture.componentInstance;
    localComponent.writeValue(true);
    localFixture.detectChanges();

    const wrapper: HTMLElement = localFixture.nativeElement.querySelector('.switch-wrapper');
    const track: SVGElement = localFixture.nativeElement.querySelector('.switch-track');
    const thumb: SVGElement = localFixture.nativeElement.querySelector('.switch-thumb');

    expect(wrapper.classList.contains('switch--checked')).toBe(true);
    expect(track.classList.contains('switch-track--checked')).toBe(true);
    expect(thumb.classList.contains('switch-thumb--checked')).toBe(true);
  });

  it('should apply unchecked thumb class by default', () => {
    const thumb: SVGElement = fixture.nativeElement.querySelector('.switch-thumb');
    expect(thumb.classList.contains('switch-thumb--unchecked')).toBe(true);
  });

  it('should call onChange and emit change when switch changes', () => {
    const onChangeSpy = vi.fn();
    const changeSpy = vi.fn();
    component.registerOnChange(onChangeSpy);
    component.change.subscribe(changeSpy);

    const input: HTMLInputElement = fixture.nativeElement.querySelector('.switch-input');
    input.checked = true;
    input.dispatchEvent(new Event('change'));

    expect(component.isChecked()).toBe(true);
    expect(onChangeSpy).toHaveBeenCalledWith(true);
    expect(changeSpy).toHaveBeenCalledWith(true);
  });

  it('should prevent click interaction when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const event = new MouseEvent('click', { cancelable: true });
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

    component.onSwitchClick(event);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should prevent click interaction when readonly', () => {
    fixture.componentRef.setInput('readonly', true);
    fixture.detectChanges();

    const event = new MouseEvent('click', { cancelable: true });
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

    component.onSwitchClick(event);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});
