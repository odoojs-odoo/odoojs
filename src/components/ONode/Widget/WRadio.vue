<template>
  <div v-if="readonly || !editable" :class="className">
    <!-- {{ [field.type, fname, widget] }} -->
    <span>
      {{ value_display }}
    </span>
  </div>
  <ORadio
    v-else
    :value="value"
    :selectionOptions="selectionOptions"
    :fname="fname"
    :required="required"
    :placeholder="node.attrs.placeholder"
    :element-id="node.attrs.id || node.attrs.name"
    :className="className"
    @on-change="onchange"
  />
</template>
<script>
import OWMixin from './OWMixin'

import ORadio from './OInput/ORadio.vue'

export default {
  name: 'WRadio',
  components: { ORadio },
  mixins: [OWMixin],
  props: {
    selectionOptions: { type: Array, default: () => [] }
  },

  data() {
    return {}
  },

  computed: {
    className() {
      const arr = [...this.classNameByField]
      arr.push('o_field_radio')
      return arr.join(' ')
    }
  },

  watch: {},

  async mounted() {},

  methods: {}
}
</script>

<style type="text/css" scoped></style>
