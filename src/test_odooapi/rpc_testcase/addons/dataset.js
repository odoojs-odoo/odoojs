import { LoginTestCase } from './base'

export default class DatasetTestCase extends LoginTestCase {
  async call_kw() {
    await this.login()
    const model = 'ir.module.module'
    const method = 'search_read'
    const domain = []
    const fields = ['name']
    const limit = 80
    const order = 'name'

    const payload = {
      model,
      method,
      args: [],
      kwargs: { domain, fields, limit, order }
    }

    const res = await this.api.web.dataset.call_kw(payload)
    console.log(res)
    return res
  }
}
