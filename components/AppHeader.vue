<template>
  <header class="border-b border-(--ui-border)">
    <div class="w-full h-full mx-auto max-w-(--app-max-width) flex justify-between">
      <UButton to="/" color="neutral" variant="ghost">
        <template #leading>
          <UIcon name="fluent:document-100-24-regular" size="24" />
        </template>
        100kb.space
      </UButton>
      <UButton
        to="https://github.com/mandryllo/100kb.space"
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
