import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TemplateRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AccordionComponent } from './accordion.component';
import { TreeNodeComponent } from '../tree-node/tree-node.component';
import { IconComponent } from '../icon/icon.component';
import { ChevronPosition, Size } from '../utils';
import { IconName } from '../icon';

describe('AccordionComponent', () => {
  let component: AccordionComponent;
  let fixture: ComponentFixture<AccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionComponent, TreeNodeComponent, IconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccordionComponent);
    component = fixture.componentInstance;
  });

  describe('Component Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should require label input', () => {
      fixture.componentRef.setInput('label', 'Test Accordion');
      fixture.detectChanges();
      const accordionEl = fixture.debugElement.query(By.css('.accordion'));
      expect(accordionEl).toBeTruthy();
    });

    it('should have default input values', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      fixture.detectChanges();

      expect(component.size()).toBe('medium');
      expect(component.chevronPosition()).toBe('before');
      expect(component.disabled()).toBe(false);
      expect(component.expanded()).toBe(false);
      expect(component.icon()).toBeUndefined();
      expect(component.showSelectionIndicator()).toBe(false);
      expect(component.indicatorPosition()).toBe('vertical');
      expect(component.appearance()).toBe('subtle');
      expect(component.shape()).toBe('rounded');
      expect(component.showQuickActions()).toBe(false);
    });

    it('should be collapsed by default', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      fixture.detectChanges();

      expect(component.expanded()).toBe(false);
      const panel = fixture.debugElement.query(By.css('.accordion__panel'));
      expect(panel).toBeTruthy();
      expect(panel.nativeElement.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('Label Input', () => {
    it('should display the provided label', () => {
      fixture.componentRef.setInput('label', 'My Accordion');
      fixture.detectChanges();

      const treeNode = fixture.debugElement.query(By.directive(TreeNodeComponent));
      expect(treeNode.componentInstance.node().label).toBe('My Accordion');
    });

    it('should update label when input changes', () => {
      fixture.componentRef.setInput('label', 'First Label');
      fixture.detectChanges();
      let treeNode = fixture.debugElement.query(By.directive(TreeNodeComponent));
      expect(treeNode.componentInstance.node().label).toBe('First Label');

      fixture.componentRef.setInput('label', 'Second Label');
      fixture.detectChanges();
      treeNode = fixture.debugElement.query(By.directive(TreeNodeComponent));
      expect(treeNode.componentInstance.node().label).toBe('Second Label');
    });
  });

  describe('Size Input', () => {
    const sizes: Size[] = ['small', 'medium', 'large'];

    sizes.forEach(size => {
      it(`should apply ${size} size class`, () => {
        fixture.componentRef.setInput('label', 'Accordion');
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();

        const classes = component.accordionClasses();
        expect(classes).toContain(`accordion--${size}`);
      });

      it(`should pass ${size} to tree node`, () => {
        fixture.componentRef.setInput('label', 'Accordion');
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();

        const treeNode = fixture.debugElement.query(By.directive(TreeNodeComponent));
        expect(treeNode.componentInstance.size()).toBe(size);
      });
    });
  });

  describe('ChevronPosition Input', () => {
    const positions: ChevronPosition[] = ['before', 'after'];

    positions.forEach(position => {
      it(`should pass ${position} chevron position to tree node`, () => {
        fixture.componentRef.setInput('label', 'Accordion');
        fixture.componentRef.setInput('chevronPosition', position);
        fixture.detectChanges();

        const treeNode = fixture.debugElement.query(By.directive(TreeNodeComponent));
        expect(treeNode.componentInstance.chevronPosition()).toBe(position);
      });
    });

    it('should use chevron_right when collapsed and position is before', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      fixture.componentRef.setInput('chevronPosition', 'before');
      fixture.detectChanges();

      expect(component.computedChevronIconCollapsed()).toBe('chevron_right');
    });

    it('should use chevron_down when collapsed and position is after', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      fixture.componentRef.setInput('chevronPosition', 'after');
      fixture.detectChanges();

      expect(component.computedChevronIconCollapsed()).toBe('chevron_down');
    });

    it('should use chevron_down when expanded and position is before', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      fixture.componentRef.setInput('chevronPosition', 'before');
      component.expanded.set(true);
      fixture.detectChanges();

      expect(component.computedChevronIconExpanded()).toBe('chevron_down');
    });

    it('should use chevron_up when expanded and position is after', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      fixture.componentRef.setInput('chevronPosition', 'after');
      component.expanded.set(true);
      fixture.detectChanges();

      expect(component.computedChevronIconExpanded()).toBe('chevron_up');
    });
  });

  describe('Custom Chevron Icons', () => {
    it('should use custom collapsed icon when provided', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      fixture.componentRef.setInput('chevronIconCollapsed', 'arrow_right' as IconName);
      fixture.detectChanges();

      expect(component.computedChevronIconCollapsed()).toBe('arrow_right');
    });

    it('should use custom expanded icon when provided', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      fixture.componentRef.setInput('chevronIconExpanded', 'arrow_down' as IconName);
      fixture.detectChanges();

      expect(component.computedChevronIconExpanded()).toBe('arrow_down');
    });

    it('should override default icons with custom ones', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      fixture.componentRef.setInput('chevronPosition', 'before');
      fixture.componentRef.setInput('chevronIconCollapsed', 'add' as IconName);
      fixture.componentRef.setInput('chevronIconExpanded', 'subtract' as IconName);
      fixture.detectChanges();

      expect(component.computedChevronIconCollapsed()).toBe('add');
      expect(component.computedChevronIconExpanded()).toBe('subtract');
    });
  });

  describe('Disabled State', () => {
    it('should apply disabled class when disabled', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const classes = component.accordionClasses();
      expect(classes).toContain('accordion--disabled');
    });

    it('should pass disabled state to tree node', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const treeNode = fixture.debugElement.query(By.directive(TreeNodeComponent));
      expect(treeNode.componentInstance.node().disabled).toBe(true);
    });

    it('should not toggle when disabled', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const mockNode = { ...component.accordionNode(), expanded: true };
      component.onNodeToggle(mockNode);

      expect(component.expanded()).toBe(false);
    });
  });

  describe('Expanded State', () => {
    it('should not apply expanded class when collapsed', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      fixture.detectChanges();

      const classes = component.accordionClasses();
      expect(classes).not.toContain('accordion--expanded');
    });

    it('should apply expanded class when expanded', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      component.expanded.set(true);
      fixture.detectChanges();

      const classes = component.accordionClasses();
      expect(classes).toContain('accordion--expanded');
    });

    it('should show panel when expanded', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      component.expanded.set(true);
      fixture.detectChanges();

      const panel = fixture.debugElement.query(By.css('.accordion__panel'));
      expect(panel).toBeTruthy();
      expect(panel.nativeElement.getAttribute('aria-hidden')).toBe('false');
    });

    it('should hide panel when collapsed', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      component.expanded.set(false);
      fixture.detectChanges();

      const panel = fixture.debugElement.query(By.css('.accordion__panel'));
      expect(panel).toBeTruthy();
      expect(panel.nativeElement.getAttribute('aria-hidden')).toBe('true');
    });

    it('should pass expanded state to tree node', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      component.expanded.set(true);
      fixture.detectChanges();

      const treeNode = fixture.debugElement.query(By.directive(TreeNodeComponent));
      expect(treeNode.componentInstance.node().expanded).toBe(true);
    });
  });

  describe('Icon Input', () => {
    it('should pass icon to tree node when provided', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      fixture.componentRef.setInput('icon', 'folder' as IconName);
      fixture.detectChanges();

      const treeNode = fixture.debugElement.query(By.directive(TreeNodeComponent));
      expect(treeNode.componentInstance.node().icon).toBe('folder');
    });

    it('should not pass icon when not provided', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      fixture.detectChanges();

      const treeNode = fixture.debugElement.query(By.directive(TreeNodeComponent));
      expect(treeNode.componentInstance.node().icon).toBeUndefined();
    });
  });

  describe('Visual Configuration', () => {
    it('should pass showSelectionIndicator to tree node', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      fixture.componentRef.setInput('showSelectionIndicator', true);
      fixture.detectChanges();

      const treeNode = fixture.debugElement.query(By.directive(TreeNodeComponent));
      expect(treeNode.componentInstance.showSelectionIndicator()).toBe(true);
    });

    it('should pass indicatorPosition to tree node', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      fixture.componentRef.setInput('indicatorPosition', 'horizontal');
      fixture.detectChanges();

      const treeNode = fixture.debugElement.query(By.directive(TreeNodeComponent));
      expect(treeNode.componentInstance.indicatorPosition()).toBe('horizontal');
    });

    it('should pass appearance to tree node', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      fixture.componentRef.setInput('appearance', 'filled');
      fixture.detectChanges();

      const treeNode = fixture.debugElement.query(By.directive(TreeNodeComponent));
      expect(treeNode.componentInstance.appearance()).toBe('filled');
    });

    it('should pass shape to tree node', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      fixture.componentRef.setInput('shape', 'circular');
      fixture.detectChanges();

      const treeNode = fixture.debugElement.query(By.directive(TreeNodeComponent));
      expect(treeNode.componentInstance.shape()).toBe('circular');
    });

    it('should pass shape square to tree node', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      fixture.componentRef.setInput('shape', 'square');
      fixture.detectChanges();

      const treeNode = fixture.debugElement.query(By.directive(TreeNodeComponent));
      expect(treeNode.componentInstance.shape()).toBe('square');
    });
  });

  describe('Toggle Event', () => {
    it('should emit toggle event when node is toggled', () => {
      let emittedValue: boolean | undefined;
      component.toggle.subscribe((value: boolean) => {
        emittedValue = value;
      });

      fixture.componentRef.setInput('label', 'Accordion');
      fixture.detectChanges();

      const mockNode = { ...component.accordionNode(), expanded: true };
      component.onNodeToggle(mockNode);

      expect(emittedValue).toBe(true);
    });

    it('should update expanded state when toggled', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      fixture.detectChanges();

      expect(component.expanded()).toBe(false);

      const mockNode = { ...component.accordionNode(), expanded: true };
      component.onNodeToggle(mockNode);

      expect(component.expanded()).toBe(true);
    });

    it('should toggle from collapsed to expanded', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      fixture.detectChanges();

      const mockNode = { ...component.accordionNode(), expanded: true };
      component.onNodeToggle(mockNode);
      fixture.detectChanges(); // Need to detect changes after toggle

      expect(component.expanded()).toBe(true);
      const panel = fixture.debugElement.query(By.css('.accordion__panel'));
      expect(panel).toBeTruthy();
      expect(panel.nativeElement.getAttribute('aria-hidden')).toBe('false');
    });

    it('should toggle from expanded to collapsed', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      component.expanded.set(true);
      fixture.detectChanges();

      const mockNode = { ...component.accordionNode(), expanded: false };
      component.onNodeToggle(mockNode);

      expect(component.expanded()).toBe(false);
    });

    it('should not emit toggle when disabled', () => {
      let toggleEmitted = false;
      component.toggle.subscribe(() => {
        toggleEmitted = true;
      });

      fixture.componentRef.setInput('label', 'Accordion');
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const mockNode = { ...component.accordionNode(), expanded: true };
      component.onNodeToggle(mockNode);

      expect(toggleEmitted).toBe(false);
    });
  });

  describe('AccordionNode Computed', () => {
    it('should create accordion node with correct properties', () => {
      fixture.componentRef.setInput('label', 'Test Label');
      fixture.componentRef.setInput('icon', 'folder' as IconName);
      fixture.componentRef.setInput('disabled', true);
      component.expanded.set(true);
      fixture.detectChanges();

      const node = component.accordionNode();
      expect(node.id).toBe('accordion-node');
      expect(node.label).toBe('Test Label');
      expect(node.icon).toBe('folder');
      expect(node.disabled).toBe(true);
      expect(node.hasChildren).toBe(true);
      expect(node.expanded).toBe(true);
      expect(node.children).toEqual([]);
    });

    it('should update node when inputs change', () => {
      fixture.componentRef.setInput('label', 'First');
      fixture.detectChanges();
      let node = component.accordionNode();
      expect(node.label).toBe('First');

      fixture.componentRef.setInput('label', 'Second');
      fixture.detectChanges();
      node = component.accordionNode();
      expect(node.label).toBe('Second');
    });

    it('should always have hasChildren set to true', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      fixture.detectChanges();

      const node = component.accordionNode();
      expect(node.hasChildren).toBe(true);
    });
  });

  describe('AccordionClasses Method', () => {
    it('should always include base accordion class', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      fixture.detectChanges();

      const classes = component.accordionClasses();
      expect(classes).toContain('accordion');
    });

    it('should include size class', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      fixture.componentRef.setInput('size', 'large');
      fixture.detectChanges();

      const classes = component.accordionClasses();
      expect(classes).toContain('accordion--large');
    });

    it('should include expanded class when expanded', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      component.expanded.set(true);
      fixture.detectChanges();

      const classes = component.accordionClasses();
      expect(classes).toContain('accordion--expanded');
    });

    it('should include disabled class when disabled', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const classes = component.accordionClasses();
      expect(classes).toContain('accordion--disabled');
    });

    it('should include multiple state classes', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      fixture.componentRef.setInput('disabled', true);
      component.expanded.set(true);
      fixture.detectChanges();

      const classes = component.accordionClasses();
      expect(classes).toContain('accordion--expanded');
      expect(classes).toContain('accordion--disabled');
    });
  });

  describe('TreeNode Configuration', () => {
    it('should configure tree node as button', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      fixture.detectChanges();

      const treeNode = fixture.debugElement.query(By.directive(TreeNodeComponent));
      expect(treeNode.componentInstance.asButton()).toBe(true);
    });

    it('should configure tree node with expandOnClick', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      fixture.detectChanges();

      const treeNode = fixture.debugElement.query(By.directive(TreeNodeComponent));
      expect(treeNode.componentInstance.expandOnClick()).toBe(true);
    });

    it('should configure tree node with selectOnClick false', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      fixture.detectChanges();

      const treeNode = fixture.debugElement.query(By.directive(TreeNodeComponent));
      expect(treeNode.componentInstance.selectOnClick()).toBe(false);
    });
  });

  describe('Quick Actions', () => {
    it('should pass showQuickActions to tree node', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      fixture.componentRef.setInput('showQuickActions', true);
      fixture.detectChanges();

      const treeNode = fixture.debugElement.query(By.directive(TreeNodeComponent));
      expect(treeNode.componentInstance.showQuickActions()).toBe(true);
    });

    it('should pass quickActionsTemplate to tree node', () => {
      const mockTemplate = {} as TemplateRef<any>;
      fixture.componentRef.setInput('label', 'Accordion');
      fixture.componentRef.setInput('quickActionsTemplate', mockTemplate);
      fixture.detectChanges();

      const treeNode = fixture.debugElement.query(By.directive(TreeNodeComponent));
      expect(treeNode.componentInstance.quickActionsTemplate()).toBe(mockTemplate);
    });

    it('should pass null when quickActionsTemplate is not provided', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      fixture.detectChanges();

      const treeNode = fixture.debugElement.query(By.directive(TreeNodeComponent));
      expect(treeNode.componentInstance.quickActionsTemplate()).toBeNull();
    });
  });

  describe('Content Projection', () => {
    it('should project content into panel when expanded', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      component.expanded.set(true);
      fixture.detectChanges();

      const panelContent = fixture.debugElement.query(By.css('.accordion__panel-content'));
      expect(panelContent).toBeTruthy();
    });

    it('should keep panel content mounted when collapsed for animation', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      component.expanded.set(false);
      fixture.detectChanges();

      const panelContent = fixture.debugElement.query(By.css('.accordion__panel-content'));
      expect(panelContent).toBeTruthy();
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle all inputs together', () => {
      fixture.componentRef.setInput('label', 'Complex Accordion');
      fixture.componentRef.setInput('size', 'large');
      fixture.componentRef.setInput('chevronPosition', 'after');
      fixture.componentRef.setInput('disabled', false);
      fixture.componentRef.setInput('icon', 'folder' as IconName);
      fixture.componentRef.setInput('showSelectionIndicator', true);
      fixture.componentRef.setInput('indicatorPosition', 'horizontal');
      fixture.componentRef.setInput('appearance', 'filled');
      fixture.componentRef.setInput('shape', 'circular');
      fixture.componentRef.setInput('showQuickActions', true);
      fixture.componentRef.setInput('chevronIconCollapsed', 'add' as IconName);
      fixture.componentRef.setInput('chevronIconExpanded', 'subtract' as IconName);
      fixture.detectChanges();

      const classes = component.accordionClasses();
      expect(classes).toContain('accordion--large');

      const treeNode = fixture.debugElement.query(By.directive(TreeNodeComponent));
      expect(treeNode.componentInstance.size()).toBe('large');
      expect(treeNode.componentInstance.chevronPosition()).toBe('after');
      expect(treeNode.componentInstance.appearance()).toBe('filled');
      expect(treeNode.componentInstance.shape()).toBe('circular');
      expect(treeNode.componentInstance.showQuickActions()).toBe(true);
    });

    it('should handle rapid toggle changes', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      fixture.detectChanges();

      for (let i = 0; i < 5; i++) {
        const mockNode = { ...component.accordionNode(), expanded: i % 2 === 0 };
        component.onNodeToggle(mockNode);
        expect(component.expanded()).toBe(i % 2 === 0);
      }
    });

    it('should maintain state consistency after multiple updates', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      fixture.detectChanges();

      component.expanded.set(true);
      fixture.detectChanges();
      expect(component.accordionClasses()).toContain('accordion--expanded');

      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      expect(component.accordionClasses()).toContain('accordion--expanded');
      expect(component.accordionClasses()).toContain('accordion--disabled');

      component.expanded.set(false);
      fixture.detectChanges();
      expect(component.accordionClasses()).not.toContain('accordion--expanded');
      expect(component.accordionClasses()).toContain('accordion--disabled');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty label', () => {
      fixture.componentRef.setInput('label', '');
      fixture.detectChanges();

      const treeNode = fixture.debugElement.query(By.directive(TreeNodeComponent));
      expect(treeNode.componentInstance.node().label).toBe('');
    });

    it('should handle very long label', () => {
      const longLabel = 'This is a very long accordion label that might overflow';
      fixture.componentRef.setInput('label', longLabel);
      fixture.detectChanges();

      const treeNode = fixture.debugElement.query(By.directive(TreeNodeComponent));
      expect(treeNode.componentInstance.node().label).toBe(longLabel);
    });

    it('should handle special characters in label', () => {
      const specialLabel = '<>&"\'';
      fixture.componentRef.setInput('label', specialLabel);
      fixture.detectChanges();

      const treeNode = fixture.debugElement.query(By.directive(TreeNodeComponent));
      expect(treeNode.componentInstance.node().label).toBe(specialLabel);
    });

    it('should handle toggle with undefined expanded state', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      fixture.detectChanges();

      const mockNode = { ...component.accordionNode(), expanded: undefined };
      component.onNodeToggle(mockNode);

      expect(component.expanded()).toBe(false);
    });
  });

  describe('Change Detection', () => {
    it('should update view when expanded signal changes', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      fixture.detectChanges();

      const collapsedPanel = fixture.debugElement.query(By.css('.accordion__panel'));
      expect(collapsedPanel).toBeTruthy();
      expect(collapsedPanel.nativeElement.getAttribute('aria-hidden')).toBe('true');

      component.expanded.set(true);
      fixture.detectChanges();

      const expandedPanel = fixture.debugElement.query(By.css('.accordion__panel'));
      expect(expandedPanel).toBeTruthy();
      expect(expandedPanel.nativeElement.getAttribute('aria-hidden')).toBe('false');
    });

    it('should update computed values when inputs change', () => {
      fixture.componentRef.setInput('label', 'Accordion');
      fixture.componentRef.setInput('chevronPosition', 'before');
      fixture.detectChanges();

      expect(component.computedChevronIconCollapsed()).toBe('chevron_right');

      fixture.componentRef.setInput('chevronPosition', 'after');
      fixture.detectChanges();

      expect(component.computedChevronIconCollapsed()).toBe('chevron_down');
    });
  });
});
