<template>
  <div>
    <CPForm
      :formInfo="formInfo"
      :viewActions="viewActions"
      :buttons="buttons"
      :hasActive="hasActive"
      @button-click="onClickCRUD"
    />

    <SheetHeader
      :currentState="currentState"
      :states="statusbarVisible"
      :formInfo="formInfo"
      :headerButtons="headerButtons"
      @button-click="onBtnClick"
    />

    <div>.</div>

    <FormSheet
      ref="editRef"
      :model="mVal"
      :formInfo="formInfo"
      @change="onChange"
      @load-relation="onLoadReation"
      style="background-color: white; margin-top: 30px; padding: 5px"
    />

    <WizardForm
      v-model:visible="wizardVisible"
      :action-id="wizardAction"
      @done="onWizardDone"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from './formApi'

import WizardForm from './WizardForm.vue'
import CPForm from '@/components/ONode/CPForm.vue'
import SheetHeader from '@/components/ONode/SheetHeader.vue'

// import StatusBar from '../ONode/StatusBar.vue'
// import ActionButton from '../ONode/ActionButton.vue'
import FormSheet from './FormSheet.vue'

const router = useRouter()
const props = defineProps(['actionId', 'resId'])
const editRef = ref()

const useData = useForm(props, { router, editRef })

const { mVal, formInfo } = useData
const { viewActions, buttons, hasActive } = useData

const { headerButtons, currentState, statusbarVisible } = useData

const { onChange, onClickCRUD, onLoadReation } = useData

const { onBtnClick, wizardVisible, wizardAction, onWizardDone } = useData
</script>

<style type="text/css"></style>
