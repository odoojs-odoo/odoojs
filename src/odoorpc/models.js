import controllers from './controllers'

const web = controllers.web

class MetaModel {
  constructor() {
    //
  }

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
    const kwargs2 = { ...kwargs }

    if (!Object.keys(kwargs).includes('context'))
      kwargs2.context = this.env.context

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

export class Model extends MetaModel {
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
    return this.execute('onchange', ids, values, field_name, field_onchange)
  }

  // static async onchange(ids, values, field_name, field_onchange) {
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
