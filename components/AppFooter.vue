<template>
  <footer class="border-t border-neutral-800">
    <div class="w-full h-full mx-auto max-w-(--app-max-width) flex justify-center items-center">
      <span class="text-sm mr-2">All Rights Reserved</span>
      <UIcon name="mdi:copyright" size="sm" />
      <UButton
        href="https://tobogan.space/"
        target="_blank"
        variant="ghost"
        color="neutral"
        size="sm">
        Tobogan
      </UButton>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  height: var(--app-footer-height);
}
</style>
