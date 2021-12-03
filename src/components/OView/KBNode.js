import { is_node } from '@/odoojs/utils'

import { tools } from '@/odoojs'

const deep_copy = node => {
  return JSON.parse(JSON.stringify(node))
}

const node_map = {
  span: 'span',
  div: 'div',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  b: 'b',
  bold: 'b',
  p: 'p',
  a: 'a',
  strong: 'strong',
  newline: 'div'
}

export default {
  name: 'KBNode',
  components: {},

  props: {
    dataDict: {
      type: Object,
      default: () => {
        return {}
      }
    },

    viewInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  data() {
    return {}
  },

  computed: {
    fullname() {
      return this.node.fullName
    },

    node() {
      return this.viewInfo.node || { children: [] }
    }
  },

  watch: {},

  render(createElement) {
    // console.log(this.viewInfo)
    return this.renderNode(createElement, this.node)
  },

  methods: {
    renderNode(createElement) {
      const node = this.node

      if (!is_node(node)) {
        return createElement('span', {}, [node])
      }
      if (!node.tagName) {
        return createElement('span', {}, [])
      }

      const tagName = node_map[node.tagName]
      if (!tagName) {
        console.log(node)
        return createElement('div', {}, [
          createElement('div', {}, [this.fullname, '-- KB nook'])
        ])
      }

      const children = node.children.map(item => {
        return this.getChildren(createElement, item)
      })

      return createElement(tagName, { attrs: {} }, [...children])
    },

    getChildren(createElement, node) {
      if (!is_node(node)) {
        return createElement('span', {}, [node])
      }

      const tagName = node_map[node.tagName]
      if (tagName) {
        const self = this

        return createElement('KBNode', {
          attrs: {},
          props: {
            viewInfo: { ...self.viewInfo, node },
            dataDict: self.dataDict
          }
        })
      } else if (node.tagName === 'field') {
        const fields = this.viewInfo.fields || {}
        const fname = node.attrs.name
        const meta = fields[fname] || {}

        if (['many2one', 'selection'].includes(meta.type))
          return this.dataDict[`${fname}__name`]
        else return this.dataDict[fname]
      } else if (node.tagName === 'img') {
        const url = tools.kanban_image_url(node.children[0], {
          view_info: this.viewInfo,
          dataDict: this.dataDict
        })

        return createElement('img', { attrs: { src: url } })
      } else {
        console.log('field,', deep_copy(node))
        return `${node.tagName}-nook`
      }
    }
  }
}
