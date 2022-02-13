import { JsonRequest } from '@/odoorpc/request'

import { toJSON } from '../xml2json'

class Potal extends JsonRequest {
  constructor(payload) {
    super(payload)
  }

  static async http_get(url, payload = {}) {
    let html = await super.http_get(url, payload)
    // console.log(url, payload, html)
    html = html.trim()
    // console.log('act_url', html.slice(0, 30))
    // html = html.split('<!DOCTYPE html>')[1].trim()
    // html = html.split('<html>')[1].trim()
    // html = html.split('</html>')[0].trim()
    html = html.split('</head>')[1].trim()
    html = html.slice(6)
    html = html.slice(0, html.length - 7).trim()
    // console.log('act_url', html)
    const res2 = toJSON(html)
    const node = res2.children.find(item => item.tagName === 'main')
    //   console.log('act_url', cp(this.node))

    return node
  }

  static async _pdf(url, kwargs = {}) {
    // const { download } = kwargs
    return await super.http_get(url, kwargs)
  }

  static async _docs2(url, kwargs = {}) {
    const { res_id, ...kw2 } = kwargs
    console.log(url, res_id, kw2)
    const todo = Object.keys(kw2)
      .map(item => `${item}=${kw2[item]}`)
      .join('&')

    const url3 = res_id ? `${url}/${res_id}` : url
    const url9 = todo ? `${url3}?${todo}` : url3

    const { report_type } = kw2
    if (report_type === 'pdf') {
      //     download: "true"
      // report_type: "pdf"
      // console.log(url3, url9)
      return await this._pdf(url9, kw2)
    } else {
      // console.log(url3, url9)
      return await this.http_get(url9, {})
    }
  }

  static async home() {
    const url = '/my/home'
    return await this.http_get(url, {})
  }

  static async counters(payload) {
    const url = '/my/counters'
    const { counters } = payload
    return await this.json_call(url, { counters })
  }

  static async account() {
    const url = '/my/account'
    return await this.http_get(url, {})
  }

  static async security() {
    const url = '/my/security'
    return await this.http_get(url, {})
  }

  static async quotes(kwargs = {}) {
    const url = '/my/quotes'
    return this._docs2(url, kwargs)
  }

  static async orders(kwargs = {}) {
    const url = '/my/orders'
    return this._docs2(url, kwargs)
  }

  static async purchase(kwargs = {}) {
    const url = '/my/purchase'
    return this._docs2(url, kwargs)
  }

  static async invoices(kwargs = {}) {
    const url = '/my/invoices'
    return this._docs2(url, kwargs)
  }

  static async projects() {
    const url = '/my/projects'
    return await this.http_get(url, {})
  }

  static async project(kwargs = {}) {
    const url = '/my/project'
    return this._docs2(url, { ...kwargs })
  }

  static async tasks(kwargs = {}) {
    const url = '/my/tasks'
    return this._docs2(url, kwargs)
  }

  static async task(kwargs = {}) {
    const url = '/my/task'
    return this._docs2(url, kwargs)
  }
}

export default {
  my: Potal
}
