<template>
  <div>
    <!-- {{ fullname }} -->
    <span v-if="node.attrs.string">
      <span v-if="get_invisible(node)">
        hide
      </span>
      <b> {{ node.attrs.string }} </b>
    </span>

    <span v-else-if="children_visible.length">
      <!-- children: {{ children_visible }} -->
      <!-- in Olabel, no string, have child -->

      <ONode
        v-for="(item, index) in children_visible"
        :key="index"
        v-model="value2"
        :dataDict="dataDict"
        :node="item"
        :editable="editable"
        :modelMethod="modelMethod"
        @on-change="handleOnchange"
      />
    </span>
    <span v-else>{{ fullname }}, no string and child. </span>
  </div>
</template>

<script>
import OMixin from './OMixin'

import ONode from './ONode'

export default {
  name: 'OLabel',
  components: { ONode },
  mixins: [OMixin],

  props: {},

  data() {
    return {}
  },
  computed: {},

  async created() {},

  mounted() {},

  methods: {
    // childern_filter(children) {
    //   return (children || []).filter(item => {
    //     // return true
    //     return !this.get_invisible(item)
    //   })
    // }
  }
}
</script>

<style type="text/css"></style>
