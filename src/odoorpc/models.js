import { Field } from './fields'

import { is_virtual_id } from './utils'

import pivot from './pivot'

// eslint-disable-next-line no-unused-vars
const cp = item => JSON.parse(JSON.stringify(item))

// import { sleep } from '@/odoorpc/utils'

class MetaModel {
  constructor() {
    //
  }

  get _name() {
    return this.constructor._model
  }

  static get _name() {
    return this._model
  }

  static get res_model() {
    return this._model
  }

  get res_model() {
    return this.constructor._model
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

    if (!Object.keys(kwargs).includes('context'))
      kwargs2.context = this.env.context

    const payload = { model: this._name, method, args, kwargs: kwargs2 }
    return this._odoo.web.dataset.call_kw(payload)
  }

  static async call_button(method, rid, kwargs = {}) {
    const args = [rid]
    const payload = { model: this._name, method, args, kwargs }
    return this._odoo.web.dataset.call_button(payload)
  }

  static async action_run(action_id, { context }) {
    return this._odoo.web.action.run({ action_id, context })
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

  static async read_group(kwargs) {
    return this.execute_kw('read_group', [], kwargs)
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
      if (Array.isArray(kwargs)) return [[ids, kwargs], {}]
      const { fields = [], ...kwargs2 } = kwargs
      return [[ids, fields], kwargs2]
    }

    const [args, kwargs2] = get_args_kwargs()

    return this.execute_kw(method, args, kwargs2)
  }

