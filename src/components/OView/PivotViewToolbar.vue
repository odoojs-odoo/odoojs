<template>
  <div>
    <div>
      <PivotToolbar
        :measures="pivotData.measures"
        :viewType="viewType"
        @on-change="handleOnPivotChange"
      />
    </div>

    <div></div>
  </div>
</template>

<script>
import pivotViewMixin from '@/mixins/pivotViewMixin'

import PivotToolbar from '@/components/OPivot/PivotToolbar.vue'

export default {
  name: 'PivotViewToolbar',
  components: { PivotToolbar },

  mixins: [pivotViewMixin],

  props: {},

  data() {
    return {}
  },
  computed: {},

  watch: {},

  async created() {},
  async mounted() {},

  methods: {}
}
</script>

<style scoped></style>
