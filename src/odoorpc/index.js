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
