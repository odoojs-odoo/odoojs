import BaseTestCase from './base'
import rpc from '@/odoorpc'

export default class DatasetTestCase extends BaseTestCase {
  async test() {
    await this.call_kw()
    await this.call_kw_with_context()
  }
  async call_kw() {
    await this.login()
    const model = 'ir.module.module'
    const method = 'search_read'
    const domain = []
    const fields = ['name', 'display_name']
    const limit = 10
    const order = 'name'

    const payload = {
      model,
      method,
      args: [],
      kwargs: { domain, fields, limit, order }
    }

    const res = await rpc.web.dataset.call_kw(payload)
    console.log('module, en,', res)
    return res
  }
  async call_kw_with_context() {
    await this.login()
    const model = 'ir.module.module'
    const method = 'search_read'
    const domain = []
    const fields = ['name', 'display_name']
    const limit = 10
    const order = 'name'

    // const context = { lang: 'zh_CN' }
    const context = rpc.web.session.context

    const payload = {
      model,
      method,
      args: [],
      kwargs: { domain, fields, limit, order, context }
    }

    const res = await rpc.web.dataset.call_kw(payload)
    console.log('module, cn,', res)
    return res
  }
}
