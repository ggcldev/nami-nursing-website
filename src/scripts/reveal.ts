// Marks .reveal / .reveal-pop items .is-visible the first time they scroll into view
// (styles in global.css). Content is only hidden once this has run, so a failed script never
// leaves the page blank. Reduced motion: nothing is hidden or animated.
export function initReveal(): void {
  const items = document.querySelectorAll<HTMLElement>('.reveal, .reveal-pop');
  if (!items.length) return;
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    },
    // Trigger once the item's top is a little above the bottom of the screen.
    { rootMargin: '0px 0px -10% 0px', threshold: 0 },
  );

  items.forEach((el) => io.observe(el));
  document.documentElement.classList.add('reveal-on');
}
