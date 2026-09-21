import { FocusEvent, PointerEvent, useRef } from 'react';

import { HeaderLink } from '@/components/header-link';
import { Routes } from '@/lib/routes';

const NAV_LINKS = [
  { href: Routes.Home(), text: 'Home' },
  { href: Routes.Blog(), text: 'Blog' },
  { href: Routes.About(), text: 'About' },
  { href: Routes.Dashboard(), text: 'Dashboard' },
  { href: Routes.Snippets(), text: 'Snippets' },
  { href: Routes.Bookmarks(), text: 'Bookmarks' },
];

export function HeaderNav() {
  const navRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);

  function showHighlight(target: EventTarget) {
    const nav = navRef.current;
    const highlight = highlightRef.current;

    if (!nav || !highlight || !(target instanceof Element)) return;

    const link = target.closest('a');

    if (!link || !nav.contains(link)) return;

    const linkBox = link.getBoundingClientRect();
    const navBox = nav.getBoundingClientRect();
    const isHidden = highlight.style.opacity !== '1';

    if (isHidden) highlight.style.transitionProperty = 'opacity';

    highlight.style.transform = `translate3d(${linkBox.left - navBox.left}px, ${linkBox.top - navBox.top}px, 0)`;
    highlight.style.width = `${linkBox.width}px`;
    highlight.style.height = `${linkBox.height}px`;
    highlight.style.opacity = '1';

    if (isHidden) {
      // Forced reflow: commits the jump so only opacity animates on appear.
      highlight.getBoundingClientRect();
      highlight.style.transitionProperty = '';
    }
  }

  function hideHighlight() {
    const highlight = highlightRef.current;

    if (highlight) highlight.style.opacity = '0';
  }

  function handlePointerOver(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'touch') return;

    showHighlight(event.target);
  }

  function handleFocus(event: FocusEvent<HTMLDivElement>) {
    showHighlight(event.target);
  }

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (event.relatedTarget && navRef.current?.contains(event.relatedTarget)) {
      return;
    }

    hideHighlight();
  }

  return (
    <div
      ref={navRef}
      className="relative hidden md:inline-block"
      onPointerOver={handlePointerOver}
      onPointerLeave={hideHighlight}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <span
        ref={highlightRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 rounded-lg bg-gray-200 opacity-0 transition-[transform,width,height,opacity] duration-300 ease-out-expo dark:bg-gray-800"
      />
      {NAV_LINKS.map((link) => (
        <HeaderLink key={link.href} href={link.href} text={link.text} />
      ))}
    </div>
  );
}
