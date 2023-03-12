import { BaseView } from './baseview'

import { EditModel } from './editmodel'

import { tuples_to_ids } from '@/odoorpc/tools'

// eslint-disable-next-line no-unused-vars
const cp = val => JSON.parse(JSON.stringify(val))

export class FormView extends BaseView {
  constructor(action_id, payload = {}) {
    super(action_id, { ...payload, type: 'form' })
    this.edit_model = undefined
    this._relations = {}
  }

  get relations() {
    return this._relations
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

  view_sheet(fields_ready) {
    const sheet_get = () => {
      const { view } = this.view_info
      const { arch = {} } = view

      if (arch.sheet) {
        return arch.sheet
      }

      // if (!fields_ready) {
      //   return {}
      // }

      const fields = this.action_info.views[this._type].fields

      const fs = Object.keys(fields)
        .filter(item => !fields[item].invisible && !fields[item].is_title)
        .reduce((acc, fld) => {
          const tname = `_group_${fld}`
          const meta = {
            [fld]: fields[fld]
          }
          if (fields[fld].span) {
            meta._span = fields[fld].span
          }

          acc[tname] = meta

          return acc
        }, {})

      const title_nodes = Object.keys(fields).filter(
        item => !fields[item].invisible && fields[item].is_title
      )

      if (title_nodes.length) {
        fs._title = {
          [title_nodes[0]]: fields[title_nodes[0]]
        }
      }

      return fs
    }

    const sheet = sheet_get()

    // console.log(sheet)

    const meta_get = (fld, meta = {}) => {
      if (fields_ready) {
        return { ...this.fields[fld], ...meta, name: fld }
      } else {
        return { ...meta, name: fld }
      }
    }

    const title0 = sheet._title || {}
    const title = Object.keys(title0).reduce((acc, fld) => {
      acc[fld] = meta_get(fld)
      return acc
    }, {})

    // console.log(title)

    function item_get(node) {
      return Object.keys(node).reduce((acc, item) => {
        if (item[0] === '_') {
          const attr = item.substring(1)
          acc[attr] = node[item]
        } else {
          if (!acc.children) {
            acc.children = {}
          }
          acc.children[item] = meta_get(item, node[item])
        }

        return acc
      }, {})
    }

    const sheet_items = Object.keys(sheet)
      .filter(item => item !== '_title')
      .reduce(
        (acc, item) => {
          const node = item_get(sheet[item])

          if (node.span) {
            if (acc.y) {
              const tname = `group_${acc.x}_1`
              acc.data[tname] = {
                name: tname,
                x: acc.x,
                y: acc.y,
                children: {}
              }
              acc.y = 0
              acc.x = acc.x + 1
            }
          }

          acc.data[item] = { name: item, x: acc.x, y: acc.y, ...node }

          if (node.span) {
            acc.y = 1
          }

          acc.y = 1 - acc.y
          if (!acc.y) {
            acc.x = acc.x + 1
          }

          return acc
        },
        { data: {}, x: 0, y: 0 }
      )

    const total_len = Object.keys(sheet_items.data).length

    if (total_len) {
      const last_fld = Object.keys(sheet_items.data)[total_len - 1]
      const last = sheet_items.data[last_fld]
      if (!last.y && !last.span) {
        const tname = `group_${last.x}_1`
        sheet_items.data[tname] = {
          name: tname,
          x: last.x,
          y: 1,
          children: {}
        }
      }
    }

    // console.log('sheet_items', sheet_items.data)

    return { title, children: sheet_items.data }
  }

  arch_buttons(record_in, values) {
    const { view } = this.view_info
    const { arch = {} } = view

    const buttons = arch.buttons || []

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

  get state_field_name() {
    const header = this.view_header
    const header_fields = header.fields || {}
    const state_flds = Object.keys(header_fields)

    return state_flds.length ? state_flds[0] : 'state'
  }

  view_statusbar() {
    const header = this.view_header

    const state_field_name = this.state_field_name
    const fld_state = (header.fields || {})[state_field_name] || {}

    if (fld_state.widget !== 'statusbar') {
      return []
    }

    if (!fld_state.statusbar_visible) {
      return []
    }

    const statusbar = fld_state.statusbar_visible.split(',')
    return statusbar
  }

  header_buttons(record_in, values) {
    const header = this.view_header

    const buttons = header.buttons || []

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

  header_statusbar_visible(current_state) {
    const state_field_name = this.state_field_name

    const states = this.view_statusbar()

    if (!states.length) {
      return []
    }

    if (current_state && !states.includes(current_state)) {
      states.push(current_state)
    }

    const meta = this.fields[state_field_name] || {}

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

  async onchange_new(kwargs) {
    this.edit_model = this._edit_model_get()
    return this.edit_model.onchange_new(kwargs)
  }

  set_editable(record) {
    this.edit_model = this._edit_model_get()
    return this.edit_model.set_editable(record)
  }

  async onchange(fname, kwargs_in) {
    return this.edit_model.onchange(fname, kwargs_in)
  }

  async relation_onchange(fname, kwargs_in) {
    const { record, values, x2m_tree, x2m_form } = kwargs_in

    const { records: tree_records, values: tree_values } = x2m_tree
    const { record: form_record, onchange_field, onchange_value } = x2m_form

    const relation = this.relations[fname]
    const x2mtree = relation.tree
    const x2mform = relation.form

    // const form_values_display =
    x2mform.set_editable(form_record, { record, values }) // 单行, 子 form 可编辑,
    // console.log('form_values_display', form_values_display)
    // const form_onchange_res =
    await x2mform.onchange(onchange_field, { value: onchange_value }) // 子 form 编辑后 触发 onchange

    // console.log('form_onchange_res', form_onchange_res)
    const form_commit_result = await x2mform.commit() // 子 form 提交
    // console.log('form_commit_result', form_commit_result)

    const tree_commit = x2mtree.commit(
      tree_records,
      tree_values,
      form_commit_result
    ) //  明细行 更新

    // console.log('tree_commit', tree_commit)

    const { values: tree_values2, values_onchange: tree_values_onchange } =
      tree_commit

    const onchange_res = await this.onchange(fname, {
      value: tree_values_onchange
    }) // 主 form onchange

    // console.log('onchange_res', onchange_res)

    // console.log('return,tree_values2 ', tree_values2)

    const tree_values_display = x2mtree.values_display(
      tree_records,
      tree_values2
    )
    const tree_return = {
      values: tree_values2,
      values_display: tree_values_display,
      values_onchange: tree_values_onchange
    }

    return {
      ...onchange_res,
      x2m_tree: {
        ...tree_return
      }
    }
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

  _get_values_for_modifiers(record, values) {
    // call by require, readonly, domain of feild

    const all_keys = Object.keys({ ...record, ...values })

    return all_keys.reduce((acc, fld) => {
      const meta = this.fields[fld] || {}
      if (meta.type === 'many2many') {
        const val =
          fld in values ? values[fld] : [[6, false, record[fld] || []]]

        acc[fld] = tuples_to_ids(val)
      } else if (meta.type === 'one2many') {
        const val =
          fld in values
            ? values[fld]
            : (record[fld] || []).map(item => [4, item, false])

        acc[fld] = tuples_to_ids(val)
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
