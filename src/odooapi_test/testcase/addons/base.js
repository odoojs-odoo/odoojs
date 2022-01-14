import api from '@/odooapi'

export class BaseTestCase {
  constructor({ login_info }) {
    console.log('test rpc')
    this.login_info = login_info
  }

  async login() {
    const { db, login, password } = this.login_info
    return await api.web.session.authenticate({ db, login, password })
  }

  async version_info() {
    const res = await api.web.webclient.version_info()
    console.log('test get_version_info:', res)
  }
}

export default BaseTestCase
