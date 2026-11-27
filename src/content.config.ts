import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORY_SLUGS } from './consts';

// Articles live in src/content/articles/<category>/<slug>/index.md (photos alongside)
// or src/content/articles/<category>/<slug>.md
const articles = defineCollection({
  loader: glob({ base: './src/content/articles', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      category: z.enum(CATEGORY_SLUGS),
      // Path relative to the Markdown file, e.g. ./cover.jpg. Falls back to the placeholder.
      image: image().optional(),
      imageAlt: z.string().default(''),
      draft: z.boolean().default(false),
      // Links shown after the article, as <category>/<slug> (e.g. cycling-bike-fit/my-article).
      next: reference('articles').optional(),
      related: z.array(reference('articles')).default([]),
    }),
});

export const collections = { articles };
