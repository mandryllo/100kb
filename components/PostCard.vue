<script setup lang="ts">
import type { Post } from '#shared/types';

const props = defineProps<{
  post: Post;
}>();

const emit = defineEmits(['updated']);

const userStore = useUserStore();

function onReadMoreClick() {
  userStore.readPost(props.post.id);
  userStore.visitBlog(props.post.blogId);
}

function visitBlog() {
  userStore.visitBlog(props.post.blogId);
}

function toggleFavorite() {
  userStore.toggleFavorite(props.post.id);
  emit('updated', 'favorite');
}

function toggleBookmark() {
  userStore.toggleBookmark(props.post.blogId);
  emit('updated', 'bookmark');
}

const isPostFavorited = computed(() => {
  return !!userStore.favorites[props.post.id];
});

const isBlogBookmarked = computed(() => {
  return !!userStore.bookmarks[props.post.blogId];
});

const isBlogVisited = computed(() => {
  return userStore.stats[props.post.blogId] > 10;
});

const isPostRead = computed(() => {
  return userStore.stats[props.post.id] > 2;
});
</script>

<template>
  <UCard :variant="isPostFavorited ? 'subtle' : 'outline'" class="mb-4">
    <template #header>
      <h3 class="flex justify-between items-center">
        {{ post.title }}
        <IconBtn
          v-if="!userStore.disabled"
          @click="toggleFavorite"
          :text="!isPostFavorited ? 'Favorite post' : 'Unfavorite post'"
          :icon="
            !isPostFavorited
              ? 'material-symbols:favorite-outline'
              : 'material-symbols:favorite'"
          :color="!isPostFavorited ? 'neutral' : 'tertiary'" />
      </h3>
    </template>
    <div v-if="post.description" class="mb-4">{{ post.description }}</div>
    <AppButton
      @click="onReadMoreClick"
      :to="post.link"
      target="_blank"
      label="Read More"
      trailing-icon="mdi:open-in-new" />
    <div v-if="userStore.stats[post.id]" class="font-semibold text-sm mt-2">
      You already read this post {{ isPostRead ? 'multiple times!' : '!' }}
    </div>
    <template #footer>
      <h4 class="flex justify-between">
        <span class="font-semibold flex items-center">
          {{ post.blogTitle }}
          <AppBadge
            v-if="isBlogBookmarked"
            label="Bookmarked blog"
            class="ml-2" />
          <AppBadge
            v-if="isBlogVisited"
            label="Frequently visited blog"
            class="ml-2" />
        </span>
        <div class="flex">
          <IconBtn
            v-if="!userStore.disabled"
            @click="visitBlog"
            :to="post.blogId"
            target="_blank"
            text="Visit blog"
            icon="mdi:open-in-new" />
          <IconBtn
            v-if="!userStore.disabled"
            @click="toggleBookmark"
            :text="!isBlogBookmarked ? 'Bookmark blog' : 'Unbookmark blog'"
            icon="material-symbols:bookmark-heart-outline"
            class="ml-2" />
        </div>
      </h4>
      <div v-if="post.blogDescription" class="text-xs">
        {{ post.blogDescription }}
      </div>
    </template>
  </UCard>
</template>
