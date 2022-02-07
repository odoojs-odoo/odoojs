import py_utils from './py_utils'
// action 的  domain 和 context . 需要的 globals_dict 应该都是来自 session.context

import rpc from '@/odoorpc'

import axios from 'axios'

import xml2json from './xml2json'

// eslint-disable-next-line no-unused-vars
const cp = val => JSON.parse(JSON.stringify(val))

export class XML {
  static _full_ref_id(mod, ref) {
    return ref.split('.').length > 1 ? ref : `_${mod}.${ref}`
  }

  static _record_get(mod, node) {
    const { id: ref, model } = node.attrs
    const refid = this._full_ref_id(mod, ref)

    const record_get = () => {
      const record = (node.children || []).reduce((acc, fld) => {
        const { name, type, ref } = fld.attrs
        if (ref) acc[name] = this._full_ref_id(mod, ref)
        else if (type && type === 'xml') acc[name] = fld.children[0]
        else if (fld.content) acc[name] = fld.content
        return acc
      }, {})

      record.$model = model
      record.$xml_id = refid

      const action_types = ['ir.actions.client2']
      if (action_types.includes(model)) record.type = model

      // console.log(record)

      return record
    }

    const record = record_get()

    return { [refid]: record }
  }

  static async _records_get() {
    console.log('_records_get 1')
    const addons_sync = this._addons_sync
    if (addons_sync) {
      return addons_sync
    }

    const addons = this._addons

    let records = {}
    for (const mod in addons) {
      // console.log('_records_get 2', mod)
      for (const file of addons[mod]) {
        const fileName = `./static/xml/${mod}/${file}.xml`

        // console.log('_records_get 3', fileName)

        const res = await axios({ method: 'get', url: fileName })

        // console.log('_records_get 31', res)

        const xml = xml2json.toJSON(res.data)

        const records_me = xml.children[0].children.reduce((acc, cur) => {
          return { ...acc, ...this._record_get(mod, cur) }
        }, {})

        // console.log('_records_get 4', records_me)
        records = { ...records, ...records_me }
      }
    }

    this._addons_sync = records

    // console.log('_records_get 99')

    return records
  }

  static async _record_get_async(action_xml_id) {
    const records = await this._records_get()
    const record = records[action_xml_id]
    // console.log(record)

    return record
  }

  static record_get(action_xml_id) {
    // console.log('record_get 1')
    const addons_sync = this._addons_sync
    if (addons_sync) {
      return addons_sync[action_xml_id]
    } else {
      return this._record_get_async(action_xml_id)
    }
  }

  static search_view({ act_window_id, type }) {
    // console.log('record_get 1')
    const addons1 = this._addons_sync || {}

    const view = Object.values(addons1).find(
      item => item.act_window_id === act_window_id && item.view_mode === type
    )

    if (!view) {
      return view
    }

    return addons1[view.view_id]

    // .map(item => {
    //   return { ...addons1[item.view_id], type: item.view_mode }
    // })

    // return addons
  }
}

XML._addons_sync = undefined

XML._addons = {}

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

  const context = py_utils.eval(todo_str, globals_dict)

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
  static async run({ action }, kwargs = {}) {
    // console.log('action run', )
    const { additional_context } = kwargs
    const context2 = additional_context || rpc.web.session.context
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

  static init_xml(addons) {
    const old = XML._addons
    const mods = Object.keys({ ...old, ...addons })
    XML._addons = mods.reduce((acc, mod) => {
      const old1 = old[mod] || []
      const new1 = addons[mod] || []
      acc[mod] = [...old1, ...new1]

      return acc
    }, {})
  }

  static _context({ context = {}, action }) {
    // console.log(action, context)
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

  static async _load_local(action_xml_id) {
    const action1 = await XML.record_get(action_xml_id)
    const xml_id = action1.inherit_id
    console.log('load_local', action_xml_id, action1)
    if (xml_id) {
      const action = await this._load_from_odoo(xml_id)
      return { ...action, $xml_id: action1.$xml_id }
    } else {
      return { ...action1, id: action1.$xml_id }
    }
  }

  static async load(action_xml_id, kwargs) {
    if (typeof action_xml_id === 'string' && action_xml_id[0] === '_') {
      return this._load_local(action_xml_id)
    } else {
      return this._load_from_odoo(action_xml_id, kwargs)
    }
  }

  static async _load_from_odoo(action_xml_id, kwargs) {
    const get_action_id = async xml_id => {
      if (typeof xml_id === 'string' && xml_id.split('.').length === 2) {
        const action_one = await rpc.env.ref(xml_id)
        const action_id = action_one.id
        return action_id
      } else {
        return xml_id
      }
    }

    const action_id = await get_action_id(action_xml_id)

    const action = await rpc.web.action.load({ action_id, ...kwargs })
    const res = await this._load_after({ action }, kwargs)

    return res
  }

  static async _load_after({ action }, kwargs) {
    // console.log('action load,', cp(action))

    if (action.type === 'ir.actions.server') {
      const res = await IrActionsServer.run({ action }, kwargs)
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

  static Model({ context, action }) {
    const { res_model } = action
    const context2 = context || rpc.web.session.context
    const ctx = this._context({ context: context2, action })
    const env = rpc.env.with_context(ctx)
    return env.model(res_model)
  }

  static async load_views({ context, action }) {
    if (action.$xml_id) {
      // console.log('load_views local 1', action.$xml_id)
      // const action1 =
      await XML.record_get(action.$xml_id)
      // console.log('load_views local 99', action.$xml_id, action1)
    }

    if (action.type !== 'ir.actions.act_window') {
      // type: "ir.actions.client"
      return {}
    }

    const Obj = this.Model({ context, action })

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

    // console.log('load_views, action. .', cp(action), cp(res))

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

    if (type === 'ir.actions.report') {
      const kw = { report_name, active_ids, report_type, context }
      const res = await rpc.report.print(kw)
      console.log('print', res)
      return this.download(res)
    } else {
      throw 'not ir.actions.report'
    }
  }
}

Action._XML = XML

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
