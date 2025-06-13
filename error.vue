<script setup lang="ts">
</script>

<template>
  <NuxtLayout name="default">
    <h1 class="text-center">Error</h1>
    <div class="text-center">
      Something went wrong.
      Please
      <ExternalLink
        @click="clearError()"
        to="https://github.com/mandryllo/100kb/issues">
        open an issue.
      </ExternalLink>
    </div>
  </NuxtLayout>
</template>
