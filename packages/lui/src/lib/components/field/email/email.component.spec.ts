/// <reference types="vitest/globals" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmailComponent } from './email.component';

describe('EmailComponent', () => {
  let fixture: ComponentFixture<EmailComponent>;
  let component: EmailComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render native email input', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.type).toBe('email');
  });

  it('should pass labelPosition to ui-field and render label after input', () => {
    fixture.componentRef.setInput('label', 'Email');
    fixture.componentRef.setInput('id', 'email-after');
    fixture.componentRef.setInput('labelPosition', 'after');
    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector('.field-label--after');
    expect(label?.textContent?.trim()).toBe('Email');
  });

  it('should use computed aria-describedby with help id', () => {
    fixture.componentRef.setInput('id', 'email-help');
    fixture.componentRef.setInput('helpText', 'Enter your email');
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.getAttribute('aria-describedby')).toBe('email-help-help');
  });

  it('should fallback aria-label to component label', () => {
    fixture.componentRef.setInput('label', 'Email');
    fixture.componentRef.setInput('ariaLabel', '');
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.getAttribute('aria-label')).toBe('Email');
  });

  it('should render email action button with aria-label', () => {
    const actionButtons: HTMLButtonElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('.field__actions .field__action'),
    );
    expect(actionButtons.some(btn => btn.getAttribute('aria-label') === 'Email')).toBe(true);
  });

  it('should select full value on focus', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.value = 'john@example.com';
    const selectSpy = vi.spyOn(input, 'select');
    input.dispatchEvent(new FocusEvent('focus'));

    expect(selectSpy).toHaveBeenCalled();
  });
});
