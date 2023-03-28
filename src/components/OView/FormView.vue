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

  <ActionButton
    :has-delete="buttons.delete"
    :has-active="hasActive"
    @button-click="onClickCRUD(name)"
  />

  <div></div>

  <StatusBar :currentState="currentState" :states="statusbarVisible" />

  <template v-if="!formInfo.editable">
    <a-space
      style="
        float: right;
        margin-right: 10px;
        margin-top: 5px;
        margin-bottom: 20px;
      "
    >
      <template v-for="btn in headerButtons" :key="btn.name">
        <a-button size="small" :type="btn.btn_type" @click="onBtnClick(btn)">
          {{ btn.string }}
        </a-button>
      </template>
    </a-space>
  </template>

  <WizardForm
    v-model:visible="wizardVisible"
    :action-id="wizardAction"
    @done="onWizardDone"
  />

  <div></div>
  <FormSheet
    ref="editRef"
    :model="mVal"
    :formInfo="formInfo"
    style="background-color: white; margin-top: 5px; padding: 5px"
    @change="onChange"
    @load-relation="onLoadReation"
  />
</template>

<script setup>
import { defineProps, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from './formApi'

import StatusBar from './StatusBar.vue'
import ActionButton from './ActionButton.vue'
import FormSheet from './FormSheet.vue'
import WizardForm from './WizardForm.vue'

const router = useRouter()
const props = defineProps(['actionId', 'resId'])
const editRef = ref()

const useData = useForm(props, { router, editRef })

const { mVal, formInfo } = useData
const { buttons, hasActive } = useData

const { headerButtons, currentState, statusbarVisible } = useData

const { onChange, onClickCRUD, onLoadReation } = useData

const { onBtnClick, wizardVisible, wizardAction, onWizardDone } = useData

function onClickDelConfirm() {
  onClickCRUD('del')
}
</script>

<style type="text/css"></style>
