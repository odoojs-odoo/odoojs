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
      title: { text: 'Pie' },
      series: [{ type: 'pie' }]
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

  static async get_echart_option_ring() {
    return {
      title: { text: 'Pie Ring', left: 'center', top: 'center' },
      series: [{ type: 'pie', radius: ['40%', '70%'] }]
    }
  }

  static async get_echart_data_ring() {
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

  static async get_echart_option_rose() {
    return {
      title: { text: 'Pie Rose' },
      series: [{ type: 'pie', roseType: 'area' }]
    }
  }

  static async get_echart_data_rose() {
    const products = ['A', 'B', 'C', 'D', 'E']

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
      report: 'get_echart_option_report',
      ring: 'get_echart_option_ring',
      rose: 'get_echart_option_rose'
    }
    return this[maps[report]]()
  }

  static async get_echart_data(report) {
    const maps = {
      report: 'get_echart_data_report',
      ring: 'get_echart_data_ring',
      rose: 'get_echart_data_rose'
    }
    return this[maps[report]]()
  }
}

const AddonsModels = {
  'odoojs.echarts.pie': ExtendModel
}

export default AddonsModels
