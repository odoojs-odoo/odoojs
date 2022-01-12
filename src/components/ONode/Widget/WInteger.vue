<template>
  <div v-if="readonly || !editable" :class="className">
    <!-- {{ [field.type, fname, widget] }} -->
    <span> {{ value_display }} </span>
  </div>
  <!-- <div v-else>edit: {{ [field.type, fname, widget] }}</div> -->
  <OInput
    v-else
    :value="value"
    type="number"
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

import OInput from './OInput/OInput.vue'

export default {
  name: 'WInteger',
  components: { OInput },
  mixins: [OWMixin],
  props: {},
  data() {
    return {}
  },
  computed: {
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
