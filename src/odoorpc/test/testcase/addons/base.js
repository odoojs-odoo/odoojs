import rpc from '@/odoorpc'

export class BaseTestCase {
  constructor({ baseURL }) {
    this.baseURL = baseURL
    console.log('test rpc')
    rpc.init({ baseURL })
  }

  async version_info() {
    const res = await rpc.web.webclient.version_info()
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
    return await rpc.web.session.authenticate({ db, login, password })
  }
}

export default BaseTestCase
