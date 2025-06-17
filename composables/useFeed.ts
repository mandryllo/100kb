import type {
  Feed,
  Post,
  FeedResults,
  FeedQueryParams
} from '#shared/types';

export function useFeed() {
  const page = ref(1);
  const feed = ref<Post[]>([]);
  const total = ref(0);
  const filterBookmarks = ref(false);
  const filterFavorites = ref(false);
  const isLoading = ref(true);

  const userStore = useUserStore();

  async function fetch() {
    const query: FeedQueryParams = {
      page: page.value,
      filterBlogIds: filterBookmarks.value.toString(),
      filterIds: filterFavorites.value.toString()
    };
    if (filterBookmarks.value) {
      query.blogIds = _filter(Object.keys(userStore.bookmarks), it => userStore.bookmarks[it]);
    }
    if (filterFavorites.value) {
      query.ids = _filter(Object.keys(userStore.favorites), it => userStore.favorites[it]);
    }
    isLoading.value = true;
    const data = await $fetch<FeedResults>('/api/feed', { query });
    isLoading.value = false;
    if (!data) return;
    feed.value = data.items;
    total.value = data.total;
  }

  function updatePage(newPage: number) {
    page.value = newPage;
    fetch();
  }

  function setFilterBookmarks(filter: boolean) {
    filterBookmarks.value = filter;
    updatePage(1);
  }

  function setFilterFavorites(filter: boolean) {
    filterFavorites.value = filter;
    updatePage(1);
  }

  function onPostUpdate(type: 'favorite' | 'bookmark') {
    if (type === 'bookmark' && filterBookmarks.value) updatePage(1);
    if (type === 'favorite' && filterFavorites.value) updatePage(1);
  }

  const groupedFeed = computed<Feed>(() => {
    return _groupBy(feed.value, 'date');
  });

  onMounted(async () => {
    await fetch();
  });

  return {
    page,
    total,
    isLoading,
    filterBookmarks,
    filterFavorites,
    groupedFeed,
    updatePage,
    setFilterBookmarks,
    setFilterFavorites,
    onPostUpdate
  };
}
