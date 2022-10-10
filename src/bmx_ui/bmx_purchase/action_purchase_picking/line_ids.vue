<template>
  <span>
    <O2mTree
      :editable="editable"
      :relationInfo="relation && relation.field_info"
      :parentViewInfo="viewInfo"
      :records="subRecords"
      :parentData="{ record, values }"
      @change="handleChange"
    />
  </span>
</template>

<script>
import FX2mMixin from '@/components/OField/FX2mMixin'

// import O2mTree from '@/components/OSubView/O2mTree.vue'

import O2mTree from './line_ids_tree.vue'

export default {
  name: 'FOne2many',
  components: { O2mTree },
  mixins: [FX2mMixin],
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

<style type="text/css" scoped></style>
