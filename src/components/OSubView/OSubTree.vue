<template>
  <div class="o_field_x2many_list">
    <template
      v-for="(item, index) in node.children.filter(
        it => it.tagName === 'control'
      )"
    >
      <div :key="index" class="o_x2m_control_panel">
        <div class="o_cp_buttons"></div>
        <div class="o_cp_pager"></div>
      </div>
    </template>

    <div class="o_list_view o_list_optional_columns">
      <!-- {{ values_display }} -->
      <a-table
        class="o_list_table o_list_table_ungrouped o_section_and_note_list_view"
        :columns="columns"
        :data-source="values_display"
        rowKey="id"
        :pagination="false"
        :customRow="tableCustomRow"
      >
      </a-table>

      <!-- <div class="table-responsive">
        <table
          class="o_list_table table table-sm table-hover table-striped o_list_table_ungrouped o_section_and_note_list_view"
          stype="table-layout: fixed"
        >
          tab
        </table>
      </div>
      <div class="o_optional_columns text-center dropdown">
        o_optional_columns
      </div> -->
    </div>

    <template v-if="field.type === 'many2many'">
      <!-- {{ values_display }}
      {{ data }} -->
      <OM2mForm
        :visible.sync="showModal"
        :editable="editable"
        :records-old="values_display"
        :data-info="formData"
        :view-info="formViewInfo"
        @on-event="handleSubFormOnEvent"
      />

      <OM2mNew
        :visible.sync="showModalNew"
        :records-old="values_display"
        :data-info="{ records: m2mSelectOptions }"
        :view-info="{ ...viewInfo2, node }"
        @on-event="handleSubFormOnEvent"
      />
    </template>

    <template v-else>
      <OSubForm
        :visible.sync="showModal"
        :editable="editable"
        :data.sync="formData"
        :view-info="formViewInfo"
        @on-event="handleSubFormOnEvent"
      />
    </template>

    <div>
      <div>&nbsp;</div>
    </div>
  </div>
</template>

<script>
import subTreeMixin from './subTreeMixin'

// eslint-disable-next-line no-unused-vars
const cp = val => JSON.parse(JSON.stringify(val))

import OSubForm from './OSubForm.vue'
import OM2mForm from './OM2mForm.vue'
import OM2mNew from './OM2mNew.vue'

export default {
  name: 'OSubTree',
  components: { OSubForm, OM2mForm, OM2mNew },
  mixins: [subTreeMixin],
  props: {},
  data() {
    return {}
  },
  computed: {
    viewType() {
      return 'tree'
    },

    view_columns() {
      const { fields } = this.view
      const node = this.node
      const columns = (node.children || [])
        .filter(item => item.tagName === 'field')
        .map(item => {
          const fname = item.attrs.name
          const meta = fields[fname] || {}
          const title = item.attrs.string || meta.string
          return { key: fname, title, node: item, meta }
        })

      return columns
    },

    columns() {
      const cols = this.view_columns
      // console.log(cols)
      // TBD GROUPBY
      const cols2 = cols.filter(
        item =>
          !item.node.attrs.invisible &&
          item.node.attrs.optional !== 'hide' &&
          item.node.tagName === 'field'

        // item.node.tagName !== 'groupbyb' &&
      )
      // console.log(JSON.parse(JSON.stringify(cols2)))

      const get_render = col => {
        if (col.meta.type === 'many2one') {
          // eslint-disable-next-line no-unused-vars
          return (value, row, index) => (value ? value[1] : '')
        }
        if (col.meta.type === 'selection') {
          const get_label = value => {
            const elm = col.meta.selection.find(item => item[0] === value)
            return elm ? elm[1] : ''
          }
          // eslint-disable-next-line no-unused-vars
          return (value, row, index) => (value ? get_label(value) : '')
        }

        return undefined
      }

      return [...cols2].map(col => {
        const ret = { ...col, dataIndex: col.key }
        const render = get_render(col)
        if (render) ret.customRender = render
        return ret
      })

      // return [...cols2].map(col => {
      //   return { ...col, dataIndex: col.key }
      // })
    }
  },

  watch: {},

  created() {},

  mounted() {},

  methods: {
    tableCustomRow(record) {
      const that = this
      return {
        on: {
          // eslint-disable-next-line no-unused-vars
          click: event => {
            // console.log(record, event)
            that.handleOnRowClick(record)
          }
        }
      }
    }
  }
}
</script>

<style type="text/css"></style>
