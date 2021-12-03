/* eslint-disable no-unused-vars */
import { LoginTestCase } from './base'

export default class ViewModelTestCase extends LoginTestCase {
  async listmodel() {
    await this.login()
    //
    const action_xml_id = 'base.action_country'
    // const action_xml_id = 'base.action_partner_employee_form'
    const action = await this.api.action(action_xml_id)
    const listview = action.listview
    const model2 = listview.model
    const model = model2.with_context({ lang: 'en_US' })
    const res = await model.pageGoto(1)
    console.log('listmodel:', model, res)
    console.log(
      'total_length,page_count,page_number:',
      model.total_length,
      model.page_count,
      model.page_number
    )
    const res2 = await model.pageGoto(2)
    console.log('listmodel:', model, res2)
    // // 总记录数, 总页数, 当前页
    console.log(
      'total_length,page_count,page_number:',
      model.total_length,
      model.page_count,
      model.page_number
    )
  }

  async formmodel() {
    await this.login()

    // const action_xml_id = 'base.action_partner_category_form'
    const action_xml_id = 'contacts.action_contacts'

    const action = await this.api.action(action_xml_id)
    const listview = action.listview
    const listmodel = listview.model
    const dataList = await listmodel.pageGoto(1)
    console.log('formview,dataList:', dataList)

    const formview = action.formview
    const model = formview.model
    const rid = dataList[2].id
    console.log('formview,dataDict:', model, rid)
    const dataDict = await model.read(rid)
    console.log('formview,dataDict:', model, dataDict)
    const node = model.view._debug_node_get('category_id')
    console.log('formview,node:', node)
    await model.relation_browse('category_id', { node })
    const dataDict2 = model.values
    console.log('formview,dataDict:', dataDict2)

    const node3 = model.view._debug_node_get('bank_ids')
    console.log('formview,node:', node3)
    await model.relation_browse('bank_ids', { node })
    console.log('formview,dataDict:', model.values)
  }

  async formview_edit() {
    await this.login()
    const action_xml_id = 'contacts.action_contacts'
    const action = await this.api.action(action_xml_id)
    const listview = action.listview
    const listmodel = listview.model
    const dataList = await listmodel.pageGoto(1)
    console.log('formview,dataList:', dataList)

    const formview = action.formview
    const model = formview.model
    const rid = dataList[2].id
    const dataDict = await model.read(rid)
    console.log('formview,dataDict:', model, dataDict)
    const node1 = model.view._debug_node_get('category_id')
    console.log('formview,node:', node1)
    await model.relation_browse('category_id', { node: node1 })

    const dataDict2 = model.values
    console.log('formview,dataDict:', dataDict2)

    const node2 = model.view._debug_node_get('parent_id')
    console.log('formview,node:', node2)
    const ops = await model.get_selection('parent_id', { node: node2 })
    console.log('formview,ops:', ops)
    const ops2 = await model.get_selection('type')
    console.log('formview,ops2:', ops2)

    const name_node = model.view._debug_node_get('name')
    const name_required = model.get_required(name_node, model.values)
    const currency_id_node = model.view._debug_node_get('currency_id')
    const currency_id_readonly = model.get_readonly(
      currency_id_node,
      model.values
    )
    const type_node = model.view._debug_node_get('type')
    const type_invisible = model.get_invisible(type_node, model.values)
    console.log(name_required, currency_id_readonly, type_invisible)
    await model.onchange('mobile', '123')
    console.log(model.values)

    await model.commit()
    console.log(model.values)
    console.log(model)
  }

  async formview_new() {
    await this.login()
    const action_xml_id = 'contacts.action_contacts'
    const action = await this.api.action(action_xml_id)

    const formview = action.formview
    const model = formview.model

    const dataDict = await model.onchange()
    console.log('formview,dataDict:', model, dataDict)
    await model.onchange('name', 'asd')
    console.log(model.values)
    await model.onchange('mobile', 'asd')
    console.log(model.values)

    await model.commit()
    console.log(model.values)
    console.log(model)
  }

