import py_utils from '../py_utils'
// 1. image_url 节点 的 options 中 取 替代字段的名字. 不需要 globals_dict
// 2. 节点 的 invisible , 需要 context

import { Kanban_Image } from './tools'
import { Eval_Context } from './tools'
// 1. load_relation_data,  x2m node 的 context
// 2. m2o 字段 下拉框 name_search 时
// 3. buttonclick 时 button node.type = object的 context
// 4. buttonclick 时 button node,type = action 的 context
// 5. buttonclick node.type = object 返回 action 后,  button node, 的 context

import { Form } from './form_view'

// eslint-disable-next-line no-unused-vars
const cp = val => JSON.parse(JSON.stringify(val))

const is_node = node => {
  if (typeof node !== 'object') return false
  if (Array.isArray(node)) return false
  if (typeof node === 'boolean') return false
  return true
}

const Eval_Safe = Eval_Context

const tuples_helper = {
  _virtual_id: 1,

  virtual_id() {
    this._virtual_id = this._virtual_id + 1
    const vid = this._virtual_id
    return `virtual_${vid}`
  },

  vals_remove_parent(vals, relation_field) {
    return Object.keys(vals).reduce((acc, fld) => {
      if (fld !== relation_field) {
        acc[fld] = vals[fld]
      }
      return acc
    }, {})
  },

  _to_append(valuesList, tup, relation_field) {
    const op = tup[0]
    if (op === 0) {
      const vid = this.virtual_id()
      return [
        ...valuesList,
        [0, vid, this.vals_remove_parent(tup[2], relation_field)]
      ]
    } else if (op === 1) {
      const vid = tup[1]
      const nop = typeof vid === 'string' ? 0 : 1
      return [...valuesList, [nop, vid, tup[2]]]
    } else if ([2, 3, 4, 5, 6].includes(op)) {
      return [...valuesList, tup]
    } else {
      return [...valuesList]
    }
  },

  _to_merge(valuesList) {
    const _do_loop = (list, todo) => {
      const [op2, rid, vals] = todo

      let done = false

      const res = list.reduce((acc, tup) => {
        const op = tup[0]
        if (op === 6) acc.push(tup)
        else if (op === 5) acc = []
        else if ([4, 3, 2, 1, 0].includes(op)) {
          if (tup[1] !== rid) {
            acc.push(tup)
          } else {
            done = true
            if ([3, 2].includes(op)) {
              // 目标已经删除
              acc.push(tup)
            } else {
              if ([2, 3].includes(op2)) {
                // 源是删除
                if (op !== 0) {
                  acc.push(todo)
                }
              } else if ([4].includes(op2)) {
                // 源是添加. 目标已存在
                acc.push(tup)
              } else {
                // 源是编辑
                const target = op !== 4 ? tup[2] : {}
                acc.push([op2, rid, { ...target, ...vals }])
              }
            }
          }
        }

        return acc
      }, [])

      if (done) return res
      else return [...res, todo]
    }

    return valuesList.reduce((acc, tup) => {
      const op = tup[0]
      if (op === 6) acc = [tup]
      else if (op === 5) acc = []
      else if ([4, 3, 2, 1, 0].includes(op)) {
        acc = _do_loop(acc, tup)
      }

      return acc
    }, [])
  },

  to_return(valuesList, tup, relation_field) {
    const list1 = this._to_append(valuesList, tup, relation_field)
    return this._to_merge(list1)
  },

  to_onchange(valuesList) {
    return valuesList.map(item => {
      if ([6, 5].includes(item[0])) return item
      else {
        const [op, rid, vals] = item
        if ([2, 3, 4].includes(op)) {
          return [op, rid, false]
        } else if ([1, 0].includes(op)) {
          return [op, rid, vals]
        } else {
          // never here
          return item
        }
      }
    })
  }
}

class NodeRead extends Form {
  constructor() {
    super()
  }

  static _active_context(info, { record }) {
    const { action } = info
    return {
      active_id: record.id,
      active_ids: [record.id],
      active_model: action.res_model
    }
  }

  static _node_context(info, { node, record }) {
    const { context: ctx_session } = info
    const { context: ctx_str } = node.attrs

    const ctx_action = this._context(info)
    const ctx_active = this._active_context(info, { record })
    const ctx_for_global = { ...ctx_session, ...ctx_action, ...ctx_active }

    const ctx = ctx_str
      ? Eval_Safe({ context: ctx_for_global }, { str: ctx_str, record })
      : {}
    return ctx
  }

