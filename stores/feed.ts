import type { MyFeedData, MyFeedEntry, FeedListResults } from '#shared/types';

const ITEMS_PER_PAGE = 10;

export const useFeedStore = defineStore('feedStore', {
  state: () => ({
    feed: [] as MyFeedEntry[],
    total: 0,
    page: 1,
    itemsPerPage: ITEMS_PER_PAGE,
    filterBookmarks: false,
    filterFavorites: false
  }),
  actions: {
    async fetch() {
      const { data } = await useFetch<FeedListResults>(
        '/api/feed',
        { query: { page: this.page } }
      );
      if (!data.value) return;
      this.feed = data.value.items;
      this.total = data.value.total;
    },
    updatePage(page: number) {
      this.page = page;
    },
    setFilterBookmarks(filterBookmarks: boolean) {
      this.filterBookmarks = filterBookmarks;
    },
    setFilterFavorites(filterFavorites: boolean) {
      this.filterFavorites = filterFavorites;
    }
  },
  getters: {
    filteredFeed(state) {
      if (!state.filterBookmarks && !state.filterFavorites) return state.feed;
      const userStore = useUserStore();
      return _filter(state.feed, (it: MyFeedEntry) => {
        const cond = [];
        if (state.filterBookmarks) cond.push(it.feedLink);
        if (state.filterFavorites) cond.push(it.link);
        return cond.every(it => userStore.userBookmarks[it]);
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
