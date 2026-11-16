// Single source for business facts and homepage copy.
// Anything in [SQUARE BRACKETS] is waiting on the client (see docs/homepage-direction.md, "Open items").

// Internal link helper: prefixes the site's base path (e.g. /nami-nursing-website on the GitHub
// Pages test site, nothing on the live domain). Use for every root-relative href.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
export const path = (p: string) => `${BASE}${p}`;

// TEMPORARY free Unsplash stand-ins until Nami supplies real photos (credits: src/assets/stock/CREDITS.md).
// Not Nami staff: alt text describes the scene only.
import stockNurse from '../assets/stock/nurse-checking-blood-pressure.jpg';
import stockCarer from '../assets/stock/carer-helping-older-woman.jpg';

export const site = {
  name: 'Nami Nursing and Support',
  short: 'Nami',
  tagline: 'NDIS support in Sydney, from everyday help to nursing',
  phone: { display: '1300 626 466', href: 'tel:1300626466' },
  email: 'hello@naminursing.com.au',
  // UNVERIFIED: confirm with client and match their Google Business Profile.
  address: 'Level 2, 88 Carella Street, Sydney NSW 2000',
  // Google Map in "Where to find us". For now centred on Sydney (same as the client's Base44 site),
  // because the office address and Business Profile are unconfirmed. Once confirmed, replace with
  // the Business Profile's "Share > Embed a map" src so it pins the listing. Empty = placeholder tile.
  mapEmbedUrl: 'https://maps.google.com/maps?q=Sydney%20NSW&z=11&hl=en&output=embed',
  responseTime: '[RESPONSE TIME]',
  areas: '[SUBURBS OR REGIONS TO CONFIRM WITH CLIENT]',
  abn: '[ABN]',
  acknowledgement: '[ACKNOWLEDGEMENT OF COUNTRY, IF THE CLIENT WANTS ONE]',
  // Photos: swap the stock imports above for Nami's own photos (put files in src/assets/).
  // Set to null to show the dashed placeholder tile instead.
  teamPhoto: { src: stockCarer, alt: 'A support worker holding hands with a smiling older woman as she gets ready to stand' } as null | { src: ImageMetadata; alt: string },
  nursingPhoto: { src: stockNurse, alt: 'A nurse taking an older woman’s blood pressure with a cuff and stethoscope' } as null | { src: ImageMetadata; alt: string },
};

export type Tone = 'coral' | 'yellow' | 'teal' | 'mint' | 'lavender' | 'navy' | 'pale';

export const trustTicks = ['Seven days a week', 'Nursing support 24/7', 'Fully insured'];

export const plans = [
  {
    id: 'self',
    label: 'Self-managed',
    verdict: 'Good news.',
    text: 'Self-managed participants can use Nami today. You pay us and claim it back from your plan.',
    ok: true,
  },
  {
    id: 'plan',
    label: 'Plan-managed',
    verdict: 'Good news.',
    text: 'Plan-managed participants can use Nami today. Your plan manager pays us from your funding.',
    ok: true,
  },
  {
    id: 'ndia',
    label: 'NDIA-managed',
    verdict: 'Not yet, sorry.',
    text: 'NDIA-managed funding can only go to registered providers and we are still working towards registration. Send the message anyway and we will talk you through asking the NDIA to change how your plan is managed.',
    ok: false,
  },
  {
    id: 'unsure',
    label: "I'm not sure",
    verdict: 'That is fine.',
    text: 'It is written in your NDIS plan, or your plan manager or support coordinator will know. We can check together when we call.',
    ok: false,
  },
] as const;

export const reasons: { title: string; text: string; icon: string; tone: Tone }[] = [
  {
    title: 'One team for support and nursing',
    text: 'Clinical care can be added by people who already know you, instead of starting again with a second provider.',
    icon: 'user-group',
    tone: 'coral',
  },
  {
    title: 'A Sydney team',
    text: `We work across Sydney ${site.areas}, so your workers are local and your nurse is not hours away.`,
    icon: 'map-pin',
    tone: 'yellow',
  },
  {
    title: 'Fully insured',
    text: 'We are fully insured and follow the NDIS Practice Standards while we work towards NDIS registration.',
    icon: 'shield-check',
    tone: 'teal',
  },
  {
    title: 'Self-managed and plan-managed welcome',
    text: 'You can use Nami today if your plan is self-managed or plan-managed. NDIA-managed plans are not available yet.',
    icon: 'document-check',
    tone: 'mint',
  },
];