  static async _button_clicked_action(info, { node, record }) {
    const { name } = node.attrs
    const ctx_action = this._context(info)
    const ctx_node = this._node_context(info, { node, record })
    const ctx_active = this._active_context(info, { record })

    const additional_context = { ...ctx_action, ...ctx_node, ...ctx_active }

    return this.load_action(name, { additional_context })
  }

  static async _button_clicked_object(info, { node, record }) {
    const { name } = node.attrs
    // console.log('button_clicked call object', name)
    const Model = this.Model(info)
    const ctx_action = this._context(info)
    const ctx_node = this._node_context(info, { node, record })
    const context = { ...ctx_action, ...ctx_node }
    // console.log(' clicked, object:', name, ctx_action, ctx_node)
    const res = await Model.call_button(name, [record.id], { context })
    // console.log(' clicked, object:', name, res)
    if (!res) return res
    else {
      console.log('button_clicked, return action ', res)
      const ctx_active = this._active_context(info, { record })
      const context2 = { ...ctx_action, ...ctx_node, ...ctx_active }

      return await this.button_clicked_after({
        context: context2,
        action: res
      })
    }
  }

  static async button_clicked(info, { node, record }) {
    // console.log('button_clicked ', info, [node, record])

    const { type, name } = node.attrs

    if (type === 'action') {
      console.log('button_clicked call action', type, name)
      return this._button_clicked_action(info, { node, record })
    } else if (type === 'object') {
      return this._button_clicked_object(info, { node, record })
    } else {
      console.log('btn clicked', type, name)
      throw 'button_clicked, not type'
    }
  }

  static async load_m2m_checkboxs_data(info) {
    const { node, view } = info
    const ctx = this._context(info)
    const { fields } = view
    const fname = node.attrs.name
    const meta = fields[fname]
    const { relation } = meta
    console.log(info, ctx, fname, relation, meta)

    const domain = meta.domain || []
    if (domain && typeof domain === 'string') {
      console.log('m2m tags load data,', fname, meta, domain)
      throw ` m2m tags load data,  ${[fname, domain]}   `
    }

    const args = domain
    // console.log(ctx, fname, relation, args)

    const Relation = this.Relation(relation, { context: ctx })

    const result = await Relation.name_search({ args })
    return result
  }

  static async load_m2m_tags_data(info, ids) {
    const { node, view } = info
    const ctx = this._context(info)
    const { fields } = view
    const fname = node.attrs.name
    const meta = fields[fname]
    const { relation } = meta
    // console.log(info, ids, fname, relation, meta)

    const Relation = this.Relation(relation, { context: ctx })

    const result = await Relation.read(ids, { fields: ['display_name'] })
    return result
  }

  static async m2m_search_read(info, { records }) {
    const fields2 = info.views.fields_views.tree.fields
    const fields = Object.keys(fields2)
    const domain1 = this._default_domain(info)
    const domain2 = ['!', ['id', 'in', records.map(item => item.id)]]
    const domain = [...domain1, ...domain2]

    const Model = this.Model(info)

    return await Model.search_read({ domain, fields })
  }
}

class NodeEdit extends NodeRead {
  constructor() {
    super()
  }

  static async get_selection(info, payload) {
    console.log(' get_selection ', cp(info), cp(payload))
    const { record, values } = payload
    // eslint-disable-next-line no-unused-vars
    const { args = [], field, name, operator = 'ilike', limit = 8 } = payload

    const { view } = info
    const { fields } = view

    const meta = fields[field]
    const { relation, domain } = meta

    const get_domain = domain => {
      const record2 = this._values_for_modifiers(info, { record, values })
      // console.log(domain, record2)
      return Eval_Safe(info, { str: domain, record: record2 })
    }
    const args2 = get_domain(domain)

    const args3 = [...args, ...args2]
    // console.log(args3)

    const context_in_node_get = () => {
      const { node } = info
      if (!node) return null

      const ctx_str = node.attrs.context
      if (!ctx_str) return null

      const parent_get = () => {
        const { parent: parentInfo } = info
        const { parentData: parentData } = payload

        if ((parentInfo, parentData)) {
          const parent_record = this._values_for_modifiers(parentInfo, {
            ...parentData
          })
          return { parent: parent_record }
        } else {
          return {}
        }
      }

      const parent_val = parent_get()

      const record2 = this._values_for_modifiers(info, { record, values })

      return Eval_Safe(info, {
        str: ctx_str,
        record: { ...record2, ...parent_val }
      })
    }

    const ctx_in_node = context_in_node_get()
    const Relation = this.Relation(relation, { context: ctx_in_node })

    const res = await Relation.name_search({ args: args3, name, limit })
    return res
  }

