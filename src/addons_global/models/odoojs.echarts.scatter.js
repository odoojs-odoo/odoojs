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
      title: { text: 'Scatter' },
      xAxis: { type: 'category' },
      yAxis: { type: 'value' },

      series: [
        {
          type: 'scatter'
          //   data: [220, 182, 191, 234, 290, 330, 310]
        }
      ]
    }
  }

  static async get_echart_data_report() {
    const products = ['A', 'B', 'C', 'D']

    const source = products.map(product => {
      const amount = randInt()
      return { product, amount }
    })

    return {
      dimensions: ['product', 'amount'],
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
  'odoojs.echarts.scatter': ExtendModel
}

export default AddonsModels
