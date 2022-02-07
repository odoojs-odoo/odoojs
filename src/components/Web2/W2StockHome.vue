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
  { title: '出入库', action: 'stock.action_picking_tree_all' },
  { title: '盘点', action: 'stock.action_inventory_form' },
  { title: '报废', action: 'stock.action_stock_scrap' }
]

const buttons2 = [
  { title: '在手库存', action: 'stock.action_view_quants' },
  { title: '预测库存', action: 'stock.report_stock_quantity_action' },
  { title: '库存计价', action: 'stock_account.stock_valuation_layer_action' },
  { title: '库存移动', action: 'stock.stock_move_action' },
  { title: '产品', action: 'stock.stock_move_line_action' }
]

const buttons3 = [
  { title: '产品', action: 'sale.product_template_action' },
  { title: '仓库', action: 'stock.action_warehouse_form' },
  { title: '库位', action: 'stock.action_location_form' }
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
