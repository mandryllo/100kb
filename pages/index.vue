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
    <div
      v-if="!userStore.disabled"
      class="flex flex-col md:flex-row justify-center mb-8">
      <USwitch
        @update:model-value="setFilterBookmarks"
        :model-value="filterBookmarks"
        color="neutral"
        label="Filter Bookmarked Blogs"
        class="mb-4 md:mb-0 mr-0 md:mr-8" />
      <USwitch
        @update:model-value="setFilterFavorites"
        :model-value="filterFavorites"
        color="neutral"
        label="Filter Favorite Posts" />
    </div>
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
