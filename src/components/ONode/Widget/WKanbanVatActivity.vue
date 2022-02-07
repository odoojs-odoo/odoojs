<template>
  <span>
    <!-- todo:kanban_vat_activity -->
    <!-- {{ value_readonly }} -->
  </span>
</template>

<script>
import OWMixin from './OWMixin'

export default {
  name: 'WKanbanVatActivity',
  components: {},
  mixins: [OWMixin],
  props: {},
  data() {
    return {}
  },
  computed: {
    className() {
      const arr = [...this.classNameByField]

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
