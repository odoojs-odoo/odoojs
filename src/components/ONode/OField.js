import OMixin from './OMixin'

import FInteger from './Widget/FInteger.vue'
import FFloat from './Widget/FFloat.vue'
import FMonetary from './Widget/FMonetary.vue'
import FBoolean from './Widget/FBoolean.vue'
import FChar from './Widget/FChar.vue'
import FText from './Widget/FText.vue'
import FHtml from './Widget/FHtml.vue'

import FDate from './Widget/FDate.vue'
import FDatetime from './Widget/FDatetime.vue'
import FSelection from './Widget/FSelection.vue'

import FMany2one from './Widget/FMany2one.vue'
import FOne2many from './Widget/FOne2many.vue'
import FMany2many from './Widget/FMany2many.vue'
import FBinary from './Widget/FBinary.vue'

const mapDataTypeToTag = {
  integer: 'FInteger',
  monetary: 'FMonetary',
  float: 'FFloat',
  boolean: 'FBoolean',
  char: 'FChar',
  text: 'FText',
  html: 'FHtml',
  date: 'FDate',
  datetime: 'FDatetime',
  selection: 'FSelection',
  many2one: 'FMany2one',
  one2many: 'FOne2many',
  many2many: 'FMany2many',
  binary: 'FBinary'
}

export default {
  name: 'OField',
  components: {
    FInteger,
    FFloat,
    FMonetary,
    FBoolean,
    FChar,
    FText,
    FHtml,
    FDate,
    FDatetime,
    FSelection,
    FMany2one,
    FOne2many,
    FMany2many,
    FBinary
  },

  mixins: [OMixin],

  props: {},

  data() {
    return {}
  },
  computed: {
    fname() {
      return this.node.attrs.name
    }
  },

  watch: {},

  render(createElement) {
    const { view } = this.viewInfo
    const { fields } = view
    const meta = fields[this.fname] || {}
    const data_type = meta.type
    const tag = mapDataTypeToTag[data_type]

    // if (this.invisible) {
    //   return createElement('span', {}, [''])
    // } else
    if (tag) {
      const field_child = createElement(tag, {
        props: {
          editable: this.editable,
          loading: this.loading,
          dataInfo: this.dataInfo,
          viewInfo: { ...this.viewInfo, node: this.node }
        },
        on: {
          'on-event': this.handleOnEvent
        }
      })

      let debug = 0
      // debug = 1

      if (!debug) return field_child
      else {
        // for test
        return createElement('span', {}, [
          createElement('div', {}, [
            data_type,
            ',',
            this.fname,
            ',',
            this.widget || 'null'
          ]),

          field_child
        ])
      }
    } else {
      console.log(
        'field TODO',
        meta.type,
        this.fname,
        ',',
        this.node
        // this.record[this.fname]
      )

      return createElement('div', {}, [
        'todo field:',
        this.fname,
        ',',
        data_type
      ])
    }
  },

  methods: {}
}
