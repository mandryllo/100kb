<script setup lang="ts">
const { toggleIsOpened, isOpened } = useNavMenu();
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
      <NavigationMenu class="hidden sm:flex" />
      <div>
        <ThemeToggle />
        <UButton
          to="https://github.com/mandryllo/100kb"
          target="_blank"
          icon="mdi:github"
          size="sm"
          color="neutral"
          variant="ghost" />
        <UButton
          @click="toggleIsOpened"
          :icon="isOpened ? 'mdi:close' : 'mdi:menu'"
          size="sm"
          color="neutral"
          variant="ghost"
          class="inline-flex sm:hidden cursor-pointer" />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  height: var(--app-header-height);
}
</style>
