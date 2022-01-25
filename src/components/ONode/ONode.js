import OMixin from './OMixin'

const is_node = node => {
  if (typeof node !== 'object') return false
  if (Array.isArray(node)) return false
  if (typeof node === 'boolean') return false
  return true
}

const cp = item => JSON.parse(JSON.stringify(item))

const Tags_Ready1 = ['span', 'div', 'p', 'br', 'hr', 'ul', 'li']
const Tags_Ready2 = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'b', 'em']
const Tags_Ready3 = ['link', 'code', 'small', 'i', 'samp', 'time']

const Tags_Ready = [...Tags_Ready1, ...Tags_Ready2, ...Tags_Ready3]
const Tags_To_Map = {
  newline: 'div',
  bold: 'b',
  from: 'form',
  t: 'div'
}

const GetTagToCreate = tag => {
  if (Tags_Ready.includes(tag)) return tag
  if (Tags_To_Map[tag]) return Tags_To_Map[tag]
  return undefined
}

const node_map2 = {
  widget: 'OWidget',
  field: 'OField',
  group: 'OGroup',
  notebook: 'ONotebook',
  label: 'OLabel',
  button: 'OButton',
  a: 'OA',
  img: 'OImg',
  separator: 'OSeparator'
  // i: 'OTooltip', TODO?
  // // separator
}

export default {
  name: 'ONode',
  components: {
    OWidget: () => import('./OWidget'),
    OField: () => import('./OField'),
    OGroup: () => import('./OGroupOut'),
    ONotebook: () => import('./ONotebook'),
    OLabel: () => import('./OLabel'),
    OButton: () => import('./OButton'),
    OA: () => import('./OA'),
    OImg: () => import('./OImg'),
    OSeparator: () => import('./OSeparator')

    // OTooltip: () => import('./OTooltip'),
  },

  mixins: [OMixin],
  props: {},

  computed: {},

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
            const ch2 =
              node.tagName === 'div' && node.attrs.name === 'button_box'
                ? childs.filter(item => item.tagName === 'button')
                : childs

            return ch2.map(item => this.renderNode(createElement, item))
          }
        }

        const children = get_children()

        return createElement(
          tagName,
          { attrs: node.attrs || {}, class: this.get_className(node) },
          [...children]
        )
      }

      console.log('--Node nook,', node.tagName, cp(node))

      return createElement('div', {}, [
        createElement('div', {}, ['TODO in Nodejs:', node.tagName])
      ])
    }
  }
}
