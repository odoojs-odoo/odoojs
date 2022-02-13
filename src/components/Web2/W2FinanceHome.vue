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
  { title: '客户结算单', action: 'account.action_move_out_invoice_type' },
  { title: '采购账单', action: 'account.action_move_in_invoice_type' },
  { title: '会计凭证', action: 'account.action_move_journal_line' },
  { title: '日记账项目', action: 'account.action_account_moves_all' }
]

const buttons2 = [
  { title: '总分类账', action: 'account.action_account_moves_ledger_general' },
  {
    title: '业务伙伴分类账',
    action: 'account.action_account_moves_ledger_partner'
  }
]

const buttons3 = [
  { title: '账本设置', action: 'account.action_account_journal_form' },
  { title: '科目表', action: 'account.action_account_form' },
  { title: '参与人', action: 'contacts.action_contacts' },
  { title: '参与人标签', action: '_base.action_partner_category_form' },
  { title: '产品', action: 'sale.product_template_action' }
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
