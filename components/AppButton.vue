<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui';

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();

const { color = 'neutral', variant = 'subtle', size = 'md' } = defineProps<{
  color?: ButtonProps['color'];
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
}>();

const computedClasses = computed(() => {
  if (!attrs.to && attrs.onClick) return `${attrs.class} cursor-pointer`;
  return attrs.class;
});
</script>

<template>
  <UButton
    v-bind="$attrs"
    :color="color"
    :variant="variant"
    :size="size"
    :class="computedClasses" />
</template>
