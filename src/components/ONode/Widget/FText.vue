<template>
  <span v-if="invisible"></span>

  <div v-else-if="widget === 'dashboard_graph'">
    <WDashboardGraph
      :value_readonly="value_readonly"
      :value_edit="value_edit"
      :editable="editable"
      :data-info="dataInfo"
      :view-info="{ ...viewInfo, node }"
      @on-change="onchange"
    />
  </div>

  <div v-else-if="widget === 'payment'">
    <!-- widget: payment -->

    <WPayment
      :value_readonly="value_readonly"
      :value_edit="value_edit"
      :editable="editable"
      :data-info="dataInfo"
      :view-info="{ ...viewInfo, node }"
      @on-change="onchange"
    />
  </div>

  <div v-else-if="widget === 'kanban_vat_activity'">
    <!-- widget: kanban_vat_activity -->

    <WKanbanVatActivity
      :value_readonly="value_readonly"
      :value_edit="value_edit"
      :editable="editable"
      :data-info="dataInfo"
      :view-info="{ ...viewInfo, node }"
      @on-change="onchange"
    />
  </div>

  <div v-else-if="widget === 'section_and_note_text'">
    <!-- widget: section_and_note_text -->
    <span v-if="readonly || !editable" :class="className">
      <!-- {{ [field.type, fname] }} -->
      {{ value_display }}
    </span>

    <div v-else>
      <OInput
        :value="value"
        :fname="fname"
        :required="required"
        :placeholder="node.attrs.placeholder"
        :element-id="node.attrs.id || node.attrs.name"
        :className="className"
        @on-change="onchange"
      />
    </div>
  </div>

  <div v-else-if="widget_todo">{{ [field.type, fname, widget] }}</div>

  <span v-else-if="readonly || !editable" :class="className">
    <!-- {{ [field.type, fname] }} -->
    {{ value_display }}
  </span>

  <div v-else>
    <!-- edit: {{ [field.type, fname] }} -->
    <!-- section_and_note_text -->
    <OInput
      :value="value"
      type="text"
      :fname="fname"
      :required="required"
      :placeholder="node.attrs.placeholder"
      :element-id="node.attrs.id || node.attrs.name"
      :className="className"
      @on-change="onchange"
    />
  </div>

  <!-- <span v-else> TODO:edit, {{ record[fname] }} </span> -->
</template>

<script>
import OFMixin from './OFMixin'

import WDashboardGraph from './WDashboardGraph.vue'
import WPayment from './WPayment.vue'
import WKanbanVatActivity from './WKanbanVatActivity.vue'

import OInput from './OInput/OInput.vue'

export default {
  name: 'FText',
  components: { WDashboardGraph, WPayment, WKanbanVatActivity, OInput },
  mixins: [OFMixin],
  props: {},
  data() {
    return {}
  },
  computed: {
    value_readonly() {
      return this.record[this.fname] || ''
    },

    value() {
      return this.value_edit || ''
    },

    widget_todo() {
      // section_and_note_text
      const done = ['sms_widget']
      return done.includes(this.widget) ? '' : this.widget
    },

    className() {
      const arr = [...this.classNameByField]
      arr.push('o_field_text')

      return arr.join(' ')
    }
  },

  watch: {},

  created() {},

  mounted() {
    // console.log(this.viewInfo)
  },

  methods: {}
}
</script>

<style type="text/css"></style>
