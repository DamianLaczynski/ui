/// <reference types="vitest/globals" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionButtonComponent } from './action-button.component';

describe('ActionButtonComponent', () => {
  let fixture: ComponentFixture<ActionButtonComponent>;
  let component: ActionButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set aria-label when provided', () => {
    fixture.componentRef.setInput('ariaLabel', 'Clear value');
    fixture.detectChanges();

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.getAttribute('aria-label')).toBe('Clear value');
  });

  it('should emit click event when clicked', () => {
    const clickSpy = vi.fn();
    component.click.subscribe(clickSpy);

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    button.click();

    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  it('should not emit click event when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const clickSpy = vi.fn();
    component.click.subscribe(clickSpy);

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    button.click();

    expect(clickSpy).not.toHaveBeenCalled();
  });
});
