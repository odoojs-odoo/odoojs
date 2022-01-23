<template>
  <div class="o_kanban_record" @click="handleOnRowClick2">
    <!-- <div class="o_kanban_record"> -->
    <ONode
      :data-info="dataInfo"
      :view-info="{ ...viewInfo, node, dropdown_menu }"
      @on-event="handleOnEvent"
    />
  </div>
</template>

<script>
import KBNodeMixin from './KBNodeMixin'
import ONode from '@/components/ONode/ONode'

// eslint-disable-next-line no-unused-vars
const cp = val => JSON.parse(JSON.stringify(val))

import { Color_Nodes, search_manage_settings } from './tools'

const manage_settings_node_get = node => {
  return {
    // o_kanban_card_manage_settings
    ...node,
    children: [
      {
        // col-8
        ...node.children[0],
        children: node.children[0].children.map(ch2 => {
          // oe_kanban_colorpicker
          return {
            ...ch2,
            isParent: true,
            children: Color_Nodes
          }
        })
      },

      // col-4
      node.children[1]
    ]
  }
}

export default {
  name: 'OStockKanban',
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
      const manage_settings_nodes = search_manage_settings(
        this.dropdown_menu_node
      )
      const manage_settings_node = manage_settings_nodes[0]
      const ms_node = manage_settings_node_get(manage_settings_node)
      // console.log('ms_node', cp(ms_node))
      const separator = { tagName: 'div', attrs: { role: 'separator' } }
      return [menu1, separator, ms_node]
    }
  },

  watch: {},
  async created() {},
  async mounted() {},

  methods: {
    async handleOnRowClick2() {
      console.log('handleOnRowClick to do nothing')
      // console.log(cp(this.view_node))
      // console.log('node_raw', cp(this.node_raw))
      // console.log('dropdown_menu_node', cp(this.dropdown_menu_node))
    }
  }
}
</script>

<style scoped></style>
