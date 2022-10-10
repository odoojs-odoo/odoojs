<template>
  <div>
    <a-form-model-item
      :key="fieldInfo.name"
      :label="
        label !== undefined
          ? label
          : no_label == 'hasLabel'
          ? fieldInfo.string
          : no_label
      "
      :prop="fieldInfo.name"
    >
      <OField
        ref="refField"
        :width="width"
        v-model="value2[fieldName]"
        :editable="editable"
        :field-info="fieldInfo"
        :view-info="viewInfo"
        :data-info="dataInfo"
        @change="handleChange"
      />
    </a-form-model-item>
  </div>
</template>

<script>
import OField from '@/components/OField/OField.vue'

export default {
  name: 'FormField',
  components: { OField },

  mixins: [],

  props: {
    no_label: { type: String, default: 'hasLabel' },
    label: { type: String, default: undefined },

    value: { default: undefined },

    width: { type: String, default: undefined },
    editable: { type: Boolean, default: false },

    fieldName: { type: String, default: undefined },
    fields: {
      type: Object,
      default: () => {
        return {}
      }
    },

    // fieldInfo: {
    //   type: Object,
    //   default: () => {
    //     return {}
    //   }
    // },

    viewInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },

    dataInfo: {
      type: Object,
      default: () => {
        return { record: {}, values: {} }
      }
    }
  },

  data() {
    return {}
  },
  computed: {
    value2: {
      get() {
        return this.value || {}
      },
      set(val) {
        this.$emit('input', val)
      }
    },

    fieldInfo() {
      return this.fields[this.fieldName] || {}
    }
  },

  watch: {},

  created() {},

  mounted() {},

  methods: {
    async load_relation() {
      const refField = this.$refs.refField
      if (refField) {
        return await refField.load_relation()
      }
    },

    async load_relation_data(...args) {
      const refField = this.$refs.refField
      if (refField) {
        return await refField.load_relation_data(...args)
      }
    },

    async handleChange(...args) {
      this.$emit('change', ...args)
    }
  }
}
</script>

<style scoped>
.ant-form-item {
  margin-bottom: 0px;
}
</style>
