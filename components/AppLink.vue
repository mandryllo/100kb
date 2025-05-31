<script setup lang="ts">
const props = defineProps<{
  title: string;
  link: string;
  blog: string;
}>();

const userStore = useUserStore();

function onClick() {
  const { link, blog } = props;
  userStore.storeLinkVisit({ link, blog });
}
</script>

<template>
  <ULink
    @click="onClick"
    :href="link"
    target="_blank"
    external>
    <span class="app-link">{{ title }}</span>
  </ULink>
</template>

<style lang="scss" scoped>
.app-link {
  color: var(--color-blue-500);

  &:hover {
    color: var(--color-blue-700);
    text-decoration: underline;
  }
}
</style>
