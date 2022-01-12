import { ODOO } from '@/odoorpc/odoo'

export class BaseTestCase {
  constructor({ baseURL }) {
    this.baseURL = baseURL
    console.log('test rpc')
    this.api = new ODOO({ baseURL })
  }

  async test_call_odoo() {
    const res = await this.api.get_version_info()
    console.log('test get_version_info:', res)
  }
}

export class LoginTestCase extends BaseTestCase {
  constructor({ baseURL, login_info }) {
    console.log('test rpc login')
    super({ baseURL })
    this.login_info = login_info
  }

  async login() {
    const { db, login, password } = this.login_info
    return await this.api.web.session.authenticate({ db, login, password })
  }
}

export default BaseTestCase
