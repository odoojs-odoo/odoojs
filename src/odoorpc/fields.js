import { is_virtual_id } from './utils'

const tuples_to_ids = tuples => {
  // m2m
  // [6,],[5,],[4,id],[3,id]
  //

  // console.log('tuples_to_ids 1', tuples)

  const ids = tuples.reduce((acc, tup) => {
    const op = tup[0]
    if (op === 6) return [...tup[2]]
    if (op === 5) return []

    if ([4, 0, 1].includes(op)) {
      const rid = tup[1]
      if (acc.includes(rid)) return [...acc]
      else return [...acc, rid]
    }

    if ([3, 2].includes(op)) return acc.filter(item => item !== tup[1])

    // 不应该走到这里
    return acc
  }, [])

  // console.log('tuples_to_ids 2', ids)
  return ids
}

const merge_views = views_in => {
  const _merge_fields = (fs_to, fs_in) => {
    return Object.keys(fs_in).reduce((acc, key) => {
      const old1 = acc[key] || {}
      const new1 = fs_in[key]
      const views = _merge_views(old1.views || {}, new1.views || {})
      acc[key] = { ...new1, ...old1, views }
      return acc
    }, fs_to)
  }

  const _merge_views = (vw_to, vw_in) => {
    return Object.keys(vw_in).reduce((acc, key) => {
      if (!acc.tree) acc.tree = { fields: {} }

      const fields = _merge_fields(acc.tree.fields, vw_in[key].fields)
      return { tree: { fields } }
    }, vw_to)
  }

  return _merge_views({}, views_in)
}

class BaseField_init {
  constructor({ name, record }) {
    const meta = record.fields[name] || {}
    this._name = name
    this._record = record
    this._meta = meta
  }

  get fname() {
    return this._name
  }

  get meta() {
    return this._meta
  }

  get record() {
    return this._record
  }

  get env() {
    return this.record.env
  }

  get context() {
    return this.env.context
  }

  //   init read

  get_store_for_values(rid) {
    // 2021-10-25 TBD 这里为什么 歧视 新增的 id
    // 客户结算单, 新增 明细行 invoice_line_ids, 字段 tax_ids 默认有 值, 需要 relation read
    // 这里没地方存储
    // 取消这段 . 需要测试 是否 有其他bug

    // if (!rid || is_virtual_id(rid)) {
    //   return {}
    // }

    const store = this.record._values
    if (!store[rid]) store[rid] = {}
    return store[rid]
  }

  set_by_init(rid, value) {
    const one = this.get_store_for_values(rid)
    one[this.fname] = value
  }

  get _value_init() {
    const rid = this.record.id
    return this.get_value_init(rid)
  }

  get_value_init(rid) {
    const one = this.get_store_for_values(rid)
    return one[this.fname]
  }

  //   write

  get_store_for_values_to_write(rid) {
    const store = this.record._values_to_write
    if (!store[rid]) store[rid] = {}

    return store[rid]
  }

  get _value_updated() {
    const rid = this.record.id
    return this.get_value_updated(rid)
  }

  get_value_updated(rid) {
    const one = this.get_store_for_values_to_write(rid)
    return one[this.fname]
  }

  set _value_updated(value) {
    const rid = this.record.id
    this.set_value_updated(rid, value)
  }

  set_value_updated(rid, value) {
    const one = this.get_store_for_values_to_write(rid)
    one[this.fname] = value
  }

  get_value(rid) {
    const value2 = this.get_value_updated(rid)
    const value0 = this.get_value_init(rid)
    const value =
      value2 !== undefined ? (value2 !== false ? value2 : null) : value0 || null
    return value
  }

  get_values_display(rid) {
    return { [this.fname]: this.get_value(rid) }
  }
}

class BaseField_edit extends BaseField_init {
  constructor(payload) {
    super(payload)
  }

  // 需要在 selection 和 m2o, m2m 中 定义该方法
  // get_selection(kwargs = {}) {
  //   return []
  // }

  async get_selection_async(kwargs = {}) {
    //  m2o, m2m, get selection 需要
    // console.log('xxxx, col', this.fname, kwargs, this.meta)

    const { args, name: query = '', operator = 'ilike', limit = 8 } = kwargs
    const { context } = kwargs
    const Relation = this.env.copy(context).model(this.meta.relation)
    // const domain = this.meta
    const kwargs2 = { args, name: query, operator, limit }
    const selection = await Relation.name_search(kwargs2)
    // const selection = await Relation.execute_kw('name_search', [], kwargs2)
    return selection
  }

