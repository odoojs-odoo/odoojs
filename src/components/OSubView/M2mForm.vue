<template>
  <span>
    <a-modal v-model:visible="visible2" :title="modalTitle" width="600px">
      <a-form
        autocomplete="off"
        style="background-color: white; margin-top: 5px; padding: 5px"
      >
        <a-descriptions
          :column="2"
          style="background-color: white; padding: 5px; margin-top: 5px"
          size="small"
        >
          <template v-for="group in sheet.children" :key="group.name">
            <a-descriptions-item :span="group.span">
              <a-descriptions :column="1">
                <template v-for="meta in group.children" :key="meta.name">
                  <a-descriptions-item>
                    <template v-if="meta.type">
                      <a-form-item
                        :name="meta.name"
                        :label="tr(meta.string)"
                        style="margin-bottom: 5px"
                      >
                        <OField
                          width="270px"
                          :field-name="meta.name"
                          :field-info="meta"
                          :form-info="formInfo"
                        />
                      </a-form-item>
                    </template>
                  </a-descriptions-item>
                </template>
              </a-descriptions>
            </a-descriptions-item>
          </template>
        </a-descriptions>
      </a-form>

      <template #footer>
        <a-space v-if="readonly">
          <a-button size="small" key="back" @click="visible2 = false">
            关闭
          </a-button>
        </a-space>

        <a-space v-else>
          <a-button size="small" key="rollback" @click="visible2 = false">
            取消
          </a-button>

          <a-button size="small" key="remove" @click="onRemove">
            移出
          </a-button>
        </a-space>
      </template>
    </a-modal>
  </span>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import { useM2mForm } from './m2mFormApi'
import OField from '@/components/OField/OField.vue'

import { useL10n } from '@/components/tools/useL10n'
const { tr } = useL10n()

const props = defineProps([
  'visible',
  'readonly',
  'record',
  'relationInfo',
  'parentFormInfo'
])

const emit = defineEmits(['update:visible', 'row-remove'])
const modalTitle = computed(() =>
  props.record.id ? props.record.display_name : '添加'
)

const visible2 = computed({
  get() {
    return props.visible
  },
  set(val) {
    emit('update:visible', val)
  }
})

const useData = useM2mForm(props, { emit })
const { sheet, formInfo } = useData

function onRemove() {
  // console.log('onRemove')
  emit('row-remove')
  visible2.value = false
}
</script>

<style type="text/css"></style>
