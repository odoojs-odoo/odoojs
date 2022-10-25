import { BaseView } from './baseview'

import { EditModel } from './editmodel'

// eslint-disable-next-line no-unused-vars
const cp = val => JSON.parse(JSON.stringify(val))

export class FormView extends BaseView {
  constructor(action_id, payload = {}) {
    super(action_id, { ...payload, type: 'form' })
    this.edit_model = undefined
    this._relations = {}
  }

  load_relations_done(relations) {
    this._relations = { ...this._relations, ...relations }
  }

  _edit_model_get(record = {}, values = {}) {
    return new EditModel({ viewmodel: this, record, values })
  }

  async _read_one(res_id) {
    const Model = this.Model
    const fields1 = this.fields_list
    const fields = fields1.includes('display_name')
      ? fields1
      : ['display_name', ...fields1]

    const res = await Model.read(res_id, { fields })
    return res[0]
  }

  async read(res_id) {
    return this._read_one(res_id)
  }

  get view_info() {
    const action = this.action_info
    const view = action.views.form
    return { action, view }
  }

  get view_header() {
    const { view } = this.view_info
    const { arch = {} } = view
    const { header = {} } = arch
    return header
  }

  arch_buttons(record_in, values) {
    const { view } = this.view_info
    const { arch = {} } = view

    const buttons = arch.buttons || []

    // console.log(header, buttons)
    const btns = buttons.filter(btn => {
      if (btn.invisible === undefined) return true

      if (typeof btn.invisible !== 'function') {
        return !btn.invisible
      }
      const record = this._get_values_for_context(record_in, values)
      // console.log(btn, record)
      return !btn.invisible({ record })
    })

    const btns2 = btns.map(item => {
      const item2 = { ...item }
      delete item2.invisible
      return item2
    })

    return btns2
  }

  view_statusbar(record, values) {
    const header = this.view_header

    const fld_state = (header.fields || {}).state || {}
    if (fld_state.widget !== 'statusbar') {
      return []
    }

    if (!fld_state.statusbar_visible) {
      return []
    }

    const statusbar_visible_get = () => {
      if (typeof fld_state.statusbar_visible === 'function') {
        return fld_state.statusbar_visible({ record: { ...record, ...values } })
      } else {
        return fld_state.statusbar_visible
      }
    }

    const statusbar = statusbar_visible_get().split(',')
    return statusbar
  }

  header_buttons(record_in, values) {
    const header = this.view_header

    const buttons = header.buttons || []

    // console.log(header, buttons)
    const btns = buttons.filter(btn => {
      if (btn.invisible === undefined) return true

      if (typeof btn.invisible !== 'function') {
        return !btn.invisible
      }
      const record = this._get_values_for_context(record_in, values)
      // console.log(btn, record)
      return !btn.invisible({ record })
    })

    const btns2 = btns.map(item => {
      const item2 = { ...item }
      delete item2.invisible
      return item2
    })

    return btns2
  }

  header_statusbar_visible(record, values) {
    const current_state = { ...record, ...values }.state
    const states = this.view_statusbar(record, values)
    if (!states.length) {
      return []
    }

    if (current_state && !states.includes(current_state)) {
      states.push(current_state)
    }

    const meta = this.fields.state || {}

    const selections2 = meta.selection || []
    const selections = selections2.reduce((acc, cur) => {
      return { ...acc, [cur[0]]: cur[1] }
    }, {})

    return states.map(item => [item, selections[item]])
  }

  async _button_clicked_action({ name, record }) {
    const ctx_action = this.context
    const ctx_me = {} // todo
    const ctx_active = {
      active_id: record.id,
      active_ids: [record.id],
      active_model: this.res_model
    }

    // ctx_active
    // 读取 action by name, with ctx_active
    //  action   name,  缺少 module name . 需要补充上

    console.log(name, ctx_action, ctx_me, ctx_active)

    alert('todo')

    // const context = { ...ctx_action, ...ctx_me }
  }

  async _button_clicked_object({ name, record }) {
    // console.log('button_clicked call object', name)

    const ctx_action = this.context
    const ctx_me = {} // todo
    const context = { ...ctx_action, ...ctx_me }

    const res = await this.Model.call_button(name, [record.id], { context })

    // console.log(' clicked, object:', name, res)
    if (!res) return res
    else {
      // console.log('button_clicked, return action ', name, record, res, context)
      const action_info = await this.Model.call_button_after({
        name,
        record,
        action: res
      })

      const { name: action_id, context: context_action } = action_info

      const action = this.new_action(action_id, {
        env: this.env,
        context: context_action
      })
      // console.log('button_clicked, return action2 ', action.info)

      return action.info
      // return res
      // const ctx_active = this._active_context(info, { record })
      // const context2 = { ...ctx_action, ...ctx_node, ...ctx_active }

      // return await this.button_clicked_after({
      //   context: context2,
      //   action: res
      // })
    }
  }

  async button_clicked({ type, name, record }) {
    // console.log(btn, record)
    if (type === 'action') {
      // console.log('button_clicked call action', type, name)
      return this._button_clicked_action({ name, record })
    } else if (type === 'object') {
      return this._button_clicked_object({ name, record })
    } else {
      // console.log('btn clicked', type, name)
      throw 'button_clicked, not type'
    }
  }

  async call_button_after(action_info) {
    return this.Model.call_button_after(action_info)
  }

  async onchange_new() {
    this.edit_model = this._edit_model_get()
    return this.edit_model.onchange_new()
  }

  set_editable(record) {
    this.edit_model = this._edit_model_get()
    return this.edit_model.set_editable(record)
  }

  async onchange(fname, kwargs_in) {
    return this.edit_model.onchange(fname, kwargs_in)
  }

  async commit(kwargs = {}) {
    return this.edit_model.commit(kwargs)
  }

  unlink(res_id) {
    // 页面删除按钮调用
    const Model = this.Model
    return Model.unlink(res_id)
  }

  _get_values_for_context(record, values) {
    // call by x2mform.context_get

    const all_keys = Object.keys({ ...record, ...values })
    return all_keys.reduce((acc, fld) => {
      const meta = this.fields[fld] || {}
      if (meta.type === 'many2many') {
        const val =
          fld in values ? values[fld] : [[6, false, record[fld] || []]]
        acc[fld] = val
      } else if (meta.type === 'one2many') {
        const val =
          fld in values
            ? values[fld]
            : (record[fld] || []).map(item => [4, item, false])

        acc[fld] = val
      } else {
        const val = fld in values ? values[fld] : record[fld]
        const val2 = val && meta.type === 'many2one' ? val[0] : val
        acc[fld] = val2
      }

      return acc
    }, {})
  }

  async copy(ids) {
    return await this.Model.copy(ids)
  }

  async unarchive(res_id) {
    if (!res_id) return true
    return await this.Model.action_unarchive([res_id])
  }

  async archive(res_id) {
    if (!res_id) return true
    return await this.Model.action_archive([res_id])
  }

  _get_values_for_write(record, values) {
    const values2 = this.Model._get_values_for_write(record, values)

    return Object.keys(values2).reduce((acc, fld) => {
      const val = values2[fld]
      const meta = this.fields[fld] || {}
      if (meta.type === 'one2many') {
        const relation = this._relations[fld]
        if (relation) {
          const { values_write } = relation.tree.read_for_new_o2m(val)
          acc[fld] = values_write
        } else {
          acc[fld] = val
        }
      } else {
        acc[fld] = val
      }

      return acc
    }, {})
  }
}