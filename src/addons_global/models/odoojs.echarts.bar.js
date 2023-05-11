import { EchartsBaseModelCreator } from './odoojs.echarts.base'

function randInt() {
  return Math.floor((Math.random() * 1000) / 23)
}

function ModelCreator(Model, { HttpRequest }) {
  const EchartsBaseModel = EchartsBaseModelCreator(Model, { HttpRequest })

  class ExtendModel extends EchartsBaseModel {
    constructor(...args) {
      super(...args)
    }

    static async echart_run_report(myChart) {
      const products = ['A', 'B', 'C', 'D']

      const source = products.map(product => {
        const amount = randInt()
        const tax = amount * 0.13
        const total = amount + tax
        return { product, amount, tax, total }
      })

      const dataset = {
        dimensions: ['product', 'amount', 'tax', 'total'],
        source
      }

      const option = {
        dataset,
        title: { text: 'Bar' },
        tooltip: {},

        xAxis: { type: 'category' },
        yAxis: {},
        series: [
          { name: 'amount', type: 'bar' },
          { name: 'tax', type: 'bar' },
          { name: 'total', type: 'bar' }
        ]
      }
      myChart.setOption(option)
    }

    static async echart_run_neg(myChart) {
      const products = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

      const source = products.map(product => {
        const Income = randInt()
        const Expenses = -randInt()
        const Profit = Income + Expenses
        return { product, Profit, Income, Expenses }
      })

      const dataset = {
        dimensions: ['product', 'Profit', 'Income', 'Expenses'],
        source
      }

      const option = {
        dataset,
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

      myChart.setOption(option)
    }

    static async echart_run_radial(myChart) {
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

      const dataset = {
        dimensions: ['product', 'A', 'B', 'C'],
        source
      }

      const option = {
        dataset,
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

      myChart.setOption(option)
    }

    static async get_echart_data_radial() {}
  }

  return ExtendModel
}

const AddonsModels = {
  'odoojs.echarts.bar': ModelCreator
}

export default AddonsModels
