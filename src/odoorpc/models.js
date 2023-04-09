import controllers from './controllers'

const web = controllers.web

class MetaModel {
  constructor() {}

  static get _name() {
    return this._model
  }

  static get res_model() {
    return this._model
  }

  static get env() {
    return this._env
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
    const { context = this.env.context } = kwargs

    const kwargs2 = { ...kwargs, context }

    // if (!Object.keys(kwargs).includes('context'))
    //   kwargs2.context = this.env.context

    const payload = { model: this._name, method, args, kwargs: kwargs2 }
    return web.dataset.call_kw(payload)
  }

  static async call_button(method, rids, kwargs = {}) {
    const args = [rids]
    const payload = { model: this._name, method, args, kwargs }
    return web.dataset.call_button(payload)
  }

  static async execute(method, ...args) {
    return this.execute_kw(method, args, {})
  }
}

MetaModel._env = undefined
MetaModel._model = undefined

class BaseModel extends MetaModel {
  constructor(payload = {}) {
    super(payload)
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

  /** 分组 */

  static async read_progress_bar(domain, group_by, progress_bar) {
    // const progress_bar = {
    //   colors: {
    //     planned: 'success',
    //     today: 'warning',
    //     overdue: 'danger'
    //   },
    //   overdue: 'danger',
    //   planned: 'success',
    //   today: 'warning',
    //   field: 'activity_state',
    //   modifiers: {},
    //   sum_field: false
    // }

    return this.execute_kw('read_progress_bar', [], {
      domain,
      group_by,
      progress_bar
    })
  }

  static async web_read_group(kwargs = {}) {
    // domain, fields, groupby,
    // limit=None, offset=0, orderby=False,
    // lazy=True,
    // expand=False, expand_limit=None, expand_orderby=False

    return this.execute_kw('web_read_group', [], kwargs)
  }

  static async web_search_read(kwargs = {}) {
    const res = await this.execute_kw('web_search_read', [], kwargs)
    const { length, records } = res
    return { length, records: this._format_result(records) }
  }

  static _format_dict(one) {
    const fmt = (fld, val) => {
      const meta = this._fields[fld] || {}

      // m2o, false, [id, 'name']
      // x2m, [], [ids,1,2,3,4]
      // selection, false, 'string'
      // date, false, 'yyyy-mm-dd'
      // datetime, false, 'yyyymmdd hh:mm:ss.sssssss'
      //

      if (meta.type === 'boolean') {
        return val
      } else if (meta.type === 'integer') {
        return val || 0
      } else if (meta.type === 'float') {
        return val || 0.0
      } else if (meta.type === 'monetary') {
        return val || 0.0
      } else if (meta.type === 'datetime') {
        // datetime, false, 'yyyymmdd hh:mm:ss.sssssss'
        if (!val) {
          return val || null
        } else {
          // val = 'yyyymmdd hh:mm:ss.sssssss'  utc
          const utc_val = new Date(`${val.split(' ').join('T')}Z`)
          // new Date('2022-02-01T22:22:33Z')
          // 兼容不通浏览器

          // // todo 读取信息后. 若这里转换, 涉及到其他地方的处理
          // 1. 编辑时的 onchange 处理.  2023-2-13 已经处理好 onchange
          // 2. 还有其他问题么? 2023-2-13

          return utc_val
        }
      } else {
        return val || null
      }
    }

    return Object.keys(one).reduce((acc, fld) => {
      acc[fld] = fmt(fld, one[fld])
      return acc
    }, {})
  }

  static _format_result(result) {
    return result.map(one => {
      return this._format_dict(one)
    })
  }

  static async search_read(kwargs = {}) {
    const res = await this.execute_kw('search_read', [], kwargs)
    return this._format_result(res)
  }
  static async read_one(ids, kwargs = {}) {
    const recs = await this.read(ids, kwargs)
    if (recs.length) {
      return recs[0]
    } else {
      return {}
    }
  }

  static async read(ids, kwargs = {}) {
    const method = 'read'
    const get_args_kwargs = () => {
      if (Array.isArray(kwargs)) return [[ids, kwargs], {}]
      const { fields = [], ...kwargs2 } = kwargs
      return [[ids, fields], kwargs2]
    }

    const [args, kwargs2] = get_args_kwargs()
    const res = await this.execute_kw(method, args, kwargs2)
    return this._format_result(res)
  }

  static async copy(rid) {
    const method = 'copy'
    return this.execute(method, rid)
  }

  static async write(rid, vals, kwargs) {
    const method = 'write'
    const args = [rid, vals]
    return this.execute_kw(method, args, kwargs)
    // return this.execute(method, rid, vals)
  }

  static async create(vals, kwargs) {
    const method = 'create'
    const args = [vals]
    return this.execute_kw(method, args, kwargs)
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

  static async onchange(ids, values, field_name, field_onchange, kwargs = {}) {
    const args = [ids, values, field_name, field_onchange]
    const res = await this.execute_kw('onchange', args, kwargs)
    const { value } = res
    return { ...res, value: this._format_dict(value) }
  }
}

export class Model extends BaseModel {
  constructor(payload = {}) {
    super(payload)
  }

  // todo 不取所有字段. 应该取当前页面
  // groups 有权限的 字段
  // 实际上 影响不大
  // 参考测试: account.move 的 partner_shipping_id 字段
  static _get_field_onchange() {
    const o2m_get = (views, pfld) => {
      const flds = Object.keys(views).reduce((acc, view) => {
        return { ...acc, ...(views[view].fields || {}) }
      }, {})

      return Object.keys(flds).reduce((acc, fld) => {
        return { ...acc, [`${pfld}.${fld}`]: '1' }
      }, {})
    }

    return Object.keys(this._fields)
      .filter(fld => !this._fields[fld].disable_field_onchange)
      .reduce((acc, fld) => {
        acc[fld] = '1'
        const meta = this._fields[fld]
        if (meta.type === 'one2many') {
          const o2m_fields = o2m_get(meta.views || {}, fld)
          // console.log('_get_field_onchange', fld, meta.type, meta.views, o2m_fields)
          acc = { ...acc, ...o2m_fields }
        }
        return acc
      }, {})
  }

  static async web_onchange_new(values = {}, { context }) {
    const field_onchange = this._get_field_onchange()

    const result = await this.onchange([], values, [], field_onchange, {
      context
    })
    return result
  }

  static async web_onchange(...args) {
    const [res_ids = [], values = {}, field_name, kwargs = {}] = args
    const field_onchange = this._get_field_onchange()
    const args2 = [res_ids, values, field_name, field_onchange, kwargs]
    const result = await this.onchange(...args2)
    return result
  }

  static async web_commit(res_id, values, kwargs = {}) {
    if (!values) return res_id
    if (!Object.keys(values).length) {
      const { context = {} } = kwargs
      const { active_ids, active_id } = context
      if (!(active_ids || active_id)) return res_id
    }

    if (res_id) {
      await this.write(res_id, values, kwargs)
      return res_id
    } else {
      return this.create(values, kwargs)
    }
  }

  // eslint-disable-next-line no-unused-vars
  static async call_button_after(name, action, kwargs) {
    console.log('call_button_after', name, action, kwargs)
    // to overide
    return action
  }

  //  bakup.  odoo13

  // static async onchange_for_odoo13(ids, values, field_name, field_onchange) {
  //   return this.execute('onchange', ids, values, field_name, field_onchange)

  //   // const session_info = this._odoo.session_info
  //   // const server_version_info = session_info.server_version_info
  //   // const version = server_version_info[0]
  //   // const is_call_default =
  //   //   (!field_name || (Array.isArray(field_name) && !field_name.length)) &&
  //   //   version == 13

  //   // // console.log(version, is_call_default)
  //   // if (is_call_default)
  //   //   return this.default_get_onchange(values, field_onchange)
  //   // else
  //   //   return this.execute('onchange', ids, values, field_name, field_onchange)
  // }

  //   static async default_get_onchange(values, field_onchange) {
  //     const fields = Object.keys(field_onchange).filter(
  //       fld => fld.split('.').length === 1
  //     )

  //     const default_get1 = await this.default_get(fields)

  //     const _get_default = col => {
  //       const meta = this._fields[col]

  //       if (['many2many'].includes(meta.type)) return [[6, false, []]]
  //       else if (['one2many'].includes(meta.type)) return []
  //       else if (['float', 'integer', 'monetary'].includes(meta.type)) return 0
  //       else if (['text', 'html'].includes(meta.type)) return ''
  //       return false
  //     }

  //     const values_onchange2 = fields.reduce((acc, cur) => {
  //       acc[cur] = _get_default(cur)
  //       return acc
  //     }, {})

  //     const values_onchange = { ...values_onchange2, ...values, ...default_get1 }

  //     const field_name = fields
  //     const args = [[], values_onchange, field_name, field_onchange]
  //     const onchange = await this.execute('onchange', ...args)

  //     // # TBD: default_get 里面 可能有 m2o o2m 需要处理
  //     // default_get, m2o 返回值 是 id, 需要 补充上 display_name
  //     const default_get2 = {}

  //     for (const col of Object.keys(default_get1)) {
  //       const meta = this._fields[col]
  //       // console.log('default get 2', col, meta, default_get1)

  //       // TBD, res.config.settings 出现了  meta 为空的 情况

  //       if (meta && meta.relation && meta.type === 'many2one') {
  //         const ref_val = default_get1[col]

  //         if (ref_val) {
  //           const ref_ids = Array.isArray(ref_val) ? ref_val : [ref_val]
  //           const domain = [['id', 'in', ref_ids]]
  //           const ref_records = await this.env
  //             .model(meta.relation)
  //             .execute_kw('name_search', [], { args: domain })

  //           const ref_rec = ref_records[0]

  //           default_get2[col] = [...ref_rec]
  //         } else {
  //           default_get2[col] = default_get1[col]
  //         }
  //       } else {
  //         default_get2[col] = default_get1[col]
  //       }
  //     }

  //     // const values_ret = { ...values, ...default_get2, ...onchange.value }
  //     const values_ret = { ...default_get2, ...onchange.value }
  //     const onchange2 = { ...onchange, value: values_ret }

  //     return onchange2
  //   }
}
