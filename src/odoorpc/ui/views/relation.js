import { X2mTree } from './x2mtree'
import { X2mKanban } from './x2mkanban'
import { X2mForm } from './x2mform'

import { FormView } from './formview'

const _get_readonly = (meta, state) => {
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
    const { env, parent } = payload
    this._field_info = field_info
    this._env = env
    this._parent_info = parent
  }

  get field_info() {
    return this._field_info
  }

  get env() {
    return this._env
  }

  readonly_get({ record }) {
    const meta = this._field_info

    if ('readonly2' in meta) {
      if (typeof meta.readonly2 === 'function') {
        return meta.readonly2({ record })
      } else {
        return meta.readonly2
      }
    }

    if (typeof meta.readonly === 'function') {
      return meta.readonly({ record })
    }

    return _get_readonly(this._field_info, record.state)
  }

  get parent_info() {
    return this._parent_info
  }

  get parent() {
    const info = this.parent_info
    const { action, view } = info
    const { fields } = view
    const env = this.env
    return new FormView(action, { env, fields })
  }

  image_url_get(res_id) {
    // /web/image?model=res.partner&id=1&field=avatar_128&unique=20220618071125

    const baseURL = this.env.baseURL
    const odooImageURL = '/web/image'

    const pview = this.parent
    const model = pview.res_model
    const fname = this.field_info.name

    const unique = date_tools.now_unique()
    const url = `${baseURL}${odooImageURL}?model=${model}&id=${res_id}&field=${fname}&unique=${unique}`

    console.log(odooImageURL, model, fname, unique, url)

    return url
  }
}

export class Relation extends Field {
  constructor(field_info, payload) {
    super(field_info, payload)

    this._views = {}
  }

  get field_info() {
    const views = this._field_info.views || {}
    return { ...this._field_info, views: { ...views, ...this._views } }
  }

  get Model() {
    const model = this.field_info.relation
    return this.env.model(model)
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
    const raw_form = formview.fields || { display_name: {} }

    const fields_raw = { ...raw_tree, ...raw_kanban, ...raw_form }

    const fields_info = await this.Model.fields_get(Object.keys(fields_raw))

    const fields_tree = Object.keys(raw_tree).reduce((acc, cur) => {
      acc[cur] = { ...fields_info[cur], ...(raw_tree[cur] || {}) }
      return acc
    }, {})

    const fields_kanban = Object.keys(raw_kanban).reduce((acc, cur) => {
      acc[cur] = { ...fields_info[cur], ...(raw_kanban[cur] || {}) }
      return acc
    }, {})

    const fields_form = Object.keys(raw_form).reduce((acc, cur) => {
      acc[cur] = { ...fields_info[cur], ...(raw_form[cur] || {}) }
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
    return new X2mKanban(this.field_info, {
      env: this.env,
      parent: this._parent_info
    })
  }

  get tree() {
    return new X2mTree(this.field_info, {
      env: this.env,
      parent: this._parent_info
    })
  }

  get form() {
    return new X2mForm(this.field_info, {
      env: this.env,
      parent: this._parent_info
    })
  }

  async name_get(ids) {
    const res = await this.Model.name_get(ids)
    return res
  }

  async load_select_options(kwargs_in = {}) {
    // console.log(this.field_info)
    console.log('load_select_options', kwargs_in)

    const { args = [], record = {} } = kwargs_in

    const domain_get = () => {
      const domain = this.field_info.domain || []
      if (typeof domain === 'function') {
        return domain({ record })
      } else {
        return domain
      }
    }

    const domain = domain_get()
    const kwargs = { ...kwargs_in }
    delete kwargs.record

    return this.Model.name_search({
      ...kwargs,
      args: [...args, ...domain],
      limit: 0
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
