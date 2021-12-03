<template>
  <span v-if="!invisible_by_oe_read_or_edit_only || debug">
    <template v-if="node.attrs.string">
      <span v-if="get_invisible(node) || invisible_by_oe_read_or_edit_only">
        hide2
      </span>
      <b> {{ node.attrs.string }} </b>
    </template>

    <template v-else-if="children_visible.length">
      children: {{ children_visible }}
      in Olabel, no string, have child

      <!-- <ONode
        v-for="(item, index) in children_visible"
        :key="index"
        
        
        :node="item"
        :editable="editable"
            :method-call="methodCall"
@on-event="handleOnEvent"
      /> -->
    </template>
    <template v-else>{{ fullname }}, no string and child. </template>
  </span>
</template>

<script>
import OMixin from './OMixin'

// import ONode from './ONode'

export default {
  name: 'OLabel',
  // components: { ONode },
  mixins: [OMixin],

  props: {},

  data() {
    return {}
  },
  computed: {},

  async created() {},

  mounted() {},

  methods: {}
}
</script>

<style type="text/css"></style>
