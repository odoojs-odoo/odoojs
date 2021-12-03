<template>
  <span v-if="node.attrs.string || node.attrs.title">
    <span v-if="get_invisible(node)">
      hide
    </span>
    <a-button :type="button_type(node)" @click="onclick">
      {{ node.attrs.string || node.attrs.title }}
    </a-button>
  </span>

  <span v-else-if="debug"> button, no name, {{ fullname }} </span>
</template>

<script>
import OMixin from './OMixin'

export default {
  name: 'OButton',
  components: {},
  mixins: [OMixin],

  props: {},

  data() {
    return {}
  },
  computed: {},

  async created() {},

  mounted() {},

  methods: {
    button_type(btn_node) {
      const btn_class = btn_node.class || ''
      const primary =
        btn_class.includes('btn-primary') || btn_class.includes('oe_highlight')

      if (primary) return 'primary'
    },

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
