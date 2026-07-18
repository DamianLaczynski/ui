import { findScrollableAncestor, scrollItemIntoContainer } from '../nav/nav-scroll.utils';

export function scrollSelectedCommandPaletteItemIntoView(host: HTMLElement): boolean {
  const selectedItem = host.querySelector(
    '.command-palette__results button[aria-selected="true"]',
  ) as HTMLElement | null;

  if (!selectedItem) {
    return false;
  }

  const scrollContainer =
    (host.querySelector('.command-palette__results') as HTMLElement | null) ??
    findScrollableAncestor(selectedItem) ??
    host;

  scrollItemIntoContainer(selectedItem, scrollContainer);
  return true;
}
