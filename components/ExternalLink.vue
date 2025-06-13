<script setup lang="ts">
defineOptions({ inheritAttrs: false });
</script>

<template>
  <ULink v-bind="$attrs" external target="_blank">
    <slot></slot>
  </ULink>
</template>