  static async _wizard_button_clicked_object(info, { node, values }) {
    // console.log(node, values)
    const wid = await this.create(info, { values })

    const { context: ctx_action } = info
    const { name, context: node_ctx_str } = node.attrs
    const ctx_node = node_ctx_str
      ? py_utils.eval(node_ctx_str, { context: ctx_action })
      : {}

    const context = { ...ctx_action, ...ctx_node }

    const Model = this.Model({ ...info, context })
    const res = await Model.call_button(name, [wid], { context })
    if (!res) return res
    else {
      console.log('button_clicked, return action ', res)

      return await this.button_clicked_after({
        context,
        action: res
      })
    }
  }

  static async wizard_button_clicked(info, { node, values }) {
    // console.log('wizard, btn click 1,', values)
    const { type, name } = node.attrs

    if (type === 'object') {
      return this._wizard_button_clicked_object(info, { node, values })
    } else if (type === 'action') {
      console.log('wizard_button_click call action', type, name)
      // 查看源码, 不会出现这种情况
      throw 'wizard_button_click call action'
    } else {
      console.log('btn clicked', type, name)
      throw 'wizard_button_click, not type'
    }
  }
}

class NodeRealtion extends NodeEdit {
  constructor() {
    super()
  }

  static async load_relation_info(info) {
    // console.log(info)
    const { context, action, view, node } = info
    const { fields } = view
    const fname = node.attrs.name
    const field_meta = fields[fname]
    // console.log(fname, cp(field_meta))

    const { res_model: base_model_name } = action
    const ctx = this._context({ context, action })
    // eslint-disable-next-line no-unused-vars
    const { relation, relation_field, views = {} } = field_meta

    const { kanban, tree } = views
    const get_view = async () => {
      if (kanban || tree) {
        // relation 点击 打开 form view时 需要检查 是否要 loadview
        return { fields: {}, fields_views: { ...views } }
      } else {
        const kwargs = {
          context: { ...ctx, base_model_name },
          options: { load_filters: false },
          views: [
            [null, 'tree'],
            [null, 'kanban']
          ]
        }
        const method = 'load_views'
        const Relation = this.Relation(relation)
        const res = await Relation.execute_kw(method, [], { ...kwargs })
        return res
      }
    }

    const views2 = await get_view()

    const info2 = {
      context: ctx,
      action: { context: [], res_model: relation },
      views: views2
    }

    return info2
  }

  // eslint-disable-next-line no-unused-vars
  static _load_relation_data_fields(info, parent_node) {
    const { views } = info
    const { fields_views = {} } = views
    const { kanban = {}, tree = {} } = fields_views
    const { fields: fields_kanban = {} } = kanban
    const { fields: fields_tree = {} } = tree
    const fields_from_views = { ...fields_kanban, ...fields_tree }

    return Object.keys(fields_from_views)
  }

  static async load_relation_data(info, ids, { node, record }) {
    const { context, action, views } = info
    // console.log('o2m', info, ids, record)

    const ctx_node = node.attrs.context
    const ctx_me = ctx_node ? Eval_Safe(info, { str: ctx_node, record }) : {}

    const action2 = { ...action, context: ctx_me }

    const Model = this.Model({ context, action: action2 })

    if (!ids.length)
      return { records: [], relation: { context, action: action2, views } }

    const fields = this._load_relation_data_fields(info, node)
    const records = await Model.read(ids, fields)

    // console.log(result)
    return { records, relation: { context, action: action2, views } }
  }

  static _relation_form_info_context(context, pinfo) {
    const parent_node = pinfo.node
    const parent_model = pinfo.action.res_model
    const fname = parent_node.attrs.name
    const ctx_parent = pinfo.context
    // console.log('_relation_form_info222', parent_model, fname, ctx_parent)

    // 特殊处理, model: res.partner, field: child_ids
    if (parent_model === 'res.partner' && fname === 'child_ids')
      return ctx_parent
    else return context
  }

