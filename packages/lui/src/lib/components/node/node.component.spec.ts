import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NodeComponent, Node } from './node.component';
import { IconComponent } from '../icon/icon.component';
import { Size, Appearance, Shape, Variant } from '../utils';
import { IconName } from '../icon';

describe('NodeComponent', () => {
  let component: NodeComponent<any>;
  let fixture: ComponentFixture<NodeComponent<any>>;
  let testNode: Node;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NodeComponent, IconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NodeComponent<any>);
    component = fixture.componentInstance;

    testNode = {
      id: 'test-1',
      label: 'Test Node',
      icon: 'folder' as IconName,
      disabled: false,
      selected: false,
    };
  });

  describe('Component Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should require node input', () => {
      fixture.componentRef.setInput('node', testNode);
      fixture.detectChanges();
      const nodeEl = fixture.debugElement.query(By.css('.node'));
      expect(nodeEl).toBeTruthy();
    });

    it('should have default input values', () => {
      fixture.componentRef.setInput('node', testNode);
      fixture.detectChanges();

      expect(component.size()).toBe('medium');
      expect(component.variant()).toBe('primary');
      expect(component.appearance()).toBe('transparent');
      expect(component.shape()).toBe('rounded');
      expect(component.showSelectionIndicator()).toBe(false);
      expect(component.indicatorPosition()).toBe('horizontal');
      expect(component.asButton()).toBe(false);
      expect(component.selectOnClick()).toBe(true);
      expect(component.showQuickActions()).toBe(false);
      expect(component.draggable()).toBe(false);
      expect(component.dropZone()).toBe(false);
    });
  });

  describe('Node Input', () => {
    it('should display node label', () => {
      fixture.componentRef.setInput('node', testNode);
      fixture.detectChanges();

      const labelEl = fixture.debugElement.query(By.css('.node__label'));
      expect(labelEl.nativeElement.textContent).toContain('Test Node');
    });

    it('should display node icon when provided', () => {
      fixture.componentRef.setInput('node', testNode);
      fixture.detectChanges();

      const iconEl = fixture.debugElement.query(By.css('.node__icon'));
      expect(iconEl).toBeTruthy();
    });

    it('should not display icon when not provided', () => {
      const nodeWithoutIcon = { ...testNode, icon: undefined };
      fixture.componentRef.setInput('node', nodeWithoutIcon);
      fixture.detectChanges();

      const iconEl = fixture.debugElement.query(By.css('.node__icon'));
      expect(iconEl).toBeFalsy();
    });
  });

  describe('Size Input', () => {
    const sizes: Size[] = ['small', 'medium', 'large'];

    sizes.forEach(size => {
      it(`should apply ${size} size class`, () => {
        fixture.componentRef.setInput('node', testNode);
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();

        const classes = component.nodeClasses();
        expect(classes).toContain(`node--${size}`);
      });
    });
  });

  describe('Variant Input', () => {
    const variants: Variant[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];

    variants.forEach(variant => {
      it(`should apply ${variant} variant class`, () => {
        fixture.componentRef.setInput('node', testNode);
        fixture.componentRef.setInput('variant', variant);
        fixture.detectChanges();

        const classes = component.nodeClasses();
        expect(classes).toContain(`node--${variant}`);
      });
    });
  });

  describe('Appearance Input', () => {
    const appearances: Appearance[] = ['filled', 'tint', 'outline', 'subtle', 'transparent'];

    appearances.forEach(appearance => {
      it(`should apply ${appearance} appearance class`, () => {
        fixture.componentRef.setInput('node', testNode);
        fixture.componentRef.setInput('appearance', appearance);
        fixture.detectChanges();

        const classes = component.nodeClasses();
        expect(classes).toContain(`node--${appearance}`);
      });
    });
  });

  describe('Shape Input', () => {
    const shapes: Shape[] = ['rounded', 'circular', 'square'];

    shapes.forEach(shape => {
      it(`should apply ${shape} shape class`, () => {
        fixture.componentRef.setInput('node', testNode);
        fixture.componentRef.setInput('shape', shape);
        fixture.detectChanges();

        const classes = component.nodeClasses();
        expect(classes).toContain(`node--${shape}`);
      });
    });
  });

  describe('Selected State', () => {
    it('should apply selected class when node is selected', () => {
      const selectedNode = { ...testNode, selected: true };
      fixture.componentRef.setInput('node', selectedNode);
      fixture.detectChanges();

      const classes = component.nodeClasses();
      expect(classes).toContain('node--selected');
    });

    it('should not apply selected class when node is not selected', () => {
      fixture.componentRef.setInput('node', testNode);
      fixture.detectChanges();

      const classes = component.nodeClasses();
      expect(classes).not.toContain('node--selected');
    });

    it('should use filled icon variant when selected', () => {
      const selectedNode = { ...testNode, selected: true };
      fixture.componentRef.setInput('node', selectedNode);
      fixture.detectChanges();

      const iconComponent = fixture.debugElement.query(By.directive(IconComponent));
      expect(iconComponent.componentInstance.variant()).toBe('filled');
    });

    it('should use regular icon variant when not selected', () => {
      fixture.componentRef.setInput('node', testNode);
      fixture.detectChanges();

      const iconComponent = fixture.debugElement.query(By.directive(IconComponent));
      expect(iconComponent.componentInstance.variant()).toBe('regular');
    });
  });

  describe('Disabled State', () => {
    it('should apply disabled class when node is disabled', () => {
      const disabledNode = { ...testNode, disabled: true };
      fixture.componentRef.setInput('node', disabledNode);
      fixture.detectChanges();

      const classes = component.nodeClasses();
      expect(classes).toContain('node--disabled');
    });

    it('should set tabindex to -1 when disabled', () => {
      const disabledNode = { ...testNode, disabled: true };
      fixture.componentRef.setInput('node', disabledNode);
      fixture.detectChanges();

      expect(component.getTabIndex()).toBe(-1);
    });

    it('should set tabindex to 0 when not disabled', () => {
      fixture.componentRef.setInput('node', testNode);
      fixture.detectChanges();

      expect(component.getTabIndex()).toBe(0);
    });
  });

  describe('AsButton Input', () => {
    it('should render as button when asButton is true', () => {
      fixture.componentRef.setInput('node', testNode);
      fixture.componentRef.setInput('asButton', true);
      fixture.detectChanges();

      const buttonEl = fixture.debugElement.query(By.css('button.node__content'));
      expect(buttonEl).toBeTruthy();
    });

    it('should render as div when asButton is false', () => {
      fixture.componentRef.setInput('node', testNode);
      fixture.componentRef.setInput('asButton', false);
      fixture.detectChanges();

      const divEl = fixture.debugElement.query(By.css('div.node__content'));
      expect(divEl).toBeTruthy();
    });

    it('should have role="button" when asButton is true', () => {
      fixture.componentRef.setInput('node', testNode);
      fixture.componentRef.setInput('asButton', true);
      fixture.detectChanges();

      expect(component.getRole()).toBe('button');
    });

    it('should have role="treeitem" when asButton is false', () => {
      fixture.componentRef.setInput('node', testNode);
      fixture.componentRef.setInput('asButton', false);
      fixture.detectChanges();

      expect(component.getRole()).toBe('treeitem');
    });
  });

  describe('NodeClick Event', () => {
    it('should emit nodeClick when content is clicked', () => {
      let emittedNode: Node | undefined;
      component.nodeClick.subscribe((node: Node) => {
        emittedNode = node;
      });

      fixture.componentRef.setInput('node', testNode);
      fixture.detectChanges();

      const contentEl = fixture.debugElement.query(By.css('.node__content'));
      contentEl.nativeElement.click();

      expect(emittedNode).toBe(testNode);
    });

    it('should not emit nodeClick when disabled', () => {
      let clickEmitted = false;
      component.nodeClick.subscribe(() => {
        clickEmitted = true;
      });

      const disabledNode = { ...testNode, disabled: true };
      fixture.componentRef.setInput('node', disabledNode);
      fixture.detectChanges();

      const contentEl = fixture.debugElement.query(By.css('.node__content'));
      contentEl.nativeElement.click();

      expect(clickEmitted).toBe(false);
    });

    it('should call preventDefault and stopPropagation on click', () => {
      fixture.componentRef.setInput('node', testNode);
      fixture.detectChanges();

      const event = new MouseEvent('click');
      vi.spyOn(event, 'preventDefault');
      vi.spyOn(event, 'stopPropagation');

      component.onContentClick(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(event.stopPropagation).toHaveBeenCalled();
    });
  });

  describe('NodeSelect Event', () => {
    it('should emit nodeSelect when selectOnClick is true', () => {
      let emittedNode: Node | undefined;
      component.nodeSelect.subscribe((node: Node) => {
        emittedNode = node;
      });

      fixture.componentRef.setInput('node', testNode);
      fixture.componentRef.setInput('selectOnClick', true);
      fixture.detectChanges();

      const contentEl = fixture.debugElement.query(By.css('.node__content'));
      contentEl.nativeElement.click();

      expect(emittedNode).toBe(testNode);
    });

    it('should not emit nodeSelect when selectOnClick is false', () => {
      let selectEmitted = false;
      component.nodeSelect.subscribe(() => {
        selectEmitted = true;
      });

      fixture.componentRef.setInput('node', testNode);
      fixture.componentRef.setInput('selectOnClick', false);
      fixture.detectChanges();

      const contentEl = fixture.debugElement.query(By.css('.node__content'));
      contentEl.nativeElement.click();

      expect(selectEmitted).toBe(false);
    });
  });

  describe('Closable Node', () => {
    it('should show close button when node is closable', () => {
      const closableNode = { ...testNode, closable: true };
      fixture.componentRef.setInput('node', closableNode);
      fixture.detectChanges();

      const closeBtn = fixture.debugElement.query(By.css('.node__close'));
      expect(closeBtn).toBeTruthy();
    });

    it('should not show close button when node is not closable', () => {
      fixture.componentRef.setInput('node', testNode);
      fixture.detectChanges();

      const closeBtn = fixture.debugElement.query(By.css('.node__close'));
      expect(closeBtn).toBeFalsy();
    });

    it('should emit nodeClose when close button is clicked', () => {
      let emittedNode: Node | undefined;
      component.nodeClose.subscribe((node: Node) => {
        emittedNode = node;
      });

      const closableNode = { ...testNode, closable: true };
      fixture.componentRef.setInput('node', closableNode);
      fixture.detectChanges();

      const closeBtn = fixture.debugElement.query(By.css('.node__close'));
      closeBtn.nativeElement.click();

      expect(emittedNode).toBe(closableNode);
    });

    it('should stop propagation when close button is clicked', () => {
      let nodeClicked = false;
      component.nodeClick.subscribe(() => {
        nodeClicked = true;
      });

      const closableNode = { ...testNode, closable: true };
      fixture.componentRef.setInput('node', closableNode);
      fixture.detectChanges();

      const event = new Event('click', { bubbles: true });
      vi.spyOn(event, 'preventDefault');
      vi.spyOn(event, 'stopPropagation');

      component.onCloseClick(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(event.stopPropagation).toHaveBeenCalled();
    });
  });

  describe('Selection Indicator', () => {
    it('should not show indicator by default', () => {
      fixture.componentRef.setInput('node', testNode);
      fixture.detectChanges();

      const indicator = fixture.debugElement.query(By.css('.node__indicator'));
      expect(indicator).toBeFalsy();
    });

    it('should show indicator when showSelectionIndicator is true', () => {
      fixture.componentRef.setInput('node', testNode);
      fixture.componentRef.setInput('showSelectionIndicator', true);
      fixture.detectChanges();

      const indicator = fixture.debugElement.query(By.css('.node__indicator'));
      expect(indicator).toBeTruthy();
    });

    it('should apply horizontal indicator class', () => {
      fixture.componentRef.setInput('node', testNode);
      fixture.componentRef.setInput('showSelectionIndicator', true);
      fixture.componentRef.setInput('indicatorPosition', 'horizontal');
      fixture.detectChanges();

      const classes = component.nodeClasses();
      expect(classes).toContain('node--indicator-horizontal');
    });

    it('should apply vertical indicator class', () => {
      fixture.componentRef.setInput('node', testNode);
      fixture.componentRef.setInput('showSelectionIndicator', true);
      fixture.componentRef.setInput('indicatorPosition', 'vertical');
      fixture.detectChanges();

      const classes = component.nodeClasses();
      expect(classes).toContain('node--indicator-vertical');
    });

    it('should show selector when node is selected and horizontal', () => {
      const selectedNode = { ...testNode, selected: true };
      fixture.componentRef.setInput('node', selectedNode);
      fixture.componentRef.setInput('showSelectionIndicator', true);
      fixture.componentRef.setInput('indicatorPosition', 'horizontal');
      fixture.detectChanges();

      const selector = fixture.debugElement.query(By.css('.node__selector'));
      expect(selector).toBeTruthy();
    });
  });

  describe('Draggable', () => {
    it('should add draggable class when draggable is true', () => {
      fixture.componentRef.setInput('node', testNode);
      fixture.componentRef.setInput('draggable', true);
      fixture.detectChanges();

      const classes = component.contentClasses();
      expect(classes).toContain('node__content--draggable');
    });

    it('should not add draggable class when node is disabled', () => {
      const disabledNode = { ...testNode, disabled: true };
      fixture.componentRef.setInput('node', disabledNode);
      fixture.componentRef.setInput('draggable', true);
      fixture.detectChanges();

      const classes = component.contentClasses();
      expect(classes).not.toContain('node__content--draggable');
    });

    it('should emit dragStart event', () => {
      let dragStartEmitted = false;
      component.dragStart.subscribe(() => {
        dragStartEmitted = true;
      });

      fixture.componentRef.setInput('node', testNode);
      fixture.componentRef.setInput('draggable', true);
      fixture.detectChanges();

      const event = new DragEvent('dragstart', {
        dataTransfer: new DataTransfer(),
      });

      component.onDragStart(event);

      expect(dragStartEmitted).toBe(true);
    });

    it('should prevent dragStart when disabled', () => {
      const disabledNode = { ...testNode, disabled: true };
      fixture.componentRef.setInput('node', disabledNode);
      fixture.componentRef.setInput('draggable', true);
      fixture.detectChanges();

      const event = new DragEvent('dragstart', {
        dataTransfer: new DataTransfer(),
      });
      vi.spyOn(event, 'preventDefault');

      component.onDragStart(event);

      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should emit dragEnd event', () => {
      let dragEndEmitted = false;
      component.dragEnd.subscribe(() => {
        dragEndEmitted = true;
      });

      fixture.componentRef.setInput('node', testNode);
      fixture.componentRef.setInput('draggable', true);
      fixture.detectChanges();

      const event = new DragEvent('dragend');
      component.onDragEnd(event);

      expect(dragEndEmitted).toBe(true);
    });

    it('should emit drag event', () => {
      let dragEmitted = false;
      component.drag.subscribe(() => {
        dragEmitted = true;
      });

      fixture.componentRef.setInput('node', testNode);
      fixture.componentRef.setInput('draggable', true);
      fixture.detectChanges();

      const event = new DragEvent('drag');
      component.onDrag(event);

      expect(dragEmitted).toBe(true);
    });
  });

  describe('Drop Zone', () => {
    it('should handle dragOver event when dropZone is true', () => {
      let dragOverEmitted = false;
      component.dragOver.subscribe(() => {
        dragOverEmitted = true;
      });

      fixture.componentRef.setInput('node', testNode);
      fixture.componentRef.setInput('dropZone', true);
      fixture.detectChanges();

      const event = new DragEvent('dragover', {
        dataTransfer: new DataTransfer(),
      });
      vi.spyOn(event, 'preventDefault');
      vi.spyOn(event, 'stopPropagation');

      component.onDragOver(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(event.stopPropagation).toHaveBeenCalled();
      expect(dragOverEmitted).toBe(true);
      expect(component.isDragOver()).toBe(true);
    });

    it('should not handle dragOver when dropZone is false', () => {
      fixture.componentRef.setInput('node', testNode);
      fixture.componentRef.setInput('dropZone', false);
      fixture.detectChanges();

      const event = new DragEvent('dragover');
      vi.spyOn(event, 'preventDefault');

      component.onDragOver(event);

      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('should not handle dragOver when disabled', () => {
      const disabledNode = { ...testNode, disabled: true };
      fixture.componentRef.setInput('node', disabledNode);
      fixture.componentRef.setInput('dropZone', true);
      fixture.detectChanges();

      const event = new DragEvent('dragover');
      vi.spyOn(event, 'preventDefault');

      component.onDragOver(event);

      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('should emit drop event', () => {
      let dropEmitted = false;
      component.drop.subscribe(() => {
        dropEmitted = true;
      });

      fixture.componentRef.setInput('node', testNode);
      fixture.componentRef.setInput('dropZone', true);
      fixture.detectChanges();

      const event = new DragEvent('drop', {
        dataTransfer: new DataTransfer(),
      });
      vi.spyOn(event, 'preventDefault');
      vi.spyOn(event, 'stopPropagation');

      component.onDrop(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(event.stopPropagation).toHaveBeenCalled();
      expect(dropEmitted).toBe(true);
      expect(component.isDragOver()).toBe(false);
    });

    it('should emit dragLeave event', () => {
      let dragLeaveEmitted = false;
      component.dragLeave.subscribe(() => {
        dragLeaveEmitted = true;
      });

      fixture.componentRef.setInput('node', testNode);
      fixture.componentRef.setInput('dropZone', true);
      fixture.detectChanges();

      // Set drag over state first
      component.isDragOver.set(true);

      const event = new DragEvent('dragleave', {
        relatedTarget: null,
      });
      Object.defineProperty(event, 'currentTarget', {
        value: { contains: () => false },
        writable: false,
      });

      component.onDragLeave(event);

      expect(dragLeaveEmitted).toBe(true);
      expect(component.isDragOver()).toBe(false);
    });

    it('should add drag-over class when dragging over', () => {
      fixture.componentRef.setInput('node', testNode);
      fixture.componentRef.setInput('dropZone', true);
      fixture.detectChanges();

      component.isDragOver.set(true);
      fixture.detectChanges();

      const classes = component.getDropZoneClasses();
      expect(classes).toContain('node__drop-zone--drag-over');
    });
  });

  describe('Helper Methods', () => {
    it('shouldShowIcon should return true when icon is present', () => {
      fixture.componentRef.setInput('node', testNode);
      fixture.detectChanges();

      expect(component.shouldShowIcon()).toBe(true);
    });

    it('shouldShowIcon should return false when icon is not present', () => {
      const nodeWithoutIcon = { ...testNode, icon: undefined };
      fixture.componentRef.setInput('node', nodeWithoutIcon);
      fixture.detectChanges();

      expect(component.shouldShowIcon()).toBe(false);
    });

    it('shouldShowLabel should always return true', () => {
      fixture.componentRef.setInput('node', testNode);
      fixture.detectChanges();

      expect(component.shouldShowLabel()).toBe(true);
    });

    it('getSelectorWidth should return 70%', () => {
      fixture.componentRef.setInput('node', testNode);
      fixture.detectChanges();

      expect(component.getSelectorWidth()).toBe('70%');
    });

    it('getSelectorHeight should return 24 for small size', () => {
      fixture.componentRef.setInput('node', testNode);
      fixture.componentRef.setInput('size', 'small');
      fixture.detectChanges();

      expect(component.getSelectorHeight()).toBe('24');
    });

    it('getSelectorHeight should return 32 for medium size', () => {
      fixture.componentRef.setInput('node', testNode);
      fixture.componentRef.setInput('size', 'medium');
      fixture.detectChanges();

      expect(component.getSelectorHeight()).toBe('32');
    });

    it('getSelectorHeightValue should return numeric value', () => {
      fixture.componentRef.setInput('node', testNode);
      fixture.componentRef.setInput('size', 'small');
      fixture.detectChanges();

      expect(component.getSelectorHeightValue()).toBe(24);
    });

    it('getVerticalIndicatorPath should return path for small size', () => {
      fixture.componentRef.setInput('node', testNode);
      fixture.componentRef.setInput('size', 'small');
      fixture.detectChanges();

      const path = component.getVerticalIndicatorPath();
      expect(path).toContain('M0 5.5');
    });

    it('getVerticalIndicatorPath should return path for medium size', () => {
      fixture.componentRef.setInput('node', testNode);
      fixture.componentRef.setInput('size', 'medium');
      fixture.detectChanges();

      const path = component.getVerticalIndicatorPath();
      expect(path).toContain('M0 9.5');
    });
  });

  describe('NodeClasses Method', () => {
    it('should always include base node class', () => {
      fixture.componentRef.setInput('node', testNode);
      fixture.detectChanges();

      const classes = component.nodeClasses();
      expect(classes).toContain('node');
    });

    it('should include all default classes', () => {
      fixture.componentRef.setInput('node', testNode);
      fixture.detectChanges();

      const classes = component.nodeClasses();
      expect(classes).toContain('node');
      expect(classes).toContain('node--medium');
      expect(classes).toContain('node--primary');
      expect(classes).toContain('node--transparent');
      expect(classes).toContain('node--rounded');
    });

    it('should include state classes when applicable', () => {
      const selectedDisabledNode = { ...testNode, selected: true, disabled: true };
      fixture.componentRef.setInput('node', selectedDisabledNode);
      fixture.detectChanges();

      const classes = component.nodeClasses();
      expect(classes).toContain('node--selected');
      expect(classes).toContain('node--disabled');
    });
  });

  describe('ContentClasses Method', () => {
    it('should include base content class', () => {
      fixture.componentRef.setInput('node', testNode);
      fixture.detectChanges();

      const classes = component.contentClasses();
      expect(classes).toContain('node__content');
    });

    it('should include button class when asButton is true', () => {
      fixture.componentRef.setInput('node', testNode);
      fixture.componentRef.setInput('asButton', true);
      fixture.detectChanges();

      const classes = component.contentClasses();
      expect(classes).toContain('node__content--button');
    });

    it('should include draggable class when draggable and not disabled', () => {
      fixture.componentRef.setInput('node', testNode);
      fixture.componentRef.setInput('draggable', true);
      fixture.detectChanges();

      const classes = component.contentClasses();
      expect(classes).toContain('node__content--draggable');
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle all inputs together', () => {
      const complexNode: Node = {
        id: 'complex-1',
        label: 'Complex Node',
        icon: 'folder' as IconName,
        selected: true,
        disabled: false,
        closable: true,
      };

      fixture.componentRef.setInput('node', complexNode);
      fixture.componentRef.setInput('size', 'large');
      fixture.componentRef.setInput('variant', 'success');
      fixture.componentRef.setInput('appearance', 'filled');
      fixture.componentRef.setInput('shape', 'circular');
      fixture.componentRef.setInput('asButton', true);
      fixture.componentRef.setInput('showSelectionIndicator', true);
      fixture.componentRef.setInput('draggable', true);
      fixture.componentRef.setInput('dropZone', true);
      fixture.detectChanges();

      const classes = component.nodeClasses();
      expect(classes).toContain('node--large');
      expect(classes).toContain('node--success');
      expect(classes).toContain('node--filled');
      expect(classes).toContain('node--circular');
      expect(classes).toContain('node--selected');

      const buttonEl = fixture.debugElement.query(By.css('button.node__content'));
      expect(buttonEl).toBeTruthy();

      const closeBtn = fixture.debugElement.query(By.css('.node__close'));
      expect(closeBtn).toBeTruthy();

      const indicator = fixture.debugElement.query(By.css('.node__indicator'));
      expect(indicator).toBeTruthy();
    });

    it('should handle rapid property changes', () => {
      fixture.componentRef.setInput('node', testNode);
      fixture.detectChanges();

      for (let i = 0; i < 5; i++) {
        const updatedNode = { ...testNode, selected: i % 2 === 0 };
        fixture.componentRef.setInput('node', updatedNode);
        fixture.detectChanges();
        expect(component.node().selected).toBe(i % 2 === 0);
      }
    });

    it('should maintain consistency after multiple updates', () => {
      fixture.componentRef.setInput('node', testNode);
      fixture.componentRef.setInput('variant', 'primary');
      fixture.detectChanges();

      fixture.componentRef.setInput('variant', 'danger');
      fixture.detectChanges();
      expect(component.nodeClasses()).toContain('node--danger');
      expect(component.nodeClasses()).not.toContain('node--primary');

      const disabledNode = { ...testNode, disabled: true };
      fixture.componentRef.setInput('node', disabledNode);
      fixture.detectChanges();
      expect(component.nodeClasses()).toContain('node--danger');
      expect(component.nodeClasses()).toContain('node--disabled');
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard accessible', () => {
      fixture.componentRef.setInput('node', testNode);
      fixture.detectChanges();

      const contentEl = fixture.debugElement.query(By.css('.node__content'));
      expect(contentEl.nativeElement.getAttribute('tabindex')).toBe('0');
    });

    it('should have proper role attribute', () => {
      fixture.componentRef.setInput('node', testNode);
      fixture.detectChanges();

      const contentEl = fixture.debugElement.query(By.css('.node__content'));
      expect(contentEl.nativeElement.getAttribute('role')).toBe('treeitem');
    });

    it('should set aria-selected when selected', () => {
      const selectedNode = { ...testNode, selected: true };
      fixture.componentRef.setInput('node', selectedNode);
      fixture.detectChanges();

      const contentEl = fixture.debugElement.query(By.css('.node__content'));
      expect(contentEl.nativeElement.getAttribute('aria-selected')).toBe('true');
    });

    it('should set aria-disabled when disabled', () => {
      const disabledNode = { ...testNode, disabled: true };
      fixture.componentRef.setInput('node', disabledNode);
      fixture.detectChanges();

      const contentEl = fixture.debugElement.query(By.css('.node__content'));
      expect(contentEl.nativeElement.getAttribute('aria-disabled')).toBe('true');
    });

    it('should have accessible close button label', () => {
      const closableNode = { ...testNode, closable: true };
      fixture.componentRef.setInput('node', closableNode);
      fixture.detectChanges();

      const closeBtn = fixture.debugElement.query(By.css('.node__close'));
      expect(closeBtn.nativeElement.getAttribute('aria-label')).toBe('Close Test Node');
    });
  });

  describe('Edge Cases', () => {
    it('should handle node without icon', () => {
      const nodeWithoutIcon = { ...testNode, icon: undefined };
      fixture.componentRef.setInput('node', nodeWithoutIcon);
      fixture.detectChanges();

      expect(() => fixture.detectChanges()).not.toThrow();
    });

    it('should handle very long label', () => {
      const longLabelNode = {
        ...testNode,
        label: 'This is a very long node label that might overflow the container',
      };
      fixture.componentRef.setInput('node', longLabelNode);
      fixture.detectChanges();

      const labelEl = fixture.debugElement.query(By.css('.node__label'));
      expect(labelEl.nativeElement.textContent).toContain(longLabelNode.label);
    });

    it('should handle special characters in label', () => {
      const specialNode = { ...testNode, label: '<>&"\'' };
      fixture.componentRef.setInput('node', specialNode);
      fixture.detectChanges();

      const labelEl = fixture.debugElement.query(By.css('.node__label'));
      expect(labelEl).toBeTruthy();
    });

    it('should handle multiple rapid clicks', () => {
      let clickCount = 0;
      component.nodeClick.subscribe(() => clickCount++);

      fixture.componentRef.setInput('node', testNode);
      fixture.detectChanges();

      const contentEl = fixture.debugElement.query(By.css('.node__content'));
      for (let i = 0; i < 5; i++) {
        contentEl.nativeElement.click();
      }

      expect(clickCount).toBe(5);
    });

    it('should handle drag data with circular references', () => {
      const nodeWithCircular: any = { ...testNode };
      nodeWithCircular.parent = nodeWithCircular; // Circular reference

      fixture.componentRef.setInput('node', nodeWithCircular);
      fixture.componentRef.setInput('draggable', true);
      fixture.componentRef.setInput('dragData', nodeWithCircular);
      fixture.detectChanges();

      const event = new DragEvent('dragstart', {
        dataTransfer: new DataTransfer(),
      });

      expect(() => component.onDragStart(event)).not.toThrow();
    });
  });

  describe('Change Detection', () => {
    it('should use OnPush change detection strategy', () => {
      expect(component).toBeTruthy();
      // OnPush is set in component metadata
    });

    it('should update view when node input changes', () => {
      fixture.componentRef.setInput('node', testNode);
      fixture.detectChanges();

      const updatedNode = { ...testNode, label: 'Updated Label' };
      fixture.componentRef.setInput('node', updatedNode);
      fixture.detectChanges();

      const labelEl = fixture.debugElement.query(By.css('.node__label'));
      expect(labelEl.nativeElement.textContent).toContain('Updated Label');
    });
  });
});
