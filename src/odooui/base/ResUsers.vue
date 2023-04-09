<template>
  <!-- form view -->

  <a-space>
    <template v-if="!formInfo.editable">
      <a-button size="small" @click="onClickCRUD('edit')">
        {{ viewActions.edit }}
      </a-button>
      <a-popconfirm
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

  <StatusBar :currentState="currentState" :states="statusbarVisible" />

  <!--     :label-col="labelCol"
    :wrapper-col="wrapperCol" -->

  <a-form
    ref="editRef"
    :model="mVal"
    autocomplete="off"
    style="background-color: white; margin-top: 5px; padding: 5px"
  >
    <!--      bordered -->
    <a-descriptions
      :title="`${resUsersView.name}: ${record.display_name}`"
      :column="2"
      style="background-color: white; padding: 5px; margin-top: 5px"
      size="small"
    >
      <a-descriptions-item>
        <a-form-item
          name="login"
          :label="resUsersView.account"
          style="margin-bottom: 5px"
        >
          <OField
            v-model="mVal['login']"
            width="270px"
            field-name="login"
            :field-info="fields.login || {}"
            :form-info="formInfo"
            @change="(...args) => onChange('login', ...args)"
          />
        </a-form-item>
      </a-descriptions-item>

      <a-descriptions-item>
        <!-- :rules="[]" -->
        <a-form-item
          name="name"
          :label="resUsersView.name"
          style="margin-bottom: 5px"
        >
          <OField
            v-model="mVal['name']"
            width="270px"
            field-name="name"
            :field-info="fields.name || {}"
            :form-info="formInfo"
            @change="(...args) => onChange('name', ...args)"
          />
        </a-form-item>
      </a-descriptions-item>

      <a-descriptions-item>
        <a-form-item
          name="phone"
          :label="resUsersView.phone"
          style="margin-bottom: 5px"
        >
          <OField
            v-model="mVal['phone']"
            width="270px"
            field-name="phone"
            :field-info="fields.phone || {}"
            :form-info="formInfo"
            @change="(...args) => onChange('phone', ...args)"
          />
        </a-form-item>
      </a-descriptions-item>

      <a-descriptions-item>
        <a-form-item
          name="company_id"
          :label="resUsersView.currentComp"
          style="margin-bottom: 5px"
        >
          <OField
            v-model="mVal['company_id']"
            width="270px"
            field-name="company_id"
            :field-info="fields.company_id || {}"
            :form-info="formInfo"
            @change="(...args) => onChange('company_id', ...args)"
          />
        </a-form-item>
      </a-descriptions-item>

      <a-descriptions-item>
        <a-form-item
          name="company_ids"
          :label="resUsersView.companies"
          style="margin-bottom: 5px"
        >
          <OField
            v-model="mVal['company_ids']"
            width="270px"
            field-name="company_ids"
            :field-info="fields.company_ids || {}"
            :form-info="formInfo"
            @change="(...args) => onChange('company_ids', ...args)"
          />
        </a-form-item>
      </a-descriptions-item>

      <a-descriptions-item :label="resUsersView.latestLogin">
        <OField
          v-model="mVal['login_date']"
          width="270px"
          field-name="login_date"
          :field-info="fields.login_date || {}"
          :form-info="formInfo"
          @change="(...args) => onChange('login_date', ...args)"
        />
      </a-descriptions-item>
    </a-descriptions>
  </a-form>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from '@/components/OView/formApi'

import StatusBar from '@/components/OView/StatusBar.vue'

import OField from '@/components/OField/OField.vue'
import api from '@/odoorpc'

const router = useRouter()
const props = defineProps(['actionId', 'resId'])
const editRef = ref()
const {
  mVal,
  fields,
  formInfo,
  viewActions,
  currentState,
  statusbarVisible,
  onChange,
  onClickCRUD
} = useForm(props, { router, editRef })

const record = computed(() => formInfo.value.record)
function onClickDelConfirm() {
  onClickCRUD('del')
}

const resUsersView = computed(() => api.global_config.resUsersView)

// const labelCol = { span: 4 }
// const wrapperCol = { span: 16 }
</script>

<style type="text/css"></style>