  static async _relation_form_info_load_form({ context, action }) {
    const async_load = () => {
      const kwargs = {
        context,
        options: { load_filters: false },
        views: [[null, 'form']]
      }
      const method = 'load_views'
      const Model = this.Model({ action })
      return Model.execute_kw(method, [], { ...kwargs })
    }

    const views = await async_load()

    return views
  }

  static _relation_form_info_merge_views(views, views2) {
    const { fields: fields2, fields_views: fields_views2 = {} } = views2
    const { fields, fields_views = {} } = views
    const views_ret = {
      fields: { ...fields, ...fields2 },
      fields_views: { ...fields_views, ...fields_views2 }
    }
    return views_ret
  }

  static async _relation_form_info(info, { editable }) {
    const { context, action, views } = info
    console.log('_relation_form_info', cp(info))

    // 特殊处理, model: res.partner, field: child_ids 时 用到. 获取 context
    const { parent: parent_info } = info

    // 编辑时, 用到 tree_view, tree_node. 来生成 form_view, form_node
    const { view: tree_view, node: tree_node } = info

    const get_form_info_readonly = async (context, action, views) => {
      const views_get = async () => {
        if (views.fields_views.form) {
          return views
        }

        const views_by_load = await this._relation_form_info_load_form({
          context,
          action
        })

        const views_new = this._relation_form_info_merge_views(
          views,
          views_by_load
        )

        return views_new
      }

      const views2 = await views_get()

      const ctx = this._relation_form_info_context(context, parent_info)

      return {
        context: ctx,
        action,
        views: views2,
        parent: parent_info,
        view: views2.fields_views.form,
        node: this.view_node({ action, views: views2 })
      }
    }

    const info_for_form = await get_form_info_readonly(context, action, views)
    if (!editable) return info_for_form

    const get_form_info_editable = async info_for_form => {
      // 如果 不允许行编辑, 则 打开 form view
      if (!tree_node.attrs.editable) return info_for_form

      // 否则: 允许行编辑. 那么 使用 tree view 拼接一个 form.node
      // 2022-2-10, 行编辑 已经实现, 这个 拼接而成的 node 已经没有用了
      const form_node = {
        ...info_for_form.node,
        debug_is_from_tree: 1,
        children: [
          {
            tagName: 'sheet',
            attrs: {},
            children: [
              {
                tagName: 'group',
                attrs: {},
                children: tree_node.children.filter(
                  item =>
                    !item.attrs.invisible &&
                    item.attrs.optional !== 'hide' &&
                    item.tagName === 'field' &&
                    item.attrs.name !== 'sequence'
                )
              }
            ]
          }
        ]
      }

      const form_state2 = {
        ...info_for_form,
        // 这里的 view 是 tree view. 不是 form view
        // TODO, 那么,  后续. 编辑窗口. 的 node 读取数据时, 遇到 view? 必须提供?
        // 无法从 views 中, 通过 views.fields_views.form 获得
        // 需要检查, 编辑时, 用到哪些  FORM 的函数
        view: tree_view,
        node: form_node
      }
      // console.log('form node:', form_state2)
      return form_state2
    }

    const info_for_form2 = await get_form_info_editable(info_for_form)
    return info_for_form2
  }

  static async relation_new(info, { parentData }) {
    // info is for relation field
    const viewInfo = await this._relation_form_info(info, { editable: true })
    // console.log('relation_new', cp(info), cp(viewInfo))
    const data = await this.relation_onchange_new(viewInfo, { parentData })

    // viewInfo = { context, action, views, view, node }
    // 返回页面的参数. 包括  view, node?
    return { viewInfo, data }
  }

  static async relation_pick(info, { parentData, row, editable }) {
    console.log('relation_pick', cp(info), row, editable)
    const viewInfo = await this._relation_form_info(info, { editable })
    console.log('relation_pick relation viewInfo', cp(viewInfo), row, editable)
    // TODO: 如果是 行编辑, 则无需读取数据
    // 如果是 form 编辑, 需要读取数据. 补充字段数据.
    // 1. 新增的行 无需 读取
    // 2. 已经编辑的行, 读取数据后, 需要把编辑后的数据 更新到 读取到的数据
    const data = editable
      ? { record: row, parentData }
      : await this.load_data(viewInfo, row.id)
    // load_data 这里的 viewInfo 只需要 { context, action, views}
    // 可以直接 call Model.read(res_id, {fields} )
    // 解耦  与 class Form 的关系
    // 只读情况下. relation_pick 打开 form_view.

    // viewInfo = { context, action, views, view, node }
    // 返回页面的参数. 包括  view, node?
    // if 行编辑: view is treeview. node is

    return { viewInfo, data }
  }

