<script setup lang="ts">
const { isOpened } = useNavMenu();
</script>

<template>
  <div>
    <AppHeader />
    <div v-if="isOpened" class="block sm:hidden">
      <NavigationMenu orientation="vertical" />
      <USeparator />
    </div>
    <main class="w-full mx-auto max-w-(--app-max-width) py-4 md:py-8 px-4">
      <slot></slot>
    </main>
    <AppFooter />
  </div>
</template>

<style lang="scss" scoped>
main {
  min-height: calc(100vh - var(--app-header-height) - var(--app-footer-height));
}
</style>
