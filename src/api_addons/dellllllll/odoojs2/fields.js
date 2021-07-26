import { is_virtual_id } from '../odoojs/utils'

const tuples_to_ids = tuples => {
  // m2m
  // [6,],[5,],[4,id],[3,id]
  //

  // console.log('tuples_to_ids 1', tuples)

  const ids = tuples.reduce((acc, tup) => {
    const op = tup[0]
    if (op === 6) {
      return [...tup[2]]
    }
    if (op === 5) {
      return []
    }

    if ([4, 0, 1].includes(op)) {
      const rid = tup[1]
      if (acc.includes(rid)) {
        return [...acc]
      } else {
        return [...acc, rid]
      }
    }

    if ([3, 2].includes(op)) {
      const rid = tup[1]
      return acc.filter(item => item !== rid)
    }
    // 不应该走到这里
    return acc
  }, [])

  // console.log('tuples_to_ids 2', ids)
  return ids
}

class BaseField {
  constructor({ name, record, value }) {
    const meta = record.fields[name] || {}
    const node = record.view.node_get(name)

    this._name = name
    this._meta = meta
    this._node = node
    this._record = record
    this._value = value
    this._value_to_write = undefined
  }

  // TBD,  只在 o2m read 时, 使用一次
  get view() {
    return this.record.view
  }

  // TBD,  1, o2m read 时, 取 mode, context
  // 2, selection option 取 domain, context
  get node() {
    return this._node
  }

  copy() {
    // console.log('copy BaseField:')
    const rec = new this.constructor({
      name: this._name,
      record: this._record,
      value: this._value
    })
    rec._value_to_write = this._value_to_write
    return rec
  }

  set_by_init(value) {
    this._value = value
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
    return this.record.context
  }

  set_value(value) {
    this._value_to_write = value
  }

  set_value_by_onchange(value) {
    this._value_to_write = value
  }

  rollback() {
    this._value_to_write = undefined
  }

  get value() {
    const value =
      this._value_to_write !== undefined
        ? this._value_to_write !== false
          ? this._value_to_write
          : null
        : this._value || null
    return value
  }

  get values_display() {
    return { [this.fname]: this.value }
  }

  get values_onchange() {
    const value =
      this._value_to_write !== undefined ? this._value_to_write : this._value
    return value
  }

  get values_onchange_for_parent() {
    return this.values_onchange
  }

  _commit_get_readonly() {
    // 仅仅 在 commit 时, 组织 values, 需要
    // TBD, 测试  销售订单 等 有 state的模型

    // console.log('vvwr 1', this.fname)

    if (this.meta.states === undefined) {
      return this.meta.readonly
    }

    // console.log('vvwr 2', this.fname)

    const state = this.record.values.state

    // console.log('vvwr 3', this.fname, state)

    if (state && this.meta.states && this.meta.states[state]) {
      const readonly3 = this.meta.states[state].reduce((acc, cur) => {
        acc[cur[0]] = cur[1]
        return acc
      }, {})

      if (readonly3.readonly !== undefined) {
        return readonly3.readonly
      }
    }

    return this.meta.readonly
  }

  get value_to_write() {
    if (this._value_to_write === undefined) {
      return undefined
    }

    const readonly = this._commit_get_readonly()

    // console.log('vvwr', this, this.fname, readonly)
    if (readonly) {
      return undefined
    }

    return this._value_to_write
  }

  get_context() {
    // m2o, m2m, get selection 需要
    // o2m, read 需要
    const context_str = this.node.attrs.context
    // console.log(this.fname, this.record, context_str)
    const context3 = context_str ? this.record.eval_safe(context_str) : {}
    const context = { ...this.env.odoo.env.context, ...context3 }
    return context
  }

  // get_selection(kwargs = {}) {
  //   // 需要在 selection 和 m2o, m2m 中 定义该方法
  //   return []
  // }

