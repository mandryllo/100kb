<script setup lang="ts">
import type { MyFeedEntry } from '#shared/types';

const props = defineProps<{
  post: MyFeedEntry;
}>();

const userStore = useUserStore();

function onReadMoreClick() {
  userStore.storeLinkVisit({ link: props.post.link, blog: props.post.feedLink });
}

function savePost() {
  userStore.storeUserBookmark(props.post.link);
}

function onReadBlogClick() {
  userStore.storeLinkVisit({ blog: props.post.feedLink });
}

function bookmarkBlog() {
  userStore.storeUserBookmark(props.post.feedLink);
}

const isPostSaved = computed(() => {
  return !!userStore.userBookmarks[props.post.link];
});

const isBlogBookmarked = computed(() => {
  return !!userStore.userBookmarks[props.post.feedLink];
});

const isBlogVisited = computed(() => {
  return userStore.userActivity[props.post.feedLink] > 2;
});

const isPostVisited = computed(() => {
  return userStore.userActivity[props.post.link] > 2;
});
</script>

<template>
  <UCard :variant="isPostSaved ? 'subtle' : 'outline'" class="mb-4">
    <template #header>
      <h3 class="flex justify-between items-center">
        {{ post.title }}
        <UTooltip :text="!isPostSaved ? 'Favorite post' : 'Unfavorite post'">
          <UButton
            @click="savePost"
            :icon="!isPostSaved ? 'material-symbols:favorite-outline' : 'material-symbols:favorite'"
            :color="!isPostSaved ? 'neutral' : 'tertiary'"
            variant="subtle"
            size="xs"
            class="cursor-pointer" />
        </UTooltip>
      </h3>
    </template>
    <div v-if="post.description" class="mb-4">{{ post.description }}</div>
    <UButton
      @click="onReadMoreClick"
      :to="post.link"
      target="_blank"
      trailing-icon="mdi:open-in-new"
      color="neutral"
      variant="subtle">
      Read More
    </UButton>
    <div v-if="userStore.userActivity[post.link]" class="font-semibold text-sm mt-2">
      You already visited this post {{ isPostVisited ? 'multiple times!' : '!' }}
    </div>
    <template #footer>
      <h4 class="flex justify-between">
        <span class="font-semibold flex items-center">
          {{ post.feedTitle }}
          <template v-if="isBlogBookmarked">
            <UBadge
              color="tertiary"
              variant="subtle"
              size="sm"
              class="ml-2">
              Bookmarked blog
            </UBadge>
          </template>
          <template v-if="isBlogVisited">
            <UBadge
              color="tertiary"
              variant="subtle"
              size="sm"
              class="ml-2">
              Frequently visited blog
            </UBadge>
          </template>
        </span>
        <div class="flex">
          <UTooltip text="Read blog">
            <UButton
              @click="onReadBlogClick"
              :to="post.feedLink"
              target="_blank"
              icon="mdi:open-in-new"
              color="neutral"
              variant="subtle"
              size="xs" />
          </UTooltip>
          <UTooltip :text="!isBlogBookmarked ? 'Bookmark blog' : 'Unbookmark blog'">
            <UButton
              @click="bookmarkBlog"
              icon="material-symbols:bookmark-heart-outline"
              color="neutral"
              variant="subtle"
              size="xs"
              class="cursor-pointer ml-2" />
          </UTooltip>
        </div>
      </h4>
      <div v-if="post.feedDescription" class="text-xs">
        {{ post.feedDescription }}
      </div>
    </template>
  </UCard>
</template>
