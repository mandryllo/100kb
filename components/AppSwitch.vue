<script setup lang="ts">
defineOptions({ inheritAttrs: false });

defineProps<{
  label: string;
}>();
</script>

<template>
  <USwitch
    v-bind="$attrs"
    :label="label"
    :ui="{ base: 'cursor-pointer', label: 'cursor-pointer' }"
    color="neutral" />
</template>
