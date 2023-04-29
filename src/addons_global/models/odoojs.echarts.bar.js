import { Model } from '@/odoorpc/models'

function randInt() {
  return Math.floor((Math.random() * 1000) / 23)
}

export class ExtendModel extends Model {
  constructor(...args) {
    super(...args)
  }

  static async get_echart_option_report() {
    return {
      title: {
        text: 'SO Report'
      },
      tooltip: {},

      xAxis: { type: 'category' },
      yAxis: {},
      series: [
        { name: 'amount', type: 'bar' },
        { name: 'tax', type: 'bar' },
        { name: 'total', type: 'line' }
      ]
    }
  }

  static async get_echart_data_report() {
    const products = ['A', 'B', 'C', 'D']

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

  static async get_echart_option(report) {
    const maps = {
      report: 'get_echart_option_report'
    }
    return this[maps[report]]()
  }

  static async get_echart_data(report) {
    const maps = {
      report: 'get_echart_data_report'
    }
    return this[maps[report]]()
  }
}

const AddonsModels = {
  'odoojs.echarts.bar': ExtendModel
}

export default AddonsModels
