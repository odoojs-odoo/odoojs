import OMixin from './OMixin'

export default {
  name: 'OGroupTbody',
  components: {
    ONode: () => import('./ONode'),
    OLabel: () => import('./OLabel')
  },
  mixins: [OMixin],
  props: {},
  data() {
    return {}
  },
  computed: {
    fname() {
      return this.node.attrs.name
    },

    className() {
      const arr = [...this.classNameByNode]
      return arr.join(' ')
    }
  },

  watch: {},

  render(createElement) {
    const children_title = this.row_title(createElement, this.node)
    const children2 = this.row_children(createElement, this.node)
    const children = [...children_title, ...children2]

    return createElement('tbody', {}, children)
  },

  methods: {
    row_title(createElement, node) {
      const str = node.attrs.string
      if (str) {
        const colspan = Number(node.attrs.colspan || '2')
        return [
          createElement('tr', {}, [
            createElement(
              'td',
              {
                attrs: { colspan: colspan, style: `width: ${colspan} * 50%;` }
              },
              [createElement('div', { class: 'o_horizontal_separator' }, str)]
            )
          ])
        ]
      }

      return []
    },

    row_children(createElement, node) {
      // 国家 form view. 测试该处代码 TODO
      // console.log(this.node)
      const col = Number(node.attrs.col || '2')
      const colspan = Number(node.attrs.col || '1')
      const children = []

      const last_row = { tr: [], len: 0 }
      const node_children = node.children || []
      node_children.forEach(item => {
        const tag = item.tagName
        if (tag === 'field') {
          const [tr, len] = this.render_field(createElement, item, col, colspan)
          last_row.tr = [...last_row.tr, ...tr]
          last_row.len = last_row.len + len
        } else if (tag === 'label') {
          last_row.tr = [...last_row.tr, this.col_label(createElement, item)]
          last_row.len = last_row.len + 1
        } else if (
          tag === 'div' &&
          (item.attrs.class || '').includes('o_td_label')
        ) {
          last_row.tr = [
            ...last_row.tr,
            this.render_td_label(createElement, item)
          ]
          last_row.len = last_row.len + 1
        } else {
          last_row.tr = [
            ...last_row.tr,
            this.col_value(createElement, item, col, colspan)
          ]

          const get_colspan = () => {
            if (item.attrs.colspan) return Number(item.attrs.colspan)
            else return item.attrs.nolabel ? 1 : 2
          }

          last_row.len = last_row.len + get_colspan()
        }

        if (last_row.len >= col) {
          children.push(createElement('tr', {}, last_row.tr))
          last_row.tr = []
          last_row.len = 0
        }
      })

      if (last_row.tr.length)
        children.push(createElement('tr', {}, last_row.tr))

      return children
    },

    render_field(createElement, item, col, colspan) {
      const tr = []
      if (!item.attrs.nolabel) tr.push(this.col_label(createElement, item))
      tr.push(this.col_value(createElement, item, col, colspan))

      const get_colspan = () => {
        if (item.attrs.colspan) return Number(item.attrs.colspan)
        else return item.attrs.nolabel ? 1 : 2
      }

      const len = get_colspan()

      return [tr, len]
    },

    render_td_label(createElement, item) {
      const td_lable = createElement('td', { class: 'o_td_label' }, [
        this.renderNode2(
          createElement,
          {
            ...item,
            attrs: {
              ...item.attrs,
              class: (item.attrs.class || '')
                .split(' ')
                .filter(cls => cls !== 'o_td_label')
                .join(' ')
            }
          },
          'OLabel'
        )
      ])
      return td_lable
    },

    col_label(createElement, item) {
      return createElement('td', { class: 'o_td_label' }, [
        this.renderNode2(createElement, item, 'OLabel')
      ])
    },

    col_value(createElement, item, col, colspan_parent) {
      const colspan = Number(item.attrs.colspan || '1')

      return createElement(
        'td',
        {
          attrs: {
            colspan: colspan !== 1 ? colspan : undefined,
            style: `width: ${((50 * col) / colspan_parent) * colspan}%;`
          }
        },
        [this.renderNode2(createElement, item, 'ONode')]
      )
    },

    renderNode2(createElement, node, tagName2) {
      return createElement(tagName2, {
        props: {
          editable: this.editable,
          loading: this.loading,
          dataInfo: this.dataInfo,
          viewInfo: { ...this.viewInfo, node }
        },
        on: {
          'on-event': this.handleOnEvent
        }
      })
    }
  }
}
