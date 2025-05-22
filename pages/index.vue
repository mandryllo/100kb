<script setup lang="ts">
const feedStore = useFeedStore();

await feedStore.fetch();
</script>

<template>
  <div>
    <h1 class="text-center">Feed</h1>
    <div v-for="(entries, key) in feedStore.itemsOnPage" :key="key">
      <h2>{{ key }}</h2>
      <UCard v-for="entry in entries" :key="entry.id" class="mb-4">
        <template #header>
          <h3>{{ entry.title }} by {{ entry.feedTitle }} by {{ entry.feedLink }}</h3>
        </template>
        <div>{{ entry.description }}</div>
        <ULink :href="entry.link" target="_blank">{{ entry.link }}</ULink>
        <template #footer>
          {{ entry.published }}
        </template>
      </UCard>
    </div>
    <UPagination
      @update:page="feedStore.updatePage"
      :page="feedStore.page"
      :total="feedStore.total"
      active-color="neutral"
      class="flex justify-center" />
  </div>
</template>
