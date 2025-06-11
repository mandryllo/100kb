import filter from 'lodash/filter';
import orderBy from 'lodash/orderBy';
import type { MyFeedEntry, PaginationQuery } from '#shared/types';

const ITEMS_PER_PAGE = 10;

export default defineEventHandler(async (event) => {
  const query: PaginationQuery = getQuery(event);
  let feed = await useStorage().getItem('feed:list') as MyFeedEntry[];
  if (!feed) return [];

  const { page, ids, feedIds, filterIds, filterFeedIds } = query;
  if (filterIds === 'true' && ids && ids.length) {
    feed = filter(feed, (it: MyFeedEntry) => ids.includes(it.id));
  }
  if (filterFeedIds === 'true' && feedIds && feedIds.length) {
    feed = filter(feed, (it: MyFeedEntry) => feedIds.includes(it.feedLink));
  }
  feed = orderBy(feed, 'published', ['desc']);
  const firstIndex = (page - 1) * ITEMS_PER_PAGE;
  const secondIndex = page * ITEMS_PER_PAGE;
  return { items: feed.slice(firstIndex, secondIndex), total: feed.length };
});
