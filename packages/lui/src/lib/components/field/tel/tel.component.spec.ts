/// <reference types="vitest/globals" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TelComponent } from './tel.component';

describe('TelComponent', () => {
  let fixture: ComponentFixture<TelComponent>;
  let component: TelComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render native tel input', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input).toBeTruthy();
    expect(input.type).toBe('tel');
  });

  it('should pass labelPosition to ui-field and render label after input', () => {
    fixture.componentRef.setInput('label', 'Phone');
    fixture.componentRef.setInput('id', 'tel-after');
    fixture.componentRef.setInput('labelPosition', 'after');
    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector('.field-label--after');
    expect(label?.textContent?.trim()).toBe('Phone');
  });

  it('should use computed aria-describedby with help id', () => {
    fixture.componentRef.setInput('id', 'tel-help');
    fixture.componentRef.setInput('helpText', 'Use international format');
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.getAttribute('aria-describedby')).toBe('tel-help-help');
  });

  it('should fallback aria-label to component label', () => {
    fixture.componentRef.setInput('label', 'Phone');
    fixture.componentRef.setInput('ariaLabel', '');
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.getAttribute('aria-label')).toBe('Phone');
  });

  it('should render call action button with aria-label', () => {
    const actionButtons: HTMLButtonElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('.field__actions .field__action'),
    );
    expect(actionButtons.some(btn => btn.getAttribute('aria-label') === 'Call')).toBe(true);
  });
});
