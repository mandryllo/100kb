<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script>

<template>
  <UBadge
    color="tertiary"
    variant="subtle"
    size="sm">
    {{ label }}
  </UBadge>
</template>
