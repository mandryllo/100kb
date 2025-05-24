import { extract } from '@extractus/feed-extractor';
import BLOGS from '../utils/blogs';
import type { MyFeedEntry } from '#shared/types';

export default defineTask({
  meta: {
    name: 'feed',
    description: 'Generate feed!'
  },
  async run() {
    const feed = await Promise.allSettled(BLOGS.map(url => extract(url))).then((results) => {
      return results.reduce((acc: MyFeedEntry[], result) => {
        if (result.status === 'fulfilled') {
          if (!result.value.entries) return acc;
          result.value.entries.forEach((entry) => {
            if (!entry.link || !entry.title || !entry.published) return acc;
            const date = entry.published.split('T')[0];
            const data: MyFeedEntry = {
              ...entry,
              date,
              feedLink: result.value.link,
              feedTitle: result.value.title,
              feedDescription: result.value.description,
              feedPublished: result.value.published
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
