import Test from './test'

import py_utils from './py_utils'

const baseURL = process.env.VUE_APP_BASE_API
const master_pwd = 'admin'

const menuLoad = true

// const login_info = { db: 'test_db', login: 'admin', password: '123456' }
const login_info = {
  db: 'test_account_0521',
  login: 'admin',
  password: '123456'
}
const config = { baseURL, menuLoad, master_pwd, login_info }

const test = new Test(config)

export const test_odoojs = async () => {
  // await test.base.test_call_odoo()
  // await test_odoorpc()
  // await test_action()
  // await test_view()
  // await test_viewmodel()
  await test_o2m()
}

const test_o2m = async () => {
  // await test.viewmodel.account_move()
  await test.viewmodel.account_move_o2m_edit()
}

const test_viewmodel = async () => {
  // await test.viewmodel.listmodel()
  // await test.viewmodel.formmodel()
  // await test.viewmodel.formview_edit()
  // await test.viewmodel.formview_new()
  // await test.viewmodel.formview_del()
  // await test.viewmodel.formview_read_partner_o2m()
  await test.viewmodel.formview_read_country()
}

const test_view = async () => {
  await test.view.view1()
  await test.view.view2()
  await test.view.view3()
}

const test_action = async () => {
  await test.action.test_load1()
  // await test.action.test_load2()
  // await test.action.test_load3()
}

const test_odoorpc = async () => {
  await test.odoorpc.login()
  await test.menu.load()
  await test.menu.session_check()
}

const test_py = () => {
  // const context_str =
  //   "{'default_type': context.get('default_type', 'ss'), 'search_default_misc_filter':1, 'view_no_maturity': True}"

  // const domain_str =
  //   "[('ss','=',context.get('default_type', 'ss')),('x','>', move_id)]"

  const context_str = `
    {'default_type': context.get('default_type'), 
     'line_ids': line_ids, 'journal_id': journal_id, 
     'default_partner_id': commercial_partner_id, 
     'default_currency_id': currency_id != company_currency_id and currency_id or False
    }
  `

  const my_values = {
    line_ids: [
      [4, 32, false],
      [4, 33, false]
    ],
    journal_id: 1,
    commercial_partner_id: 12,
    currency_id: 3,
    company_currency_id: 4
  }

  const my_context = {
    default_type: 'entry',
    allowed_company_ids: [1],
    lang: 'zh_CN',
    search_default_misc_filter: 1,
    tz: false,
    uid: 2,
    view_no_maturity: true
  }

  const evaluation_context = {
    ...my_values,
    context: my_context
  }

  console.log(JSON.parse(JSON.stringify(evaluation_context)))
  // const domain = py_utils.eval(domain_str, evaluation_context)
  const context = py_utils.eval(context_str, evaluation_context)
  console.log(context, evaluation_context)
}
