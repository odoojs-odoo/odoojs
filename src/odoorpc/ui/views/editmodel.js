// function sleep(millisecond) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve()
//     }, millisecond)
//   })
// }

// const print_date = () => {
//   const date = new Date()
//   console.log(
//     date.getHours(),
//     date.getMinutes(),
//     date.getSeconds(),
//     date.getMilliseconds()
//   )
// }

export class ChangeQueue {
  constructor() {
    this.queue = []
    this.call_id = 0
  }

  async wait_call() {
    const queue_in = [...this.queue]
    const queue = [...queue_in]
    let one = queue.shift()
    while (one) {
      await one.result
      one = queue.shift()
    }

    queue_in.forEach(item => {
      const index_to_del = this.queue.findIndex(
        item2 => item2.call_id === item.call_id
      )
      if (index_to_del >= 0) {
        this.queue.splice(index_to_del, 1)
      }
    })
  }
  append(result) {
    const call_id = this.call_id + 1
    this.call_id = call_id
    this.queue.push({ call_id, result })
  }
}

const is_virtual_id = id_ =>
  typeof id_ === 'string' && id_.slice(0, 8) === 'virtual_'

// eslint-disable-next-line no-unused-vars
const cp = val => JSON.parse(JSON.stringify(val))

class EditBase {
  constructor(payload = {}) {
    const { viewmodel, record = {}, values = {} } = payload

    this.viewmodel = viewmodel
    this.record = { ...record }
    this.values = { ...values }

    this.changeQueue = new ChangeQueue()
  }

  get Model() {
    return this.viewmodel.Model
  }

  // todo  check this

  _values_display(record = {}, values = {}) {
    // todo: m2m o2m 做处理
    return { ...record, ...values }
  }

  // formview and  o2mform 使用同一个 onchange 函数
  async onchange(fname, value, kwargs_in) {
    const result = this.web_onchange(fname, value, kwargs_in)
    this.changeQueue.append(result)
    return result
  }
  // formview and  o2mform 使用同一个 commit 函数
  async commit(validate) {
    const result = this.web_commit(validate)
    return result
  }

  async _wait() {
    await this.changeQueue.wait_call()
  }

  async web_onchange(fname, value) {
    //  等待其他 任务完成
    await this._wait()
    // await sleep(3000)
    const res = await this._web_onchange(fname, value)
    return res
  }

  async web_commit(validate) {
    // 等待其他 任务完成
    await this._wait()

    const call_validate = validate2 => {
      if (!validate2) {
        return true
      }

      return new Promise(resolve => {
        // 如果有校验函数, 则回调 校验函数
        validate2(validate_result => {
          resolve(validate_result)
        })
      })
    }

    const validate_result = await call_validate(validate)

    if (validate_result) {
      // 若校验 返回 true, 则 commit
      // console.log('validate ok', validate_result)
      const id_ret = await this._web_commit()
      return id_ret
    } else {
      console.log('validate err', validate_result)
      return
    }
  }
}

export class EditModel extends EditBase {
  constructor(payload = {}) {
    super(payload)
  }

  get context() {
    return this.viewmodel.context
  }

  async onchange_new(kwargs) {
    const { context: ctx = {} } = kwargs || {}

    const context = { ...this.context, ...ctx }

    // console.log('context', context, kwargs)
    const Model = this.Model
    const result = await Model.web_onchange_new({}, { context })

    const { values } = result
    this.record = {}
    this.values = { ...values }

    return { record: {}, ...result }
  }

  set_editable(record) {
    this.record = { ...record }
    this.values = {}
    return this._values_display(record)
  }

  async _web_onchange(fname, value) {
    // 本地更新
    this.values = { ...this.values, [fname]: value }

    const res_ids = this.record.id ? [this.record.id] : []

    // values 中 可能有 id,  需要删除
    const record = this.Model.merge_to_one(this.record, this.values)
    const vals_onchg = this.Model.format_for_onchange(record)

    // 服务端更新
    const result = await this.Model.web_onchange(res_ids, vals_onchg, fname, {
      context: this.context
    })

    const { values = {} } = result
    // Todo: 对返回 domain 的处理
    // console.log('handleOnchange, in model', cp(values))

    this.values = { ...values }
    return { ...result, values: this.values }
  }

