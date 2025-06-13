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
        <IconBtn
          to="https://github.com/mandryllo/100kb"
          target="_blank"
          icon="mdi:github"
          text="Open on Github"
          variant="ghost"
          size="sm" />
        <IconBtn
          @click="toggleIsOpened"
          :icon="isOpened ? 'mdi:close' : 'mdi:menu'"
          :text="isOpened ? 'Close Navigation Menu' : 'Open Navigation Menu'"
          variant="ghost"
          size="sm"
          class="inline-flex sm:hidden" />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  height: var(--app-header-height);
}
</style>
