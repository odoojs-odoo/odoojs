/* eslint-disable no-unused-vars */
import Test from './testcase'

const baseURL = process.env.VUE_APP_BASE_API
const master_pwd = 'admin'

const login_info = { db: 't1', login: 'admin', password: '123456' }
// const login_info = {
//   db: 'xuanzhe',
//   login: 'admin',
//   password: 'admin'
// }
const config = { baseURL, master_pwd, login_info }

const test = new Test(config)

export const test_api = async () => {
  test.base.version_info()
}
