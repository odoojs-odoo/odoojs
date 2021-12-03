<template>
  <a href="javascript:;" @click="onclick">
    <template v-for="(item, index) in children_visible">
      <ONode
        :key="index"
        :loading="loading"
        :data-info="dataInfo"
        :view-info="{ ...viewInfo, node: item }"
        :method-call="methodCall"
        @on-event="handleOnEvent"
      />
    </template>
  </a>
</template>

<script>
import OMixin from './OMixin'
import ONode from './ONode'
export default {
  name: 'OA',
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
    onclick() {
      // const type = this.node.attrs.type
      // const name = this.node.attrs.name
      // console.log('action:', this.node.attrs, type, name)

      const type = this.node.attrs.type
      const name = this.node.attrs.name
      const context = this.node.attrs.context
      console.log(
        'btn click.',
        type,
        name,
        context,
        JSON.parse(JSON.stringify(this.node))
      )

      this.$emit('on-event', 'button-clicked', {
        node: this.node
        // row_id: this.dataDict.id
      })
    }
  }
}
</script>

<style type="text/css"></style>
