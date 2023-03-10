<template>
  <a-space>
    <template v-if="!formInfo.editable">
      <a-button size="small" v-if="buttons.edit" @click="onClickCRUD('edit')">
        编辑
      </a-button>
      <a-button
        v-if="buttons.create"
        size="small"
        type="primary"
        @click="onClickCRUD('new')"
      >
        创建
      </a-button>

      <a-popconfirm
        v-if="buttons.delete"
        title="您是要删除这条数据吗?"
        ok-text="确认"
        cancel-text="取消"
        @confirm="onClickDelConfirm"
      >
        <!-- @click="onClickDel" -->
        <a-button size="small" type="danger"> 删除 </a-button>
      </a-popconfirm>
      <a-button size="small" type="primary" @click="onClickCRUD('back')">
        返回
      </a-button>
    </template>
    <template v-if="formInfo.editable">
      <a-button size="small" @click="onClickCRUD('save')"> 保存 </a-button>
      <a-button size="small" @click="onClickCRUD('cancel')"> 取消 </a-button>
    </template>
  </a-space>

  <StatusBar :currentState="currentState" :states="statusbarVisible" />

  <!-- :label-col="labelCol"
    :wrapper-col="wrapperCol" -->
  <a-form
    ref="editRef"
    :model="mVal"
    autocomplete="off"
    style="background-color: white; margin-top: 5px; padding: 5px"
  >
    <a-descriptions
      :column="2"
      style="background-color: white; padding: 5px; margin-top: 5px"
      size="small"
    >
      <template #title>
        <template v-for="meta in sheet.title" :key="meta.name">
          <div>{{ record[meta.name] }}</div>
        </template>
      </template>
      <template v-for="group in sheet.children" :key="group.name">
        <a-descriptions-item :span="group.span">
          <a-descriptions :column="1">
            <template v-for="meta in group.children" :key="meta.name">
              <a-descriptions-item>
                <template v-if="meta.type">
                  <a-form-item
                    :name="meta.name"
                    :label="_t(meta.string)"
                    :rules="getRules(meta)"
                    style="margin-bottom: 5px"
                  >
                    <OField
                      v-model="mVal[meta.name]"
                      width="270px"
                      :field-name="meta.name"
                      :field-info="meta"
                      :form-info="formInfo"
                      @change="(...args) => onChange(meta.name, ...args)"
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
</template>

<script setup>
import { defineProps, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from './formApi'

import { useL10n } from '@/components/tools/useL10n'

import StatusBar from './StatusBar.vue'

import OField from '@/components/OField/OField.vue'

const router = useRouter()
const props = defineProps(['actionId', 'resId'])
const editRef = ref()

const { _t } = useL10n()

const {
  mVal,
  sheet,
  formInfo,
  buttons,
  currentState,
  statusbarVisible,
  getRules,
  onChange,
  onClickCRUD
} = useForm(props, { router, editRef })

const record = computed(() => formInfo.value.record)
function onClickDelConfirm() {
  onClickCRUD('del')
}

// const labelCol = { span: 8 }
// const wrapperCol = { span: 14 }
</script>

<style type="text/css"></style>
