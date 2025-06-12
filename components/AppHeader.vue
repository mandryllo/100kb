<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

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
  <header class="border-b border-(--ui-border)">
    <div class="w-full h-full mx-auto max-w-(--app-max-width) flex justify-between">
      <UButton to="/" color="neutral" variant="ghost">
        <template #leading>
          <UIcon name="fluent:document-100-24-regular" size="24" />
        </template>
        100kb.space
      </UButton>
      <UNavigationMenu
        color="neutral"
        variant="link"
        :items="items" />
      <div>
        <ThemeToggle />
        <UButton
          to="https://github.com/mandryllo/100kb"
          target="_blank"
          icon="mdi:github"
          size="sm"
          color="neutral"
          variant="ghost" />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  height: var(--app-header-height);
}
</style>
