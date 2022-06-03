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

    <template v-if="editable">
      <!-- {{ field_nodes }} -->

      <!-- {{ values }}

     -->

      {{ values_edit }}

      <a-form-model
        v-show="showForm"
        ref="refForm"
        :model="values_edit"
        :rules="rules_edit"
      >
        <template v-for="(fn, fn_index) in field_nodes">
          <a-form-model-item
            :label="fn.attrs.name"
            :prop="fn.attrs.name"
            :key="fn_index"
          >
            <template v-if="Array.isArray(values_edit[fn.attrs.name])">
              <a-select v-model="values_edit[fn.attrs.name]" mode="multiple">
                <a-select-option
                  v-for="m2m_id in values_edit[fn.attrs.name]"
                  :key="m2m_id"
                >
                  {{ m2m_id }}
                </a-select-option>
              </a-select>
            </template>
            <template v-else>
              <a-input v-model="values_edit[fn.attrs.name]" />
            </template>
          </a-form-model-item>
        </template>
      </a-form-model>
    </template>
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
    return {
      showForm: true
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