  async get_selection_async(kwargs = {}) {
    //  m2o, m2m, get selection 需要
    const { name: query = '', operator = 'ilike', limit = 8 } = kwargs

    // domain 和 context 在 viewmodel 里 组织好了
    // 这里不需要自己处理
    const get_domain = () => {
      const domain1 = []
      const domain_str = this.node.attrs.domain

      // console.log(this.fname, domain_str)

      const domain2 = domain_str ? this.record.eval_safe(domain_str) : []
      const args = [...(domain1 || []), ...(domain2 || [])]
      return args
    }

    const args = get_domain()
    const kwargs2 = { args, name: query, operator, limit }
    const context = this.get_context()

    const Relation = this.env.copy(context).model(this.meta.relation)

    const selection = await Relation.execute_kw('name_search', [], kwargs2)
    return selection
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

  get value() {
    const value =
      this._value_to_write !== undefined ? this._value_to_write : this._value
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

  get value() {
    return super.value || 0.0
  }
}

class Monetary extends BaseField {
  constructor(payload) {
    super(payload)
  }

  get value() {
    return super.value || 0.0
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

  get value() {
    return super.value || 0
  }
}

class Many2many extends BaseField {
  constructor(payload) {
    super(payload)
    this.relation = undefined
  }

  copy() {
    // console.log('copy Many2many:')
    const rec = super.copy()

    if (this._value) {
      rec._value = [...this._value]
    }

    if (this._value_to_write !== undefined) {
      rec._value_to_write = JSON.parse(JSON.stringify(this._value_to_write))
    }

    if (this.relation) {
      rec.relation = this.relation.copy()
    }

    return rec
  }

  get value() {
    if (this._value_to_write === undefined) {
      return this._value || []
    }
    return tuples_to_ids(this._value_to_write)
  }

  get values_display() {
    const value = this.value
    const record2 = this.relation
      ? this.relation.map(item => {
          return { ...item, name: item.display_name }
        })
      : value.map(item => {
          return { id: item }
        })

    return { [this.fname]: value, [`${this.fname}__record`]: record2 }
  }

  get values_onchange() {
    if (this._value_to_write !== undefined) {
      if (this._value_to_write.length === 0) {
        return [[6, false, []]]
      } else {
        return this._value_to_write
      }
    } else {
      return [[6, 0, this.value]]
    }
  }

  get value_to_write() {
    const val = super.value_to_write
    if (val === undefined) {
      return undefined
    }

    if (val.length === 0) {
      return [[6, false, []]]
    }

    return val
  }

  get_selection(kwargs = {}) {
    return this.get_selection_async(kwargs)
  }

  async relation_browse() {
    const Relation = this.env.model(this.meta.relation)
    console.log([Relation])
    const ids = this.value
    if (ids.length) {
      const res = await Relation.read(ids, { fields: ['display_name'] })
      console.log(res)
      // this.relation = res
      return res
    } else {
      return []
    }
  }

  set_value(value) {
    // TBD
    this._value_to_write = value
  }

  set_value_by_onchange(value) {
    // console.log('set_value_by_onchange', this.fname, value)
    const values2 = value.reduce((acc, item) => {
      const op = item[0]
      if (op === 5) {
        acc = []
      } else if (op === 6) {
        acc.push(item)
      } else if ([0, 1].includes(op)) {
        acc.push([...item])
        // m2m 不会出现 0,1 ?
        // 理论上 应该会出现,
        // 目前页面上 没有 子页面编辑 m2m
        // const rid = item[1] || this.env.odoo.get_virtual_id()
        // const vals = item[2]
        // this.relation.set_value_by_onchange(rid, vals)
        // acc.push([op, rid, vals])
      } else if ([4, 3, 2].includes(op)) {
        const rid = item[1]
        acc.push([op, rid, false])
      } else {
        // []
      }

      return acc
    }, [])

    this._value_to_write = [...values2]
  }
}

class Many2one extends BaseField {
  constructor(payload) {
    super(payload)
  }

  copy() {
    // console.log('copy Many2one:')
    const rec = super.copy()

    if (this._value) {
      rec._value = [...this._value]
    }

    if (this._value_to_write) {
      rec._value_to_write = [...this._value_to_write]
    }

    return rec
  }

  get values_display() {
    const value = this.value || [null, null]
    const [rid, name] = value
    return { [this.fname]: rid, [`${this.fname}__name`]: name }
  }

  get values_onchange() {
    const value = this.value || [false, null]
    return value[0]
  }

  get value_to_write() {
    const val = super.value_to_write
    if (val === undefined) {
      return val
    }

    const val2 = val || [false, null]
    const val3 = val2[0]
    return val3
  }

  get_selection(kwargs = {}) {
    return this.get_selection_async(kwargs)
  }

  set_value(value, text) {
    if (value) {
      this._value_to_write = [value, text]
    } else {
      this._value_to_write = false
    }
  }
}

class One2many extends BaseField {
  constructor(payload) {
    super(payload)
    this._relation = undefined
    this._view_mode = undefined
  }

  copy() {
    // console.log('copy One2many:')
    const rec = super.copy()

    if (this._value) {
      rec._value = [...this._value]
    }

    if (this._value_to_write !== undefined) {
      rec._value_to_write = JSON.parse(JSON.stringify(this._value_to_write))
    }

    if (!this._relation) {
      rec._relation = this._relation.copy()
    }

    rec._view_mode = this._view_mode

    return rec
  }

  get relation() {
    if (!this._relation) {
      this._relation = this._init_relation()
    }
    return this._relation
  }

  set_by_init(value) {
    this._value = value || []
    this._relation = undefined
  }

  _get_view_mode() {
    if (this._view_mode !== undefined) {
      return this._view_mode
    }

    const mode1 = this.node.attrs.mode || 'tree'
    const mode = mode1.includes('tree')
      ? 'tree'
      : mode1.includes('kanban')
      ? 'kanban'
      : 'tree'

    const my_view_info = this.meta.views[mode]

    const mode2 = my_view_info ? mode : null
    this._view_mode = mode2

    return mode2
  }

  _init_relation() {
    const mode = this._get_view_mode() || 'tree'
    const view_type = `${mode}view`

    const context = this.get_context()
    const relation_action = this.env.copy(context).action_get({
      view: this.view,
      field: this.fname,
      value: this._value
    })

    // 这个返回的是 treemodel

    const relation = relation_action[view_type].model
    relation._parent_field_object = this
    return relation
  }

  get value() {
    // console.log('value1', this.fname, this._value_to_write)

    // 返回纯 ids 包括 新增的 虚拟id
    if (this._value_to_write === undefined) {
      return this._value || []
    }
    const res = tuples_to_ids(this._value_to_write)

    // console.log('value2', this.fname, this._value_to_write, res)
    return res
  }

  get values_display() {
    // 服务于 页面显示
    const value = this.value
    const record2 = this.relation
      ? this.relation.values
      : value.map(item => {
          return { id: item }
        })

    // console.log(
    //   this.fname,
    //   this._value_to_write,
    //   this._value_to_write && tuples_to_ids(this._value_to_write),
    //   record
    // )

    return { [this.fname]: value, [`${this.fname}__record`]: record2 }
  }

  get values_onchange() {
    if (this._value_to_write === undefined) {
      return this._value.map(item => [4, item, false])
    }

    return this._value_to_write.map(item => {
      const op = item[0]
      if (![0, 1].includes(op)) {
        return item
      } else {
        const rid = item[1]
        const vals = this.relation.get_values_onchange(rid)
        return [op, rid, vals]
      }
    })
  }

  get value_to_write() {
    const val = super.value_to_write
    if (val === undefined) {
      return undefined
    }

    return val.map(item => {
      const op = item[0]
      if (![0, 1].includes(op)) {
        return item
      } else {
        const rid = item[1]
        const vals = this.relation.get_value_to_write(rid)
        return [op, rid, vals]
      }
    })
  }

  get values_onchange_for_parent() {
    if (this._value_to_write === undefined) {
      return this._value.map(item => [4, item, false])
    }

    return this._value_to_write.map(item => {
      const op = item[0]
      if (![0, 1].includes(op)) {
        return item
      } else {
        const rid = item[1]
        const vals = this.relation.get_value_to_write(rid)
        return [op, rid, vals]
      }
    })
  }

  async relation_browse() {
    const relation = this.relation
    await relation.read()
    // update init value
    return relation
  }

  set_value_by_onchange(value) {
    // console.log('set_value_by_onchange', this.fname, value)
    const values2 = value.reduce((acc, item) => {
      const op = item[0]
      if (op === 5) {
        acc = []
      } else if (op === 6) {
        const ids = item[2] || []
        acc = ids.map(rid => [4, rid, false])
      } else if ([0, 1].includes(op)) {
        const rid = item[1] || this.env.odoo.get_virtual_id()
        const vals = item[2]
        this.relation.set_value_by_onchange(rid, vals)
        acc.push([op, rid, vals])
      } else if ([4, 3, 2].includes(op)) {
        const rid = item[1]
        acc.push([op, rid, false])
      } else {
        // []
      }

      return acc
    }, [])

    this._value_to_write = [...values2]
  }

  _append_set_value(tuple) {
    // console.log('set value,', this.fname, value)
    if (this._value_to_write === undefined) {
      const old_ids = this._value.map(item => [4, item, false])
      this._value_to_write = [...old_ids]
    }

    if ([6, 5].includes(tuple[0])) {
      this._value_to_write = [tuple]
      return
    }

    if (![4, 3, 2, 1, 0].includes(tuple[0])) {
      throw 'o2m tuple op error ' + tuple[0]
    }

    const tuples = this._value_to_write.filter(item => {
      if ([6, 5].includes(item[0])) {
        return true
      } else if ([4, 3, 2, 1, 0].includes(item[0])) {
        return item[1] !== tuple[1]
      } else {
        throw 'o2m tuple op error' + item[0]
      }
    })
    this._value_to_write = [...tuples, tuple]
  }

  // set_value() {
  //   // do nothing
  //   //
  // }

  async _trigger_parent_onchange() {
    await this.record._onchange_edit(this.fname)
  }

  async new(rid) {
    // console.log(rid, values)
    // 无需 更新 this.relation,
    // 因为函数, 这个就是 this.relation 触发的
    //  values 参数 无用, 因为在 处理 onchange 和 write 时, 都是从子模型里取这个 value 的
    const tuple = [0, rid, {}]
    this._append_set_value(tuple)
    await this._trigger_parent_onchange()
  }

  async update(rid) {
    // 同 new 函数
    const op = is_virtual_id(rid) ? 0 : 1
    const tuple = [op, rid, {}]
    this._append_set_value(tuple)
    await this._trigger_parent_onchange()
  }

  async remove(rid) {
    // 同 new 函数
    const tuple = [2, rid, false]
    this._append_set_value(tuple)
    await this._trigger_parent_onchange()
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

  get values_display() {
    const value = this.value

    // console.log(this.fname, this.meta)

    const selection = this.meta.selection.reduce((acc, cur) => {
      acc[cur[0]] = cur[1]
      return acc
    }, {})

    const name = selection[value] || null

    return {
      [this.fname]: value,
      [`${this.fname}__name`]: name
    }
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
    if (name && record) {
      const meta = record.fields[name] || {}
      const ttype = meta.type
      const FieldClass = TYPES_TO_FIELDS[ttype] || Unknown
      this._field = new FieldClass(payload)
    } else {
      // 服务于 copy
    }
  }

  copy() {
    // console.log('copy Field:')
    const rec = new this.constructor()
    rec._field = this._field.copy()
    return rec
  }

  get field() {
    return this._field
  }

  get values_display() {
    return this.field.values_display
  }

  get values_onchange() {
    return this.field.values_onchange
  }

  get value_to_write() {
    return this.field.value_to_write
  }

  get values_onchange_for_parent() {
    return this.field.values_onchange_for_parent
  }

  set_value(value, text) {
    this.field.set_value(value, text)
  }

  set_by_init(value) {
    this.field.set_by_init(value)
  }

  set_value_by_onchange(value) {
    this.field.set_value_by_onchange(value)
  }

  rollback() {
    this.field.rollback()
  }

  get_selection(payload = {}) {
    return this.field.get_selection(payload)
  }

  get model() {
    return this.field.relation
  }

  async relation_browse() {
    return this.field.relation_browse()
  }
}
