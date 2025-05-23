<script setup lang="ts">
const feedStore = useFeedStore();
const userStore = useUserStore();

await feedStore.fetch();
</script>

<template>
  <div>
    <h1 class="text-center">Feed</h1>
    <USwitch
      @update:model-value="feedStore.setFilterBookmarks"
      :model-value="feedStore.filterBookmarks"
      color="neutral"
      label="Filter Bookmarks" />
    <div v-for="(entries, key) in feedStore.itemsOnPage" :key="key">
      <h2>{{ key }}</h2>
      <UCard v-for="entry in entries" :key="entry.id" class="mb-4">
        <template #header>
          <h3>{{ entry.title }} by {{ entry.feedTitle }} by {{ entry.feedLink }}</h3>
          <div v-if="entry.feedLink && userStore.userActivity[entry.feedLink]">
            You visited this blog {{ userStore.userActivity[entry.feedLink] }} times!
          </div>
          <template v-if="entry.feedLink">
            <UButton
              @click="userStore.storeUserBookmark(entry.feedLink)"
              icon="mdi:heart"
              color="neutral"
              variant="ghost" />
            <div v-if="userStore.userBookmarks[entry.feedLink]">You bookmarked this blog!</div>
          </template>
        </template>
        <div>{{ entry.description }}</div>
        <AppLink
          v-if="entry.link && entry.feedLink"
          :link="entry.link"
          :blog="entry.feedLink" />
        <template v-if="entry.link">
          <UButton
            @click="userStore.storeUserBookmark(entry.link)"
            icon="mdi:heart"
            color="neutral"
            variant="ghost" />
          <div v-if="userStore.userBookmarks[entry.link]">You bookmarked this blog post!</div>
        </template>
        <template #footer>
          {{ entry.published }}
          <div v-if="entry.link && userStore.userActivity[entry.link]">
            You visited this link {{ userStore.userActivity[entry.link] }} times!
          </div>
        </template>
      </UCard>
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
