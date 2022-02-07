<template>
  <div>
    <div>
      <a-space>
        <span> 业务: </span>
        <a-button
          v-for="(btn, index) in buttons"
          :key="index"
          @click="onclick(btn)"
        >
          {{ btn.title }}
        </a-button>
      </a-space>
    </div>

    <a-divider />

    <div>
      <span> 报表: </span>
      <a-space>
        <a-button
          v-for="(btn, index) in buttons2"
          :key="index"
          @click="onclick(btn)"
        >
          {{ btn.title }}
        </a-button>
      </a-space>
    </div>

    <a-divider />
    <div>
      <span> 设置: </span>
      <a-space>
        <a-button
          v-for="(btn, index) in buttons3"
          :key="index"
          @click="onclick(btn)"
        >
          {{ btn.title }}
        </a-button>
      </a-space>
    </div>
  </div>
</template>

<script>
const buttons = [
  { title: '询价单', action: 'purchase.purchase_rfq' },
  { title: '采购订单', action: 'purchase.purchase_form_action' },
  { title: '采购账单', action: 'account.action_move_in_invoice_type' },
  { title: '支付', action: 'account.action_account_payments_payable' }
]

const buttons2 = [
  { title: '采购分析', action: 'purchase.action_purchase_order_report_all' }
]

const buttons3 = [
  { title: '产品', action: 'sale.product_template_action' },
  { title: '供应商价格表', action: 'product.product_supplierinfo_type_action' },
  { title: '供应商', action: 'account.res_partner_action_supplier' }
]

export default {
  name: 'SaleHome',

  components: {},

  mixins: [],

  props: {},

  data() {
    return {
      buttons,
      buttons2,
      buttons3
    }
  },
  computed: {},
  watch: {},

  async created() {},

  mounted() {},

  methods: {
    onclick(btn) {
      const action = btn.action
      this.$emit('on-event', 'on-action', { action })
    }
  }
}
</script>

<style type="text/css"></style>
