import type { LinkVisit, UserActivity, UserBookmarks } from '#shared/types';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    linkVisits: [] as LinkVisit[],
    userActivity: {} as UserActivity,
    userBookmarks: {} as UserBookmarks
  }),
  actions: {
    storeLinkVisit({ link, blog }: Omit<LinkVisit, 'timestamp'>) {
      this.linkVisits.push({
        link,
        blog,
        timestamp: (new Date()).toISOString()
      });
      if (!this.userActivity[link]) this.userActivity[link] = 0;
      if (!this.userActivity[blog]) this.userActivity[blog] = 0;
      this.userActivity[link]++;
      this.userActivity[blog]++;
    },
    storeUserBookmark(bookmark: string) {
      this.userBookmarks[bookmark] = !this.userBookmarks[bookmark];
    }
  },
  persist: {
    storage: piniaPluginPersistedstate.localStorage()
  }
});
