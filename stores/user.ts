import type { LinkVisit, UserActivity, UserBookmarks } from '#shared/types';

export const useUserStore = defineStore('userStore', {
  state: () => ({
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
    }
  },
  persist: {
    storage: piniaPluginPersistedstate.localStorage()
  }
});