  async formview_del() {
    await this.login()
    const action_xml_id = 'contacts.action_contacts'
    const action = await this.api.action(action_xml_id)
    const listview = action.listview
    const listmodel = listview.model
    listmodel.order = 'id desc'

    const dataList = await listmodel.pageGoto(1)
    console.log(
      dataList,
      listmodel.total_length,
      listmodel.page_count,
      listmodel.page_number
    )

    const rid = dataList[0].id
    const formview = action.formview
    const model = formview.model
    await model.read(rid)
    console.log(model.values, model)
    await model.unlink()
    const dataList2 = await listview.model.pageGoto(1)
    console.log(dataList2)
  }

  async formview_read_partner_o2m() {
    await this.login()
    const action_xml_id = 'contacts.action_contacts'
    const action = await this.api.action(action_xml_id)
    const listview = action.listview
    const listmodel = listview.model
    listmodel.domain = [['id', '=', 7]]
    const dataList = await listmodel.pageGoto(1)
    console.log(dataList)
    const rid = dataList[0].id

    const formview = action.formview

    const model = formview.model

    const dataDict = await model.read(rid)

    const node = model.view._debug_node_get('child_ids')
    await model.relation_browse('child_ids', { node })
    console.log(node)

    console.log(model, model.values)
  }

  async formview_read_country() {
    await this.login()
    const action_xml_id = 'base.action_country'
    const action = await this.api.action(action_xml_id)
    const listview = action.listview

    const listmodel = listview.model
    listmodel.domain = [['code', '=', 'CN']]
    const dataList = await listmodel.pageGoto(1)
    console.log(dataList)
    const rid = dataList[0].id
    const formview = action.formview

    const model = formview.model
    const dataDict = await model.read(rid)

    const node = model.view._debug_node_get('state_ids')
    console.log('formview,node:', node)

    await model.relation_browse('state_ids', { node })
    console.log(model, model.values)

    // return dataDict
  }

  async account_move() {
    await this.login()
    const action_xml_id = 'account.action_move_journal_line'
    const action = await this.api.action(action_xml_id)
    const listview = action.listview
    const listmodel = listview.model
    listmodel.domain = [['id', '=', 14]]
    const dataList = await listmodel.pageGoto(1)
    console.log(dataList)
    const rid = dataList[0].id
    const formview = action.formview
    const model = formview.model
    await model.read(rid)

    const node = model.view._debug_node_get('line_ids')
    await model.relation_browse('line_ids', { node })

    await model.onchange('date', '2021-06-01')

    const line_ids_model = model.relation_model('line_ids', { node })

    console.log(model, line_ids_model, model.values)
  }

  async account_invoice_o2m_edit() {
    await this.login()
    const action_xml_id = 'account.action_move_out_invoice_type'
    const action = await this.api.action(action_xml_id)
    console.log(action)
    const model = action.model
    console.log(model)

    // model.order = 'id desc'
    // model.limit = 10
    // // listmodel.domain = [['id', '<', 0]]

    const dataList = await model.pageGoto(1)
    console.log('listmodel,', model, dataList)

    // const dataList2 = await model.with_view('kanban').pageGoto(1)
    // console.log('listmodel,', model, dataList2)

    const rid = dataList[0].id
    await model.read(rid)
    // console.log('formviewmodel,', model, model.values)

    const node = model.views.form._debug_node_get('invoice_line_ids')

    console.log('formviewmodel,', model, node)

    // const line_model = model.relation_model('invoice_line_ids', {
    //   node
    // })

    // console.log('invoice_line_ids', line_model)
    const line_model = await model.relation_browse('invoice_line_ids', {
      node,
      view_type: 'kanban'
    })

    console.log('invoice_line_ids', line_model, line_model.values_list)

    // const line_id1 =
    //   line_model.values_list[line_model.values_list.length - 1].id

    // await line_model.pick_one(line_id1)
    // await line_model.onchange_one(line_id1, 'quantity', 1)
    // await line_model.commit_one(line_id1)

    // await line_model.pick_one(line_id1)
    // await line_model.onchange_one(line_id1, 'price_unit', 120)
    // await line_model.commit_one(line_id1)

    // const new_line = await line_model.new_one()
    // const new_line_id = new_line.id
    // await line_model.onchange_one(new_line_id, 'quantity', 11)
    // await line_model.onchange_one(new_line_id, 'price_unit', 110)
    // await line_model.commit_one(new_line_id)

    // await line_model.pick_one(new_line_id, { view_type: 'form' })
    // await line_model.onchange_one(new_line_id, 'quantity', 13)
    // await line_model.onchange_one(new_line_id, 'price_unit', 130)
    // await line_model.commit_one(new_line_id)

    // await model.commit()

    // await line_model.remove_one(line_id1)
    // await model.commit()

    // TBD,
    // 1 rollback, 2 remove, 3 new then edit
  }

