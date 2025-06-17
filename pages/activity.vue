<script setup lang="ts">
const userStore = useUserStore();

const open = ref(false);

function onDisableConfirm() {
  userStore.disable();
  open.value = false;
}
</script>

<template>
  <div>
    <h1 class="text-center">Activity</h1>
    <div class="flex flex-col">
      <div class="mb-4 text-justify">
        <ULink to="/">100kb.space</ULink> stores all your acitivity, including
        reading individual posts, visiting blogs, favoriting posts and bookmarking
        blogs in your browser's local storage. This information is never stored
        on the server. Of course, you can disable this feature, but beware, doing
        that will erase your currently saved activity.
      </div>
      <div>
        <UModal
          v-if="!userStore.disabled"
          v-model:open="open"
          :close="{ class: 'cursor-pointer' }"
          title="Are you sure?"
          description="This action will erase your complete activity history!">
          <AppButton label="Disable User Activity" class="cursor-pointer" />
          <template #body>
            <div>
              <AppButton @click="onDisableConfirm" label="Yes" />
            </div>
          </template>
        </UModal>
        <AppButton v-else @click="userStore.enable" label="Enable User Activity" />
      </div>
    </div>
  </div>
</template>
