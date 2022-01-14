import BaseTestCase from './base'
import rpc from '@/odoorpc'

export default class ModelTestCase extends BaseTestCase {
  async test() {
    await this.name_search()
    await this.search_read()
  }

  async name_search() {
    await this.login()
    const model = 'ir.module.module'
    const Model = rpc.env.model(model)
    const limit = 10

    // name='', args=None, operator='ilike',
    const name = '产品%'
    const operator = '=like'

    const res = await Model.name_search({ name, operator, limit })
    console.log(res)
  }

  async search_read() {
    await this.login()
    const model = 'ir.module.module'
    const domain = []
    const fields = ['name', 'display_name']
    const limit = 10
    const kwargs = { domain, fields, limit }
    const Model = rpc.env.model(model)
    const res = await Model.search_read(kwargs)

    console.log(res)
  }
}
