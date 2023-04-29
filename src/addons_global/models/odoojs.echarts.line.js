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
      title: { text: 'Line' },
      xAxis: { type: 'category' },
      yAxis: { type: 'value' },
      series: [{ type: 'line' }]
    }
  }

  static async get_echart_data_report() {
    const products = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    const source = products.map(product => {
      const amount = randInt()
      return { product, amount }
    })

    return {
      dimensions: ['product', 'amount'],
      source
    }
  }

  static async get_echart_option_smooth() {
    return {
      title: { text: 'Line Smooth' },
      xAxis: { type: 'category' },
      yAxis: { type: 'value' },
      series: [{ type: 'line', smooth: true }]
    }
  }

  static async get_echart_data_smooth() {
    const products = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    const source = products.map(product => {
      const amount = randInt()
      return { product, amount }
    })

    return {
      dimensions: ['product', 'amount'],
      source
    }
  }
  static async get_echart_option_area() {
    return {
      title: { text: 'Line Area' },
      xAxis: { type: 'category' },
      yAxis: {},
      series: [
        { type: 'line', areaStyle: {} },
        { type: 'line', areaStyle: { color: '#ff0', opacity: 0.5 } }
      ]
    }
  }

  static async get_echart_data_area() {
    const products = ['A', 'B', 'C', 'D', 'E']

    const source = products.map(product => {
      const amount = randInt()
      const tax = randInt()
      return { product, amount, tax }
    })

    return {
      dimensions: ['product', 'amount', 'tax'],
      source
    }
  }

  static async get_echart_option_stack() {
    return {
      title: { text: 'Line Stack' },
      xAxis: { type: 'category' },
      yAxis: {},
      series: [
        { type: 'line', stack: 'x' },
        { type: 'line', stack: 'x' }
      ]
    }
  }

  static async get_echart_data_stack() {
    const products = ['A', 'B', 'C', 'D', 'E']

    const source = products.map(product => {
      const amount = randInt()
      const tax = randInt()
      return { product, amount, tax }
    })

    return {
      dimensions: ['product', 'amount', 'tax'],
      source
    }
  }

  static async get_echart_option_step() {
    return {
      title: { text: 'Line Step' },
      xAxis: { type: 'category' },
      yAxis: { type: 'value' },
      series: [
        { name: 'Step Start', type: 'line', step: 'start' },
        { name: 'Step Middle', type: 'line', step: 'middle' },
        { name: 'Step End', type: 'line', step: 'end' }
      ]
    }
  }

  static async get_echart_data_step() {
    const products = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    const source = products.map(product => {
      const amount1 = randInt()
      const amount2 = randInt()
      const amount3 = randInt()
      return { product, amount1, amount2, amount3 }
    })

    return {
      dimensions: ['product', 'amount1', 'amount2', 'amount3'],
      source
    }
  }

  static async get_echart_option(report) {
    const maps = {
      report: 'get_echart_option_report',
      smooth: 'get_echart_option_smooth',
      area: 'get_echart_option_area',
      stack: 'get_echart_option_stack',
      step: 'get_echart_option_step'
    }
    return this[maps[report]]()
  }

  static async get_echart_data(report) {
    const maps = {
      report: 'get_echart_data_report',
      stack: 'get_echart_data_stack',
      area: 'get_echart_data_area',
      smooth: 'get_echart_data_smooth',
      step: 'get_echart_data_step'
    }
    return this[maps[report]]()
  }
}

const AddonsModels = {
  'odoojs.echarts.line': ExtendModel
}

export default AddonsModels
