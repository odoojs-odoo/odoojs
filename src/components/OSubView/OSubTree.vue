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

    <SubTreeEdit
      ref="refSubTreeEdit"
      :columns="columns"
      :data-source="values_display"
      :editable="editable"
      :rowEditable="tree_node_editable ? true : false"
      :rowEditchanged.sync="rowEditchanged2"
      :view-info="viewInfo2"
      :formData.sync="formData"
      :formViewInfo="formViewInfo"
      @on-row-change="handleSubRowChange"
      @on-event="handleSubFormOnEvent"
    />

    <template v-if="field.type === 'many2many'">
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

import SubTreeEdit from './SubTreeEdit.vue'

import OSubForm from './OSubForm.vue'
import OM2mForm from './OM2mForm.vue'
import OM2mNew from './OM2mNew.vue'

export default {
  name: 'OSubTree',
  components: { SubTreeEdit, OSubForm, OM2mForm, OM2mNew },
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
      // console.log(cp(this.node))
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
          item.node.tagName === 'field' &&
          item.node.attrs.widget !== 'handle'

        // item.node.tagName !== 'groupbyb' &&
      )
      // console.log(JSON.parse(JSON.stringify(cols2)))

      return cols2.map(item => {
        if (item.node.attrs.widget === 'handle') {
          return { ...item, title: '' }
        } else {
          return item
        }
      })
    }
  },

  watch: {},

  created() {},

  mounted() {},

  methods: {}
}
</script>

<style type="text/css"></style>
