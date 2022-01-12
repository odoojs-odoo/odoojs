<template>
  <span v-if="node.attrs.nolabel" class="o_stat_value">
    {{ value_display }}
  </span>

  <div v-else :class="className">
    <span class="o_stat_value"> {{ value_display }} </span>
    <span class="o_stat_text"> {{ node.attrs.string || field.string }} </span>
  </div>
</template>

<script>
import OWMixin from './OWMixin'

export default {
  name: 'WStatinfo',
  components: {},
  mixins: [OWMixin],
  props: {},
  data() {
    return {}
  },
  computed: {
    className() {
      const arr = [...this.classNameByField]
      arr.push('o_stat_info')
      return arr.join(' ')
    }
  },

  watch: {},

  created() {},

  mounted() {
    // console.log(this.fname, this.node, this.field)
  },

  methods: {}
}
</script>

<style type="text/css"></style>
