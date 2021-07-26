import { LoginTestCase } from './base'

export default class ModelTestCase extends LoginTestCase {
  async edu() {
    await this.login()
    const model = 'ow.edu.word.link'
    const Model = this.api.env.model(model)
    const res = await Model.search_read({
      domain: [],
      fields: ['name', 'name_word_id']
    })

    console.log(res)
  }

  async edu_word() {
    await this.login()
    const model = 'ow.edu.word'
    const Model = this.api.env.model(model)
    const res = await Model.search_read({
      domain: [],
      fields: ['name']
    })

    console.log(res)
  }

  async name_search() {
    await this.login()
    const model = 'ir.module.module'
    const Model = this.api.env.model(model)
    const limit = 1180

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
    const fields = ['name']
    const limit = 80
    const kwargs = { domain, fields, limit }
    const Model = this.api.env.model(model)
    const res = await Model.search_read(kwargs)

    console.log(res)
  }

  async page_call() {
    await this.login()
    const model = 'ir.module.module'
    const Model = this.api.env.model(model)

    const fields = ['name']
    const records = await Model.create_record({ fields })

    records.domain = []
    records.order = 'id'
    records.offset = 0
    records.limit = 10

    const res = await records.pageGoto()
    console.log(records, res)
    const res2 = await records.pageGoto(2)
    console.log(records, res2)
  }
}
