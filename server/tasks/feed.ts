import { extract } from '@extractus/feed-extractor';
import sanitizeHtml from 'sanitize-html';
import BLOGS from '#shared/blogs';
import type { MyFeedEntry } from '#shared/types';

const processDescription = (description: string | undefined) => {
  if (description === 'undefined') return;
  return description;
};

const addEllipsis = (text: string | undefined) => {
  if (!text) return;
  if (['?', '!', '.'].some(mark => text.endsWith(mark))) return text;
  return `${text}...`;
};

const processLink = (link: string) => {
  const url = new URL(link);
  if (['atom', 'xml'].some(it => url.pathname.endsWith(it))) return url.origin;
  return link;
};

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
            if (!link || !title || !entries) return acc;
            const feedData = {
              feedLink: processLink(link),
              feedTitle: title,
              feedDescription: sanitizeHtml(processDescription(description) || ''),
              feedPublished: published
            };
            entries.forEach((entry) => {
              const { id, link, title, description, published } = entry;
              if (!id || !link || !title || !published) return acc;
              const date = published.split('T')[0];
              if (date.split('-')[0] !== '2025') return acc;
              const data: MyFeedEntry = {
                id,
                link,
                title,
                description: addEllipsis(description),
                published,
                date,
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
