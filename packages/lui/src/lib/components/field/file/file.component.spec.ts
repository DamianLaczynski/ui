/// <reference types="vitest/globals" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileComponent } from './file.component';

describe('FileComponent', () => {
  let fixture: ComponentFixture<FileComponent>;
  let component: FileComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass labelPosition to ui-field and render label before trigger', () => {
    fixture.componentRef.setInput('id', 'file-before');
    fixture.componentRef.setInput('label', 'Upload');
    fixture.componentRef.setInput('labelPosition', 'before');
    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector('.field-label--before');
    expect(label?.textContent?.trim()).toBe('Upload');
  });

  it('should use computed aria-describedby with help id in area mode', () => {
    fixture.componentRef.setInput('id', 'file-help');
    fixture.componentRef.setInput('helpText', 'Drop files here');
    fixture.detectChanges();

    const trigger: HTMLElement = fixture.nativeElement.querySelector('.file[role="button"]');
    expect(trigger.getAttribute('aria-describedby')).toBe('file-help-help');
  });

  it('should use i18n inline trigger aria-label when label and ariaLabel are empty', () => {
    fixture.componentRef.setInput('mode', 'inline');
    fixture.componentRef.setInput('label', '');
    fixture.componentRef.setInput('ariaLabel', '');
    fixture.detectChanges();

    const trigger: HTMLInputElement = fixture.nativeElement.querySelector('.file-display');
    expect(trigger.getAttribute('aria-label')).toBe('Browse files');
  });

  it('should use i18n inline placeholder when placeholder is empty', () => {
    fixture.componentRef.setInput('mode', 'inline');
    fixture.componentRef.setInput('placeholder', '');
    fixture.detectChanges();

    const trigger: HTMLInputElement = fixture.nativeElement.querySelector('.file-display');
    expect(trigger.getAttribute('placeholder')).toBe('Click to select files');
  });

  it('should trigger file input on Enter key and prevent default', () => {
    const triggerSpy = vi.spyOn(component, 'triggerFileInput');
    const event = new KeyboardEvent('keydown', { key: 'Enter', cancelable: true });
    const preventSpy = vi.spyOn(event, 'preventDefault');

    component.onTriggerKeydown(event);

    expect(preventSpy).toHaveBeenCalled();
    expect(triggerSpy).toHaveBeenCalled();
  });

  it('should keep native inline file input out of tab order', () => {
    fixture.componentRef.setInput('mode', 'inline');
    fixture.detectChanges();

    const hiddenInput: HTMLInputElement = fixture.nativeElement.querySelector('.file-input');
    expect(hiddenInput.tabIndex).toBe(-1);
  });

  it('should keep native area file input out of tab order', () => {
    fixture.componentRef.setInput('mode', 'area');
    fixture.detectChanges();

    const hiddenInput: HTMLInputElement = fixture.nativeElement.querySelector('.file-input');
    expect(hiddenInput.tabIndex).toBe(-1);
  });

  it('should render remove button for selected files in area mode', () => {
    fixture.componentRef.setInput('mode', 'area');
    component.writeValue(new File(['hello'], 'hello.txt', { type: 'text/plain' }));
    fixture.detectChanges();

    const removeButtons: HTMLButtonElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('.file-list .button[aria-label^="Remove "]'),
    );
    expect(removeButtons.length).toBe(1);
  });
});
