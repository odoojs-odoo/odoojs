<template>
  <div>
    <a-modal
      v-model:visible="visible2"
      :title="(actionId || {}).name"
      width="300"
    >
      <FormSheet
        ref="editRef"
        :model="mVal"
        :formInfo="formInfo"
        style="background-color: white; margin-top: 5px; padding: 5px"
        @change="onChange"
        @load-relation="onLoadReation"
      />

      <template #footer>
        <a-space>
          <a-button
            v-for="btn in archButtons"
            size="small"
            :key="btn.name"
            :loading="loading"
            :type="btn.btn_type"
            @click="onBtnClick(btn)"
          >
            {{ btn.string }}
          </a-button>

          <a-button size="small" key="back" @click="visible2 = false">
            Return
          </a-button>
        </a-space>
      </template>
    </a-modal>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useWizardForm } from './wizardApi'
import FormSheet from './FormSheet.vue'

const emit = defineEmits(['update:visible', 'done'])

const props = defineProps(['visible', 'actionId'])

const visible2 = computed({
  get() {
    return props.visible
  },
  set(val) {
    emit('update:visible', val)
  }
})

const editRef = ref()
const useData = useWizardForm(props, { emit, editRef })
const { mVal, formInfo, onChange, onLoadReation } = useData
const { archButtons, button_click } = useData

const loading = ref(false)

async function onBtnClick(btn) {
  //  ModalText = 'The modal will be closed after two seconds'
  loading.value = true
  const error = await button_click(btn)
  if (error) {
    loading.value = false
  } else {
    emit('done')
    loading.value = false
    visible2.value = false
  }
}
</script>

<style scoped type="text/css"></style>
