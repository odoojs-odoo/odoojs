<template>
  <div>
    <a-space>
      <template v-if="!formInfo.editable">
        <a-button size="small" v-if="buttons.edit" @click="onClickCRUD('edit')">
          {{ viewActions.edit }}
        </a-button>
        <a-button
          v-if="buttons.create"
          size="small"
          type="primary"
          @click="onClickCRUD('new')"
        >
          {{ viewActions.create }}
        </a-button>

        <a-popconfirm
          v-if="buttons.delete"
          :title="viewActions.deleteTip"
          :ok-text="viewActions.confirm"
          :cancel-text="viewActions.cancel"
          @confirm="onClickDelConfirm"
        >
          <a-button size="small" type="danger">
            {{ viewActions.delete }}
          </a-button>
        </a-popconfirm>
        <a-button size="small" type="primary" @click="onClickCRUD('back')">
          {{ viewActions.back }}
        </a-button>
      </template>
      <template v-if="formInfo.editable">
        <a-button size="small" @click="onClickCRUD('save')">
          {{ viewActions.save }}
        </a-button>
        <a-button size="small" @click="onClickCRUD('cancel')">
          {{ viewActions.cancel }}
        </a-button>
      </template>
    </a-space>

    <ActionButton
      v-if="buttons.delete && hasActive"
      :has-delete="buttons.delete"
      :has-active="hasActive"
      @button-click="onClickCRUD"
    />
  </div>
</template>

<script setup>
import ActionButton from './ActionButton.vue'

defineProps(['formInfo', 'viewActions', 'buttons', 'hasActive'])
const emit = defineEmits(['button-click'])

async function onClickCRUD(name) {
  emit('button-click', name)
}

function onClickDelConfirm() {
  onClickCRUD('del')
}
</script>

<style type="text/css"></style>
