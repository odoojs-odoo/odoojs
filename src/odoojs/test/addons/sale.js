import { LoginTestCase } from './base'

import pivot from '@/odoorpc/pivot'

// eslint-disable-next-line no-unused-vars
const cp = val => JSON.parse(JSON.stringify(val))

export default class ViewModelTestCase extends LoginTestCase {
  async test() {
    this.test_read()
    // this.test_change_col2()
  }

  async test_change_col1() {
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

    const open_col = 'state'

    const open_rec = pivot.search_one({
      fields,
      datalist: obj.pivot_datalist,
      filter: { partner_id: 3 }
    })
    const open_val = {
      filter: { partner_id: 3 },
      domain: open_rec.__domain
    }

    await obj.pivot_change_column(open_col, open_val)

    console.log(obj)
    console.log(obj.pivot_info)
    console.log(obj.pivot_datalist)

    const open_rec2 = pivot.search_one({
      fields,
      datalist: obj.pivot_datalist,
      filter: { partner_id: 8 }
    })
    const open_val2 = {
      filter: { partner_id: 8 },
      domain: open_rec2.__domain
    }

    await obj.pivot_change_column(open_col, open_val2)

    console.log(obj)
    console.log(obj.pivot_info)
    console.log(obj.pivot_datalist)
  }

  async test_change_col2() {
    await this.login()
    const action_xml_id = 'sale.action_quotations_with_onboarding'
    const action = await this.api.action(action_xml_id)
    const model = action.model
    const fields = model.action.fields

    const Model = model.Model
    const domain = [['user_id', '=', 2]]
    const rows = []
    // const columns = ['partner_id', 'state']
    const columns = ['partner_id']

    const measures = ['amount_total']

    const kwargs = { fields, measures, domain, rows, columns }
    const obj = await Model.mdx_read(kwargs)
    console.log(obj)
    console.log(obj.pivot_info)
    console.log(obj.pivot_datalist)

    const open_col = 'company_id'

    const open_rec = pivot.search_one({
      fields,
      datalist: obj.pivot_datalist,
      filter: { partner_id: 3, state: 'sale' }
    })
    const open_val = {
      filter: { partner_id: 3, state: 'sale' },
      domain: open_rec.__domain
    }

    await obj.pivot_change_column(open_col, open_val)

    console.log(obj)
    console.log(obj.pivot_info)
    console.log(obj.pivot_datalist)

    // const open_rec2 = pivot.search_one({
    //   fields,
    //   datalist: obj.pivot_datalist,
    //   filter: { partner_id: 8, state: 'draft' }
    // })
    // const open_val2 = {
    //   filter: { partner_id: 8, state: 'draft' },
    //   domain: open_rec2.__domain
    // }

    // await obj.pivot_change_column(open_col, open_val2)
  }

  async test_read() {
    await this.login()
    const action_xml_id = 'sale.action_quotations_with_onboarding'
    const action = await this.api.action(action_xml_id)
    console.log('action:', action)
    const model = action.model
    // const res = await model.pivot_search_browse({ total: 1 })
    // console.log(' fetch_pivot_data', cp(res))

    const fields = model.action.fields

    const Model = model.Model
    const domain = [['user_id', '=', 2]]
    // const rows = ['date_order:year', 'date_order:month']
    // const rows = ['date_order:year']
    const rows = []
    // const columns = ['partner_id', 'company_id']
    // const columns = ['partner_id']
    const columns = ['partner_id', 'state']

    const measures = ['amount_total']

    const kwargs = { fields, measures, domain, rows, columns }
    await Model.mdx_read(kwargs)

    // fld.slice(fld.length-6)
  }
}
