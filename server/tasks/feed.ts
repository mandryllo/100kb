import { extract } from '@extractus/feed-extractor';
import sanitizeHtml from 'sanitize-html';
import type { Post } from '#shared/types';
import BLOGS from '#shared/blogs';

export default defineTask({
  meta: {
    name: 'feed',
    description: 'Generate feed!'
  },
  async run() {
    const storage = useStorage('feed');
    await Promise.allSettled(BLOGS.map(blog => extract(blog)))
      .then((results) => {
        return results.forEach((result) => {
          if (result.status === 'fulfilled') {
            const { link, title, description, entries } = result.value;
            if (!link || !title || !entries) return;
            const blog = {
              blogId: link,
              blogLink: processLink(link),
              blogTitle: title,
              blogDescription: sanitizeHtml(processDescription(description) || '')
            };
            entries.forEach(async (entry) => {
              const { id, link, title, description, published } = entry;
              if (!id || !link || !title || !published) return;
              const date = published.split('T')[0];
              if (date.split('-')[0] !== '2025') return;
              const data: Post = {
                id,
                link,
                title,
                description: addEllipsis(description),
                published,
                date,
                ...blog
              };
              await storage.setItem(data.id, data);
            });
          }
          else {
            console.error(result.reason);
          }
        });
      });
    return { result: 'success' };
  }
});
