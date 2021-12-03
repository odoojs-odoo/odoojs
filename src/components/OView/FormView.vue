<template>
  <div>
    <!-- form view -->
    <!-- {{ dataInfo }} -->
    <!-- <div></div>
    {{ formInfo }} -->

    <OFormView
      :editable="editable"
      :loading="loading"
      :data-info="dataInfo"
      :view-info="formInfo"
      :method-call="methodCall"
      @on-event="handleOnViewEvent"
    />
  </div>
</template>

<script>
import formViewMixin from '@/mixins/formViewMixin'

import OFormView from '@/components/OFormView/index.vue'

export default {
  name: 'FormView',
  components: { OFormView },

  mixins: [formViewMixin],

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
