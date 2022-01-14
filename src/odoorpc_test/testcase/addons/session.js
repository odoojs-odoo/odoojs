import BaseTestCase from './base'

import rpc from '@/odoorpc'

export default class SessionTestCase extends BaseTestCase {
  async test() {
    await this.authenticate()
    // await this.check()
    // await this.destroy()
    // // await this.check_no_session()
    // await this.get_session_info()
    // await this.get_lang_list()
    // await this.modules()
    // await this.change_password()
  }

  async authenticate() {
    const { db, login, password } = this.login_info
    const res = await rpc.web.session.authenticate({ db, login, password })
    console.log('test authenticate ', res)
    return res
  }
}
