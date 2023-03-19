import { X2mBase } from './x2mbase'

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

const tuples_helper = {
  _virtual_id: 1,

  virtual_id() {
    this._virtual_id = this._virtual_id + 1
    const vid = this._virtual_id
    return `virtual_${vid}`
  },

  // vals_remove_parent(vals, relation_field) {
  //   return Object.keys(vals).reduce((acc, fld) => {
  //     if (fld !== relation_field) {
  //       acc[fld] = vals[fld]
  //     }
  //     return acc
  //   }, {})
  // },

  _to_append(valuesList, tup) {
    const op = tup[0]
    if (op === 0) {
      const vid = this.virtual_id()
      return [
        ...valuesList,
        // [0, vid, this.vals_remove_parent(tup[2], relation_field)]
        [0, vid, tup[2]]
      ]
    } else if (op === 1) {
      const vid = tup[1]
      const nop = typeof vid === 'string' ? 0 : 1
      return [...valuesList, [nop, vid, tup[2]]]
    } else if ([2, 3, 4, 5, 6].includes(op)) {
      return [...valuesList, tup]
    } else {
      return [...valuesList]
    }
  },

  _to_merge(valuesList) {
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
              if ([2, 3].includes(op2)) {
                // 源是删除
                if (op !== 0) {
                  acc.push(todo)
                }
              } else if ([4].includes(op2)) {
                // 源是添加. 目标已存在
                acc.push(tup)
              } else {
                // 源是编辑
                const target = op !== 4 ? tup[2] : {}
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

    return valuesList.reduce((acc, tup) => {
      const op = tup[0]
      if (op === 6) acc = [tup]
      else if (op === 5) acc = [tup]
      else if ([4, 3, 2, 1, 0].includes(op)) {
        acc = _do_loop(acc, tup)
      }

      return acc
    }, [])
  },

  to_return(valuesList, tup) {
    const list1 = this._to_append(valuesList, tup)
    return this._to_merge(list1)
  },

  to_onchange(valuesList) {
    return valuesList.map(item => {
      if ([6, 5].includes(item[0])) return item
      else {
        const [op, rid, vals] = item
        if ([2, 3, 4].includes(op)) {
          return [op, rid, false]
        } else if ([1, 0].includes(op)) {
          return [op, rid, vals]
        } else {
          // never here
          return item
        }
      }
    })
  }
}

export class X2mTreeBase extends X2mBase {
  // 是 tree 和  kanban 的 共用 class
  constructor(field_info, payload) {
    const { type = 'tree' } = payload
    super(field_info, { ...payload, type })
  }
}

export class X2mTree extends X2mTreeBase {
  constructor(field_info, payload) {
    super(field_info, { ...payload, type: 'tree' })
  }

  async read(ids) {
    // console.log('X2mTree read: ', ids, this.field_info)

    const fields_tree = this.fields
    const fields_form = this.field_info.views.form.fields
    const fields_list = Object.keys({ ...fields_tree, ...fields_form })

    // console.log('X2mTree read: ', ids, fields_list)

    // const fields_list = this.fields_list
    const res = await this.Model.read(ids, fields_list)
    // console.log('X2mTree read: ', ids, res)
    return res
  }

  async search_read(domain = []) {
    const fields = this.fields_list
    const res = await this.Model.search_read({ domain, fields })
    return res
  }

  commit_by_remove(values, res_id) {
    const value = [2, res_id, false]
    return tuples_helper.to_return(values, value)
  }

  commit_by_upinsert(values, res_id, value) {
    const value2 = res_id ? [1, res_id, value] : [0, false, value]
    return tuples_helper.to_return(values, value2)
  }

  //
  //  merge data: record, values
  //
  _merge_tuples_for_display(records) {
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
          // 未考虑嵌套
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

  merge_for_display(records_in, values) {
    const records = [...records_in.map(item => [4, item.id, item]), ...values]
    return this._merge_tuples_for_display(records)
  }

  merge_for_onchange(records, values) {
    // const value = [2, res_id, false]
    // return tuples_helper.to_return(values, value)

    const old_tuples = records.map(item => [4, item.id, false])
    const tuples_todo = [...old_tuples, ...values]
    const tuples_merged = tuples_helper._to_merge(tuples_todo)
    return tuples_helper.to_onchange(tuples_merged)
  }

  //
  //
  // todo
  // todo  2nd  处理  主表 _get_values_for_write()
  //

  // 主表 _get_values_for_write.
  // 嵌套处理o2m 时 使用. 获取 values_write
  // 应该先解耦.
  //
  // 主表新增, o2m 字段有默认值时使用.
  // 主要是处理  [0, false, {}] 为 [0, vid, {}]
  //  应该无其他作用.
  //
  read_for_new_o2m(tuples) {
    // const ids = tuples_to_ids(tuples)
    console.log('read_for_new_o2m', this.field_info, tuples)

    const res = tuples.reduce(
      (acc, tuple) => {
        const { values } = acc
        const {
          values: values_ret,
          values_onchange,
          values_write
        } = this.commit([], values, tuple)

        // console.log('xxxxx', { values_ret, values_onchange })
        acc.values = values_ret
        acc.values_write = [...values_write]
        acc.values_onchange = [...values_onchange]

        return acc
      },
      { values: [], values_onchange: [], values_write: [] }
    )

    const vals = res.values.map(tuple => {
      return { id: tuple[1], ...tuple[2] }
    })

    return { ...res, values_display: vals }
  }

  // todo  2nd  处理
  // 主表 _get_values_for_write()
  // call read_for_new_o2m()
  // call commit()
  // call _x2m_tuples_for_write()
  //
  // 该函数 改造为 服务于 主表 _get_values_for_write 的 嵌套 递归函数
  _x2m_tuples_for_write(records, values3) {
    // console.log('_x2m_tuples_for_write', records, values3)
    return values3.map(item => {
      const op = item[0]
      if ([1, 0].includes(op)) {
        const record_me = op === 1 ? records.find(it => it.id) || {} : {}
        const values_me = item[2]
        // const state_value =
        //   'state' in values_me ? values_me.state : record_me.state

        // console.log('in model', record, values)

        const vals_write = this.Model._get_values_for_write(
          record_me,
          values_me
        )

        // console.log('_x2m_tuples_for_write2', vals_write)

        return [op, item[1], vals_write]
      } else {
        return item
      }
    })
  }

  // 主表 _get_values_for_write()
  // call read_for_new_o2m()
  // call commit()
  // 解决了 read_for_new_o2m() 之后. 可删除 commit()
  //
  // btw:
  // editmodel._update_parent()
  // call tree.commit
  // 解决了 editmodel._update_parent() 之后. 可删除 commit()
  commit(records, values, value) {
    // console.log('sub tree, commit', cp(this.field_info))
    // console.log('sub tree, commit', cp([records, values, value]))

    // const { relation_field } = this.field_info

    const to_write = (records, values3) => {
      // const values3 = tuples_helper.to_onchange(values2)

      return this._x2m_tuples_for_write(records, values3)
    }

    const values_ret = tuples_helper.to_return(values, value)
    // console.log('sub tree, values_ret', cp(values_ret))

    const old_tuples = records.map(item => [4, item.id, false])
    const tuples_todo = [...old_tuples, ...values_ret]
    const tuples_merged = tuples_helper._to_merge(tuples_todo)
    const values_onchange = tuples_helper.to_onchange(tuples_merged)

    const values_write = to_write(records, values_onchange)
    // console.log('sub tree, values_write', cp(values_write))

    // console.log('sub tree, values_onchange', cp(values_onchange))

    return { values: values_ret, values_onchange, values_write }
  }
}

// 待整理的函数
class X2mTree2 extends X2mTreeBase {
  constructor(field_info, payload) {
    super(field_info, { ...payload, type: 'tree' })
  }

  // // 主表新增. m2m 字段有默认值时, 使用. 功能尚未调试.
  // // 功能实在简单. 调试时, 直接废弃该函数
  // async read_for_new_m2m(tuples) {
  //   const ids = tuples_to_ids(tuples)
  //   // console.log('read_for_new_m2m1', ids)
  //   return this.read(ids)
  //   // console.log('read_for_new_m2m1', ids, res)
  // }

  // // 无人在用
  // async read_for_new(tuples) {
  //   return this.read_for_new_m2m(tuples)
  // }

  // // hw used. 其他不用
  // read_for_new_x2m(tuples) {
  //   if (this.field_info.type === 'one2many') {
  //     const res = this.read_for_new_o2m(tuples)
  //     // {        values, values_onchange, values_write      }
  //     return res
  //   } else if (this.field_info.type === 'many2many') {
  //     const ret = async () => {
  //       return {
  //         values_display: await this.read_for_new_m2m(tuples)
  //       }
  //     }

  //     return ret()
  //   } else {
  //     return {
  //       values_display: []
  //     }
  //   }
  // }

  // // 只有 formview.relation_onchange 在用
  // values_display(records, values) {
  //   return []
  //   // console.log(this.field_info)
  //   // console.log('o2m values_display', records, values)
  //   // const { type } = this.field_info

  //   // if (type === 'many2many') {
  //   //   return this.values_display_for_m2m(records, values)
  //   // } else {
  //   //   return this.values_display_for_o2m(records, values)
  //   // }
  // }

  // // 只有 formview.relation_onchange 在用
  // values_display_for_m2m(records, values_in) {
  //   const old = records.length
  //     ? [[6, records, records.map(item => item.id)]]
  //     : []

  //   const values = [...old, ...values_in]

  //   const vals = values.reduce((acc, tup) => {
  //     const op = tup[0]

  //     if (op === 6) {
  //       acc = tup[1]
  //     } else if (op === 5) {
  //       acc = []
  //     } else {
  //       //
  //     }

  //     return acc
  //   }, [])
  //   // console.log('values2,', vals)

  //   return [...vals]
  // }

  // // 只有 o2m fields 显示数据用. 处理逻辑 与 tuples_helper 归为一类
  // values_display_for_o2m(records, values_in) {
  //   // console.log('o2m values_display_for_o2m', records, values_in)
  //   const res = this.merge_for_display(records, values_in)
  //   console.log(res)
  //   return res
  //   // // 1. records 是 只读数据  list
  //   // // 2. values_in 是编辑有的  tuples
  //   // // 3. 合并为  tuples = [[4, oldid, {val}], [tuples]]
  //   // // 4. tuples 转为 数据 list
  //   // // 6. 如果是 合并 [4, oldid, {vals}], [1, id, {vals}]. 是合并 vals
  //   // // 7. 合并 vals 需要嵌套处理

  //   // const fields_tree = this.fields
  //   // const fields_form = this.field_info.views.form.fields
  //   // const fields = { ...fields_tree, ...fields_form }
  //   // // console.log(fields)

  //   // const values = [...records.map(item => [4, item.id, item]), ...values_in]

  //   // // console.log(records, values)

  //   // const merge = (rec, vals) => {
  //   //   const all_keys = Object.keys({ ...rec, ...vals })
  //   //   return all_keys.reduce((acc, fld) => {
  //   //     const meta = fields[fld] || {}
  //   //     if (meta.type === 'many2many') {
  //   //       acc[fld] = fld in vals ? tuples_to_ids(vals[fld]) : rec[fld]
  //   //     } else if (meta.type === 'one2many') {
  //   //       // 未考虑嵌套
  //   //       acc[fld] = []
  //   //     } else {
  //   //       acc[fld] = fld in vals ? vals[fld] : rec[fld]
  //   //     }
  //   //     return acc
  //   //   }, {})
  //   // }

  //   // const vals = values.reduce((acc, tup) => {
  //   //   const op = tup[0]

  //   //   if (op === 6) {
  //   //     // m2m table 编辑时 会用到
  //   //     // acc = this.m2m_records
  //   //     acc = []
  //   //   } else if (op === 5) {
  //   //     acc = []
  //   //   } else if ([3, 2].includes(op)) {
  //   //     acc = acc.filter(item => item.id !== tup[1])
  //   //   } else if (op === 4) {
  //   //     const me = acc.find(item => tup[1] === item.id)
  //   //     if (!me) acc = [...acc, tup[2]]
  //   //   } else if (op === 1 || op === 0) {
  //   //     const rec_index = acc.findIndex(item => item.id === tup[1])
  //   //     const rec_me = rec_index >= 0 ? acc[rec_index] : {}
  //   //     const me = merge(rec_me, tup[2])

  //   //     const me2 = op === 0 ? { id: tup[1], ...me } : me

  //   //     if (rec_index >= 0) acc[rec_index] = me2
  //   //     else acc.push(me2)
  //   //   } else {
  //   //     //
  //   //   }

  //   //   return acc
  //   // }, [])
  //   // // console.log('values2,', vals)

  //   // return [...vals]
  // }
}
