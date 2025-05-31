import type { FeedEntry, FeedData } from '@extractus/feed-extractor';

type PrefixKeys<T, P extends string> = {
  [K in keyof T as `${P}${Capitalize<string & K>}`]: T[K]
};

type RequiredAllButOne<T, K extends keyof T> = Required<Omit<T, K>> & Pick<T, K>;

type PickedFeedData = Pick<FeedData, 'link' | 'title' | 'description' | 'published'>;

type CustomFeedData = PrefixKeys<RequiredAllButOne<PickedFeedData, 'description'>, 'feed'>;

type MyFeedEntry = RequiredAllButOne<FeedEntry, 'description'> & CustomFeedData & { date: string };

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