  get_value_for_server(rid, kwargs = {}) {
    const { for_onchange, for_parent, for_write, for_modifiers } = kwargs
    if (for_onchange) return this.get_value_onchange(rid, for_parent)
    else if (for_write) return this.get_value_for_write(rid)
    else if (for_modifiers) return this.get_value_for_modifiers(rid)
    else return undefined
  }

  get_value_for_modifiers(rid) {
    return this.get_value_onchange(rid)
  }

  get_value_onchange(rid) {
    const value2 = this.get_value_updated(rid)
    const value0 = this.get_value_init(rid)
    const value = value2 !== undefined ? value2 : value0
    return value
  }

  set_value(rid, value) {
    this.set_value_updated(rid, value)
  }

  set_value_by_onchange(rid, value) {
    this.set_value_updated(rid, value)
  }

  // eslint-disable-next-line no-unused-vars
  async _after_onchange_async(rid) {
    // To Be Override.  for many2many
  }

  _commit_get_readonly() {
    // 仅仅 在 commit 时, 组织 values, 需要
    // TBD, 测试  销售订单 等 有 state的模型

    // console.log('vvwr 1', this.fname)

    if (this.meta.states === undefined) return this.meta.readonly

    // console.log('vvwr 2', this.fname)

    const state = this.record.values.state

    // console.log('vvwr 3', this.fname, state)

    if (state && this.meta.states && this.meta.states[state]) {
      const readonly3 = this.meta.states[state].reduce((acc, cur) => {
        acc[cur[0]] = cur[1]
        return acc
      }, {})

      if (readonly3.readonly !== undefined) return readonly3.readonly
    }

    return this.meta.readonly
  }

  get_value_for_write(rid) {
    const value2 = this.get_value_updated(rid)
    if (value2 === undefined) return undefined

    const readonly = this._commit_get_readonly()

    // console.log('vvwr', this, this.fname, readonly)
    if (readonly) return undefined
    return value2
  }
}

class BaseField extends BaseField_edit {
  constructor(payload) {
    super(payload)
  }
}

class Binary extends BaseField {
  constructor(payload) {
    super(payload)
  }
}

class Boolean2 extends BaseField {
  constructor(payload) {
    super(payload)
  }

  get_value(rid) {
    const value2 = this.get_value_updated(rid)
    const value0 = this.get_value_init(rid)
    const value = value2 !== undefined ? value2 : value0
    return value
  }
}

class Date2 extends BaseField {
  constructor(payload) {
    super(payload)
  }
}

class Char extends BaseField {
  constructor(payload) {
    super(payload)
  }
}

class Datetime extends BaseField {
  constructor(payload) {
    super(payload)
  }
}

class Float extends BaseField {
  constructor(payload) {
    super(payload)
  }

  get_value(rid) {
    return super.get_value(rid) || 0.0
  }
}

class Monetary extends BaseField {
  constructor(payload) {
    super(payload)
  }

  get_value(rid) {
    return super.get_value(rid) || 0.0
  }
}

class Html extends Char {
  constructor(payload) {
    super(payload)
  }
}

class Integer extends BaseField {
  constructor(payload) {
    super(payload)
  }

  get_value(rid) {
    return super.get_value(rid) || 0
  }
}

class Many2many extends BaseField {
  constructor(payload) {
    super(payload)
  }

  get fname__record() {
    return `${this.fname}__record`
  }

  get_value(rid) {
    const value2 = this.get_value_updated(rid)
    const value0 = this.get_value_init(rid)
    const value = value2 !== undefined ? tuples_to_ids(value2) : value0 || []
    return value
  }

  get_values_display(rid) {
    const value = this.get_value(rid)
    const store = this.get_store_for_values(rid)
    const relation = store[this.fname__record] || {}
    return {
      [this.fname]: value,
      [this.fname__record]: value.map(item => {
        const rec = relation[item] || [item, null]
        return [...rec]
      })
    }
  }

  get_value_onchange(rid) {
    const value2 = this.get_value_updated(rid)
    const value0 = this.get_value_init(rid)

    if (value2 === undefined) return [[6, false, value0]]
    if (value2.length === 0) return [[6, false, []]]
    return value2
  }

  get_value_for_modifiers(rid) {
    const value = this.get_value(rid)
    return value

    // console.log('get_value_for_modifiers', this.fname, rid)
    // const value2 = this.get_value_updated(rid)
    // const value0 = this.get_value_init(rid)

    // if (value2 !== undefined) {
    //   if (value2.length === 0) {
    //     return []
    //   } else {
    //     return value2
    //   }
    // } else {
    //   return value0
    // }
  }

