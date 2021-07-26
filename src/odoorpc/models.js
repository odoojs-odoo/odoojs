import { Field } from './fields'

import { is_virtual_id } from './utils'

class MetaModel {
  constructor() {
    //
  }

  static get _name() {
    return this._model
  }

  static get env() {
    return this._env
  }

  get env() {
    return this.constructor.env
  }

  static with_context(kwargs = {}, context) {
    const context2 = context ? context : this.env.context
    const context3 = { ...context2, ...kwargs }
    return this.with_env(this.env.copy(context3))
  }

  static with_env(env) {
    const OldModel = this
    class NewModel extends OldModel {
      constructor(...args) {
        super(...args)
      }
    }

    NewModel._env = env
    return NewModel
  }

  static async execute_kw(method, args = [], kwargs = {}) {
    const kwargs2 = { ...kwargs }

    if (!Object.keys(kwargs).includes('context')) {
      kwargs2.context = this.env.context
    }

    const payload = { model: this._name, method, args, kwargs: kwargs2 }
    return this._odoo.web.dataset.call_kw(payload)
  }

  static async button_execute_kw(method, args = [], kwargs = {}) {
    const kwargs2 = { ...kwargs }

    if (!Object.keys(kwargs).includes('context')) {
      kwargs2.context = this.env.context
    }

    const payload = { model: this._name, method, args, kwargs: kwargs2 }
    return this._odoo.web.dataset.call_button(payload)
  }

  static async button_execute(method, ...args) {
    return this.button_execute_kw(method, args, {})
  }

  static async execute(method, ...args) {
    return this.execute_kw(method, args, {})
  }

  static async fields_get(allfields, attributes) {
    const method = 'fields_get'
    return this.execute(method, allfields, attributes)
  }

  static async search(domain, kwargs = {}) {
    const method = 'search'
    return this.execute_kw(method, [domain], kwargs)
  }

  static async web_search_read(kwargs = {}) {
    return this.execute_kw('web_search_read', [], kwargs)
  }

  static async search_read(kwargs = {}) {
    return this.execute_kw('search_read', [], kwargs)
  }

  static async read(ids, kwargs = {}) {
    const method = 'read'
    const get_args_kwargs = () => {
      if (Array.isArray(kwargs)) {
        return [[ids, kwargs], {}]
      } else {
        const { fields = [] } = kwargs
        const kwargs2 = { ...kwargs }
        delete kwargs2.fields
        return [[ids, fields], kwargs2]
      }
    }

    const [args, kwargs2] = get_args_kwargs()

    return this.execute_kw(method, args, kwargs2)
  }

  static async write(rid, vals) {
    const method = 'write'
    return this.execute(method, rid, vals)
  }

  static async create(vals) {
    return this.execute('create', vals)
  }

  static async unlink(rid) {
    const method = 'unlink'
    return this.execute(method, rid)
  }

  static async default_get(fields) {
    return this.execute('default_get', fields)
  }

  static async name_search(kwargs = {}) {
    // const { name, args, operator, limit } = kwargs
    return this.execute_kw('name_search', [], kwargs)
  }

  static async name_get(ids) {
    return this.execute('name_get', ids)
  }

  static async onchange(ids, values, field_name, field_onchange) {
    const session_info = this._odoo.session_info
    const server_version_info = session_info.server_version_info
    const version = server_version_info[0]
    const is_call_default =
      (!field_name || (Array.isArray(field_name) && !field_name.length)) &&
      version == 13

    // console.log(version, is_call_default)
    if (is_call_default) {
      return this.default_get_onchange(values, field_onchange)
    } else {
      return this.execute('onchange', ids, values, field_name, field_onchange)
    }
  }

