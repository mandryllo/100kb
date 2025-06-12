<script setup lang="ts">
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
  <UButton
    @click="isDark = !isDark"
    :icon="isDark ? 'lucide:sun' : 'lucide:moon'"
    size="sm"
    color="neutral"
    variant="ghost"
    class="cursor-pointer" />
</template>