  // 改成 o2m 相似的方式 TBD
  // eslint-disable-next-line no-unused-vars
  async relation_browse(rid, kwargs = {}) {
    const Relation = this.env.model(this.meta.relation)
    const ids = this.get_value(rid)
    // console.log('m2m,', this.record._name, rid, this.fname, ids)
    if (!ids.length) return []

    const res = await Relation.name_get(ids)
    // console.log('m2m 2,', this.fname, res)
    //   console.log(res)
    const store = this.get_store_for_values(rid)
    // console.log('m2m 3,', this.fname, res)
    store[this.fname__record] = res.reduce((acc, cur) => {
      return { ...acc, [cur[0]]: [...cur] }
    }, {})
    return res
  }

  get_selection(kwargs = {}) {
    return this.get_selection_async(kwargs)
  }

  set_value(rid, value, kwargs = {}) {
    // console.log(rid, value, kwargs)
    const { text = [] } = kwargs
    this.set_value_updated(rid, [[6, false, value]])
    const store = this.get_store_for_values(rid)
    const old_record = store[this.fname__record]
    const new_record = text.reduce((acc, cur) => {
      return { ...acc, [cur[0]]: [...cur] }
    }, {})
    store[this.fname__record] = { ...old_record, ...new_record }

    // console.log(store)
  }

  set_value_by_onchange(rid, value) {
    // console.log('set_value_by_onchange', this.fname, value)
    const values2 = value.reduce((acc, item) => {
      const op = item[0]
      if (op === 5) acc = []
      else if (op === 6) acc.push(item)
      else if ([0, 1].includes(op)) {
        acc.push([...item])
        // m2m 不会出现 0,1 ?
        // 理论上 应该会出现,
        // 目前页面上 没有 子页面编辑 m2m
        // const rid = item[1] || this.env.odoo.get_virtual_id()
        // const vals = item[2]
        // this.relation.set_value_by_onchange(rid, vals)
        // acc.push([op, rid, vals])
      } else if ([4, 3, 2].includes(op)) acc.push([op, item[1], false])
      else {
        // []
      }

      return acc
    }, [])

    // console.log('set_value_by_onchange2', this.fname, values2)

    this.set_value_updated(rid, [...values2])
  }

  async _after_onchange_async(rid) {
    const check_array_equ = (listA, listB) => {
      let result =
        listA.length === listB.length &&
        listA.every(a => listB.some(b => a === b)) &&
        listB.every(_b => listA.some(_a => _a === _b))

      return result
    }

    const ids = this.get_value(rid)
    const store = this.get_store_for_values(rid)
    const old_record = store[this.fname__record] || {}
    const old_ids = Object.keys(old_record).reduce((acc, cur) => {
      return [...acc, old_record[cur][0]]
    }, [])

    const todo = !check_array_equ(ids, old_ids)

    // console.log('after onchange,', rid, this.fname, ids, old_ids)

    if (!ids.length) return
    if (todo) {
      await this.relation_browse(rid)
    }
  }

  get_value_for_write(rid) {
    const val = super.get_value_for_write(rid)
    if (val === undefined) return val

    if (val.length === 0) return [[6, false, []]]

    return val
  }
}

class Many2one extends BaseField {
  constructor(payload) {
    super(payload)
  }

  get fname__name() {
    return `${this.fname}__name`
  }

  get_values_display(rid) {
    const value = this.get_value(rid) || [null, null]
    const [rel_id, name] = value
    return { [this.fname]: rel_id, [this.fname__name]: name }
  }

  get_selection(kwargs = {}) {
    return this.get_selection_async(kwargs)
  }

  get_value_onchange(rid) {
    const value = this.get_value(rid) || [false, null]
    return value[0]
  }

  set_value(rid, value, kwargs = {}) {
    const { text = 'unknow' } = kwargs
    this.set_value_updated(rid, value ? [value, text] : false)

    // if (value) {
    //   this.set_value_updated(rid, [value, text])
    // } else {
    //   this.set_value_updated(rid, false)
    // }
  }

  get_value_for_write(rid) {
    const val = super.get_value_for_write(rid)
    if (val === undefined) return val

    const val2 = val || [false, null]
    const val3 = val2[0]
    return val3
  }
}

class One2many extends BaseField {
  constructor(payload) {
    super(payload)
  }

  get fname__record() {
    return `${this.fname}__record`
  }

  get_store_for_store_relations(rid) {
    const store = this.record._store_relations
    if (!store[rid]) store[rid] = {}
    return store[rid]
  }

