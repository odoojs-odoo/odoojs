import axios from 'axios'

class Proxy0 {
  constructor(payload) {
    const { baseURL, timeout = 500000 } = payload
    this._timeout = timeout
    this._baseURL = baseURL
  }
}

Proxy0._sid = undefined

class ProxyJSON extends Proxy0 {
  constructor(payload) {
    const { baseURL, timeout } = payload
    super({ baseURL, timeout })

    this._service = this._get_service()
  }

  _get_service() {
    const service = axios.create({
      baseURL: this._baseURL,
      // withCredentials: true,
      timeout: this._timeout
    })

    const session_id = this.constructor._sid

    // console.log(' session_id', session_id)

    service.interceptors.request.use(
      config => {
        // console.log('sid:', that._sid)
        if (session_id) config.headers['X-Openerp-Session-Id'] = session_id
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )

    service.interceptors.response.use(
      response => {
        const url = response.config.url
        const url_auth = '/web/session/authenticate'
        const url_info = '/web/session/get_session_info'

        if (url === url_auth || url === url_info) {
          // if run test or run from wx miniprograme, not cookie,
          // so wo set sid to call odoo

          const headers = response.headers
          const cookie = headers['set-cookie']
          if (cookie) {
            const cookie2 = cookie[0]
            const session_id = cookie2.slice(11, 51)
            Proxy0._sid = session_id
          }
        }

        const res = response.data
        // console.log(response)
        return res
      },
      error => {
        return Promise.reject(error)
      }
    )

    return service
  }

  async call(url, payload = {}) {
    const url2 = url[0] === '/' ? url : `/${url}`

    const data = {
      jsonrpc: '2.0',
      method: 'call',
      params: payload,
      id: Math.floor(Math.random() * 1000000000 + 1)
    }

    const response = await this._service({
      url: url2,
      method: 'post',
      data
    })

    return response
  }

  // eslint-disable-next-line no-unused-vars
  async call_get(url, payload = {}) {
    const url2 = url[0] === '/' ? url : `/${url}`

    // const data = {
    //   jsonrpc: '2.0',
    //   method: 'call',
    //   params: payload,
    //   id: Math.floor(Math.random() * 1000000000 + 1)
    // }

    const response = await this._service({
      url: url2,
      method: 'get'
      // data
    })

    return response
  }
}

class ProxyFileExport extends Proxy0 {
  constructor(payload) {
    const { baseURL, timeout } = payload
    super({ baseURL, timeout })
    this._service = this._get_service()
  }

  _get_service() {
    const service = axios.create({
      baseURL: this._baseURL,
      // withCredentials: true,
      timeout: this._timeout,
      headers: { 'Content-Type': 'multipart/form-data' },
      responseType: 'blob'
    })

    const session_id = this.constructor._sid

    service.interceptors.request.use(
      config => {
        if (session_id) config.headers['X-Openerp-Session-Id'] = session_id

        const data = config.data
        const fd = new FormData()
        Object.keys(data).forEach(item => fd.append(item, data[item]))

        config.data = fd
        return config
      },

      error => {
        console.log('request error') // for debug
        // errorCallback(error)
        return Promise.reject(error)
      }
    )

    service.interceptors.response.use(
      response => {
        const resp_headers = response.headers
        const filename = resp_headers['content-disposition'].slice(29)
        const filetype = resp_headers['content-type']

        // console.log('rspd', response)
        // console.log('rspd resp_headers,', resp_headers)
        // // console.log('rspd filename,', filename)
        // // console.log('rspd filetype,', filetype)

        return { filetype, filename, data: response.data }
      },

      error => {
        console.log('respond error') // for debug
        // errorCallback(error)
        return Promise.reject(error)
      }
    )

    return service
  }

