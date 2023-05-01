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
      title: { text: 'SO Report' },
      tooltip: {},

      xAxis: { type: 'category' },
      yAxis: {},
      series: [
        { name: 'amount', type: 'line' },
        { name: 'tax', type: 'line' },
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

  static async get_echart_option_neg() {
    const option = {
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      legend: { data: ['Profit', 'Expenses', 'Income'] },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [{ type: 'value' }],
      yAxis: [{ type: 'category', axisTick: { show: false } }],
      series: [
        {
          name: 'Profit',
          type: 'bar',
          label: { show: true, position: 'inside' },
          emphasis: { focus: 'series' }
        },
        {
          name: 'Income',
          type: 'bar',
          stack: 'Total',
          label: { show: true },
          emphasis: { focus: 'series' }
        },
        {
          name: 'Expenses',
          type: 'bar',
          stack: 'Total',
          label: { show: true, position: 'left' },
          emphasis: { focus: 'series' }
        }
      ]
    }

    return option
  }

  static async get_echart_data_neg() {
    const products = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    // function randval() {
    //   return Math.floor(((Math.random() - 0.5) * 1000) / 23)
    // }

    const source = products.map(product => {
      const Income = randInt()
      const Expenses = -randInt()
      const Profit = Income + Expenses
      return { product, Profit, Income, Expenses }
    })

    return {
      dimensions: ['product', 'Profit', 'Income', 'Expenses'],
      source
    }
  }

  static async get_echart_option_radial() {
    const option = {
      legend: { show: true, data: ['A', 'B', 'C'] },
      angleAxis: { type: 'category' },
      radiusAxis: {},
      polar: {},
      series: [
        {
          type: 'bar',
          coordinateSystem: 'polar',
          name: 'A',
          stack: 'a',
          emphasis: { focus: 'series' }
        },
        {
          type: 'bar',
          coordinateSystem: 'polar',
          name: 'B',
          stack: 'a',
          emphasis: { focus: 'series' }
        },
        {
          type: 'bar',
          coordinateSystem: 'polar',
          name: 'C',
          stack: 'a',
          emphasis: {
            focus: 'series'
          }
        }
      ]
    }

    return option
  }

  static async get_echart_data_radial() {
    const products = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    function randval() {
      return Math.floor((Math.random() * 1000) / 23)
    }

    const source = products.map(product => {
      const A = randval()
      const B = randval()
      const C = randval()
      return { product, A, B, C }
    })

    return {
      dimensions: ['product', 'A', 'B', 'C'],
      source
    }
  }

  static async get_echart_option(report) {
    const maps = {
      report: 'get_echart_option_report',
      neg: 'get_echart_option_neg',
      radial: 'get_echart_option_radial'
    }
    return this[maps[report]]()
  }

  static async get_echart_data(report) {
    const maps = {
      report: 'get_echart_data_report',
      neg: 'get_echart_data_neg',
      radial: 'get_echart_data_radial'
    }
    return this[maps[report]]()
  }
}

const AddonsModels = {
  'odoojs.echarts.bar': ExtendModel
}

export default AddonsModels
