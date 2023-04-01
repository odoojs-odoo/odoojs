import { X2mBase } from './x2mbase'
import { ViewHelp } from './viewhelp'

const tuples_to_ids = tuples => {
  // m2m
  // [6,],[5,],[4,id],[3,id]
  //

  // console.log('tuples_to_ids 1', tuples)

  const ids = tuples.reduce((acc, tup) => {
    const op = tup[0]
    if (op === 6) return [...tup[2]]
    if (op === 5) return []

    if ([4, 1].includes(op)) {
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

export class X2mTreeBase extends X2mBase {
  // 是 tree 和  kanban 的 共用 class
  constructor(field_info, payload) {
    const { type = 'tree' } = payload
    super(field_info, { ...payload, type })
  }
}

const virtualHelper = {
  _virtual_id: 1,
  virtual_id() {
    this._virtual_id = this._virtual_id + 1
    const vid = this._virtual_id
    return `virtual_${vid}`
  },

  is_virtual(rid) {
    return typeof rid === 'string'
  }
}

export class X2mTree extends X2mTreeBase {
  constructor(field_info, payload) {
    super(field_info, { ...payload, type: 'tree' })
  }

  get fields() {
    const views = this.field_info.views
    const view = views[this._type]
    return { ...view.fields }
  }

  get fields_list() {
    return Object.keys(this.fields)
  }

  async read(ids, kw = {}) {
    // console.log('X2mTree read: ', ids, this.field_info)
    const { parentInfo } = kw
    const context = this.context_get(parentInfo)

    const fields_tree = this.fields
    const fields_form = this.field_info.views.form.fields
    const fields_list = Object.keys({ ...fields_tree, ...fields_form })

    const res = await this.Model.read(ids, { fields: fields_list, context })
    // console.log('X2mTree read: ', ids, res)
    return res
  }

  async search_read(domain = []) {
    const fields = this.fields_list
    const res = await this.Model.search_read({ domain, fields })
    return res
  }

  viewhelp_get() {
    return new ViewHelp(this)
  }

  check_invisible(fieldInfo, kw) {
    const viewhelp = this.viewhelp_get()
    return viewhelp.check_invisible_for_tree(fieldInfo, {
      ...kw,
      for_o2m: true
    })
  }

  get_string(fieldInfo, kw) {
    const viewhelp = this.viewhelp_get()
    return viewhelp.get_string(fieldInfo, { ...kw, for_o2m: true })
  }

  get_columns(kw) {
    const fields = this.fields
    const cols = Object.keys(fields).reduce((acc, fld) => {
      const meta = fields[fld]
      const invs = this.check_invisible(meta, kw)
      if (!invs) {
        acc[fld] = { ...meta, string: this.get_string(meta, kw) }
      }
      return acc
    }, {})

    return cols
  }

  //
  // merge data: record, values
  //

  //
  format_to_tuples(records) {
    return [...records.map(item => [4, item.id, item])]
  }

  format_to_display(records) {
    const fields_tree = this.fields
    const fields_form = this.field_info.views.form.fields
    const fields = { ...fields_tree, ...fields_form }

    const merge = (rec, vals) => {
      const all_keys = Object.keys({ ...rec, ...vals })
      return all_keys.reduce((acc, fld) => {
        const meta = fields[fld] || {}
        if (meta.type === 'many2many') {
          acc[fld] = fld in vals ? tuples_to_ids(vals[fld]) : rec[fld]
        } else if (meta.type === 'one2many') {
          // todo 未考虑嵌套
          acc[fld] = []
        } else {
          acc[fld] = fld in vals ? vals[fld] : rec[fld]
        }
        return acc
      }, {})
    }

    return records.reduce((acc, tup) => {
      const op = tup[0]
      if (op === 6) {
        // m2m table 编辑时 会用到
        // acc = this.m2m_records
        acc = []
      } else if (op === 5) {
        acc = []
      } else if ([3, 2].includes(op)) {
        acc = acc.filter(item => item.id !== tup[1])
      } else if (op === 4) {
        const me = acc.find(item => tup[1] === item.id)
        if (!me) acc = [...acc, tup[2]]
      } else if (op === 1 || op === 0) {
        const rec_index = acc.findIndex(item => item.id === tup[1])
        const rec_me = rec_index >= 0 ? acc[rec_index] : {}
        const me = merge(rec_me, tup[2])

        const me2 = op === 0 ? { id: tup[1], ...me } : me

        if (rec_index >= 0) acc[rec_index] = me2
        else acc.push(me2)
      } else {
        //
      }

      return acc
    }, [])
  }

  // call by formview.merge_to_write
  format_to_write(records, parentFormInfo) {
    // const tuples_all = this.merge_tuples(records)
    const dict_read = records.reduce((acc, item) => {
      if (item[0] === 4) {
        acc[item[1]] = item[2]
      }
      return acc
    }, {})

    const tuples_all = this.merge_tuples(records, true)

    const records3 = tuples_all.map(item => {
      if ([6, 5].includes(item[0])) return item
      else {
        const [op, rid, vals] = item
        if ([2, 3, 4].includes(op)) {
          return [op, rid, false]
        } else if ([1, 0].includes(op)) {
          // todo 处理 o2mform format_to_write
          const rec = dict_read[rid]

          // console.log('o2mtree, format_to_write 1', this.relation.form)
          // console.log('o2mtree, format_to_write 2', rid, rec, vals)

          const x2mfrom = this.relation.form
          const vals2 = x2mfrom.merge_to_write(rec, vals, parentFormInfo)
          // console.log('o2mtree, format_to_write 2', vals2)

          return [op, rid, vals2]
        } else {
          // never here
          return item
        }
      }
    })

    // console.log('o2mtree, format_to_write ok', records, records3)
    return records3
  }

  // call by formview.merge_to_change.
  // call by formview.merge_to_modifiers
  format_to_onchange(records) {
    const records2 = this.merge_tuples(records)
    const records3 = records2.map(item => {
      if ([6, 5].includes(item[0])) return item
      else {
        const [op, rid, vals] = item
        if ([2, 3, 4].includes(op)) {
          return [op, rid, false]
        } else if ([1, 0].includes(op)) {
          const x2mform = this.relation.form
          const vals2 = x2mform.format_to_onchange(vals)
          return [op, rid, vals2]
        } else {
          // never here
          return item
        }
      }
    })

    return records3
  }

  //
  // tree method
  //

  merge_tuples(records, for_write) {
    const _do_loop = (list, todo) => {
      const [op2, rid, vals] = todo

      let done = false

      const res = list.reduce((acc, tup) => {
        const op = tup[0]
        if (op === 6) acc.push(tup)
        else if (op === 5) acc = []
        else if ([4, 3, 2, 1, 0].includes(op)) {
          if (tup[1] !== rid) {
            acc.push(tup)
          } else {
            done = true
            if ([3, 2].includes(op)) {
              // 目标已经删除
              acc.push(tup)
            } else {
              // dest=4,1,0,
              if ([2, 3].includes(op2)) {
                // 源是删除
                if (op !== 0) {
                  acc.push(todo)
                }
              } else if ([4].includes(op2)) {
                // 源是添加. 目标已存在
                acc.push(tup)
              } else {
                // 源是 0,1 编辑, 目标已存在 4,1,0
                // todo: 递归处理
                let target = tup[2]
                if (for_write && op === 4) {
                  target = {}
                }

                acc.push([op2, rid, { ...target, ...vals }])
              }
            }
          }
        }

        return acc
      }, [])

      if (done) return res
      else return [...res, todo]
    }

    const records2 = records.reduce((acc, tup) => {
      const op = tup[0]
      if (op === 6) acc = [tup]
      else if (op === 5) acc = [tup]
      else if ([4, 3, 2, 1, 0].includes(op)) {
        acc = _do_loop(acc, tup)
      }

      return acc
    }, [])

    return records2
  }

  _merge_tuples_of_edit(records) {
    // 仅 merge 编辑部分. op= 0,1,2
    // 只读部分. op=4. 保留
    // 后续 cancle, modifiers, write, 必须 依据原始数据进行处理

    const is_edit = op => {
      return [0, 1, 2].includes(op)
    }

    const tuples_read = records.filter(item => !is_edit(item[0]))
    const tuples_edit = records.filter(item => is_edit(item[0]))
    return [...tuples_read, ...this.merge_tuples(tuples_edit)]
  }

  tree_cancle(records) {
    return records.filter(item => item[0] === 4)
  }

  pick_one(records, res_id) {
    const data = records.filter(item => item[1] === res_id)
    const list_read = data.filter(item => item[0] === 4)
    const list_edit = data.filter(item => item[0] !== 4)
    const record_list = this.format_to_display(list_read)
    const record = record_list.length ? record_list[0] : {}
    const values_list = this.format_to_display(list_edit)
    const values = values_list.length ? values_list[0] : {}

    return { record, values }
  }

  remove_one(records, res_id) {
    const value = [2, res_id, false]

    const records2 = [...records, value]
    const records3 = this._merge_tuples_of_edit(records2)
    return records3
  }

  upinsert_one(records, res_id, value) {
    const tuple_get = () => {
      if (!res_id) {
        return [0, virtualHelper.virtual_id(), value]
      } else {
        if (virtualHelper.is_virtual(res_id)) {
          return [0, res_id, value]
        } else {
          return [1, res_id, value]
        }
      }
    }

    // const value2 = res_id ? [1, res_id, value] : [0, false, value]

    const value2 = tuple_get()

    const records2 = [...records, value2]
    const records3 = this._merge_tuples_of_edit(records2)
    return records3
  }
}
