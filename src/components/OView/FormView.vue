<template>
  <a-space>
    {{ formInfo.lang }}
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
        <!-- @click="onClickDel" -->
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
  <div>
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
  </div>
  <div>.</div>

  <FormSheet
    ref="editRef"
    :model="mVal"
    :formInfo="formInfo"
    @change="onChange"
    @load-relation="onLoadReation"
    style="background-color: white; margin-top: 30px; padding: 5px"
  />
</template>

<script setup>
import { ref } from 'vue'
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
const { viewActions, buttons, hasActive } = useData

const { headerButtons, currentState, statusbarVisible } = useData

const { onChange, onClickCRUD, onLoadReation } = useData

const { onBtnClick, wizardVisible, wizardAction, onWizardDone } = useData

function onClickDelConfirm() {
  onClickCRUD('del')
}
</script>

<style type="text/css"></style>