  static async copy(rid) {
    const method = 'copy'
    return this.execute(method, rid)
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

  static async action_unarchive(ids) {
    const method = 'action_unarchive'
    return this.execute(method, ids)
  }

  static async action_archive(ids) {
    const method = 'action_archive'
    return this.execute(method, ids)
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
    if (is_call_default)
      return this.default_get_onchange(values, field_onchange)
    else
      return this.execute('onchange', ids, values, field_name, field_onchange)
  }

  static async default_get_onchange(values, field_onchange) {
    const fields = Object.keys(field_onchange).filter(
      fld => fld.split('.').length === 1
    )

    const default_get1 = await this.default_get(fields)

    const _get_default = col => {
      const meta = this._fields[col]

      if (['many2many'].includes(meta.type)) return [[6, false, []]]
      else if (['one2many'].includes(meta.type)) return []
      else if (['float', 'integer', 'monetary'].includes(meta.type)) return 0
      else if (['text', 'html'].includes(meta.type)) return ''
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

    return onchange2
  }
}

MetaModel._env = undefined
MetaModel._odoo = undefined
MetaModel._model = undefined

const _normalize_ids = ids => {
  if (!ids) return []
  if (Array.isArray(ids)) return [...ids]
  return [ids]
}

class BaseModel extends MetaModel {
  constructor(payload = {}) {
    super()

    const { fields = {}, from_record = {}, field_onchange } = payload
    this._fields = fields
    this._field_onchange = field_onchange

    this._from_record = from_record
    this._from_model = from_record.model
    this._from_field = from_record.field
    this._values = {}
    this._values_to_write = {}
    this._store_relations = {}
    this._columns = this._init_columns(fields)
    this._ids = []
  }

  jscopy() {
    const fields = this._fields
    const from_record = this._from_record
    const record = new this.constructor({ fields, from_record })
    record._ids = [...this._ids]
    record._values = JSON.parse(JSON.stringify(this._values))
    record._values_to_write = JSON.parse(JSON.stringify(this._values_to_write))
    const store2 = Object.keys(this._store_relations).reduce((acc, rid) => {
      const one_row = this._store_relations[rid]
      const one_row2 = Object.keys(one_row).reduce((acc2, fld) => {
        return { ...acc2, [fld]: one_row[fld].jscopy() }
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

  get field_onchange() {
    return this._field_onchange
  }

  get columns() {
    // 所有的 字段, 数据初始化时 设置
    return this._columns
  }

  get ids() {
    return this._ids
  }

  static async _get_fields_dict(fields_in = []) {
    if (Array.isArray(fields_in)) return await this.fields_get(fields_in)
    else return fields_in
  }

  static async create_record(payload = {}) {
    // console.log('create_record,', this._name, payload)
    const { fields: fields_in } = payload
    const fields_dict = await this._get_fields_dict(fields_in)
    // console.log('create_record 2,', this._name, payload, fields_dict)

    this._updata_fields(fields_dict)
    // console.log('create_record 3,', [this], this._name, payload, fields_dict)

    const record = new this({ ...payload, fields: fields_dict })
    return record
  }

  static async browse(ids, payload = {}) {
    // console.log('browse,', this._name, ids, payload)
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
    this._init_data_for_store(res)
    this._init_data_for_columns(res)
  }

  _init_data_for_store(res) {
    this._ids = _normalize_ids(res.map(item => item.id))
    this._values = {}
    this._values_to_write = {}
    this._store_relations = {}
  }

  _init_data_for_columns(res) {
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

    if (!this._ids.includes(rid)) this._ids = [...this._ids, rid]

    Object.keys(vals).forEach(item => {
      const col = this.columns[item]
      if (col) col.set_value_by_onchange(rid, vals[item])

      if (!col) console.log('Throw Error, ', `${item} is undefined in columns`)
      // throw `${item} is undefined in columns`
    })
  }

  update_by_record(rec) {
    const row_id = rec.id
    // console.log('update_by_record ', this, rec)

    const new_fields = Object.keys(rec.fields).reduce((acc, cur) => {
      if (!(cur in this.fields)) acc[cur] = rec.fields[cur]
      return acc
    }, {})
    // console.log('update_by_record ', this.fields, new_fields)

    this._fields = { ...this.fields, ...new_fields }

    const new_cols = this._init_columns(new_fields)
    // console.log('update_by_record ', this.columns, new_cols)

    this._columns = { ...this.columns, ...new_cols }

    if (rec.field_onchange) {
      const old_fo = this.field_onchange || {}
      const new_fo = rec.field_onchange || {}
      const all_fo = { ...old_fo, ...new_fo }
      this._field_onchange = Object.keys(all_fo).reduce((acc, cur) => {
        acc[cur] = old_fo[cur] || new_fo[cur] ? '1' : ''
        return acc
      }, {})
    }

    const is_new = !this.ids.includes(row_id)
    if (is_new) this._ids = [...this.ids, row_id]

    const _update_values = (old_vals, new_vals) => {
      const old_one = old_vals[row_id] || {}
      const new_one = JSON.parse(JSON.stringify(new_vals[row_id] || {}))
      old_vals[row_id] = { ...old_one, ...new_one }
    }

    _update_values(this._values, rec._values)
    _update_values(this._values_to_write, rec._values_to_write)

    const _update_store_relations = () => {
      //
      // const old_rel = this._store_relations[row_id] || {}
      // const new_rel = rec._store_relations[row_id] || {}
      // console.log(
      //   '_update_store_relations',
      //   this.constructor._name,
      //   old_rel,
      //   new_rel
      // )
      // const to_append = Object.keys(new_rel).reduce((acc, cur) => {
      //   if (old_rel[cur]) {
      //     acc[cur] = old_rel[cur].update_by_record(new_rel[cur])
      //   } else {
      //     acc[cur] = new_rel[cur].jscopy()
      //   }
      //   return acc
      // }, {})
      // if (Object.keys(to_append).length) {
      //   this._store_relations[row_id] = { ...old_rel, ...to_append }
      // }
    }

    _update_store_relations()
  }

  get_values(rid) {
    const res = Object.keys(this.columns).reduce((acc, cur) => {
      const col = this.columns[cur] || {}
      const values = col.get_values_display(rid) || {}
      acc = { ...acc, ...values }
      return acc
    }, {})
    return { ...res, id: rid }
  }

  get_values_onchange(rid, for_parent) {
    return Object.keys(this.columns).reduce((acc, cur) => {
      const col = this.columns[cur]
      const for_onchange = 1
      const value = col.get_value_for_server(rid, { for_onchange, for_parent })
      // console.log('sssss,',  cur, this.fields, this.columns)
      return { ...acc, [cur]: value }
    }, {})
  }

  get_values_modifiers(rid) {
    // 给 计算 modifiers  准备数据
    // console.log('get_values_modifiers, ', rid)
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

  _jscopy_one(row_id) {
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
        return { ...acc, [fld]: my_store_relations[fld].jscopy() }
      }, {})

      record._store_relations[row_id] = store2
    }

    return record
  }

  pick(row_id) {
    if (!this.ids.includes(row_id)) return
    return this._jscopy_one(row_id)
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
    this.finished = false
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
    if (this.page_count <= 0) this.page_current = 0
    else {
      const page = page2 - 1
      if (page <= 0) this.page_current = 0
      else if (page >= this.page_count) this.page_current = this.page_count - 1
      else this.page_current = page
    }

    return this._page_browse()
  }

  // _pageLoadMore_set_data(result) {
  // }

  async pageLoadMore() {
    // console.log('model, pageLoadMore')

    if (this.finished) return { finished: this.finished }

    const domain = this.domain
    const limit = this.limit
    const order = this.order
    const offset = this.offset
    const fields_list = Object.keys(this.fields)

    const payload = { domain, offset, limit, order, fields: fields_list }
    // console.log('model,pageLoadMore', payload)
    const result = await this.constructor.web_search_read({ ...payload })

    const { length, records } = result
    this._total_length = length
    const ids = _normalize_ids(records.map(item => item.id))
    this._ids = [...this._ids, ...ids]
    this._init_data_for_columns(records)
    this.offset = this.offset + records.length
    if (this.offset >= this._total_length) this.finished = true

    return {
      finished: this.finished
    }

    // console.log(this.total_length)
    // const domain = this.domain
    // const limit = this.limit
    // const order = this.order
    // const offset = this.offset
    // const fields_list = Object.keys(this.fields)
    // const paylaod2 = { ...payload, fields: fields_list }
    // const fields_list = Object.keys(this.fields)
    // const fields = this.fields
    // const res = await this.Model.pageLoadMore({ fields })
    // this._records = res
    // return this.values_list
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

  async tree_call_action_run_recursion(action_id, { context }) {
    const res = await this.constructor.action_run(action_id, { context })
    console.log('action server1:', res)
    if (!res) {
      // TBD 是否 刷新 页面
      return
    }

    // 返回 action, 前端自行处理
    if (res.type !== ' ir.actions.server') return res

    return this.tree_call_action_run_recursion(res.id, { context })
  }

  async tree_call_action_run(action_id, ids, kwargs) {
    console.log(action_id)
    const { additional_context = {} } = kwargs
    const active_model = this.res_model
    const active_id = ids[0]
    const active_ids = ids
    const context2 = { active_model, active_id, active_ids }
    const context = {
      ...this.env.odoo.env.context,
      ...context2,
      ...additional_context
    }

    return this.tree_call_action_run_recursion(action_id, { context })
  }
}

class O2mTreeModel extends ListModel {
  // 服务于 o2m treeview
  constructor(payload = {}) {
    // console.log('O2mTreeModel ,', payload)
    super(payload)
    // console.log('O2mTreeModel2 ,', this._name, payload)
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
  }

  _tree_update_by_record(rec) {
    // update or insert this from new record
    // then: set value to parent:from_model

    this.update_by_record(rec)
  }

  async tree_remove(row_id) {
    if (!this.ids.includes(row_id)) return
    this._tree_remove(row_id)
    await this.from_model.set_and_onchange(this.from_field, [2, row_id, false])
  }

  async tree_update(row_id, rec) {
    console.log(' tree_update', [row_id, rec])
    if (rec.id !== row_id) return

    // 必须先判断 is_new, 否则 后面的函数会修改 ids
    const is_new = !this.ids.includes(row_id) || is_virtual_id(row_id)
    this._tree_update_by_record(rec)
    const op = is_new ? 0 : 1
    await this.from_model.set_and_onchange(this.from_field, [op, row_id, {}])

    // await sleep(1000)
    // await this.from_model.set_and_onchange(this.from_field, [op, row_id, {}])
  }

  tree_rollback() {
    this._values_to_write = {}
  }
}

class FormModel extends O2mTreeModel {
  constructor(payload = {}) {
    // console.log('FormModel ,', payload)
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

  async copy() {
    const new_id = await this.constructor.copy(this.id)
    const fields = this.fields
    const field_onchange = this.field_onchange
    return this.constructor.browse(new_id, { fields, field_onchange })
  }

  async relation_browse(fname, kwargs = {}) {
    // console.log('model, relation_browse 1', fname)
    // m2m 字段 name_get
    // o2m 字段 read
    // console.log(' fname ', fname)
    this._relation_browsed[fname] = kwargs

    // row_id 服务于  treemodel

    const { row_id } = kwargs
    const field = this.columns[fname]

    // console.log(' fname ', field, row_id)
    return await field.relation_browse(row_id || this.id, kwargs)
  }

  get_selection(fname, kwargs) {
    // const kwargs2 = { args, name: query, operator, limit, context }
    const kwargs2 = { ...kwargs }

    // console.log(fname, kwargs, this._onchange_domain)

    const domain = this._onchange_domain[fname]
    if (domain) kwargs2.args = domain

    const field = this.columns[fname]
    return field.get_selection(kwargs2)
  }

  static async new_and_onchange(payload = {}) {
    const { from_record } = payload

    const _get_default = meta => {
      if (['many2many'].includes(meta.type)) return [[6, false, []]]
      else if (['one2many'].includes(meta.type)) return []
      else if (['float', 'integer', 'monetary'].includes(meta.type)) return 0
      else if (['text', 'html'].includes(meta.type)) return ''
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

    const values = {}

    if (record.from_model) {
      const parent_vals = record.from_model.values_onchange_for_parent
      const from_col = record.from_model.fields[record.from_field]
      // console.log(record.from_model, record.from_field, from_col)
      // console.log(from_col.meta)
      const relation_field = from_col.relation_field
      // console.log(record, relation_field)

      values[relation_field] = parent_vals
    }

    const args = [[], values, [], field_onchange2]
    const res = await this.onchange(...args)
    // console.log(' new onchange,', res)
    record._after_onchange(res)
    // console.log(' new onchange 2,', record)
    await record._after_onchange_async()
    return record
  }

  async set_and_onchange(fname, value, kwargs = {}) {
    // console.log('set_and_onchange', this, fname, value, kwargs)
    const { field_onchange } = kwargs
    const field_onchange2 =
      field_onchange ||
      this.field_onchange ||
      Object.keys(this.columns).reduce((acc, cur) => {
        return { ...acc, [cur]: '1' }
      }, {})

    const field = this.columns[fname]
    field.set_value(this.id, value, kwargs)

    // fro debug, always call onchange
    const to_call = field_onchange2[fname]
    // const to_call = field_onchange2[fname] || true
    if (to_call) {
      const ids = this.id && !is_virtual_id(this.id) ? [this.id] : []
      const values = this.values_onchange

      // console.log(
      //   'set_and_onchange 11',
      //   this.constructor._name,
      //   this,
      //   JSON.parse(JSON.stringify(values))
      // )

      if (this.from_model) {
        const parent_vals = this.from_model.values_onchange_for_parent
        const from_col = this.from_model.fields[this.from_field]
        // console.log(this.from_model, this.from_field, from_col)
        // console.log(from_col.meta)
        const relation_field = from_col.relation_field
        // console.log(this, relation_field)

        values[relation_field] = parent_vals
      }

      // 2021-10-20, 不知道什么原因, 这里的数据不稳定
      const values2 = JSON.parse(JSON.stringify(values))

      // console.log('set_and_onchange 88', this.constructor._name, values2)

      const args = [ids, values2, fname, field_onchange2]
      const res = await this.constructor.onchange(...args)
      this._after_onchange(res)
      await this._after_onchange_async()
      // console.log('set_and_onchange 99', this)
    }

    return this.values
  }

  _after_onchange(res) {
    const domain = res.domain

    this._onchange_domain = { ...this._onchange_domain, ...domain }

    const one = res.value
    Object.keys(one).forEach(fld => {
      const col = this._columns[fld]
      if (col) col.set_value_by_onchange(this.id, one[fld])

      if (!col) {
        // console.log(fld, one)
        console.log(
          'Trow Error.',
          `${fld} in onchange.values, but not init in columns`
        )
        // throw `${fld} in onchange.values, but not init in this.columns`
      }
    })
  }

  async _after_onchange_async() {
    for (const fld in this._columns) {
      const col = this.columns[fld]
      // console.log('after onchange,', fld, col)
      await col._after_onchange_async(this.id)
    }
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
      if (this.fields[fld].type === 'one2many') store[fld].tree_rollback()
    })
  }

  async form_call_action_run_recursion(action_id, { context }) {
    const res = await this.constructor.action_run(action_id, { context })

    // console.log('action server1:', res)
    if (!res) {
      await this._after_commit(this.id)
      return
    }

    // 返回 action, 前端自行处理
    if (res.type !== ' ir.actions.server') return res

    return this.form_call_action_run_recursion(res.id, { context })
  }

  async form_call_action_run(action_id, kwargs) {
    // console.log(action_id, this)
    const { additional_context = {} } = kwargs
    const active_model = this.res_model
    const active_id = this.id
    const active_ids = [this.id]
    const context2 = { active_model, active_id, active_ids }
    const context = {
      ...this.env.odoo.env.context,
      ...context2,
      ...additional_context
    }

    return this.form_call_action_run_recursion(action_id, { context })
  }

  async call_button(method, kwargs = {}) {
    const res = await this.constructor.call_button(method, this.id, kwargs)
    if (!res) {
      await this._after_commit(this.id)
      return
    }
    // 返回 action, 前端自行处理
    if (res.type !== ' ir.actions.server') return res

    return this.form_call_action_run_recursion(res.id, kwargs)
  }

  async create() {
    const values = this.values_for_write
    const rid = await this.constructor.create(values)
    return rid
    // console.log(action_id, rid, this.env.context)
  }

  async wizard_call_button(method) {
    const values = this.values_for_write
    const rid = await this.constructor.create(values)
    // const fields = Object.keys(this.fields)
    // const res = await this.constructor.read(rid, { fields })
    // console.log(method, rid, res)
    const kw = { context: this.env.context }
    const res = await this.constructor.call_button(method, rid, kw)
    if (!res) {
      return
    } else {
      //  返回 ir.actions.act_window_close
      console.log('wizard call button,', res)
      return res
      // throw 'wizard call button, return sth, TBD'
      // // return res
    }
  }
}

class OlapModel extends FormModel {
  constructor(payload = {}) {
    super(payload)
    const { pivot_data = {} } = payload
    const { fields = {}, domain = [], measures = [], groupbys } = pivot_data

    const ms = pivot.fields_for_measure(fields)
    const measures_all = Object.keys(ms)

    this._olap_fields = fields
    this._olap_domain = [...domain]
    this._olap_datalist = []
    this._olap_measures = measures
    this._olap_measures_all = [...measures_all, '__count']
    this._olap_groupbys = groupbys
  }

  get olap_groupbys() {
    return this._olap_groupbys
  }

  get olap_demensions() {
    const dims = this.olap_groupbys.reduce((acc, cur) => {
      const { groupby } = cur
      return [...acc, ...groupby]
    }, [])

    return [...new Set(dims)]
  }

  get olap_measures() {
    return this._olap_measures
  }

  get olap_measures_all() {
    return this._olap_measures_all
  }

  get olap_fields() {
    return this._olap_fields
  }

  get olap_domain() {
    return this._olap_domain
  }

  get olap_datalist() {
    return this._olap_datalist
  }

  static async _mdx_read_group(kwargs) {
    const { measures, domain, groupby = [] } = kwargs
    const fields = measures
      .filter(item => item !== '__count')
      .map(item => `${item}:sum`)
    const lazy = false
    const res = await this.read_group({ fields, domain, groupby, lazy })

    const records = groupby.length
      ? res
      : res.map(item => {
          return { ...item, __domain: domain }
        })

    return records
  }

  static async _mdx_read_cell(kwargs) {
    // console.log('_mdx_read_cell', kwargs)
    const { fields, measures, domain, groupby = [] } = kwargs
    const records2 = await this._mdx_read_group({ measures, domain, groupby })
    const records = records2.map(rec => {
      const rec2 = Object.keys(rec).reduce((acc, fld) => {
        const val = rec[fld]
        if (fld === 'id' || fld.slice(0, 2) === '__') acc[fld] = val
        else {
          const fld2 = fld.split(':')[0]
          const meta = fields[fld2]
          if (['many2one'].includes(meta.type)) {
            const val2 = val || [val, '']
            acc[fld] = val2[0]
            acc[`${fld}__name`] = val2[1]
          } else if (['selection'].includes(meta.type)) {
            const ops = meta.selection.find(item => item[0] === val)
            const ops2 = ops || ['', '']
            acc[fld] = val
            acc[`${fld}__name`] = ops2[1]
          } else {
            acc[fld] = val
          }
        }
        return acc
      }, {})
      return rec2
    })

    return records
  }

  static async olap_read({ fields, measures, domain, groupbys }) {
    const result = []
    for (const groupbydict of groupbys) {
      const { groupby, groupby2 } = groupbydict
      const kw2 = { fields, measures, domain, groupby: groupby2 || groupby }
      const records = await this._mdx_read_cell(kw2)
      result.push({ groupby, records })
    }
    return result
  }

  async olap_read() {
    const fields = this.olap_fields
    const domain = this.olap_domain
    const measures = this.olap_measures
    const groupbys = this.olap_groupbys

    const kwargs = { fields, measures, domain, groupbys }
    const datalist = await this.constructor.olap_read(kwargs)
    this._olap_datalist = datalist
  }

  async olap_change_measure(measure, ckecked) {
    const ms1 = this.olap_measures
    const ms2 = ms1.filter(item => item !== measure)
    if (ckecked) ms2.push(measure)

    const measures = this.olap_measures_all.filter(item => ms2.includes(item))
    this._olap_measures = measures

    if (measure !== '__count' && ckecked) await this.olap_read()
  }

  async olap_read_slice({ domain, filter, groupbys }) {
    // console.log('xxxx, unfold,slice', domain, cp(filter), cp(groupbys))
    const fields = this.olap_fields
    const measures = this.olap_measures
    const groupbys_old = this.olap_groupbys
    const datalist = this.olap_datalist

    const kwargs = { fields, measures, domain, groupbys }
    const datalist_new = await this.constructor.olap_read(kwargs)

    const groupbys2 = [...groupbys_old]

    groupbys.forEach(item => {
      const todo = !groupbys_old.includes(it =>
        pivot.check_array_equ(it.groupby, item.groupby)
      )
      if (todo) groupbys2.push({ groupby: item.groupby })
    })

    this._olap_groupbys = groupbys2
    this._olap_slice_merge(filter, datalist, datalist_new)
  }

  _olap_slice_merge(filter, datalist, datalist_new) {
    const parent_rec = pivot.search_one({ datalist, filter })
    const rec_to_patch = Object.keys(parent_rec).reduce((acc, cur) => {
      if (Object.keys(filter).includes(cur.split('__')[0]))
        acc[cur] = parent_rec[cur]
      return acc
    }, {})

    const new2 = datalist_new.map(item => {
      return {
        ...item,
        filter: Object.keys(filter).reduce((acc, cur) => {
          return { ...acc, [cur]: [filter[cur]] }
        }, {}),

        records: item.records.map(it => {
          return { ...it, ...rec_to_patch }
        })
      }
    })

    const datalist2 = this._olap_slice_merge_datalist(datalist, new2)
    this._olap_datalist = datalist2
  }

  _olap_slice_merge_datalist(dest, src) {
    const minus = (list1, list2) => {
      return list1.reduce(
        (acc, cur) => {
          const patch = list2.find(item => {
            return pivot.check_array_equ(item.groupby, cur.groupby)
          })

          if (patch) acc[1].push([cur, patch])
          else acc[0].push(cur)
          return acc
        },
        [[], []]
      )
    }

    const merge = todo => {
      const get_flt_obj = (rec, fs) => {
        return Object.keys(rec).reduce((acc, cur) => {
          if (fs.includes(cur)) acc[cur] = rec[cur]
          return acc
        }, {})
      }

      return todo.map(item => {
        const [rec1, rec2] = item

        const merge_records = () => {
          const to_patch = rec2.records.filter(it => {
            const my_obj2 = get_flt_obj(it, rec1.groupby)
            return !rec1.records.find(it1 => {
              const my_obj1 = get_flt_obj(it1, rec1.groupby)
              return pivot.check_object_equ(my_obj1, my_obj2)
            })
          })

          return [...rec1.records, ...to_patch]
        }

        const merge_filter = () => {
          const filter = Array.from(
            new Set(
              [].concat(Object.keys(rec1.filter), Object.keys(rec2.filter))
            )
          ).reduce((acc, key) => {
            acc[key] = [
              ...(rec1.filter[key] || []),
              ...(rec2.filter[key] || [])
            ]

            return acc
          }, {})

          return filter
        }

        const records = merge_records()

        const filter = merge_filter()

        // const filter = Object.keys(filter2).reduce((acc, key) => {
        //   const val = filter2[key]
        //   const val2 = [...new Set(records.map(rec => rec[key]))]
        //   if (!pivot.check_array_equ(val, val2)) acc[key] = val
        //   return acc
        // }, {})

        return { ...rec1, filter, records }
      })
    }

    const [to_add1, to_patch1] = minus(dest, src)

    const to_add2 = minus(src, dest)[0]
    const to_add = merge(to_patch1)
    const result = [...to_add1, ...to_add2, ...to_add]
    // console.log('pivot_merge_datalist2:', result)
    return result
  }

  _olap_remove(field, filter) {
    const _get_bool = (flt, item) =>
      Object.keys(flt).reduce((acc, cur) => {
        return acc && flt[cur] === item[cur]
      }, true)

    const datalist = this.olap_datalist

    const datalist2 = datalist.reduce((acc, item) => {
      if (item.groupby.includes(field)) {
        const { filter: filter_data = {}, records } = item
        const records2 = records.filter(rec => !_get_bool(filter, rec))
        if (records2.length) {
          const filter2 = Object.keys(filter_data).reduce((acc, cur) => {
            acc[cur] = filter_data[cur].filter(it => it !== filter[cur])
            return acc
          }, {})

          acc.push({ ...item, filter: filter2, records: records2 })
        }
      } else {
        acc.push(item)
      }

      return acc
    }, [])

    this._olap_datalist = datalist2

    this._olap_groupbys = datalist2.map(item => {
      const { groupby } = item
      return { groupby }
    })
  }
}

class PivotModel extends OlapModel {
  constructor(payload = {}) {
    super(payload)
    const { pivot_data = {} } = payload
    const { rows = [], columns = [] } = pivot_data
    this._pivot_rows = rows
    this._pivot_columns = columns
  }

  get pivot_rows() {
    return this._pivot_rows
  }
  get pivot_columns() {
    return this._pivot_columns
  }

  get pivot_info() {
    return {
      rows: this.pivot_rows,
      columns: this.pivot_columns,
      measures: this.olap_measures
    }
  }

  get pivot_datalist() {
    return this.olap_datalist
  }

  get pivot_datalist_one() {
    return this.olap_datalist.length ? this.olap_datalist[0].records : []
  }

  static _mdx_read_groupbys({ rows, columns }) {
    const groupbys = []

    let rowindex = 0
    const groupby_rows = []
    do {
      let colindex = 0
      const groupby_cols = []
      do {
        const groupby = [...groupby_rows, ...groupby_cols]
        groupbys.push({ groupby })
        groupby_cols.push(columns[colindex])
        colindex = colindex + 1
      } while (colindex <= columns.length)
      groupby_rows.push(rows[rowindex])
      rowindex = rowindex + 1
    } while (rowindex <= rows.length)

    return groupbys
  }

  static async mdx_read_one(kwargs) {
    // console.log(' mdx_read ', kwargs)
    const { rows = [], columns = [] } = kwargs
    // const groupbys = this._mdx_read_groupbys({ rows, columns })
    const groupbys = [{ groupby: [...rows, ...columns] }]
    console.log(groupbys)
    const obj = new this({ pivot_data: { ...kwargs, groupbys } })
    await obj.olap_read()
    return obj
  }

  static async mdx_read(kwargs) {
    // console.log(' mdx_read ', kwargs)
    const { rows = [], columns = [] } = kwargs
    const groupbys = this._mdx_read_groupbys({ rows, columns })
    const obj = new this({ pivot_data: { ...kwargs, groupbys } })
    await obj.olap_read()
    return obj
  }

  async pivot_change(payload) {
    /*
     * { command, type, field, next, search } = payload
     * command:  swap, select, unselct
     * type: row, column, measure
     * field:
     * next
     * value: {filter, domain, }
     */
    const { command, type, field, next, search } = payload

    if (command === 'swap') {
      this.pivot_swap()
    } else if (command === 'unfold') {
      await this.olap_read()
    } else if (type === 'measure') {
      const { value } = payload
      return await this.olap_change_measure(field, value)
    } else if (command === 'fold') {
      return this._pivot_fold(type, field, next, search)
    } else {
      // console.log('xxxx, unfold0,', type, field, next, search)
      return await this.pivot_unfold(type, next, search)
    }
  }

  _pivot_fold(type, field, next, search) {
    const { filter } = search

    this._olap_remove(next, filter)

    const rows = this.pivot_rows
    const cols = this.pivot_columns
    const dimensions = this.olap_demensions

    this._pivot_rows = rows.filter(item => dimensions.includes(item))
    this._pivot_columns = cols.filter(item => dimensions.includes(item))
  }

  pivot_swap() {
    const [rows, columns] = [this.pivot_rows, this.pivot_columns]
    this._pivot_rows = [...columns]
    this._pivot_columns = [...rows]
  }

  async pivot_unfold(type, field, value = {}) {
    // console.log('xxxx, unfold,', type, field, cp(value))
    const { domain, filter } = value

    const rows = this.pivot_rows
    const columns = this.pivot_columns

    const new_axis = (axis, field) => {
      return [...axis, field].reduce((acc, cur) => {
        if (!acc.length || acc[acc.length - 1] !== field) acc.push(cur)
        return acc
      }, [])
    }

    const rows2 = type === 'row' ? new_axis(rows, field) : rows
    const cols2 = type === 'row' ? columns : new_axis(columns, field)

    const kw2 = { type, rows: rows2, columns: cols2, field }
    const groupbys = this._pivot_slice_groupbys(kw2)

    await this.olap_read_slice({ domain, filter, groupbys })

    if (type === 'row') {
      if (!rows.includes(field)) this._pivot_rows = [...rows, field]
    } else {
      if (!columns.includes(field)) this._pivot_columns = [...columns, field]
    }
  }

  _pivot_slice_groupbys({ type, rows, columns, field }) {
    // console.log('xxxx, unfold, grp,', type, rows, columns, field)
    const loops = type === 'row' ? columns : rows
    const groupbys = []
    let index = 0
    const groupby_loops = []
    do {
      const groupby2 = [...groupby_loops, field]
      const groupby =
        type === 'row'
          ? [...rows, ...groupby_loops]
          : [...groupby_loops, ...columns]
      groupbys.push({ groupby, groupby2 })

      groupby_loops.push(loops[index])
      index = index + 1
    } while (index <= loops.length)
    return groupbys
  }
}

export class Model extends PivotModel {
  constructor(payload = {}) {
    super(payload)
  }

  async call_action_run(action_id, kwargs2) {
    const { ids, ...kwargs } = kwargs2
    if (ids) {
      return this.tree_call_action_run(action_id, ids, kwargs)
    } else {
      return this.form_call_action_run(action_id, kwargs)
    }
  }
}
