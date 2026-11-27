import { getCollection, type CollectionEntry } from 'astro:content';
import { DEFAULT_LANG } from '../consts';

export type Article = CollectionEntry<'articles'>;

/** URL slug of an article, derived from its file name. */
export function articleSlug(article: Article): string {
  return article.id.split('/').pop() ?? article.id;
}

/** Published (non-draft) articles, newest first, optionally filtered by category. */
export async function getArticles(category?: string): Promise<Article[]> {
  const articles = await getCollection(
    'articles',
    (p) => !p.data.draft && (category === undefined || p.data.category === category),
  );
  return articles.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function formatDate(date: Date, month: 'long' | 'short' = 'long'): string {
  return date.toLocaleDateString(DEFAULT_LANG, { year: 'numeric', month, day: 'numeric' });
}
