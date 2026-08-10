/// <reference types="vitest/globals" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let fixture: ComponentFixture<SearchComponent>;
  let component: SearchComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render native search input', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input).toBeTruthy();
    expect(input.type).toBe('search');
  });

  it('should pass labelPosition to ui-field and render label before input', () => {
    fixture.componentRef.setInput('label', 'Search');
    fixture.componentRef.setInput('id', 'search-before');
    fixture.componentRef.setInput('labelPosition', 'before');
    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector('.field-label--before');
    expect(label?.textContent?.trim()).toBe('Search');
  });

  it('should use computed aria-describedby with help id', () => {
    fixture.componentRef.setInput('id', 'search-help');
    fixture.componentRef.setInput('helpText', 'Type keyword');
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.getAttribute('aria-describedby')).toBe('search-help-help');
  });

  it('should fallback aria-label to component label', () => {
    fixture.componentRef.setInput('label', 'Search');
    fixture.componentRef.setInput('ariaLabel', '');
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.getAttribute('aria-label')).toBe('Search');
  });

  it('should render search action button with aria-label', () => {
    const actionButtons: HTMLButtonElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('.field__actions .field__action'),
    );
    expect(actionButtons.some(btn => btn.getAttribute('aria-label') === 'Search')).toBe(true);
  });
});
