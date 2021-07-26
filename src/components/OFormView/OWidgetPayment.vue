<template>
  <div>
    <!-- {{ fullname }}
    {{ typeof dataDict[fname] }} -->
    <!-- {{ dataDict[fname] }} -->

    <div v-if="fname === 'invoice_outstanding_credits_debits_widget'">
      <!-- {{ fname }} : {{ dataDict[fname] }} -->
      <OWidgetPaymentOutstanding
        v-model="value2"
        :dataDict="dataDict"
        :node="node"
        :editable="editable"
        :modelMethod="modelMethod"
        @on-change="handleOnchange"
      />
    </div>
    <div v-else-if="fname === 'invoice_payments_widget'">
      <!-- {{ fname }} -->
      <OWidgetPayment2
        v-model="value2"
        :dataDict="dataDict"
        :node="node"
        :editable="editable"
        :modelMethod="modelMethod"
        @on-change="handleOnchange"
      />
    </div>

    <div v-else>in widget payment, {{ fname }}</div>
  </div>
</template>

<script>
import OMixin from './OMixin'

import OWidgetPayment2 from './OWidgetPayment2'
import OWidgetPaymentOutstanding from './OWidgetPaymentOutstanding'

export default {
  name: 'OWidgetPayment',
  components: { OWidgetPayment2, OWidgetPaymentOutstanding },
  mixins: [OMixin],

  props: {},

  data() {
    return {}
  },
  computed: {
    fname() {
      return this.node.attrs.name
    }
  },

  async created() {},

  mounted() {},

  methods: {}
}
</script>

<style type="text/css"></style>
