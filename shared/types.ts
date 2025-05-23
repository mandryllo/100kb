import type { FeedEntry, FeedData } from '@extractus/feed-extractor';

type PrefixKeys<T, P extends string> = {
  [K in keyof T as `${P}${Capitalize<string & K>}`]: T[K]
};

type PickedFeedData = Pick<FeedData, 'link' | 'title' | 'description' | 'published'>;

type CustomFeedData = PrefixKeys<PickedFeedData, 'feed'>;

type MyFeedEntry = FeedEntry & CustomFeedData & { date: string };

type MyFeedData = {
  [K: string]: MyFeedEntry[];
};

type LinkVisit = {
  link: string;
  blog: string;
  timestamp: string;
};

type UserActivity = {
  [K: string]: number;
};

type UserBookmarks = {
  [K: string]: boolean;
};

export type { MyFeedData, MyFeedEntry, UserActivity, LinkVisit, UserBookmarks };
