<template>
  <div>
    <div>
      <PivotToolbar
        v-if="toolbar"
        :measures="pivotData.measures"
        @on-change="handleOnPivotChange"
      />
    </div>

    <PivotTable :pivotData="pivotData" @on-change="handleOnPivotChange" />

    <div></div>
  </div>
</template>

<script>
import pivotViewMixin from '@/mixins/pivotViewMixin'

import PivotToolbar from '@/components/OPivot/PivotToolbar.vue'
import PivotTable from '@/components/OPivot/PivotTable.vue'

export default {
  name: 'PivotView',
  components: { PivotTable, PivotToolbar },

  mixins: [pivotViewMixin],

  props: {
    toolbar: { type: Boolean, default: false }
  },

  data() {
    return {
      columns: [],
      rows: []
    }
  },
  computed: {},

  watch: {},

  async created() {},
  async mounted() {},

  methods: {}
}
</script>

<style scoped></style>