  async _web_commit() {
    const record = this.record
    const values = this.values
    const res_id = this.record.id
    const context = this.context

    const values2 = this.viewmodel.merge_for_write(record, values)

    const id2 = await this.Model.web_commit(res_id, values2, { context })
    return id2
  }
}

export class EditX2m extends EditBase {
  constructor(payload = {}) {
    super(payload)
    const { parentData } = payload
    this.parentData = parentData
  }

  get context() {
    return this.viewmodel.context_get(this.parentData)
  }

  context_get(parentData) {
    return this.viewmodel.context_get(parentData)
  }

  _values_with_parent(parentData) {
    const parent = this.viewmodel.parent
    const { relation_field } = this.viewmodel.field_info

    const { record, values } = parentData

    const record2 = parent.Model.merge_to_one(record, values)
    const parent_values = parent.Model.format_for_onchange(record2)

    const values2 = { [relation_field]: parent_values }

    return values2
  }

  async onchange_new(parentData) {
    const context = this.context_get(parentData)
    const values = this._values_with_parent(parentData)

    const Model = this.Model
    const result = await Model.web_onchange_new(values, { context })

    const { values: values_ret } = result
    // const { values_for_write } = result
    this.record = {}
    this.values = { ...values_ret }
    // this.values = { ...values_for_write }
    this.parentData = { ...parentData }
    const values2 = { ...values_ret }
    const { relation_field } = this.viewmodel.field_info
    delete values2[relation_field]
    return { record: {}, ...result, values: { ...values2 } }
  }

  set_editable(record, parentData) {
    const values = this._values_with_parent(parentData)
    this.record = { ...record }
    this.values = { ...values }
    this.parentData = { ...parentData }
    return this._values_display(record)
  }

  _x2m_tuple_get() {
    const res_id = this.record.id
    const values = this.values

    const field_info = this.viewmodel.field_info
    const { relation_field } = field_info

    const values2 = { ...values }
    delete values2[relation_field]

    const vals_get = () => {
      if (!res_id) {
        return [0, false, values2]
      } else {
        return [1, res_id, values2]
      }
    }
    const vals = vals_get()
    return vals
  }

  //
  // todo . 用到了 commit
  // o2m 数据提交后, 将数据更新到 父亲模型
  _update_parent() {
    const { record, values } = this.parentData
    const field_info = this.viewmodel.field_info
    //
    const { name: fname } = field_info
    const records_tree = (record[fname] || []).map(item => {
      return { id: item }
    })
    const values_tree = values[fname] || []
    const value = this._x2m_tuple_get()

    const tree = this.viewmodel.relation.tree
    const { values_write } = tree.commit(records_tree, values_tree, value)

    this.parentData = {
      ...this.parentData,
      values: { ...values, [fname]: values_write }
    }
  }

  async _web_onchange(fname, value) {
    // 本地更新
    this.values = { ...this.values, [fname]: value }
    this._update_parent() //  同步 更新  parent

    const res_ids =
      this.record.id && !is_virtual_id(this.record.id) ? [this.record.id] : []

    // values 中 可能有 id,  需要删除
    const record = this.Model.merge_to_one(this.record, this.values)
    const vals_onchg = this.Model.format_for_onchange(record)

    // 服务端更新
    const result = await this.Model.web_onchange(res_ids, vals_onchg, fname, {
      context: this.context
    })

    const { values = {} } = result
    //   Todo: 对返回 domain 的处理

    this.values = { ...values }

    const field_info = this.viewmodel.field_info
    const { relation_field } = field_info
    const values2 = { ...values }
    delete values2[relation_field]

    return { ...result, values: values2 }
  }

  async _web_commit() {
    const values = this.values
    const field_info = this.viewmodel.field_info
    const { relation_field } = field_info
    const values2 = { ...values }
    delete values2[relation_field]
    return values2
  }
}
