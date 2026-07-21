/// <reference types="vitest/globals" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TotpComponent } from './totp.component';

describe('TotpComponent', () => {
  let fixture: ComponentFixture<TotpComponent>;
  let component: TotpComponent;
  let originalDir: string;

  beforeEach(async () => {
    originalDir = document.documentElement.dir;

    await TestBed.configureTestingModule({
      imports: [TotpComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TotpComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', 'totp');
    fixture.detectChanges();
  });

  afterEach(() => {
    document.documentElement.dir = originalDir;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render default number of digit inputs', () => {
    const inputs = fixture.nativeElement.querySelectorAll('.totp-digit');
    expect(inputs.length).toBe(6);
  });

  it('should update rendered inputs when digitsCount changes', () => {
    fixture.componentRef.setInput('digitsCount', 4);
    fixture.detectChanges();

    const inputs = fixture.nativeElement.querySelectorAll('.totp-digit');
    expect(inputs.length).toBe(4);
  });

  it('should pass labelPosition to ui-field and render label after inputs', () => {
    fixture.componentRef.setInput('label', 'Verification code');
    fixture.componentRef.setInput('labelPosition', 'after');
    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector('.field-label--after');
    expect(label?.textContent?.trim()).toBe('Verification code');
  });

  it('should use computed aria-describedby with help id', () => {
    fixture.componentRef.setInput('helpText', 'Enter code from SMS');
    fixture.detectChanges();

    const firstInput: HTMLInputElement = fixture.nativeElement.querySelector('.totp-digit');
    expect(firstInput.getAttribute('aria-describedby')).toBe('totp-help');
  });

  it('should emit combined code when digits are entered', () => {
    let emitted: string | null = null;
    component.change.subscribe(value => (emitted = value));

    const inputs: HTMLInputElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('.totp-digit'),
    );
    inputs[0].value = '1';
    inputs[0].dispatchEvent(new Event('input', { bubbles: true }));
    inputs[1].value = '2';
    inputs[1].dispatchEvent(new Event('input', { bubbles: true }));
    inputs[2].value = '3';
    inputs[2].dispatchEvent(new Event('input', { bubbles: true }));

    expect(emitted).toBe('123');
  });

  it('should not render literal null placeholder when placeholder is empty', () => {
    fixture.componentRef.setInput('placeholder', '');
    fixture.detectChanges();

    const firstInput: HTMLInputElement = fixture.nativeElement.querySelector('.totp-digit');
    expect(firstInput.getAttribute('placeholder')).toBeNull();
  });

  it('should move focus with ArrowRight according to RTL direction', () => {
    document.documentElement.dir = 'rtl';
    fixture.detectChanges();

    const inputs: HTMLInputElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('.totp-digit'),
    );
    inputs[2].focus();
    inputs[2].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));

    expect(document.activeElement).toBe(inputs[1]);
  });

  it('should move to next code input after typing in RTL', () => {
    document.documentElement.dir = 'rtl';
    fixture.detectChanges();

    const inputs: HTMLInputElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('.totp-digit'),
    );
    inputs[0].focus();
    inputs[0].value = '1';
    inputs[0].dispatchEvent(new Event('input', { bubbles: true }));

    expect(document.activeElement).toBe(inputs[1]);
  });
});