export const everydayServices: { name: string; blurb: string; href: string; icon: string; tone: Tone }[] = [
  {
    name: 'Support Work',
    blurb: 'Help with daily living, social participation and building independence, from a worker matched to your goals.',
    href: path('/services/support-workers/'),
    icon: 'users',
    tone: 'coral',
  },
  {
    name: 'Personal Care',
    blurb: 'Showering, dressing, grooming and toileting, at your pace, with your privacy and comfort first.',
    href: path('/services/personal-care/'),
    icon: 'heart',
    tone: 'yellow',
  },
  {
    name: 'Community Access',
    blurb: 'Outings, appointments, shopping and activities, so you stay connected on your own terms.',
    href: path('/services/community-access/'),
    icon: 'building-storefront',
    tone: 'mint',
  },
  {
    name: 'Transport',
    blurb: 'Safe transport to appointments, work, school and social events, with drivers trained to assist with mobility needs.',
    href: path('/services/transport/'),
    icon: 'map',
    tone: 'lavender',
  },
  {
    name: 'Domestic Assistance',
    blurb: 'Cleaning, laundry and meal preparation, while building the skills to manage what you can yourself.',
    href: path('/services/cleaning-domestic-assistance/'),
    icon: 'home',
    tone: 'navy',
  },
];

export const nursing = {
  name: 'Nursing Services',
  href: path('/services/nursing/'),
  text: 'Registered nurses who work alongside your support team, so clinical care comes from people who already know you.',
  tasks: ['Wound care', 'Medication administration', 'PEG feeding', 'Catheter care', 'Chronic disease management'],
};

export const allServices = [
  ...everydayServices.map(({ name, href }) => ({ name, href })),
  { name: nursing.name, href: nursing.href },
];

// CLIENT TO CONFIRM: copied verbatim from the live Base44 site; must be real and consented before launch.
// The third mentions respite care, which is not an offered service.
export const testimonials = [
  {
    name: 'Margaret T.',
    initials: 'MT',
    role: "Participant's Mother",
    featured: true,
    quote:
      "The team at Nami have been extraordinary. My daughter's support worker genuinely cares about her goals and has helped her gain so much confidence. I finally have peace of mind knowing she's in such good hands.",
  },
  {
    name: 'James W.',
    initials: 'JW',
    role: 'NDIS Participant',
    featured: false,
    quote:
      "From the first phone call I felt heard. They matched me with a support worker who gets me. I'm now attending TAFE and volunteering — things I never thought possible. Couldn't recommend Nami more highly.",
  },
  {
    name: 'Patricia & Robert H.',
    initials: 'PR',
    role: 'Family Carers',
    featured: false,
    quote:
      "The respite care has been a lifeline for our family. The nurses are professional and compassionate, and the communication is excellent. We trust Nami completely with our son's care.",
  },
];

const strong = (t: string) => `<strong>${t}</strong>`;
const callLink = `<a href="${site.phone.href}" class="num" data-track-location="faq">Call ${site.phone.display}</a>`;

// Answers are trusted HTML strings (rendered with set:html) so they stay in the page for crawlers.
export const faqs: { q: string; a: string[]; open?: boolean }[] = [
  {
    q: 'Can I use my NDIS plan with Nami?',
    open: true,
    a: [
      `${strong('Yes, if your plan is self-managed or plan-managed.')} If you self-manage, you pay our invoice and claim it back from your plan. If you have a plan manager, they pay us from your funding.`,
      'If your plan is NDIA-managed, we cannot support you yet. NDIA-managed funding can only go to registered providers and we are still working towards registration. Call us and we will talk you through asking the NDIA to change how your plan is managed.',
    ],
  },
  {
    q: 'Is Nami a registered NDIS provider?',
    a: [
      'Not yet. We are working towards NDIS registration and follow the NDIS Practice Standards in how we deliver care. We are fully insured.',
    ],
  },
  {
    q: 'What services does Nami provide?',
    a: [
      'Six: support work, personal care, community access, transport, domestic assistance and nursing services. Support workers and registered nurses are on the same team, so nursing can be added by people who already know you. <a href="#services">See our services</a>.',
    ],
  },
  {
    q: 'When is support available?',
    a: [
      'Support work, personal care, community access, transport and domestic assistance run seven days a week. Nursing support is available 24 hours a day, seven days a week.',
    ],
  },
  {
    q: 'Which parts of Sydney do you cover?',
    a: [`${site.areas}. If you are not sure whether we reach you, call with your suburb and we will tell you.`],
  },
  {
    q: 'How do I get started?',
    a: [
      `${callLink} or <a href="#start">send the short form</a> at the top of this page. We call you back, usually ${site.responseTime}, to talk through what you need. [NEXT STEPS AFTER THE FIRST CALL, TO CONFIRM WITH CLIENT]`,
    ],
  },
];
