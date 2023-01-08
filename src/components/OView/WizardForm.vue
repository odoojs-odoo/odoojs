<template>
  <div>
    <!--
      :confirm-loading="confirmLoading"
       @ok="handleOk" @cancel="handleCancel" -->
    <a-modal :title="title" :visible="visible2">
      <template slot="footer">
        <a-button key="back" @click="handleCancel"> Return </a-button>

        <a-button
          v-for="btn in arch_buttons"
          :key="btn.name"
          :type="btn.btn_type"
          :loading="loading"
          @click="handleBtnClick(btn)"
          style="background:yellow"
        >
          {{ btn.string }}
        </a-button>
      </template>

      <a-form-model
        ref="refForm"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :model="formValues"
        :rules="rules_edit"
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
              style="background:orange"
            />
          </template>
        </template>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import formWizardMixin from '@/odooui/formWizardMixin'
import FormField from '@/components/OView/FormField.vue'

export default {
  name: 'WizardFormView',
  components: { FormField },

  mixins: [formWizardMixin],

  props: {
    visible: { type: Boolean, default: false }
  },

  data() {
    return {
      loading: false,

      labelCol: { span: 4 },
      wrapperCol: { span: 14 }
    }
  },
  computed: {
    visible2: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },

  watch: {
    visible(val) {
      if (val) {
        this.init()
      }
    }
  },

  created() {},

  mounted() {},

  methods: {
    async handleBtnClick(btn) {
      // this.ModalText = 'The modal will be closed after two seconds'
      this.loading = true
      await this.button_click(btn)
      this.$emit('done')
      this.visible2 = false
      this.loading = false
    },
    handleCancel() {
      console.log('Clicked cancel button')
      this.visible2 = false
    }
  }
}
</script>

<style scoped type="text/css"></style>
