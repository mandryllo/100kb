import filter from 'lodash/filter';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import type { Post, FeedQueryParams } from '#shared/types';

const ITEMS_PER_PAGE = 10;

export default defineEventHandler(async (event) => {
  const query: FeedQueryParams = getQuery(event);
  const storage = useStorage('feed');
  const keys = await storage.getKeys();
  const items = await storage.getItems(keys);
  let feed = map(items, 'value') as Post[];
  if (!feed) return [];

  const { page, ids = [], blogIds = [], filterIds, filterBlogIds } = query;
  if (filterBlogIds === 'true') {
    feed = filter(feed, (it: Post) => blogIds.includes(it.blogId));
  }
  if (filterIds === 'true') {
    feed = filter(feed, (it: Post) => ids.includes(it.id));
  }
  feed = orderBy(feed, 'published', ['desc']);
  const firstIndex = (page - 1) * ITEMS_PER_PAGE;
  const secondIndex = page * ITEMS_PER_PAGE;
  return { items: feed.slice(firstIndex, secondIndex), total: feed.length };
});
