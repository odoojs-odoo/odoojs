<template>
  <span v-if="invisible"></span>
  <WMonetary
    v-else-if="!widget || widget === 'monetary'"
    :value_readonly="value_readonly"
    :value_edit="value_edit"
    :editable="editable"
    :data-info="dataInfo"
    :view-info="{ ...viewInfo, node }"
    @on-change="onchange"
  />

  <div v-else-if="widget_todo">{{ [field.type, fname, widget] }}</div>
</template>

<script>
import OFMixin from './OFMixin'
import WMonetary from './WMonetary.vue'

export default {
  name: 'FMonetary',
  components: { WMonetary },
  mixins: [OFMixin],
  props: {},
  data() {
    return {}
  },
  computed: {
    value_readonly() {
      // Number(val.toFixed(2))
      return this.record[this.fname] || 0
    },

    widget_todo() {
      const done = []
      return done.includes(this.widget) ? '' : this.widget
    },

    className() {
      const arr = [...this.classNameByField]
      arr.push('o_field_monetary')
      arr.push('o_field_number')

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
