import py_utils from './py_utils'
// action 的  domain 和 context . 需要的 globals_dict 应该都是来自 session.context

import rpc from '@/odoorpc'

// eslint-disable-next-line no-unused-vars
const cp = val => JSON.parse(JSON.stringify(val))

const get_context = (todo_str, globals_dict = {}) => {
  // action
  // 1: from menu, action.context is str
  // 2: from relation, action.context is arr
  // 3: from ...
  if (!todo_str) return {}

  // act_sever run 之后 返回的东西,  context 不是字符串, 无需转换
  if (typeof todo_str !== 'string') return todo_str

  // TBD 不同的action, 其 context 内容 eval 时, 需要参数,
  // 如果 eval 时报错, 那么查找下, 缺少哪个参数, 在这里补充
  // 目前看有 active_id 和 allowed_company_ids 都是 centext 里的 内容,
  // 而 centext 来自于 页面点击按钮跳转时, 那个按钮应该携带的
  // 如果是从 菜单 点击跳转的 action，应该 没有 context , active_id

  //
  // odoo 中搜索 <field name="context">
  // 有 active_id, allowed_company_ids[0], uid
  //

  // env.context 是 调用 该 action 的 上下文, 里面应该有这些东西

  const context = py_utils.eval(todo_str, globals_dict)
  // console.log(action_info.context, env.context, context)
  return context
}

class IrActions {
  constructor() {}
}

class IrActionsServer extends IrActions {
  // action_type = ir.actions.server
  // act server 是代码. 直接 run, 之后再返回的是  null 或 其他 action
  constructor() {
    super()
  }

  // eslint-disable-next-line no-unused-vars
  static async run({ session, context, action }, kwargs = {}) {
    // console.log('action run', )
    const { additional_context } = kwargs
    const context2 = additional_context || context
    return this._run_recursion(action.id, context2)
  }

  static async _run_recursion(action_id, context) {
    const action = await rpc.web.action.run({ action_id, context })
    // console.log('action server1:', action)
    if (!action) return
    if (action.type === ' ir.actions.server')
      return this._run_recursion(action.id, context)
    // // 返回 action, 前端自行处理
    else return action
  }
}

export class Action {
  constructor() {}
  static _context({ context = {}, action }) {
    const ctx = get_context(action.context, { ...context })
    return context ? { ...context, ...ctx } : { ...ctx }
  }

  static _default_domain({ context, action }) {
    const { domain: domain_str } = action
    if (!domain_str) return []
    else if (Array.isArray(domain_str)) return domain_str
    else if (typeof domain_str === 'string') {
      // console.log(action, context2)
      const context2 = this._context({ context, action })
      return py_utils.eval(domain_str, context2)
    } else return []

    // return domain_str ? py_utils.eval(domain_str, context2) : []
  }

  static view_mode({ action, views }) {
    const ALL_MODES = [
      'tree',
      'list',
      'kanban',
      'calendar',
      'pivot',
      'graph',
      'form',
      'search'
    ]
    const types = action.view_mode.split(',')
    const mode = types.filter(item => ALL_MODES.includes(item))

    // action = stock.action_view_quants 的 type 是 server
    // run 之后 返回 的 view_mode: "tree,form,pivot,graph" 里面 缺失  list

    const { fields_views } = views

    const mode2 = mode.map(item => {
      if (item === 'tree') {
        if (fields_views.tree) return item
        else if (fields_views.list) return 'list'
        else return item
      } else {
        return item
      }
    })

    // console.log(mode2)
    return mode2
  }

  static env({ session, context }) {
    return new rpc.Environment({ session, context })
  }

  static async load({ session, context }, action_xml_id, kwargs) {
    const get_action_id = async xml_id => {
      if (typeof xml_id === 'string' && xml_id.split('.').length === 2) {
        const env = this.env({ session, context })

        const action_one = await env.ref(xml_id)
        const action_id = action_one.id
        return action_id
      } else {
        return xml_id
      }
    }

    const action_id = await get_action_id(action_xml_id)
    const action = await rpc.web.action.load({ action_id, ...kwargs })
    const res = await this._load_after({ session, context, action }, kwargs)

    return res
  }

