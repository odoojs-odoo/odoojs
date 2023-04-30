import { Model } from '@/odoorpc/models'

function randInt() {
  return Math.floor((Math.random() * 1000) / 23)
}

export class ExtendModel extends Model {
  constructor(...args) {
    super(...args)
  }

  static async get_echart_option_report() {
    // Generate data
    let category = []
    let dottedBase = +new Date()
    let lineData = []
    let barData = []
    for (let i = 0; i < 20; i++) {
      let date = new Date((dottedBase += 3600 * 24 * 1000))
      category.push(
        [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-')
      )
      let b = Math.random() * 200
      let d = Math.random() * 200
      barData.push(b)
      lineData.push(d + b)
    }
    // option
    const option = {
      backgroundColor: '#0f375f',
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      legend: { data: ['line', 'bar'], textStyle: { color: '#ccc' } },
      xAxis: {
        data: category,
        axisLine: { lineStyle: { color: '#ccc' } }
      },
      yAxis: {
        splitLine: { show: false },
        axisLine: { lineStyle: { color: '#ccc' } }
      },
      series: [
        {
          name: 'line',
          type: 'line',
          smooth: true,
          showAllSymbol: true,
          symbol: 'emptyCircle',
          symbolSize: 15,
          data: lineData
        },
        {
          name: 'bar',
          type: 'bar',
          barWidth: 10,
          itemStyle: {
            borderRadius: 5
            // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //   { offset: 0, color: '#14c8d4' },
            //   { offset: 1, color: '#43eec6' }
            // ])
          },
          data: barData
        },
        {
          name: 'line',
          type: 'bar',
          barGap: '-100%',
          barWidth: 10,
          //   itemStyle: {
          //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //       { offset: 0, color: 'rgba(20,200,212,0.5)' },
          //       { offset: 0.2, color: 'rgba(20,200,212,0.2)' },
          //       { offset: 1, color: 'rgba(20,200,212,0)' }
          //     ])
          //   },
          z: -12,
          data: lineData
        },
        {
          name: 'dotted',
          type: 'pictorialBar',
          symbol: 'rect',
          itemStyle: {
            color: '#0f375f'
          },
          symbolRepeat: true,
          symbolSize: [12, 4],
          symbolMargin: 1,
          z: -10,
          data: lineData
        }
      ]
    }

    return option
  }

  static async get_echart_data_report() {
    return {
      //   dimensions: ['product', 'amount', 'tax', 'total'],
      //   source
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
  'odoojs.echarts.dottedbar': ExtendModel
}

export default AddonsModels
