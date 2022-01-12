import OMixin from './OMixin'
import OGroupInner from './OGroupInner.vue'

import OGroupTbody from './OGroupTbody'

import ONode from './ONode'

export default {
  name: 'OGroupOut',
  components: { OGroupInner, ONode, OGroupTbody },
  mixins: [OMixin],
  props: {},
  data() {
    return {}
  },
  computed: {
    className() {
      const arr = [...this.classNameByNode]
      arr.push('o_group')

      const children = this.node.children || []
      const is_out = children.find(item => item.tagName === 'group')
      if (!is_out) arr.push('o_inner_group')
      return arr.join(' ')
    }
  },
  watch: {},

  render(createElement) {
    const children = this.node.children || []
    // console.log(this.node)
    const is_out = children.find(item => item.tagName === 'group')
    if (is_out) {
      return createElement(
        'div',
        { class: this.className },
        children.map(item => {
          if (item.tagName === 'group')
            return this.renderNode2(createElement, item, 'OGroupInner')
          else return this.renderNode2(createElement, item, 'ONode')
        })
      )
    } else {
      // console.log(this.node, this.className)
      return createElement('table', { class: this.className }, [
        this.renderNode2(createElement, this.node, 'OGroupTbody')
      ])
    }
  },
  methods: {
    renderNode2(createElement, node, tagName2) {
      return createElement(tagName2, {
        props: {
          editable: this.editable,
          loading: this.loading,
          dataInfo: this.dataInfo,
          viewInfo: { ...this.viewInfo, node }
        },
        on: { 'on-event': this.handleOnEvent }
      })
    }
  }
}
