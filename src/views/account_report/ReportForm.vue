<template>
  <div>
    <h1>{{ report_metadata[model_name].name }}</h1>
    <Divider />

    <Row>
      <Col span="12">
        <Button @click="excelExport">下载报表</Button>
      </Col>
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
              @on-change="handelOnchangeMonth"
            />
          </FormItem>
        </Form>
      </Col>
    </Row>

    <Divider />

    <Table :columns="columns" :data="dataList"> </Table>

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
    const report_metadata = {
      'account.report.general.ledger': { name: '总账' },
      'account.report.partner.ledger': { name: '应收应付账' },
      'accounting.report.balancesheet': { name: '余额表' },
      'accounting.report.profitandloss': { name: '损益表' }
    }

    const start_month = new Date(new Date().setMonth(new Date().getMonth() - 1))
    const end_month = new Date(new Date().setMonth(new Date().getMonth() + 1))
    const thisMonth = new Date(new Date().setDate(1))
    return {
      start_month,
      end_month,
      thisMonth,

      report_metadata,

      model_name: 'account.report.general.ledger',

      Model: undefined,

      columns: [],
      dataList: []
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
    }
  },

  async created() {
    await this.init()
  },

  methods: {
    async init() {
      this.init_month()
      await this.init_data()
    },

    init_month() {
      const query = this.$route.query
      const { month: this_month, start_month, end_month } = query
      this.thisMonth = new Date(this_month)
      this.start_month = new Date(start_month)
      this.end_month = new Date(end_month)
    },

    async init_data() {
      const query = this.$route.query
      const month = query.month

      const model_name = query.model
      this.model_name = model_name
      const Model = api.env.model(model_name)

      this.Model = Model

      await this.refresh_data(month)
    },

    async refresh_data(month) {
      const Model = this.Model
      const result = await Model.report_month(month)

      console.log(result)

      this.columns = result.fields
        .filter(item => !item.invisible)
        .map(item => {
          return { key: item.name, title: item.label }
        })

      this.dataList = result.lines
    },

    handelOnchangeMonth(value) {
      //
      //   console.log(value, typeof value)
      const month = `${value}-01`
      this.refresh_data(month)
    },

    async excelExport() {
      const thisMonth = parseTime(this.thisMonth, '{y}-{m}-{d}')
      //   console.log(thisMonth)
      const result = await this.Model.export_report_month(thisMonth)
      api.download(result)
    }
  }
}
</script>

<style type="text/css"></style>
