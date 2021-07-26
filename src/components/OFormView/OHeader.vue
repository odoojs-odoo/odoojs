<template>
  <div>
    <!-- Header! to be done
    {{ fullname }} -->

    <div>
      <Row>
        <Col span="1"> .</Col>
        <Col span="12">
          <span v-for="(btn, index) in header_buttons" :key="index">
            <Button :type="button_type(btn)" size="small" @click="onClick(btn)">
              {{ btn.attrs.string }}
            </Button>
          </span>
        </Col>
        <Col span="11">
          <span v-for="(btn, index) in header_statusbar_visible" :key="index">
            <Tag :color="btn[0] === value2.state ? 'blue' : undefined">
              {{ btn[1] }}
            </Tag>
          </span>
        </Col>
      </Row>

      <Divider />
    </div>
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

        const current_state = this.value2[fname]

        if (!states.includes(current_state)) {
          states.push(current_state)
        }

        const selections2 = this.model.fields.state.selection
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
    childern_filter(children) {
      // console.log(children)
      // const children2 = [children[3]]

      // const values_modifiers = this.model.values_modifiers
      // console.log(this.model, values_modifiers)

      return (children || []).filter(item => {
        if (this.debug) {
          return true
        } else {
          const invisible = this.get_invisible(item)

          // console.log(item, invisible)

          return !invisible
          // return !this.get_invisible(item)
        }
      })
    },

    onClick(btn) {
      // name: "button_draft"
      // string: "重置为草稿"
      // type: "object"

      // const type = btn.attrs.type
      // const name = btn.attrs.name
      // console.log(this.model, type, name)

      this.$emit('button-clicked', { ...btn.attrs })
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
