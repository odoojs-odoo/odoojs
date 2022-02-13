import { ViewBase } from './base_view'
import { Search } from './search_view'

import rpc from '@/odoorpc'

const PageSize = 10

// eslint-disable-next-line no-unused-vars
const cp = val => JSON.parse(JSON.stringify(val))

export class Tree extends ViewBase {
  constructor() {
    super()
  }

  static _fields_list({ view }) {
    //
    const { fields } = view
    return Object.keys(fields)
  }

  static view_node({ action, views }, viewType = 'tree') {
    return super.view_node({ action, views }, viewType)
  }

  static async web_read_group(info, { pagination, search, groupby }) {
    const { current = 1, pageSize = 2 } = pagination || {}
    const limit = pageSize
    const offset = (current - 1) * pageSize

    const domain1 = this._default_domain(info)

    // info TODO
    const domain2 = Search.to_domain(info, search)
    const domain = [...domain1, ...domain2]

    const { length, groups } = await this._web_read_group(info, {
      domain,
      groupby,
      offset,
      limit
    })

    return {
      pagination: {
        current: offset / limit + 1,
        total: length,
        pageSize: limit
      },
      groupby,
      records: groups
    }
  }

  static async _web_read_group(info, { groupby, ...kwargs }) {
    const Model = this.Model(info)
    const fields = this._fields_list(info)
    const { length, groups } = await Model.web_read_group({
      ...kwargs,
      fields,
      groupby
    })

    const fields_meta = this._fields_all(info)

    // key: item[grp1], children: []
    const grp1 = groupby[0]
    // console.log(fields_meta, grp1)

    const fname = grp1.split(':')[0]
    const meta = fields_meta[fname]

    // console.log('groups', groups)

    const _keyval_get = item => {
      const keyval2 = item[grp1]
      if (meta.type === 'many2one') {
        return keyval2 || [false, '未定义的']
      } else if (meta.type === 'selection') {
        const one = meta.selection.find(it => it[0] === keyval2)
        return one || [keyval2, '未定义的']
      } else {
        return [keyval2, keyval2]
      }
    }

    const groups2 = groups.map(item => {
      const keyval = _keyval_get(item)

      const [_key, _keyval] = keyval

      return {
        ...item,
        _groupby: grp1,
        id: `${grp1},${_key}`,
        _keyval,
        _count: item[`${fname}_count`],
        children: []
      }
    })

    return { length, groups: groups2 }
  }

  static async web_read_group2(info, { groupby, record }) {
    const grp = record._groupby
    const fname = grp.split(':')[0]
    const count = record[`${fname}_count`]
    // conut 用于 分页

    const index = groupby.findIndex(item => item === grp)

    const next = groupby.slice(index + 1)
    // console.log('grp2', groupby, grp, index, count, next, record)

    const domain = record.__domain

    if (next.length === 0) {
      // return detail
      const Model = this.Model(info)
      const fields = this._fields_list(info)
      const records = await Model.search_read({ domain, fields })
      return {
        pagination: { current: 1, total: count, pageSize: 99999999 },
        records
      }
    } else {
      // return group
      const { length, groups } = await this._web_read_group(info, {
        domain,
        groupby: next
      })

      return {
        pagination: {
          current: 1,
          total: length,
          pageSize: 99999999
        },

        records: groups
      }
    }
  }

  static async web_search_read(info, { pagination, search }) {
    const Model = this.Model(info)

    const { current = 1, pageSize = PageSize } = pagination || {}
    const limit = pageSize
    const offset = (current - 1) * pageSize
    const fields = this._fields_list(info)

    const domain1 = this._default_domain(info)
    // console.log('xxxx,web_search_read,', domain1, search)
    // info TODO
    const domain2 = Search.to_domain(info, search)

    const domain = [...domain1, ...domain2]

    const res = await Model.web_search_read({ domain, fields, offset, limit })

    const { length, records } = res

    return {
      pagination: {
        current: offset / limit + 1,
        total: length,
        pageSize: limit
      },
      records
    }
  }

  static async load_data(info, kwargs) {
    const { context, action, views, view } = info
    const { search } = kwargs
    // console.log('search_read', search)
    const groupby = Search.to_groupby({ views }, search)

    if (groupby.length) {
      const res = await this.web_read_group(info, { ...kwargs, groupby })

      return res
    } else {
      const res = await this.web_search_read(info, kwargs)

      return res
    }
  }
}

export class List extends Tree {
  constructor() {
    super()
  }

  static view_node({ action, views }) {
    return super.view_node({ action, views }, 'list')
  }

  static _fields_list({ views }) {
    const view = views.fields_views.list
    const { fields } = view
    return Object.keys(fields)
  }

  static async web_search_read(info, kwargs) {
    const view = info.views.fields_views.list
    return super.web_search_read({ ...info, view }, kwargs)
  }

  static async load_data(info, kwargs) {
    const view = info.views.fields_views.list
    return super.load_data({ ...info, view }, kwargs)
  }

  static async action_call({ context, action }, action_todo, { active_ids }) {
    // console.log(cp(context), cp(action_todo), active_ids)
    const ctx_action = this._context({ context, action })
    const ctx_active = {
      // TODO: active_domain取自 当前 domain 而非 默认domain
      active_domain: this._default_domain({ context, action }),
      active_id: active_ids[0],
      active_ids: active_ids,
      active_model: action.res_model
    }
    const additional_context = { ...ctx_action, ...ctx_active }

    // console.log(action_todo.id, additional_context)
    return this.load_action(action_todo.id, { additional_context })
  }

  static async unlink({ context, action }, ids) {
    if (!ids || (Array.isArray(ids) && !ids.length)) return true
    return await this.Model({ context, action }).unlink(ids)
  }

  static async unarchive({ context, action }, ids) {
    if (!ids.length) return true
    return await this.Model({ context, action }).action_unarchive(ids)
  }

  static async archive({ context, action }, ids) {
    if (!ids.length) return true
    return await this.Model({ context, action }).action_archive(ids)
  }

  static async export_xlsx_all({ context, action, views }) {
    const model = action.res_model
    const node = this.view_node({ action, views })
    const fields_meta = views.fields_views.list.fields

    const fields = node.children
      .filter(
        item =>
          !item.attrs.invisible &&
          item.attrs.optional !== 'hide' &&
          item.tagName === 'field'
      )
      .map(item => {
        const { name, string } = item.attrs
        const { store, type, string: string2 } = fields_meta[name]
        return { name, label: string || string2, store, type }
      })

    const ids = false
    const domain = this._default_domain({ context, action })
    const groupby = []

    const ctx = this._context({ context, action })
    const import_compat = false
    const data = {
      model,
      fields,
      ids,
      domain,
      groupby,
      context: ctx,
      import_compat
    }

    const res = await rpc.web.export.xlsx(data)
    console.log(res)

    return this.download(res)
  }
}
