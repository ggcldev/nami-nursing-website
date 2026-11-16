// Closing reveal (see .reveal-end in global.css): the CTA waits behind "Where to find us".
// If keyboard focus lands on a CTA control while it is still covered, scroll just enough to
// uncover it. The browser can't do this itself for content inside a pinned (sticky) element.
export function initRevealEnd(): void {
  const wrap = document.querySelector<HTMLElement>('.reveal-end');
  const cover = wrap?.querySelector<HTMLElement>(':scope > #location');
  const cta = wrap?.querySelector<HTMLElement>(':scope > section.cta');
  if (!wrap || !cover || !cta) return;

  cta.addEventListener('focusin', (e) => {
    if (getComputedStyle(cta).position !== 'sticky') return;
    const el = e.target as Element;
    const hiddenBy = cover.getBoundingClientRect().bottom - el.getBoundingClientRect().top;
    if (hiddenBy > -8) window.scrollBy({ top: hiddenBy + 24, behavior: 'auto' });
  });
}
