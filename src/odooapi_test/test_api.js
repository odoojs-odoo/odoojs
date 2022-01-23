import api from '@/odooapi'
const baseURL = process.env.VUE_APP_BASE_API
const timeout = 50000
api.init({ baseURL, timeout })

import Test from './testcase'

const master_pwd = 'admin'
const login_info = { db: 'test_db', login: 'admin', password: '123456' }
// const login_info = {
//   db: 'xuanzhe',
//   login: 'admin',
//   password: 'admin'
// }
const config = { master_pwd, login_info }
const test = new Test(config)

export const test_api = async () => {
  // test.base.version_info()
  //   await test.base.login()
  // await test.action.test()
  test.domain.test()
}
