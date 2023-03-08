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

  _values_display(record = {}, values = {}) {
    // todo: m2m o2m 做处理
    return { ...record, ...values }
  }

  _update_values(fname, { value }) {
    const value2 = value

    const values = { ...this.values, [fname]: value2 }
    this.values = values
  }

  update(fname, { value }) {
    // console.log('update,', fname, value)
    this._update_values(fname, { value })
    const values = this.values
    const record = this.record
    const formValues = this._values_display(record, values)

    return { formValues, values }
  }

  async _wait() {
    await this.changeQueue.wait_call()
  }

  async onchange(fname, kwargs_in) {
    const result = this.web_onchange(fname, kwargs_in)
    this.changeQueue.append(result)
    return result
  }

  async web_onchange(fname, kwargs_in) {
    //  等待其他 任务完成
    await this._wait()
    // await sleep(3000)
    const { validate, ...kwargs } = kwargs_in
    //  更新本地数据

    // const update_res =
    this.update(fname, kwargs)

    const validate_call = async update_res2 => {
      if (!validate) {
        return true
      }

      return new Promise(resolve => {
        const done = valid => {
          if (!valid) {
            console.log('validate error')
          }
          resolve(valid)
        }
        // 如果有校验函数, 则回调 校验函数
        validate(done, update_res2)
      })
    }

    const res = await this._web_onchange(fname, kwargs)
    const values = this.values
    const record = this.record
    const formValues = this._values_display(record, values)

    const update_res2 = { formValues, values }

    // const valid =
    await validate_call(update_res2)

    return res

    // if (valid) {
    //   //  若校验 返回 true, 则 onchange
    //   const res = await this._web_onchange(fname, kwargs)

    //   return res
    // } else {
    //   return { values: this.values }
    // }
  }

  async commit(kwargs = {}) {
    const result = this.web_commit(kwargs)
    return result
  }

  async web_commit(kwargs = {}) {
    // 等待其他 任务完成
    await this._wait()
    const { validate } = kwargs

    const validate_call = async () => {
      if (!validate) {
        return true
      }

      return new Promise(resolve => {
        // 如果有校验函数, 则回调 校验函数
        validate(valid => {
          resolve(valid)
        })
      })
    }

    const valid = await validate_call()

    if (valid) {
      // 若校验 返回 true, 则 commit
      // console.log('validate ok', valid)
      const id_ret = await this._web_commit()
      return id_ret
    } else {
      console.log('validate err', valid)
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
    const result = await Model.web_onchange_new({ context })

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

  async _web_onchange(fname, { value }) {
    const res_ids = this.record.id ? [this.record.id] : []

    const kwargs2 = {
      record: this.record,
      values: this.values,
      field_name: fname,
      value,
      context: this.context
    }

    const result = await this.Model.web_onchange(res_ids, kwargs2)
    const { values = {} } = result
    //   Todo: 对返回 domain 的处理
    // console.log('handleOnchange, in model', cp(values))

    this.values = { ...values }
    return { ...result, values: this.values }
  }

  async _web_commit() {
    const record = this.record
    const values = this.values
    const res_id = this.record.id
    const context = this.context

    // console.log('_web_commit', this.viewmodel, record, values)

    const values2 = this.viewmodel._get_values_for_write(record, values)
    // console.log('_web_commit', values2)

    const id2 = await this.Model.web_commit(res_id, record, values2, {
      context
    })
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
    const parent_values = parent.Model.get_values_for_onchange(parentData)
    const values = { [relation_field]: parent_values }

    return values
  }

  async onchange_new(parentData) {
    const context = this.context_get(parentData)
    const values = this._values_with_parent(parentData)

    const Model = this.Model
    const result = await Model.web_onchange_new({ values, context })

    const { values: values_ret } = result
    // const { values_for_write } = result
    this.record = {}
    this.values = { ...values_ret }
    // this.values = { ...values_for_write }
    this.parentData = parentData

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

    // console.log('_update_relation,values_write', values_write)
    // console.log('_update_relation,this.parentData', cp(this.parentData))
    this.parentData = {
      ...this.parentData,
      values: { ...values, [fname]: values_write }
    }

    // console.log('_update_relation,this.parentData2', cp(this.parentData))
  }

  update(fname, { value }) {
    // console.log('update,', fname, value, )
    const res = super.update(fname, { value })
    this._update_parent() //  同步 更新  parent
    return res
  }

  async _web_onchange(fname, { value }) {
    const context = this.context

    const res_ids =
      this.record.id && !is_virtual_id(this.record.id) ? [this.record.id] : []

    const kwargs2 = {
      record: this.record,
      values: this.values,
      field_name: fname,
      value,
      context
    }

    const result = await this.Model.web_onchange(res_ids, kwargs2)
    const { values = {} } = result
    //   Todo: 对返回 domain 的处理

    // console.log('handleOnchange, in model', cp(values))

    const field_info = this.viewmodel.field_info
    const { relation_field } = field_info
    const values2 = { ...values }
    delete values2[relation_field]

    // bug: todo 应该先 存 后删除  relation_field
    this.values = { ...values2 }

    return { ...result, values: this.values }
  }

  async _web_commit() {
    return this._x2m_tuple_get()
  }
}
