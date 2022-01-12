<template>
  <span v-if="invisible"></span>

  <div v-else-if="widget === 'label_selection'">
    {{ value_readonly }}
    <!-- todo: -->
    <!-- <div>selection label_selection</div>
    {{ [field.type, fname, widget] }} -->
  </div>

  <div v-else-if="widget === 'state_selection'">
    {{ value_readonly }}
    <!-- todo: -->
    <!-- <div>selection state_selection</div>
    {{ [field.type, fname, widget] }} -->
  </div>

  <WRadio
    v-else-if="widget === 'radio'"
    :value_readonly="value_readonly"
    :value_edit="value_edit"
    :selectionOptions="field.selection"
    :editable="editable"
    :data-info="dataInfo"
    :view-info="{ ...viewInfo, node }"
    @on-change="onchange"
  />

  <div v-else-if="widget === 'priority'">
    <!-- todo:
    <div>selection priority</div>
    {{ [field.type, fname, widget] }} -->
    <WPriority
      :value_readonly="value_readonly"
      :value_edit="value_edit"
      :selectionOptions="field.selection"
      :editable="editable"
      :data-info="dataInfo"
      :view-info="{ ...viewInfo, node }"
      @on-change="onchange"
      @on-event="handleOnEvent"
    />
  </div>

  <div
    v-else-if="!widget || ['timezone_mismatch', 'selection'].includes(widget)"
  >
    <!-- 付款单 partner_type todo:
    <div>selection selection</div>
    {{ [field.type, fname, widget] }} -->

    <WSelection
      :value_readonly="value_readonly"
      :value_edit="value"
      :selectionOptions="field.selection"
      :editable="editable"
      :data-info="dataInfo"
      :view-info="{ ...viewInfo, node }"
      @on-change="onchange"
    />
  </div>

  <div v-else-if="widget_todo">
    todo:{{ [field.type, fname, widget] }}

    {{ value_readonly }}
  </div>

  <div v-else>
    <!-- never go here -->
  </div>
</template>

<script>
import OFMixin from './OFMixin'

import WRadio from './WRadio.vue'
import WPriority from './WPriority.vue'
import WSelection from './WSelection.vue'

export default {
  name: 'FSelection',
  components: { WRadio, WPriority, WSelection },
  mixins: [OFMixin],
  props: {},

  data() {
    return {}
  },
  computed: {
    value_readonly() {
      const op = this.field.selection.find(
        item => item[0] === this.record[this.fname]
      )
      return op ? op[1] : ''
    },

    widget_todo() {
      const done = []
      return done.includes(this.widget) ? '' : this.widget
    },

    className() {
      const arr = [...this.classNameByField]

      // TODO

      return arr.join(' ')
    }
  },

  watch: {},

  created() {},

  mounted() {},

  methods: {}
}
</script>

<style type="text/css"></style>
