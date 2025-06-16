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
    const feed = await Promise.allSettled(BLOGS.map(blog => extract(blog)))
      .then((results) => {
        return results.reduce((acc: Post[], result) => {
          if (result.status === 'fulfilled') {
            const { link, title, description, entries } = result.value;
            if (!link || !title || !entries) return acc;
            const blog = {
              blogId: link,
              blogLink: processLink(link),
              blogTitle: title,
              blogDescription: sanitizeHtml(processDescription(description) || '')
            };
            entries.forEach((entry) => {
              const { id, link, title, description, published } = entry;
              if (!id || !link || !title || !published) return acc;
              const date = published.split('T')[0];
              if (date.split('-')[0] !== '2025') return acc;
              const data: Post = {
                id,
                link,
                title,
                description: addEllipsis(description),
                published,
                date,
                ...blog
              };
              acc.push(data);
            });
          }
          else {
            console.error(result.reason);
          }
          return acc;
        }, []);
      });
    await useStorage().setItem('feed', feed);
    return { result: 'success' };
  }
});
