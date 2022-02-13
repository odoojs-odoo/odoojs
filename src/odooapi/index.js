import rpc from '@/odoorpc'
import controller from './controllers'

import { Action } from './action'
import { Views } from './views'
import { Node } from './view/node'

Object.keys(controller).forEach(item => {
  rpc[item] = controller[item]
})

rpc.Action = Action
rpc.Views = Views
rpc.Node = Node

const api = rpc

console.log([api])
/*
  init,
  web,
  rerport,
  web_editor,
  Action, Views, Node,
*/

export default api

// const new_list = len => {
//   return Array.from(new Array(len).keys())
// }

// const is_virtual_id = id_ =>
//   typeof id_ === 'string' && id_.slice(0, 8) === 'virtual_'

// function sleep(millisecond) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve()
//     }, millisecond)
//   })
// }

// export const model_odoo2vuex = name =>
//   name
//     .replace(/(\.|^)[a-z]/g, L => L.toUpperCase())
//     .replace(/\./g, '')
//     .replace(/( |^)[A-Z]/g, L => L.toLowerCase())

// export const model_vuex2odoo = name =>
//   name.replace(/[A-Z]/g, L => `.${L.toLowerCase()}`)
