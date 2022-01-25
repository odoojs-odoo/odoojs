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

import { Color_Nodes, search_manage_settings, search_settings } from './tools'

// eslint-disable-next-line no-unused-vars
const cp = val => JSON.parse(JSON.stringify(val))

const manage_settings_node_get = node => {
  return {
    // o_kanban_card_manage_settings
    ...node,
    children: node.children.map(ch1 => {
      // col-8
      return {
        ...ch1,
        children: ch1.children.map(ch2 => {
          // oe_kanban_colorpicker
          return {
            ...ch2,
            isParent: true,
            children: Color_Nodes
          }
        })
      }
    })
  }
}

const settings_node_get = node => {
  const [ch1, ch2] = node.children
  return {
    ...node,
    children: [
      ch1,
      {
        ...ch2,
        isParent: true,
        children: [
          {
            tagName: 'a',
            attrs: {
              class: 'oe_kanban_action oe_kanban_action_a',
              ['data-type']: 'edit'
            },
            content: '配置'
          }
        ]
      }
    ]
  }
}

export default {
  name: 'OAccountKanban',
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

      const settings_nodes = search_settings(this.dropdown_menu_node)
      const settings_node = settings_nodes[0]
      const sett = settings_node_get(settings_node)

      const separator = { tagName: 'div', attrs: { role: 'separator' } }
      return [menu1, separator, ms_node, separator, sett]
    }
  },

  watch: {},
  async created() {},
  async mounted() {},

  methods: {
    async handleOnRowClick2() {
      console.log('handleOnRowClick to do nothing')
      console.log(cp(this.view_node))
      console.log('node_raw', cp(this.node_raw))
      // console.log('dropdown_menu_node', cp(this.dropdown_menu_node))
      // //   this.$emit('on-row-click')
    }
  }
}
</script>

<style scoped></style>
