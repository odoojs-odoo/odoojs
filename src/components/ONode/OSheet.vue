<template>
  <div class="clearfix position-relative o_form_sheet">
    <template v-for="(item, index) in node.children">
      <template v-if="!(item.attrs.class || '').includes('oe_chatter')">
        <ONode
          :key="index"
          :editable="editable"
          :loading="loading"
          :data-info="dataInfo"
          :view-info="{ ...viewInfo, node: item }"
          @on-event="handleOnEvent"
        />
      </template>
    </template>

    <template v-for="(item, index) in node.children">
      <template v-if="(item.attrs.class || '').includes('oe_chatter')">
        <div :key="index">
          <!-- oe_chatter -->
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import OMixin from './OMixin'

import ONode from './ONode'

export default {
  name: 'OSheet',
  components: { ONode },
  mixins: [OMixin],

  props: {},

  data() {
    return {}
  },
  computed: {},

  async created() {},

  mounted() {
    // const node = JSON.parse(JSON.stringify(this.node))
    // console.log('sheeet,node,', node)
  },

  methods: {}
}
</script>

<style type="text/css"></style>
