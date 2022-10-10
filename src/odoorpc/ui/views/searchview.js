import { BaseView } from './baseview'

const domain_tools = {
  patch_and(domain) {
    const pick_one = src => {
      const dm = [...src]

      if (!dm.length) return [[], dm]

      const item = dm.shift()
      if (Array.isArray(item)) {
        return [[item], dm]
      } else if (item === '!') {
        const [one, todo] = pick_one(dm)
        return [[item, ...one], todo]
      } else if (item === '|' || item === '&') {
        const [one, todo] = pick_one(dm)
        const [one2, todo2] = pick_one(todo)
        return [[item, ...one, ...one2], todo2]
      } else {
        // error , never here
        return [[], []]
      }
    }

    const pick_all = src => {
      let done = []
      let todo = [...src]

      while (todo.length) {
        const [done2, todo2] = pick_one(todo)
        todo = todo2
        if (done2.length) {
          if (!done.length) done = [...done2]
          else done = ['&', ...done, ...done2]
        }
      }

      return done
    }

    const res = pick_all(domain)
    return res
  }
}

const date_tools = {
  get one_day() {
    return 1000 * 60 * 60 * 24
  },
  format(date) {
    const year = date.getFullYear().toString().padStart(4, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const today_str = `${year}-${month}-${day}`
    return today_str
  },
  increase(date, num = 1) {
    return this.format(new Date(new Date(date).getTime() + this.one_day * num))
  }

  // get today() {
  //   const today = new Date()
  //   return this.format(today)
  // },
  // get today_last_month() {
  //   const today = new Date()
  //   const date2 = new Date().setDate(10) - this.one_day * 32
  //   const last_date = new Date(new Date(date2).setDate(today.getDate()))
  //   return this.format(last_date)
  // },

  // today_for_last_month(num) {
  //   const today = new Date()
  //   const date2 = new Date().setDate(10) - this.one_day * (2 + 30 * num)
  //   const last_date = new Date(new Date(date2).setDate(today.getDate()))
  //   return this.format(last_date)
  // }
}

class SearchView1 extends BaseView {
  _fields_remove_domain(fields) {
    const meta_get = meta => {
      if (meta.type === 'many2one') {
        const meta2 = { ...meta }
        delete meta2.domain
        return meta2
      } else {
        return meta
      }
    }

    return Object.keys(fields).reduce((acc, fld) => {
      acc[fld] = meta_get(fields[fld])
      return acc
    }, {})
  }

  constructor(action_id, payload = {}) {
    super(action_id, { ...payload, type: 'search' })
    const { fields = {} } = payload

    this._fields_info = this._fields_remove_domain(fields)

    this._search_values_updated = undefined
    this._default_search_values = undefined
    this._search_many2one_selection = {}
  }

  set_fields_by_treeview(fields) {
    this._fields_info = this._fields_remove_domain(fields)
  }

  get _view_info() {
    const action = this.action_info
    // console.log(action)
    const view = action.views.search || {}
    return view
  }

  get view_arch() {
    const view = this._view_info

    const arch = view.arch || {
      fields: {
        name: {
          string: '名称',
          filter_domain: self => {
            return [['name', 'ilike', self]]
          }
        }
      },
      filters: {}
    }

    return { ...arch }
  }

  async _load_fields_for_default_values() {
    const fields = this.view_arch.fields

    const fields_to_load = Object.keys(fields).filter(
      item => !Object.keys(this.fields).includes(item)
    )

    // console.log(fields_to_load, fields, this.fields)

    const fields_get = async () => {
      if (!fields_to_load.length) {
        return this.fields
      } else {
        const model = this.res_model
        const Model = this.env.model(model)
        const info1 = await Model.fields_get(fields_to_load)
        const info = this._fields_remove_domain(info1)
        this._fields_info = { ...this.fields, ...info }
        return this.fields
      }
    }

    const fields2 = await fields_get()
    const fields3 = Object.keys(fields2).reduce((acc, cur) => {
      acc[cur] = { ...fields2[cur], ...(fields[cur] || {}) }
      return acc
    }, {})

    this._fields_info = fields3

    return fields3
  }

  _default_values_get() {
    const ctx = this.context

    const values = Object.keys(ctx)
      .filter(item => item.slice(0, 14) === 'search_default')
      .reduce((acc, cur) => {
        acc[cur.slice(15)] = ctx[cur]
        return acc
      }, {})

    return values
  }

  async load_default_values() {
    if (this._default_search_values) {
      return this._default_search_values
    }

    const values = this._default_values_get()
    const fields = await this._load_fields_for_default_values()

    // console.log(fields)

    const search_defaults = {}
    for (const item in values) {
      const meta = fields[item] || {}
      if (meta.type === 'selection') {
        search_defaults[item] = meta.selection.filter(
          elm => elm[0] === values[item]
        )
      } else if (meta.type === 'many2one') {
        const val = values[item]
        const val2 = Array.isArray(val) ? val : [val]
        const relation = this.env.relation(meta)
        const val3 = await relation.name_get(val2)
        search_defaults[item] = val3.map(item => {
          return {
            string: item[1],
            res_id: item[0]
          }
        })
      } else {
        search_defaults[item] = values[item]
      }
    }

    this._default_search_values = { ...search_defaults }
  }

  async load_many2one_seletion() {
    const fields = this.view_arch.fields

    for (const item of Object.keys(fields)) {
      const meta = this.fields[item] || {}
      if (meta.type === 'many2one') {
        if (!this._search_many2one_selection[item]) {
          const domain = meta.domain
          const res = await this.env
            .relation(meta)
            .name_search({ args: domain })
          this._search_many2one_selection = {
            ...this._search_many2one_selection,
            [item]: res
          }
        }
      }
    }
  }

  async load_search() {
    await this.load_default_values()
    await this.load_many2one_seletion()
  }

  get _search_values() {
    if (this._search_values_updated) {
      return this._search_values_updated
    }
    return this._default_search_values || {}
  }

  get values_in_filters() {
    const values = this._search_values

    const filters = this.view_arch.filters

    // console.log(filters)
    const res1 = Object.keys(filters).reduce((acc, item) => {
      const values_me = Object.keys(filters[item])
        .filter(item2 => item2 !== '__title')
        .filter(item2 => Object.keys(values).includes(item2))
        .map(item2 => {
          const one = filters[item][item2]
          if (one.date) {
            const domain_get = () => {
              if (values[item2] && values[item2].length === 2) {
                const [date1, date2] = values[item2]
                const date3 = date_tools.increase(date2)
                // console.log(date2, date3)
                return ['&', [one.date, '>=', date1], [one.date, '<', date3]]
              } else {
                return []
              }
            }

            return {
              name: item2,
              ...one,
              value: values[item2],
              domain: domain_get()
            }
          } else {
            return {
              name: item2,
              string: one.string,
              domain: domain_tools.patch_and(
                typeof one.domain === 'function'
                  ? one.domain({ env: this.env })
                  : one.domain
              )
            }
          }
        })

      const date_children = Object.keys(filters[item])
        .filter(item2 => item2 !== '__title')
        .filter(item2 => filters[item][item2].date)
        .reduce((acc3, item2) => {
          const one = filters[item][item2]
          acc3[item2] = {
            ...one,
            value: values[item2] || []
          }
          return acc3
        }, {})

      acc[item] = {
        type: 'filter',
        name: item,
        string: filters[item].__title,
        values: values_me,
        date_children
      }

      return acc
    }, {})

    return { ...res1 }
  }

  get values_in_fields() {
    const values = this._search_values
    const fields = this.view_arch.fields
    const res = Object.keys(fields).reduce((acc, item) => {
      const meta = this.fields[item] || {}

      const values_get = () => {
        if (meta.type === 'selection') {
          return []
        } else if (meta.type === 'many2one') {
          return (values[item] || []).map(val => {
            const domain_get = () => {
              if (val.res_id) {
                console.log(meta)
                if (meta.filter_domain) {
                  return domain_tools.patch_and(meta.filter_domain(val.res_id))
                } else {
                  const operator = meta.operator || '='
                  return [[item, operator, val.res_id]]
                }
              } else {
                return [[item, 'ilike', val.value]]
              }
            }

            return { ...val, domain: domain_get() }
          })
        } else {
          return (values[item] || []).map(val => {
            const domain_get = () => {
              const filter_domain = fields[item].filter_domain
              if (filter_domain && typeof filter_domain === 'function') {
                return domain_tools.patch_and(fields[item].filter_domain(val))
              } else {
                return [[item, 'ilike', val]]
              }
            }

            return { string: val, domain: domain_get() }
          })
        }
      }

      acc[item] = {
        type: 'field',
        name: item,
        meta,
        string: fields[item].string || meta.string,
        values: values_get()
      }

      return acc
    }, {})

    return res
  }

  get search_values() {
    const values_in_fields = this.values_in_fields
    const values_in_filters = this.values_in_filters
    const values2 = { ...values_in_fields, ...values_in_filters }

    // console.log('search_values', values2)
    return values2
  }

  get items_in_fields() {
    const fields = this.view_arch.fields

    const res = Object.keys(fields).reduce((acc, item) => {
      const meta = this.fields[item] || {}

      const selection_get = () => {
        if (meta.type === 'selection') {
          return []
        } else if (meta.type === 'many2one') {
          const ops = this.search_many2one_selection[item] || []
          return ops
        } else {
          return []
        }
      }

      acc[item] = {
        type: 'field',
        name: item,
        meta,
        string: fields[item].string || meta.string,
        selection: selection_get()
      }

      return acc
    }, {})

    return res
  }

  get items_in_filters() {
    const filters = this.view_arch.filters

    const res = Object.keys(filters).reduce((acc, item) => {
      const selection_me = Object.keys(filters[item])
        .filter(item2 => item2 !== '__title')
        .filter(item2 => !filters[item][item2].date)
        .map(item2 => {
          const one = filters[item][item2]
          return [item2, one.string]
        })

      const date_children = Object.keys(filters[item])
        .filter(item2 => item2 !== '__title')
        .filter(item2 => filters[item][item2].date)
        .map(item2 => {
          const one = filters[item][item2]
          return { name: item2, ...one }
        })

      acc[item] = {
        type: 'filter',
        name: item,
        string: filters[item].__title,
        selection: selection_me,
        date_children: date_children
      }

      return acc
    }, {})

    // console.log('items_in_filters', res)

    return res
  }

  get search_items() {
    const items1 = this.items_in_fields
    const items2 = this.items_in_filters
    return { ...items1, ...items2 }
  }

  get search_many2one_selection() {
    return this._search_many2one_selection
  }
}

export class SearchView extends SearchView1 {
  constructor(action_id, payload = {}) {
    super(action_id, { ...payload })
  }

  get search_domain() {
    const search_values = this.search_values
    const val2 = Object.values(search_values).reduce((acc, cur) => {
      const next = cur.values.reduce((acc2, cur2) => {
        console.log(cur2)
        if (acc2.length) {
          acc2 = ['|', ...acc2, ...cur2.domain]
        } else {
          acc2 = [...acc2, ...cur2.domain]
        }

        return acc2
      }, [])

      if (acc.length && next.length) {
        acc = ['&', ...acc, ...next]
      } else {
        acc = [...acc, ...next]
      }

      return acc
    }, [])

    return val2
  }

  merge_domain(domain1, domain2) {
    if (!domain1.length) {
      return domain2
    } else if (!domain2.length) {
      return domain1
    } else {
      return ['&', ...domain1, ...domain2]
    }
  }

  get search_field() {
    const view = this._view_info
    const all_fields_keys = Object.keys(this.view_arch.fields)
    const fname = all_fields_keys[0]
    const default_field = view.fields[fname]
    return { ...default_field, name: fname }
  }

  _search_clear(value) {
    const values = { ...this._search_values }
    if (value.type === 'field') {
      delete values[value.name]
    } else if (value.type === 'filter') {
      value.values.forEach(item => {
        delete values[item.name]
      })
    } else {
      //
    }

    this._search_values_updated = { ...values }

    return this.search_values
  }

  search_change(item, value) {
    if (!value) {
      return this._search_clear(item)
    }

    console.log('search_change', item, value, this._search_values)

    const values = { ...this._search_values }

    if (item.type === 'field') {
      if (item.meta.type === 'selection') {
        //
      } else if (item.meta.type === 'many2one') {
        values[item.name] = [...value]
      } else {
        values[item.name] = [...value]
      }
    } else if (item.type === 'filter') {
      const all_vals = item.selection.map(it => it[0])
      all_vals.forEach(it => {
        if (value.includes(it)) {
          values[it] = 1
        } else {
          delete values[it]
        }
      })
    } else if (item.date) {
      console.log(item, value)
      values[item.name] = [...value]
    } else {
      //
    }

    //

    this._search_values_updated = { ...values }

    console.log(this.search_values)
    return this.search_values
  }
}
