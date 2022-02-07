import PNodeMixin from './PNodeMixin'

const cp = item => JSON.parse(JSON.stringify(item))

const is_node = node => {
  if (typeof node !== 'object') return false
  if (Array.isArray(node)) return false
  if (typeof node === 'boolean') return false
  return true
}

const Tags_Ready1 = ['span', 'div', 'p', 'br', 'hr', 'ul', 'li']
const Tags_Ready2 = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'b', 'em']
const Tags_Ready3 = [
  // 'link',
  // 'code',
  // 'small',
  'i'
  // 'samp', 'time'
]
const Tags_Ready4 = [
  'main',
  'address',
  'form',
  'input',
  'label',
  'select',
  'option',
  'section',

  'table',
  'thead',
  'tr',

  'th',
  'td',
  'tbody',

  'body',
  'img',
  ''

  // 'header',
  //

  //
  // 'button',
  // 'ol',
  //

  // 'textarea',
  // 'footer',
]

const Tags_Ready = [
  ...Tags_Ready1,
  ...Tags_Ready2,
  ...Tags_Ready3,
  ...Tags_Ready4
]
const Tags_To_Map = {
  ol: 'ul'
  // newline: 'div',
  // bold: 'b',
  // from: 'form',
  // t: 'div'
}

const GetTagToCreate = tag => {
  if (Tags_Ready.includes(tag)) return tag
  if (Tags_To_Map[tag]) return Tags_To_Map[tag]
  return undefined
}

const node_map2 = {
  a: 'PA',
  button: 'PButton',
  nav: 'PNav'
  // widget: 'OWidget',
  // field: 'OField',
  // group: 'OGroup',
  // notebook: 'ONotebook',
  // label: 'OLabel',
  // img: 'OImg',
  // separator: 'OSeparator'
  // // i: 'OTooltip', TODO?
  // // // separator
}

export default {
  name: 'PNode',
  components: {
    PA: () => import('./PA'),
    PButton: () => import('./PButton'),
    PCount: () => import('./PCount'),
    PDocs: () => import('./PDocs'),
    PNav: () => import('./PNav'),
    PDropdownMenu: () => import('./PDropdownMenu'),
    PSearchPanel: () => import('./PSearchPanel'),
    PSaleSidebar: () => import('./PSaleSidebar')
  },

  mixins: [PNodeMixin],

  props: {},

  data() {
    return {}
  },
  computed: {},

  watch: {},
  async created() {},
  async mounted() {},

  render(createElement) {
    // console.log(cp(this.node), cp(this.record))
    return this.renderNode(createElement, this.node)
  },

  methods: {
    renderNode(createElement, node) {
      if (!node) {
        console.log('error:  parent node,')
        throw 'error node'
      }

      if (!is_node(node)) {
        // 单字符串 做节点, 只能加上一个  span, 如果要去掉 span, 只能在上一级, 处理掉
        return createElement('span', {}, [node])
      }

      if (!node.tagName) {
        return createElement('span', {}, [])
      }

      // data-placeholder_count
      // o_portal_docs
      // o_portal_search_panel
      // o_portal_sale_sidebar

      // class: btn-group.
      //     and  children=[{tagName: button, attrs.class: dropdown-toggle},
      //                    {tagName: div, attrs.class: dropdown-menu}]

      const node_attrs = node.attrs || {}
      const node_class = node_attrs.class || ''

      const is_dropdownMenu_get = () => {
        //
        if (!node_class.includes('btn-group')) return false
        if (node.children.length !== 2) return false

        const ch0 = node.children[0]
        const ch1 = node.children[1]

        if (
          ch0.tagName !== 'button' ||
          !ch0.attrs.class.includes('dropdown-toggle')
        )
          return false

        if (!ch1.attrs.class.includes('dropdown-menu')) return false

        return true
      }

      const is_dropdownMenu = is_dropdownMenu_get()

      if (node_class.includes('o_portal_docs')) {
        return this.renderNode2(createElement, node, 'PDocs')
      } else if (is_dropdownMenu) {
        return this.renderNode2(createElement, node, 'PDropdownMenu')
      } else if (node_class.includes('o_portal_search_panel')) {
        return this.renderNode2(createElement, node, 'PSearchPanel')
      } else if (node_class.includes('o_portal_sale_sidebar')) {
        return this.renderNode2(createElement, node, 'PSaleSidebar')
      } else if (node_attrs['data-placeholder_count']) {
        return this.renderNode2(createElement, node, 'PCount')
      }

      const tagName2 = node_map2[node.tagName]

      if (tagName2) {
        // if(node.attrs.attrs){
        //   console.log('node.tagName2222,,,', node.attrs.attrs);
        // }

        return this.renderNode2(createElement, node, tagName2)
      }

      const tagName = GetTagToCreate(node.tagName)
      if (tagName) {
        // console.log('node.tagName,,,', node.tagName, tagName);
        const get_children = () => {
          if (!node.children || !node.children.length) {
            return [node.content]
          } else {
            const childs = node.children || []
            return childs.map(item => this.renderNode(createElement, item))
          }
        }

        const children = get_children()

        return createElement(
          tagName,
          { attrs: node.attrs || {}, class: (node.attrs || {}).class },
          [...children]
        )
      }

      console.log('--Node nook,', node.tagName, cp(node))

      return createElement('div', {}, [
        createElement('div', {}, ['TODO in Nodejs:', node.tagName])
      ])
    },

    renderNode2(createElement, node, tagName2) {
      return createElement(tagName2, {
        props: { info: { ...this.info, node } }
        // on: { 'on-event': this.handleOnEvent }
      })
    }
  }
}
