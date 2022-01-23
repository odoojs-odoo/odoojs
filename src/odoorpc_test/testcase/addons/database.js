import BaseTestCase from './base'
import rpc from '@/odoorpc'

export default class DatabaseTestCase extends BaseTestCase {
  constructor(config) {
    super(config)
    const { master_pwd } = config
    this.master_pwd = master_pwd
  }

  async test() {
    await this.list()
    // await this.create()
    // await this.list()
    // await this.drop()
    // await this.list()
  }

  async list() {
    const res = await rpc.web.database.list()
    console.log('test database list:', res)
  }

  async create() {
    const master_pwd = this.master_pwd
    const name = 'db_for_test_create_drop'
    const lang = 'zh_CN'
    const password = '123456'
    const kwargs = {
      demo: false,
      login: 'admin',
      country_code: 'CN',
      phone: ''
    }

    const database_list = await rpc.web.database.list()

    if (database_list.includes(name)) {
      console.log('database: ', name, 'is exist')
      return
    }

    console.log('test database create:', name)
    console.log('begin:', new Date().getTime(), new Date())
    const payload = [master_pwd, name, lang, password, kwargs]
    const res = await rpc.web.database.create(...payload)
    console.log('end:', new Date().getTime(), new Date())
    console.log('test database create:', res)
    return res
  }

  async drop() {
    const master_pwd = this.master_pwd
    const name = 'db_for_test_create_drop'

    const database_list = await rpc.web.database.list()

    if (!database_list.includes(name)) {
      console.log('database: ', name, 'is not exist')
      return
    }

    console.log('test database drop:', name)
    console.log('begin:', new Date().getTime(), new Date())
    const res = await this.api.web.database.drop(master_pwd, name)
    console.log('end:', new Date().getTime(), new Date())
    console.log('test database drop:', res)
    return res
  }
}
