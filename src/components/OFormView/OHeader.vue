<template>
  <div>
    <a-row>
      <a-col :span="1"> .</a-col>
      <a-col :span="12">
        <a-space> </a-space>

        <a-button
          v-for="(btn, index) in header_buttons"
          :key="index"
          :type="button_type(btn)"
          size="small"
          @click="onClick(btn)"
        >
          {{ btn.attrs.string }}
        </a-button>
      </a-col>
      <a-col :span="11">
        <span v-for="(btn, index) in header_statusbar_visible" :key="index">
          <a-tag :color="btn[0] === dataDict.state ? 'blue' : undefined">
            {{ btn[1] }}
          </a-tag>
        </span>
      </a-col>
    </a-row>

    <a-divider />
  </div>
</template>

<script>
import OMixin from './OMixin'

export default {
  name: 'OHeader',
  components: {},
  mixins: [OMixin],

  props: {},

  data() {
    return {}
  },
  computed: {
    header_buttons() {
      const children = this.children_visible
      const nodes = children.filter(node => this.is_header_button(node))
      return nodes
    },

    header_statusbar() {
      const children = this.children_visible
      const nodes = children.find(node => this.is_header_statusbar(node))
      return nodes
    },

    header_statusbar_visible() {
      const node_statusbar = this.header_statusbar
      if (node_statusbar) {
        const str = node_statusbar.attrs.statusbar_visible || ''
        if (!str) {
          return []
        }

        const states = str.split(',')
        const fname = node_statusbar.attrs.name

        const current_state = this.dataDict[fname]

        if (!states.includes(current_state)) {
          states.push(current_state)
        }

        const meta = this.viewInfo.fields || { state: { selection: [] } }

        const selections2 = meta.state.selection || []
        const selections = selections2.reduce((acc, cur) => {
          return { ...acc, [cur[0]]: cur[1] }
        }, {})

        return states.map(item => [item, selections[item]])
      } else {
        return []
      }
    }
  },

  async created() {},

  mounted() {},

  methods: {
    onClick(btn) {
      // name: "button_draft"
      // string: "重置为草稿"
      // type: "object"

      // const type = btn.attrs.type
      // const name = btn.attrs.name
      // console.log(this.model, type, name)

      this.$emit('on-event', 'button-clicked', { node: btn })
    },

    button_type(btn_node) {
      //  <!-- class: "oe_highlight" -->

      // btn-primary
      const oe_highlight = (btn_node.class || '').includes('oe_highlight')
      const btn_primary = (btn_node.class || '').includes('btn-primary')

      if (oe_highlight || btn_primary) {
        return 'primary'
      }
    },

    is_header_button(node) {
      // tagName: "button"
      return node.tagName === 'button'
    },

    is_header_statusbar(node) {
      // field widget='statusbar'
      return node.tagName === 'field' && node.attrs.widget === 'statusbar'
    }
  }
}
</script>

<style type="text/css"></style>
