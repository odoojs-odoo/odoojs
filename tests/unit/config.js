// 补充上这三句话, respond header 里携带 cookie
import axios from 'axios'
import adapter from 'axios/lib/adapters/http'
axios.defaults.adapter = adapter
// 否则, respond header 里无 cookie

import { ODOO } from '@/odoorpc'

// const baseURL = 'http://192.168.56.103/odoo'
const baseURL = 'http://192.168.56.103:8069'

const master_pwd = 'admin'
const login_info = { db: 'test_db', login: 'admin', password: '123456' }

let odoo_api = undefined

export const get_odoo_without_login = async () => {
  if (!odoo_api) {
    const api = new ODOO({ baseURL })
    odoo_api = api
  }
  return odoo_api
}

export const get_odoo = async () => {
  if (!odoo_api) {
    const api = new ODOO({ baseURL })
    await api.web.session.authenticate(login_info)
    odoo_api = api
  }
  return odoo_api
}

export default { ODOO, baseURL, master_pwd, login_info }
