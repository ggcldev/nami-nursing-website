// Hero "cover" effect: the hero stays put while the next section slides over it.
// The hero is often taller than the screen (the form), so it pins when its BOTTOM reaches the
// bottom of the viewport: top = min(0, viewport height - hero height).
// Also keeps links and keyboard focus that target the hero working while it's covered.

export function initHeroCover(): void {
  const root = document.documentElement;
  const wrap = document.querySelector<HTMLElement>('.cover');
  const hero = wrap?.querySelector<HTMLElement>(':scope > .hero');
  const sheet = wrap?.querySelector<HTMLElement>(':scope > .hero ~ section');
  if (!wrap || !hero || !sheet) return;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const headerH = () => document.querySelector('.site-header')?.getBoundingClientRect().height ?? 0;

  const layout = () => {
    if (reduce.matches) {
      root.classList.remove('has-cover');
      return;
    }
    // The hero starts at the very top of the page (under the sticky header), so it never needs
    // pushing down: pin at 0, or higher if it is taller than the screen.
    const top = Math.min(0, window.innerHeight - hero.offsetHeight);
    wrap.style.setProperty('--hero-top', `${Math.round(top)}px`);
    root.classList.add('has-cover');
  };

  // Pause the floating shapes once the hero is fully hidden (saves battery).
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const covered = root.classList.contains('has-cover') && sheet.getBoundingClientRect().top <= headerH() + 1;
      hero.classList.toggle('is-covered', covered);
      ticking = false;
    });
  };

  layout();
  onScroll();
  new ResizeObserver(layout).observe(hero);
  window.addEventListener('resize', layout);
  reduce.addEventListener('change', layout);
  window.addEventListener('scroll', onScroll, { passive: true });

  // Where an element inside the hero sits in normal page flow (ignoring the pinning).
  const naturalTop = (el: Element) =>
    wrap.getBoundingClientRect().top + window.scrollY + (el.getBoundingClientRect().top - hero.getBoundingClientRect().top);

  const scrollToInHero = (el: Element, smooth: boolean) => {
    const heroStart = wrap.getBoundingClientRect().top + window.scrollY;
    const lastUncovered = heroStart + Math.max(0, hero.offsetHeight - window.innerHeight);
    const y = Math.min(naturalTop(el) - headerH() - 16, lastUncovered);
    window.scrollTo({ top: Math.max(0, y), behavior: smooth && !reduce.matches ? 'smooth' : 'auto' });
  };

  const isHidden = (el: Element) => sheet.getBoundingClientRect().top < el.getBoundingClientRect().bottom;

  // In-page links into the hero (#start, #top): the browser can't compute a target inside a
  // pinned element, so scroll there ourselves.
  document.addEventListener('click', (e) => {
    const link = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
    const id = link?.getAttribute('href')?.slice(1);
    if (!link || !id || !root.classList.contains('has-cover')) return;
    const target = document.getElementById(id);
    if (!target || !hero.contains(target)) return;
    e.preventDefault();
    history.pushState(null, '', `#${id}`);
    scrollToInHero(target, true);
  });

  // Keyboard users tabbing back into the hero while it's covered: bring it into view.
  hero.addEventListener('focusin', (e) => {
    const el = e.target as Element;
    if (root.classList.contains('has-cover') && isHidden(el)) scrollToInHero(el, false);
  });
}
