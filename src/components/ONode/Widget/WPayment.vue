<template>
  <span>
    todo:WPayment:
    {{ value_readonly }}

    <!-- oe_invoice_outstanding_credits_debits
      <record id="view_move_form" model="ir.ui.view">
      <field name="invoice_payments_widget" colspan="2" nolabel="1" widget="payment"/>
      <field name="invoice_outstanding_credits_debits_widget"
        class="oe_invoice_outstanding_credits_debits"
        colspan="2" nolabel="1" widget="payment"
        attrs="{'invisible': ['|', ('state', '!=', 'posted'), ('move_type', 'in', ('out_receipt', 'in_receipt'))]}"/> -->
  </span>
</template>

<script>
import OWMixin from './OWMixin'

export default {
  name: 'WPayment',
  components: {},
  mixins: [OWMixin],
  props: {},
  data() {
    return {}
  },
  computed: {
    className() {
      const arr = [...this.classNameByField]

      return arr.join(' ')
    }
  },

  watch: {},

  created() {},

  mounted() {
    // console.log(this.fname, this.node, this.field)
  },

  methods: {}
}
</script>

<style type="text/css"></style>
