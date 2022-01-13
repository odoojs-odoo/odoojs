/* eslint-disable no-unused-vars */
import Test from './testcase'

const baseURL = process.env.VUE_APP_BASE_API
const master_pwd = 'admin'
const login_info = { db: 't1', login: 'admin', password: '123456' }

const config = { baseURL, master_pwd, login_info }
const test = new Test(config)

export const test_rpc = async () => {
  // await test.base.version_info()
  // await test.database.test()
  // await test.session.test()
  // await test.dataset.test()
  // await test.context.test()
  // await test.ir_module.test()
  // await test.home.test()()
  //
  // TODO
  // await test.xml.test()
  // await test.export.test()
  // await test_export()
}
