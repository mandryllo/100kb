<script setup lang="ts">
import type { MyFeedEntry } from '#shared/types';

defineProps<{
  post: MyFeedEntry;
}>();
</script>

<template>
  <UCard class="mb-4">
    <AppLink :title="post.title" :link="post.link" :blog="post.feedLink" />
    &bull;
    {{ post.feedTitle }}
  </UCard>
</template>
