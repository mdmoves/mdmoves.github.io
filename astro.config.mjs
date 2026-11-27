// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import markdownImages from './src/plugins/markdown-images.mjs';
import { IMAGE_WIDTHS } from './src/consts';

const base = process.env.BASE_PATH || '/';

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL,
  base,
  image: {
    // Responsive srcset/sizes for optimized images (widths are set in src/consts.ts).
    layout: 'constrained',
  },
  markdown: {
    processor: satteri({
      hastPlugins: [markdownImages({ base, widths: IMAGE_WIDTHS.article })],
    }),
  },
});
