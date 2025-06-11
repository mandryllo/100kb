import type { LinkVisit, UserActivity, UserBookmarks } from '#shared/types';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    disabled: false,
    linkVisits: [] as LinkVisit[],
    userActivity: {} as UserActivity,
    userBookmarks: {} as UserBookmarks,
    userFavorites: {} as UserBookmarks
  }),
  actions: {
    storeLinkVisit({ link, blog }: Omit<LinkVisit, 'timestamp'>) {
      this.linkVisits.push({
        link,
        blog,
        timestamp: (new Date()).toISOString()
      });
      if (link && !this.userActivity[link]) this.userActivity[link] = 0;
      if (!this.userActivity[blog]) this.userActivity[blog] = 0;
      if (link) this.userActivity[link]++;
      this.userActivity[blog]++;
    },
    storeUserBookmark(bookmark: string) {
      this.userBookmarks[bookmark] = !this.userBookmarks[bookmark];
    },
    storeUserFavorite(bookmark: string) {
      this.userFavorites[bookmark] = !this.userFavorites[bookmark];
    },
    enable() {
      this.disabled = false;
    },
    disable() {
      this.disabled = true;
      this.reset();
    },
    reset() {
      this.linkVisits = [];
      this.userActivity = {};
      this.userBookmarks = {};
      this.userFavorites = {};
    }
  },
  getters: {
    orderedLinkVisits(state) {
      return _orderBy(state.linkVisits, 'timestamp', ['desc']);
    }
  },
  persist: {
    storage: piniaPluginPersistedstate.localStorage()
  }
});
