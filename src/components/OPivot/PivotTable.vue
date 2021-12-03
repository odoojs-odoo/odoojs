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

// const cp = item => JSON.parse(JSON.stringify(item))

export default {
  name: 'PivotTable',
  components: { PivotDropdown },
  mixins: [],

  props: {
    pivotData: {
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
    groupbyDropdownData() {
      const { groupbys } = this.pivotData
      return groupbys
    },

    payload2() {
      return {
        ...this.pivotData
      }
    },

    tableSlots() {
      return pivot.title_slots(this.pivotData)
    },

    tableData() {
      return pivot.table_data(this.pivotData)
    },

    tableColumns() {
      return pivot.columns(this.pivotData)
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
      this.$emit('on-change', { type: 'column', ...payload })
    }
  }
}
</script>

<style type="text/css"></style>
