/**
 * Sätteri hast plugins for images in article bodies:
 * - Root-relative image paths (files in public/) are prefixed with the site base path.
 * - Local images (next to the Markdown file) are optimized at the given `widths` (largest = cap).
 * - A standalone image with a title, e.g. ![Alt](./img.jpg "Caption"), is wrapped in
 *   <figure> with the title rendered as <figcaption>.
 *
 * @param {{ base?: string, widths: number[] }} options
 */
export default function markdownImages({ base = '/', widths }) {
  const prefix = base.replace(/\/+$/, '');
  const maxWidth = Math.max(...widths);

  const baseImages = {
    name: 'base-images',
    element: {
      filter: ['img'],
      visit(node, ctx) {
        const src = node.properties?.src;
        if (typeof src !== 'string') return;
        if (ctx.data.astro?.localImagePaths.has(decodeURI(src))) {
          if (!('width' in node.properties) && !('height' in node.properties)) {
            ctx.setProperty(node, 'width', maxWidth);
            ctx.setProperty(node, 'widths', widths);
          }
          return;
        }
        if (prefix && src.startsWith('/') && !src.startsWith('//') && !src.startsWith(`${prefix}/`)) {
          ctx.setProperty(node, 'src', `${prefix}${src}`);
        }
      },
    },
  };

  const figures = {
    name: 'figure-captions',
    element: {
      filter: ['p'],
      visit(node) {
        const content = node.children.filter((c) => !(c.type === 'text' && !c.value.trim()));
        const [img] = content;
        if (content.length !== 1 || img.type !== 'element' || img.tagName !== 'img') return;

        const caption = img.properties?.title;
        if (typeof caption !== 'string' || !caption.trim()) return;

        const image = structuredClone(img);
        delete image.properties.title;
        return {
          type: 'element',
          tagName: 'figure',
          properties: {},
          children: [
            image,
            {
              type: 'element',
              tagName: 'figcaption',
              properties: {},
              children: [{ type: 'text', value: caption }],
            },
          ],
        };
      },
    },
  };

  return [baseImages, figures];
}
