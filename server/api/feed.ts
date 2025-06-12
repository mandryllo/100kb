import filter from 'lodash/filter';
import orderBy from 'lodash/orderBy';
import type { MyFeedEntry, PaginationQuery } from '#shared/types';

const ITEMS_PER_PAGE = 10;

export default defineEventHandler(async (event) => {
  const query: PaginationQuery = getQuery(event);
  let feed = await useStorage().getItem('feed:list') as MyFeedEntry[];
  if (!feed) return [];

  const { page, ids = [], feedIds = [], filterIds, filterFeedIds } = query;
  if (filterFeedIds === 'true') {
    feed = filter(feed, (it: MyFeedEntry) => feedIds.includes(it.feedLink));
  }
  if (filterIds === 'true') {
    feed = filter(feed, (it: MyFeedEntry) => ids.includes(it.id));
  }
  feed = orderBy(feed, 'published', ['desc']);
  const firstIndex = (page - 1) * ITEMS_PER_PAGE;
  const secondIndex = page * ITEMS_PER_PAGE;
  return { items: feed.slice(firstIndex, secondIndex), total: feed.length };
});
