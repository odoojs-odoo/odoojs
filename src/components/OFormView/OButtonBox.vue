<template>
  <div>
    <Divider />

    <span v-for="(btn, index) in children_visible" :key="index">
      <OStatButton
        v-if="btn.tagName === 'button'"
        v-model="value2"
        :dataDict="dataDict"
        :node="btn"
        :editable="editable"
        :modelMethod="modelMethod"
        @on-change="handleOnchange"
      />

      <span v-else>
        ==== in button box, not button
      </span>
    </span>

    <Divider />
  </div>
</template>

<script>
import OMixin from './OMixin'

import OStatButton from './OStatButton'

export default {
  name: 'OButtonBox',
  components: { OStatButton },
  mixins: [OMixin],

  props: {},

  data() {
    return {}
  },
  computed: {
    // children_visible() {
    //   console.log(this.node.children)
    //   console.log(this.childern_filter(this.node.children))
    //   return this.childern_filter(this.node.children)
    // }
  },

  async created() {},

  mounted() {},

  methods: {
    //
  }
}
</script>

<style type="text/css"></style>