  static _relation_onchange_parent_info(info, { record, values }) {
    // console.log('parent:', info, record, values)
    const { view, node } = info
    const fname = node.attrs.name
    const field_meta = view.fields[fname]
    const { relation_field } = field_meta
    const vals = this._values_for_onchange({ view }, { record, values })
    return {
      fname,
      relation_field,
      field: field_meta,
      values: { [relation_field]: vals }
    }
  }

  static async relation_onchange_new(info, { parentData }) {
    const parent = this._relation_onchange_parent_info(info.parent, parentData)

    // onchange_new 的  info 中 需要 view 来 计算 onchange_spec
    const res = await this.onchange_new(info, { values: parent.values })
    const { values: values_ret } = res
    delete values_ret[parent.relation_field]
    const res2 = { ...res, values: values_ret, parentData }
    return res2
  }

  static async relation_onchange(info, payload = {}) {
    // 1. relation 字段的 subForm 或 subTreeEdit 的编辑
    // 2. 相比 普通的 onchange. 参数 额外有 parent_feild
    //    返回值, 需要 对 parent_feild 特殊处理
    // console.log('relation_onchange,', payload)

    const { record = {}, values = {}, parentData, fname } = payload
    const parent = this._relation_onchange_parent_info(info.parent, parentData)
    // console.log('relation_onchange2 parent,', parent)
    const res = await super.onchange(info, {
      record,
      values: { ...values, ...parent.values },
      fname
    })

    const { values: values_ret } = res
    delete values_ret[parent.relation_field]
    const res2 = { ...res, values: values_ret, parentData }
    return res2
  }

  // 实际上, 只需要 fields
  static async relation_commit({ view }, payload) {
    // console.log('relation_commit', cp(view))
    // eslint-disable-next-line no-unused-vars
    const { records, values, formData, parentData } = payload
    // const {fname, field, value: tuple  } = formData
    // console.log('relation_commit', cp(info), cp(payload))

    const to_write = (view, records, values2) => {
      const values3 = tuples_helper.to_onchange(values2)

      return values3.map(item => {
        const op = item[0]
        if ([1, 0].includes(op)) {
          const record_me = op === 1 ? records.find(it => it.id) || {} : {}
          const values_me = item[2]
          const state_value =
            'state' in values_me ? values_me.state : record_me.state

          const vals_write = this.values_for_write(
            { view },
            { state: state_value, values: values_me }
          )
          return [op, item[1], vals_write]
        } else {
          return item
        }
      })
    }

    const values_ret = tuples_helper.to_return(
      values,
      formData.value,
      formData.field.relation_field
    )
    const values_write = to_write(view, records, values_ret)

    const old_tuples = records.map(item => [4, item.id, false])
    const tuples_todo = [...old_tuples, ...values_ret]
    const tuples_merged = tuples_helper._to_merge(tuples_todo)
    const values_onchange = tuples_helper.to_onchange(tuples_merged)

    // console.log(' on commit1,tuples_todo', tuples_todo)
    // console.log(' on commit1,tuples_merged', tuples_merged)
    // console.log(' on commit1,values_onchange2', values_onchange)

    // console.log('relation_commit values_ret2', cp(values_ret))
    // console.log('relation_commit values_onchange3', cp(values_onchange))
    // console.log(' on commit1', records)
    // console.log(' on commit', values_write)
    // console.log(' on commit, values_write', values_write)

    return { records, values: values_ret, values_onchange, values_write }
  }
}

export class Node extends NodeRealtion {
  constructor() {
    super()
  }

