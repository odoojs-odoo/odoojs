import rpc from '@/odoorpc'
const baseURL = process.env.VUE_APP_BASE_API
const timeout = 50000
rpc.init({ baseURL, timeout })

import Test from './testcase'

const master_pwd = '123'
const login_info = { db: 'test_db', login: 'admin', password: '123456' }
// const config = { master_pwd }
const config = { master_pwd, login_info }
const test = new Test(config)

export const test_rpc = async () => {
  // alert('test rpc')
  // await test_database_create()
  // await test_database_drop()
  // await test.base.version_info()
  // await test.database.test()
  // await test.session.test()
  // await test.dataset.test()
  // await test.model.test()
  // await test.context.test()
  await test.ir_module.test()
  // await test.home.test()()
  //
  // TODO
  // await test.xml.test()
  // await test.export.test()
  // await test_export()
}

// async function test_database_create() {
//   // const master_pwd = this.master_pwd
//   const master_pwd = '123'
//   const name = 'db_for_test_create_drop'
//   const lang = 'zh_CN'
//   const password = '123456'
//   const kwargs = {
//     demo: false,
//     login: 'admin',
//     country_code: 'CN',
//     phone: ''
//   }

//   const database_list = await rpc.web.database.list()

//   if (database_list.includes(name)) {
//     console.log('database: ', name, 'is exist')
//     return
//   }

//   console.log('test database create:', name)
//   console.log('begin:', new Date().getTime(), new Date())
//   const payload = [master_pwd, name, lang, password, kwargs]
//   const res = await rpc.web.database.create(...payload)
//   console.log('end:', new Date().getTime(), new Date())
//   console.log('test database create:', res)
//   return res
// }

// async function test_database_drop() {
//   const master_pwd = '123'
//   const name = 'db_for_test_create_drop'

//   const database_list = await rpc.web.database.list()

//   if (!database_list.includes(name)) {
//     console.log('database: ', name, 'is not exist')
//     return
//   }

//   console.log('test database drop:', name)
//   console.log('begin:', new Date().getTime(), new Date())
//   const res = await rpc.web.database.drop(master_pwd, name)
//   console.log('end:', new Date().getTime(), new Date())
//   console.log('test database drop:', res)
//   return res
// }