  static async default_get_onchange(values, field_onchange) {
    const fields = Object.keys(field_onchange).filter(
      fld => fld.split('.').length === 1
    )

    // console.log([field_onchange, fields])

    const default_get1 = await this.default_get(fields)
    // console.log([field_onchange, fields])

    const _get_default = col => {
      const meta = this._fields[col]

      if (['many2many'].includes(meta.type)) {
        return [[6, false, []]]
      } else if (['one2many'].includes(meta.type)) {
        return []
      } else if (['float', 'integer', 'monetary'].includes(meta.type)) {
        return 0
      } else if (['text', 'html'].includes(meta.type)) {
        return ''
      }
      return false
    }

    const values_onchange2 = fields.reduce((acc, cur) => {
      acc[cur] = _get_default(cur)
      return acc
    }, {})

    const values_onchange = { ...values_onchange2, ...values, ...default_get1 }

    const field_name = fields
    const args = [[], values_onchange, field_name, field_onchange]
    const onchange = await this.execute('onchange', ...args)

    // console.log(fields, default_get1, onchange)

    // console.log('default get 2', onchange)

    // # TBD: default_get 里面 可能有 m2o o2m 需要处理
    // default_get, m2o 返回值 是 id, 需要 补充上 display_name
    const default_get2 = {}

    for (const col of Object.keys(default_get1)) {
      const meta = this._fields[col]
      // console.log('default get 2', col, meta, default_get1)

      // TBD, res.config.settings 出现了  meta 为空的 情况

      if (meta && meta.relation && meta.type === 'many2one') {
        const ref_val = default_get1[col]

        if (ref_val) {
          const ref_ids = Array.isArray(ref_val) ? ref_val : [ref_val]
          const domain = [['id', 'in', ref_ids]]
          const ref_records = await this.env
            .model(meta.relation)
            .execute_kw('name_search', [], { args: domain })

          const ref_rec = ref_records[0]

          default_get2[col] = [...ref_rec]
        } else {
          default_get2[col] = default_get1[col]
        }
      } else {
        default_get2[col] = default_get1[col]
      }
    }

    // const values_ret = { ...values, ...default_get2, ...onchange.value }
    const values_ret = { ...default_get2, ...onchange.value }
    const onchange2 = { ...onchange, value: values_ret }

    // console.log('default get 3', onchange2)

    return onchange2
  }
}

MetaModel._env = undefined
MetaModel._odoo = undefined
MetaModel._model = undefined

const _normalize_ids = ids => {
  if (!ids) {
    return []
  }

  if (Array.isArray(ids)) {
    return [...ids]
  }

  return [ids]
}

class BaseModel extends MetaModel {
  constructor(payload = {}) {
    super()

    const { fields, from_record = {} } = payload
    this._fields = fields
    this._from_record = from_record
    this._from_model = from_record.model
    this._from_field = from_record.field
    this._values = {}
    this._values_to_write = {}
    this._store_relations = {}
    this._columns = this._init_columns(fields)
    this._ids = []
  }

  copy() {
    const fields = this._fields
    const from_record = this._from_record
    const record = new this.constructor({ fields, from_record })
    record._ids = [...this._ids]
    record._values = JSON.parse(JSON.stringify(this._values))
    record._values_to_write = JSON.parse(JSON.stringify(this._values_to_write))
    const store2 = Object.keys(this._store_relations).reduce((acc, rid) => {
      const one_row = this._store_relations[rid]
      const one_row2 = Object.keys(one_row).reduce((acc2, fld) => {
        return { ...acc2, [fld]: one_row[fld].copy() }
      }, {})
      return { ...acc, [rid]: one_row2 }
    }, {})
    record._store_relations = store2
    return record
  }

  get from_model() {
    return this._from_model
  }

  get from_field() {
    return this._from_field
  }

  _init_columns(fields) {
    return Object.keys(fields).reduce((acc, fld) => {
      acc[fld] = new Field({ record: this, name: fld })
      return acc
    }, {})
  }

  get fields() {
    return this._fields
  }

  get columns() {
    // 所有的 字段, 数据初始化时 设置
    return this._columns
  }

  get ids() {
    return this._ids
  }

  static async _get_fields_dict(fields_in = []) {
    if (Array.isArray(fields_in)) {
      const fgs = await this.fields_get(fields_in)
      return fgs
    } else {
      return fields_in
    }
  }

  static async create_record(payload = {}) {
    const { fields: fields_in } = payload
    const fields_dict = await this._get_fields_dict(fields_in)

    this._updata_fields(fields_dict)

    const record = new this({ ...payload, fields: fields_dict })
    return record
  }

  static async browse(ids, payload = {}) {
    const record = await this.create_record(payload)
    const fields_list = Object.keys(record.fields)
    // if (ids && Array.isArray(ids) && ids.length) {
    // } else {
    //   //
    // }

    const res = await this.read(ids, { fields: fields_list })
    record._init_data(res)

    return record
  }

  _init_data(res) {
    this._ids = _normalize_ids(res.map(item => item.id))
    this._values = {}
    this._values_to_write = {}
    this._store_relations = {}

    Object.keys(this.columns).forEach(item => {
      const col = this.columns[item]
      res.forEach(one => {
        col.set_by_init(one.id, one[col.fname])
      })
    })
  }

