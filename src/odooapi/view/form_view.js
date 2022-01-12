import xml2json from '../xml2json'

import { ViewBase } from './base_view'

// eslint-disable-next-line no-unused-vars
const cp = item => JSON.parse(JSON.stringify(item))

// eslint-disable-next-line no-unused-vars
function sleep(millisecond) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, millisecond)
  })
}

const is_virtual_id = id_ =>
  typeof id_ === 'string' && id_.slice(0, 8) === 'virtual_'

const _onchange_spec = view_info => {
  const result = {}

  const process = (node, info, prefix) => {
    if (node.tagName === 'field') {
      const name = node.attrs.name
      const names_list = prefix ? [prefix, name] : [name]
      const names = names_list.join('.')
      if (!Object.keys(result).includes(names))
        result[names] = node.attrs.on_change || ''

      Object.values((info.fields[name] || {}).views || {}).forEach(subinfo =>
        process(xml2json.toJSON(subinfo.arch), subinfo, names)
      )
    } else {
      const children = node.children || []
      children.forEach(child => process(child, info, prefix))
    }
  }

  if (view_info.arch) {
    const root = xml2json.toJSON(view_info.arch)
    process(root, view_info, '')
  }

  const res2 = { ...result }
  delete res2.id

  return res2
}

const tuples_to_ids = tuples => {
  // m2m
  // [6,],[5,],[4,id],[3,id]
  //

  // console.log('tuples_to_ids 1', tuples)

  const ids = tuples.reduce((acc, tup) => {
    const op = tup[0]
    if (op === 6) return [...tup[2]]
    if (op === 5) return []

    if ([4, 0, 1].includes(op)) {
      const rid = tup[1]
      if (acc.includes(rid)) return [...acc]
      else return [...acc, rid]
    }

    if ([3, 2].includes(op)) return acc.filter(item => item !== tup[1])

    // 不应该走到这里
    return acc
  }, [])

  // console.log('tuples_to_ids 2', ids)
  return ids
}

class FormRead extends ViewBase {
  constructor() {
    super()
  }

  // get fields() {
  //   if (!this.model_from) return this.view_info.fields

  //   const views = this.action.views
  //   const fields_kanban = (views.kanban || { fields: {} }).fields
  //   const fields_tree = (views.tree || { fields: {} }).fields
  //   const fields_form = (views.form || { fields: {} }).fields
  //   const fields = { ...fields_kanban, ...fields_tree, ...fields_form }
  //   return fields
  // }

  // get field_onchange() {
  //   if (!this._field_onchange) {
  //     if (!this.view_info) return {}
  //     this._field_onchange = _onchange_spec(this.view_info)
  //   }

  //   if (!this.model_from) return this._field_onchange

  //   const views = this.action.views

  //   const spec_kb = views.kanban ? _onchange_spec(views.kanban) : {}
  //   const spec_tree = views.tree ? _onchange_spec(views.tree) : {}
  //   const spec_form = views.form ? _onchange_spec(views.form) : {}

  //   const spec = { ...spec_kb, ...spec_tree, ...spec_form }
  //   const field_onchange = Object.keys(spec).reduce((acc, cur) => {
  //     acc[cur] = spec_kb[cur] || spec_tree[cur] || spec_form[cur] ? '1' : ''
  //     return acc
  //   }, {})

  //   return field_onchange
  // }

  static async read(info, res_id) {
    const Model = this.Model(info)
    const fields = this._fields_list(info)
    const result = await Model.read(res_id, fields)
    const record = result.length ? result[0] : {}
    return { record, ready: true }
  }

  static async unlink(info, ids) {
    return await this.Model(info).unlink(ids)
  }

  static async copy(info, ids) {
    return await this.Model(info).copy(ids)
  }

  static _values_for_onchange_and_modifiers({ view }, payload) {
    const { record, values, for_modifiers } = payload
    // TODO parent_vals values_onchange_for_parent
    const { fields = {} } = view
    const all_keys = Object.keys({ ...record, ...values })

    return all_keys.reduce((acc, fld) => {
      const meta = fields[fld] || {}
      if (meta.type === 'many2many') {
        const val =
          fld in values ? values[fld] : [[6, false, record[fld] || []]]
        acc[fld] = for_modifiers ? tuples_to_ids(val) : val
      } else if (meta.type === 'one2many') {
        const val =
          fld in values
            ? values[fld]
            : (record[fld] || []).map(item => [4, item, false])

        acc[fld] = for_modifiers ? tuples_to_ids(val) : val
      } else {
        const val = fld in values ? values[fld] : record[fld]
        const val2 = val && meta.type === 'many2one' ? val[0] : val
        acc[fld] = val2
      }

      return acc
    }, {})
  }
}

class FormEdit extends FormRead {
  constructor() {
    super()
  }

  static _values_for_onchange({ view }, { record, values }) {
    return this._values_for_onchange_and_modifiers({ view }, { record, values })
  }

