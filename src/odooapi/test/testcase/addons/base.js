import api from '@/odooapi'

export class BaseTestCase {
  constructor({ baseURL }) {
    this.baseURL = baseURL
    console.log('test rpc')
    api.init({ baseURL })
  }

  async version_info() {
    const res = await api.web.webclient.version_info()
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