  static image_url({ action, view, node }, record) {
    // console.log('xxxx, url,', action, view, node, record)
    const widget = node.attrs.widget
    const fname = node.attrs.name

    // console.log(widget, node)
    if (widget === 'many2one_avatar_employee') {
      if (record[fname]) {
        const { fields = {} } = view
        const meta = fields[fname]
        const model = meta.relation
        return Kanban_Image(model, 'image_128', record[fname][0])
      } else return undefined
    }

    if (widget === 'many2one_avatar_user') {
      if (record[fname]) {
        const { fields = {} } = view
        const meta = fields[fname]
        const model = meta.relation
        return Kanban_Image(model, 'image_128', record[fname][0])
      } else return undefined
    }

    if (widget === 'image_url') {
      if (record[fname]) {
        const baseURL = this.baseURL

        return `${baseURL}${record[fname]}`
      } else return undefined
    }

    const { res_model: model } = action

    if (!record.id) return undefined

    //     name: "image_1920"
    // on_change: "1"
    // options: "{\"preview_image\": \"image_128\"}"

    const op_get = () => {
      const options = node.attrs.options
      // console.log(options)
      if (!options) return {}

      const str_list = []
      str_list.push('()=>{')
      str_list.push('\n')
      str_list.push(`const op1 = ${options}`)
      str_list.push('\n')
      str_list.push('return op1')
      str_list.push('\n')
      str_list.push('}')
      const fn_str = str_list.join('')
      const fn = eval(fn_str)
      const op = fn()

      // const op = options ? py_utils.eval(options, {}) : {}
      // const op = options ? eval(options) : {}
      // console.log(op)

      return op
    }

    const op = op_get()

    const { preview_image } = op

    const fname2 = preview_image || fname

    return Kanban_Image(model, fname2, record.id)
  }

  static _compute_modifiers(node, attr, record) {
    if (!node.attrs) return false
    if (!node.attrs.modifiers) return null
    const modifiers = JSON.parse(node.attrs.modifiers)

    if (modifiers[attr] !== undefined)
      return compute_domain(modifiers[attr], record)
    else return null
  }

  static readonly(info, { record, values }) {
    const { node } = info
    if (!is_node(node)) return true
    const record2 = this._values_for_modifiers(info, { record, values })

    return this._compute_modifiers(node, 'readonly', record2)
  }

  static required(info, { record, values }) {
    const { node } = info
    if (!is_node(node)) return false

    const record2 = this._values_for_modifiers(info, { record, values })

    return this._compute_modifiers(node, 'required', record2)
  }

  static invisible(info, { record, values }) {
    const { context, action, node } = info

    if (!is_node(node)) return false
    if (!node.attrs) return false

    // if relation, TODO.
    const ctx = this._context({ context, action })

    if (node.attrs.invisible) {
      return py_utils.eval(node.attrs.invisible, { context: ctx })
    }

    const record2 = this._values_for_modifiers(info, { record, values })

    // if (node.attrs.name === 'edi_document_ids') {
    //   console.log('invisble,edi_document_ids', node, record, record2, values)
    // }

    const res = this._compute_modifiers(node, 'invisible', record2)
    // if (node.attrs.name === 'edi_document_ids') {
    //   console.log('invisble,edi_document_ids2', res)
    // }

    return res

    // return invisible

    // if (invisible) return invisible

    // if ((node.children || []).length === 0) return invisible

    // return (node.children || []).reduce(
    //   (acc, cur) => acc && this.invisible({context, node:cur, record}),
    //   true
    // )
  }
}

