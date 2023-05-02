import { Model } from '@/odoorpc/models'

import { HttpRequest } from '@/odoojs-rpc/request'

function randInt() {
  return Math.floor((Math.random() * 1000) / 23)
}

export const ROOT_PATH = 'echarts/examples'

export async function call_echarts_request(url) {
  const api = HttpRequest
  api.baseURL = ROOT_PATH
  return api.call_get(url)
}

export class EchartsBaseModel extends Model {
  constructor(...args) {
    super(...args)
  }

  static async echart_run(report, chartInstance) {
    const fn_name = `echart_run_${report}`

    if (this[fn_name]) {
      return this[fn_name](chartInstance)
    } else {
      console.log(fn_name, 'todo')
      //   alert(`${fn_name} todo`)
    }
  }

  static async get_echart_option(report) {
    // console.log(report)
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
  'odoojs.echarts.base': EchartsBaseModel
}

export default AddonsModels
