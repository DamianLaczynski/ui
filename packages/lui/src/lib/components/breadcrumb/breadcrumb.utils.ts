export function isTruncatableBreadcrumbContent(label: string, maxLength: number): boolean {
  return label.length > maxLength;
}

export function truncateBreadcrumbLongName(label: string, maxLength: number): string {
  if (label.length <= maxLength) return label;
  return label.slice(0, maxLength - 3) + '...';
}

export interface PartitionBreadcrumbItemsResult<T> {
  startDisplayedItems: T[];
  overflowItems: T[];
  endDisplayedItems: T[];
}

export function partitionBreadcrumbItems<T>(
  items: T[],
  maxDisplayedItems: number,
): PartitionBreadcrumbItemsResult<T> {
  if (items.length <= maxDisplayedItems) {
    return {
      startDisplayedItems: [...items],
      overflowItems: [],
      endDisplayedItems: [],
    };
  }
  const overflowSlotCount = 1;
  const remaining = maxDisplayedItems - overflowSlotCount;
  const startCount = Math.max(1, Math.floor(remaining / 2));
  const endCount = Math.max(1, remaining - startCount);
  return {
    startDisplayedItems: items.slice(0, startCount),
    overflowItems: items.slice(startCount, items.length - endCount),
    endDisplayedItems: items.slice(-endCount),
  };
}
