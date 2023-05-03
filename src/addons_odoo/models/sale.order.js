import { Model } from '@/odoorpc/models'

function randInt() {
  return Math.floor((Math.random() * 1000) / 23)
}

export class ExtendModel extends Model {
  constructor(...args) {
    super(...args)
  }

  static async echart_run_count(myChart) {
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

    const option = {
      dataset: {
        dimensions: ['date_order__day', 'amount_total', 'count'],
        source
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

    myChart.setOption(option)
  }

  static async get_echart_data_report() {
    const products = [
      'Matcha Latte',
      'Milk Tea',
      'Cheese Cocoa',
      'Walnut Brownie'
    ]

    const source = products.map(product => {
      const amount = randInt()
      const tax = amount * 0.13
      const total = amount + tax
      return { product, amount, tax, total }
    })

    return {
      dimensions: ['product', 'amount', 'tax', 'total'],
      source
    }
  }
}

const AddonsModels = {
  'sale.order': ExtendModel
}

export default AddonsModels
