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
    <div class="flex flex-col items-center">
      <div class="self-start mb-4 text-justify">
        <ULink to="/">100kb.space</ULink> stores all your visits (whether to an
        individual post or the entire blog) in your browser's local storage. You
        can see all of them down below. This information is never stored on the
        server. Of course you can disable this feature, but beware, doing that
        will erase your currently saved activity.
      </div>
      <div class="self-start">
        <UModal
          v-if="!userStore.disabled"
          v-model:open="open"
          :close="{ class: 'cursor-pointer' }"
          title="Are you sure?"
          description="This action will erase your complete activity history!">
          <UButton color="neutral" variant="subtle" class="cursor-pointer">
            Disable User Activity
          </UButton>
          <template #body>
            <div>
              <UButton
                @click="onDisableConfirm"
                color="neutral"
                variant="subtle"
                class="cursor-pointer">
                Yes
              </UButton>
            </div>
          </template>
        </UModal>
        <UButton
          v-else
          @click="userStore.enable"
          color="neutral"
          variant="subtle"
          class="cursor-pointer">
          Enable User Activity
        </UButton>
      </div>
      <ul class="list-disc">
        <li v-for="it in userStore.orderedLinkVisits" :key="it.link">
          Visited
          <ULink :to="it.link || it.blog" external target="_blank">
            {{ it.link || it.blog }}
          </ULink>
          on {{ it.timestamp }}
        </li>
      </ul>
    </div>
  </div>
</template>
