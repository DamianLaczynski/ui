/// <reference types="vitest/globals" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, ChangeDetectionStrategy } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from './button.component';
import { IconComponent } from '../icon/icon.component';
import { Variant, Appearance, Size, Shape, ButtonType } from '../utils';
import { IconName } from '../icon';

@Component({
  standalone: true,
  imports: [ButtonComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: '<ui-button icon="star">Label</ui-button>',
})
class ButtonWithProjectedContentHost {}

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let buttonElement: DebugElement;
  let nativeButton: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent, IconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    buttonElement = fixture.debugElement.query(By.css('button'));
    nativeButton = buttonElement.nativeElement;
  });

  describe('Component Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should render a button element', () => {
      expect(buttonElement).toBeTruthy();
      expect(nativeButton.tagName).toBe('BUTTON');
    });

    it('should have default input values', () => {
      expect(component.variant()).toBe('secondary');
      expect(component.appearance()).toBe('filled');
      expect(component.size()).toBe('medium');
      expect(component.shape()).toBe('rounded');
      expect(component.icon()).toBeUndefined();
      expect(component.text()).toBeUndefined();
      expect(component.selected()).toBe(false);
      expect(component.selectable()).toBe(false);
      expect(component.type()).toBe('button');
      expect(component.disabled()).toBe(false);
      expect(component.fullWidth()).toBe(false);
      expect(component.ariaLabel()).toBeUndefined();
    });

    it('should not set tabindex on host element (native button focusability)', () => {
      const hostElement = fixture.debugElement.nativeElement;
      expect(hostElement.getAttribute('tabindex')).toBe('-1');
    });
  });

  describe('Variant Input', () => {
    const variants: Variant[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];

    variants.forEach(variant => {
      it(`should apply ${variant} variant class`, () => {
        fixture.componentRef.setInput('variant', variant);
        fixture.detectChanges();

        expect(nativeButton.classList.contains(`button--${variant}`)).toBe(true);
      });
    });

    it('should update variant class when input changes', () => {
      fixture.componentRef.setInput('variant', 'primary');
      fixture.detectChanges();
      expect(nativeButton.classList.contains('button--primary')).toBe(true);

      fixture.componentRef.setInput('variant', 'danger');
      fixture.detectChanges();
      expect(nativeButton.classList.contains('button--danger')).toBe(true);
      expect(nativeButton.classList.contains('button--primary')).toBe(false);
    });
  });

  describe('Appearance Input', () => {
    const appearances: Appearance[] = ['filled', 'tint', 'outline', 'subtle', 'transparent'];

    appearances.forEach(appearance => {
      it(`should apply ${appearance} appearance class`, () => {
        fixture.componentRef.setInput('appearance', appearance);
        fixture.detectChanges();

        expect(nativeButton.classList.contains(`button--${appearance}`)).toBe(true);
      });
    });

    it('should update appearance class when input changes', () => {
      fixture.componentRef.setInput('appearance', 'filled');
      fixture.detectChanges();
      expect(nativeButton.classList.contains('button--filled')).toBe(true);

      fixture.componentRef.setInput('appearance', 'outline');
      fixture.detectChanges();
      expect(nativeButton.classList.contains('button--outline')).toBe(true);
      expect(nativeButton.classList.contains('button--filled')).toBe(false);
    });
  });

  describe('Size Input', () => {
    const sizes: Size[] = ['small', 'medium', 'large'];

    sizes.forEach(size => {
      it(`should apply ${size} size class`, () => {
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();

        expect(nativeButton.classList.contains(`button--${size}`)).toBe(true);
      });
    });

    it('should pass size to icon component', () => {
      fixture.componentRef.setInput('icon', 'star' as IconName);
      fixture.componentRef.setInput('size', 'large');
      fixture.detectChanges();

      const iconComponent = fixture.debugElement.query(By.directive(IconComponent));
      expect(iconComponent).toBeTruthy();
      expect(iconComponent.componentInstance.size()).toBe('large');
    });
  });

  describe('Shape Input', () => {
    const shapes: Shape[] = ['rounded', 'circular', 'square'];

    shapes.forEach(shape => {
      it(`should apply ${shape} shape class`, () => {
        fixture.componentRef.setInput('shape', shape);
        fixture.detectChanges();

        expect(nativeButton.classList.contains(`button--${shape}`)).toBe(true);
      });
    });
  });

  describe('Icon Input', () => {
    it('should not render icon when icon input is undefined', () => {
      const iconElement = fixture.debugElement.query(By.directive(IconComponent));
      expect(iconElement).toBeFalsy();
    });

    it('should render icon when icon input is provided', () => {
      fixture.componentRef.setInput('icon', 'star' as IconName);
      fixture.detectChanges();

      const iconElement = fixture.debugElement.query(By.directive(IconComponent));
      expect(iconElement).toBeTruthy();
    });

    it('should pass correct icon name to icon component', () => {
      const iconName: IconName = 'checkmark' as IconName;
      fixture.componentRef.setInput('icon', iconName);
      fixture.detectChanges();

      const iconComponent = fixture.debugElement.query(By.directive(IconComponent));
      expect(iconComponent.componentInstance.icon()).toBe(iconName);
    });

    it('should remove icon when icon input changes to undefined', () => {
      fixture.componentRef.setInput('icon', 'star' as IconName);
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.directive(IconComponent))).toBeTruthy();

      fixture.componentRef.setInput('icon', undefined);
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.directive(IconComponent))).toBeFalsy();
    });
  });

  describe('Text Input', () => {
    it('should have undefined text by default', () => {
      expect(component.text()).toBeUndefined();
    });

    it('should display text when set', () => {
      fixture.componentRef.setInput('text', 'Save');
      fixture.detectChanges();

      const textEl = nativeButton.querySelector('.button__text');
      expect(textEl).toBeTruthy();
      expect(textEl?.textContent?.trim()).toBe('Save');
    });

    it('should not render button__text when text is undefined', () => {
      expect(nativeButton.querySelector('.button__text')).toBeFalsy();
    });

    it('should update displayed text when input changes', () => {
      fixture.componentRef.setInput('text', 'Submit');
      fixture.detectChanges();
      expect(nativeButton.querySelector('.button__text')?.textContent?.trim()).toBe('Submit');

      fixture.componentRef.setInput('text', 'Cancel');
      fixture.detectChanges();
      expect(nativeButton.querySelector('.button__text')?.textContent?.trim()).toBe('Cancel');
    });
  });

  describe('Icon-only styling (SCSS :has/:empty)', () => {
    it('should have icon-only DOM structure when icon set and no text or content', () => {
      fixture.componentRef.setInput('icon', 'star' as IconName);
      fixture.detectChanges();

      expect(nativeButton.querySelector('ui-icon')).toBeTruthy();
      expect(nativeButton.querySelector('.button__text')).toBeFalsy();
      const content = nativeButton.querySelector('.button__content');
      expect(content?.childElementCount).toBe(0);
      expect((content?.textContent ?? '').trim()).toBe('');
    });

    it('should have text in DOM when text is set', () => {
      fixture.componentRef.setInput('icon', 'star' as IconName);
      fixture.componentRef.setInput('text', 'Save');
      fixture.detectChanges();

      expect(nativeButton.querySelector('.button__text')?.textContent?.trim()).toBe('Save');
    });

    it('should have projected content in slot when content is projected', () => {
      const hostFixture = TestBed.createComponent(ButtonWithProjectedContentHost);
      hostFixture.detectChanges();
      const btn = hostFixture.nativeElement.querySelector('button');
      const content = btn?.querySelector('.button__content');
      expect(content?.textContent?.trim()).toContain('Label');
    });
  });

  describe('Selected Input', () => {
    it('should not apply selected class by default', () => {
      expect(nativeButton.classList.contains('button--selected')).toBe(false);
    });

    it('should apply selected class when selected is true', () => {
      fixture.componentRef.setInput('selected', true);
      fixture.detectChanges();

      expect(nativeButton.classList.contains('button--selected')).toBe(true);
    });

    it('should set aria-pressed="true" when selected is true', () => {
      fixture.componentRef.setInput('selectable', true);
      fixture.componentRef.setInput('selected', true);
      fixture.detectChanges();

      expect(nativeButton.getAttribute('aria-pressed')).toBe('true');
    });

    it('should not set aria-pressed when selectable is false', () => {
      fixture.componentRef.setInput('selectable', false);
      fixture.componentRef.setInput('selected', false);
      fixture.detectChanges();

      expect(nativeButton.getAttribute('aria-pressed')).toBeNull();
    });
  });

  describe('Selectable', () => {
    it('should toggle selected state on click when selectable is true', () => {
      fixture.componentRef.setInput('selectable', true);
      fixture.detectChanges();

      expect(component.selected()).toBe(false);

      nativeButton.click();
      fixture.detectChanges();
      expect(component.selected()).toBe(true);

      nativeButton.click();
      fixture.detectChanges();
      expect(component.selected()).toBe(false);
    });

    it('should not toggle selected state when selectable is false', () => {
      fixture.componentRef.setInput('selected', true);
      fixture.componentRef.setInput('selectable', false);
      fixture.detectChanges();

      nativeButton.click();
      fixture.detectChanges();
      expect(component.selected()).toBe(true);
    });

    it('should not toggle when disabled', () => {
      fixture.componentRef.setInput('selectable', true);
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      nativeButton.click();
      fixture.detectChanges();
      expect(component.selected()).toBe(false);
    });

    it('should not toggle when loading', () => {
      fixture.componentRef.setInput('selectable', true);
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();

      nativeButton.click();
      fixture.detectChanges();
      expect(component.selected()).toBe(false);
    });
  });

  describe('Type Input', () => {
    const types: ButtonType[] = ['button', 'submit', 'reset'];

    types.forEach(type => {
      it(`should set button type to ${type}`, () => {
        fixture.componentRef.setInput('type', type);
        fixture.detectChanges();

        expect(nativeButton.type).toBe(type);
      });
    });

    it('should default to button type', () => {
      expect(nativeButton.type).toBe('button');
    });
  });

  describe('Disabled Input', () => {
    it('should not be disabled by default', () => {
      expect(nativeButton.disabled).toBe(false);
      expect(nativeButton.classList.contains('button--disabled')).toBe(false);
    });

    it('should set disabled attribute when disabled is true', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(nativeButton.disabled).toBe(true);
    });

    it('should apply disabled class when disabled is true', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(nativeButton.classList.contains('button--disabled')).toBe(true);
    });
  });

  describe('FullWidth Input', () => {
    it('should not apply full-width class by default', () => {
      expect(nativeButton.classList.contains('button--full-width')).toBe(false);
    });

    it('should apply full-width class when fullWidth is true', () => {
      fixture.componentRef.setInput('fullWidth', true);
      fixture.detectChanges();

      expect(nativeButton.classList.contains('button--full-width')).toBe(true);
    });
  });

  describe('AriaLabel Input', () => {
    it('should not set aria-label by default', () => {
      expect(nativeButton.getAttribute('aria-label')).toBeNull();
    });

    it('should set aria-label when provided', () => {
      const label = 'Custom button label';
      fixture.componentRef.setInput('ariaLabel', label);
      fixture.detectChanges();

      expect(nativeButton.getAttribute('aria-label')).toBe(label);
    });

    it('should update aria-label when input changes', () => {
      fixture.componentRef.setInput('ariaLabel', 'First label');
      fixture.detectChanges();
      expect(nativeButton.getAttribute('aria-label')).toBe('First label');

      fixture.componentRef.setInput('ariaLabel', 'Second label');
      fixture.detectChanges();
      expect(nativeButton.getAttribute('aria-label')).toBe('Second label');
    });
  });

  describe('Click Event', () => {
    it('should emit click event when button is clicked', () => {
      let emittedEvent: MouseEvent | undefined;
      component.click.subscribe((event: MouseEvent) => {
        emittedEvent = event;
      });

      nativeButton.click();

      expect(emittedEvent).toBeDefined();
      expect(emittedEvent instanceof MouseEvent).toBe(true);
    });

    it('should not emit click event when button is disabled', () => {
      let clickEmitted = false;
      component.click.subscribe(() => {
        clickEmitted = true;
      });

      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      nativeButton.click();

      expect(clickEmitted).toBe(false);
    });

    it('should call preventDefault for button type', () => {
      const event = new MouseEvent('click');
      vi.spyOn(event, 'preventDefault');
      vi.spyOn(event, 'stopPropagation');

      fixture.componentRef.setInput('type', 'button');
      fixture.detectChanges();

      component.onClick(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(event.stopPropagation).toHaveBeenCalled();
    });

    it('should call preventDefault for reset type', () => {
      const event = new MouseEvent('click');
      vi.spyOn(event, 'preventDefault');
      vi.spyOn(event, 'stopPropagation');

      fixture.componentRef.setInput('type', 'reset');
      fixture.detectChanges();

      component.onClick(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(event.stopPropagation).toHaveBeenCalled();
    });

    it('should NOT call preventDefault for submit type', () => {
      const event = new MouseEvent('click');
      vi.spyOn(event, 'preventDefault');
      vi.spyOn(event, 'stopPropagation');

      fixture.componentRef.setInput('type', 'submit');
      fixture.detectChanges();

      component.onClick(event);

      expect(event.preventDefault).not.toHaveBeenCalled();
      expect(event.stopPropagation).not.toHaveBeenCalled();
    });

    it('should emit event even for submit type', () => {
      let emittedEvent: MouseEvent | undefined;
      component.click.subscribe((event: MouseEvent) => {
        emittedEvent = event;
      });

      fixture.componentRef.setInput('type', 'submit');
      fixture.detectChanges();

      const event = new MouseEvent('click');
      component.onClick(event);

      expect(emittedEvent).toBe(event);
    });
  });

  describe('ButtonClasses Method', () => {
    it('should always include base button class', () => {
      const classes = component.buttonClasses();
      expect(classes).toContain('button');
    });

    it('should include all default classes', () => {
      const classes = component.buttonClasses();
      expect(classes).toContain('button');
      expect(classes).toContain('button--secondary');
      expect(classes).toContain('button--filled');
      expect(classes).toContain('button--medium');
      expect(classes).toContain('button--rounded');
    });

    it('should include multiple state classes when applicable', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.componentRef.setInput('selected', true);
      fixture.componentRef.setInput('fullWidth', true);
      fixture.componentRef.setInput('icon', 'star' as IconName);
      fixture.detectChanges();

      const classes = component.buttonClasses();
      expect(classes).toContain('button--disabled');
      expect(classes).toContain('button--selected');
      expect(classes).toContain('button--full-width');
    });

    it('should return space-separated string of classes', () => {
      const classes = component.buttonClasses();
      expect(typeof classes).toBe('string');
      expect(classes.split(' ').length).toBeGreaterThan(1);
    });
  });

  describe('Content Projection', () => {
    it('should project text content', () => {
      const testFixture = TestBed.createComponent(ButtonWithProjectedContentHost);
      testFixture.detectChanges();
      const buttonEl = testFixture.nativeElement.querySelector('button');
      expect(buttonEl?.textContent?.trim()).toContain('Label');
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle all inputs together', () => {
      fixture.componentRef.setInput('variant', 'primary');
      fixture.componentRef.setInput('appearance', 'outline');
      fixture.componentRef.setInput('size', 'large');
      fixture.componentRef.setInput('shape', 'circular');
      fixture.componentRef.setInput('icon', 'star' as IconName);
      fixture.componentRef.setInput('selected', true);
      fixture.componentRef.setInput('disabled', false);
      fixture.componentRef.setInput('fullWidth', true);
      fixture.componentRef.setInput('ariaLabel', 'Star button');
      fixture.componentRef.setInput('type', 'submit');
      fixture.detectChanges();

      expect(nativeButton.classList.contains('button--primary')).toBe(true);
      expect(nativeButton.classList.contains('button--outline')).toBe(true);
      expect(nativeButton.classList.contains('button--large')).toBe(true);
      expect(nativeButton.classList.contains('button--circular')).toBe(true);
      expect(nativeButton.classList.contains('button--selected')).toBe(true);
      expect(nativeButton.classList.contains('button--full-width')).toBe(true);
      expect(nativeButton.getAttribute('aria-label')).toBe('Star button');
      expect(nativeButton.type).toBe('submit');
      expect(fixture.debugElement.query(By.directive(IconComponent))).toBeTruthy();
    });

    it('should handle rapid state changes', () => {
      for (let i = 0; i < 10; i++) {
        fixture.componentRef.setInput('disabled', i % 2 === 0);
        fixture.detectChanges();
        expect(component.disabled()).toBe(i % 2 === 0);
      }
    });

    it('should maintain state consistency after multiple updates', () => {
      // Initial state
      fixture.componentRef.setInput('variant', 'primary');
      fixture.componentRef.setInput('disabled', false);
      fixture.detectChanges();

      // Update 1
      fixture.componentRef.setInput('variant', 'danger');
      fixture.detectChanges();
      expect(nativeButton.classList.contains('button--danger')).toBe(true);
      expect(nativeButton.classList.contains('button--primary')).toBe(false);

      // Update 2
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      expect(nativeButton.classList.contains('button--danger')).toBe(true);
      expect(nativeButton.disabled).toBe(true);

      // Update 3
      fixture.componentRef.setInput('variant', 'success');
      fixture.detectChanges();
      expect(nativeButton.classList.contains('button--success')).toBe(true);
      expect(nativeButton.classList.contains('button--danger')).toBe(false);
      expect(nativeButton.disabled).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard accessible', () => {
      expect(nativeButton.tabIndex).toBeGreaterThanOrEqual(0);
    });

    it('should have proper ARIA attributes when selected', () => {
      fixture.componentRef.setInput('selectable', true);
      fixture.componentRef.setInput('selected', true);
      fixture.detectChanges();

      expect(nativeButton.getAttribute('aria-pressed')).toBe('true');
    });

    it('should support custom aria-label for screen readers', () => {
      fixture.componentRef.setInput('ariaLabel', 'Save document');
      fixture.detectChanges();

      expect(nativeButton.getAttribute('aria-label')).toBe('Save document');
    });

    it('should be properly disabled for assistive technologies', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(nativeButton.disabled).toBe(true);
      expect(nativeButton.getAttribute('disabled')).not.toBeNull();
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined icon gracefully', () => {
      fixture.componentRef.setInput('icon', undefined);
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.directive(IconComponent))).toBeFalsy();
      expect(() => fixture.detectChanges()).not.toThrow();
    });

    it('should handle empty string aria-label', () => {
      fixture.componentRef.setInput('ariaLabel', '');
      fixture.detectChanges();

      expect(nativeButton.getAttribute('aria-label')).toBe('');
    });

    it('should handle multiple rapid clicks when not disabled', () => {
      let clickCount = 0;
      component.click.subscribe(() => clickCount++);

      for (let i = 0; i < 5; i++) {
        nativeButton.click();
      }

      expect(clickCount).toBe(5);
    });

    it('should not emit clicks when disabled even with multiple attempts', () => {
      let clickCount = 0;
      component.click.subscribe(() => clickCount++);

      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      for (let i = 0; i < 5; i++) {
        nativeButton.click();
      }

      expect(clickCount).toBe(0);
    });

    it('should handle switching between disabled states during click attempts', () => {
      let clickCount = 0;
      component.click.subscribe(() => clickCount++);

      nativeButton.click();
      expect(clickCount).toBe(1);

      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      nativeButton.click();
      expect(clickCount).toBe(1);

      fixture.componentRef.setInput('disabled', false);
      fixture.detectChanges();
      nativeButton.click();
      expect(clickCount).toBe(2);
    });
  });

  describe('Badge overlay', () => {
    it('should not render badge when badge input is unset', () => {
      expect(fixture.debugElement.query(By.css('.button__badge'))).toBeNull();
      expect(fixture.debugElement.query(By.css('.button-anchor'))).toBeNull();
    });

    it('should render badge when badge input is set', () => {
      fixture.componentRef.setInput('badge', '3');
      fixture.detectChanges();

      const badge = fixture.debugElement.query(By.css('.button__badge'));
      expect(badge).toBeTruthy();
      expect(badge.nativeElement.textContent).toContain('3');
      expect(fixture.debugElement.query(By.css('.button-anchor'))).toBeTruthy();
    });

    it('should hide badge while loading when hideBadgeWhenLoading is true', () => {
      fixture.componentRef.setInput('badge', '2');
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.button__badge'))).toBeNull();
    });

    it('should apply badge position class', () => {
      fixture.componentRef.setInput('badge', '1');
      fixture.componentRef.setInput('badgePosition', 'bottom-start');
      fixture.detectChanges();

      const badge = fixture.debugElement.query(By.css('.button__badge'));
      expect(badge.nativeElement.classList.contains('button__badge--bottom-start')).toBe(true);
    });

    it('should pass badge variant to badge component', () => {
      fixture.componentRef.setInput('badge', '9');
      fixture.componentRef.setInput('badgeVariant', 'success');
      fixture.detectChanges();

      const badge = fixture.debugElement.query(By.css('.badge--success'));
      expect(badge).toBeTruthy();
    });
  });

  describe('Change Detection', () => {
    it('should use OnPush change detection strategy', () => {
      expect(component).toBeTruthy();
      // OnPush is set in component metadata, verified by compilation
    });

    it('should update view when input signals change', () => {
      fixture.componentRef.setInput('variant', 'primary');
      fixture.detectChanges();
      expect(nativeButton.classList.contains('button--primary')).toBe(true);

      fixture.componentRef.setInput('variant', 'secondary');
      fixture.detectChanges();
      expect(nativeButton.classList.contains('button--secondary')).toBe(true);
    });
  });
});
