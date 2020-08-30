import axios from 'axios'

const _getService = (timeout, errorCallback) => {
  const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: timeout || 50000
  })

  service.interceptors.request.use(
    config => {
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
      console.log('request error') // for debug
      errorCallback(error)
      return Promise.reject(error)
    }
  )

  service.interceptors.response.use(
    //
    response => {
      const res = response.data
      const data2 = JSON.parse(response.config.data)

      if (res.jsonrpc !== '2.0' || res.id !== data2.id) {
        const newError = new Error('Error JSONRPC')
        newError.data = {}
        newError.message = 'Error JSONRPC'
        console.log('response jsonrpc error') // for debug
        errorCallback(newError)
        return Promise.reject(newError)
      } else if (res.error) {
        console.log('response, config', response.config.url)
        console.log('response, config', data2.id)
        console.log('response, config', data2.params)
        console.log('response, data', response.data)
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
        console.log('response, Odoo Server Error', res.error) // for debug

        const newError = new Error(res.error.data.message)
        newError.name = res.error.data.name
        newError.data = res.error.data
        // throw newError
        errorCallback(newError)

        return Promise.reject(newError)
      } else {
        // console.log('utils.resquest.response.result:', res.result)
        return res.result
      }
    },
    error => {
      console.log('respond error') // for debug
      errorCallback(error)
      return Promise.reject(error)
    }
  )

  return service
}

const default_error_callback = error => {
  console.log('xxx,axios, error', error)
}

const requestCreator = params => {
  const { error = default_error_callback, timeout = 50000 } = params || {}
  const service = _getService(timeout, error)
  return service
}

export default requestCreator
