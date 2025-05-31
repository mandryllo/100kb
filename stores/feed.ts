import type { MyFeedData, MyFeedEntry } from '#shared/types';

const ITEMS_PER_PAGE = 10;

export const useFeedStore = defineStore('feedStore', {
  state: () => ({
    feed: [] as MyFeedEntry[],
    page: 1,
    itemsPerPage: ITEMS_PER_PAGE,
    filterBookmarks: false
  }),
  actions: {
    async fetch() {
      const { data } = await useFetch<MyFeedEntry[]>('/api/feed');
      if (data.value) this.feed = _orderBy(data.value, 'published', ['desc']);
    },
    updatePage(page: number) {
      this.page = page;
    },
    setFilterBookmarks(filterBookmarks: boolean) {
      this.filterBookmarks = filterBookmarks;
    }
  },
  getters: {
    filteredFeed(state) {
      if (!state.filterBookmarks) return state.feed;
      const userStore = useUserStore();
      return _filter(state.feed, (it: MyFeedEntry) => {
        return it.feedLink && userStore.userBookmarks[it.feedLink];
      });
    },
    totalItems(): number {
      return this.filteredFeed.length;
    },
    itemsOnPage(state): MyFeedData {
      const firstIndex = (state.page - 1) * state.itemsPerPage;
      const secondIndex = state.page * state.itemsPerPage;
      const itemsOnPage = this.filteredFeed.slice(firstIndex, secondIndex);
      return _groupBy(itemsOnPage, 'date') as MyFeedData;
    }
  }
});
