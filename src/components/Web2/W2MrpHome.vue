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
  { title: '制造订单', action: 'mrp.mrp_production_action' },
  { title: '工单', action: 'mrp.mrp_workorder_todo' }
]

const buttons2 = [
  { title: '生产分析', action: 'mrp.mrp_production_report' },
  { title: '工单分析', action: 'mrp.mrp_workorder_report' }
]

const buttons3 = [
  { title: '产品', action: 'mrp.product_template_action' },
  { title: '物料清单', action: 'mrp.mrp_bom_form_action' }
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
