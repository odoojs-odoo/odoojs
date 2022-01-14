import rpc from '@/odoorpc'

export default class BaseTestCase {
  constructor({ login_info }) {
    this.login_info = login_info
  }

  async version_info() {
    const res = await rpc.web.webclient.version_info()
    console.log('test get_version_info:', res)
  }

  async login() {
    const { db, login, password } = this.login_info
    return await rpc.web.session.authenticate({ db, login, password })
  }
}
