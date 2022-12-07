<template>
  <div>
    <FormNavbar
      :title="navbar_title"
      :buttons="buttons"
      :hasActive="hasActive"
      :editable="editable"
      :record="record"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <OToolbar
      :editable="editable"
      :current-state="current_state"
      :states="header_statusbar_visible"
      :buttons="header_buttons"
      @button-clicked="handleBtnClicked"
    />

    <WizardForm
      :visible.sync="wizardVisible"
      :action="wizardAction"
      :actionIds="[res_id]"
      @done="handleWizardDone"
    />

    <a-form-model
      ref="refForm"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :model="formValues"
      :rules="rules_edit"
      class="formNewStyle"
    >
      <template v-for="meta in fields">
        <template v-if="invisible_get(meta)">
          <!-- invisible: {{ meta.name }}: {{ record[meta.name] }} -->
        </template>

        <template v-else>
          <FormField
            :key="meta.name"
            :field-name="meta.name"
            ref="refField"
            width="120px"
            v-model="formValues"
            :editable="editable"
            :fields="fields"
            :view-info="viewInfo"
            :data-info="dataInfo"
            @change="handleChange"
          />

          <!-- 
            <a-form-model-item
            :key="meta.name"
            :label="meta.string"
            :prop="meta.name"
          >
            <OField
              ref="refField"
              width="120px"
              v-model="formValues[meta.name]"
              :editable="editable"
              :field-info="meta"
              :view-info="viewInfo"
              :data-info="dataInfo"
              @change="handleChange"
            />
          </a-form-model-item>
          
           -->
        </template>
      </template>
    </a-form-model>
  </div>
</template>

<script>
import formMixin from '@/odooui/formMixin'
import FormNavbar from '@/components/ONavbar/formNavbar.vue'
import OToolbar from '@/components/OToolbar/index.vue'
import WizardForm from '@/components/OView/WizardForm.vue'

import FormField from '@/components/OView/FormField.vue'

export default {
  name: 'FormView',
  components: { FormNavbar, OToolbar, WizardForm, FormField },

  mixins: [formMixin],

  props: {},

  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 }
    }
  },
  computed: {},

  watch: {},

  created() {},

  mounted() {},

  methods: {
    onClickLeft() {
      if (this.editable) {
        this.onClickCancel()
      } else {
        this.onClickBack()
      }
    },

    onClickRight(btn) {
      const btn_fns = {
        save: 'onClickSave',
        edit: 'onClickEdit',
        new: 'onClickNew',
        del: 'onClickDel',
        unlink: 'onClickDel',
        copy: 'handleOnCopy',
        archive: 'handleOnArchive',
        unarchive: 'handleOnUnarchive'
      }

      this[btn_fns[btn]]()
    }
  }
}
</script>

<style scoped type="text/css">
.formNewStyle {
  display: flex;
  background: white;
  flex-wrap: wrap;
  padding: 10px;
  margin-top: 10px;
}
:deep(.formNewStyle .ant-form-item) {
  margin-bottom: 5px;
  width: 400px;
}
</style>
