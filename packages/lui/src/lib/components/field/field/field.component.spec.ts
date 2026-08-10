/// <reference types="vitest/globals" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FieldComponent } from './field.component';

describe('FieldComponent', () => {
  let fixture: ComponentFixture<FieldComponent>;
  let component: FieldComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate label id when label and id are provided', () => {
    fixture.componentRef.setInput('id', 'field-accept');
    fixture.componentRef.setInput('label', 'Accept');
    fixture.detectChanges();

    expect(component.getLabelElementId()).toBe('field-accept-label');
  });

  it('should generate help id only when help text is visible', () => {
    fixture.componentRef.setInput('id', 'field-help');
    fixture.componentRef.setInput('helpText', 'Helpful text');
    fixture.detectChanges();

    expect(component.getHelpTextElementId()).toBe('field-help-help');

    fixture.componentRef.setInput('errorText', 'Error text');
    fixture.detectChanges();

    expect(component.getHelpTextElementId()).toBeNull();
  });

  it('should generate error id only when error text exists', () => {
    fixture.componentRef.setInput('id', 'field-error');
    fixture.componentRef.setInput('errorText', 'Error text');
    fixture.detectChanges();

    expect(component.getErrorTextElementId()).toBe('field-error-error');
  });

  it('should merge aria-describedby with help and error ids without duplicates', () => {
    fixture.componentRef.setInput('id', 'field-desc');
    fixture.componentRef.setInput('ariaDescribedBy', 'external-id');
    fixture.componentRef.setInput('helpText', 'Helpful text');
    fixture.detectChanges();

    expect(component.getComputedAriaDescribedBy()).toBe('external-id field-desc-help');

    fixture.componentRef.setInput('errorText', 'Error text');
    fixture.detectChanges();

    expect(component.getComputedAriaDescribedBy()).toBe('external-id field-desc-error');
  });

  it('should render semantic ids in template for label/help/error', () => {
    fixture.componentRef.setInput('id', 'field-template');
    fixture.componentRef.setInput('label', 'Template label');
    fixture.componentRef.setInput('helpText', 'Template help');
    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector('label');
    const help = fixture.nativeElement.querySelector('.field-message--help');

    expect(label?.id).toBe('field-template-label');
    expect(help?.id).toBe('field-template-help');

    fixture.componentRef.setInput('errorText', 'Template error');
    fixture.detectChanges();

    const error = fixture.nativeElement.querySelector('.field-message--error');
    expect(error?.id).toBe('field-template-error');
    expect(error?.getAttribute('role')).toBe('alert');
    expect(error?.querySelector('ui-icon')).toBeTruthy();
    expect(error?.querySelector('.field-message__text')?.textContent?.trim()).toBe(
      'Template error',
    );
  });

  it('should render info icon for help text and error icon for validation text', () => {
    fixture.componentRef.setInput('id', 'field-icons');
    fixture.componentRef.setInput('helpText', 'Helpful text');
    fixture.detectChanges();

    const help = fixture.nativeElement.querySelector('.field-message--help');
    const helpIcon = help?.querySelector('ui-icon');
    expect(helpIcon).toBeTruthy();
    expect(help?.querySelector('.field-message__text')?.textContent?.trim()).toBe('Helpful text');

    fixture.componentRef.setInput('errorText', 'Invalid value');
    fixture.detectChanges();

    const error = fixture.nativeElement.querySelector('.field-message--error');
    const errorIcon = error?.querySelector('ui-icon');
    expect(errorIcon).toBeTruthy();
    expect(error?.querySelector('.field-message__text')?.textContent?.trim()).toBe('Invalid value');
  });

  it('should compute aria-label from explicit ariaLabel first, then fallback to label', () => {
    fixture.componentRef.setInput('label', 'Username');
    fixture.componentRef.setInput('ariaLabel', '');
    fixture.detectChanges();

    expect(component.getComputedAriaLabel()).toBe('Username');

    fixture.componentRef.setInput('ariaLabel', 'User name input');
    fixture.detectChanges();

    expect(component.getComputedAriaLabel()).toBe('User name input');
  });

  it('should return null aria-label when both ariaLabel and label are empty', () => {
    fixture.componentRef.setInput('label', '');
    fixture.componentRef.setInput('ariaLabel', '   ');
    fixture.detectChanges();

    expect(component.getComputedAriaLabel()).toBeNull();
  });

  it('should render label before content when labelPosition is before', () => {
    fixture.componentRef.setInput('id', 'field-before');
    fixture.componentRef.setInput('label', 'Before label');
    fixture.componentRef.setInput('labelPosition', 'before');
    fixture.detectChanges();

    const beforeLabel = fixture.nativeElement.querySelector('.field-label--before');
    const aboveLabel = fixture.nativeElement.querySelector(
      '.input-container > .field-label:not(.field-label--before):not(.field-label--after):not(.field-label--below)',
    );

    expect(beforeLabel?.textContent?.trim()).toBe('Before label');
    expect(aboveLabel).toBeNull();
  });

  it('should render label below content when labelPosition is below', () => {
    fixture.componentRef.setInput('id', 'field-below');
    fixture.componentRef.setInput('label', 'Below label');
    fixture.componentRef.setInput('labelPosition', 'below');
    fixture.detectChanges();

    const belowLabel = fixture.nativeElement.querySelector('.field-label--below');
    const inputMain = fixture.nativeElement.querySelector('.input-main');

    expect(belowLabel?.textContent?.trim()).toBe('Below label');
    expect(inputMain?.nextElementSibling).toBe(belowLabel);
  });
});