const compute_domain = (domain_in, record, debug) => {
  // console.log(domain_in, record)
  // if (domain_in.length === 6) {
  //   console.log(domain_in, record)
  // }
  if (!Array.isArray(domain_in)) return domain_in

  const domain = [...domain_in]

  const AND = (v1, v2) => {
    // console.log('AND', v1, v2)
    if (debug) {
      return v1 * v2
    } else {
      const val1 = compute_condition(v1)
      const val2 = compute_condition(v2)

      return val1 && val2
    }
  }
  const OR = (v1, v2) => {
    // console.log('OR', v1, v2)
    if (debug) {
      return v1 + v2
    } else {
      const val1 = compute_condition(v1)
      const val2 = compute_condition(v2)
      return val1 || val2
    }
  }
  const NOT = v1 => {
    // console.log('NOT', v1)
    if (debug) {
      return -v1
    } else {
      return !v1
    }
  }

  const OPTIONS = { '&': AND, '|': OR, '!': NOT }

  // let index = 0

  const EQU = (val1, val2) => {
    // console.log('EQU', val1, ',', val2)

    if (!Array.isArray(val1)) {
      return val1 === val2
    }

    if (val1.length === 0 && val2.length === 0) {
      return true
    } else if (val1.length !== val2.length) {
      return false
    }
    //
    throw 'TBD: EQU, array'
  }

  const IN = (val1, val2) => {
    // console.log('IN', val1, ',', val2)
    const ret = val2.includes(val1)
    // console.log('IN', ret)
    return ret
  }

  const compute_condition = condition => {
    if (!Array.isArray(condition)) {
      return condition
    }
    //
    const [field, op, val] = condition
    // console.log('xxxx', field, record[field], op, val)
    const val1 = record[field]
    switch (op) {
      case '=':
      case '==':
        return EQU(val1, val)
      case '!=':
      case '<>':
        // if(field===''){
        //   //
        // }

        return !EQU(val1, val)
      case '<':
        return val1 < val
      case '>':
        return val1 > val
      case '<=':
        return val1 <= val
      case '>=':
        return val1 >= val
      case 'in':
        return IN(val1, val)
      case 'not in':
        return !IN(val1, val)
      // case 'like':
      // // return (fieldValue.toLowerCase().indexOf(this._data[2].toLowerCase()) >= 0);
      // case '=like':
      // // var regExp = new RegExp(this._data[2].toLowerCase().replace(/([.\[\]\{\}\+\*])/g, '\\\$1').replace(/%/g, '.*'));
      // // return regExp.test(fieldValue.toLowerCase());
      // case 'ilike':
      // // return (fieldValue.indexOf(this._data[2]) >= 0);
      // case '=ilike':
      // return new RegExp(this._data[2].replace(/%/g, '.*'), 'i').test(fieldValue);
      default:
        throw 'error'
      // throw new Error(_.str.sprintf(
      //     "Domain %s uses an unsupported operator",
      //     this._data
      // ));
      //
    }
  }

  const fn = (domain, op) => {
    // console.log('1st:index:', index, domain, op)
    // if (domain_in.length === 6) {
    //   console.log('1st:index:', domain, op)
    // }

    // index = index + 1
    if (!domain.length) {
      // if (domain_in.length === 6) {
      //   console.log('2st:index:', domain, op)
      // }

      // 补丁, odoo 出现了 多一个 '|' 的情况
      if (op.length === 0) {
        return [null]
      } else {
        const comp = op[op.length - 1]
        if (comp === '!') {
          op.pop()
          return fn([...domain], op)
        } else if (comp === '&' || comp === '|') {
          op.pop()
          return fn(domain, op)
        } else {
          const v1 = op.pop()
          const c0 = op.pop()
          const ret = OPTIONS[c0](v1, v1)
          return fn([ret, ...domain], op)
        }
      }
    } else if (op.length === 0 && domain.length === 1) {
      const val = domain[0]
      const val2 = compute_condition(val)
      return [val2]
    }

    const one = domain.shift()

    if (['&', '|', '!'].includes(one)) {
      // console.log('2.1, &|!:', domain, op, one)
      op.push(one)
      const ret = fn(domain, op)
      // console.log('2.1,&|!,1:', domain, op)
      // console.log('2.1,&|!,ok:', ret)
      return ret
    } else {
      // console.log('2.2:', domain, op, one)
      if (op.length === 0) {
        // op not(!&|)  and domain >1
        // console.log('4 default &', domain, op, one)
        op.push('&')
        op.push(one)
        // console.log('4 default & 1', domain, op)
        const dm2 = fn(domain, op)
        // console.log('4 default & ok', dm2, op)
        return dm2
        // return fn(dm2, op)
      } else {
        // console.log('3 comp:', domain, op, one)
        const comp = op[op.length - 1]
        if (comp === '!') {
          // console.log('3.1 !,:', domain, op, one)
          op.pop()
          const ret = NOT(one)
          // console.log('3.1 !,ok:', [ret, ...domain], op)
          return fn([ret, ...domain], op)
        } else if (comp === '&' || comp === '|') {
          op.push(one)
          return fn(domain, op)
        } else {
          // console.log('3.2 &|,:', domain, op, one)
          const v1 = op.pop()
          const c0 = op.pop()
          const ret = OPTIONS[c0](v1, one)
          // console.log('3.2 &|,ok:', [ret, ...domain], op)
          return fn([ret, ...domain], op)
        }
      }
    }
  }

  const ret = fn(domain, [])

  const ret2 = ret[0]

  // if (domain_in.length === 6) {
  //   console.log('all,ok', ret2)
  // }

  return ret2
}
