<template>
  <div :class="className" @click="handleOnRowClick2">
    <template v-for="(item, index) in node.children">
      <ONode
        :key="index"
        :data-info="dataInfo"
        :view-info="{ ...viewInfo, node: item, dropdown_menu }"
        @on-event="handleOnEvent"
      />
    </template>
  </div>
</template>

<script>
import KBNodeMixin from './KBNodeMixin'
import ONode from '@/components/ONode/ONode'
import { Color_Nodes } from './tools'

const color_node_append = node => {
  return {
    ...node,
    children: node.children.map(item => {
      return {
        ...item,
        isParent: true,
        children: Color_Nodes
      }
    })
  }
}

// eslint-disable-next-line no-unused-vars
const cp = val => JSON.parse(JSON.stringify(val))

export default {
  name: 'OProjectKanban',
  components: { ONode },

  mixins: [KBNodeMixin],

  props: {},

  data() {
    return {}
  },
  computed: {
    dropdown_menu() {
      const menus = this.dropdown_menu_node.children || []
      if (menus.length < 2) return menus

      const menu1 = menus[0]
      const color_node = menus[1]
      const color_node2 = color_node_append(color_node)

      const separator = { tagName: 'div', attrs: { role: 'separator' } }
      return [...menu1.children, separator, color_node2]
    }
  },

  watch: {},
  async created() {},
  async mounted() {},

  methods: {
    // async handleOnRowClick2() {
    //   console.log('handleOnRowClick to emit')
    //   console.log(cp(this.view_node))
    //   console.log('node_raw', cp(this.node_raw))
    //   console.log('dropdown_menu_node', cp(this.dropdown_menu_node))
    //   //   this.$emit('on-row-click')
    // },

    async handleOnRowClick() {
      const node_for_click = this.node.children[1].children[0]
      console.log('handleOnRowClick project', cp(this.node))
      // console.log('handleOnRowClick project2', cp(node_for_click))
      this.handleButtonClicked(node_for_click)
    }
  }
}
</script>

<style scoped></style>
