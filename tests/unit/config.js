// 补充上这三句话, respond header 里携带 cookie
import axios from 'axios'
import adapter from 'axios/lib/adapters/http'
axios.defaults.adapter = adapter
// 否则, respond header 里无 cookie

// const baseURL = 'http://192.168.56.103/odoo'
const baseURL = 'http://192.168.56.108:8069'

const master_pwd = 'admin'
const login_info = { db: 't1', login: 'admin', password: '123456' }

// 运行测试脚本. 需要确保只能 登录一次
// 因此, 这里做两个登录函数. 在测试脚本中 调用这两个函数登录
// 测试 session 有关登录 / 注销 等功能. 需要单独运行测试用例

import api from '@/odooapi'

api.init({ baseURL })

const authenticate = async login_info => {
  const session_info = api.web.session.session_info
  if (session_info) {
    return session_info
  }
  return api.web.session.authenticate(login_info)
}

export default {
  baseURL,
  master_pwd,
  login_info,
  authenticate
}
