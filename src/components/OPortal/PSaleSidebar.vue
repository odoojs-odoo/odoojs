<template>
  <!-- <span> TODO PSaleSidebar </span> -->
  <div :class="className">
    <template v-for="(item, index) in node.children">
      <template v-if="item.attrs.id === 'quote_content'">
        <PNode
          :key="index"
          :info="{ ...info, node: quote_content_node, dialog_nodes }"
        />
      </template>

      <template v-else>
        <PNode :key="index" :info="{ ...info, node: item, dialog_nodes }" />
      </template>
    </template>
  </div>
</template>

<script>
import PNodeMixin from './PNodeMixin'
import PNode from './PNode'

const cp = item => JSON.parse(JSON.stringify(item))
export default {
  name: 'PSaleSidebar',
  components: { PNode },
  mixins: [PNodeMixin],

  props: {},

  data() {
    return {
      collapse: false
    }
  },
  computed: {
    quote_content_node() {
      const node2 = this.node.children.find(
        item => item.attrs.id === 'quote_content'
      )

      const node3 = {
        ...node2,
        children: node2.children.filter(item => item.attrs.role !== 'dialog')
      }

      return node3
    },

    dialog_nodes() {
      const node2 = this.node.children.find(
        item => item.attrs.id === 'quote_content'
      )

      const dialog_nodes = node2.children.filter(
        item => item.attrs.role === 'dialog'
      )

      return dialog_nodes
    }
  },

  async created() {},

  mounted() {
    console.log('PSaleSidebar', cp(this.node))
  },

  methods: {
    // onclick(e, item) {
    //   e.preventDefault()
    //   e.stopPropagation()
    //   console.log('btn click.', cp(item))
    // }
  }
}
</script>

<style lang="less"></style>