  get_relation_record(rid) {
    const store = this.get_store_for_store_relations(rid)
    return store[this.fname]
  }

  _find_relation_record(rid) {
    const store = this.get_store_for_store_relations(rid)

    const relation_record = store[this.fname]
    if (relation_record) return relation_record

    const relation_record2 = this._create_relation_record()
    store[this.fname] = relation_record2
    return relation_record2
  }

  _create_relation_record() {
    // console.log(this.fname, this.meta)
    const views = merge_views(this.meta.views)
    // console.log(this.fname, views)

    const fields = views.tree.fields
    const Model = this.env.model(this.meta.relation, { fields })
    const from_model = this.record
    const from_field = this.fname
    const model = new Model({ fields, from_model, from_field })
    return model
  }

  _set_relation_record(rid, relation_record) {
    //   relation_record 被两种途径设置
    // A. 其他字段 修改, onchange 返回值 带回 o2m 字段的值, 需要创建 record, 暂存数据
    // B. o2m 字段 本身 read 之后, 创建的 record,
    // A种情况, record是临时的, 仅仅存储的是 values_to_write 的数据
    // B种情况, record是正式的, 仅仅存储的是 values  的数据
    // 本函数 仅仅被 B种情况 调用
    //  merge 流程
    // 1. 以 B 为目标
    // 2. 将 A 的 values_to_write 复制过来
    // 3. 将 A 的 _store_relations 复制过来, 但是需要修改 from_model 为 B

    const store = this.get_store_for_store_relations(rid)

    const old_rec = store[this.fname]
    if (old_rec) {
      relation_record._values_to_write = JSON.parse(
        JSON.stringify(old_rec._values_to_write)
      )

      const child_store_relations = old_rec._store_relations

      relation_record._store_relations = Object.keys(
        child_store_relations
      ).reduce((acc, cur) => {
        const child = child_store_relations[cur]
        child.from_model = relation_record
        acc[cur] = child
        return acc
      }, {})

      old_rec._store_relations = {}
    }

    store[this.fname] = relation_record
  }

  async relation_browse(rid, kwargs = {}) {
    const ids = this.get_value(rid)
    const { context, fields } = kwargs
    const env = context ? this.env.copy(context) : this.env
    const Relation = env.model(this.meta.relation)

    const from_record = {
      model: this.record,
      field: this.fname
    }
    const kwargs2 = { fields, from_record }
    const relation = await Relation.browse(ids, kwargs2)
    // console.log(this.fname, relation)

    this._set_relation_record(rid, relation)

    // const store = this.get_store_for_store_relations(rid)
    // store[this.fname] = relation
    return relation
  }

  get_value(rid) {
    // 返回纯 ids 包括 新增的 虚拟id
    const value2 = this.get_value_updated(rid)
    const value0 = this.get_value_init(rid)
    const value = value2 !== undefined ? tuples_to_ids(value2) : value0 || []
    return value
  }

  get_values_display(rid) {
    // console.log('o2m, values, name,', this.fname)
    const value = this.get_value(rid)
    // console.log('o2m, values, value', value)
    const relation_record = this.get_relation_record(rid)
    // console.log('o2m, values, relation_record', relation_record)

    const record = value.map(item => {
      const o2m_values = relation_record ? relation_record.get_values(item) : {}
      return { id: item, ...o2m_values }
    })

    return { [this.fname]: value, [this.fname__record]: record }
  }

  get_value_onchange(rid, for_parent) {
    // console.log('get_value_onchange,  ', rid, for_parent)
    const value2 = this.get_value_updated(rid)
    const value0 = this.get_value_init(rid) || []

    if (value2 === undefined) return value0.map(item => [4, item, false])

    const relation_record = this.get_relation_record(rid)

    return value2.map(item => {
      const op = item[0]
      if (![0, 1].includes(op)) return item
      const o2m_id = item[1]
      const vals = relation_record
        ? for_parent
          ? relation_record.get_values_for_write(o2m_id)
          : relation_record.get_values_onchange(o2m_id)
        : item[2]
      return [op, o2m_id, vals]
    })
  }

