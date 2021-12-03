<template>
  <div>
    <div>
      <PivotToolbar
        v-if="toolbar"
        :measures="pivotData.measures"
        @on-change="handleOnPivotChange"
      />
    </div>

    <div>row:</div>
    <div v-for="item in rows" :key="item.name">
      string: {{ item.string }}, name: {{ item.name }}
    </div>
    <div>----</div>

    <div>columns:</div>
    <div v-for="item in columns" :key="item.name">
      string: {{ item.string }}, name: {{ item.name }}
    </div>
    <div>----</div>

    <div>measures:</div>

    <div v-for="item in measures" :key="item.name">
      string: {{ item.string }}, name: {{ item.name }}
    </div>

    <div>----</div>

    <div>data:</div>
    <div v-for="(rec, index) in pivotData.dataList" :key="index">
      <div>--- {{ index }}: ---</div>

      <div v-for="me in measures" :key="me.name">
        {{ me.string }}: {{ rec[me.name] }}
      </div>

      <div v-for="ax in [...rows, ...columns]" :key="ax.name">
        {{ ax.string }}: {{ rec[ax.name] }}
      </div>

      <!-- {{ rec }} -->
    </div>

    <div></div>
  </div>
</template>

<script>
import pivotViewMixin from '@/mixins/pivotViewMixin'

import PivotToolbar from '@/components/OPivot/PivotToolbar.vue'

export default {
  name: 'PivotView',
  components: { PivotToolbar },

  mixins: [pivotViewMixin],

  props: {
    toolbar: { type: Boolean, default: false }
  },

  data() {
    return {}
  },
  computed: {
    rows() {
      return this.pivotData.rows || []
    },
    columns() {
      return this.pivotData.columns || []
    },

    measures() {
      return (this.pivotData.measures || []).filter(item => item.checked)
    }
  },

  watch: {},

  async created() {},
  async mounted() {},

  methods: {}
}
</script>

<style scoped></style>