  async call(url, payload = {}) {
    const url2 = url[0] === '/' ? url : `/${url}`
    // const csrf_token = this.csrf_token
    // const csrf_token = 'xxxxx'
    // const context_data = context ? { context: JSON.stringify(context) } : {}
    const data = { ...payload }

    const response_data = await this._service({
      url: url2,
      method: 'post',
      data
    })

    console.log(response_data)

    return response_data
  }
}

// eslint-disable-next-line no-unused-vars
class ProxyFileImport extends Proxy0 {
  constructor(payload) {
    const { baseURL, timeout } = payload
    super({ baseURL, timeout })

    this._service = this._get_service()
  }

  _get_service() {
    const service = axios.create({
      baseURL: this._baseURL,
      // withCredentials: true,
      timeout: this._timeout,
      headers: {
        Accept:
          'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01',
        'Content-Type': 'multipart/form-data'
      }
    })

    const session_id = this.constructor._sid

    service.interceptors.request.use(
      config => {
        if (session_id) config.headers['X-Openerp-Session-Id'] = session_id

        const data = config.data
        const fd = new FormData()
        Object.keys(data).forEach(item => {
          if (item === 'ufile') {
            const ufile = data[item]
            const arr = Array.from(new Array(ufile.length).keys())
            arr.forEach(index => fd.append(item, ufile[index]))
          } else {
            fd.append(item, data[item])
          }
        })

        config.data = fd
        return config
      },

      error => {
        console.log('request error') // for debug
        // errorCallback(error)
        return Promise.reject(error)
      }
    )

    service.interceptors.response.use(
      response => {
        // console.log('rspd', response)
        // console.log('rspd', response.data)
        return response.data
      },

      error => {
        console.log('respond error') // for debug
        // errorCallback(error)
        return Promise.reject(error)
      }
    )

    return service
  }

  async call(url, payload) {
    const url2 = url[0] === '/' ? url : `/${url}`
    const data = { ...payload }

    const response_data = await this._service({
      url: url2,
      method: 'post',
      data
    })

    // console.log(response_data)

    return response_data
  }

  async __backup_in_here_for_base_import_call(url, payload) {
    const url2 = url[0] === '/' ? url : `/${url}`
    // const csrf_token = 'xxxxx'

    const { import_id, file, jsonp, csrf_token } = payload
    const payload2 = { import_id, file, csrf_token }
    if (jsonp) payload2.jsonp = jsonp

    const response_data = await this._service({
      url: url2,
      method: 'post',
      data: payload2
    })

    // console.log(response_data)

    return response_data
  }
}

// export default {
//   ProxyJSON,
//   ProxyFileExport,
//   ProxyFileImport
// }

export class JsonRequest {
  constructor() {}

  static get baseURL() {
    return this._baseURL
  }

  static set baseURL(val) {
    this._baseURL = val
  }

  static get timeout() {
    return this._timeout
  }

  static set timeout(val) {
    this._timeout = val
  }

  static async json_call(url, payload = {}) {
    const req = new ProxyJSON({
      baseURL: this.baseURL,
      timeout: this.timeout
    })

    const data = await req.call(url, payload)
    // console.log(data)
    if (data.error) throw data.error
    else return data.result
  }

  // async json_get(url, payload = {}) {
  //   const data = await this._rpc.call_get(url, payload)
  //   // console.log(data)
  //   return data
  // }
}

JsonRequest._baseURL = undefined
JsonRequest._timeout = undefined

export class FileRequest extends JsonRequest {
  constructor(payload) {
    super(payload)
  }

  static async csrf_token() {
    const url = '/web2/session/csrf_token'
    return await this.json_call(url, {})
  }

  static async file_export(url, payload) {
    const req = new ProxyFileExport({
      baseURL: this.baseURL,
      timeout: this.timeout
    })

    const token = 'dummy-because-api-expects-one'
    const csrf_token = await this.csrf_token()

    const data = await req.call(url, { ...payload, token, csrf_token })

    // console.log(url, payload, data)
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

  static async file_import(url, payload) {
    const req = new ProxyFileImport({
      baseURL: this.baseURL,
      timeout: this.timeout
    })

    const csrf_token = await this.csrf_token()
    const data = await req.call(url, { ...payload, csrf_token })

    // console.log(url, payload, data)
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
}
