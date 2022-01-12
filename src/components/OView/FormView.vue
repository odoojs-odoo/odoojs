<template>
  <div>
    <template v-if="showWizard">
      <WizardForm
        :visible.sync="showWizard"
        :view-info="wizardViewInfo"
        @on-event="handleOnViewEvent"
      />
    </template>
    <!-- form view
    {{ record }}
    {{ node }} -->
    <OForm
      :editable="editable"
      :data-info="data"
      :view-info="{ ...viewInfo2, node }"
      @on-event="handleOnViewEvent"
    />
  </div>
</template>

<script>
import formViewMixin from '@/mixins/formViewMixin'

import OForm from '@/components/ONode/OForm.vue'
import WizardForm from '@/components/OView/WizardForm.vue'

export default {
  name: 'FormView',
  components: { OForm, WizardForm },

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
