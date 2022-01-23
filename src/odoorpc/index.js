import { Environment } from './env'

import { JsonRequest } from './request'
import controller from './controllers'
// const { web, rerport, web_editor } = controller

export class RPC {
  constructor() {}

  static init({ baseURL, timeout }) {
    JsonRequest.baseURL = baseURL
    JsonRequest.timeout = timeout
  }

  static get env() {
    return new Environment()
  }
}

Object.keys(controller).forEach(item => {
  RPC[item] = controller[item]
})

const rpc = RPC

export default rpc