  set_value_by_onchange(rid, value) {
    const values2 = value.reduce((acc, item) => {
      const op = item[0]
      if (op === 5) acc = []
      else if (op === 6) acc = (item[2] || []).map(o2m_id => [4, o2m_id, false])
      else if ([4, 3, 2].includes(op)) acc.push([op, item[1], false])
      else if ([0, 1].includes(op)) {
        const o2m_id = item[1] || this.env.odoo.get_virtual_id()
        const vals = item[2]
        const relation_record = this._find_relation_record(rid)
        relation_record.set_values_by_onchange(o2m_id, vals)
        acc.push([op, o2m_id, vals])
      } else {
        // []
      }

      return acc
    }, [])

    const ids_new = tuples_to_ids(values2)
    const ids_init = this.get_value_init(rid) || []

    const ids_to_del = ids_init.reduce((acc, cur) => {
      if (cur && !is_virtual_id(cur) && !ids_new.includes(cur)) acc.push(cur)
      return acc
    }, [])

    const tuples_to_del = ids_to_del.map(item => [2, item, false])
    const values3 = [...values2, ...tuples_to_del]
    this.set_value_updated(rid, [...values3])
  }

  get_value_for_write(rid) {
    const val = super.get_value_for_write(rid)
    if (val === undefined) return val

    const relation_record = this.get_relation_record(rid)

    return val.map(item => {
      const op = item[0]
      if (![0, 1].includes(op)) return item
      const o2m_id = item[1]
      const vals = relation_record
        ? relation_record.get_values_for_write(o2m_id)
        : item[2]

      return [op, o2m_id, vals]
    })
  }

  _append_set_value(rid, tuple) {
    let value2 = this.get_value_updated(rid)
    const value0 = this.get_value_init(rid)

    if (value2 === undefined) value2 = value0.map(item => [4, item, false])

    if ([6, 5].includes(tuple[0])) {
      value2 = [tuple]
      this.set_value_updated(rid, [...value2])
      return
    }

    if (![4, 3, 2, 1, 0].includes(tuple[0])) {
      throw 'o2m tuple op error ' + tuple[0]
    }

    const tuples = value2.filter(item => {
      if ([6, 5].includes(item[0])) return true
      if ([4, 3, 2, 1, 0].includes(item[0])) return item[1] !== tuple[1]

      throw 'o2m tuple op error' + item[0]
    })

    value2 = [...tuples]
    const is_del_vid = tuple[0] === 2 && is_virtual_id(tuple[1])

    if (!is_del_vid) value2 = [...tuples, tuple]

    this.set_value_updated(rid, [...value2])
  }

  set_value(rid, value) {
    this._append_set_value(rid, value)
  }
}

class Reference extends BaseField {
  constructor(payload) {
    super(payload)
  }
}

class Selection2 extends BaseField {
  constructor(payload) {
    super(payload)
  }

  get_values_display(rid) {
    const value = this.get_value(rid)
    const selection = this.meta.selection.reduce((acc, cur) => {
      acc[cur[0]] = cur[1]
      return acc
    }, {})

    const name = selection[value] || null
    return { [this.fname]: value, [`${this.fname}__name`]: name }
  }

  get_selection() {
    return this.meta.selection
  }
}

class Text2 extends BaseField {
  constructor(payload) {
    super(payload)
  }
}

class Unknown extends BaseField {
  constructor(payload) {
    super(payload)
  }
}

const TYPES_TO_FIELDS = {
  binary: Binary,
  boolean: Boolean2,
  char: Char,
  date: Date2,
  datetime: Datetime,
  float: Float,
  monetary: Monetary,
  html: Html,
  integer: Integer,
  many2many: Many2many,
  many2one: Many2one,
  one2many: One2many,
  reference: Reference,
  selection: Selection2,
  text: Text2
}

export class Field {
  constructor(payload = {}) {
    const { name, record } = payload
    const meta = record.fields[name] || {}
    const ttype = meta.type
    const FieldClass = TYPES_TO_FIELDS[ttype] || Unknown
    this._field = new FieldClass(payload)
  }

  get field() {
    return this._field
  }

  get fname() {
    return this.field.fname
  }

  set_by_init(rid, value) {
    this.field.set_by_init(rid, value)
  }

  get_values_display(rid) {
    return this.field.get_values_display(rid)
  }

  get_value_for_server(rid, kwargs) {
    return this.field.get_value_for_server(rid, kwargs)
  }

  async relation_browse(rid, kwargs) {
    return await this.field.relation_browse(rid, kwargs)
  }

  get_selection(payload = {}) {
    return this.field.get_selection(payload)
  }

  set_value(rid, value, kwargs) {
    this.field.set_value(rid, value, kwargs)
  }

  set_value_by_onchange(rid, value) {
    this.field.set_value_by_onchange(rid, value)
  }

  async _after_onchange_async(rid) {
    return this.field._after_onchange_async(rid)
  }

  //   rollback() {
  //     this.field.rollback()
  //   }
}
