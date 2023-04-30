import { Model } from '@/odoorpc/models'
import * as echarts from 'echarts/core'

import { HttpRequest } from '@/odoojs-rpc/request'

function randInt() {
  return Math.floor((Math.random() * 1000) / 23)
}

const ROOT_PATH = process.env.VUE_APP_ECHARTS

async function call_echarts_request(url) {
  const api = HttpRequest
  api.baseURL = ROOT_PATH
  return api.call(url)
}

export class ExtendModel extends Model {
  constructor(...args) {
    super(...args)
  }

  static async echart_run_report(myChart) {
    const url = '/data/asset/data/life-expectancy-table.json'
    const data = await call_echarts_request(url)

    const option = {
      grid3D: {},
      tooltip: {},
      xAxis3D: {
        type: 'category'
      },
      yAxis3D: {
        type: 'category'
      },
      zAxis3D: {},
      visualMap: {
        max: 1e8,
        dimension: 'Population'
      },
      dataset: {
        dimensions: [
          'Income',
          'Life Expectancy',
          'Population',
          'Country',
          { name: 'Year', type: 'ordinal' }
        ],
        source: data
      },
      series: [
        {
          type: 'bar3D',
          // symbolSize: symbolSize,
          shading: 'lambert',
          encode: {
            x: 'Year',
            y: 'Country',
            z: 'Life Expectancy',
            tooltip: [0, 1, 2, 3, 4]
          }
        }
      ]
    }
    myChart.setOption(option)
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
  'odoojs.echarts.bar3d': ExtendModel
}

export default AddonsModels
