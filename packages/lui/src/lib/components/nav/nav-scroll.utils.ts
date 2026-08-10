const SCROLLABLE_OVERFLOW_VALUES = new Set(['auto', 'scroll', 'overlay']);

export function findScrollableAncestor(element: HTMLElement): HTMLElement | null {
  let current = element.parentElement;

  while (current) {
    const styles = window.getComputedStyle(current);
    const canScrollY = current.scrollHeight > current.clientHeight;
    if (SCROLLABLE_OVERFLOW_VALUES.has(styles.overflowY) && canScrollY) {
      return current;
    }
    current = current.parentElement;
  }

  return null;
}

export function scrollItemIntoContainer(item: HTMLElement, container: HTMLElement): void {
  const itemRect = item.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  const isAbove = itemRect.top < containerRect.top;
  const isBelow = itemRect.bottom > containerRect.bottom;

  if (!isAbove && !isBelow) {
    return;
  }

  const itemTopInContainer = itemRect.top - containerRect.top + container.scrollTop;
  const targetTop = itemTopInContainer - (container.clientHeight / 2 - itemRect.height / 2);
  container.scrollTo({ top: Math.max(0, targetTop), behavior: 'auto' });
}

export function scrollSelectedNavItemIntoView(host: HTMLElement): boolean {
  const selectedItem = host.querySelector('.tree-node[aria-selected="true"]') as HTMLElement | null;
  if (!selectedItem) {
    return false;
  }

  const scrollContainer = findScrollableAncestor(selectedItem) ?? host;
  scrollItemIntoContainer(selectedItem, scrollContainer);
  return true;
}