  //
  static async onchange_new(info, payload = {}) {
    const { view } = info
    const { values = {} } = payload

    const Model = this.Model(info)
    const field_onchange = _onchange_spec(view)
    const result = await Model.onchange([], values, '', field_onchange)
    const { value: value_ret, ...res } = result
    const values_ret = { ...values, ...value_ret }

    return { ...res, values: values_ret, ready: true }
  }

  // onchange 返回后 若有 m2m 字段, 需要获取数据?
  // 若有 o2m 字段? ? 需要生成 虚拟id?
  // 返回  domain. 如何使用
  // TODO
  static async onchange(info, payload = {}) {
    console.log('onchange,', payload)
    const { view } = info
    const { record = {}, values = {}, fname, kwargs = {} } = payload

    const Model = this.Model(info)
    const field_onchange = _onchange_spec(view)

    // const to_call = field_onchange[fname]
    //  if (to_call)  then  onchange to server

    const ids = record.id && !is_virtual_id(record.id) ? [record.id] : []
    // eslint-disable-next-line no-unused-vars
    const { id: id_del, ...values2 } = values
    const vals_onchg = this._values_for_onchange(info, {
      record,
      values: values2
    })
    // console.log(record, values, vals_onchg, fname)
    const result = await Model.onchange(ids, vals_onchg, fname, field_onchange)
    const { value: value_ret, ...res } = result
    // console.log(record, values, value_ret, fname)

    // after onchange
    // 1. _onchange_domain
    // {domain} = res
    // 2. set_value_by_onchange
    const values_ret = { ...values, ...value_ret }

    if (kwargs.for_write !== undefined) {
      values_ret[fname] = kwargs.for_write
    }

    // 3. _after_onchange_async
    // m2m 需要 更新数据

    // done:
    return { record, ...res, values: values_ret, ready: true }
  }

  static _commit_get_readonly(meta, state) {
    // 仅仅 在 commit 时, 组织 values, 需要
    // TBD, 测试  销售订单 等 有 state的模型
    // console.log('vvwr 1', meta, record)

    if (meta.states === undefined) return meta.readonly

    if (state && meta.states && meta.states[state]) {
      const readonly3 = meta.states[state].reduce((acc, cur) => {
        acc[cur[0]] = cur[1]
        return acc
      }, {})

      if (readonly3.readonly !== undefined) return readonly3.readonly
    }

    return meta.readonly
  }

  static values_for_write({ view }, { state, values }) {
    const { fields = {} } = view
    const all_keys = Object.keys({ ...values })

    return all_keys.reduce((acc, fld) => {
      const meta = fields[fld] || {}
      const readonly = this._commit_get_readonly(meta, state)

      if (!readonly) {
        const val = values[fld]
        const val2 = val && meta.type === 'many2one' ? val[0] : val
        acc[fld] = val2
      }

      return acc
    }, {})
  }

  static async create(info, { values }) {
    return this.commit(info, { record: {}, values })
  }

  static async write(info, { record, values }) {
    if (!record || !record.id) {
      console.log('throw error . write with no record.id')
      throw 'write No record.id'
    }
    return this.commit(info, { record, values })
  }

  static async commit(info, { record, values }) {
    if (!values) return
    if (!Object.keys(values).length) return

    const state_value = 'state' in values ? values.state : record.state

    const values2 = this.values_for_write(info, { state: state_value, values })

    const Model = this.Model(info)

    if (record.id) {
      await Model.write(record.id, values2)
      return record.id
    } else {
      return Model.create(values2)
    }
  }
}

export class Form extends FormEdit {
  constructor() {
    super()
  }

  static tuples_to_ids(tuples) {
    return tuples_to_ids(tuples)
  }

  static async load_data(info, res_id) {
    if (res_id) {
      return this.read(info, res_id)
    } else {
      return this.onchange_new(info)
    }
  }

  static async action_call(info, action_todo, { active_id }) {
    // console.log(cp(info), cp(action_todo), active_ids, active_id)
    const { action } = info
    const ctx_action = this._context(info)
    const ctx_active = {
      active_id: active_id,
      active_ids: [active_id],
      active_model: action.res_model
    }
    const additional_context = { ...ctx_action, ...ctx_active }
    return this.load_action(info, action_todo.id, { additional_context })
  }

  static values_display({ view }, { record, values }) {
    const { fields = {} } = view
    const all_keys = Object.keys({ ...record, ...values })

    // console.log('values_display:', view, record, values)

    return all_keys.reduce((acc, fld) => {
      const meta = fields[fld] || {}
      if (meta.type === 'many2many') {
        acc[fld] = fld in values ? tuples_to_ids(values[fld]) : record[fld]
        // acc[fld] = []
      } else if (meta.type === 'one2many') {
        acc[fld] = []
      } else {
        acc[fld] = fld in values ? values[fld] : record[fld]
      }
      return acc
    }, {})
  }

  static _values_for_modifiers({ view }, { record, values }) {
    return this._values_for_onchange_and_modifiers(
      { view },
      { record, values, for_modifiers: 1 }
    )
  }
}
