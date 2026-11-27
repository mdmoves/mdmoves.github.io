/** Prefixes a root-relative path with the configured base path (e.g. for GitHub Pages project sites). */
export function withBase(path: string): string {
  if (/^[a-z][a-z0-9+.-]*:/i.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  return `${base}/${path.replace(/^\/+/, '')}`;
}

export function categoryHref(category: string): string {
  return `/articles/${category}/`;
}

export function articleHref(category: string, slug: string): string {
  return `/articles/${category}/${slug}/`;
}

/** A breadcrumb entry (also the shape of nav items in consts.ts). */
export interface Crumb {
  title: string;
  href: string;
}

export function categoryCrumb(category: { slug: string; title: string }): Crumb {
  return { title: category.title, href: categoryHref(category.slug) };
}
