<script setup lang="ts">
const userStore = useUserStore();

const {
  onPostUpdate,
  page,
  total,
  isLoading,
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
      <AppSwitch
        @update:model-value="setFilterBookmarks"
        :model-value="filterBookmarks"
        label="Filter Bookmarked Blogs"
        class="mb-4 md:mb-0 mr-0 md:mr-8" />
      <AppSwitch
        @update:model-value="setFilterFavorites"
        :model-value="filterFavorites"
        label="Filter Favorite Posts" />
    </div>
    <UIcon
      v-if="isLoading"
      name="svg-spinners:6-dots-rotate"
      class="size-12 text-center w-full mt-16" />
    <div v-else>
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
  </div>
</template>
