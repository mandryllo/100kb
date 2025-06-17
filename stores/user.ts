import type {
  UserActivity,
  UserBookmarks,
  UserFavorites,
  UserStats
} from '#shared/types';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    disabled: false,
    activity: [] as UserActivity[],
    stats: {} as UserStats,
    bookmarks: {} as UserBookmarks,
    favorites: {} as UserFavorites
  }),
  actions: {
    readPost(id: string, link: string) {
      this.storeActivity({ id, link, type: 'READ' });
      this.storeStats(id);
    },
    visitBlog(id: string, link: string) {
      this.storeActivity({ id, link, type: 'VISIT' });
      this.storeStats(id);
    },
    toggleFavorite(id: string, link: string) {
      const isFavorited = !this.favorites[id];
      const type = isFavorited ? 'FAVORITE' : 'UNFAVORITE';
      this.storeActivity({ id, link, type });
      this.favorites[id] = isFavorited;
    },
    toggleBookmark(id: string, link: string) {
      const isBookmarked = !this.bookmarks[id];
      const type = isBookmarked ? 'BOOKMARK' : 'UNBOOKMARK';
      this.storeActivity({ id, link, type });
      this.bookmarks[id] = isBookmarked;
    },
    storeActivity({ id, link, type }: Omit<UserActivity, 'timestamp'>) {
      this.activity.push({
        id,
        link,
        type,
        timestamp: (new Date()).toISOString()
      });
    },
    storeStats(id: string) {
      if (!this.stats[id]) this.stats[id] = 0;
      this.stats[id]++;
    },
    enable() {
      this.disabled = false;
    },
    disable() {
      this.disabled = true;
      this.reset();
    },
    reset() {
      this.activity = [];
      this.stats = {};
      this.bookmarks = {};
      this.favorites = {};
    }
  },
  getters: {
    orderedActivity(state) {
      return _orderBy(state.activity, 'timestamp', ['desc']);
    }
  },
  persist: {
    storage: piniaPluginPersistedstate.localStorage()
  }
});
