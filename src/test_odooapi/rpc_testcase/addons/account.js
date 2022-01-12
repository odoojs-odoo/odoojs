import { LoginTestCase } from './base'

export default class EduTestCase extends LoginTestCase {
  async test() {
    await this.login()
    const model = 'objective.management'
    const Model = this.api.env.model(model)

    const context = this.api.env.context
    const domain = []
    const fields = ["display_name", "department_id", "employee_id", "period_type_id", "period_id", "object_id"]
    const groupby = ["department_id"];
    const limit = 80
    // const res = await Model.search_read({ fields })

    const res = await Model.web_read_group({ domain, fields, groupby, limit })

    console.log('web_read_group,,', res)

    // const records = await Model.create_record({ fields })

    // records.domain = []
    // // records.order = 'id'
    // records.offset = 0
    // records.limit = 10

    // const res = await records.pageGoto1()
    // console.log(records, res)
    // const row_id = res[0].id
    // const rec = records.pick(row_id)
    // await rec.relation_browse('line_ids', { fields: ['code', 'name'] })
    // await rec.relation_browse('point_ids', { fields: ['number', 'name'] })

    // console.log(rec, rec.values)
  }

  // async edu() {
  //   await this.login()
  //   const model = 'ow.edu.word.link'
  //   const Model = this.api.env.model(model)
  //   const res = await Model.search_read({
  //     domain: [],
  //     fields: ['name', 'name_word_id']
  //   })
  //   console.log(res)
  // }
  // async edu_word() {
  //   await this.login()
  //   const model = 'ow.edu.word'
  //   const Model = this.api.env.model(model)
  //   const res = await Model.search_read({
  //     domain: [],
  //     fields: ['name']
  //   })
  //   console.log(res)
  // }
}
