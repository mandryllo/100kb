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
  <IconBtn
    @click="isDark = !isDark"
    :icon="isDark ? 'lucide:sun' : 'lucide:moon'"
    text="Toggle Theme"
    variant="ghost"
    size="sm" />
</template>
