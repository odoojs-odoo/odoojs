<template>
  <span v-if="invisible"></span>

  <div v-else-if="widget === 'image'">
    <!-- image:{{ [field.type, fname, widget] }} -->
    <WImage
      :editable="editable"
      :data-info="dataInfo"
      :view-info="{ ...viewInfo, node }"
      @on-change="onchange"
    />
  </div>

  <div v-else-if="widget === 'tax-group-custom-field'">
    <!-- widget: tax-group-custom-field -->
    <WTaxGroupCustomField
      :value_readonly="value_readonly"
      :value_edit="value_edit"
      :editable="editable"
      :data-info="dataInfo"
      :view-info="{ ...viewInfo, node }"
      @on-change="onchange"
    />
  </div>

  <div v-else-if="widget_todo">{{ [field.type, fname, widget] }}</div>

  <span v-else-if="readonly || !editable" :class="className">
    {{ [field.type, fname] }}
    <!-- {{ value_display }} -->
  </span>
  <div v-else>edit: {{ [field.type, fname] }}</div>
</template>

<script>
import OFMixin from './OFMixin'

import WImage from './WImage.vue'

import WTaxGroupCustomField from './WTaxGroupCustomField.vue'

export default {
  name: 'FBinary',
  components: { WImage, WTaxGroupCustomField },
  mixins: [OFMixin],
  props: {},
  data() {
    return {}
  },
  computed: {
    widget_todo() {
      const done = []
      return done.includes(this.widget) ? '' : this.widget
    },

    className() {
      const arr = [...this.classNameByField]
      // arr.push('')
      return arr.join(' ')
    }
  },

  watch: {},

  created() {},

  mounted() {},

  methods: {
    // value_format(value) {
    //   return value || ''
    // }
  }
}
</script>

<style type="text/css"></style>
