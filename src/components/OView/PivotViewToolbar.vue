<template>
  <div>
    <div>
      <PivotToolbar
        :pivotInfo="pivotInfo"
        :viewType="viewType"
        @on-change="handleOnPivotChange"
      />
    </div>

    <div></div>
  </div>
</template>

<script>
import api from '@/odooapi'

import PivotToolbar from '@/components/OPivot/PivotToolbar.vue'

// eslint-disable-next-line no-unused-vars
const cp = item => JSON.parse(JSON.stringify(item))

export default {
  name: 'PivotViewToolbar',
  components: { PivotToolbar },

  // mixins: [],

  props: {
    viewType: { type: String, default: 'pivot' },
    viewInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
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
    view() {
      const { views = {} } = this.viewInfo
      const { fields_views = {} } = views
      const view = fields_views[this.viewType] || {}
      return view
    },

    viewInfo2() {
      return { ...this.viewInfo, view: this.view }
    },

    node() {
      // console.log(this.viewType)
      return api.Views[this.viewType].view_node(this.viewInfo2)
    },

    pivotInfo() {
      const measures_all = this.measures_all
      const measures = this.measures
      return { measures_all, measures }
    },

    pivotData2: {
      get() {
        return this.pivotData
      },

      set(val) {
        this.$emit('update:pivotData', val)
      }
    },

    defaultPivotData() {
      const pivotData = api.Views[this.viewType].default_pivot_data({
        ...this.viewInfo2,
        node: this.node
      })

      return pivotData
    },

    measures: {
      get() {
        return this.pivotData.measures || this.defaultPivotData.measures
      },
      set(val) {
        this.pivotData2 = { ...this.pivotData2, measures: [...val] }
      }
    },

    measures_all() {
      return api.Views[this.viewType].pivot_measures_all({
        ...this.viewInfo2,
        node: this.node
      })
    }
  },

  watch: {},

  async created() {},
  async mounted() {
    // console.log(cp(this.defaultPivotData))
  },

  methods: {
    async handleOnPivotChange(payload) {
      // console.log(' handleOnPivotChange, ', payload)
      this.$emit('on-event', 'on-change-pivot', payload)
    }
  }
}
</script>

<style scoped></style>
