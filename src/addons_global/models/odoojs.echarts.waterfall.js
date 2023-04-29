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
      odoojs_echarts_type: 'waterfall',
      title: { text: 'Waterfall' },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },

      xAxis: { type: 'category', splitLine: { show: false } },
      yAxis: { type: 'value' },
      series: [
        {
          type: 'bar',
          stack: 'all',
          itemStyle: { borderColor: 'rgba(0,0,0,0)', color: 'rgba(0,0,0,0)' },
          emphasis: {
            itemStyle: { borderColor: 'rgba(0,0,0,0)', color: 'rgba(0,0,0,0)' }
          }
        },
        { type: 'bar', stack: 'all' },
        { type: 'bar', stack: 'all', itemStyle: { color: '#f33' } }
      ]
    }
  }

  static async get_echart_data_report() {
    const date_month = (function () {
      var list = []
      for (var i = 1; i <= 11; i++) {
        list.push('Oct/' + i)
      }
      return list
    })()

    const data = [900, 345, 393, -108, -154, 135, 178, 286, -119, -361, -203]

    const source = date_month.map((item, index) => {
      const amount = data[index]
      // const amount = index ? (Math.random() - 0.5) * 100 : Math.random() * 1000

      return { date_month: item, amount }
    })

    //   dataset: {
    //     dimensions: ['date_month', 'help', 'positive', 'negative'],
    //     source: dataSource
    //   },

    return {
      dimensions: ['date_month', 'amount'],
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
  'odoojs.echarts.waterfall': ExtendModel
}

export default AddonsModels