  set_values_by_onchange(rid, vals) {
    // 仅仅 被 parent 调用
    // parent 其他 字段 onchange 之后, 更新 o2m字段时, 走到这里

    if (!this._ids.includes(rid)) {
      this._ids = [...this._ids, rid]
    }

    Object.keys(vals).forEach(item => {
      const col = this.columns[item]
      if (col) {
        col.set_value_by_onchange(rid, vals[item])
      } else {
        console.log('Throw Error, ', `${item} is undefined in columns`)
        // throw `${item} is undefined in columns`
      }
    })
  }

  get_values(rid) {
    const values_init = { id: rid }
    return Object.keys(this.columns).reduce((acc, cur) => {
      const col = this.columns[cur] || {}
      const values = col.get_values_display(rid) || {}
      acc = { ...acc, ...values }
      return acc
    }, values_init)
  }

  get_values_onchange(rid, for_parent) {
    // 给 onchange 事件准备参数用的 数据
    return Object.keys(this.columns).reduce((acc, cur) => {
      // console.log('sssss,', this, cur, this.fields, this.columns)
      const col = this.columns[cur]
      const for_onchange = 1
      const value = col.get_value_for_server(rid, { for_onchange, for_parent })
      return { ...acc, [cur]: value }
    }, {})
  }

  get_values_modifiers(rid) {
    // 给 计算 modifiers  准备数据
    return Object.keys(this.columns).reduce((acc, cur) => {
      // console.log('sssss,', this, cur, this.fields, this.columns)
      const col = this.columns[cur]
      const for_modifiers = 1
      const value = col.get_value_for_server(rid, { for_modifiers })
      return { ...acc, [cur]: value }
    }, {})
  }

  get_values_for_write(rid) {
    // 给 create/write 准备参数用的 数据
    return Object.keys(this.columns).reduce((acc, cur) => {
      const col = this.columns[cur]
      const for_write = 1
      const value = col.get_value_for_server(rid, { for_write })
      const values = value !== undefined ? { [cur]: value } : {}
      return { ...acc, ...values }
    }, {})
  }
}

class TreeModel extends BaseModel {
  constructor(payload = {}) {
    super(payload)
  }

  get values_list() {
    return this.ids.map(item => this.get_values(item))
  }

  _copy_one(row_id) {
    const fields = this._fields
    const from_record = this._from_record

    const record = new this.constructor({ fields, from_record })
    record._ids = [row_id]

    const my_values = this._values[row_id] || {}
    record._values = {
      [row_id]: JSON.parse(JSON.stringify(my_values))
    }

    const my_values2 = this._values_to_write[row_id] || {}
    record._values_to_write = {
      [row_id]: JSON.parse(JSON.stringify(my_values2))
    }

    record._store_relations = {}
    const my_store_relations = this._store_relations[row_id]
    if (my_store_relations) {
      const store2 = Object.keys(my_store_relations).reduce((acc, fld) => {
        return { ...acc, [fld]: my_store_relations[fld].copy() }
      }, {})

      record._store_relations[row_id] = store2
    }

    return record
  }

  pick(row_id) {
    if (!this.ids.includes(row_id)) {
      return
    }
    return this._copy_one(row_id)
  }
}

const PAGE_SIZE = 10

class ListModel extends TreeModel {
  // 服务于 listview
  constructor(payload = {}) {
    super(payload)
    this._total_length = 0

    this.domain = []
    this.order = undefined
    this.offset = 0
    this.limit = PAGE_SIZE
  }

  get total_length() {
    return this._total_length
  }

  get page_count() {
    return Math.ceil(this.total_length / this.limit)
  }

  get page_number() {
    return this.page_current + 1
  }

  get page_current() {
    return this.offset / this.limit
  }

  set page_current(value) {
    this.offset = value * this.limit
  }

  async pageGoto(page2 = 1) {
    // 前提用 create_record({fields: ['name']}) 创建空记录
    // 再做查询操作
    if (this.page_count <= 0) {
      this.page_current = 0
    } else {
      const page = page2 - 1
      if (page <= 0) {
        this.page_current = 0
      } else if (page >= this.page_count) {
        this.page_current = this.page_count - 1
      } else {
        this.page_current = page
      }
    }

    return this._page_browse()
  }

  async _page_browse() {
    const domain = this.domain
    const limit = this.limit
    const order = this.order
    const offset = this.offset

    const payload = { domain, offset, limit, order }
    await this._search_browse(payload)
    return this.values_list
  }

