<script setup lang="ts">
const props = defineProps<{
  link: string;
  blog: string;
}>();

const userStore = useUserStore();

function onClick() {
  userStore.storeLinkVisit(props);
}
</script>

<template>
  <ULink @click="onClick" :href="link" target="_blank">{{ link }}</ULink>
</template>
