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

        <template v-else-if="['move_ids_without_package'].includes(meta.name)">
          <!-- www: {{ meta.name }} -->
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
        </template>
      </template>

      <!-- <FormField2
        :key="'move_ids_without_package'"
        :field-name="'move_ids_without_package'"
        ref="refRelation_move_ids_without_package"
        width="120px"
        v-model="formValues"
        :editable="editable"
        :fields="fields"
        :view-info="viewInfo"
        :data-info="dataInfo"
        @change="handleChange"
      /> -->

      <a-form-model-item prop="move_ids_without_package">
        <LineIds
          width="120px"
          ref="refRelation_move_ids_without_package"
          v-model="formValues.move_ids_without_package"
          :editable="editable"
          :field-info="{ ...meta_get('move_ids_without_package') }"
          :view-info="viewInfo"
          :data-info="dataInfo"
          @change="handleChange"
        />
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import formMixin from '@/odooui/formMixin'
import FormNavbar from '@/components/ONavbar/formNavbar.vue'
import OToolbar from '@/components/OToolbar/index.vue'
import WizardForm from '@/components/OView/WizardForm.vue'

import FormField from '@/components/OView/FormField.vue'

import LineIds from './line_ids.vue'

export default {
  name: 'FormView',
  components: { FormNavbar, OToolbar, WizardForm, FormField, LineIds },

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
/deep/.formNewStyle .ant-form-item {
  margin-bottom: 5px;
  width: 400px;
}
</style>