  static async search_browse(payload = {}) {
    const record = await this.create_record(payload)
    await record._search_browse(payload)
    return record
  }

  async _search_browse(payload = {}) {
    const fields_list = Object.keys(this.fields)
    const paylaod2 = { ...payload, fields: fields_list }
    // console.log(paylaod2)
    const result = await this.constructor.web_search_read({ ...paylaod2 })
    const { length, records } = result
    this._init_data(records)
    this._total_length = length
    return this
  }
}

class O2mTreeModel extends ListModel {
  // 服务于 o2m treeview
  constructor(payload = {}) {
    super(payload)
  }

  tree_pick(row_id) {
    return this.pick(row_id)
  }

  async tree_new(kwargs = {}) {
    const { context } = kwargs
    const MyModel = this.constructor
    const MyModel2 = context ? MyModel.with_context(context) : MyModel

    const one = await MyModel2.new_and_onchange({
      fields: this.fields,
      from_record: { model: this.from_model, field: this.from_field },
      ...kwargs
    })

    return one
  }

  _tree_remove(row_id) {
    this._ids = this.ids.filter(item => item !== row_id)
    const values2 = { ...this._values_to_write }
    delete values2[row_id]
    this._values_to_write = { ...values2 }

    // const values0 = { ...this._values }
    // delete values0[row_id]
    // this._values = { ...values0 }

    // const stores = { ...this._store_relations }
    // delete stores[row_id]
    // this._store_relations = { ...stores }
  }

  _tree_update_by_record(rec) {
    // update or insert this from new record
    // then: set value to parent:from_model

    const row_id = rec.id

    const is_new = !this.ids.includes(row_id)
    if (is_new) {
      this._ids = [...this.ids, row_id]
    }
    const my_values2 = rec._values_to_write[row_id]
    if (my_values2) {
      this._values_to_write[row_id] = JSON.parse(JSON.stringify(my_values2))
    }
    const my_store_relations = this._store_relations[row_id]

    if (my_store_relations) {
      this._store_relations[row_id] = my_store_relations
    }
  }

  async tree_remove(row_id) {
    if (!this.ids.includes(row_id)) {
      return
    }

    this._tree_remove(row_id)

    await this.from_model.set_and_onchange(this.from_field, [2, row_id, false])
  }

  async tree_update(row_id, rec) {
    console.log(' tree_update')
    if (rec.id !== row_id) {
      return
    }

    const is_new = !this.ids.includes(row_id) || is_virtual_id(row_id)
    // 必须先判断 is_new, 否则 后面的函数会修改 ids
    this._tree_update_by_record(rec)
    const op = is_new ? 0 : 1
    await this.from_model.set_and_onchange(this.from_field, [op, row_id, {}])
  }

  tree_rollback() {
    this._values_to_write = {}
  }
}

class FormModel extends O2mTreeModel {
  constructor(payload = {}) {
    super(payload)
    this._relation_browsed = {}
    this._onchange_domain = {}
  }

  get id() {
    return this._ids.length ? this._ids[0] : null
  }

  get values() {
    return this.get_values(this.id)
  }

  get values_onchange() {
    return this.get_values_onchange(this.id)
  }

  get values_modifiers() {
    return this.get_values_modifiers(this.id)
  }

  get values_onchange_for_parent() {
    return this.get_values_onchange(this.id, true)
  }

  get values_for_write() {
    return this.get_values_for_write(this.id)
  }

  async execute(method, ...args) {
    const res = await this.constructor.execute(method, this.id, ...args)
    // await this._after_commit(this.id)
    return res
  }

  async relation_browse(fname, kwargs = {}) {
    // m2m 字段 name_get
    // o2m 字段 read
    this._relation_browsed[fname] = kwargs

    // row_id 服务于  treemodel

    const { row_id } = kwargs
    const field = this.columns[fname]
    return await field.relation_browse(row_id || this.id, kwargs)
  }

  get_selection(fname, kwargs) {
    // const kwargs2 = { args, name: query, operator, limit, context }
    const kwargs2 = { ...kwargs }

    // console.log(this._onchange_domain)

    const domain = this._onchange_domain[fname]
    if (domain) {
      kwargs2.args = domain
    }

    const field = this.columns[fname]
    return field.get_selection(kwargs2)
  }