  async account_move_o2m_edit() {
    await this.login()
    const action_xml_id = 'account.action_move_journal_line'

    const action = await this.api.action(action_xml_id)
    const listview = action.listview
    const listmodel = listview.model
    listmodel.order = 'id desc'
    listmodel.limit = 10

    // listmodel.domain = [['id', '=', 14]]
    const dataList = await listmodel.pageGoto(1)
    console.log('listmodel,', listmodel, dataList)
    const rid = dataList[0].id
    const formview = action.formview
    const model = formview.model
    await model.read(rid)
    console.log(model, model.values)

    // const node_journal_id = model.view._debug_node_get('journal_id')
    // const journal_id_options = await model.get_selection('journal_id', {
    //   node: node_journal_id
    // })
    // console.log('journal_id_options', journal_id_options)

    const node = model.view._debug_node_get('line_ids')
    await model.relation_browse('line_ids', { node })
    const line_ids_model = model.relation_model('line_ids', { node })
    // console.log(line_ids_model, line_ids_model.values_list)

    // const line_id0 = line_ids_model.values_list[0].id
    // const m2m = await line_ids_model.relation_browse('tag_ids', {
    //   row_id: line_id0
    // })
    // console.log('xxx, tag_ids', m2m)
    // console.log('values', model, model.values)

    // await model.onchange('date', '2021-06-01')
    // console.log(model, model.values)

    // const line_id1 =
    //   line_ids_model.values_list[line_ids_model.values_list.length - 1].id

    // const line_ids_form_model = model.relation_model('line_ids', {
    //   node,
    //   view_type: 'form'
    // })

    // console.log('xxxxxx, line_ids_form_model1', [line_ids_form_model], line_id1)
    // line_ids_model.pick_one(line_id1)
    // console.log('xxxxxx, 2222')

    // await line_ids_model.onchange_one(line_id1, 'debit', 1200)
    // const record_edit = line_ids_model.record_edit
    // console.log(record_edit, record_edit.values)
    // await line_ids_model.commit_one(line_id1)
    // console.log(line_ids_model, line_ids_model.values_list)

    // console.log(model, model.values_onchange)

    // const new_line = await line_ids_model.new()
    // console.log(line_ids_model, new_line, new_line.values)

    // const node_account_id = line_ids_model.view._debug_node_get('account_id')
    // console.log(node_account_id)

    // const new_line_id = new_line.id

    // const account_id_options = await line_ids_model.get_selection(
    //   'account_id',
    //   { node: node_account_id, row_id: new_line_id, name: '400100' }
    // )
    // console.log('account_id_options', account_id_options)

    // const acc_id1 = account_id_options[0]
    // console.log('account_id_options', acc_id1)
    // await line_ids_model.onchange_one(new_line_id, 'account_id', ...acc_id1)
    // console.log(line_ids_model, new_line, new_line.values)

    // await line_ids_model.commit_one(new_line_id)

    // console.log(model, model.values, model.records.values_for_write)

    // await model.commit()
    // console.log(model, model.values, model.records.values_for_write)
  }
}
