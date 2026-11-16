// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // Live domain by default. The GitHub Pages test build sets SITE_URL + BASE_PATH
  // (see .github/workflows/deploy.yml) so it works at ggcldev.github.io/nami-nursing-website/.
  site: process.env.SITE_URL || 'https://www.naminursing.com.au',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',

  // Self-hosted web fonts via the Astro Fonts API (files are downloaded at build time
  // and served from this site, so visitors never hit Google's servers).
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Merriweather',
      cssVariable: '--font-serif',
      weights: [700, 900],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Georgia', 'serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Open Sans',
      cssVariable: '--font-sans',
      weights: [400, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],
});
