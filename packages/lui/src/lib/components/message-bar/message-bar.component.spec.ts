import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ButtonComponent } from '../button';
import { IconComponent, IconName } from '../icon';
import { QuickAction, Variant } from '../utils';
import { MessageBarComponent } from './message-bar.component';

describe('MessageBarComponent', () => {
  let component: MessageBarComponent;
  let fixture: ComponentFixture<MessageBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MessageBarComponent);
    component = fixture.componentInstance;
  });

  it('should create the component with default inputs', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.variant()).toBe('info');
    expect(component.appearance()).toBe('tint');
    expect(component.size()).toBe('medium');
    expect(component.showIcon()).toBe(true);
    expect(component.dismissible()).toBe(true);
    expect(component.multiline()).toBe(true);
  });

  it('should compose base and state classes', () => {
    fixture.componentRef.setInput('variant', 'success');
    fixture.componentRef.setInput('appearance', 'outline');
    fixture.componentRef.setInput('size', 'large');
    fixture.componentRef.setInput('multiline', false);
    fixture.componentRef.setInput('showIcon', false);
    fixture.detectChanges();

    const host = fixture.debugElement.query(By.css('.message-bar'));
    const classes = host.nativeElement.className as string;

    expect(classes).toContain('message-bar--success');
    expect(classes).toContain('message-bar--outline');
    expect(classes).toContain('message-bar--large');
    expect(classes).toContain('message-bar--single-line');
    expect(classes).toContain('message-bar--no-icon');
  });

  it('should use status/polite semantics by default', () => {
    fixture.detectChanges();

    const host = fixture.debugElement.query(By.css('.message-bar'));
    expect(host.nativeElement.getAttribute('role')).toBe('status');
    expect(host.nativeElement.getAttribute('aria-live')).toBe('polite');
  });

  it('should use alert/assertive semantics for danger variant', () => {
    fixture.componentRef.setInput('variant', 'danger');
    fixture.detectChanges();

    const host = fixture.debugElement.query(By.css('.message-bar'));
    expect(host.nativeElement.getAttribute('role')).toBe('alert');
    expect(host.nativeElement.getAttribute('aria-live')).toBe('assertive');
  });

  it('should map default icon by variant when no icon is provided', () => {
    const map: Array<{ variant: Variant; expected: IconName }> = [
      { variant: 'success', expected: 'checkmark_circle' },
      { variant: 'warning', expected: 'warning' },
      { variant: 'danger', expected: 'error_circle' },
      { variant: 'info', expected: 'info' },
      { variant: 'primary', expected: 'info' },
      { variant: 'secondary', expected: 'info' },
    ];

    map.forEach(({ variant, expected }) => {
      fixture.componentRef.setInput('variant', variant);
      fixture.componentRef.setInput('icon', undefined);
      fixture.detectChanges();

      const icon = fixture.debugElement.queryAll(By.directive(IconComponent))[0];
      expect(icon.componentInstance.icon()).toBe(expected);
    });
  });

  it('should prefer explicit icon over variant mapping', () => {
    fixture.componentRef.setInput('variant', 'danger');
    fixture.componentRef.setInput('icon', 'star');
    fixture.detectChanges();

    const icon = fixture.debugElement.queryAll(By.directive(IconComponent))[0];
    expect(icon.componentInstance.icon()).toBe('star');
  });

  it('should emit dismiss when dismiss button is clicked', () => {
    const dismissSpy = vi.fn();
    component.dismiss.subscribe(dismissSpy);
    fixture.detectChanges();

    const dismissButton = fixture.debugElement.query(By.css('.message-bar__dismiss'));
    dismissButton.nativeElement.click();

    expect(dismissSpy).toHaveBeenCalledTimes(1);
  });

  it('should render actions and pass fallback button props', () => {
    const action: QuickAction = {
      label: 'Retry',
      action: vi.fn(),
    };

    fixture.componentRef.setInput('size', 'large');
    fixture.componentRef.setInput('actions', [action]);
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.directive(ButtonComponent));
    expect(button).toBeTruthy();
    expect(button.componentInstance.variant()).toBe('secondary');
    expect(button.componentInstance.appearance()).toBe('outline');
    expect(button.componentInstance.size()).toBe('large');
    expect(button.componentInstance.shape()).toBe('rounded');
  });

  it('should execute action callback and emit actionSelect for enabled actions', () => {
    const actionFn = vi.fn();
    const action: QuickAction = {
      label: 'Retry',
      action: actionFn,
    };
    const selectSpy = vi.fn();
    component.actionSelect.subscribe(selectSpy);

    component.onActionClick(action);

    expect(actionFn).toHaveBeenCalledTimes(1);
    expect(selectSpy).toHaveBeenCalledWith(action);
  });

  it('should ignore disabled actions', () => {
    const actionFn = vi.fn();
    const action: QuickAction = {
      label: 'Retry',
      action: actionFn,
      disabled: true,
    };
    const selectSpy = vi.fn();
    component.actionSelect.subscribe(selectSpy);

    component.onActionClick(action);

    expect(actionFn).not.toHaveBeenCalled();
    expect(selectSpy).not.toHaveBeenCalled();
  });
});
