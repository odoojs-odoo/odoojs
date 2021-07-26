import { expect } from 'chai'

import { get_odoo } from './config'

import Config from './config'

const { ODOO, baseURL, login_info } = Config
const { db, login, password } = login_info

const session_check = async api => {
  try {
    await api.web.session.check()
    return true
  } catch {
    return false
  }
}

const session_destroy = async api => {
  try {
    await api.web.session.destroy()
    return true
  } catch {
    return false
  }
}

describe('Test Session', async () => {
  // it('authenticate', async () => {
  //   const api = new ODOO({ baseURL })
  //   const session_info = await api.web.session.authenticate({
  //     db,
  //     login,
  //     password
  //   })
  //   expect(session_info.username).to.equal(login)
  //   expect(session_info.db).to.equal(db)
  // })
  // it('check after no authenticate', async () => {
  //   const api = new ODOO({ baseURL })
  //   await session_destroy()
  //   const check_ok = await session_check(api)
  //   expect(check_ok).to.equal(false)
  // })
  // it('check after authenticate', async () => {
  //   const api = await get_odoo()
  //   const check_ok = await session_check(api)
  //   expect(check_ok).to.equal(true)
  // })
})

describe('Test login ', async () => {
  // it('login with wrong db', async () => {
  //   const api = new ODOO({ baseURL })
  //   // const payload = { db: 'db', login: 'user_not_in_db', password }
  //   const payload = { db: 'db_not_exist', login, password }
  //   const to_login = async () => {
  //     try {
  //       const result = await api.login(payload)
  //       return { result }
  //     } catch (e) {
  //       return { result: false, error: e }
  //     }
  //   }
  //   const res = await to_login()
  //   expect(res.result).to.equal(false)
  //   expect(res.error.data.exception_type).to.equal('internal_error')
  // })
  // it('login with wrong user', async () => {
  //   const api = new ODOO({ baseURL })
  //   const payload = { db, login: 'user_not_in_db', password }
  //   const to_login = async () => {
  //     try {
  //       const result = await api.login(payload)
  //       return { result }
  //     } catch (e) {
  //       return { result: false, error: e }
  //     }
  //   }
  //   const res = await to_login()
  //   expect(res.result).to.equal(false)
  //   expect(res.error.data.exception_type).to.equal('access_denied')
  // })
  // it('login with wrong password', async () => {
  //   const api = new ODOO({ baseURL })
  //   const payload = { db, login, password: 'wrong_password' }
  //   const to_login = async () => {
  //     try {
  //       const result = await api.login(payload)
  //       return { result }
  //     } catch (e) {
  //       return { result: false, error: e }
  //     }
  //   }
  //   const res = await to_login()
  //   expect(res.result).to.equal(false)
  //   expect(res.error.data.exception_type).to.equal('access_denied')
  // })
})

describe('Test Login, get Session', async () => {
  it('login', async () => {
    const api = new ODOO({ baseURL })
    const payload = { db, login, password }
    await api.login(payload)

    const comp_ids = api.session.allowed_company_ids

    expect(comp_ids).to.be.instanceOf(Array)
    expect(comp_ids).to.include(1)
  })
})
