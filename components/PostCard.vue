<script setup lang="ts">
import type { MyFeedEntry } from '#shared/types';

const props = defineProps<{
  post: MyFeedEntry;
}>();

const emit = defineEmits(['updated']);

const userStore = useUserStore();

function onReadMoreClick() {
  userStore.storeLinkVisit({ link: props.post.link, blog: props.post.feedLink });
}

function savePost() {
  userStore.storeUserFavorite(props.post.id);
  emit('updated', 'favorite');
}

function onReadBlogClick() {
  userStore.storeLinkVisit({ blog: props.post.feedLink });
}

function bookmarkBlog() {
  userStore.storeUserBookmark(props.post.feedLink);
  emit('updated', 'bookmark');
}

const isPostSaved = computed(() => {
  return !!userStore.userFavorites[props.post.id];
});

const isBlogBookmarked = computed(() => {
  return !!userStore.userBookmarks[props.post.feedLink];
});

const isBlogVisited = computed(() => {
  return userStore.userActivity[props.post.feedLink] > 2;
});

const isPostVisited = computed(() => {
  return userStore.userActivity[props.post.id] > 2;
});
</script>

<template>
  <UCard :variant="isPostSaved ? 'subtle' : 'outline'" class="mb-4">
    <template #header>
      <h3 class="flex justify-between items-center">
        {{ post.title }}
        <IconBtn
          v-if="!userStore.disabled"
          @click="savePost"
          :text="!isPostSaved ? 'Favorite post' : 'Unfavorite post'"
          :icon="
            !isPostSaved
              ? 'material-symbols:favorite-outline'
              : 'material-symbols:favorite'"
          :color="!isPostSaved ? 'neutral' : 'tertiary'" />
      </h3>
    </template>
    <div v-if="post.description" class="mb-4">{{ post.description }}</div>
    <AppButton
      @click="onReadMoreClick"
      :to="post.link"
      target="_blank"
      label="Read More"
      trailing-icon="mdi:open-in-new" />
    <div v-if="userStore.userActivity[post.link]" class="font-semibold text-sm mt-2">
      You already visited this post {{ isPostVisited ? 'multiple times!' : '!' }}
    </div>
    <template #footer>
      <h4 class="flex justify-between">
        <span class="font-semibold flex items-center">
          {{ post.feedTitle }}
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
            @click="onReadBlogClick"
            :to="post.feedLink"
            target="_blank"
            text="Read blog"
            icon="mdi:open-in-new" />
          <IconBtn
            v-if="!userStore.disabled"
            @click="bookmarkBlog"
            :text="!isBlogBookmarked ? 'Bookmark blog' : 'Unbookmark blog'"
            icon="material-symbols:bookmark-heart-outline"
            class="ml-2" />
        </div>
      </h4>
      <div v-if="post.feedDescription" class="text-xs">
        {{ post.feedDescription }}
      </div>
    </template>
  </UCard>
</template>
