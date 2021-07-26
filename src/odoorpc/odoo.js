import request from './request'
import { WEB } from './web'
import { Environment } from './env'

export class ODOO {
  constructor(payload) {
    const { baseURL, timeout = 50000 } = payload
    this._baseURL = baseURL

    this._rpc = new request.ProxyJSON({ baseURL, timeout })
    this._web = new WEB({ odoo: this })

    this._env = new Environment({ odoo: this })

    this._version_info = {}

    const version_info = this.get_version_info()
    this._version_info_promise = version_info
    version_info.then(res => {
      this._version_info = res
    })

    this._virtual_id = 1
  }

  get baseURL() {
    // 计算 image 的 url 时需要
    return this._baseURL
  }

  get_virtual_id() {
    // new a o2m field, need an unique virtual id
    const int_virtual_id = this._virtual_id
    this._virtual_id = this._virtual_id + 1
    return `virtual_${int_virtual_id}`
  }

  get web() {
    return this._web
  }

  get env() {
    return this._env
  }

  get session() {
    return this.web.session
  }

  get session_info() {
    return this.web.session.session_info
  }

  get version_info() {
    return this._version_info
  }

  get version_info_promise() {
    return this._version_info_promise
  }

  async json_call(url, payload = {}) {
    const data = await this._rpc.call(url, payload)
    if (data.error) {
      throw data.error
    } else {
      return data.result
    }
  }

  async file_export(url, payload) {
    const rpc = new request.ProxyFileExport({
      baseURL: this.baseURL,
      timeout: 50000
    })
    const data = await rpc.call(url, payload)
    if (data.error) {
      // TBD
      throw data.error
      // raise error.RPCError(
      //   data['error']['data']['message'],
      //   data['error'])
    } else {
      return data
    }
  }

  // async file_import(url, payload) {
  //   const data = await this._connector.proxy_file_import.call(url, payload)
  //   if (data.error) {
  //     // TBD
  //     throw data.error
  //     // raise error.RPCError(
  //     //   data['error']['data']['message'],
  //     //   data['error'])
  //   } else {
  //     return data
  //   }
  // }

  /*
  // 数据导出 流程
  // 1. call: /web/export/formats,
  //    return: [{tag: "csv", label: "CSV"}, {tag: "xlsx", label: "XLSX", error: null}]
  // 2. call /web/export/get_fields,
  //    param: model, import_compat
  //    return: [{id, value, string, field_type }]
  // 3. call /web/dataset/call_kw/ir.exports/search_read
  // 4. call export_xlsx()
  //    param:
 
    // param:
    // const data = {
    //   model: 'sale.order',
    //   fields: [
    //     { name: 'name', label: '订单关联' },
    //     { name: 'create_date', label: '创建日期' },
    //     { name: 'commitment_date', label: '交货日期' },
    //     { name: 'expected_date', label: '预计日期' },
    //     { name: 'partner_id', label: '客户' },
    //     { name: 'user_id', label: '销售员' },
    //     { name: 'amount_total', label: '合计' },
    //     { name: 'state', label: '状态' },
    //     { name: 'activity_exception_decoration', label: '活动例外勋章' }
    //   ],
    //   ids: [13],
    //   domain: [['user_id', '=', 2]],
    //   groupby: [],
    //   context: {
    //     lang: 'zh_CN',
    //     tz: false,
    //     uid: 2,
    //     allowed_company_ids: [1],
    //     params: {
    //       action: 318,
    //       cids: 1,
    //       menu_id: 189,
    //       model: 'sale.order',
    //       view_type: 'list'
    //     }
    //   },
    //   import_compat: false
    // }
    */

  async export_xlsx(data) {
    const url = '/web2/export/xlsx'
    const data2 = await this.file_export(url, data)

    return data2
  }

  async export_csv(data) {
    const url = '/web2/export/csv'
    const data2 = await this.file_export(url, data)

    return data2
  }

  download({ filename, filetype, data }) {
    // //ArrayBuffer 转为 Blob
    const blob = new Blob([data], { type: filetype })
    const objectUrl = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.setAttribute('href', objectUrl)
    a.setAttribute('download', filename)
    a.click()
  }

  upload(callback) {
    const input = document.createElement('input')
    input.type = 'file'
    input.click()
    input.onchange = () => {
      const file = input.files[0]
      callback(file)
    }
  }

  async get_version_info() {
    const url = '/web/webclient/version_info'
    return await this.json_call(url, {})
  }

  async login({ db, login, password }) {
    await this.web.session.authenticate({ db, login, password })
    return true
  }

  async logout() {
    try {
      await this.web.session.destroy()
      return true
    } catch {
      return true
    }
  }

  async session_check() {
    try {
      if (this.session_info.uid) {
        await this.web.session.check()
      } else {
        await this.web.session.get_session_info()
      }
      return true
    } catch (erorr) {
      return false
    }
  }
}
