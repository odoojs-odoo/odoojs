<template>
  <div>
    <!-- <a-modal :title="title" :visible="visible2">
      {{ resId }}
      {{ action }}
      <template slot="footer">
        <a-button key="back" @click="handleCancel"> Return </a-button>

        <a-button
          v-for="btn in arch_buttons"
          :key="btn.name"
          :type="btn.btn_type"
          :loading="loading"
          @click="handleBtnClick(btn)"
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
            invisible: {{ meta.name }}: {{ record[meta.name] }}
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
      </a-form-model>
    </a-modal> -->
  </div>
</template>

<script>
// import formModalMixin from '@/odooui/formModalMixin'
// import FormField from 'src2/FormField.vue'

// export default {
//   name: 'ModalFormView',

//   components: { FormField },

//   mixins: [formModalMixin],

//   props: {
//     visible: { type: Boolean, default: false }
//   },

//   data() {
//     return {
//       loading: false,

//       labelCol: { span: 4 },
//       wrapperCol: { span: 14 }
//     }
//   },

//   computed: {
//     visible2: {
//       get() {
//         return this.visible
//       },
//       set(val) {
//         this.$emit('update:visible', val)
//       }
//     }
//   },

//   watch: {
//     visible(val) {
//       if (val) {
//         this.init()
//       }
//     }
//   },

//   created() {},

//   mounted() {},

//   methods: {
//     async handleBtnClick(btn) {
//       console.log(btn)
//       this.loading = true
//       await this.handelCommit()
//       //   this.$emit('done')
//       this.visible2 = false
//       this.loading = false
//     },
//     handleCancel() {
//       console.log('Clicked cancel button')
//       this.visible2 = false
//     }
//   }
// }
</script>

<style scoped type="text/css"></style>
