import type { FeedEntry, FeedData } from '@extractus/feed-extractor';

type PrefixKeys<T, P extends string> = {
  [K in keyof T as `${P}${Capitalize<string & K>}`]: T[K]
};

type RequiredAllBut<T, K extends keyof T> = Required<Omit<T, K>> & Pick<T, K>;

type PickedFeedData = Pick<FeedData, 'link' | 'title' | 'description'>;
type Blog = RequiredAllBut<PickedFeedData, 'description'> & { id: string };

type PrefixedBlogData = PrefixKeys<Blog, 'blog'>;
type Post = RequiredAllBut<FeedEntry, 'description'> & PrefixedBlogData & { date: string };

type FeedQueryParams = {
  page: number;
  filterIds?: string;
  ids?: string[];
  filterBlogIds?: string;
  blogIds?: string[];
};

type FeedResults = {
  items: Post[];
  total: number;
};

type Feed = {
  [K: string]: Post[];
};

type UserActivity = {
  id: string;
  link: string;
  timestamp: string;
  type: 'READ' | 'VISIT' | 'FAVORITE' | 'UNFAVORITE' | 'BOOKMARK' | 'UNBOOKMARK';
};

type UserStats = {
  [K: string]: number;
};

type UserFavorites = {
  [K: string]: boolean;
};

type UserBookmarks = {
  [K: string]: boolean;
};

export type {
  Blog,
  Post,
  FeedQueryParams,
  FeedResults,
  Feed,
  UserActivity,
  UserStats,
  UserFavorites,
  UserBookmarks
};
