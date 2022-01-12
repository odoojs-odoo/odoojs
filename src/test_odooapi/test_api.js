/* eslint-disable no-unused-vars */
import Test from './api_testcase'

const baseURL = process.env.VUE_APP_BASE_API
const master_pwd = 'admin'

// const login_info = { db: 'test_db', login: 'admin', password: '123456' }
const login_info = {
  db: 'xuanzhe',
  login: 'admin',
  password: 'admin'
}
const config = { baseURL, master_pwd, login_info }

const test = new Test(config)

export const test_odoojs = async () => {
  // await test_partner()
}

const test_qweb = async () => {
  await test.qweb.test()
}

const test_partner = async () => {
  // await test.partner.test()
  await test.partner.test_group_read()
}
