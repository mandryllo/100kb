import { extract } from '@extractus/feed-extractor';
import BLOGS from '#shared/blogs';
import type { MyFeedEntry } from '#shared/types';

export default defineTask({
  meta: {
    name: 'feed',
    description: 'Generate feed!'
  },
  async run() {
    const feed = await Promise.allSettled(BLOGS.map(blog => extract(blog)))
      .then((results) => {
        return results.reduce((acc: MyFeedEntry[], result) => {
          if (result.status === 'fulfilled') {
            const { link, title, published, description, entries } = result.value;
            if (!link || !title || !published || !entries) return acc;
            const feedData = {
              feedLink: link,
              feedTitle: title,
              feedDescription: description,
              feedPublished: published
            };
            entries.forEach((entry) => {
              const { id, link, title, description, published } = entry;
              if (!id || !link || !title || !published) return acc;
              const data: MyFeedEntry = {
                id,
                link,
                title,
                description,
                published,
                date: published.split('T')[0],
                ...feedData
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
    await useStorage().setItem('feed:list', feed);
    return { result: 'success' };
  }
});
