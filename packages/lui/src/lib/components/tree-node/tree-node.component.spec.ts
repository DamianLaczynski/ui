import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TemplateRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TreeNodeComponent, TreeNode } from './tree-node.component';
import { NodeComponent } from '../node/node.component';
import { IconComponent } from '../icon/icon.component';
import { Size } from '../utils';
import { IconName } from '../icon';

describe('TreeNodeComponent', () => {
  let component: TreeNodeComponent<any>;
  let fixture: ComponentFixture<TreeNodeComponent<any>>;

  const createMockNode = (overrides?: Partial<TreeNode>): TreeNode => ({
    id: 'node-1',
    label: 'Test Node',
    selected: false,
    disabled: false,
    hasChildren: false,
    children: [],
    expanded: false,
    ...overrides,
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeNodeComponent, NodeComponent, IconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TreeNodeComponent<any>);
    component = fixture.componentInstance;
  });

  describe('Component Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should require node input', () => {
      const mockNode = createMockNode();
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();
      expect(component.node()).toEqual(mockNode);
    });

    it('should have default input values', () => {
      fixture.componentRef.setInput('node', createMockNode());
      fixture.detectChanges();

      expect(component.size()).toBe('medium');
      expect(component.variant()).toBe('primary');
      expect(component.appearance()).toBe('subtle');
      expect(component.shape()).toBe('rounded');
      expect(component.showSelectionIndicator()).toBe(false);
      expect(component.indicatorPosition()).toBe('vertical');
      expect(component.chevronPosition()).toBe('before');
      expect(component.chevronIconCollapsed()).toBe('chevron_right');
      expect(component.chevronIconExpanded()).toBe('chevron_down');
      expect(component.asButton()).toBe(false);
      expect(component.expandOnClick()).toBe(false);
      expect(component.selectOnClick()).toBe(true);
      expect(component.showQuickActions()).toBe(false);
      expect(component.draggable()).toBe(false);
      expect(component.dropZone()).toBe(false);
    });

    it('should initialize expanded signal from node', () => {
      const mockNode = createMockNode({ expanded: true });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      expect(component.expanded()).toBe(true);
    });

    it('should initialize collapsed when node expanded is false', () => {
      const mockNode = createMockNode({ expanded: false });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      expect(component.expanded()).toBe(false);
    });
  });

  describe('Node Data Input', () => {
    it('should display node label', () => {
      const mockNode = createMockNode({ label: 'My Node' });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      const nodeComponent = fixture.debugElement.query(By.directive(NodeComponent));
      expect(nodeComponent.componentInstance.node().label).toBe('My Node');
    });

    it('should pass node icon', () => {
      const mockNode = createMockNode({ icon: 'folder' as IconName });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      const nodeComponent = fixture.debugElement.query(By.directive(NodeComponent));
      expect(nodeComponent.componentInstance.node().icon).toBe('folder');
    });

    it('should pass disabled state', () => {
      const mockNode = createMockNode({ disabled: true });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      const nodeComponent = fixture.debugElement.query(By.directive(NodeComponent));
      expect(nodeComponent.componentInstance.node().disabled).toBe(true);
    });

    it('should pass selected state', () => {
      const mockNode = createMockNode({ selected: true });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      const nodeComponent = fixture.debugElement.query(By.directive(NodeComponent));
      expect(nodeComponent.componentInstance.node().selected).toBe(true);
    });
  });

  describe('Size Input', () => {
    const sizes: Size[] = ['small', 'medium', 'large'];

    sizes.forEach(size => {
      it(`should apply ${size} size class`, () => {
        fixture.componentRef.setInput('node', createMockNode());
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();

        const classes = component.treeNodeClasses();
        expect(classes).toContain(`tree-node--${size}`);
      });

      it(`should pass ${size} to node component`, () => {
        fixture.componentRef.setInput('node', createMockNode());
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();

        const nodeComponent = fixture.debugElement.query(By.directive(NodeComponent));
        expect(nodeComponent.componentInstance.size()).toBe(size);
      });
    });
  });

  describe('Visual Configuration', () => {
    it('should pass variant to node component', () => {
      fixture.componentRef.setInput('node', createMockNode());
      fixture.componentRef.setInput('variant', 'secondary');
      fixture.detectChanges();

      const nodeComponent = fixture.debugElement.query(By.directive(NodeComponent));
      expect(nodeComponent.componentInstance.variant()).toBe('secondary');
    });

    it('should pass appearance to node component', () => {
      fixture.componentRef.setInput('node', createMockNode());
      fixture.componentRef.setInput('appearance', 'filled');
      fixture.detectChanges();

      const nodeComponent = fixture.debugElement.query(By.directive(NodeComponent));
      expect(nodeComponent.componentInstance.appearance()).toBe('filled');
    });

    it('should pass shape to node component', () => {
      fixture.componentRef.setInput('node', createMockNode());
      fixture.componentRef.setInput('shape', 'circular');
      fixture.detectChanges();

      const nodeComponent = fixture.debugElement.query(By.directive(NodeComponent));
      expect(nodeComponent.componentInstance.shape()).toBe('circular');
    });

    it('should pass showSelectionIndicator to node component', () => {
      fixture.componentRef.setInput('node', createMockNode());
      fixture.componentRef.setInput('showSelectionIndicator', true);
      fixture.detectChanges();

      const nodeComponent = fixture.debugElement.query(By.directive(NodeComponent));
      expect(nodeComponent.componentInstance.showSelectionIndicator()).toBe(true);
    });

    it('should pass indicatorPosition to node component', () => {
      fixture.componentRef.setInput('node', createMockNode());
      fixture.componentRef.setInput('indicatorPosition', 'horizontal');
      fixture.detectChanges();

      const nodeComponent = fixture.debugElement.query(By.directive(NodeComponent));
      expect(nodeComponent.componentInstance.indicatorPosition()).toBe('horizontal');
    });
  });

  describe('Chevron Configuration', () => {
    it('should not show chevron for leaf nodes', () => {
      const mockNode = createMockNode({ hasChildren: false });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      expect(component.shouldShowChevron()).toBe(false);
      const chevron = fixture.debugElement.query(By.css('.tree-node__chevron'));
      expect(chevron).toBeFalsy();
    });

    it('should show chevron for nodes with children', () => {
      const mockNode = createMockNode({ hasChildren: true });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      expect(component.shouldShowChevron()).toBe(true);
      const chevron = fixture.debugElement.query(By.css('.tree-node__chevron'));
      expect(chevron).toBeTruthy();
    });

    it('should show collapsed chevron when not expanded', () => {
      const mockNode = createMockNode({ hasChildren: true, expanded: false });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      const chevronIcon = fixture.debugElement.query(By.css('.tree-node__chevron ui-icon'));
      expect(chevronIcon.componentInstance.icon()).toBe('chevron_right');
    });

    it('should show expanded chevron when expanded', () => {
      const mockNode = createMockNode({ hasChildren: true, expanded: true });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      const chevronIcon = fixture.debugElement.query(By.css('.tree-node__chevron ui-icon'));
      expect(chevronIcon.componentInstance.icon()).toBe('chevron_down');
    });

    it('should position chevron before when chevronPosition is before', () => {
      const mockNode = createMockNode({ hasChildren: true });
      fixture.componentRef.setInput('node', mockNode);
      fixture.componentRef.setInput('chevronPosition', 'before');
      fixture.detectChanges();

      const chevrons = fixture.debugElement.queryAll(By.css('.tree-node__chevron'));
      expect(chevrons.length).toBe(1);
    });

    it('should position chevron after when chevronPosition is after', () => {
      const mockNode = createMockNode({ hasChildren: true });
      fixture.componentRef.setInput('node', mockNode);
      fixture.componentRef.setInput('chevronPosition', 'after');
      fixture.detectChanges();

      const chevrons = fixture.debugElement.queryAll(By.css('.tree-node__chevron'));
      expect(chevrons.length).toBe(1);
    });

    it('should use custom collapsed chevron icon', () => {
      const mockNode = createMockNode({ hasChildren: true, expanded: false });
      fixture.componentRef.setInput('node', mockNode);
      fixture.componentRef.setInput('chevronIconCollapsed', 'arrow_right' as IconName);
      fixture.detectChanges();

      const chevronIcon = fixture.debugElement.query(By.css('.tree-node__chevron ui-icon'));
      expect(chevronIcon.componentInstance.icon()).toBe('arrow_right');
    });

    it('should use custom expanded chevron icon', () => {
      const mockNode = createMockNode({ hasChildren: true, expanded: true });
      fixture.componentRef.setInput('node', mockNode);
      fixture.componentRef.setInput('chevronIconExpanded', 'arrow_down' as IconName);
      fixture.detectChanges();

      const chevronIcon = fixture.debugElement.query(By.css('.tree-node__chevron ui-icon'));
      expect(chevronIcon.componentInstance.icon()).toBe('arrow_down');
    });
  });

  describe('Behavior Configuration', () => {
    it('should pass asButton to node component', () => {
      fixture.componentRef.setInput('node', createMockNode());
      fixture.componentRef.setInput('asButton', true);
      fixture.detectChanges();

      const nodeComponent = fixture.debugElement.query(By.directive(NodeComponent));
      expect(nodeComponent.componentInstance.asButton()).toBe(true);
    });

    it('should pass selectOnClick to node component', () => {
      fixture.componentRef.setInput('node', createMockNode());
      fixture.componentRef.setInput('selectOnClick', false);
      fixture.detectChanges();

      const nodeComponent = fixture.debugElement.query(By.directive(NodeComponent));
      expect(nodeComponent.componentInstance.selectOnClick()).toBe(false);
    });
  });

  describe('isLeaf Method', () => {
    it('should return true for node without hasChildren', () => {
      fixture.componentRef.setInput('node', createMockNode({ hasChildren: false }));
      fixture.detectChanges();

      expect(component.isLeaf()).toBe(true);
    });

    it('should return true for node with hasChildren but no children array', () => {
      fixture.componentRef.setInput(
        'node',
        createMockNode({ hasChildren: true, children: undefined }),
      );
      fixture.detectChanges();

      expect(component.isLeaf()).toBe(true);
    });

    it('should return true for node with empty children array', () => {
      fixture.componentRef.setInput('node', createMockNode({ hasChildren: true, children: [] }));
      fixture.detectChanges();

      expect(component.isLeaf()).toBe(true);
    });

    it('should return false for node with children', () => {
      const child = createMockNode({ id: 'child-1' });
      fixture.componentRef.setInput(
        'node',
        createMockNode({ hasChildren: true, children: [child] }),
      );
      fixture.detectChanges();

      expect(component.isLeaf()).toBe(false);
    });
  });

  describe('hasChildren Method', () => {
    it('should return false when hasChildren is false', () => {
      fixture.componentRef.setInput('node', createMockNode({ hasChildren: false }));
      fixture.detectChanges();

      expect(component.hasChildren()).toBe(false);
    });

    it('should return true when hasChildren is true', () => {
      fixture.componentRef.setInput('node', createMockNode({ hasChildren: true }));
      fixture.detectChanges();

      expect(component.hasChildren()).toBe(true);
    });

    it('should return false when hasChildren is undefined', () => {
      fixture.componentRef.setInput('node', createMockNode({ hasChildren: undefined }));
      fixture.detectChanges();

      expect(component.hasChildren()).toBe(false);
    });
  });

  describe('Toggle Functionality', () => {
    it('should toggle from collapsed to expanded', () => {
      const mockNode = createMockNode({ hasChildren: true, expanded: false });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      expect(component.expanded()).toBe(false);

      component.toggleNode();
      fixture.detectChanges();

      expect(component.expanded()).toBe(true);
    });

    it('should toggle from expanded to collapsed', () => {
      const mockNode = createMockNode({ hasChildren: true, expanded: true });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      expect(component.expanded()).toBe(true);

      component.toggleNode();
      fixture.detectChanges();

      expect(component.expanded()).toBe(false);
    });

    it('should emit nodeToggle event when toggled', () => {
      let emittedNode: TreeNode | undefined;
      component.nodeToggle.subscribe((node: TreeNode) => {
        emittedNode = node;
      });

      const mockNode = createMockNode({ hasChildren: true });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      component.toggleNode();

      expect(emittedNode).toBeDefined();
      expect(emittedNode?.id).toBe('node-1');
      expect(emittedNode?.expanded).toBe(true);
    });

    it('should update node expanded state when toggled', () => {
      const mockNode = createMockNode({ hasChildren: true, expanded: false });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      component.toggleNode();

      expect(mockNode.expanded).toBe(true);
    });
  });

  describe('Chevron Click', () => {
    it('should toggle node when chevron is clicked', () => {
      const mockNode = createMockNode({ hasChildren: true, expanded: false });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      const chevron = fixture.debugElement.query(By.css('.tree-node__chevron'));
      chevron.nativeElement.click();
      fixture.detectChanges();

      expect(component.expanded()).toBe(true);
    });

    it('should stop event propagation when chevron is clicked', () => {
      const mockNode = createMockNode({ hasChildren: true });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      const event = new MouseEvent('click', { bubbles: true });
      vi.spyOn(event, 'stopPropagation');

      component.onChevronClick(event);

      expect(event.stopPropagation).toHaveBeenCalled();
    });

    it('should not toggle when disabled', () => {
      const mockNode = createMockNode({ hasChildren: true, disabled: true, expanded: false });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      const event = new MouseEvent('click');
      component.onChevronClick(event);

      expect(component.expanded()).toBe(false);
    });

    it('should set chevron aria-label using expand text when collapsed', () => {
      const mockNode = createMockNode({ hasChildren: true, label: 'Node A', expanded: false });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      const chevron = fixture.debugElement.query(By.css('.tree-node__chevron'));
      expect(chevron.nativeElement.getAttribute('aria-label')).toBe('Expand Node A');
      expect(chevron.nativeElement.getAttribute('aria-expanded')).toBe('false');
    });

    it('should set chevron aria-label using collapse text when expanded', () => {
      const mockNode = createMockNode({ hasChildren: true, label: 'Node A', expanded: true });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      const chevron = fixture.debugElement.query(By.css('.tree-node__chevron'));
      expect(chevron.nativeElement.getAttribute('aria-label')).toBe('Collapse Node A');
      expect(chevron.nativeElement.getAttribute('aria-expanded')).toBe('true');
    });

    it('should toggle node on chevron Enter keydown', () => {
      const mockNode = createMockNode({ hasChildren: true, expanded: false });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: 'Enter', cancelable: true });
      const preventSpy = vi.spyOn(event, 'preventDefault');
      const stopSpy = vi.spyOn(event, 'stopPropagation');

      component.onChevronKeyDown(event);

      expect(preventSpy).toHaveBeenCalled();
      expect(stopSpy).toHaveBeenCalled();
      expect(component.expanded()).toBe(true);
    });
  });

  describe('Node Click', () => {
    it('should emit nodeClick event', () => {
      let emittedNode: TreeNode | undefined;
      component.nodeClick.subscribe((node: TreeNode) => {
        emittedNode = node;
      });

      const mockNode = createMockNode();
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      component.onNodeClick(mockNode);

      expect(emittedNode).toBe(mockNode);
    });

    it('should toggle when expandOnClick is true and has children', () => {
      const mockNode = createMockNode({ hasChildren: true, expanded: false });
      fixture.componentRef.setInput('node', mockNode);
      fixture.componentRef.setInput('expandOnClick', true);
      fixture.detectChanges();

      component.onNodeClick(mockNode);

      expect(component.expanded()).toBe(true);
    });

    it('should not toggle when expandOnClick is false', () => {
      const mockNode = createMockNode({ hasChildren: true, expanded: false });
      fixture.componentRef.setInput('node', mockNode);
      fixture.componentRef.setInput('expandOnClick', false);
      fixture.detectChanges();

      component.onNodeClick(mockNode);

      expect(component.expanded()).toBe(false);
    });

    it('should not toggle when node has no children', () => {
      const mockNode = createMockNode({ hasChildren: false });
      fixture.componentRef.setInput('node', mockNode);
      fixture.componentRef.setInput('expandOnClick', true);
      fixture.detectChanges();

      component.onNodeClick(mockNode);

      expect(component.expanded()).toBe(false);
    });
  });

  describe('Node Select', () => {
    it('should emit nodeSelect event', () => {
      let emittedNode: TreeNode | undefined;
      component.nodeSelect.subscribe((node: TreeNode) => {
        emittedNode = node;
      });

      const mockNode = createMockNode();
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      component.onNodeSelect(mockNode);

      expect(emittedNode).toBe(mockNode);
    });
  });

  describe('Children Rendering', () => {
    it('should keep children mounted and hidden when collapsed for animation', () => {
      const child = createMockNode({ id: 'child-1', label: 'Child' });
      const mockNode = createMockNode({ hasChildren: true, children: [child], expanded: false });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      const childrenContainer = fixture.debugElement.query(By.css('.tree-node__children'));
      expect(childrenContainer).toBeTruthy();
      expect(childrenContainer.nativeElement.getAttribute('aria-hidden')).toBe('true');
    });

    it('should render children when expanded', () => {
      const child = createMockNode({ id: 'child-1', label: 'Child' });
      const mockNode = createMockNode({ hasChildren: true, children: [child], expanded: true });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      const childrenContainer = fixture.debugElement.query(By.css('.tree-node__children'));
      expect(childrenContainer).toBeTruthy();
      expect(childrenContainer.nativeElement.getAttribute('aria-hidden')).toBe('false');
    });

    it('should render multiple children', () => {
      const children = [
        createMockNode({ id: 'child-1', label: 'Child 1' }),
        createMockNode({ id: 'child-2', label: 'Child 2' }),
        createMockNode({ id: 'child-3', label: 'Child 3' }),
      ];
      const mockNode = createMockNode({ hasChildren: true, children, expanded: true });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      const childNodes = fixture.debugElement.queryAll(
        By.css('.tree-node__children-inner > ui-tree-node'),
      );
      expect(childNodes.length).toBe(3);
    });

    it('should pass properties to child nodes', () => {
      const child = createMockNode({ id: 'child-1' });
      const mockNode = createMockNode({ hasChildren: true, children: [child], expanded: true });
      fixture.componentRef.setInput('node', mockNode);
      fixture.componentRef.setInput('size', 'large');
      fixture.componentRef.setInput('variant', 'secondary');
      fixture.detectChanges();

      const childNode = fixture.debugElement.query(
        By.css('.tree-node__children-inner > ui-tree-node'),
      );
      expect(childNode.componentInstance.size()).toBe('large');
      expect(childNode.componentInstance.variant()).toBe('secondary');
    });

    it('should forward events from child nodes', () => {
      let clickedNode: TreeNode | undefined;
      component.nodeClick.subscribe((node: TreeNode) => {
        clickedNode = node;
      });

      const child = createMockNode({ id: 'child-1' });
      const mockNode = createMockNode({ hasChildren: true, children: [child], expanded: true });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      const childNode = fixture.debugElement.query(
        By.css('.tree-node__children-inner > ui-tree-node'),
      );
      childNode.componentInstance.nodeClick.emit(child);

      expect(clickedNode).toBe(child);
    });
  });

  describe('Keyboard Navigation', () => {
    it('should handle Enter key to click node', () => {
      let clickedNode: TreeNode | undefined;
      component.nodeClick.subscribe((node: TreeNode) => {
        clickedNode = node;
      });

      const mockNode = createMockNode();
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      vi.spyOn(event, 'preventDefault');
      vi.spyOn(event, 'stopPropagation');

      component.onKeyDown(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(event.stopPropagation).toHaveBeenCalled();
      expect(clickedNode).toBe(mockNode);
    });

    it('should handle Space key to click node', () => {
      let clickedNode: TreeNode | undefined;
      component.nodeClick.subscribe((node: TreeNode) => {
        clickedNode = node;
      });

      const mockNode = createMockNode();
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: ' ' });
      vi.spyOn(event, 'preventDefault');

      component.onKeyDown(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(clickedNode).toBe(mockNode);
    });

    it('should handle ArrowRight to expand collapsed node', () => {
      const mockNode = createMockNode({ hasChildren: true, expanded: false });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      vi.spyOn(event, 'preventDefault');

      component.onKeyDown(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(component.expanded()).toBe(true);
    });

    it('should not expand on ArrowRight if already expanded', () => {
      let toggleCount = 0;
      component.nodeToggle.subscribe(() => toggleCount++);

      const mockNode = createMockNode({ hasChildren: true, expanded: true });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      component.onKeyDown(event);

      expect(toggleCount).toBe(0);
    });

    it('should handle ArrowLeft to collapse expanded node', () => {
      const mockNode = createMockNode({ hasChildren: true, expanded: true });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      vi.spyOn(event, 'preventDefault');

      component.onKeyDown(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(component.expanded()).toBe(false);
    });

    it('should not collapse on ArrowLeft if already collapsed', () => {
      let toggleCount = 0;
      component.nodeToggle.subscribe(() => toggleCount++);

      const mockNode = createMockNode({ hasChildren: true, expanded: false });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      component.onKeyDown(event);

      expect(toggleCount).toBe(0);
    });

    it('should not handle keyboard events when disabled', () => {
      let clickedNode: TreeNode | undefined;
      component.nodeClick.subscribe((node: TreeNode) => {
        clickedNode = node;
      });

      const mockNode = createMockNode({ disabled: true });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      component.onKeyDown(event);

      expect(clickedNode).toBeUndefined();
    });

    it('should handle asterisk key to expand siblings', () => {
      const sibling1 = createMockNode({ id: 'sibling-1', hasChildren: true, expanded: false });
      const sibling2 = createMockNode({ id: 'sibling-2', hasChildren: true, expanded: false });
      const parent = createMockNode({ id: 'parent', children: [sibling1, sibling2] });
      sibling1.parent = parent;

      fixture.componentRef.setInput('node', sibling1);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: '*' });
      vi.spyOn(event, 'preventDefault');

      component.onKeyDown(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(sibling1.expanded).toBe(true);
      expect(sibling2.expanded).toBe(true);
    });
  });

  describe('Quick Actions', () => {
    it('should pass showQuickActions to node component', () => {
      fixture.componentRef.setInput('node', createMockNode());
      fixture.componentRef.setInput('showQuickActions', true);
      fixture.detectChanges();

      const nodeComponent = fixture.debugElement.query(By.directive(NodeComponent));
      expect(nodeComponent.componentInstance.showQuickActions()).toBe(true);
    });

    it('should pass quickActionsTemplate to node component', () => {
      const mockTemplate = {} as TemplateRef<any>;
      fixture.componentRef.setInput('node', createMockNode());
      fixture.componentRef.setInput('quickActionsTemplate', mockTemplate);
      fixture.detectChanges();

      const nodeComponent = fixture.debugElement.query(By.directive(NodeComponent));
      expect(nodeComponent.componentInstance.quickActionsTemplate()).toBe(mockTemplate);
    });
  });

  describe('Drag and Drop', () => {
    it('should pass draggable to node component', () => {
      fixture.componentRef.setInput('node', createMockNode());
      fixture.componentRef.setInput('draggable', true);
      fixture.detectChanges();

      const nodeComponent = fixture.debugElement.query(By.directive(NodeComponent));
      expect(nodeComponent.componentInstance.draggable()).toBe(true);
    });

    it('should pass dropZone to node component', () => {
      fixture.componentRef.setInput('node', createMockNode());
      fixture.componentRef.setInput('dropZone', true);
      fixture.detectChanges();

      const nodeComponent = fixture.debugElement.query(By.directive(NodeComponent));
      expect(nodeComponent.componentInstance.dropZone()).toBe(true);
    });

    it('should emit dragStart event', () => {
      let emittedEvent: any;
      component.dragStart.subscribe((event: any) => {
        emittedEvent = event;
      });

      const mockNode = createMockNode();
      const dragEvent = new DragEvent('dragstart');
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      component.onDragStart({ node: mockNode, event: dragEvent });

      expect(emittedEvent).toBeDefined();
      expect(emittedEvent.node).toBe(mockNode);
      expect(emittedEvent.event).toBe(dragEvent);
    });

    it('should set draggedNodeId on drag start', () => {
      const mockNode = createMockNode({ id: 'dragged-node' });
      const dragEvent = new DragEvent('dragstart');
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      component.onDragStart({ node: mockNode, event: dragEvent });

      expect(component.draggedNodeId()).toBe('dragged-node');
    });

    it('should emit dragEnd event', () => {
      let emittedEvent: any;
      component.dragEnd.subscribe((event: any) => {
        emittedEvent = event;
      });

      const mockNode = createMockNode();
      const dragEvent = new DragEvent('dragend');
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      component.onDragEnd({ node: mockNode, event: dragEvent });

      expect(emittedEvent).toBeDefined();
      expect(emittedEvent.node).toBe(mockNode);
    });

    it('should clear draggedNodeId on drag end', () => {
      const mockNode = createMockNode({ id: 'dragged-node' });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      component.draggedNodeId.set('dragged-node');
      component.onDragEnd({ node: mockNode, event: new DragEvent('dragend') });

      expect(component.draggedNodeId()).toBeNull();
    });

    it('should emit drop event', () => {
      let emittedEvent: any;
      component.drop.subscribe((event: any) => {
        emittedEvent = event;
      });

      const mockNode = createMockNode();
      const dragEvent = new DragEvent('drop');
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      component.onDrop({ node: mockNode, event: dragEvent, position: 'inside' });

      expect(emittedEvent).toBeDefined();
      expect(emittedEvent.position).toBe('inside');
    });

    it('should emit dragOver event', () => {
      let emittedEvent: any;
      component.dragOver.subscribe((event: any) => {
        emittedEvent = event;
      });

      const mockNode = createMockNode();
      const dragEvent = new DragEvent('dragover');
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      component.onDragOver({ node: mockNode, event: dragEvent, position: 'inside' });

      expect(emittedEvent).toBeDefined();
      expect(emittedEvent.position).toBe('inside');
    });
  });

  describe('Between Elements Drag and Drop', () => {
    it('should handle drag over between elements', () => {
      const mockNode = createMockNode();
      fixture.componentRef.setInput('node', mockNode);
      fixture.componentRef.setInput('dropZone', true);
      fixture.detectChanges();

      const dragEvent = new DragEvent('dragover', { bubbles: true, cancelable: true });
      Object.defineProperty(dragEvent, 'dataTransfer', {
        value: { dropEffect: '' },
        writable: true,
      });
      vi.spyOn(dragEvent, 'preventDefault');
      vi.spyOn(dragEvent, 'stopPropagation');

      component.onBetweenElementsDragOver(dragEvent, mockNode, 'before');

      expect(dragEvent.preventDefault).toHaveBeenCalled();
      expect(dragEvent.stopPropagation).toHaveBeenCalled();
      expect(component.dragOverNodeId()).toBe(mockNode.id);
      expect(component.dragOverPosition()).toBe('before');
    });

    it('should not handle drag over when dropZone is false', () => {
      const mockNode = createMockNode();
      fixture.componentRef.setInput('node', mockNode);
      fixture.componentRef.setInput('dropZone', false);
      fixture.detectChanges();

      const dragEvent = new DragEvent('dragover');
      vi.spyOn(dragEvent, 'preventDefault');

      component.onBetweenElementsDragOver(dragEvent, mockNode, 'before');

      expect(dragEvent.preventDefault).not.toHaveBeenCalled();
      expect(component.dragOverNodeId()).toBeNull();
    });

    it('should not handle drag over when node is disabled', () => {
      const mockNode = createMockNode({ disabled: true });
      fixture.componentRef.setInput('node', mockNode);
      fixture.componentRef.setInput('dropZone', true);
      fixture.detectChanges();

      const dragEvent = new DragEvent('dragover');
      vi.spyOn(dragEvent, 'preventDefault');

      component.onBetweenElementsDragOver(dragEvent, mockNode, 'before');

      expect(dragEvent.preventDefault).not.toHaveBeenCalled();
    });

    it('should not clear drag state on dragleave when relatedTarget is null', () => {
      const mockNode = createMockNode();
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      component.dragOverNodeId.set(mockNode.id);
      component.dragOverPosition.set('before');

      const dragEvent = new DragEvent('dragleave');
      Object.defineProperty(dragEvent, 'relatedTarget', { value: null });
      Object.defineProperty(dragEvent, 'currentTarget', { value: document.createElement('div') });

      component.onBetweenElementsDragLeave(dragEvent);

      expect(component.dragOverNodeId()).toBe(mockNode.id);
      expect(component.dragOverPosition()).toBe('before');
    });

    it('should clear drag state on dragleave when pointer leaves to outside', () => {
      const mockNode = createMockNode();
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      component.dragOverNodeId.set(mockNode.id);
      component.dragOverPosition.set('before');

      const outer = document.createElement('div');
      const inner = document.createElement('div');
      const dragEvent = new DragEvent('dragleave');
      Object.defineProperty(dragEvent, 'relatedTarget', { value: outer });
      Object.defineProperty(dragEvent, 'currentTarget', { value: inner });

      component.onBetweenElementsDragLeave(dragEvent);

      expect(component.dragOverNodeId()).toBeNull();
      expect(component.dragOverPosition()).toBeNull();
    });

    it('should handle drop between elements', () => {
      let emittedEvent: any;
      component.drop.subscribe((event: any) => {
        emittedEvent = event;
      });

      const mockNode = createMockNode();
      fixture.componentRef.setInput('node', mockNode);
      fixture.componentRef.setInput('dropZone', true);
      fixture.detectChanges();

      const dragEvent = new DragEvent('drop', { bubbles: true, cancelable: true });
      vi.spyOn(dragEvent, 'preventDefault');
      vi.spyOn(dragEvent, 'stopPropagation');

      component.onBetweenElementsDrop(dragEvent, mockNode, 'after');

      expect(dragEvent.preventDefault).toHaveBeenCalled();
      expect(dragEvent.stopPropagation).toHaveBeenCalled();
      expect(emittedEvent.position).toBe('after');
      expect(component.dragOverNodeId()).toBeNull();
      expect(component.dragOverPosition()).toBeNull();
    });

    it('should not handle drop when dropZone is false', () => {
      const mockNode = createMockNode();
      fixture.componentRef.setInput('node', mockNode);
      fixture.componentRef.setInput('dropZone', false);
      fixture.detectChanges();

      const dragEvent = new DragEvent('drop');
      vi.spyOn(dragEvent, 'preventDefault');

      component.onBetweenElementsDrop(dragEvent, mockNode, 'before');

      expect(dragEvent.preventDefault).not.toHaveBeenCalled();
    });
  });

  describe('Drop Indicator Logic', () => {
    it('should not render drop indicator for dragged node', () => {
      const mockNode = createMockNode({ id: 'node-1' });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      component.draggedNodeId.set('node-1');

      expect(component.shouldRenderDropIndicator('node-1', 'before')).toBe(false);
    });

    it('should render drop indicator for other nodes', () => {
      const mockNode = createMockNode({ id: 'node-1' });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      component.draggedNodeId.set('node-2');

      expect(component.shouldRenderDropIndicator('node-1', 'before')).toBe(true);
    });

    it('should not render after indicator on node before dragged node', () => {
      const children = [
        createMockNode({ id: 'node-1' }),
        createMockNode({ id: 'node-2' }),
        createMockNode({ id: 'node-3' }),
      ];
      const mockNode = createMockNode({ hasChildren: true, children });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      component.draggedNodeId.set('node-2');

      expect(component.shouldRenderDropIndicator('node-1', 'after')).toBe(false);
    });

    it('should not render before indicator on node after dragged node', () => {
      const children = [
        createMockNode({ id: 'node-1' }),
        createMockNode({ id: 'node-2' }),
        createMockNode({ id: 'node-3' }),
      ];
      const mockNode = createMockNode({ hasChildren: true, children });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      component.draggedNodeId.set('node-2');

      expect(component.shouldRenderDropIndicator('node-3', 'before')).toBe(false);
    });

    it('should show drop indicator when dragging over', () => {
      const mockNode = createMockNode({ id: 'node-1' });
      fixture.componentRef.setInput('node', mockNode);
      fixture.componentRef.setInput('dropZone', true);
      fixture.detectChanges();

      component.dragOverNodeId.set('node-1');
      component.dragOverPosition.set('before');

      expect(component.shouldShowDropIndicator('node-1', 'before')).toBe(true);
    });

    it('should not show drop indicator when not dragging over', () => {
      const mockNode = createMockNode({ id: 'node-1' });
      fixture.componentRef.setInput('node', mockNode);
      fixture.componentRef.setInput('dropZone', true);
      fixture.detectChanges();

      expect(component.shouldShowDropIndicator('node-1', 'before')).toBe(false);
    });

    it('should not show drop indicator when dropZone is false', () => {
      const mockNode = createMockNode({ id: 'node-1' });
      fixture.componentRef.setInput('node', mockNode);
      fixture.componentRef.setInput('dropZone', false);
      fixture.detectChanges();

      component.dragOverNodeId.set('node-1');
      component.dragOverPosition.set('before');

      expect(component.shouldShowDropIndicator('node-1', 'before')).toBe(false);
    });
  });

  describe('ARIA Attributes', () => {
    it('should set role to treeitem', () => {
      fixture.componentRef.setInput('node', createMockNode());
      fixture.detectChanges();

      const treeNode = fixture.debugElement.query(By.css('.tree-node'));
      expect(treeNode.nativeElement.getAttribute('role')).toBe('treeitem');
    });

    it('should set aria-expanded to true when expanded', () => {
      const mockNode = createMockNode({ hasChildren: true, expanded: true });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      const treeNode = fixture.debugElement.query(By.css('.tree-node'));
      expect(treeNode.nativeElement.getAttribute('aria-expanded')).toBe('true');
    });

    it('should set aria-expanded to false when collapsed', () => {
      const mockNode = createMockNode({ hasChildren: true, expanded: false });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      const treeNode = fixture.debugElement.query(By.css('.tree-node'));
      expect(treeNode.nativeElement.getAttribute('aria-expanded')).toBe('false');
    });

    it('should not set aria-expanded for leaf nodes', () => {
      const mockNode = createMockNode({ hasChildren: false });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      const treeNode = fixture.debugElement.query(By.css('.tree-node'));
      expect(treeNode.nativeElement.getAttribute('aria-expanded')).toBeNull();
    });

    it('should set aria-selected when selected', () => {
      const mockNode = createMockNode({ selected: true });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      const treeNode = fixture.debugElement.query(By.css('.tree-node'));
      expect(treeNode.nativeElement.getAttribute('aria-selected')).toBe('true');
    });

    it('should not set aria-selected when not selected', () => {
      const mockNode = createMockNode({ selected: false });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      const treeNode = fixture.debugElement.query(By.css('.tree-node'));
      expect(treeNode.nativeElement.getAttribute('aria-selected')).toBeNull();
    });

    it('should set aria-disabled when disabled', () => {
      const mockNode = createMockNode({ disabled: true });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      const treeNode = fixture.debugElement.query(By.css('.tree-node'));
      expect(treeNode.nativeElement.getAttribute('aria-disabled')).toBe('true');
    });

    it('should set aria-level based on node level', () => {
      const mockNode = createMockNode({ level: 2 });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      const treeNode = fixture.debugElement.query(By.css('.tree-node'));
      expect(treeNode.nativeElement.getAttribute('aria-level')).toBe('3');
    });

    it('should set aria-level to 1 when level is 0', () => {
      const mockNode = createMockNode({ level: 0 });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      const treeNode = fixture.debugElement.query(By.css('.tree-node'));
      expect(treeNode.nativeElement.getAttribute('aria-level')).toBe('1');
    });

    it('should set tabindex to -1', () => {
      fixture.componentRef.setInput('node', createMockNode());
      fixture.detectChanges();

      const treeNode = fixture.debugElement.query(By.css('.tree-node'));
      expect(treeNode.nativeElement.getAttribute('tabindex')).toBe('-1');
    });
  });

  describe('CSS Classes', () => {
    it('should always include base tree-node class', () => {
      fixture.componentRef.setInput('node', createMockNode());
      fixture.detectChanges();

      const classes = component.treeNodeClasses();
      expect(classes).toContain('tree-node');
    });

    it('should include size class', () => {
      fixture.componentRef.setInput('node', createMockNode());
      fixture.componentRef.setInput('size', 'large');
      fixture.detectChanges();

      const classes = component.treeNodeClasses();
      expect(classes).toContain('tree-node--large');
    });
  });

  describe('Effect Synchronization', () => {
    it('should sync expanded state from node input', () => {
      const mockNode = createMockNode({ expanded: false });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      expect(component.expanded()).toBe(false);

      mockNode.expanded = true;
      fixture.componentRef.setInput('node', { ...mockNode });
      fixture.detectChanges();

      expect(component.expanded()).toBe(true);
    });

    it('should handle undefined expanded state', () => {
      const mockNode = createMockNode({ expanded: undefined });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      // Should not throw error and maintain current state
      expect(component.expanded()).toBe(false);
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle deeply nested tree structure', () => {
      const grandchild = createMockNode({ id: 'grandchild', label: 'Grandchild' });
      const child = createMockNode({
        id: 'child',
        label: 'Child',
        hasChildren: true,
        children: [grandchild],
        expanded: true,
      });
      const mockNode = createMockNode({
        id: 'parent',
        label: 'Parent',
        hasChildren: true,
        children: [child],
        expanded: true,
      });

      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      const childNodes = fixture.debugElement.queryAll(By.directive(TreeNodeComponent));
      expect(childNodes.length).toBeGreaterThan(1);
    });

    it('should handle all inputs together', () => {
      const mockNode = createMockNode({ hasChildren: true, expanded: true });
      fixture.componentRef.setInput('node', mockNode);
      fixture.componentRef.setInput('size', 'large');
      fixture.componentRef.setInput('variant', 'secondary');
      fixture.componentRef.setInput('appearance', 'filled');
      fixture.componentRef.setInput('shape', 'circular');
      fixture.componentRef.setInput('showSelectionIndicator', true);
      fixture.componentRef.setInput('indicatorPosition', 'horizontal');
      fixture.componentRef.setInput('chevronPosition', 'after');
      fixture.componentRef.setInput('asButton', true);
      fixture.componentRef.setInput('expandOnClick', true);
      fixture.componentRef.setInput('selectOnClick', false);
      fixture.componentRef.setInput('showQuickActions', true);
      fixture.componentRef.setInput('draggable', true);
      fixture.componentRef.setInput('dropZone', true);
      fixture.detectChanges();

      const nodeComponent = fixture.debugElement.query(By.directive(NodeComponent));
      expect(nodeComponent.componentInstance.size()).toBe('large');
      expect(nodeComponent.componentInstance.variant()).toBe('secondary');
      expect(nodeComponent.componentInstance.appearance()).toBe('filled');
      expect(nodeComponent.componentInstance.shape()).toBe('circular');
      expect(nodeComponent.componentInstance.asButton()).toBe(true);
      expect(nodeComponent.componentInstance.draggable()).toBe(true);
      expect(nodeComponent.componentInstance.dropZone()).toBe(true);
    });

    it('should maintain state consistency after multiple toggles', () => {
      const mockNode = createMockNode({ hasChildren: true, expanded: false });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      for (let i = 0; i < 5; i++) {
        component.toggleNode();
        expect(component.expanded()).toBe(i % 2 === 0);
      }
    });
  });

  describe('Edge Cases', () => {
    it('should handle node with empty label', () => {
      const mockNode = createMockNode({ label: '' });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      const nodeComponent = fixture.debugElement.query(By.directive(NodeComponent));
      expect(nodeComponent.componentInstance.node().label).toBe('');
    });

    it('should handle node without icon', () => {
      const mockNode = createMockNode({ icon: undefined });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      const nodeComponent = fixture.debugElement.query(By.directive(NodeComponent));
      expect(nodeComponent.componentInstance.node().icon).toBeUndefined();
    });

    it('should handle rapid expand/collapse', () => {
      const mockNode = createMockNode({ hasChildren: true });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      component.toggleNode();
      component.toggleNode();
      component.toggleNode();

      expect(component.expanded()).toBe(true);
    });

    it('should handle children array changes', () => {
      const child1 = createMockNode({ id: 'child-1' });
      const mockNode = createMockNode({ hasChildren: true, children: [child1], expanded: true });
      fixture.componentRef.setInput('node', mockNode);
      fixture.detectChanges();

      let childNodes = fixture.debugElement.queryAll(
        By.css('.tree-node__children-inner > ui-tree-node'),
      );
      expect(childNodes.length).toBe(1);

      const child2 = createMockNode({ id: 'child-2' });
      mockNode.children = [child1, child2];
      fixture.componentRef.setInput('node', { ...mockNode });
      fixture.detectChanges();

      childNodes = fixture.debugElement.queryAll(
        By.css('.tree-node__children-inner > ui-tree-node'),
      );
      expect(childNodes.length).toBe(2);
    });
  });
});
