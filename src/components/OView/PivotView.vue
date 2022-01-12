<template>
  <div>
    <div>
      <PivotToolbar
        v-if="toolbar"
        :pivotInfo="pivotInfo"
        @on-change="handleOnPivotChange"
      />
    </div>

    <!-- pivot -->

    <PivotTable
      :pivotInfo="pivotInfo"
      :records="records"
      @on-change="handleOnPivotChange"
    />

    <div></div>
  </div>
</template>

<script>
import pivotViewMixin from '@/mixins/pivotViewMixin'

import PivotToolbar from '@/components/OPivot/PivotToolbar.vue'
import PivotTable from '@/components/OPivot/PivotTable.vue'

export default {
  name: 'PivotView',
  components: {
    PivotToolbar,

    PivotTable
  },

  mixins: [pivotViewMixin],

  props: {},

  data() {
    return {
      // columns: [],
      // rows: []
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
