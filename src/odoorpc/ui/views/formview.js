import { BaseView } from './baseview'

import { EditModel } from './editmodel'

import { ViewHelp } from './viewhelp'

// eslint-disable-next-line no-unused-vars
const cp = val => JSON.parse(JSON.stringify(val))

class FormModel extends BaseView {
  constructor(action_id, payload = {}) {
    super(action_id, { ...payload, type: 'form' })
    this.edit_model = undefined
  }

  load_relations_done(relations) {
    this._fields_info = { ...this._fields_info, ...relations }
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

  async onchange_new(kwargs) {
    // kwargs 中 可能包含 context
    this.edit_model = new EditModel(this)
    return this.edit_model.onchange_new(kwargs)
  }

  set_editable(record) {
    this.edit_model = new EditModel(this)
    return this.edit_model.set_editable(record)
  }

  async onchange(fname, value) {
    return this.edit_model.onchange(fname, value)
  }

  async commit(...args) {
    return this.edit_model.commit(...args)
  }

  unlink(res_id) {
    const Model = this.Model
    return Model.unlink(res_id)
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

    alert(`action(${name}) by button clicked is not defined.`)
  }

  async _button_clicked_object({ name, record }) {
    // console.log('button_clicked call object', name)

    const ctx_action = this.context
    const ctx_me = {} // todo
    const context = { ...ctx_action, ...ctx_me }

    const res = await this.Model.call_button(name, [record.id], { context })

    if (!res) return res
    else {
      // console.log('button_clicked, return action ', name, record, res, context)
      // throw 'todo ret action'
      const action_info = await this.Model.call_button_after(name, res, {
        record
      })

      const { xml_id } = action_info
      if (xml_id) {
        const action = this.new_action(xml_id, { ...action_info })
        return action.info
      } else {
        alert(`action return by button(${name}) clicked is not defined.`)
      }
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
}

export class FormView extends FormModel {
  constructor(action_id, payload = {}) {
    super(action_id, { ...payload })
  }

  get view_info() {
    const action = this.action_info
    const view = action.views.form
    return { action, view: { ...view, fields: this.fields } }
  }

  get view_header() {
    const { view } = this.view_info
    const { arch = {} } = view
    const { header = {} } = arch
    return header
  }

  view_sheet() {
    const sheet_get = () => {
      const { view } = this.view_info
      const { arch = {} } = view

      if (arch.sheet) {
        return arch.sheet
      }

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

    const meta_get = (fld, meta = {}) => {
      return { ...this.fields[fld], ...meta, name: fld }
    }

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

    const group_get = group => {
      const group_items = Object.keys(group).reduce(
        (acc, item) => {
          const node = item_get(group[item])

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

      const total_len = Object.keys(group_items.data).length

      if (total_len) {
        const last_fld = Object.keys(group_items.data)[total_len - 1]
        const last = group_items.data[last_fld]
        if (!last.y && !last.span) {
          const tname = `group_${last.x}_1`
          group_items.data[tname] = {
            name: tname,
            x: last.x,
            y: 1,
            children: {}
          }
        }
      }

      // console.log('group_items', group_items.data)

      return group_items.data
    }

    const children0 = Object.keys(sheet)
      .filter(item => item !== '_title')
      .reduce((acc, item) => {
        acc[item] = sheet[item]
        return acc
      }, {})

    const children = group_get(children0)

    const title0 = sheet._title || {}
    const title = Object.keys(title0).reduce((acc, fld) => {
      acc[fld] = meta_get(fld)
      return acc
    }, {})

    return { title, children }
  }

  arch_buttons(record, values) {
    const { view } = this.view_info
    const { arch = {} } = view

    const buttons = arch.buttons || []

    const btns = buttons.filter(btn => {
      return !this.check_invisible(btn, { record, values })
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

  header_buttons(formInfo) {
    const header = this.view_header
    const buttons = header.buttons || []
    return buttons.filter(btn => !this.check_invisible(btn, formInfo))
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

  //
  // check modifiers
  //

  viewhelp_get() {
    return new ViewHelp(this)
  }

  check_invisible(fieldInfo, kw) {
    const viewhelp = this.viewhelp_get()
    return viewhelp.check_invisible(fieldInfo, kw)
  }

  check_required(fieldInfo, kw) {
    const viewhelp = this.viewhelp_get()
    return viewhelp.check_required(fieldInfo, kw)
  }

  check_readonly(fieldInfo, kw) {
    const viewhelp = this.viewhelp_get()
    return viewhelp.check_readonly(fieldInfo, kw)
  }

  get_string(fieldInfo, kw) {
    const viewhelp = this.viewhelp_get()
    return viewhelp.get_string(fieldInfo, kw)
  }

  get_domain(fieldInfo, kw) {
    const viewhelp = this.viewhelp_get()
    return viewhelp.get_domain(fieldInfo, kw)
  }

  //
  // for record and values
  //

  merge_data(record, values) {
    // call by editmodel.set_editable
    const viewhelp = this.viewhelp_get()
    return viewhelp._merge_data(record, values)
  }

  merge_to_modifiers(record, values) {
    // call by check_modifers
    // call by o2m.merge_to_modifiers
    // call by o2m.context_get
    const viewhelp = this.viewhelp_get()
    return viewhelp.merge_to_modifiers(record, values)
  }

  merge_to_onchange(record, values) {
    // call by editmodel.onchange
    const viewhelp = this.viewhelp_get()
    return viewhelp.merge_to_onchange(record, values)
  }

  merge_to_write(record, values) {
    // call by editmodel.commit
    const viewhelp = this.viewhelp_get()
    return viewhelp.merge_to_write(record, values)
  }

  //
  // todel
  //

  // // never call
  // format_to_modifiers(record) {
  //   const viewhelp = this.viewhelp_get()
  //   return viewhelp._format_to_modifiers(record)
  // }

  // // never call
  // format_to_onchange(record) {
  //   const viewhelp = this.viewhelp_get()
  //   return viewhelp._format_to_onchange(record)
  // }

  // // never call
  // format_to_write(values, record) {
  //   const viewhelp = this.viewhelp_get()
  //   return viewhelp._format_to_write(values, record)
  // }
  //
  //
  // 命令行方式 用到该函数.
  // eslint-disable-next-line no-unused-vars
  async relation_onchange(fname, kwargs_in) {
    // const { record, values, x2m_tree, x2m_form } = kwargs_in
    // const { records: tree_records, values: tree_values } = x2m_tree
    // const { record: form_record, onchange_field, onchange_value } = x2m_form
    // const relation = this.relations[fname]
    // const x2mtree = relation.tree
    // const x2mform = relation.form
    // // const form_values_display =
    // x2mform.set_editable(form_record, { record, values }) // 单行, 子 form 可编辑,
    // // console.log('form_values_display', form_values_display)
    // // const form_onchange_res =
    // await x2mform.onchange(onchange_field, onchange_value)
    // // 子 form 编辑后 触发 onchange
    // // console.log('form_onchange_res', form_onchange_res)
    // const form_commit_result = await x2mform.commit() // 子 form 提交
    // // console.log('form_commit_result', form_commit_result)
    // const tree_commit = x2mtree.commit(
    //   tree_records,
    //   tree_values,
    //   form_commit_result
    // ) //  明细行 更新
    // // console.log('tree_commit', tree_commit)
    // const { values: tree_values2, values_onchange: tree_values_onchange } =
    //   tree_commit
    // const onchange_res = await this.onchange(fname, tree_values_onchange) // 主 form onchange
    // // console.log('onchange_res', onchange_res)
    // // console.log('return,tree_values2 ', tree_values2)
    // const tree_values_display = x2mtree.values_display(
    //   tree_records,
    //   tree_values2
    // )
    // const tree_return = {
    //   values: tree_values2,
    //   values_display: tree_values_display,
    //   values_onchange: tree_values_onchange
    // }
    // return {
    //   ...onchange_res,
    //   x2m_tree: {
    //     ...tree_return
    //   }
    // }
  }
}
