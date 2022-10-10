import { BaseView } from './baseview'
import { SearchView } from './searchview'

export class TreeBaseView extends BaseView {
  constructor(action_id, payload = {}) {
    const { type = 'tree', ...payload2 } = payload
    super(action_id, { ...payload2, type })
    this.searchview = new SearchView(action_id, payload2)
  }

  async load_fields() {
    const res = await this._load_fields()
    this.searchview.set_fields_by_treeview(res)
    return res
  }

  get domain_default() {
    return this.action.domain
  }

  get search_values() {
    return this.searchview.search_values
  }

  get search_items() {
    return this.searchview.search_items
  }

  async search_read() {
    await this.searchview.load_search()

    const Model = this.Model
    const fields = this.fields_list
    const domain1 = this.domain_default
    const domain2 = this.searchview.search_domain
    const domain = this.searchview.merge_domain(domain1, domain2)
    const context = this.context

    return Model.search_read({ domain, fields, context })
  }

  search_change(item, value) {
    return this.searchview.search_change(item, value)
  }

  async unlink(ids) {
    if (!ids || (Array.isArray(ids) && !ids.length)) return true
    return await this.Model.unlink(ids)
  }
}

export class TreeView extends TreeBaseView {
  constructor(action_id, payload = {}) {
    super(action_id, { ...payload, type: 'tree' })
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
