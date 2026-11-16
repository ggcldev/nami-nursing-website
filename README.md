# Nami Nursing and Support website

Astro 7.4.12 static site. The homepage is built from `design/VariationB.dc.html` and `docs/homepage-direction.md` (both kept local, not in this repo).

**Test site:** https://ggcldev.github.io/nami-nursing-website/ is published automatically on every push to `main` (`.github/workflows/deploy.yml`). It is hidden from search engines. Photos are temporary free Unsplash stand-ins (`src/assets/stock/CREDITS.md`), and the contact form shows a "did not send" message until `PUBLIC_FORM_ENDPOINT` is set.

## Commands

| Command           | What it does                                     |
| ----------------- | ------------------------------------------------ |
| `npm install`     | Install dependencies                              |
| `npm run dev`     | Dev server at http://localhost:4321               |
| `npm run build`   | Build the static site to `dist/`                  |
| `npm run preview` | Serve `dist/` locally                             |
| `npm run check`   | Type-check `.astro` and `.ts` files               |

## Where things live

- `src/data/site.ts`: phone, email, address, services, FAQs, testimonials, and every `[PLACEHOLDER]` the client still needs to confirm. Edit copy here, not in the components.
- `src/components/`: one component per homepage section, in page order (`Header`, `Hero` + `EnquiryForm`, `WhyNami`, `Services`, `Testimonials`, `Faq`, `Location`, `ClosingCta`, `Footer`, `MobileCallBar`).
- `src/styles/global.css`: colour tokens, type, buttons, focus rings.
- Fonts: Merriweather and Open Sans, self-hosted through the Astro Fonts API (`astro.config.mjs`).
- Icons: Heroicons v2.2.0 solid (MIT), read from the npm package at build time (`src/components/Icon.astro`).

## Environment (`.env`, see `.env.example`)

- `PUBLIC_FORM_ENDPOINT`: where "Request a call back" posts (multipart POST, must return 2xx). If it's empty, dev pretends the send worked, and a production build shows the "did not send, please call" error instead of claiming success.
- `PUBLIC_GA4_ID`: GA4 measurement ID. Events: `call_click` (with `link_location`), `plan_type_select`, `generate_lead`. No personal data is sent.

## Before launch

- Fill in the placeholders in `src/data/site.ts` and the open items in `docs/homepage-direction.md`.
- Set `mapEmbedUrl` to the Google Business Profile embed once the address is confirmed.
- Set `site` in `astro.config.mjs` to the live domain.
- Pages still to build: the six `/services/...` pages, `/services/`, `/referral/` and `/privacy/` (the homepage links to them).
