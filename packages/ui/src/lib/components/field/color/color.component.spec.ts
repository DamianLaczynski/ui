/// <reference types="vitest/globals" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ColorComponent } from './color.component';

describe('ColorComponent', () => {
  let fixture: ComponentFixture<ColorComponent>;
  let component: ColorComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render text input for custom picker mode by default', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input.input[type="text"]');
    expect(input).toBeTruthy();
    expect(input.type).toBe('text');
  });

  it('should pass labelPosition to ui-field and render label after input', () => {
    fixture.componentRef.setInput('label', 'Color');
    fixture.componentRef.setInput('id', 'color-after');
    fixture.componentRef.setInput('labelPosition', 'after');
    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector('.field-label--after');
    expect(label?.textContent?.trim()).toBe('Color');
  });

  it('should use computed aria-describedby with help id', () => {
    fixture.componentRef.setInput('id', 'color-help');
    fixture.componentRef.setInput('helpText', 'Pick a brand color');
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('input.input[type="text"]');
    expect(input.getAttribute('aria-describedby')).toBe('color-help-help');
  });

  it('should set aria-controls to color panel id on trigger input', () => {
    fixture.componentRef.setInput('id', 'color-panel');
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('input.input[type="text"]');
    expect(input.getAttribute('aria-controls')).toBe('color-panel-color-panel');
  });

  it('should remove custom trigger input from tab order when readonly', () => {
    fixture.componentRef.setInput('readonly', true);
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('input.input[type="text"]');
    expect(input.tabIndex).toBe(-1);
  });

  it('should use configurable warning message when eyedropper is unsupported', async () => {
    fixture.componentRef.setInput('eyeDropperNotSupportedMessage', 'Eyedropper not available');
    fixture.detectChanges();

    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    await component.openEyeDropper();

    expect(warnSpy).toHaveBeenCalledWith('Eyedropper not available');
    warnSpy.mockRestore();
  });
});
