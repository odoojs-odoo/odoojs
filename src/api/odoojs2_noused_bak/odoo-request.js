import axios from 'axios'
import {
  // MessageBox,
  Message
} from 'element-ui'

// import store from '@/store'

// import { getToken } from '@/utils/auth'

// 2019-11-17 By Master Zhang
// components/ImageCropper  上传图片, 使用了 request
// 因此需要 保留原版的 request

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   // config.headers['X-Token'] = getToken()
    //   // config.headers['X-Openerp-Session-Id'] = getToken()
    //   // const session_id = getToken()
    //   // if (session_id) {
    //   //   config.url = `${config.url}?session_id=${session_id}`
    //   // }
    // }

    const request_id = Math.floor(Math.random() * 1000000000 + 1)

    config.data = {
      jsonrpc: '2.0',
      method: 'call',
      id: request_id,
      params: config.data || {}
    }

    return config
  },
  error => {
    // do something with request error
    console.log('xxx,axios, error', error)
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    const data2 = JSON.parse(response.config.data)
    // console.log('utils.resquest.response:', data2)

    if (res.jsonrpc !== '2.0' || res.id !== data2.id) {
      Message({
        message: 'Error JSONRPC',
        type: 'error',
        duration: 5 * 1000
      })
      const newError = new Error('Error JSONRPC')
      newError.data = {}
      newError.message = 'Error JSONRPC'
      return Promise.reject(newError)
    } else if (res.error) {
      /*
      const error2 = {
        code: 200,
        message: 'Odoo Server Error',
        data: {
          name: 'odoo.exceptions.AccessDenied',
          debug:
            'Traceback (most recent call last):\n  File "/opt/odoo/server/odoo/http.py", line 619, in _handle_exception\n    return super(JsonRequest, self)._handle_exception(exception)\n  File "/opt/odoo/server/odoo/http.py", line 309, in _handle_exception\n    raise pycompat.reraise(type(exception), exception, sys.exc_info()[2])\n  File "/opt/odoo/server/odoo/tools/pycompat.py", line 14, in reraise\n    raise value\n  File "/opt/odoo/server/odoo/http.py", line 664, in dispatch\n    result = self._call_function(**self.params)\n  File "/opt/odoo/server/odoo/http.py", line 345, in _call_function\n    return checked_call(self.db, *args, **kwargs)\n  File "/opt/odoo/server/odoo/service/model.py", line 93, in wrapper\n    return f(dbname, *args, **kwargs)\n  File "/opt/odoo/server/odoo/http.py", line 338, in checked_call\n    result = self.endpoint(*a, **kw)\n  File "/opt/odoo/server/odoo/http.py", line 909, in __call__\n    return self.method(*args, **kw)\n  File "/opt/odoo/server/odoo/http.py", line 510, in response_wrap\n    response = f(*args, **kw)\n  File "/opt/odoo/third/addons/ow_json/controllers/controllers.py", line 273, in login\n    request.session.authenticate(db, login, password)\n  File "/opt/odoo/server/odoo/http.py", line 1000, in authenticate\n    uid = odoo.registry(db)[\'res.users\'].authenticate(db, login, password, env)\n  File "/opt/odoo/server/odoo/addons/base/models/res_users.py", line 635, in authenticate\n    uid = cls._login(db, login, password)\n  File "/opt/odoo/server/odoo/addons/base/models/res_users.py", line 614, in _login\n    user._check_credentials(password)\n  File "/opt/odoo/server/odoo/addons/base/models/res_users.py", line 324, in _check_credentials\n    raise AccessDenied()\nodoo.exceptions.AccessDenied: Access denied\n',
          message: 'Access denied',
          arguments: ['Access denied'],
          exception_type: 'access_denied'
        }
      }
      */
      console.log('xxxxxx,utils.resquest.response, error,:', res)

      if (res.error.data.message === 'Access denied') {
        Message({
          message: '用户名密码错误',
          data: res.error.data,
          type: 'error',
          duration: 2 * 1000
        })
      } else if (res.error.data.message === 'Session expired') {
        Message({
          message: '请重新登录',
          data: res.error.data,
          type: 'error',
          duration: 2 * 1000
        })
      } else {
        Message({
          message: '服务器错误',
          data: res.error.data,
          type: 'error',
          duration: 2 * 1000
        })
      }

      // console.log('xxxxxx, utils.resquest.response.error:', res.error)

      const newError = new Error(res.error.message)
      newError.data = res.error.data
      newError.message = res.error.message
      // throw newError

      return Promise.reject(newError)
    } else {
      // console.log('utils.resquest.response.result:', res.result)
      return res.result
    }
  },
  error => {
    console.log('err..123123.' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
