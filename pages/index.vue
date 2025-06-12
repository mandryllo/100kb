<script setup lang="ts">
const userStore = useUserStore();

const {
  onPostUpdate,
  page,
  total,
  filterBookmarks,
  filterFavorites,
  updatePage,
  setFilterBookmarks,
  setFilterFavorites,
  groupedFeed
} = useFeed();
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
        @updated="onPostUpdate"
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
