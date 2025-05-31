<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui';

defineProps<{
  icon: string;
  text: string;
  color: ButtonProps['color'];
}>();
</script>

<template>
  <UTooltip :text="text">
    <UButton
      v-bind="$attrs"
      :icon="icon"
      :color="color"
      variant="ghost" />
  </UTooltip>
</template>
