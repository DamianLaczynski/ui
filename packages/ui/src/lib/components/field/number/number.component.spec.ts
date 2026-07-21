/// <reference types="vitest/globals" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NumberComponent } from './number.component';

describe('NumberComponent', () => {
  let fixture: ComponentFixture<NumberComponent>;
  let component: NumberComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render native number input', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.type).toBe('number');
  });

  it('should pass labelPosition to ui-field and render label before input', () => {
    fixture.componentRef.setInput('label', 'Quantity');
    fixture.componentRef.setInput('id', 'number-before');
    fixture.componentRef.setInput('labelPosition', 'before');
    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector('.field-label--before');
    expect(label?.textContent?.trim()).toBe('Quantity');
  });

  it('should use computed aria-describedby with help id', () => {
    fixture.componentRef.setInput('id', 'number-help');
    fixture.componentRef.setInput('helpText', 'Set quantity');
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.getAttribute('aria-describedby')).toBe('number-help-help');
  });

  it('should increment and decrement value respecting step', () => {
    fixture.componentRef.setInput('step', 2);
    component.writeValue(10);
    component.increment();
    expect(component.value).toBe('12');

    component.decrement();
    expect(component.value).toBe('10');
  });

  it('should render number action button with aria-label', () => {
    const actionButtons: HTMLButtonElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('.field__actions .field__action'),
    );
    expect(actionButtons.some(btn => btn.getAttribute('aria-label') === 'Number input')).toBe(true);
  });
});
