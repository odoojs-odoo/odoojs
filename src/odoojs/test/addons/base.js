import { ODOO } from '@/odoojs'

export class BaseTestCase {
  constructor({ baseURL }) {
    this.baseURL = baseURL
    this.api = new ODOO({ baseURL })
  }

  async test_call_odoo() {
    const res = await this.api.get_version_info()
    console.log(res)
  }
}

export class LoginTestCase extends BaseTestCase {
  constructor(payload) {
    const { login_info } = payload
    super(payload)
    this.login_info = login_info
  }

  async login() {
    const { db, login, password } = this.login_info
    return await this.api.web.session.authenticate({ db, login, password })
  }
}

export default BaseTestCase
