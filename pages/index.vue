<script setup lang="ts">
const feedStore = useFeedStore();

await feedStore.fetch();
</script>

<template>
  <div>
    <h1 class="text-center">Feed</h1>
    <!-- <USwitch
      @update:model-value="feedStore.setFilterBookmarks"
      :model-value="feedStore.filterBookmarks"
      color="neutral"
      label="Filter Bookmarks" /> -->
    <div v-for="(entries, key) in feedStore.itemsOnPage" :key="key">
      <h2>{{ key }}</h2>
      <PostCard v-for="entry in entries" :key="entry.id" :post="entry" />
    </div>
    <UPagination
      v-if="feedStore.totalItems"
      @update:page="feedStore.updatePage"
      :page="feedStore.page"
      :total="feedStore.totalItems"
      active-color="neutral"
      class="flex justify-center" />
  </div>
</template>
