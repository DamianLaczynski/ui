/// <reference types="vitest/globals" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordComponent } from './password.component';

describe('PasswordComponent', () => {
  let fixture: ComponentFixture<PasswordComponent>;
  let component: PasswordComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render native password input by default', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.type).toBe('password');
  });

  it('should toggle input type from password to text', () => {
    component.togglePasswordVisibility();
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.type).toBe('text');
  });

  it('should pass labelPosition to ui-field and render label after input', () => {
    fixture.componentRef.setInput('label', 'Password');
    fixture.componentRef.setInput('id', 'password-after');
    fixture.componentRef.setInput('labelPosition', 'after');
    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector('.field-label--after');
    expect(label?.textContent?.trim()).toBe('Password');
  });

  it('should use computed aria-describedby with help id', () => {
    fixture.componentRef.setInput('id', 'password-help');
    fixture.componentRef.setInput('helpText', 'Use strong password');
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.getAttribute('aria-describedby')).toBe('password-help-help');
  });

  it('should render show password action button with aria-label', () => {
    const actionButtons: HTMLButtonElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('.field__actions .field__action'),
    );
    expect(actionButtons.some(btn => btn.getAttribute('aria-label') === 'Show password')).toBe(
      true,
    );
  });
});
