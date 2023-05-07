import { Model } from '@/odoorpc'

export class ExtendModel extends Model {
  constructor(...args) {
    super(...args)
  }

  static async _data_for_echart_run_by_product() {
    const records = await this.env.model('sale.order.line').search_read({
      domain: [],
      fields: ['product_id', 'price_total']
    })

    const records2 = records
      .map(item => {
        const [product_id, product_name] = item.product_id

        return { ...item, product_id, product_name }
      })
      .reduce((acc, cur) => {
        if (!acc[cur.product_name]) {
          acc[cur.product_name] = {
            product_name: cur.product_name,
            price_total: 0
          }
        }
        acc[cur.product_name].price_total += cur.price_total

        return acc
      }, {})

    const source = Object.values(records2).reverse()

    return {
      dimensions: ['product_name', 'price_total'],
      source
    }
  }

  static async _option_for_echart_run_by_product() {
    const option = {
      dataset: {
        dimensions: [],
        source: []
      },
      title: { text: 'SO Report' },
      tooltip: {},
      // xAxis: { type: 'category' },
      // yAxis: {},
      series: [{ name: 'Total', type: 'pie' }]
    }

    return option
  }

  static async echart_run_by_product(myChart) {
    const dataset = await this._data_for_echart_run_by_product()
    const option2 = await this._option_for_echart_run_by_product()
    const option = { ...option2, dataset }

    myChart.setOption(option)
  }

  static async _data_for_echart_run_by_date() {
    const records = await this.search_read({
      domain: [],
      fields: ['date_order', 'amount_total']
    })

    const records2 = records
      .map(item => {
        const date = item.date_order
        const dt = new Date(`${date.split(' ').join('T')}Z`)

        const ymd = this.env.date_tools.format(dt).slice(0, 7)

        return { ...item, date_order__day: ymd }
      })
      .reduce((acc, cur) => {
        if (!acc[cur.date_order__day]) {
          acc[cur.date_order__day] = {
            date_order__day: cur.date_order__day,
            amount_total: 0,
            count: 0
          }
        }
        acc[cur.date_order__day].amount_total += cur.amount_total
        acc[cur.date_order__day].count += 1

        return acc
      }, {})

    const source = Object.values(records2).reverse()

    return {
      dimensions: ['date_order__day', 'amount_total', 'count'],
      source
    }
  }

  static async _option_echart_run_by_date() {
    const option = {
      dataset: {
        dimensions: [],
        source: []
      },
      title: { text: 'SO Report' },
      tooltip: {},
      xAxis: { type: 'category' },
      yAxis: [{}, { splitLine: { show: false } }],
      series: [
        { name: 'Total', type: 'bar', yAxisIndex: 0 },
        { name: 'Count', type: 'line', yAxisIndex: 1 }
      ]
    }

    return option
  }

  static async echart_run_by_date(myChart) {
    const dataset = await this._data_for_echart_run_by_date()
    const option2 = await this._option_echart_run_by_date()
    const option = { ...option2, dataset }
    myChart.setOption(option)
  }
}

const AddonsModels = {
  'sale.order': ExtendModel
}

export default AddonsModels