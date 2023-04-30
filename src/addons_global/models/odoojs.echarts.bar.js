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

  static async get_echart_option_neg() {
    const option = {
      title: { text: 'Bar Chart with Negative Value' },
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      grid: { top: 80, bottom: 30 },
      xAxis: {
        type: 'value',
        position: 'top',
        splitLine: { lineStyle: { type: 'dashed' } }
      },
      yAxis: {
        type: 'category',
        axisLine: { show: false },
        axisLabel: { show: false },
        axisTick: { show: false },
        splitLine: { show: false }
      },
      series: [
        {
          name: 'Cost',
          type: 'bar',
          stack: 'Total',
          label: { show: true, formatter: '{b}' }
        }
      ]
    }

    return option
  }

  static async get_echart_data_neg() {
    // const labelRight = { position: 'right' }
    const products = [
      'ten',
      'nine',
      'eight',
      'seven',
      'six',
      'five',
      'four',
      'three',
      'two',
      'one'
    ]

    // const amounts = [
    //   -0.07, -0.09, 0.2, 0.44, -0.23, 0.08, -0.17, 0.47, -0.36, 0.18
    // ]

    function randval() {
      return Math.floor(((Math.random() - 0.5) * 1000) / 23)
    }

    const source = products.map(product => {
      const amount = randval()
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
      neg: 'get_echart_option_neg'
    }
    return this[maps[report]]()
  }

  static async get_echart_data(report) {
    const maps = {
      report: 'get_echart_data_report',
      neg: 'get_echart_data_neg'
    }
    return this[maps[report]]()
  }
}

const AddonsModels = {
  'odoojs.echarts.bar': ExtendModel
}

export default AddonsModels
