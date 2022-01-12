<template>
  <span v-if="invisible"></span>

  <div v-else-if="widget_todo">
    for debug: {{ [field.type, fname, widget] }}
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
      :show-time="!widget || widget === 'date' ? false : true"
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
  name: 'FDatetime',
  components: { ODatePicker },
  mixins: [OFMixin],
  props: {},
  data() {
    return {}
  },
  computed: {
    value_readonly() {
      const val = this.record[this.fname]
      if (this.widget === 'date') return val ? val.slice(0, 10) : ''
      else return val ? val : ''
    },

    value() {
      const val = this.value_edit
      if (this.widget === 'date') return val ? val.slice(0, 10) : ''
      else return val ? val : ''
    },

    widget_todo() {
      // 'date'
      const done = ['date', 'daterange']
      return done.includes(this.widget) ? '' : this.widget
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
