export const SITE_NAME = 'Fitness 2.0';
export const SITE_DESCRIPTION = '';
export const DEFAULT_LANG = 'en';

export const CATEGORIES = [
  { slug: 'cycling-bike-fit', title: 'Cycling & Bike Fit' },
  { slug: 'miscellanea', title: 'Miscellanea' },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]['slug'];

export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug) as [CategorySlug, ...CategorySlug[]];

export const PAGES = {
  home: { title: 'Home', href: '/' },
  manifesto: { title: 'Manifesto', href: '/manifesto/' },
  world: { title: 'World', href: '/world/' },
  about: { title: 'About Me', href: '/about/' },
  articles: { title: 'Articles', href: '/articles/' },
  contacts: { title: 'Contacts', href: '/contacts/' },
} as const;

export const NAV_ITEMS = [PAGES.manifesto, PAGES.world, PAGES.about, PAGES.articles, PAGES.contacts];

export const PLACEHOLDER_IMAGE = '/placeholder.jpg';

/** Generated image widths (px). `article` also applies to images in article bodies. */
export const IMAGE_WIDTHS = {
  card: [400, 800],
  article: [640, 960, 1408],
};

export const UI = {
  underConstruction: 'Website under construction',
  noArticles: 'No articles yet.',
  breadcrumbLabel: 'Breadcrumb',
  mainNavLabel: 'Main navigation',
  toggleMenu: 'Toggle menu',
  publishedOn: 'Published on',
  updatedOn: 'Updated on',
  keepReading: 'Keep reading',
  relatedArticles: 'Related articles',
  filterLabel: 'Find articles',
  filterPlaceholder: 'Find articles…',
  sortLabel: 'Sort by',
  noMatchingArticles: 'No articles match your filter.',
} as const;

/** Sort options on category pages. The first one is the default (server-rendered) order. */
export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'title-asc', label: 'Title A–Z' },
  { value: 'title-desc', label: 'Title Z–A' },
  { value: 'updated', label: 'Recently updated' },
] as const;
