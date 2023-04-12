import { BaseView } from './baseview'
import { SearchView } from './searchview'

class TreeModel extends BaseView {
  constructor(action_id, payload = {}) {
    const { type = 'tree', ...payload2 } = payload
    super(action_id, { ...payload2, type })
    this.searchview = new SearchView(action_id, payload)
  }

  async set_lang(lang) {
    const res = await super.set_lang(lang)
    this.searchview.set_fields_by_treeview(res)
    return res
  }
  async load_fields() {
    const res = await this._load_fields()
    this.searchview.set_fields_by_treeview(res)
    return res
  }

  search_change(item, value) {
    return this.searchview.search_change(item, value)
  }

  get search_values() {
    return this.searchview.search_values
  }

  get search_items() {
    return this.searchview.search_items
  }

  async read(ids) {
    if (ids.length) {
      const fields = this.fields_list
      return this.Model.read(ids, { fields })
    } else {
      return []
    }
  }

  async unlink(ids) {
    if (!ids || (Array.isArray(ids) && !ids.length)) return true
    return await this.Model.unlink(ids)
  }

  async export_xlsx_all() {
    const fields = Object.keys(this.fields)
      .filter(item => {
        const meta = this.fields[item]
        return !meta.invisible
      })
      .map(item => {
        const meta = this.fields[item]
        const { name, string: label, store, type } = meta
        return { name, label, store, type }
      })

    console.log(fields)

    const ids = false
    const domain = this.domain_default
    const groupby = []
    const import_compat = false
    // const context = this._context({ context, action })

    const model = this.res_model

    const data = {
      model,
      fields,
      ids,
      domain,
      groupby,
      // context: ctx,
      import_compat
    }

    const res = await this.env.web.export.xlsx(data)
    // console.log(res)

    return this.download(res)
  }
}

export class TreeBaseView extends TreeModel {
  constructor(action_id, payload = {}) {
    super(action_id, { ...payload })
    this.domain_local = []
    this._limit_default = undefined
    this._pagination = {}
  }

  get domain_default() {
    return this.action.domain
  }

  get limit_default() {
    if (!this._limit_default) {
      this._limit_default = this.action.limit || 10
    }

    return this._limit_default
  }

  set limit_default(val) {
    if (val) {
      this._limit_default = val
    } else {
      this._limit_default = this.action.limit || 10
    }
  }

  get pagination() {
    const { current, pageSize } = this._pagination
    return {
      ...this._pagination,
      current: current || 1,
      pageSize: pageSize || this.limit_default
    }
  }

  set pagination(payload) {
    const { current, total, pageSize, pageSizeOptions } = payload
    this._pagination = {
      ...this._pagination,
      ...payload,
      current: current || 1,
      pageSize: pageSize,
      total: total || 0,
      pageSizeOptions: pageSizeOptions || ['10', '20', '30', '40'],
      showSizeChanger: true
    }
  }

  search_change(item, value) {
    const res = this.searchview.search_change(item, value)
    this._pagination = { ...this._pagination, current: 1, total: 0 }

    return res
  }

  // pagination: {
  //   // current
  //   // position: 'top'
  //   // total: 0,
  //   // pageSize: PageSize
  //   // pageSizeOptions: ['10', '20', '30', '40']
  // }

  get saerch_args() {
    const { current, pageSize } = this.pagination
    const limit = pageSize || 10
    const offset_get = () => {
      if (current <= 1) {
        return 0
      } else {
        return limit * (current - 1)
      }
    }

    const offset = offset_get()
    // console.log([current, limit, offset])
    return { limit, offset }
  }

  async search_read() {
    await this.searchview.load_search()

    const Model = this.Model
    const fields = this.fields_list
    const domain1 = this.domain_default
    const domain2 = this.searchview.search_domain
    const domain3 = this.domain_local
    const domain = this.searchview.merge_domain(domain1, domain2, domain3)

    const context = this.context
    const { limit, offset } = this.saerch_args

    const kwargs = { domain, fields, limit, offset, context }
    const res = await Model.web_search_read(kwargs)
    const { length, records } = res

    // console.log(res)
    this.pagination = { ...this.pagination, total: length }
    // console.log(this.pagination)

    return records
  }
}

export class TreeView extends TreeBaseView {
  constructor(action_id, payload = {}) {
    super(action_id, { ...payload, type: 'tree' })
  }

  get arch_sheet() {
    const action = this.action_info
    const view = action.views.tree

    const { arch = {} } = view
    const { sheet = {} } = arch
    return sheet
  }

  check_invisible(fieldInfo) {
    const viewhelp = this.viewhelp_get()
    return viewhelp.check_invisible_for_tree(fieldInfo)
  }

  get_string(fieldInfo) {
    const viewhelp = this.viewhelp_get()
    return viewhelp.get_string(fieldInfo)
  }

  view_sheet() {
    const viewhelp = this.viewhelp_get()
    const sheet = viewhelp.view_sheet({})

    return sheet
  }

  // get_columns() {
  //   const from_fields = () => {
  //     const fields = this.fields
  //     const cols = Object.keys(fields).reduce((acc, fld) => {
  //       const meta = fields[fld]
  //       const invs = this.check_invisible(meta)
  //       if (!invs) {
  //         acc[fld] = { ...meta, string: this.get_string(meta) }
  //       }
  //       return acc
  //     }, {})

  //     return cols
  //   }

  //   const cols = from_fields()

  //   const sheet = this.view_sheet()
  //   return sheet.children
  // }
}
