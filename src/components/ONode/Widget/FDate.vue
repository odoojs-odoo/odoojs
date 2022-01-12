<template>
  <span v-if="invisible"></span>
  <div v-else-if="widget_todo">
    {{ [field.type, fname, widget] }}
  </div>
  <div v-else-if="readonly || !editable" :class="className">
    <!-- {{ [field.type, fname] }} -->
    <span>
      {{ value_display }}
    </span>
  </div>
  <div v-else>
    <!-- edit: {{ [field.type, fname] }} -->
    <ODatePicker
      :value="value"
      :fname="fname"
      :required="required"
      :placeholder="node.attrs.placeholder"
      :element-id="node.attrs.id || node.attrs.name"
      :className="className"
      @on-change="onchange"
    />
  </div>
</template>

<script>
import OFMixin from './OFMixin'

import ODatePicker from './OInput/ODatePicker.vue'

export default {
  name: 'FDate',
  components: { ODatePicker },
  mixins: [OFMixin],
  props: {},
  data() {
    return {}
  },
  computed: {
    value_readonly() {
      return this.record[this.fname] || ''
    },

    value() {
      return this.value_edit || ''
    },

    className() {
      const arr = [...this.classNameByField]
      arr.push('o_field_date')

      if (!this.record[this.fname]) arr.push('o_field_empty')
      return arr.join(' ')
    }
  },

  watch: {},

  created() {},

  mounted() {},

  methods: {}
}
</script>

<style type="text/css"></style>
