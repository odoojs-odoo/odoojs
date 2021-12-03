import OMixin from './OMixin'

import { is_node } from '@/odoojs/utils'

// let count_me = 1
// let last_time = 0

const node_map = {
  span: 'span',
  div: 'div',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  b: 'b',
  bold: 'b',
  p: 'p',
  // a: 'a',
  strong: 'strong',
  newline: 'div',
  hr: 'hr',
  i: 'i',
  br: 'br'
}

const node_map2 = {
  // i: 'OTooltip',
  a: 'OA',
  button: 'OButton',
  label: 'OLabel',
  field: 'OField'
  // img: 'OImg',
  // group: 'OGroup'
  // // separator
}

export default {
  name: 'ONode',
  components: {
    // OImg: () => import('./OImg'),
    OA: () => import('./OA'),
    OButton: () => import('./OButton'),
    OLabel: () => import('./OLabel'),
    OField: () => import('./OField')
    // OTooltip: () => import('./OTooltip'),
    // OGroup: () => import('./OGroupOut')
  },

  mixins: [OMixin],
  props: {},

  computed: {},

  render(createElement) {
    return this.renderNode(createElement, this.node)
  },

  methods: {
    renderNode(createElement) {
      // // const deep_copy = node => {
      // //   return JSON.parse(JSON.stringify(node))
      // // }

      const node = this.node
      if (!node) {
        console.log('error:  parent node,')
        throw 'error node'
      }

      if (!is_node(node)) {
        // 单字符串 做节点, 只能加上一个  span, 如果要去掉 span, 只能在上一级, 处理掉
        return createElement('span', {}, [node])
      }

      // 根据 oe_edit_only 和 oe_read_only, 隐藏节点
      const invisible = this.invisible_by_oe_read_or_edit_only
      if (invisible && !this.debug) {
        return createElement('span', {}, [])
      }

      const tagName = node_map[node.tagName]
      if (!tagName) {
        return createElement('div', {}, [
          createElement('div', {}, ['--Node nook ', this.fullname])
        ])
      }

      const children1 = this.children_visible.map(item => {
        return this.getChildren(createElement, item)
      })

      const debug_info = this.debug && node.class ? ['(', node.class, ')'] : []

      const children = [...debug_info, ...children1]

      const tagName2 =
        tagName === 'span' && node.class === 'o_stat_text' ? 'div' : tagName

      return createElement(tagName2, { attrs: {}, class: node.class }, [
        ...children
      ])
    },

    getChildren(createElement, node) {
      // name="qty_at_date_widget"
      if (
        node.tagName === 'widget' &&
        node.attrs.name === 'qty_at_date_widget'
      ) {
        return ''
      }

      const tagName2 = node_map2[node.tagName] || 'ONode'

      const self = this

      return createElement(tagName2, {
        attrs: {},
        class: node.class,

        props: {
          editable: self.editable,
          loading: self.loading,
          dataInfo: self.dataInfo,
          viewInfo: { ...self.viewInfo, node },
          methodCall: self.methodCall
        },
        on: {
          'on-event': self.handleOnEvent
        }
      })
    }
  }
}
