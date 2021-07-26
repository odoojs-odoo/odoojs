import { LoginTestCase } from './base'

export default class MenuTestCase extends LoginTestCase {
  async load() {
    console.log('test login before', this.api.menu)
    const res = await this.login()
    console.log('test login after', this.api.menu)
    return res
  }
  async session_check() {
    await this.login()
    const res = await this.api.session_check()
    console.log('test session_check', res)
    console.log('test session_check', this.api.menu)
    return res
  }
}
