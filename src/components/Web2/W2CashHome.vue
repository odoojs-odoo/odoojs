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
  { title: '收款', action: 'account.action_account_payments' },
  { title: '支付', action: 'account.action_account_payments_payable' },
  { title: '内部转账', action: 'account.action_account_payments_transfer' }
]

const buttons2 = [
  {
    title: '应收应付',
    action: 'ow_account_report.action_account_report_partner'
  }
]

const buttons3 = [
  { title: '账本设置', action: 'account.action_account_journal_form' }
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
