/// <reference types="vitest/globals" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UrlComponent } from './url.component';

describe('UrlComponent', () => {
  let fixture: ComponentFixture<UrlComponent>;
  let component: UrlComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UrlComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render native url input', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input).toBeTruthy();
    expect(input.type).toBe('url');
  });

  it('should pass labelPosition to ui-field and render label before input', () => {
    fixture.componentRef.setInput('label', 'Website');
    fixture.componentRef.setInput('id', 'url-before');
    fixture.componentRef.setInput('labelPosition', 'before');
    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector('.field-label--before');
    expect(label?.textContent?.trim()).toBe('Website');
  });

  it('should use computed aria-describedby with help id', () => {
    fixture.componentRef.setInput('id', 'url-help');
    fixture.componentRef.setInput('helpText', 'Use https://');
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.getAttribute('aria-describedby')).toBe('url-help-help');
  });

  it('should fallback aria-label to component label', () => {
    fixture.componentRef.setInput('label', 'Website');
    fixture.componentRef.setInput('ariaLabel', '');
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.getAttribute('aria-label')).toBe('Website');
  });

  it('should render link action button with aria-label', () => {
    const actionButtons: HTMLButtonElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('.field__actions .field__action'),
    );
    expect(actionButtons.some(btn => btn.getAttribute('aria-label') === 'Open link actions')).toBe(
      true,
    );
  });
});
