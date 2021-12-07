<template>
  <span v-if="!invisible_by_oe_read_or_edit_only || debug">
    <template v-if="node.attrs.string">
      <span v-if="get_invisible(node) || invisible_by_oe_read_or_edit_only">
        hide2
      </span>
      <label :for="node.attrs.for">
        <b> {{ node.attrs.string }} </b>
      </label>
    </template>

    <template v-else-if="children_visible.length">
      <!-- children: {{ children_visible }}
      in Olabel, no string, have child -->

      <template v-for="(item, index) in children_visible">
        <ONode
          :key="index"
          :editable="editable"
          :loading="loading"
          :data-info="dataInfo"
          :view-info="{ ...viewInfo, node: item }"
          :method-call="methodCall"
          @on-event="handleOnEvent"
        />
      </template>

      <!-- -->
    </template>

    <template v-else>
      <div>label:</div>
      <!-- {{ fullname }}, -->
      no string and child.
    </template>
  </span>
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

  methods: {}
}
</script>

<style type="text/css"></style>
