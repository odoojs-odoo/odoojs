/* 

2022-10-17

外部请求入口
考虑到 web 浏览器 不同页面都访问的是同一个接口
这里使用了 静态方法
是否需要优化, todo

rpc.init 方法. 仅需调用一次
rpc.env env入口

*/

import { Environment } from './env'
import ui from './ui'

// import tools from './tools'

import { JsonRequest } from './request'
import controller from './controllers'
// const { web, rerport, web_editor } = controller

export class RPC {
  constructor() {}

  static init({ baseURL, timeout, messageError, ...payload }) {
    const { addons_dict, modules_installed } = payload

    JsonRequest.baseURL = baseURL
    JsonRequest.timeout = timeout
    JsonRequest.messageError = messageError

    this.baseURL = baseURL
    this.addons_dict = addons_dict
    this.modules_installed = modules_installed

    ui.Addons.load_addons(addons_dict, modules_installed)
    // ui.Addons.load_addons(addons_dict, ['base'])
  }

  static after_session() {
    const modules_odoo = this.web.modules.map(item => item.name)
    const modules = this.modules_installed.filter(item => {
      return modules_odoo.includes(
        item[0] == '_' ? item.slice(1, item.length) : item
      )
    })
    // console.log(modules, this.modules_installed)

    ui.Addons.load_addons(this.addons_dict, modules)
    const lang = this.web.session.context.lang
    ui.Addons.set_lang(lang, true)
  }

  static async session_check(sso_cas) {
    if (sso_cas) {
      return this.cas_session_check()
    }
    const info = await this.web.session_check()
    if (info) {
      this.after_session()
    }
    return info
  }

  static async login(...args) {
    const info = await this.web.login(...args)
    this.after_session()

    return info
  }

  static async cas_redirect(...args) {
    const url = this.web.cas_redirect(...args)
    return url
  }

  static async cas_login(...args) {
    const info = await this.web.cas_login(...args)
    this.after_session()

    return info
  }

  static async cas_session_check() {
    const info = await this.web.cas_session_check()
    if (info) {
      this.after_session()
    }
    return info
  }

  static get addons_data() {
    return ui.Addons.addons_register
  }

  static get global_config() {
    const app = ui.Addons.addons_register.app || {}
    return app
  }

  static get env() {
    return new Environment()
  }

  // static get tools() {
  //   return tools
  // }
}

Object.keys(controller).forEach(item => {
  RPC[item] = controller[item]
})

const rpc = RPC

export default rpc
