<template>
  <div :class="className">
    <!-- m2m checkboxs {{ [field.type, fname] }}
    <div>{{ value }}</div>
    <div>{{ options }}</div> -->

    <OCheckboxGroup
      :editable="editable"
      :selectionOptions="options"
      :value="value"
      :fname="fname"
      :required="required"
      :placeholder="node.attrs.placeholder"
      :element-id="node.attrs.id || node.attrs.name"
      :className="className"
      @on-change="handleOnchange"
    />
  </div>
</template>

<script>
import OWX2mMixin from './OWX2mMixin'

import api from '@/odooapi'

import OCheckboxGroup from './OInput/OCheckboxGroup.vue'

export default {
  name: 'WM2mCheckboxes',
  components: { OCheckboxGroup },
  mixins: [OWX2mMixin],
  props: {},

  data() {
    return {
      options: []
    }
  },
  computed: {
    value() {
      return this.tuples2ids(this.value_edit)
    }
  },

  watch: {
    // eslint-disable-next-line no-unused-vars
    widget(newVal, oldval) {
      // console.log('m2m widget, watch', this.fname, newVal, oldval)
      if (newVal) {
        this.load_m2m()
      }
    }
  },

  async created() {},

  async mounted() {
    // console.log('m2m checkbox, mounteh', this.fname, this.widget)
    if (this.widget) {
      this.load_m2m()
    }
  },

  methods: {
    async load_m2m() {
      // console.log('m2m checkbox, load_m2m', this.fname)
      const result = await api.Node.load_m2m_checkboxs_data(this.viewInfo)
      // console.log('m2m load_m2m_checkboxs_data', this.fname, result)
      this.options = result
    },

    handleOnchange(checkedValues) {
      // console.log(checkedValues)
      const value = [[6, false, checkedValues]]
      this.onchange(value)
    }
  }
}
</script>

<style type="text/css" scoped></style>
