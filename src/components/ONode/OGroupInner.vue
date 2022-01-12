<template>
  <table :class="className">
    <OGroupTbody
      :editable="editable"
      :loading="loading"
      :data-info="dataInfo"
      :view-info="{ ...viewInfo, node }"
      @on-event="handleOnEvent"
    />
  </table>
</template>

<script>
import OMixin from './OMixin'

import OGroupTbody from './OGroupTbody'

export default {
  name: 'OGroupInner',
  components: { OGroupTbody },
  mixins: [OMixin],
  props: {},
  data() {
    return {}
  },
  computed: {
    fname() {
      return this.node.attrs.name
    },

    className() {
      // console.log(this.node)
      // col or colspan. which one ?
      const col = Number(this.node.attrs.col || '1')
      const arr = [...this.classNameByNode]
      arr.push('o_group')
      arr.push('o_inner_group')
      arr.push(`o_group_col_${6 * col}`)
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
