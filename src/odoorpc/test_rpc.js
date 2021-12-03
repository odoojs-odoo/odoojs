/* eslint-disable no-unused-vars */
import Test from './test'

const baseURL = process.env.VUE_APP_BASE_API
const master_pwd = 'admin'
// const login_info = { db: 'test_db', login: 'admin', password: '123456' }
const login_info = {
  db: 't1',
  login: 'admin',
  password: '123456'
}

const config = { baseURL, master_pwd, login_info }
const test = new Test(config)

export const test_rpc = async () => {
  // const childs = { ss: 1 }
  // console.log(childs)
  // for (const ch of Object.keys(childs)) {
  //   console.log(ch)
  // }
  // for (const ch in childs) {
  //   console.log(ch)
  // }
  // await test_home()
  // await test.base.test_call_odoo()
  // await test_session()
  // await test_dataset()
  // await test_context()
  // await test_ir_module()
  // await test_o2m_edit()
  // await test_account_open()
  // await test_account_report()
  // await test_edu()
  // await test_account()

  // await test_pivot()
  await test_export()
}

const test_export = async () => {
  await test.export.test()
}

const test_pivot = async () => {
  await test.pivot1.test()
}

const test_home = async () => {
  await test.home.test()
}

const test_account = async () => {
  await test.account.test()
}

const test_edu = async () => {
  await test.edu.test()
}

const test_account_report = async () => {
  // await test.account_report.general_ledger()
  // await test.account_report.partner_ledger()
  await test.account_report.balancesheet()
  // await test.account_report.profitandloss()
}

const test_account_open = async () => {
  await test.account_open.test()
}

const test_o2m_edit = async () => {
  await test.o2m.edit()
}

const test_ir_module = async () => {
  await test.ir_module.list_installed()
  await test.ir_module.install()
  // await test.ir_module.uninstall()
}

const test_context = async () => {
  await test.context.test_with_context()
  await test.context.test_with_env()
  await test.context.test_env_copy()
}

const test_dataset = async () => {
  // await test.dataset.call_kw()
  // await test.model.name_search()
  await test.model.edu()
  await test.model.edu_word()

  // await test.model.search_read()
  // await test.model.page_call()
}

const test_session = async () => {
  await test.session.authenticate()
  await test.session.get_session_info()
  await test.session.check()
  await test.session.destroy()
  await test.session.get_lang_list()
  await test.session.modules()
  await test.session.change_password()
}

const test_database = async () => {
  //   await test.database.list()
  //   await test.database.create()
  //   await test.database.list()
  //   await test.database.drop()
  //   await test.database.list()
}
