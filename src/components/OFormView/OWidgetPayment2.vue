<template>
  <div>
    <!-- {{ fullname }}
    {{ fname }}
    {{ value_readonly }} -->
    <!-- {{ dataDict[fname] }} -->

    <div v-for="(row, index) in value_readonly.content" :key="index">
      {{ `于 ${row.date} 已付  ${row.currency}${row.amount}` }}
    </div>
  </div>
</template>

<script>
import OMixin from './OMixin'

export default {
  name: 'OWidgetPayment2',
  components: {},
  mixins: [OMixin],

  props: {},

  data() {
    return {}
  },
  computed: {
    fname() {
      return this.node.attrs.name
    },

    value_readonly() {
      const val_str = this.dataDict[this.fname]
      const val = val_str ? JSON.parse(val_str) : {}
      console.log(val)
      return val
    }
  },

  async created() {},

  mounted() {},

  methods: {}
}
</script>

<style type="text/css"></style>
