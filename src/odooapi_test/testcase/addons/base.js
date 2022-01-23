import api from '@/odooapi'

export default class BaseTestCase {
  constructor({ login_info }) {
    this.login_info = login_info
  }

  async version_info() {
    const res = await api.web.webclient.version_info()
    console.log('test get_version_info:', res)
  }

  async login() {
    const { db, login, password } = this.login_info
    return await this.api.web.session.authenticate({ db, login, password })
  }
}
