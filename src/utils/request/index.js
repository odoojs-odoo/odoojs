// 2020-8-30 这个代码在这里保留学习用, 实际上不会调用这里的代码

import axios from 'axios'
import crypt from './crypt'

// import { MessageBox, Message } from 'element-ui'
// import store from '@/store'

// import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url

  baseURL: 'ForTest',

  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  async (config) => {
    // do something before request is sent

    // old script from vue-element-admin
    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['X-Token'] = getToken()
    // }

    // new script
    // get session_id from local storage
    const session_id = '123345666'

    const session_params = session_id ? { session_id } : null
    const new_params = config.params
      ? { params: await crypt(config.params) }
      : null

    // 若有 session_id 则 补上 session_id
    // 加密后的参数 在 params 中, 服务端 需要解密
    if (session_params || new_params) {
      config.params = {
        ...(session_params || {}),
        ...(new_params || {})
      }
    }

    // 加密后的数据 在 data 中, 服务端 需要解密
    if (config.data) {
      config.data = { data: await crypt(config.data) }
    }

    // console.log('xxxxx, request, ', config)

    return config
  },
  (error) => {
    // do something with request error
    console.log(
      'request err, should be to open a Message Box to show error ',
      error.message || 'Error'
    )
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
  (response) => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000) {
      console.log(
        'response err, should be to open a Message Box to show error ',
        res.message || 'Error'
      )

      // Message({
      //   message: res.message || 'Error',
      //   type: 'error',
      //   duration: 5 * 1000
      // })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        console.log('response err, should be to re-login ')
        // MessageBox.confirm(
        //   'You have been logged out, you can cancel to stay on this page, or log in again',
        //   'Confirm logout',
        //   {
        //     confirmButtonText: 'Re-Login',
        //     cancelButtonText: 'Cancel',
        //     type: 'warning'
        //   }
        // ).then(() => {
        //   store.dispatch('user/resetToken').then(() => {
        //     location.reload()
        //   })
        // })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  (error) => {
    console.log(
      'response err, should be to open a Message Box to show error ',
      error.message || 'Error'
    )

    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service

// other  script

// import axios from 'axios'
// import { Message } from 'view-design'
// import store from '@/store'

// axios.defaults.timeout = 15000
// axios.defaults.headers = { 'Content-Type': 'application/json;charset=urf-8' }

// axios.interceptors.request.use(function(config) {
//   if (config.headers) {
//     config.headers['authorization'] = store.getters.token
//   }
//   return config
// })

// axios.interceptors.response.use(
//   function(response) {
//     if (response.status === 200) {
//       if (response.data.code === 0) {
//         return response
//       } else {
//         return Promise.reject(`service response: ${response.data.message}`)
//       }
//     } else {
//       return Promise.reject(`(${response.status})${response.statusText}`)
//     }
//   },
//   function(error) {
//     if (!error.response) {
//       //   Message.error('服务器繁忙，请稍后再试!')
//     } else if (error.response.status >= 500) {
//       //   Message.error('服务器繁忙，请稍后再试！')
//     } else if (error.response.status === 404) {
//       //   Message.error('请求地址不存在！')
//     } else if (error.response.status === 400) {
//       //   Message.error('请求错误，请检查参数或请求头')
//     }
//     return Promise.reject(error)
//   }
// )

// function foxPost(url, data, headers) {
//   return axios({
//     method: 'POST',
//     url: url,
//     baseURL: process.env.VUE_APP_BASE_API,
//     headers: headers
//       ? { ...axios.defaults.headers, ...headers }
//       : axios.defaults.headers,
//     data: data
//   })
// }

// function setToken(token) {
//   axios.defaults.headers['authorization'] = token
// }

// function clearToken() {
//   delete axios.defaults.headers['authorization']
// }

// export default {
//   foxPost,
//   setToken
// }