  static async new_and_onchange(payload = {}) {
    const { from_record } = payload

    const _get_default = meta => {
      if (['many2many'].includes(meta.type)) {
        return [[6, false, []]]
      } else if (['one2many'].includes(meta.type)) {
        return []
      } else if (['float', 'integer', 'monetary'].includes(meta.type)) {
        return 0
      } else if (['text', 'html'].includes(meta.type)) {
        return ''
      }
      return false
    }

    const record = await this.create_record(payload)

    if (from_record) {
      // console.log(record)
      const vid = this.env.odoo.get_virtual_id()
      record._ids = [vid]
    }

    const rid = record.id

    Object.keys(record.columns).forEach(item => {
      const col = record.columns[item]

      const val = _get_default(record.fields[item])
      // console.log(item, val)
      col.set_value_by_onchange(rid, val)
    })

    const { field_onchange } = payload
    const field_onchange2 =
      field_onchange ||
      Object.keys(record.columns).reduce((acc, cur) => {
        return { ...acc, [cur]: '1' }
      }, {})
    const args = [[], {}, '', field_onchange2]
    const res = await this.onchange(...args)
    record._after_onchange(res)
    return record
  }

  async set_and_onchange(fname, value, kwargs = {}) {
    const { field_onchange } = kwargs
    const field_onchange2 =
      field_onchange ||
      Object.keys(this.columns).reduce((acc, cur) => {
        return { ...acc, [cur]: '1' }
      }, {})

    const field = this.columns[fname]
    field.set_value(this.id, value, kwargs)

    // fro debug, always call onchange
    // const to_call = field_onchange[fname]
    const to_call = field_onchange2[fname] || true
    if (to_call) {
      const ids = this.id && !is_virtual_id(this.id) ? [this.id] : []
      const values = this.values_onchange

      if (this.from_model) {
        const parent_vals = this.from_model.values_onchange_for_parent
        const from_col = this.from_model.fields[this.from_field]
        // console.log(this.from_model, this.from_field, from_col)
        // console.log(from_col.meta)
        const relation_field = from_col.relation_field
        // console.log(this, relation_field)

        values[relation_field] = parent_vals
      }

      const args = [ids, values, fname, field_onchange2]
      const res = await this.constructor.onchange(...args)
      this._after_onchange(res)
    }

    return this.values
  }

  _after_onchange(res) {
    const domain = res.domain

    this._onchange_domain = { ...this._onchange_domain, ...domain }

    const one = res.value
    Object.keys(one).forEach(fld => {
      const col = this._columns[fld]
      if (col) {
        col.set_value_by_onchange(this.id, one[fld])
      } else {
        // console.log(fld, one)
        console.log(
          'Trow Error.',
          `${fld} in onchange.values, but not init in this.columns`
        )
        // throw `${fld} in onchange.values, but not init in this.columns`
      }
    })
  }

  async commit() {
    const values = this.values_for_write
    // console.log(this.id, values)
    if (this.id) {
      if (Object.keys(values).length) {
        await this.constructor.write(this.id, values)
        await this._after_commit(this.id)
        return this.values
      }
      return this.values
    } else {
      const rid = await this.constructor.create(values)
      await this._after_commit(rid)
      return this.values
    }
  }

  async _after_commit(rid) {
    const fields = Object.keys(this.fields)
    const res = await this.constructor.read(rid, { fields })
    this._init_data(res)
    const childs = this._relation_browsed
    for (const fld in childs) {
      const col = this.columns[fld]
      const kwargs = childs[fld]
      await col.relation_browse(rid, kwargs)
    }
  }

  async refresh() {
    await this._after_commit(this.id)
    return this.values
  }

  async unlink() {
    // TBD  检查 删除异常
    const res = await this.constructor.unlink(this.id)
    return res
  }

  rollback() {
    this._values_to_write[this.id] = {}

    const store = this._store_relations[this.id] || {}

    Object.keys(store).forEach(fld => {
      if (this.fields[fld].type === 'one2many') {
        store[fld].tree_rollback()
      }
    })
  }

  async button_clicked(type, method) {
    // console.log(type, method)
    if (type === 'object') {
      // console.log(type, method)
      const res = await this.constructor.button_execute(method, this.id)

      if (!res) {
        await this._after_commit(this.id)
        return
      } else {
        // 返回 action, 前端自行处理
        console.log(type, method, res)
        return res
      }
    } else if (type === 'action') {
      console.log(type, method)
    } else {
      console.log(type, method)
      throw 'error'
    }
  }
}

export const Model = FormModel
