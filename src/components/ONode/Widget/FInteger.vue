<template>
  <span v-if="invisible"></span>
  <div v-else-if="widget === 'statinfo'">
    <!-- {{ [field.type, fname, widget] }} -->
    <!-- {{ record[fname] }}
    {{ value_readonly }} -->

    <WStatinfo
      :value_readonly="value_readonly"
      :value_edit="value_edit"
      :data-info="dataInfo"
      :view-info="{ ...viewInfo, node }"
    />
  </div>

  <div v-else-if="widget_todo">{{ [field.type, fname, widget] }}</div>

  <WInteger
    v-else
    :value_readonly="value_readonly"
    :value_edit="value_edit"
    :editable="editable"
    :data-info="dataInfo"
    :view-info="{ ...viewInfo, node }"
    @on-change="onchange"
  />
</template>

<script>
import OFMixin from './OFMixin'

import WStatinfo from './WStatinfo.vue'
import WInteger from './WInteger.vue'

export default {
  name: 'OInteger',
  components: { WStatinfo, WInteger },
  mixins: [OFMixin],
  props: {},
  data() {
    return {}
  },
  computed: {
    value_readonly() {
      return this.record[this.fname] || 0
    },

    className() {
      const arr = [...this.classNameByField]
      arr.push('o_field_integer')
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
