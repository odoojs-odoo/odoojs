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
  { title: '报价', action: 'sale.action_quotations_with_onboarding' },
  { title: '确认', action: 'sale.action_orders' },
  { title: '结算', action: 'account.action_move_out_invoice_type' },
  { title: '收款', action: 'account.action_account_payments' }
]

const buttons2 = [{ title: '销售分析', action: 'sale.action_order_report_all' }]

const buttons3 = [
  { title: '产品', action: 'sale.product_template_action' },
  { title: '价格表', action: 'product.product_pricelist_action2' },
  { title: '客户', action: 'account.res_partner_action_customer' },
  { title: '销售团队', action: 'sales_team.sales_team_config_action' }
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
