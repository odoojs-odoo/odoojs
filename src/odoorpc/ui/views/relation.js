import { X2mTree } from './x2mtree'
import { X2mKanban } from './x2mkanban'
import { X2mForm } from './x2mform'

import { BaseView } from './baseview'

// call by image_url_get
const date_tools = {
  now_unique() {
    const date = new Date()
    const year = date.getFullYear().toString().padStart(4, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')

    const hour = date.getHours().toString().padStart(2, '0')
    const minute = date.getMinutes().toString().padStart(2, '0')
    const second = date.getSeconds().toString().padStart(2, '0')

    const today_str = `${year}${month}${day}${hour}${minute}${second}`
    return today_str
  }
}

export class Field {
  constructor(field_info, payload) {
    const { env } = payload
    this._field_info = field_info
    this._env = env
  }

  get field_info() {
    return this._field_info
  }

  get env() {
    return this._env
  }

  formview_get(formInfo) {
    // todo 检查是 form 还是 o2mform
    if (formInfo.viewInfo) {
      const { fields, viewInfo } = formInfo
      const { action } = viewInfo
      return this.env.formview(action, { fields })
    } else if (formInfo.relationInfo) {
      const info = formInfo.relationInfo
      const rel = this.env.relation(info)
      return rel.form
    } else {
      return undefined
    }
  }
  check_readonly(formInfo) {
    const meta = this._field_info
    const formview = this.formview_get(formInfo)

    if (!formview) {
      return true
    }

    return formview.check_readonly(meta, formInfo)
  }

  // todo check
  image_url_get(res_id) {
    // /web/image?model=res.partner&id=1&field=avatar_128&unique=20220618071125
    // const baseURL = this.env.baseURL
    // const odooImageURL = '/web/image'
    // const pview = this.parent
    // const model = pview.res_model
    // const fname = this.field_info.name
    // const unique = date_tools.now_unique()
    // const url = `${baseURL}${odooImageURL}?model=${model}&id=${res_id}&field=${fname}&unique=${unique}`
    // console.log(odooImageURL, model, fname, unique, url)
    // return url
  }
}

export class Relation extends Field {
  constructor(field_info, payload) {
    super(field_info, payload)

    this._views = {
      tree: { fields: {} },
      kanban: { fields: {} },
      form: { fields: {} }
    }
  }

  get field_info() {
    const views = this._field_info.views || {}

    const merge_view = viewtype => {
      const view1 = views[viewtype] || {}
      const view2 = this._views[viewtype] || {}
      return {
        ...view1,
        ...view2,
        fields: { ...(view1.fields || {}), ...(view2.fields || {}) }
      }
    }

    const kanbanview = merge_view('kanban')
    const formview = merge_view('form')
    const treeview = merge_view('tree')
    const views2 = { kanban: kanbanview, form: formview, tree: treeview }
    return { ...this._field_info, views: views2 }
  }

  get Model() {
    const model = this.field_info.relation
    return this.env.model(model)
  }

  async metadata_fields_get() {
    const model = this.field_info.relation
    const fields = BaseView.metadata_fields(model)

    const fields2 = {}
    for (const fld of Object.keys(fields)) {
      const meta = fields[fld]
      if (meta.domain_creater) {
        const domain = await meta.domain_creater({ env: this.env })
        fields2[fld] = { ...meta, domain }
      } else {
        fields2[fld] = meta
      }
    }
    return fields2
  }

  get_fields_from_sheet(sheet) {
    function is_tag(str) {
      if (!str[0] === '_') return false

      const tag = str.split('_')[1]
      if (tag === 'attr') return false
      if (tag === 'label') return false

      return tag
    }

    function is_field(str) {
      return str[0] !== '_'
    }

    function find_field(node) {
      return Object.keys(node).reduce((acc, cur) => {
        if (is_field(cur)) {
          acc[cur] = node[cur]
        } else if (is_tag(cur)) {
          const children = find_field(node[cur])
          acc = { ...acc, ...children }
        }

        return acc
      }, {})
    }

    return find_field(sheet)
  }

  async _load_views() {
    const meta = this.field_info

    const is_x2many_tree =
      ['one2many', 'many2many'].includes(meta.type) &&
      meta.widget === 'x2many_tree'

    if (!is_x2many_tree) {
      return { tree: {}, kanban: {}, form: {} }
    }

    const views = meta.views || {}
    const treeview = views.tree || {}
    const raw_tree = treeview.fields || { display_name: {} }
    const kanbanview = views.kanban || {}
    const raw_kanban = kanbanview.fields || { display_name: {} }

    const formview = views.form || {}

    const raw_form_get_from_sheet = () => {
      const sheet = (formview.arch || {}).sheet || {}
      return this.get_fields_from_sheet(sheet)
    }

    const raw_form_get = () => {
      const fs = raw_form_get_from_sheet()

      const fs2 = formview.fields || {}

      return { display_name: {}, ...fs2, ...fs }
    }

    const raw_form = raw_form_get()

    // const formview = views.form || {}
    // const raw_form = { display_name: {}, ...(formview.fields || {}) }

    const fields_raw = { ...raw_tree, ...raw_kanban, ...raw_form }

    const fields_meta = await this.metadata_fields_get()

    const fields_info = await this.Model.fields_get(Object.keys(fields_raw))
    const { readonly: readonly_for_write } = fields_info
    fields_info.readonly_for_write = readonly_for_write
    const fields_tree = Object.keys(raw_tree).reduce((acc, cur) => {
      acc[cur] = {
        ...fields_info[cur],
        ...(fields_meta[cur] || {}),
        ...(raw_tree[cur] || {})
      }
      return acc
    }, {})

    const fields_kanban = Object.keys(raw_kanban).reduce((acc, cur) => {
      acc[cur] = {
        ...fields_info[cur],
        ...(fields_meta[cur] || {}),
        ...(raw_kanban[cur] || {})
      }
      return acc
    }, {})

    const fields_form = Object.keys(raw_form).reduce((acc, cur) => {
      acc[cur] = {
        ...fields_info[cur],
        ...(fields_meta[cur] || {}),
        ...(raw_form[cur] || {})
      }
      return acc
    }, {})

    const views_info = {
      tree: { ...treeview, fields: fields_tree },
      kanban: { ...kanbanview, fields: fields_kanban },
      form: { ...formview, fields: fields_form }
    }

    return views_info
  }

  async load_views() {
    const views = await this._load_views()
    this._views = views
    return views
  }

  get kanban() {
    return new X2mKanban(this.field_info, { env: this.env })
  }

  get tree() {
    return new X2mTree(this.field_info, { env: this.env })
  }

  get form() {
    return new X2mForm(this.field_info, { env: this.env })
  }

  async name_get(ids) {
    const res = await this.Model.name_get(ids)
    return res
  }

  get_domain(formInfo) {
    const meta = this._field_info
    const formview = this.formview_get(formInfo)
    if (!formview) {
      return []
    }

    return formview.get_domain(meta, formInfo)
  }

  async load_select_options(formInfo, kwargs_in = {}) {
    const domain = this.get_domain(formInfo)

    const { args = [], limit = 8, ...kwargs } = kwargs_in
    return this.Model.name_search({
      args: [...args, ...domain],
      limit,
      ...kwargs
    })
  }

  async name_search(kwargs = {}) {
    return this.Model.name_search({ ...kwargs, limit: 0 })
  }

  async web_content(res_id, filename) {
    const res_model = this.field_info.relation
    const field = 'datas'
    const filename_field = 'name'
    const download = true
    const kw1 = { model: res_model, id: res_id, field }
    const kw2 = { filename, filename_field, download }
    const kw = { ...kw1, ...kw2 }
    // console.log('onDownload', kw)
    const res = await this.env.web.content(kw)
    return res
  }
}
