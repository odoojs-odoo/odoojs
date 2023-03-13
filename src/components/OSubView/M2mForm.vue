<template>
  <span>
    <a-modal v-model:visible="visible2" :title="modalTitle" width="600px">
      <!-- :model="mVal"   readonly, record-->
      <a-form
        ref="editRef"
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
              <!-- {{ group.children }} -->
              <a-descriptions :column="1">
                <template v-for="meta in group.children" :key="meta.name">
                  <a-descriptions-item>
                    <template v-if="meta.type">
                      <a-form-item
                        :name="meta.name"
                        :label="tr(meta.string)"
                        style="margin-bottom: 5px"
                      >
                        <!-- formInfo -->
                        <!-- {{ meta }} -->

                        <!-- @change="(...args) => onChange(meta.name, ...args)" -->

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
    </a-modal>

    <!-- <a-modal v-model="showModal" :title="relationInfo && relationInfo.string">
      <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">
        <template v-for="meta in fields">
          <template v-if="invisible_get(meta)">
            invisible: {{ meta.name }}: {{ record[meta.name] }}
          </template>

          <template v-else>
            <FormField
              :key="meta.name"
              :field-name="meta.name"
              width="120px"
              :editable="false"
              :fields="fields"
              :data-info="dataInfo"
            />
          </template>
        </template>
      </a-form-model>

      <template slot="footer">
        <a-space v-if="editable">
          <a-button
            size="small"
            key="rollback"
            @click="() => (showModal = false)"
          >
            取消
          </a-button>

          <template v-if="!(relationInfo && relationInfo.readonly)">
            <a-button size="small" key="remove" @click="() => handleOnRemove()">
              移出
            </a-button>
          </template>
        </a-space>

        <a-space v-else>
          <a-button size="small" key="back" @click="() => (showModal = false)">
            关闭
          </a-button>
        </a-space>
      </template>
    </a-modal> -->
  </span>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref } from 'vue'

import { useM2mForm } from './m2mFormApi'
import { useL10n } from '@/components/tools/useL10n'
const { tr } = useL10n()

import OField from '@/components/OField/OField.vue'

const props = defineProps([
  'visible',
  'readonly',
  'record',
  'relationInfo',
  'parentFormInfo'
])

const emit = defineEmits(['update:visible', 'row-commit'])
const modalTitle = computed(() =>
  props.record.id ? props.record.display_name : '添加'
)

const editRef = ref()

const useData = useM2mForm(props, { emit, editRef })
const { visible2, sheet, formInfo } = useData

//   components: {
//     FormField: () => import('@/components/OView/FormField.vue')
//   },

//     return {
//       labelCol: { span: 4 },
//       wrapperCol: { span: 14 }
//     }
//   },
</script>

<style type="text/css"></style>
