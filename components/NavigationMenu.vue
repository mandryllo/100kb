<script setup lang="ts">
import type { NavigationMenuItem, NavigationMenuProps } from '@nuxt/ui';

defineProps<{
  orientation?: NavigationMenuProps['orientation'];
}>();

const items = ref<NavigationMenuItem[]>([{
  label: 'Feed',
  icon: 'material-symbols:dynamic-feed',
  to: '/'
}, {
  label: 'About',
  icon: 'material-symbols:chat-info-outline',
  to: '/about'
}, {
  label: 'Activity',
  icon: 'material-symbols:browse-activity-outline',
  to: '/activity'
}]);
</script>

<template>
  <UNavigationMenu
    :items="items"
    :orientation="orientation"
    color="neutral"
    variant="link" />
</template>
