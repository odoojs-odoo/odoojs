import { BaseView } from './baseview'
import { SearchView } from './searchview'

export class TreeBaseView extends BaseView {
  constructor(action_id, payload = {}) {
    const { type = 'tree', ...payload2 } = payload
    super(action_id, { ...payload2, type })
    this.searchview = new SearchView(action_id, payload2)
    this.domain_local = []

    this._limit_default = undefined

    this._pagination = {}
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

  async read(ids) {
    if (ids.length) {
      const fields = this.fields_list
      return this.Model.read(ids, { fields })
    } else {
      return []
    }
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

  // tree. 显示 m2m 数据时. 需要刷新下.
  async relation_read(records) {
    let records2 = [...records]
    for (const fld in this.fields) {
      const meta = this.fields[fld]
      if (meta.widget === 'many2many_tags') {
        const ids = records.reduce((acc, cur) => {
          acc = [...acc, ...(cur[fld] || [])]
          return acc
        }, [])

        const ids2 = [...new Set(ids)]
        const res = await this.env.relation(meta).name_get(ids2)
        const res2 = res.reduce((acc, cur) => {
          acc[cur[0]] = cur
          return acc
        }, {})
        records2 = records2.map(item => {
          return {
            ...item,
            [`${fld}___selection`]: item[fld].map(rel => res2[rel])
          }
        })
      }
    }

    return records2
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

  async export_xlsx_all(tr) {
    const fields = Object.keys(this.fields)
      .filter(item => {
        const meta = this.fields[item]
        return !meta.invisible
      })
      .map(item => {
        const meta = this.fields[item]
        const { name, string: label, store, type } = meta
        return { name, label: tr ? tr(label) : label, store, type }
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
