import BaseTestCase from './base'
import rpc from '@/odoorpc'

export default class SessionTestCase extends BaseTestCase {
  async test() {
    await this.authenticate()
    await this.check()
    await this.destroy()
    // await this.check_no_session()
    await this.get_session_info()
    await this.get_lang_list()
    await this.modules()
    await this.change_password()
  }

  async authenticate() {
    const { db, login, password } = this.login_info
    const res = await rpc.web.session.authenticate({ db, login, password })
    console.log('test authenticate ', res)
    return res
  }

  async get_session_info() {
    await this.login()
    const res = await rpc.web.session.get_session_info()
    console.log('test get_session_info ', res)
    return res
  }

  async check() {
    await this.login()
    const res = await rpc.web.session.check()
    console.log('test session check ', res)
    return res
  }

  async check_no_session() {
    await this.destroy()
    const res = await rpc.web.session.check()
    console.log('test session check ', res)
    return res
  }

  async destroy() {
    await this.login()
    const res = await rpc.web.session.destroy()
    console.log('test session destroy ', res)
    return res
  }
  async get_lang_list() {
    await this.login()
    const res = await rpc.web.session.get_lang_list()
    console.log('test session get_lang_list ', res)
    return res
  }

  async modules() {
    await this.login()
    const res = await rpc.web.session.modules()
    console.log('test session modules ', res)
    return res
  }

  async change_password() {
    await this.login()
    const fields = [
      { name: 'old_pwd', value: '123456' },
      { name: 'new_password', value: '123456' },
      { name: 'confirm_pwd', value: '123456' }
    ]

    const res = await rpc.web.session.change_password({ fields })
    console.log('test session change_password ', res)
    return res
  }
}
