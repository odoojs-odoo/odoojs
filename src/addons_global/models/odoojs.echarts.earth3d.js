import { Model } from '@/odoorpc/models'
import * as echarts from 'echarts/core'

import { HttpRequest } from '@/odoojs-rpc/request'

function randInt() {
  return Math.floor((Math.random() * 1000) / 23)
}

export class ExtendModel extends Model {
  constructor(...args) {
    super(...args)
  }

  static async echart_run_report(myChart) {
    // const api = HttpRequest
    const ROOT_PATH = '/echarts-examples'
    // const url = '/data/asset/data/life-expectancy-table.json'

    // api.baseURL = ROOT_PATH
    // const _rawData = await api.call(url)
    // console.log(res)

    const option = {
      backgroundColor: '#000',
      globe: {
        baseTexture: ROOT_PATH + '/data-gl/asset/earth.jpg',
        shading: 'lambert',
        environment: ROOT_PATH + '/data-gl/asset/starfield.jpg',
        atmosphere: {
          show: true
        },
        light: {
          ambient: {
            intensity: 0.1
          },
          main: {
            intensity: 1.5
          }
        }
      },
      series: []
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
  'odoojs.echarts.earth3d': ExtendModel
}

export default AddonsModels
