import { Model } from '@/odoorpc/models'
import * as echarts from 'echarts/core'

import { HttpRequest } from '@/odoojs-rpc/request'
const ROOT_PATH = 'echarts/examples'
async function call_echarts_request(url) {
  const api = HttpRequest
  api.baseURL = ROOT_PATH
  return api.call_get(url)
}

export class ExtendModel extends Model {
  constructor(...args) {
    super(...args)
  }

  static async echart_run_report(myChart) {
    const url = '/data/asset/data/life-expectancy-table.json'
    const _rawData = await call_echarts_request(url)

    // var countries = ['Australia', 'Canada', 'China', 'Cuba', 'Finland', 'France', 'Germany', 'Iceland', 'India', 'Japan', 'North Korea', 'South Korea', 'New Zealand', 'Norway', 'Poland', 'Russia', 'Turkey', 'United Kingdom', 'United States'];

    const countries = [
      'Finland',
      'France',
      'Germany',
      'Iceland',
      'Norway',
      'Poland',
      'Russia',
      'United Kingdom'
    ]

    const delay = 10000

    const seriesList = countries.map(country => {
      return {
        type: 'line',
        showSymbol: false,
        name: country,
        endLabel: {
          show: true,
          formatter: function (params) {
            return params.seriesName + ': ' + params.data[params.seriesName]
          }
        },
        labelLayout: { moveOverlap: 'shiftY' },
        emphasis: { focus: 'series' }
        // encode: {
        //   // x: 'Year',
        //   // y: 'Income',
        //   // label: ['Country', 'Income'],
        //   // itemName: 'Year',
        //   // tooltip: ['Income']
        // }
      }
    })

    const option_raw = {
      odoojs_echarts_type: { name: 'line_race', delay },

      animationDuration: delay,
      dataset: { dimensions: [], source: [] },
      title: { text: 'Income of Germany and France since 1950' },
      tooltip: { order: 'valueDesc', trigger: 'axis' },
      xAxis: { type: 'category', nameLocation: 'middle' },
      yAxis: { type: 'value', name: 'Income' },
      grid: { right: 140 },
      series: seriesList
    }

    const source = _rawData
      .slice(1)
      .filter(item => countries.includes(item[3]))
      .reduce((acc, item) => {
        const old = acc.find(it => it.date_year === item[4])
        if (old) {
          old[item[3]] = item[0]
        } else {
          acc.push({ date_year: item[4], [item[3]]: item[0] })
        }

        return acc
      }, [])

    const dataset_raw = {
      dimensions: ['date_year', ...countries],
      source
    }

    const options2 = { ...option_raw, dataset: dataset_raw }

    myChart.setOption(options2)
  }

  static async echart_run(report, chartInstance) {
    const maps = {
      report: 'echart_run_report'
    }
    return this[maps[report]](chartInstance)
  }

  static async get_echart_option(report) {
    const maps = {}
    if (report in maps) {
      return this[maps[report]]()
    } else {
      return { odoojs_echarts_type: { name: 'run_server' } }
    }
  }

  static async get_echart_data(report) {
    const maps = {}
    if (report in maps) {
      return this[maps[report]]()
    } else {
      return {}
    }
  }
}

const AddonsModels = {
  'odoojs.echarts.line.race': ExtendModel
}

export default AddonsModels
