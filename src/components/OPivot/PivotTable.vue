<template>
  <span>
    <a-table
      :columns="tableColumns"
      :data-source="tableData"
      bordered
      :pagination="false"
      rowKey="__rowkey"
    >
      <template slot="row-header" slot-scope="text, row">
        <span
          v-for="lv in Array.from(new Array(row.__rowinfo.deep).keys())"
          :key="lv"
        >
          &nbsp; &nbsp; &nbsp;
        </span>

        <PivotDropdown
          :info="row.__rowinfo"
          :dropdownData="groupbyDropdownData"
          @on-change="handleOnRowChange"
        />

        <a-tooltip v-if="row.__rowinfo.label2">
          <template slot="title">
            {{ row.__rowinfo.label2 }}
          </template>
          {{ row.__rowinfo.label }}
        </a-tooltip>

        <span v-else> {{ row.__rowinfo.label }} </span>
      </template>

      <template v-for="slot in tableSlots">
        <span :slot="slot.key" :key="slot.key">
          <PivotDropdown
            :info="slot"
            :dropdownData="groupbyDropdownData"
            @on-change="handleOnColChange"
          />
          &nbsp;

          <a-tooltip v-if="slot.label2">
            <template slot="title">
              {{ slot.label2 }}
            </template>
            {{ slot.title }}
          </a-tooltip>

          <span v-else>{{ slot.title }} </span>
        </span>
      </template>
    </a-table>
  </span>
</template>

<script>
import pivot from './pivot'
import PivotDropdown from './PivotDropdown.vue'

// eslint-disable-next-line no-unused-vars
const cp = item => JSON.parse(JSON.stringify(item))

export default {
  name: 'PivotTable',
  components: { PivotDropdown },
  mixins: [],

  props: {
    pivotInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    records: { type: Array, default: () => [] }
  },

  data() {
    return {}
  },

  computed: {
    groupbyDropdownData() {
      const { groupbys, rows, cols } = this.pivotInfo
      const to_filter = [...rows, ...cols]
      const groupbys2 = Object.keys(groupbys).map(fld => {
        const meta = groupbys[fld]

        const get_children = () => {
          if (!['date', 'datetime'].includes(meta.type)) return {}

          const dd = `${fld}:day`
          const wk = `${fld}:week`
          const mm = `${fld}:month`
          const qt = `${fld}:quarter`
          const yy = `${fld}:year`

          return {
            children: [
              { name: dd, string: '天', disabled: to_filter.includes(dd) },
              { name: wk, string: '周', disabled: to_filter.includes(wk) },
              { name: mm, string: '月', disabled: to_filter.includes(mm) },
              { name: qt, string: '季', disabled: to_filter.includes(qt) },
              { name: yy, string: '年', disabled: to_filter.includes(yy) }
            ]
          }
        }

        const res = {
          type: meta.type,
          string: meta.string,
          name: fld,
          disabled: to_filter.includes(fld),
          ...get_children()
        }

        return res
      })

      // console.log('groupbys', groupbys2)

      return groupbys2
    },

    tableSlots() {
      const { fields, rows, cols, measures } = this.pivotInfo
      const records = this.records
      return pivot.tableSlots({ fields, rows, cols, measures, records })
    },

    tableData() {
      const { fields, rows, cols, measures } = this.pivotInfo
      const records = this.records
      return pivot.tableData({ fields, rows, cols, measures, records })
    },

    tableColumns() {
      const { fields, rows, cols, measures } = this.pivotInfo
      const records = this.records

      return pivot.tableColumns({ fields, rows, cols, measures, records })
    }
  },

  watch: {},

  async created() {},

  mounted() {},

  methods: {
    handleOnRowChange(payload) {
      // console.log(' handleOnRowChange, ', payload)
      this.$emit('on-change', { type: 'row', ...payload })
    },

    handleOnColChange(payload) {
      // console.log(' handleOnColChange, ', payload)
      this.$emit('on-change', { type: 'col', ...payload })
    }
  }
}
</script>

<style type="text/css"></style>
