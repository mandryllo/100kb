<template>
  <div>
    <AppHeader />
    <main class="w-full mx-auto max-w-(--app-max-width) p-4">
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
