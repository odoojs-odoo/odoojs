import { X2mTree } from './x2mtree'
import { X2mKanban } from './x2mkanban'
import { X2mForm } from './x2mform'

import { BaseView } from './baseview'

import { ViewHelp } from './viewhelp'

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

  async set_lang(lang) {
    this.env._set_env_lang(lang)
    const meta = this.field_info
    const is_x2many_tree =
      ['one2many', 'many2many'].includes(meta.type) &&
      meta.widget === 'x2many_tree'

    if (!is_x2many_tree) {
      return
    }

    const { fields: raw_tree } = this._load_fields_raw('tree')
    const { fields: raw_kanban } = this._load_fields_raw('kanban')
    const { fields: raw_form } = this._load_fields_raw('form')

    const fields_raw = { ...raw_tree, ...raw_kanban, ...raw_form }

    const model = this.field_info.relation
    const Model = this.env.model(model)

    const fields_raw_list = Object.keys(fields_raw)
    const fields_odoo = await Model.fields_get(fields_raw_list, ['string'])
    const fields_in_model = BaseView.metadata_fields(model)

    const fields_in_sheet = {
      tree: raw_tree,
      kanban: raw_kanban,
      form: raw_form
    }

    function new_meta_get(fld, viewtype, fields) {
      const meta1 = fields_in_sheet[viewtype][fld] || {}
      const meta2 = fields_in_model[fld] || {}
      const meta3 = fields_odoo[fld] || {}
      const meta4 = fields[fld] || {}

      function str_get() {
        if ('string' in meta1) {
          return meta1.string
        } else if ('string' in meta2) {
          return meta2.string
        } else if ('string' in meta3) {
          return meta3.string
        } else {
          return meta4.string
        }
      }

      function sel_get() {
        if ('selection' in meta3) {
          if ('selection' in meta2) {
            return { selection: meta2.selection }
          } else {
            return { selection: meta3.selection }
          }
        } else {
          return {}
        }
      }

      return { string: str_get(), ...sel_get() }
    }

    const get_fields = viewtype => {
      const meta = this.field_info
      const views = meta.views || {}
      const view = views[viewtype] || {}
      const fields = view.fields || {}
      return { view, fields }
    }

    const get_view = viewtype => {
      const { view, fields } = get_fields(viewtype)
      const fields2 = Object.keys(fields).reduce((acc, fld) => {
        acc[fld] = { ...fields[fld], ...new_meta_get(fld, viewtype, fields) }
        return acc
      }, {})

      return { ...view, fields: fields2 }
    }

    const tree = get_view('tree')
    const kanban = get_view('kanban')
    const form = get_view('form')

    const views = { tree, kanban, form }

    this._views = views
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

  viewhelp_get() {
    return new ViewHelp(this)
  }

  get_fields_from_sheet(sheet) {
    const viewhelp = this.viewhelp_get()
    return viewhelp.get_fields_from_sheet(sheet)
  }

  _load_fields_raw(viewtype) {
    const meta = this._field_info
    const views = meta.views || {}
    const view = views[viewtype] || {}
    const sheet = (view.arch || {}).sheet || {}
    const fields2 = this.get_fields_from_sheet(sheet)

    const fields3 =
      viewtype === 'form' && !('display_name' in fields2)
        ? { display_name: {} }
        : {}

    const fields = { ...fields2, ...fields3 }

    return { view, fields }
  }

  async _load_views() {
    const meta = this.field_info

    const is_x2many_tree =
      ['one2many', 'many2many'].includes(meta.type) &&
      meta.widget === 'x2many_tree'

    if (!is_x2many_tree) {
      return { tree: {}, kanban: {}, form: {} }
    }

    const { view: treeview, fields: raw_tree } = this._load_fields_raw('tree')
    const { view: kbview, fields: raw_kanban } = this._load_fields_raw('kanban')
    const { view: formview, fields: raw_form } = this._load_fields_raw('form')
    const fields_raw = { ...raw_tree, ...raw_kanban, ...raw_form }
    const fields_meta = await this.metadata_fields_get()
    const fields_info = await this.Model.fields_get(Object.keys(fields_raw))

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
      kanban: { ...kbview, fields: fields_kanban },
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
