<script setup lang="ts">
import type { MyFeedData, MyFeedEntry } from '#shared/types';

const feed = ref<MyFeedEntry[]>();
const page = ref(1);
const total = ref(0);
const ITEMS_PER_PAGE = 10;

const { data } = await useFetch<MyFeedEntry[]>('/api/feed');
if (data.value) {
  feed.value = _orderBy(data.value, 'published', ['desc']);
  total.value = data.value.length;
}

const items = computed(() => {
  if (!feed.value) return {};
  const firstIndex = (page.value - 1) * ITEMS_PER_PAGE;
  const secondIndex = page.value * ITEMS_PER_PAGE;
  const itemsOnPage = feed.value.slice(firstIndex, secondIndex);
  return _groupBy(itemsOnPage, 'date') as MyFeedData;
});
</script>

<template>
  <div>
    <h1 class="text-center">100kb Feed</h1>
    <div v-for="(entries, key) in items" :key="key">
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
    <UPagination v-model:page="page" :total="total" active-color="neutral" />
  </div>
</template>
