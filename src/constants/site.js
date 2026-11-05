// Site data: ids, links, images, stacks and ISO dates only. Every visible word
// lives in src/locales/<lang>/, keyed by the ids below.

// Set to false to hide the Al Rajhi role and its figures.
export const SHOW_AL_RAJHI = true;

// The live site. Language versions are SITE_URL/?lang=<code>; English is the root.
export const SITE_URL = 'https://waelkabouk.com';

export const EMAIL = 'waelkabouk.business@gmail.com';
export const LINKEDIN = 'https://www.linkedin.com/in/waelkabouk/';
export const LINKEDIN_HANDLE = 'in/waelkabouk';
export const GITHUB = 'https://github.com/waelkabouk';
export const GITHUB_HANDLE = 'waelkabouk';
export const PHONE = '+966 571 872 756';
export const PHONE_HREF = 'tel:+966571872756';

export const mailto = (subject, body = '') =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}${
    body ? `&body=${encodeURIComponent(body)}` : ''
  }`;

// Labels: common:nav.<id>
export const navLinks = ['research', 'work', 'experience', 'contact'];

// ---------------------------------------------------------------- research
// Text: content:research.*
export const thesis = {
  paper:
    'https://drive.google.com/file/d/1R-k0rVyTdPN6vgjZaunwp33kpHB1W3i9/view?usp=sharing',
  code: 'https://github.com/waelkabouk/virtual-context-multi-camera-tracking',
  steps: ['cameras', 'frame', 'tracked'],
  cams: [
    { id: 'cam1', src: '/thesis/cam1.jpg' },
    { id: 'cam2', src: '/thesis/cam2.jpg' },
    { id: 'cam3', src: '/thesis/cam3.jpg' },
  ],
};

// ---------------------------------------------------------------- work
// Text: content:work.projects.<id>.{name, kind, summary, alt, caption}
// linkType 'github' reads "Code on GitHub"; 'site' reads "Visit <site>".
// Stack entries are product names; { term } entries are words, from content:work.terms.
const metalWorld = [
  {
    id: 'mwOps',
    stack: ['React', 'TanStack Start', 'Supabase', 'Recharts'],
    image: '/work/mw-oms.webp',
    hasCaption: true,
    rtl: true,
  },
  {
    id: 'mwShop',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Gemini API'],
    image: '/work/mw-site.webp',
    link: 'https://www.metalworld.co/en',
    linkType: 'site',
    site: 'metalworld.co',
  },
];

const openWork = [
  {
    id: 'vehicles',
    stack: ['Python', 'YOLO11', 'OpenCV'],
    image: '/work/vehicles.webp',
    link: 'https://github.com/waelkabouk/virtual-context-multi-camera-tracking',
    linkType: 'github',
  },
  {
    id: 'wtcapital',
    stack: ['Next.js', 'Sanity'],
    image: '/work/wtcapital.webp',
    link: 'https://github.com/waelkabouk/wt-capital',
    linkType: 'github',
  },
  {
    id: 'meezah',
    stack: ['Next.js', 'PostgreSQL'],
    image: '/work/meezah.webp',
    rtl: true,
    link: 'https://www.meezahsa.com/',
    linkType: 'site',
    site: 'meezahsa.com',
  },
  {
    id: 'ordering',
    stack: ['Flutter', 'Express'],
    image: '/work/ordering.webp',
    link: 'https://github.com/waelkabouk/multi-vendor-genie-store-cross-platform',
    linkType: 'github',
  },
  {
    id: 'irrigation',
    stack: ['Arduino', 'GSM', { term: 'sensors' }],
    image: '/work/irrigation.webp',
  },
  {
    id: 'movies',
    stack: ['Spring Boot', 'MongoDB', 'React'],
    image: '/work/movies.webp',
    link: 'https://github.com/waelkabouk/movies_api',
    linkType: 'github',
  },
];

// Six rows at most in the pinned index; the rest go to the plain list.
const ordered = [...(SHOW_AL_RAJHI ? metalWorld : []), ...openWork];
export const workItems = ordered.slice(0, 6);

export const otherProjects = [
  ...ordered.slice(6),
  { id: 'mentalHealth', link: 'https://github.com/mertcd/Mental-Health-Analysis', linkType: 'github' },
  { id: 'tekram', link: 'https://github.com/waelkabouk/tekram_bot', linkType: 'github' },
  { id: 'library', link: 'https://github.com/waelkabouk/kitabi-kitabuk-frontend', linkType: 'github' },
  { id: 'befit', link: 'https://github.com/waelkabouk/befit-control-panel', linkType: 'github' },
];

// ---------------------------------------------------------------- path
// Text: content:path.places.<id>.{place, text, alt, caption}
// end: null means ongoing; no end means a single date.
export const pathPlaces = [
  { id: 'mugla', start: '2019', end: '2023', image: '/world/mugla.jpg' },
  { id: 'sakarya', start: '2023', end: '2025', image: '/world/sakarya.jpg', focus: '40% 60%' },
  { id: 'konya', start: '2025-06', image: '/world/konya.jpg' },
  { id: 'ankara', start: '2025-07', image: '/world/ankara.jpg' },
  { id: 'riyadh', start: '2026', end: null, image: '/world/riyadh.jpg', focus: '45% 30%' },
];

// ---------------------------------------------------------------- CV sheet
// Text: content:cv.roles.<id>.{title, org, points[]}
const alRajhi = { id: 'alRajhi', start: '2026-04', end: null };

export const cvGroups = [
  {
    id: 'industry',
    items: [
      ...(SHOW_AL_RAJHI ? [alRajhi] : []),
      { id: 'innomerx', start: '2023-10', end: null },
      { id: 'kyber', start: '2023-01', end: '2023-06' },
    ],
  },
  {
    id: 'research',
    anchor: 'research-roles', // #research is the thesis section
    items: [
      { id: 'teknofest', start: '2026' },
      { id: 'hsgf', start: '2024', end: null },
      { id: 'thesis', start: '2023-10', end: '2025-09' },
    ],
  },
  {
    id: 'teaching',
    items: [
      { id: 'ssu', start: '2023-10', end: '2024-10' },
      { id: 'youthCenter', start: '2022-10', end: '2023-07' },
    ],
  },
];

// Text: content:cv.education.<id>.{title, org, points[]}
export const education = [
  { id: 'msc', start: '2023', end: '2025' },
  { id: 'bsc', start: '2019', end: '2023' },
];

// Bibliographic data stays as published. Text: content:cv.publications.<id>.{title, venue, location, summary}
export const publications = [
  {
    id: 'vcmt',
    authors: ['W. Kabouk', 'A. Özmen'],
    date: '2025-07',
    pages: '413-429',
    link: 'https://drive.google.com/file/d/1R-k0rVyTdPN6vgjZaunwp33kpHB1W3i9/view?usp=sharing',
  },
  {
    id: 'heart',
    authors: ['W. Kabouk', 'A. N. Alyahya', 'M. M. Alhusseini', 'M. A. Al shabaan'],
    date: '2025-06',
    pages: '30-39',
    link: 'https://drive.google.com/file/d/11c0e87fTO9wfR1WSl8wK66twKOqnDaoC/view',
  },
];

// ---------------------------------------------------------------- skills
// In the order a system runs, from the camera feed to the deployed answer.
// Text: content:skills.groups.<id>.{name, items[]}
export const skillGroups = ['vision', 'ml', 'llm', 'web', 'infra', 'programming'];

// The languages Wael works in, on the CEFR scale. Names come from Intl;
// level labels from content:skills.levels.<level>.
export const CEFR = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
export const spokenLanguages = [
  { code: 'ar', level: 'native', filled: 6 },
  { code: 'en', level: 'C1', filled: 5 },
  { code: 'tr', level: 'B2', filled: 4 },
];

// ---------------------------------------------------------------- credits
// Photo attribution metadata, kept as published on Wikimedia Commons.
export const credits = [
  { title: 'Muğla 9936', by: 'Perencal', licence: 'CC BY-SA 3.0', licenceUrl: 'https://creativecommons.org/licenses/by-sa/3.0', url: 'https://commons.wikimedia.org/wiki/File:Mu%C4%9Fla_9936.JPG' },
  { title: 'Restaurant on Sapanca Lake', by: 'Antoloji', licence: 'CC BY-SA 4.0', licenceUrl: 'https://creativecommons.org/licenses/by-sa/4.0', url: 'https://commons.wikimedia.org/wiki/File:Restaurant_on_Sapanca_Lake.jpg' },
  { title: 'Mevlana Müzesi 03', by: 'Bernard Gagnon', licence: 'CC BY-SA 3.0', licenceUrl: 'https://creativecommons.org/licenses/by-sa/3.0', url: 'https://commons.wikimedia.org/wiki/File:Mevlana_M%C3%BCzesi_03.jpg' },
  { title: 'Ankara Kocatepe Camii', by: 'Uğurgüler06', licence: 'CC BY-SA 4.0', licenceUrl: 'https://creativecommons.org/licenses/by-sa/4.0/', url: 'https://commons.wikimedia.org/w/index.php?curid=43790322' },
  { title: 'Riyadh Skyline', by: 'B.alotaby', licence: 'CC BY-SA 4.0', licenceUrl: 'https://creativecommons.org/licenses/by-sa/4.0', url: 'https://commons.wikimedia.org/wiki/File:Riyadh_Skyline.jpg' },
  { title: 'Night view of City Riyadh', by: 'Jack Soma', licence: 'CC BY 3.0', licenceUrl: 'https://creativecommons.org/licenses/by/3.0/', url: 'https://commons.wikimedia.org/w/index.php?curid=54390563' },
];
