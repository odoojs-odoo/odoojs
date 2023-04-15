<template>
  <div>
    <ActionButton
      v-if="activeIds.length && (buttons.delete || hasActive)"
      :has-delete="buttons.delete"
      :has-active="hasActive"
      @button-click="onClickCRUD"
    />

    <a-button
      v-if="buttons.create"
      size="small"
      type="primary"
      @click="onClickCRUD('newform')"
      class="createBtn"
    >
      {{ viewActions.create }}
    </a-button>

    <a-tooltip class="expBtn">
      <template #title> {{ viewActions.exportAll }}</template>
      <a-button size="small" @click="onClickCRUD('exportall')">
        <template #icon>
          <download-outlined />
        </template>
      </a-button>
    </a-tooltip>
  </div>
</template>

<script setup>
import ActionButton from './ActionButton.vue'

defineProps(['formInfo', 'viewActions', 'activeIds', 'buttons', 'hasActive'])
const emit = defineEmits(['button-click'])

async function onClickCRUD(name) {
  emit('button-click', name)
}
</script>

<style type="text/css" scoped>
.createBtn {
  margin-left: 5px;
}

.expBtn {
  margin-left: 5px;
}
</style>
