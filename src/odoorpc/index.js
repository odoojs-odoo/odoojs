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

import tools from './tools'

import { JsonRequest } from './request'
import controller from './controllers'
// const { web, rerport, web_editor } = controller

export class RPC {
  constructor() {}

  static init({ baseURL, timeout, addons_list }) {
    JsonRequest.baseURL = baseURL
    JsonRequest.timeout = timeout

    this.baseURL = baseURL

    if (addons_list) {
      ui.Addons.addons_list = [...ui.Addons.addons_list, ...addons_list]
    }
  }

  static get env() {
    return new Environment()
  }

  static get tools() {
    return tools
  }
}

Object.keys(controller).forEach(item => {
  RPC[item] = controller[item]
})

const rpc = RPC

export default rpc
