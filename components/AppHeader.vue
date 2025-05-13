<script setup>
/* globals useColorMode */

const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === 'dark';
  },
  set(_isDark) {
    colorMode.preference = _isDark ? 'dark' : 'light';
  }
});
</script>

<template>
  <header class="border-b border-neutral-800">
    <div class="w-full h-full mx-auto max-w-(--app-max-width) flex justify-end">
      <ClientOnly v-if="!colorMode?.forced">
        <UButton
          @click="isDark = !isDark"
          icon="mdi:theme-light-dark"
          size="sm"
          color="neutral"
          variant="ghost" />
        <template #fallback>
          <div class="size-8"></div>
        </template>
      </ClientOnly>
      <UButton
        to="https://github.com/mandryllo/nuxt-app-starter"
        target="_blank"
        icon="mdi:github"
        size="sm"
        color="neutral"
        variant="ghost"
        aria-label="GitHub" />
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  height: var(--app-header-height);
}
</style>
