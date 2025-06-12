import type {
  MyFeedData,
  MyFeedEntry,
  FeedListResults,
  PaginationQuery
} from '#shared/types';

export function useFeed() {
  const page = ref(1);
  const feed = ref<MyFeedEntry[]>([]);
  const total = ref(0);
  const filterBookmarks = ref(false);
  const filterFavorites = ref(false);

  const userStore = useUserStore();

  async function fetch() {
    const query: PaginationQuery = {
      page: page.value,
      filterFeedIds: filterBookmarks.value.toString(),
      filterIds: filterFavorites.value.toString()
    };
    if (filterBookmarks.value) {
      query.feedIds = _filter(Object.keys(userStore.userBookmarks), it => userStore.userBookmarks[it]);
    }
    if (filterFavorites.value) {
      query.ids = _filter(Object.keys(userStore.userFavorites), it => userStore.userFavorites[it]);
    }
    const data = await $fetch<FeedListResults>('/api/feed', { query });
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

  const groupedFeed = computed<MyFeedData>(() => {
    return _groupBy(feed.value, 'date');
  });

  onMounted(async () => {
    await fetch();
  });

  return {
    page: page,
    total: total,
    filterBookmarks: filterBookmarks,
    filterFavorites: filterFavorites,
    groupedFeed: groupedFeed,
    updatePage,
    setFilterBookmarks,
    setFilterFavorites,
    onPostUpdate
  };
}
