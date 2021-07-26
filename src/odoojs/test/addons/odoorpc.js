import { LoginTestCase } from './base'

export default class OdoorpcTestCase extends LoginTestCase {
  async login() {
    console.log(
      'test login before',
      JSON.parse(JSON.stringify(this.api.session_info))
    )
    const { db, login, password } = this.login_info
    const res = await this.api.login({ db, login, password })
    console.log('test login ', res)
    console.log(
      'test login after',
      JSON.parse(JSON.stringify(this.api.session_info))
    )
    return res
  }
}
