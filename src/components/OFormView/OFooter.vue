<template>
  <!-- <div>fffft {{ fullname }}</div> -->

  <span>
    <span v-for="(item, index) in children_visible" :key="index">
      <OButton
        :dataDict="dataDict"
        :node="item"
        :modelMethod="modelMethod"
        @button-clicked="handleButtonClicked"
      />
      <span>...</span>
    </span>
  </span>
</template>

<script>
import OMixin from './OMixin'

import OButton from './OButton'

export default {
  name: 'OFooter',
  components: { OButton },
  mixins: [OMixin],

  props: {},

  data() {
    return {}
  },
  computed: {},

  async created() {},

  mounted() {},

  methods: {}
}
</script>

<style type="text/css"></style>
