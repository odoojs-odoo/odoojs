import { LoginTestCase } from './base'
import rpc from '@/odoorpc'

export default class EduTestCase extends LoginTestCase {
  async test() {
    // // await this.signup()
    // await this.signup_prepare()
  }

  async signup() {
    const { db } = this.login_info
    const name = 'user1'
    const login = 'user1'
    const password = '123'
    const confirm_password = '123'

    const payload = { db, name, login, password, confirm_password }

    const res = await rpc.web.home.signup(payload)
    console.log(res)
  }

  async signup_prepare() {
    await this.login()
    const Model = rpc.env.model('res.partner')
    const ids = await Model.search([['name', '=', 'user2']])
    const res = await Model.execute('signup_prepare', ids)
    console.log(res)
    const res2 = await Model.read(ids, {
      fields: ['name', 'signup_token', 'signup_type', 'signup_expiration']
    })
    console.log(res2)

    const token = res2[0].signup_token
    console.log(token)
    await this.signup_by_token(token, 'user2')
  }

  async signup_by_token(token, login) {
    const { db } = this.login_info

    const password = '123'
    const confirm_password = '123'

    const payload = { db, token, login, password, confirm_password }

    const res = await rpc.web.home.signup(payload)
    console.log(res)
  }

  async test_portal_user() {
    const { db } = this.login_info
    const login = 'user1'
    const password = '123'

    const session_info = await rpc.web.session.authenticate({
      db,
      login,
      password
    })
    console.log(session_info)

    // const uid = session_info.uid

    const model = 'res.users'
    const Model = rpc.env.model(model)
    const res = await Model.execute('has_group', 'base.group_user')

    console.log(res)
    const invs = await this._search_invoice()
    console.log(invs)

    // /my/invoices
    // /my/timesheets
    // /my/projects
    // /my/tasks
    // /my/purchase
    // /my/quotes
    // /my/orders
    // /my/leads
    // /my/opportunities
  }

  async _search_invoice() {
    const model = 'account.move'
    const Model = rpc.env.model(model)
    const res = await Model.search([])
    return res
  }

  // async edu() {

  // }
  // async edu_word() {

  // }
}
