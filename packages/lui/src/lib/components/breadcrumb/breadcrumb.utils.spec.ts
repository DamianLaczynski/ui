/// <reference types="vitest/globals" />
import {
  isTruncatableBreadcrumbContent,
  truncateBreadcrumbLongName,
  partitionBreadcrumbItems,
} from './breadcrumb.utils';

describe('breadcrumb.utils', () => {
  describe('isTruncatableBreadcrumbContent', () => {
    it('should return true when label exceeds maxLength', () => {
      expect(isTruncatableBreadcrumbContent('Hello World', 5)).toBe(true);
      expect(isTruncatableBreadcrumbContent('Test', 3)).toBe(true);
    });

    it('should return false when label is within maxLength', () => {
      expect(isTruncatableBreadcrumbContent('Hi', 5)).toBe(false);
      expect(isTruncatableBreadcrumbContent('Test', 4)).toBe(false);
    });
  });

  describe('truncateBreadcrumbLongName', () => {
    it('should truncate long labels with ellipsis', () => {
      expect(truncateBreadcrumbLongName('Hello World', 8)).toBe('Hello...');
      expect(truncateBreadcrumbLongName('Very long label', 10)).toBe('Very lo...');
    });

    it('should return full label when within maxLength', () => {
      expect(truncateBreadcrumbLongName('Hi', 10)).toBe('Hi');
      expect(truncateBreadcrumbLongName('Test', 4)).toBe('Test');
    });
  });

  describe('partitionBreadcrumbItems', () => {
    it('should return all items when length <= maxDisplayedItems', () => {
      const items = [1, 2, 3];
      const result = partitionBreadcrumbItems(items, 5);
      expect(result.startDisplayedItems).toEqual([1, 2, 3]);
      expect(result.overflowItems).toEqual([]);
      expect(result.endDisplayedItems).toEqual([]);
    });

    it('should partition when length > maxDisplayedItems', () => {
      const items = [1, 2, 3, 4, 5, 6, 7, 8];
      const result = partitionBreadcrumbItems(items, 5);
      expect(result.startDisplayedItems.length).toBeGreaterThan(0);
      expect(result.overflowItems.length).toBeGreaterThan(0);
      expect(result.endDisplayedItems.length).toBeGreaterThan(0);
    });

    it('should preserve item order in partition', () => {
      const items = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
      const result = partitionBreadcrumbItems(items, 4);
      expect(result.startDisplayedItems[0]).toBe('a');
      expect(result.endDisplayedItems[result.endDisplayedItems.length - 1]).toBe('g');
    });
  });
});
