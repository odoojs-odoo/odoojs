import { LoginTestCase } from './base'

// eslint-disable-next-line no-unused-vars
const cp = val => JSON.parse(JSON.stringify(val))

export default class ViewModelTestCase extends LoginTestCase {
  async test() {
    // this.test_read()
    this.test_edit_o2m()
  }

  async test_edit() {
    await this.login()
  }

  // main formview read
  // 1. main read
  // 2 sub . tree browse
  // 3 sub . tree pick one

  async test_read() {
    await this.login()
    const action_xml_id = 'contacts.action_contacts'
    const action = await this.api.action(action_xml_id)

    console.log('action:', action)
    const model = action.model
    await model.pageGoto(1)
    console.log('values_list', cp(model.values_list))

    await model.read(8)

    const formview = model.views.form
    const type = 'one2many'
    const field = 'bank_ids'
    const res_model = formview.fields.bank_ids.relation
    const node = formview._debug_node_get(field)
    await model.relation_to_browse({ type, field, res_model, node })
    await model.relation_pick({ type, field, node, row_id: 10, editable: true })

    console.log('dataInfo2', model, cp(model.data_info))
  }

  // main formview edit / new
  // 1. main read / onchange
  // 2. sub . tree browse
  // 3. sub . tree pick one, 取 模拟的 sub form view

  async test_edit_o2m() {
    await this.login()
    const action_xml_id = 'contacts.action_contacts'
    const action = await this.api.action(action_xml_id)
    console.log('action:', action)
    const model = action.model
    const formview = model.views.form
    const type = 'one2many'
    const field = 'bank_ids'
    const res_model = formview.fields.bank_ids.relation
    const node = formview._debug_node_get(field)

    const first_call = async name => {
      await model.onchange()
      await model.relation_to_browse({ type, field, res_model, node })

      // const res =
      await model.relation_pick_reset({ type, field, node })
      await model.relation_pick({ type, field, node })
      console.log('data_info1:', model, cp(model.data_info))
      const dataInfo = JSON.parse(JSON.stringify(model.data_info))
      const subDataInfo = dataInfo.relation[field]
      const row_id = subDataInfo.dataDict.id
      await model.onchange({
        field: 'acc_number',
        value: name,
        relation: [{ field, row_id }]
      })
      await model.onchange({
        field: 'bank_id',
        value: 2,
        relation: [{ field, row_id }]
      })

      await model.commit({
        relation: [{ field, row_id }]
      })
      console.log('data_info2:', cp(model.data_info))
    }

    await first_call('zzz')
    console.log('data_info99:', model, cp(model.data_info))
    await first_call('zz2')
    console.log('data_info992:', cp(model.data_info))

    // if (res) {
    //   const dataInfo = JSON.parse(JSON.stringify(model.data_info))
    // }

    console.log('model.data_info:', model.data_info)
    // console.log('model.node:', node, formview.fields.bank_ids.relation)
    //   // console.log('dataInfo', dataInfo)
  }
}
