<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui';

defineOptions({ inheritAttrs: false });

const { size = 'xs' } = defineProps<{
  icon: string;
  text: string;
  size?: ButtonProps['size'];
}>();
</script>

<template>
  <UTooltip :text="text">
    <AppButton
      v-bind="$attrs"
      :icon="icon"
      :size="size"
      :aria-label="text" />
  </UTooltip>
</template>
