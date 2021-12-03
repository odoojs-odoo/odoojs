import { LoginTestCase } from './base'

// eslint-disable-next-line no-unused-vars
import pivot from '@/odoorpc/pivot'

export default class Pivot extends LoginTestCase {
  test() {
    //
    this.test_read()
  }

  async test_read() {
    await this.login()

    const action_xml_id = 'sale.action_quotations_with_onboarding'
    const action = await this.api.action(action_xml_id)
    const model = action.model
    const fields = model.action.fields

    const Model = model.Model
    const domain = [['user_id', '=', 2]]
    const rows = []
    const columns = ['partner_id']

    const measures = ['amount_total']

    const kwargs = { fields, measures, domain, rows, columns }
    const obj = await Model.mdx_read(kwargs)
    console.log(obj)
    console.log(obj.pivot_info)
    console.log(obj.pivot_datalist)
  }
}
//
