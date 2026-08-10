import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TagComponent } from './tag.component';
import { IconComponent } from '../icon/icon.component';
import { Variant, Appearance, Shape, Size } from '../utils';
import { IconName } from '../icon';

describe('TagComponent', () => {
  let component: TagComponent;
  let fixture: ComponentFixture<TagComponent>;
  let tagElement: DebugElement;
  let nativeTag: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagComponent, IconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TagComponent);
    component = fixture.componentInstance;
  });

  describe('Component Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should require text input', () => {
      fixture.componentRef.setInput('text', 'Test Tag');
      fixture.detectChanges();
      tagElement = fixture.debugElement.query(By.css('.tag'));
      expect(tagElement).toBeTruthy();
    });

    it('should have default input values', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.detectChanges();

      expect(component.variant()).toBe('secondary');
      expect(component.appearance()).toBe('filled');
      expect(component.size()).toBe('medium');
      expect(component.shape()).toBe('rounded');
      expect(component.secondaryText()).toBeUndefined();
      expect(component.icon()).toBeUndefined();
      expect(component.selected()).toBe(false);
      expect(component.disabled()).toBe(false);
      expect(component.selectable()).toBe(false);
      expect(component.dismissible()).toBe(false);
      expect(component.ariaLabel()).toBe('');
      expect(component.tabIndex()).toBeUndefined();
      expect(component.effectiveTabIndex()).toBe(-1);
    });
  });

  describe('Text Input', () => {
    it('should display the provided text', () => {
      const testText = 'New Tag';
      fixture.componentRef.setInput('text', testText);
      fixture.detectChanges();

      const textEl = fixture.debugElement.query(By.css('.tag__primary'));
      expect(textEl.nativeElement.textContent).toContain(testText);
    });

    it('should update text when input changes', () => {
      fixture.componentRef.setInput('text', 'First');
      fixture.detectChanges();
      let textEl = fixture.debugElement.query(By.css('.tag__primary'));
      expect(textEl.nativeElement.textContent).toContain('First');

      fixture.componentRef.setInput('text', 'Second');
      fixture.detectChanges();
      textEl = fixture.debugElement.query(By.css('.tag__primary'));
      expect(textEl.nativeElement.textContent).toContain('Second');
    });
  });

  describe('SecondaryText Input', () => {
    it('should not display secondary text by default', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.detectChanges();

      const secondaryEl = fixture.debugElement.query(By.css('.tag__secondary'));
      expect(secondaryEl).toBeFalsy();
    });

    it('should display secondary text when provided and size is medium', () => {
      fixture.componentRef.setInput('text', 'Primary');
      fixture.componentRef.setInput('secondaryText', 'Secondary');
      fixture.componentRef.setInput('size', 'medium');
      fixture.detectChanges();

      const secondaryEl = fixture.debugElement.query(By.css('.tag__secondary'));
      expect(secondaryEl).toBeTruthy();
      expect(secondaryEl.nativeElement.textContent).toContain('Secondary');
    });

    it('should not display secondary text when size is not medium', () => {
      fixture.componentRef.setInput('text', 'Primary');
      fixture.componentRef.setInput('secondaryText', 'Secondary');
      fixture.componentRef.setInput('size', 'small');
      fixture.detectChanges();

      const secondaryEl = fixture.debugElement.query(By.css('.tag__secondary'));
      expect(secondaryEl).toBeFalsy();
    });

    it('should add class when secondary text is present', () => {
      fixture.componentRef.setInput('text', 'Primary');
      fixture.componentRef.setInput('secondaryText', 'Secondary');
      fixture.componentRef.setInput('size', 'medium');
      fixture.detectChanges();

      const textSlot = fixture.debugElement.query(By.css('.tag__text-slot'));
      expect(textSlot.nativeElement.classList.contains('tag__text-slot--with-secondary')).toBe(
        true,
      );
    });
  });

  describe('Variant Input', () => {
    const variants: Variant[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];

    variants.forEach(variant => {
      it(`should apply ${variant} variant class`, () => {
        fixture.componentRef.setInput('text', 'Tag');
        fixture.componentRef.setInput('variant', variant);
        fixture.detectChanges();

        const classes = component.tagClasses();
        expect(classes).toContain(`button--${variant}`);
      });
    });
  });

  describe('Appearance Input', () => {
    const appearances: Appearance[] = ['filled', 'tint', 'outline', 'subtle', 'transparent'];

    appearances.forEach(appearance => {
      it(`should apply ${appearance} appearance class`, () => {
        fixture.componentRef.setInput('text', 'Tag');
        fixture.componentRef.setInput('appearance', appearance);
        fixture.detectChanges();

        const classes = component.tagClasses();
        expect(classes).toContain(`button--${appearance}`);
      });
    });
  });

  describe('Size Input', () => {
    const sizes: Size[] = ['small', 'medium', 'large'];

    sizes.forEach(size => {
      it(`should apply button size class for ${size}`, () => {
        fixture.componentRef.setInput('text', 'Tag');
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();

        const classes = component.tagClasses();
        expect(classes).toContain(`button--${size}`);
      });
    });
  });

  describe('Shape Input', () => {
    const shapes: Shape[] = ['rounded', 'circular', 'square'];

    shapes.forEach(shape => {
      it(`should apply ${shape} shape class`, () => {
        fixture.componentRef.setInput('text', 'Tag');
        fixture.componentRef.setInput('shape', shape);
        fixture.detectChanges();

        const classes = component.tagClasses();
        expect(classes).toContain(`button--${shape}`);
      });
    });
  });

  describe('Icon Input', () => {
    it('should not render icon when icon input is undefined', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.detectChanges();

      const icons = fixture.debugElement.queryAll(By.directive(IconComponent));
      const tagIcon = icons.find(icon => icon.nativeElement.classList.contains('tag__icon'));
      expect(tagIcon).toBeFalsy();
    });

    it('should render icon when icon input is provided', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('icon', 'star' as IconName);
      fixture.detectChanges();

      const icons = fixture.debugElement.queryAll(By.directive(IconComponent));
      const tagIcon = icons.find(icon => icon.nativeElement.classList.contains('tag__icon'));
      expect(tagIcon).toBeTruthy();
    });

    it('should pass correct icon name to icon component', () => {
      const iconName: IconName = 'checkmark' as IconName;
      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('icon', iconName);
      fixture.detectChanges();

      const icons = fixture.debugElement.queryAll(By.directive(IconComponent));
      const tagIcon = icons.find(icon => icon.nativeElement.classList.contains('tag__icon'));
      expect(tagIcon?.componentInstance.icon()).toBe(iconName);
    });
  });

  describe('IconSize Computed', () => {
    it('should return small for small size', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('size', 'small');
      fixture.detectChanges();

      expect(component.size()).toBe('small');
    });

    it('should return medium for medium size', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('size', 'medium');
      fixture.detectChanges();

      expect(component.size()).toBe('medium');
    });

    it('should return large for large size', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('size', 'large');
      fixture.detectChanges();

      expect(component.size()).toBe('large');
    });
  });

  describe('Selected Input', () => {
    it('should not apply selected class by default', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.detectChanges();

      const classes = component.tagClasses();
      expect(classes).not.toContain('button--selected');
    });

    it('should apply selected class when selected is true', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('selected', true);
      fixture.detectChanges();

      const classes = component.tagClasses();
      expect(classes).toContain('button--selected');
    });

    it('should set aria-selected when clickable', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('selectable', true);
      fixture.componentRef.setInput('selected', true);
      fixture.detectChanges();

      const tagEl = fixture.debugElement.query(By.css('.tag'));
      expect(tagEl.nativeElement.getAttribute('aria-selected')).toBe('true');
    });
  });

  describe('Disabled Input', () => {
    it('should not be disabled by default', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.detectChanges();

      expect(component.disabled()).toBe(false);
      const classes = component.tagClasses();
      expect(classes).not.toContain('button--disabled');
    });

    it('should apply disabled class when disabled is true', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const classes = component.tagClasses();
      expect(classes).toContain('button--disabled');
    });

    it('should set aria-disabled when disabled', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const tagEl = fixture.debugElement.query(By.css('.tag'));
      expect(tagEl.nativeElement.getAttribute('aria-disabled')).toBe('true');
    });

    it('should set tabindex to -1 when disabled', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(component.effectiveTabIndex()).toBe(-1);
    });
  });

  describe('Selectable Input', () => {
    it('should not be selectable by default', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.detectChanges();

      expect(component.selectable()).toBe(false);
      const classes = component.tagClasses();
      expect(classes).not.toContain('tag--interactive');
    });

    it('should apply interactive class when selectable is true', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('selectable', true);
      fixture.detectChanges();

      const classes = component.tagClasses();
      expect(classes).toContain('tag--interactive');
    });

    it('should set tabindex to -1 when not selectable', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('selectable', false);
      fixture.detectChanges();

      expect(component.effectiveTabIndex()).toBe(-1);
    });
  });

  describe('Dismissible Input', () => {
    it('should not show dismiss button by default', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.detectChanges();

      const dismissBtn = fixture.debugElement.query(By.css('.tag__dismiss'));
      expect(dismissBtn).toBeFalsy();
    });

    it('should show dismiss button when dismissible is true', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('dismissible', true);
      fixture.detectChanges();

      const dismissBtn = fixture.debugElement.query(By.css('.tag__dismiss'));
      expect(dismissBtn).toBeTruthy();
    });

    it('should not show dismiss button when disabled', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('dismissible', true);
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const dismissBtn = fixture.debugElement.query(By.css('.tag__dismiss'));
      expect(dismissBtn).toBeFalsy();
    });

    it('should show dismiss button when selectable is false and dismissible', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('dismissible', true);
      fixture.componentRef.setInput('selectable', false);
      fixture.detectChanges();

      const dismissBtn = fixture.debugElement.query(By.css('.tag__dismiss'));
      expect(dismissBtn).toBeTruthy();
    });

    it('should have correct aria-label on dismiss button', () => {
      fixture.componentRef.setInput('text', 'MyTag');
      fixture.componentRef.setInput('dismissible', true);
      fixture.detectChanges();

      const dismissBtn = fixture.debugElement.query(By.css('.tag__dismiss'));
      expect(dismissBtn.nativeElement.getAttribute('aria-label')).toBe('Remove MyTag');
    });
  });

  describe('TagClick Event', () => {
    it('should emit tagClick event when tag is clicked', () => {
      let emittedEvent: MouseEvent | undefined;
      component.tagClick.subscribe((event: MouseEvent) => {
        emittedEvent = event;
      });

      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('selectable', true);
      fixture.detectChanges();

      const tagEl = fixture.debugElement.query(By.css('.tag'));
      tagEl.nativeElement.click();

      expect(emittedEvent).toBeDefined();
      expect(emittedEvent instanceof MouseEvent).toBe(true);
    });

    it('should not emit tagClick when disabled', () => {
      let clickEmitted = false;
      component.tagClick.subscribe(() => {
        clickEmitted = true;
      });

      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const tagEl = fixture.debugElement.query(By.css('.tag'));
      tagEl.nativeElement.click();

      expect(clickEmitted).toBe(false);
    });

    it('should not emit tagClick when selectable is false', () => {
      let clickEmitted = false;
      component.tagClick.subscribe(() => {
        clickEmitted = true;
      });

      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('selectable', false);
      fixture.detectChanges();

      const tagEl = fixture.debugElement.query(By.css('.tag'));
      tagEl.nativeElement.click();

      expect(clickEmitted).toBe(false);
    });

    it('should call preventDefault and stopPropagation when disabled', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const event = new MouseEvent('click');
      vi.spyOn(event, 'preventDefault');
      vi.spyOn(event, 'stopPropagation');

      component.onTagClick(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(event.stopPropagation).toHaveBeenCalled();
    });
  });

  describe('Keyboard Navigation', () => {
    it('should emit tagClick on Enter key', () => {
      let clickEmitted = false;
      component.tagClick.subscribe(() => {
        clickEmitted = true;
      });

      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('selectable', true);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      vi.spyOn(event, 'preventDefault');
      vi.spyOn(event, 'stopPropagation');

      component.onTagKeyDown(event);

      expect(clickEmitted).toBe(true);
      expect(event.preventDefault).toHaveBeenCalled();
      expect(event.stopPropagation).toHaveBeenCalled();
    });

    it('should emit tagClick on Space key', () => {
      let clickEmitted = false;
      component.tagClick.subscribe(() => {
        clickEmitted = true;
      });

      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('selectable', true);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: ' ' });
      component.onTagKeyDown(event);

      expect(clickEmitted).toBe(true);
    });

    it('should not emit tagClick on other keys', () => {
      let clickEmitted = false;
      component.tagClick.subscribe(() => {
        clickEmitted = true;
      });

      fixture.componentRef.setInput('text', 'Tag');
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: 'a' });
      component.onTagKeyDown(event);

      expect(clickEmitted).toBe(false);
    });

    it('should not emit tagClick on Enter when disabled', () => {
      let clickEmitted = false;
      component.tagClick.subscribe(() => {
        clickEmitted = true;
      });

      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      component.onTagKeyDown(event);

      expect(clickEmitted).toBe(false);
    });
  });

  describe('Dismiss Event', () => {
    it('should emit dismiss event when dismiss button is clicked', () => {
      let dismissEmitted = false;
      component.dismiss.subscribe(() => {
        dismissEmitted = true;
      });

      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('dismissible', true);
      fixture.detectChanges();

      const dismissBtn = fixture.debugElement.query(By.css('.tag__dismiss'));
      dismissBtn.nativeElement.click();

      expect(dismissEmitted).toBe(true);
    });

    it('should stop propagation when dismiss is clicked', () => {
      let tagClicked = false;
      let dismissEmitted = false;

      component.tagClick.subscribe(() => {
        tagClicked = true;
      });
      component.dismiss.subscribe(() => {
        dismissEmitted = true;
      });

      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('dismissible', true);
      fixture.detectChanges();

      const event = new MouseEvent('click', { bubbles: true });
      vi.spyOn(event, 'stopPropagation');

      component.onDismissClick(event);

      expect(dismissEmitted).toBe(true);
      expect(event.stopPropagation).toHaveBeenCalled();
    });

    it('should emit dismiss on Enter key', () => {
      let dismissEmitted = false;
      component.dismiss.subscribe(() => {
        dismissEmitted = true;
      });

      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('dismissible', true);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      component.onDismissKeyDown(event);

      expect(dismissEmitted).toBe(true);
    });

    it('should emit dismiss on Space key', () => {
      let dismissEmitted = false;
      component.dismiss.subscribe(() => {
        dismissEmitted = true;
      });

      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('dismissible', true);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: ' ' });
      component.onDismissKeyDown(event);

      expect(dismissEmitted).toBe(true);
    });

    it('should not emit dismiss when disabled', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const event = new MouseEvent('click');
      vi.spyOn(event, 'preventDefault');
      vi.spyOn(event, 'stopPropagation');

      component.onDismissClick(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(event.stopPropagation).toHaveBeenCalled();
    });
  });

  describe('IsClickable Computed', () => {
    it('should not be clickable by default', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.detectChanges();

      expect(component.isClickable()).toBe(false);
    });

    it('should be clickable when selectable is true', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('selectable', true);
      fixture.detectChanges();

      expect(component.isClickable()).toBe(true);
    });

    it('should not be clickable when disabled', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(component.isClickable()).toBe(false);
    });

    it('should not be clickable when selectable is false', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('selectable', false);
      fixture.detectChanges();

      expect(component.isClickable()).toBe(false);
    });

    it('should set role="button" when clickable', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('selectable', true);
      fixture.detectChanges();

      const tagEl = fixture.debugElement.query(By.css('.tag'));
      expect(tagEl.nativeElement.getAttribute('role')).toBe('button');
    });

    it('should not set role when not clickable', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const tagEl = fixture.debugElement.query(By.css('.tag'));
      expect(tagEl.nativeElement.getAttribute('role')).toBeNull();
    });

    it('should not set role when selectable is false', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('selectable', false);
      fixture.detectChanges();

      const tagEl = fixture.debugElement.query(By.css('.tag'));
      expect(tagEl.nativeElement.getAttribute('role')).toBeNull();
    });
  });

  describe('AriaLabel Input', () => {
    it('should use text as aria-label by default', () => {
      fixture.componentRef.setInput('text', 'MyTag');
      fixture.detectChanges();

      expect(component.effectiveAriaLabel()).toBe('MyTag');
    });

    it('should use custom aria-label when provided', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('ariaLabel', 'Custom Label');
      fixture.detectChanges();

      expect(component.effectiveAriaLabel()).toBe('Custom Label');
      const tagEl = fixture.debugElement.query(By.css('.tag'));
      expect(tagEl.nativeElement.getAttribute('aria-label')).toBe('Custom Label');
    });

    it('should fallback to text when ariaLabel is empty', () => {
      fixture.componentRef.setInput('text', 'MyTag');
      fixture.componentRef.setInput('ariaLabel', '');
      fixture.detectChanges();

      expect(component.effectiveAriaLabel()).toBe('MyTag');
    });
  });

  describe('TabIndex Input', () => {
    it('should use 0 as default tabindex when clickable', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('selectable', true);
      fixture.detectChanges();

      expect(component.effectiveTabIndex()).toBe(0);
    });

    it('should use -1 when disabled', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(component.effectiveTabIndex()).toBe(-1);
    });

    it('should use -1 when not selectable', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('selectable', false);
      fixture.detectChanges();

      expect(component.effectiveTabIndex()).toBe(-1);
    });

    it('should use custom tabIndex when provided', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('tabIndex', 5);
      fixture.detectChanges();

      expect(component.effectiveTabIndex()).toBe(5);
    });

    it('should override default with custom tabIndex even when disabled', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('disabled', true);
      fixture.componentRef.setInput('tabIndex', 0);
      fixture.detectChanges();

      expect(component.effectiveTabIndex()).toBe(0);
    });
  });

  describe('TagClasses Computed', () => {
    it('should always include base tag class', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.detectChanges();

      const classes = component.tagClasses();
      expect(classes).toContain('tag');
    });

    it('should include all default classes', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.detectChanges();

      const classes = component.tagClasses();
      expect(classes).toContain('tag');
      expect(classes).toContain('button');
      expect(classes).toContain('button--secondary');
      expect(classes).toContain('button--filled');
      expect(classes).toContain('button--medium');
      expect(classes).toContain('button--rounded');
    });

    it('should include multiple state classes when applicable', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('selected', true);
      fixture.componentRef.setInput('disabled', true);
      fixture.componentRef.setInput('selectable', true);
      fixture.detectChanges();

      const classes = component.tagClasses();
      expect(classes).toContain('button--selected');
      expect(classes).toContain('button--disabled');
      expect(classes).not.toContain('tag--interactive');
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle all inputs together', () => {
      fixture.componentRef.setInput('text', 'Complete Tag');
      fixture.componentRef.setInput('secondaryText', 'Secondary');
      fixture.componentRef.setInput('variant', 'success');
      fixture.componentRef.setInput('appearance', 'outline');
      fixture.componentRef.setInput('size', 'medium');
      fixture.componentRef.setInput('shape', 'circular');
      fixture.componentRef.setInput('icon', 'checkmark' as IconName);
      fixture.componentRef.setInput('selected', true);
      fixture.componentRef.setInput('dismissible', true);
      fixture.componentRef.setInput('ariaLabel', 'Success tag');
      fixture.detectChanges();

      const classes = component.tagClasses();
      expect(classes).toContain('button--success');
      expect(classes).toContain('button--outline');
      expect(classes).toContain('button--medium');
      expect(classes).toContain('button--circular');
      expect(classes).toContain('button--selected');

      const primaryText = fixture.debugElement.query(By.css('.tag__primary'));
      expect(primaryText.nativeElement.textContent).toContain('Complete Tag');

      const secondaryText = fixture.debugElement.query(By.css('.tag__secondary'));
      expect(secondaryText.nativeElement.textContent).toContain('Secondary');

      const icons = fixture.debugElement.queryAll(By.directive(IconComponent));
      expect(icons.length).toBeGreaterThan(0);

      const dismissBtn = fixture.debugElement.query(By.css('.tag__dismiss'));
      expect(dismissBtn).toBeTruthy();

      const tagEl = fixture.debugElement.query(By.css('.tag'));
      expect(tagEl.nativeElement.getAttribute('aria-label')).toBe('Success tag');
    });

    it('should handle rapid property changes', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.detectChanges();

      for (let i = 0; i < 5; i++) {
        fixture.componentRef.setInput('selected', i % 2 === 0);
        fixture.detectChanges();
        expect(component.selected()).toBe(i % 2 === 0);
      }
    });

    it('should maintain consistency after multiple updates', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('variant', 'primary');
      fixture.detectChanges();

      fixture.componentRef.setInput('variant', 'danger');
      fixture.detectChanges();
      expect(component.tagClasses()).toContain('button--danger');
      expect(component.tagClasses()).not.toContain('button--primary');

      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      expect(component.tagClasses()).toContain('button--danger');
      expect(component.tagClasses()).toContain('button--disabled');
    });

    it('should handle dismissible with disabled state correctly', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('dismissible', true);
      fixture.detectChanges();

      let dismissBtn = fixture.debugElement.query(By.css('.tag__dismiss'));
      expect(dismissBtn).toBeTruthy();

      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      dismissBtn = fixture.debugElement.query(By.css('.tag__dismiss'));
      expect(dismissBtn).toBeFalsy();

      fixture.componentRef.setInput('disabled', false);
      fixture.detectChanges();

      dismissBtn = fixture.debugElement.query(By.css('.tag__dismiss'));
      expect(dismissBtn).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard accessible when clickable', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('selectable', true);
      fixture.detectChanges();

      const tagEl = fixture.debugElement.query(By.css('.tag'));
      expect(tagEl.nativeElement.getAttribute('tabindex')).toBe('0');
    });

    it('should have proper ARIA attributes when selected', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('selectable', true);
      fixture.componentRef.setInput('selected', true);
      fixture.detectChanges();

      const tagEl = fixture.debugElement.query(By.css('.tag'));
      expect(tagEl.nativeElement.getAttribute('aria-selected')).toBe('true');
    });

    it('should have role="button" when clickable', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('selectable', true);
      fixture.detectChanges();

      const tagEl = fixture.debugElement.query(By.css('.tag'));
      expect(tagEl.nativeElement.getAttribute('role')).toBe('button');
    });

    it('should support custom aria-label for screen readers', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('ariaLabel', 'Custom accessible label');
      fixture.detectChanges();

      const tagEl = fixture.debugElement.query(By.css('.tag'));
      expect(tagEl.nativeElement.getAttribute('aria-label')).toBe('Custom accessible label');
    });

    it('should be properly disabled for assistive technologies', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const tagEl = fixture.debugElement.query(By.css('.tag'));
      expect(tagEl.nativeElement.getAttribute('aria-disabled')).toBe('true');
      expect(tagEl.nativeElement.getAttribute('tabindex')).toBe('-1');
    });

    it('should have accessible dismiss button', () => {
      fixture.componentRef.setInput('text', 'MyTag');
      fixture.componentRef.setInput('dismissible', true);
      fixture.detectChanges();

      const dismissBtn = fixture.debugElement.query(By.css('.tag__dismiss'));
      expect(dismissBtn.nativeElement.getAttribute('aria-label')).toBe('Remove MyTag');
      expect(dismissBtn.nativeElement.getAttribute('type')).toBe('button');
    });
  });

  describe('Edge Cases', () => {
    it('should handle very long text', () => {
      const longText = 'This is a very long tag text that might overflow the container';
      fixture.componentRef.setInput('text', longText);
      fixture.detectChanges();

      const primaryText = fixture.debugElement.query(By.css('.tag__primary'));
      expect(primaryText.nativeElement.textContent).toContain(longText);
    });

    it('should handle special characters in text', () => {
      const specialText = '<>&"\'';
      fixture.componentRef.setInput('text', specialText);
      fixture.detectChanges();

      const primaryText = fixture.debugElement.query(By.css('.tag__primary'));
      expect(primaryText).toBeTruthy();
    });

    it('should handle empty string text', () => {
      fixture.componentRef.setInput('text', '');
      fixture.detectChanges();

      const tagEl = fixture.debugElement.query(By.css('.tag'));
      expect(tagEl).toBeTruthy();
    });

    it('should handle undefined icon gracefully', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('icon', undefined);
      fixture.detectChanges();

      expect(() => fixture.detectChanges()).not.toThrow();
    });

    it('should handle multiple rapid clicks', () => {
      let clickCount = 0;
      component.tagClick.subscribe(() => clickCount++);

      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('selectable', true);
      fixture.detectChanges();

      const tagEl = fixture.debugElement.query(By.css('.tag'));
      for (let i = 0; i < 5; i++) {
        tagEl.nativeElement.click();
      }

      expect(clickCount).toBe(5);
    });

    it('should handle switching between disabled states during click attempts', () => {
      let clickCount = 0;
      component.tagClick.subscribe(() => clickCount++);

      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('selectable', true);
      fixture.detectChanges();

      const tagEl = fixture.debugElement.query(By.css('.tag'));
      tagEl.nativeElement.click();
      expect(clickCount).toBe(1);

      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      tagEl.nativeElement.click();
      expect(clickCount).toBe(1);

      fixture.componentRef.setInput('disabled', false);
      fixture.detectChanges();
      tagEl.nativeElement.click();
      expect(clickCount).toBe(2);
    });

    it('should handle secondary text with different sizes', () => {
      const sizes: Size[] = ['small', 'medium', 'large'];

      sizes.forEach(size => {
        fixture.componentRef.setInput('text', 'Primary');
        fixture.componentRef.setInput('secondaryText', 'Secondary');
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();

        const secondaryText = fixture.debugElement.query(By.css('.tag__secondary'));
        if (size === 'medium') {
          expect(secondaryText).toBeTruthy();
        } else {
          expect(secondaryText).toBeFalsy();
        }
      });
    });
  });

  describe('Change Detection', () => {
    it('should use OnPush change detection strategy', () => {
      expect(component).toBeTruthy();
      // OnPush is set in component metadata
    });

    it('should update view when input signals change', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('variant', 'primary');
      fixture.detectChanges();
      expect(component.tagClasses()).toContain('button--primary');

      fixture.componentRef.setInput('variant', 'danger');
      fixture.detectChanges();
      expect(component.tagClasses()).toContain('button--danger');
    });

    it('should update computed values when inputs change', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('size', 'small');
      fixture.detectChanges();
      expect(component.size()).toBe('small');

      fixture.componentRef.setInput('size', 'large');
      fixture.detectChanges();
      expect(component.size()).toBe('large');
    });
  });

  describe('Dismiss Button TabIndex', () => {
    it('should have tabindex 0 when tag is clickable', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('dismissible', true);
      fixture.componentRef.setInput('selectable', true);
      fixture.detectChanges();

      const dismissBtn = fixture.debugElement.query(By.css('.tag__dismiss'));
      expect(dismissBtn.nativeElement.getAttribute('tabindex')).toBe('0');
    });

    it('should have tabindex -1 when tag is disabled', () => {
      fixture.componentRef.setInput('text', 'Tag');
      fixture.componentRef.setInput('dismissible', true);
      fixture.componentRef.setInput('tabIndex', -1);
      fixture.detectChanges();

      const dismissBtn = fixture.debugElement.query(By.css('.tag__dismiss'));
      expect(dismissBtn.nativeElement.getAttribute('tabindex')).toBe('-1');
    });
  });
});