  static async _load_after({ session, context, action }, kwargs) {
    // console.log('action load,', cp(action))

    if (action.type === 'ir.actions.server') {
      const res = await IrActionsServer.run(
        { session, context, action },
        kwargs
      )
      // console.log('action server run ok:', res)
      return res
    } else if (action.type === 'ir.actions.act_window') {
      // action.target
      // ('current', 'Current Window'),
      // ('new', 'New Window'),
      // ('inline', 'Inline Edit'),
      // ('fullscreen', 'Full Screen'),
      // ('main', 'Main action of Current Window')

      return { ...action }
    } else if (action.type === 'ir.actions.act_window_close') {
      return { ...action }
    } else if (action.type === 'ir.actions.report') {
      // action 数据
      //   data: {product_id: 2, warehouse_ids: [1]}
      // name: "产品路线报告"
      // report_name: "stock.report_stock_rule"
      // report_type: "qweb-html"
      // type: "ir.actions.report"
      return { ...action }
    } else if (action.type === 'ir.actions.act_url') {
      // 结算单 预览
      // url: '/my/invoices/6?access_token=850582b0-1ba3-4805-b9f7-71cad1f27a28'
      // action.url
      // action.target
      // ('new', 'New Window'),
      // ('self', 'This Window')
      return { ...action }
    } else if (action.type === 'ir.actions.client') {
      // 菜单  讨论 是 client
      // action.tag

      // action.target
      // ('current', 'Current Window'),
      // ('new', 'New Window'),
      // ('fullscreen', 'Full Screen'),
      // ('main', 'Main action of Current Window')],
      return { ...action }
    } else {
      console.log('TBD, actionType ', action.type)

      throw `TBD action.type:, ${action.type}`
    }
  }

  static Model({ session, context, action }) {
    const { res_model } = action
    const ctx = this._context({ context, action })
    const env = this.env({ session, context: ctx })
    return env.model(res_model)
  }

  static async load_views({ session, context, action }) {
    if (action.type !== 'ir.actions.act_window') {
      // type: "ir.actions.client"
      return {}
    }

    const Obj = this.Model({ session, context, action })

    const method = 'load_views'
    const search_view_id = action.search_view_id
    const views = [...action.views, [(search_view_id || [false])[0], 'search']]

    const options_get = () => {
      const action_id = action.id
      if (!action.target || ['current', 'main'].includes(action.target)) {
        return { action_id, toolbar: true, load_filters: true }
      } else if (['new', 'inline'].includes(action.target)) {
        return { action_id, toolbar: false, load_filters: false }
      } else {
        console.log('load_views, action.target TODO.', action.target)
        throw `TODO: load_views, action.target is not in [current, new]. ${action.target}`
      }
    }

    const options = options_get()

    const res = await Obj.execute_kw(method, [], { views, options })
    return res
  }

  static download({ filename, filetype, data }) {
    // //ArrayBuffer 转为 Blob
    const blob = new Blob([data], { type: filetype })
    const objectUrl = URL.createObjectURL(blob)
    const filename2 = decodeURIComponent(filename)
    const a = document.createElement('a')
    a.setAttribute('href', objectUrl)
    a.setAttribute('download', filename2)
    a.click()
    return true
  }

  // upload(callback) {
  //   const input = document.createElement('input')
  //   input.type = 'file'
  //   input.click()
  //   input.onchange = () => {
  //     const file = input.files[0]
  //     callback(file)
  //   }
  // }

  static async print({ context, action }, ids) {
    const active_ids = ids

    const { report_name, report_type, type } = action
    // console.log(this.env)
    if (type === 'ir.actions.report') {
      const kw = { report_name, active_ids, report_type, context }
      const res = await rpc.report.print(kw)
      return this.download(res)
    } else {
      throw 'not ir.actions.report'
    }
  }
}

// async _load_model_ids(env, model, views) {
//   // 读取 action 的所有 子model 的 model_id , 并 set env
//   // 目的是 设置 model_id 为 pyeval 服务
//   //
//   // TBD 只对 act_window 有用? 其他 类型是什么情况?

//   const get_all_models = views => {
//     return Object.keys(views).reduce((acc, view_type) => {
//       const fields = views[view_type].fields
//       const models = Object.keys(fields).reduce((acc_field, fld) => {
//         const relation = fields[fld].relation
//         if (relation) {
//           acc_field[relation] = 1
//           const child_models = get_all_models(fields[fld].views)
//           acc_field = { ...acc_field, ...child_models }
//         }

//         return acc_field
//       }, {})
//       acc = { ...acc, ...models }
//       return acc
//     }, {})
//   }

//   const all_models2 = get_all_models(views)
//   const all_models = { [model]: 12, ...all_models2 }
//   await env._set_model_registry(Object.keys(all_models))
// }
