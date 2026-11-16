// GA4 event helper. Sends nothing personal: no names, phone numbers or health details.
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: string, params: Record<string, string> = {}): void {
  if (typeof window.gtag === 'function') {
    window.gtag('event', event, params);
  } else {
    (window.dataLayer ||= []).push({ event, ...params });
  }
}

// Every tel: link reports a call click with where it sits on the page
// (the nearest data-track-location: header, hero, services, location, cta, mobile_bar, ...).
export function initCallTracking(): void {
  document.addEventListener('click', (e) => {
    const link = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="tel:"]');
    if (!link) return;
    const where = link.closest<HTMLElement>('[data-track-location]')?.dataset.trackLocation ?? 'other';
    track('call_click', { link_location: where });
  });
}
