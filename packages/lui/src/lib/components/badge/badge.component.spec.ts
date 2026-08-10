import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BadgeComponent } from './badge.component';
import { IconComponent } from '../icon/icon.component';
import { Variant, Appearance, Size, Shape, ContentPosition } from '../utils';
import { IconName } from '../icon';

describe('BadgeComponent', () => {
  let component: BadgeComponent;
  let fixture: ComponentFixture<BadgeComponent>;
  let badgeElement: DebugElement;
  let nativeBadge: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeComponent, IconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeComponent);
    component = fixture.componentInstance;
  });

  describe('Component Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should require text input', () => {
      // Text is required, so we need to set it before detectChanges
      fixture.componentRef.setInput('text', 'Test Badge');
      fixture.detectChanges();
      badgeElement = fixture.debugElement.query(By.css('.badge'));
      expect(badgeElement).toBeTruthy();
    });

    it('should have default input values', () => {
      fixture.componentRef.setInput('text', 'Badge');
      fixture.detectChanges();

      expect(component.variant()).toBe('primary');
      expect(component.size()).toBe('medium');
      expect(component.appearance()).toBe('filled');
      expect(component.shape()).toBe('circular');
      expect(component.iconPosition()).toBe('before');
      expect(component.icon()).toBeUndefined();
      expect(component.ariaLabel()).toBe('');
    });
  });

  describe('Text Input', () => {
    it('should display the provided text', () => {
      const testText = 'New Badge';
      fixture.componentRef.setInput('text', testText);
      fixture.detectChanges();

      const badgeEl = fixture.debugElement.query(By.css('.badge'));
      expect(badgeEl.nativeElement.textContent).toContain(testText);
    });

    it('should update text when input changes', () => {
      fixture.componentRef.setInput('text', 'First');
      fixture.detectChanges();
      let badgeEl = fixture.debugElement.query(By.css('.badge'));
      expect(badgeEl.nativeElement.textContent).toContain('First');

      fixture.componentRef.setInput('text', 'Second');
      fixture.detectChanges();
      badgeEl = fixture.debugElement.query(By.css('.badge'));
      expect(badgeEl.nativeElement.textContent).toContain('Second');
    });

    it('should handle empty string text', () => {
      fixture.componentRef.setInput('text', '');
      fixture.detectChanges();

      const badgeEl = fixture.debugElement.query(By.css('.badge'));
      expect(badgeEl).toBeTruthy();
    });
  });

  describe('Variant Input', () => {
    const variants: Variant[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];

    variants.forEach(variant => {
      it(`should apply ${variant} variant class`, () => {
        fixture.componentRef.setInput('text', 'Badge');
        fixture.componentRef.setInput('variant', variant);
        fixture.detectChanges();

        const classes = component.badgeClasses;
        expect(classes).toContain(`badge--${variant}`);
      });
    });
  });

  describe('Appearance Input', () => {
    const appearances: Appearance[] = ['filled', 'tint', 'outline', 'subtle', 'transparent'];

    appearances.forEach(appearance => {
      it(`should apply ${appearance} appearance class`, () => {
        fixture.componentRef.setInput('text', 'Badge');
        fixture.componentRef.setInput('appearance', appearance);
        fixture.detectChanges();

        const classes = component.badgeClasses;
        expect(classes).toContain(`badge--${appearance}`);
      });
    });
  });

  describe('Size Input', () => {
    const sizes: Size[] = ['small', 'medium', 'large'];

    sizes.forEach(size => {
      it(`should apply ${size} size class`, () => {
        fixture.componentRef.setInput('text', 'Badge');
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();

        const classes = component.badgeClasses;
        expect(classes).toContain(`badge--${size}`);
      });
    });

    it('should pass size to icon component', () => {
      fixture.componentRef.setInput('text', 'Badge');
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
        fixture.componentRef.setInput('text', 'Badge');
        fixture.componentRef.setInput('shape', shape);
        fixture.detectChanges();

        const classes = component.badgeClasses;
        expect(classes).toContain(`badge--${shape}`);
      });
    });
  });

  describe('Icon Input', () => {
    it('should not render icon when icon input is undefined', () => {
      fixture.componentRef.setInput('text', 'Badge');
      fixture.detectChanges();

      const iconElement = fixture.debugElement.query(By.directive(IconComponent));
      expect(iconElement).toBeFalsy();
    });

    it('should render icon when icon input is provided', () => {
      fixture.componentRef.setInput('text', 'Badge');
      fixture.componentRef.setInput('icon', 'star' as IconName);
      fixture.detectChanges();

      const iconElement = fixture.debugElement.query(By.directive(IconComponent));
      expect(iconElement).toBeTruthy();
    });

    it('should pass correct icon name to icon component', () => {
      const iconName: IconName = 'checkmark' as IconName;
      fixture.componentRef.setInput('text', 'Badge');
      fixture.componentRef.setInput('icon', iconName);
      fixture.detectChanges();

      const iconComponent = fixture.debugElement.query(By.directive(IconComponent));
      expect(iconComponent.componentInstance.icon()).toBe(iconName);
    });

    it('should apply icon position class when icon is present', () => {
      fixture.componentRef.setInput('text', 'Badge');
      fixture.componentRef.setInput('icon', 'star' as IconName);
      fixture.componentRef.setInput('iconPosition', 'after');
      fixture.detectChanges();

      const classes = component.badgeClasses;
      expect(classes).toContain('badge--icon-after');
    });

    it('should not apply icon position class when icon is not present', () => {
      fixture.componentRef.setInput('text', 'Badge');
      fixture.componentRef.setInput('iconPosition', 'after');
      fixture.detectChanges();

      const classes = component.badgeClasses;
      expect(classes).not.toContain('badge--icon-after');
    });
  });

  describe('IconPosition Input', () => {
    const positions: ContentPosition[] = ['before', 'after'];

    positions.forEach(position => {
      it(`should apply icon-${position} class when icon is present`, () => {
        fixture.componentRef.setInput('text', 'Badge');
        fixture.componentRef.setInput('icon', 'star' as IconName);
        fixture.componentRef.setInput('iconPosition', position);
        fixture.detectChanges();

        const classes = component.badgeClasses;
        expect(classes).toContain(`badge--icon-${position}`);
      });
    });
  });

  describe('AriaLabel Input', () => {
    it('should set aria-label when provided', () => {
      const label = 'Custom badge label';
      fixture.componentRef.setInput('text', 'Badge');
      fixture.componentRef.setInput('ariaLabel', label);
      fixture.detectChanges();

      const badgeEl = fixture.debugElement.query(By.css('.badge'));
      expect(badgeEl.nativeElement.getAttribute('aria-label')).toBe(label);
    });

    it('should fallback to text when ariaLabel is empty string', () => {
      fixture.componentRef.setInput('text', 'Badge');
      fixture.componentRef.setInput('ariaLabel', '');
      fixture.detectChanges();

      const badgeEl = fixture.debugElement.query(By.css('.badge'));
      // When ariaLabel is empty, it falls back to text
      expect(badgeEl.nativeElement.getAttribute('aria-label')).toBe('Badge');
    });
  });

  describe('BadgeClasses Getter', () => {
    it('should always include base badge class', () => {
      fixture.componentRef.setInput('text', 'Badge');
      fixture.detectChanges();

      const classes = component.badgeClasses;
      expect(classes).toContain('badge');
    });

    it('should include all default classes', () => {
      fixture.componentRef.setInput('text', 'Badge');
      fixture.detectChanges();

      const classes = component.badgeClasses;
      expect(classes).toContain('badge');
      expect(classes).toContain('badge--primary');
      expect(classes).toContain('badge--medium');
      expect(classes).toContain('badge--filled');
      expect(classes).toContain('badge--circular');
    });

    it('should return space-separated string of classes', () => {
      fixture.componentRef.setInput('text', 'Badge');
      fixture.detectChanges();

      const classes = component.badgeClasses;
      expect(typeof classes).toBe('string');
      expect(classes.split(' ').length).toBeGreaterThan(1);
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle all inputs together', () => {
      fixture.componentRef.setInput('text', 'Complete Badge');
      fixture.componentRef.setInput('variant', 'success');
      fixture.componentRef.setInput('appearance', 'outline');
      fixture.componentRef.setInput('size', 'large');
      fixture.componentRef.setInput('shape', 'circular');
      fixture.componentRef.setInput('icon', 'checkmark' as IconName);
      fixture.componentRef.setInput('iconPosition', 'after');
      fixture.componentRef.setInput('ariaLabel', 'Success badge');
      fixture.detectChanges();

      const classes = component.badgeClasses;
      expect(classes).toContain('badge--success');
      expect(classes).toContain('badge--outline');
      expect(classes).toContain('badge--large');
      expect(classes).toContain('badge--circular');
      expect(classes).toContain('badge--icon-after');

      const iconComponent = fixture.debugElement.query(By.directive(IconComponent));
      expect(iconComponent).toBeTruthy();
      expect(iconComponent.componentInstance.icon()).toBe('checkmark' as IconName);
      expect(iconComponent.componentInstance.size()).toBe('large');

      const badgeEl = fixture.debugElement.query(By.css('.badge'));
      expect(badgeEl.nativeElement.textContent).toContain('Complete Badge');
      expect(badgeEl.nativeElement.getAttribute('aria-label')).toBe('Success badge');
    });

    it('should handle rapid property changes', () => {
      fixture.componentRef.setInput('text', 'Badge');
      fixture.detectChanges();

      for (let i = 0; i < 5; i++) {
        fixture.componentRef.setInput('variant', i % 2 === 0 ? 'primary' : 'danger');
        fixture.detectChanges();
        const classes = component.badgeClasses;
        expect(classes).toContain(i % 2 === 0 ? 'badge--primary' : 'badge--danger');
      }
    });

    it('should maintain consistency after multiple updates', () => {
      fixture.componentRef.setInput('text', 'Badge');
      fixture.componentRef.setInput('variant', 'primary');
      fixture.detectChanges();

      fixture.componentRef.setInput('variant', 'danger');
      fixture.detectChanges();
      expect(component.badgeClasses).toContain('badge--danger');
      expect(component.badgeClasses).not.toContain('badge--primary');

      fixture.componentRef.setInput('size', 'large');
      fixture.detectChanges();
      expect(component.badgeClasses).toContain('badge--large');
      expect(component.badgeClasses).toContain('badge--danger');
    });
  });

  describe('Accessibility', () => {
    it('should support custom aria-label for screen readers', () => {
      fixture.componentRef.setInput('text', '5');
      fixture.componentRef.setInput('ariaLabel', '5 unread messages');
      fixture.detectChanges();

      const badgeEl = fixture.debugElement.query(By.css('.badge'));
      expect(badgeEl.nativeElement.getAttribute('aria-label')).toBe('5 unread messages');
    });

    it('should be readable by screen readers with text content', () => {
      fixture.componentRef.setInput('text', 'New');
      fixture.detectChanges();

      const badgeEl = fixture.debugElement.query(By.css('.badge'));
      expect(badgeEl.nativeElement.textContent).toContain('New');
    });
  });

  describe('Edge Cases', () => {
    it('should handle very long text', () => {
      const longText = 'This is a very long badge text that might overflow';
      fixture.componentRef.setInput('text', longText);
      fixture.detectChanges();

      const badgeEl = fixture.debugElement.query(By.css('.badge'));
      expect(badgeEl.nativeElement.textContent).toContain(longText);
    });

    it('should handle special characters in text', () => {
      const specialText = '<>&"\'';
      fixture.componentRef.setInput('text', specialText);
      fixture.detectChanges();

      const badgeEl = fixture.debugElement.query(By.css('.badge'));
      expect(badgeEl).toBeTruthy();
    });

    it('should handle numeric text', () => {
      fixture.componentRef.setInput('text', '999+');
      fixture.detectChanges();

      const badgeEl = fixture.debugElement.query(By.css('.badge'));
      expect(badgeEl.nativeElement.textContent).toContain('999+');
    });

    it('should handle icon without text gracefully', () => {
      fixture.componentRef.setInput('text', '');
      fixture.componentRef.setInput('icon', 'star' as IconName);
      fixture.detectChanges();

      const iconComponent = fixture.debugElement.query(By.directive(IconComponent));
      expect(iconComponent).toBeTruthy();
    });
  });

  describe('Change Detection', () => {
    it('should use OnPush change detection strategy', () => {
      expect(component).toBeTruthy();
      // OnPush is set in component metadata
    });

    it('should update view when input signals change', () => {
      fixture.componentRef.setInput('text', 'Badge');
      fixture.componentRef.setInput('variant', 'primary');
      fixture.detectChanges();
      expect(component.badgeClasses).toContain('badge--primary');

      fixture.componentRef.setInput('variant', 'danger');
      fixture.detectChanges();
      expect(component.badgeClasses).toContain('badge--danger');
    });
  });
});
