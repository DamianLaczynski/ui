/// <reference types="vitest/globals" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextComponent } from './text.component';

describe('TextComponent', () => {
  let fixture: ComponentFixture<TextComponent>;
  let component: TextComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass labelPosition to ui-field and render label after input', () => {
    fixture.componentRef.setInput('label', 'Username');
    fixture.componentRef.setInput('id', 'text-after');
    fixture.componentRef.setInput('labelPosition', 'after');
    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector('.field-label--after');
    expect(label?.textContent?.trim()).toBe('Username');
  });

  it('should use computed aria-describedby with help id', () => {
    fixture.componentRef.setInput('id', 'text-help');
    fixture.componentRef.setInput('helpText', 'Help');
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.getAttribute('aria-describedby')).toBe('text-help-help');
  });

  it('should render clear action button with aria-label when value exists', () => {
    const localFixture = TestBed.createComponent(TextComponent);
    const localComponent = localFixture.componentInstance;
    localComponent.writeValue('abc');
    localFixture.detectChanges();

    const clearButton: HTMLButtonElement = localFixture.nativeElement.querySelector(
      '.field__actions .field__action',
    );
    expect(clearButton?.getAttribute('aria-label')).toBe('Clear text');
  });
});
