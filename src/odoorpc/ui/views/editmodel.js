// function sleep(millisecond) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve()
//     }, millisecond)
//   })
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
  constructor(viewmodel) {
    this.viewmodel = viewmodel
    this.record = {}
    this.values = {}

    this.changeQueue = new ChangeQueue()
  }

  get Model() {
    return this.viewmodel.Model
  }

  // formview and  o2mform 使用同一个 onchange 函数
  async onchange(fname, value, kwargs) {
    const result = this.web_onchange(fname, value, kwargs)
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

  async web_onchange(fname, value, kwargs) {
    //  等待其他 任务完成
    await this._wait()
    // await sleep(3000)
    const res = await this._web_onchange(fname, value, kwargs)
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
    //
    //  m2m 字段有默认值时, 需要刷新数据

    const { value: value_ret, ...result2 } = result
    this.record = {}
    this.values = { ...value_ret }
    return { record: {}, ...result2, values: { ...value_ret } }

    // const { value: value_ret } = result

    // // const { values } = result
    // this.record = {}
    // this.values = { ...value_ret }

    // return { record: {}, ...result }
  }

  set_editable(record) {
    this.record = { ...record }
    this.values = {}
    return this.viewmodel.merge_data(this.record, this.values)
  }

  async _web_onchange(fname, value) {
    // 本地更新
    this.values = { ...this.values, [fname]: value }
    const res_ids = this.record.id ? [this.record.id] : []

    // values 中 可能有 id,  需要删除
    const vals_onchg = this.viewmodel.merge_to_onchange(
      this.record,
      this.values
    )

    // 服务端更新
    const result = await this.Model.web_onchange(res_ids, vals_onchg, fname, {
      context: this.context
    })

    const { value: value_ret } = result
    //  Todo:
    // 1. 对返回 domain 的处理 {domain}=result
    // 2. value_ret 中的 o2m. 需要更新数据及格式
    // 3. value_ret 中的 m2m 需要 更新数据

    this.values = { ...this.values, ...value_ret }

    return { ...result, values: this.values }
  }

  async _web_commit() {
    const record = this.record
    const values = this.values
    const res_id = this.record.id
    const context = this.context

    const values2 = this.viewmodel.merge_to_write(record, values)

    const id2 = await this.Model.web_commit(res_id, values2, { context })
    return id2
  }
}

export class EditX2m extends EditBase {
  constructor(payload = {}) {
    super(payload)
  }

  set_editable(record, values) {
    this.record = { ...record }
    this.values = { ...values }
    return this.viewmodel.merge_data(this.record, this.values)
  }

  // used by _values_with_parent
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

  // used by _values_with_parent
  // todo . 用到了 commit
  // o2m 数据提交后, 将数据更新到 父亲模型
  _update_parent() {
    console.log('todo _update_parent')

    const { record, values } = this.parentData2
    const field_info = this.viewmodel.field_info
    //
    const { name: fname } = field_info
    const records_tree = (record[fname] || []).map(item => {
      return [4, item, { id: item }]
    })
    const values_tree = values[fname] || []

    const value = this._x2m_tuple_get()
    const values_write = [
      ...(values_tree.length ? values_tree : records_tree),
      value
    ]

    this.parentData2 = {
      ...this.parentData2,
      values: { ...values, [fname]: values_write }
    }
  }

  _values_with_parent(parentFormInfo) {
    const parentForm = this.viewmodel.parent_get(parentFormInfo)
    const { relation_field } = this.viewmodel.field_info
    const { record, values } = parentFormInfo

    // console.log(parentFormInfo, parentForm)
    const parent_values = parentForm.merge_to_onchange(record, values)
    const values2 = { [relation_field]: parent_values }
    // values 补上 子表的数据
    // this._update_parent()
    return values2
  }

  async onchange_new(parentFormInfo) {
    const context = this.viewmodel.context_get(parentFormInfo)
    const values = this._values_with_parent(parentFormInfo)

    const Model = this.Model
    const result = await Model.web_onchange_new(values, { context })

    const { value: value_ret, ...result2 } = result
    this.record = {}
    this.values = { ...value_ret }
    return { ...result2, values: { ...value_ret } }
  }

  async _web_onchange(fname, value, parentFormInfo) {
    // console.log(fname, value, parentFormInfo)

    // 本地更新
    this.values = { ...this.values, [fname]: value }

    const with_parent = this._values_with_parent(parentFormInfo)

    const res_ids =
      this.record.id && !is_virtual_id(this.record.id) ? [this.record.id] : []
    // // values 中 可能有 id,  需要删除
    const vals_onchg = this.viewmodel.merge_to_onchange(this.record, {
      ...this.values,
      ...with_parent
    })

    const context = this.viewmodel.context_get(parentFormInfo)

    // 服务端更新
    const args = [res_ids, vals_onchg, fname, { context }]
    const result = await this.Model.web_onchange(...args)

    const { value: value_ret, ...result2 } = result
    //   Todo: 对返回 domain 的处理
    const values = { ...this.values, ...value_ret }
    this.values = values
    return { ...result2, values: values }
  }

  async _web_commit() {
    const values = this.values
    return { ...values }
  }
}
