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

export type { MyFeedData, MyFeedEntry, PickedFeedData };
