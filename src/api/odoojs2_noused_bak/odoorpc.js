import odooRequest from './odoo-request'
import odoomodel_creater from './odoomodel'

import odooConfig from '@/../odoo.config'

const request = config => {
  return odooRequest(config)
}

// 登录时 需要 数据库名称
const OdooDatabase = odooConfig.OdooDatabase

// debug
const debug = odooConfig.debug

// 登录成功后, 本地存储 user info
const UserInfoKey = 'UserInfo'

const my_return = res => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 100, res)
  })
}

async function login(params) {
  console.log('odoorpc.user.login:', params)

  const { username, password } = params
  const userinfo = await request({
    // url: '/api/login',
    url: `/api2/user/login`,

    method: 'post',
    data: { login: username, password, db: OdooDatabase }
  })
  // console.log('odoorpc.user.login:', params, userinfo)
  localStorage.setItem(UserInfoKey, JSON.stringify(userinfo))

  // const user_model = env('res.users')
  // const user = await user_model.browse_one(userinfo.uid, {
  //   fields: {}
  // })

  const res = {
    code: 20000,
    data: { token: userinfo.session_id }
  }

  return my_return(res)
}

function getInfo(token) {
  // console.log('odoorpc.user.getInfo:', token)
  // return request({ url: '/user/info', method: 'get', params: { token }})

  const userinfo = JSON.parse(localStorage.getItem(UserInfoKey))
  const res = {
    code: 20000,
    data: {
      // roles: [userinfo.xxxxxx],
      roles: [userinfo.is_admin ? 'admin' : 'user'],
      introduction: 'I am a super administrator',
      avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: userinfo.name
    }
  }

  return my_return(res)
}

async function logout() {
  console.log('odoorpc.user.logout:')
  const odoores = JSON.parse(localStorage.getItem(UserInfoKey))
  const { session_id } = odoores || {}

  // const res = { code: 20000, data: 'success' }
  localStorage.clear(UserInfoKey)

  request({
    //    url: `/api/logout?session_id=${session_id}`,
    url: `/api2/user/logout?session_id=${session_id}`,
    method: 'post'
  })

  return my_return(true)
}

function get_userinfo() {
  const userstr = localStorage.getItem(UserInfoKey)
  if (userstr) {
    const userinfo = JSON.parse(localStorage.getItem(UserInfoKey))
    return userinfo
  } else {
    return {}
  }
}

async function call(model, method, args = [], kwargs = {}) {
  // console.log('odoorpc.call:', model, method, args, kwargs)
  const odoores = JSON.parse(localStorage.getItem(UserInfoKey))
  const { session_id } = odoores || {}

  // console.log('odoorpc.call, odoores', odoores)

  const res = await request({
    // url: `/api/call?session_id=${session_id}`,
    url: `/api2/api?session_id=${session_id}`,
    method: 'post',
    data: { model, method, args, kwargs }
  })
  // console.log('odoorpc.call:', model, method, args, kwargs, res)

  return res
}

const odoorpc = { debug, call, login, getInfo, logout, get_userinfo }

// 这里的 login / logout / getInfo 函数, 可能需要额外的网络请求. 因此这里构造一个 env 函数
// eslint-disable-next-line no-unused-vars
const env = model => {
  return odoomodel_creater({
    model,
    env,
    rpc: odoorpc
  })
}

export default odoorpc
