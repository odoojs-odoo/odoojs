<template>
  <div>
    <h1>{{ '财务报表' }}</h1>
    <Divider />

    <Row>
      <Col span="12"> </Col>
      <Col span="12">
        <Form label-position="left" :label-width="108">
          <FormItem label-for="thisMonth">
            <span slot="label">
              <b> {{ '选择账期' }} </b>
            </span>

            <DatePicker
              v-model="thisMonth"
              element-id="thisMonth"
              type="month"
              :options="options3"
              placeholder="选择账期"
              style="width: 200px"
            />
          </FormItem>
        </Form>
      </Col>
    </Row>

    <Divider />

    <Table :columns="columns" :data="dataList" @on-row-click="handleOnRowClick">
    </Table>

    <div>
      <div>&nbsp;</div>
    </div>
  </div>
</template>

<script>
import api from '@/api'

import { parseTime } from '@/odoorpc/utils'

export default {
  name: 'FormView2',
  components: {},
  mixins: [],

  data() {
    const start_month = new Date(new Date().setMonth(new Date().getMonth() - 1))
    const end_month = new Date(new Date().setMonth(new Date().getMonth() + 1))
    const thisMonth = new Date(new Date().setDate(1))
    return {
      start_month,
      end_month,
      thisMonth
    }
  },
  computed: {
    options3() {
      const that = this
      return {
        disabledDate(date) {
          // console.log(date, that.start_month, that.end_month)
          // console.log(date < that.start_month, date > that.end_month)

          return date < that.start_month || date > that.end_month
        }
      }
    },

    dataList() {
      return [
        { name: '总账', model: 'account.report.general.ledger' },
        { name: '应收应付账', model: 'account.report.partner.ledger' },
        { name: '余额表', model: 'accounting.report.balancesheet' },
        { name: '损益表', model: 'accounting.report.profitandloss' }
      ]
    },

    columns() {
      return [{ key: 'name', title: '报表名称' }]
    }
  },

  async created() {
    await this.init()
  },

  methods: {
    async init() {
      await this.init_month()
    },

    async init_month() {
      const model = 'account.common.report'
      const Model = api.env.model(model)
      const months = await Model.search_read_months()
      // console.log(months)

      const start_month_str = months[months.length - 1].date_month
      const end_month_str = months[0].date_month

      const start_month = new Date(
        new Date().setMonth(new Date(start_month_str).getMonth() - 1)
      )

      const end_month = new Date(end_month_str)

      this.start_month = start_month
      this.end_month = end_month
      this.thisMonth = end_month
    },

    handleOnRowClick(row) {
      const thisMonth = parseTime(this.thisMonth, '{y}-{m}-{d}')
      const start_month = parseTime(this.start_month, '{y}-{m}-{d}')
      const end_month = parseTime(this.end_month, '{y}-{m}-{d}')

      // console.log('handleOnRowClick,', row, thisMonth)

      const action_ref = this.$route.meta.name
      const path = `/web/${action_ref}/form`
      this.$router.push({
        path,
        query: { model: row.model, month: thisMonth, start_month, end_month }
      })
    }
  }
}
</script>

<style type="text/css"></style>
