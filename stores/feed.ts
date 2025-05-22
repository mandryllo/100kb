import type { MyFeedData, MyFeedEntry } from '#shared/types';

const ITEMS_PER_PAGE = 10;

export const useFeedStore = defineStore('feedStore', {
  state: () => ({
    feed: [] as MyFeedEntry[],
    page: 1,
    total: 0,
    itemsPerPage: ITEMS_PER_PAGE
  }),
  actions: {
    async fetch() {
      const { data } = await useFetch<MyFeedEntry[]>('/api/feed');
      if (data.value) {
        this.feed = _orderBy(data.value, 'published', ['desc']);
        this.total = data.value.length;
      }
    },
    updatePage(page: number) {
      this.page = page;
    }
  },
  getters: {
    itemsOnPage: (state) => {
      const firstIndex = (state.page - 1) * state.itemsPerPage;
      const secondIndex = state.page * state.itemsPerPage;
      const itemsOnPage = state.feed.slice(firstIndex, secondIndex);
      return _groupBy(itemsOnPage, 'date') as MyFeedData;
    }
  }
});
