import { EchartsBaseModel, call_echarts_request } from './odoojs.echarts.base'

function randInt() {
  return Math.floor((Math.random() * 1000) / 23)
}

export class ExtendModel extends EchartsBaseModel {
  constructor(...args) {
    super(...args)
  }

  static async echart_run_report(myChart) {
    const products = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    const source = products.map(product => {
      const amount = randInt()
      return { product, amount }
    })

    const option = {
      dataset: {
        dimensions: ['product', 'amount'],
        source
      },

      title: { text: 'Line' },
      xAxis: { type: 'category' },
      yAxis: { type: 'value' },
      series: [{ type: 'line' }]
    }
    myChart.setOption(option)
  }

  static async echart_run_smooth(myChart) {
    const products = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    const source = products.map(product => {
      const amount = randInt()
      return { product, amount }
    })

    const option = {
      dataset: {
        dimensions: ['product', 'amount'],
        source
      },

      title: { text: 'Line Smooth' },
      xAxis: { type: 'category' },
      yAxis: { type: 'value' },
      series: [{ type: 'line', smooth: true }]
    }

    myChart.setOption(option)
  }

  static async echart_run_area(myChart) {
    const products = ['A', 'B', 'C', 'D', 'E']

    const source = products.map(product => {
      const amount = randInt()
      const tax = randInt()
      return { product, amount, tax }
    })

    const option = {
      dataset: {
        dimensions: ['product', 'amount', 'tax'],
        source
      },

      title: { text: 'Line Area' },
      xAxis: { type: 'category' },
      yAxis: {},
      series: [
        { type: 'line', areaStyle: {} },
        { type: 'line', areaStyle: { color: '#ff0', opacity: 0.5 } }
      ]
    }

    myChart.setOption(option)
  }

  static async echart_run_stack(myChart) {
    const products = ['A', 'B', 'C', 'D', 'E']

    const source = products.map(product => {
      const amount = randInt()
      const tax = randInt()
      return { product, amount, tax }
    })

    const option = {
      dataset: {
        dimensions: ['product', 'amount', 'tax'],
        source
      },
      title: { text: 'Line Stack' },
      xAxis: { type: 'category' },
      yAxis: {},
      series: [
        { type: 'line', stack: 'x' },
        { type: 'line', stack: 'x' }
      ]
    }

    myChart.setOption(option)
  }

  static async echart_run_stack_area(myChart) {
    const products = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const types = ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']

    const source = products.map(product => {
      const subs = types.reduce((acc, type) => {
        acc[type] = randInt()
        return acc
      }, {})
      return { product, ...subs }
    })
    const dataset = {
      dimensions: ['product', ...types],
      source
    }

    const option = {
      dataset,
      title: { text: 'Stacked Area Chart' },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
      },

      toolbox: { feature: { saveAsImage: {} } },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },

      xAxis: [{ type: 'category', boundaryGap: false }],
      yAxis: [{ type: 'value' }],

      series: [
        {
          name: 'Email',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: { focus: 'series' }
        },
        {
          name: 'Union Ads',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: { focus: 'series' }
        },
        {
          name: 'Video Ads',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: { focus: 'series' }
        },
        {
          name: 'Direct',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: { focus: 'series' }
        },
        {
          name: 'Search Engine',
          type: 'line',
          stack: 'Total',
          label: { show: true, position: 'top' },
          areaStyle: {},
          emphasis: { focus: 'series' }
        }
      ]
    }

    myChart.setOption(option)
  }

  static async echart_run_smooth_stack_area(myChart) {
    const products = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const types = ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']

    const source = products.map(product => {
      const subs = types.reduce((acc, type) => {
        acc[type] = randInt()
        return acc
      }, {})
      return { product, ...subs }
    })

    const dataset = {
      dimensions: ['product', ...types],
      source
    }
    const option = {
      dataset,
      title: { text: 'Gradient Stacked Area Chart' },
      color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],

      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'cross', label: { backgroundColor: '#6a7985' } }
      },
      legend: {
        data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
      },
      toolbox: { feature: { saveAsImage: {} } },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [{ type: 'category', boundaryGap: false }],
      yAxis: [{ type: 'value' }],
      series: [
        {
          name: 'Line 1',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: { width: 0 },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8
            // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //   {
            //     offset: 0,
            //     color: 'rgb(128, 255, 165)'
            //   },
            //   {
            //     offset: 1,
            //     color: 'rgb(1, 191, 236)'
            //   }
            // ])
          },
          emphasis: { focus: 'series' }
        },
        {
          name: 'Line 2',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8
            // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //   {
            //     offset: 0,
            //     color: 'rgb(0, 221, 255)'
            //   },
            //   {
            //     offset: 1,
            //     color: 'rgb(77, 119, 255)'
            //   }
            // ])
          },
          emphasis: { focus: 'series' }
        },
        {
          name: 'Line 3',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: { width: 0 },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8
            // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //   {
            //     offset: 0,
            //     color: 'rgb(55, 162, 255)'
            //   },
            //   {
            //     offset: 1,
            //     color: 'rgb(116, 21, 219)'
            //   }
            // ])
          },
          emphasis: { focus: 'series' }
        },
        {
          name: 'Line 4',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: { width: 0 },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8
            // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //   {
            //     offset: 0,
            //     color: 'rgb(255, 0, 135)'
            //   },
            //   {
            //     offset: 1,
            //     color: 'rgb(135, 0, 157)'
            //   }
            // ])
          },
          emphasis: { focus: 'series' }
        },
        {
          name: 'Line 5',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          label: { show: true, position: 'top' },
          areaStyle: {
            opacity: 0.8
            // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //   {
            //     offset: 0,
            //     color: 'rgb(255, 191, 0)'
            //   },
            //   {
            //     offset: 1,
            //     color: 'rgb(224, 62, 76)'
            //   }
            // ])
          },
          emphasis: { focus: 'series' }
        }
      ]
    }

    myChart.setOption(option)
  }

  static async echart_run_step(myChart) {
    const products = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    const source = products.map(product => {
      const amount1 = randInt()
      const amount2 = randInt()
      const amount3 = randInt()
      return { product, amount1, amount2, amount3 }
    })

    const dataset = {
      dimensions: ['product', 'amount1', 'amount2', 'amount3'],
      source
    }

    const option = {
      dataset,
      title: { text: 'Line Step' },
      xAxis: { type: 'category' },
      yAxis: { type: 'value' },
      series: [
        { name: 'Step Start', type: 'line', step: 'start' },
        { name: 'Step Middle', type: 'line', step: 'middle' },
        { name: 'Step End', type: 'line', step: 'end' }
      ]
    }
    myChart.setOption(option)
  }
}

const AddonsModels = {
  'odoojs.echarts.line': ExtendModel
}

export default AddonsModels
