<script setup lang="ts">
import type {
  MyFeedData,
  MyFeedEntry,
  FeedListResults,
  PaginationQuery
} from '#shared/types';

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
  fetch();
}

function setFilterFavorites(filter: boolean) {
  filterFavorites.value = filter;
  fetch();
}

const groupedFeed = computed<MyFeedData>(() => {
  return _groupBy(feed.value, 'date');
});

onMounted(() => {
  fetch();
});
</script>

<template>
  <div>
    <h1 class="text-center">Feed</h1>
    <template v-if="!userStore.disabled">
      <USwitch
        @update:model-value="setFilterBookmarks"
        :model-value="filterBookmarks"
        color="neutral"
        label="Filter Bookmarked Blogs"
        class="mb-2" />
      <USwitch
        @update:model-value="setFilterFavorites"
        :model-value="filterFavorites"
        color="neutral"
        label="Filter Favorite Posts"
        class="mb-2" />
    </template>
    <div v-for="(entries, key) in groupedFeed" :key="key">
      <h2>{{ key }}</h2>
      <PostCard
        v-for="entry in entries"
        :key="entry.id"
        @updated="fetch"
        :post="entry" />
    </div>
    <UPagination
      v-if="total"
      @update:page="updatePage"
      :page="page"
      :total="total"
      active-color="neutral"
      class="flex justify-center" />
  </div>
</template>
