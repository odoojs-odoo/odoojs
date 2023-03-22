<template>
  <a-space>
    <template v-if="!formInfo.editable">
      <a-button size="small" v-if="buttons.edit" @click="onClickCRUD('edit')">
        {{ $t('act.edit') }}
      </a-button>
      <a-button
        v-if="buttons.create"
        size="small"
        type="primary"
        @click="onClickCRUD('new')"
      >
        {{ $t('act.create') }}
      </a-button>

      <a-popconfirm
        v-if="buttons.delete"
        :title="$t('act.deleteTip')"
        :ok-text="$t('act.confirm')"
        :cancel-text="$t('act.cancel')"
        @confirm="onClickDelConfirm"
      >
        <!-- @click="onClickDel" -->
        <a-button size="small" type="danger">
          {{ $t('act.delete') }}
        </a-button>
      </a-popconfirm>
      <a-button size="small" type="primary" @click="onClickCRUD('back')">
        {{ $t('act.back') }}
      </a-button>
    </template>
    <template v-if="formInfo.editable">
      <a-button size="small" @click="onClickCRUD('save')">
        {{ $t('act.save') }}
      </a-button>
      <a-button size="small" @click="onClickCRUD('cancel')">
        {{ $t('act.cancel') }}
      </a-button>
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
          <div v-if="!getInvisible(meta)">
            {{ { ...record, ...formInfo.values }[meta.name] }}
          </div>
        </template>
      </template>
      <!-- 
      <a-descriptions-item :span="2">
      </a-descriptions-item>
      -->
      <template v-for="group in sheet.children" :key="group.name">
        <a-descriptions-item :span="group.span">
          <a-descriptions :column="1">
            <template v-for="meta in group.children" :key="meta.name">
              <a-descriptions-item v-if="!getInvisible(meta)">
                <template v-if="meta.type">
                  <a-form-item
                    :name="meta.name"
                    :label="tr(getLabel(meta))"
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
                      @load-relation="onLoadReation"
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

const { tr } = useL10n()

const {
  mVal,
  sheet,
  formInfo,
  buttons,
  currentState,
  statusbarVisible,
  getRules,
  getLabel,
  getInvisible,
  onChange,
  onClickCRUD,
  onLoadReation
} = useForm(props, { router, editRef })

const record = computed(() => formInfo.value.record)
function onClickDelConfirm() {
  onClickCRUD('del')
}

// const labelCol = { span: 8 }
// const wrapperCol = { span: 14 }
</script>

<style type="text/css"></style>
