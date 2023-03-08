<template>
  <span>
    <!-- <M2mTree
      :editable="editable"
      :relationInfo="relation && relation.field_info"
      :parentViewInfo="viewInfo"
      :records="subRecords"
      @change="handleChange"
    /> -->
  </span>
</template>

<script>
// todo
// import FX2mMixin from './FX2mMixin'

// import M2mTree from '@/components/OSubView/M2mTree.vue'

export default {
  name: 'FOne2many',
  components: { M2mTree },
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
