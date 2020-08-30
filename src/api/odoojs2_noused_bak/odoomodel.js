// TBD 2019-12-17
// m2m 字段的默认值 需要额外处理
function _format_values(self, values_src) {
  // eslint-disable-next-line object-curly-spacing
  const { values_default = {} } = self.configs || {}
  // console.log('_format_values', values_src, values_default)
  return { ...values_default, ...values_src }
}

function _format_fields(self, field_src) {
  // eslint-disable-next-line object-curly-spacing
  const { fields_default = {} } = self.configs || {}

  const array2dict = fs => {
    return fs.reduce((acc, fld) => {
      const nfs = {}
      nfs[fld] = null
      acc[fld] = nfs
      return acc
    }, {})
  }

  const fld_default = Array.isArray(fields_default)
    ? array2dict(fields_default)
    : fields_default

  const fld_src = Array.isArray(field_src) ? array2dict(field_src) : field_src

  return { ...fld_default, ...fld_src }
}

// 简单的 domain, 都是 与 关系的, 可以用 dict 传参数,
// 复杂的 domain, 有 或 非 关系的, 依然可以用 list 格式
// global_domain 是个函数, 用于设置全局的/与用户有关的过滤条件
function _format_domain(self, domain_src = {}) {
  const global = self.global_domain()

  // eslint-disable-next-line object-curly-spacing
  const { domain_default = {} } = self.configs || {}
  let domain = []
  let domain_dict = {}
  if (Array.isArray(domain_default)) {
    domain = [...domain, ...domain_default]
  } else {
    domain_dict = { ...domain_dict, ...domain_default }
  }

  if (Array.isArray(domain_src)) {
    domain = [...domain, ...domain_src]
  } else {
    domain_dict = { ...domain_dict, ...domain_src }
  }

  if (Array.isArray(global)) {
    domain = [...domain, ...global]
  } else {
    domain_dict = { ...domain_dict, ...global }
  }

  return [domain, domain_dict]
}

async function _filter_and_form_Options(self, items_src, childFieldName) {
  const items_src_sort = items_src.map(item => item.name)
  const select_types = ['select', 'cascader', 'select2', 'radio']

  // console.log('xxxxx,items_src_sort', items_src_sort)

  // 不是 select 字段, 不需要 not to call
  const not_select = items_src.filter(item => !select_types.includes(item.type))

  // 是 select 字段,
  const is_select = items_src.filter(item => select_types.includes(item.type))

  // 是 select 字段, options_for_select 未定义,  需要 to call
  //    options_for_select_init = to call
  const not_defined = is_select.filter(item => !item.options_for_select)

  // 是 select 字段, options_for_select 已经定义,  继续判断 options
  const is_defined = is_select.filter(item => item.options_for_select)

  // 是 select 字段, options_for_select 已经定义,  options 已定义, 需要 to call
  //    options_for_select_init = to call
  const is_defined_and_defined = is_defined.filter(item => item.options)

  // 是 select 字段, options_for_select 已经定义,  options 未定义, 不需要 to call
  const is_defined_and_not_defined = is_defined.filter(item => !item.options)

  const is_to_call = [...not_defined, ...is_defined_and_defined]
  const not_to_call = [...not_select, ...is_defined_and_not_defined]

  // eslint-disable-next-line space-before-function-paren
  const to_call = async (self, items_call, childFieldName) => {
    if (!items_call.length) {
      return items_call
    }
    const fields = _filter_and_form_Options2(self, items_call, childFieldName)

    const fields2 = Object.keys(fields).reduce((acc, item) => {
      acc[fields[item].name] = fields[item].options
      return acc
    }, {})

    const options = await self.call('get_options', [fields2])

    // const items = [...(items_src || [])]
    return items_call.map(item => {
      item.options_for_select_init = options[fields[item.name].name]
      return item
    })
  }

  //  console.log('xxxxx,is_to_call', is_to_call)

  const is_to_call2 = await to_call(self, is_to_call, childFieldName)

  const items_return_list = [...is_to_call2, ...not_to_call]

  const items_return_dict = items_return_list.reduce((acc, cur) => {
    acc[cur.name] = cur
    return acc
  }, {})

  const sss = items_src_sort.map(item => items_return_dict[item])

  return sss
}

function _filter_and_form_Options2(self, items_src, childFieldName) {
  const items = [...(items_src || [])]

  return items.reduce((acc, item) => {
    let name = item.name
    const ns = name.split('__')
    if (ns.length > 1) {
      name = ns[0]
    }

    if (childFieldName) {
      name = `${childFieldName}.${name}`
    }

    const options = item.options || {}

    // domain maybe list or dict or function
    // eslint-disable-next-line object-curly-spacing
    const { domain: domain_src = {}, domain2: domain2_src = {} } = options

    const domain_src2 =
      typeof domain_src === 'function' ? domain_src({ self }) : domain_src
    const domain2_src2 =
      typeof domain2_src === 'function' ? domain2_src({ self }) : domain2_src

    let domain = []
    let domain_dict = {}
    if (Array.isArray(domain_src2)) {
      domain = [...domain, ...domain_src2]
    } else {
      domain_dict = { ...domain_dict, ...domain_src2 }
    }
    if (Array.isArray(domain2_src2)) {
      domain = [...domain, ...domain2_src2]
    } else {
      domain_dict = { ...domain_dict, ...domain2_src2 }
    }

    acc[item.name] = {
      name,
      options: { ...options, domain, domain2: domain_dict }
    }

    return acc
  }, {})
}

export class ModelClass {
  constructor(options = {}) {
    const { model, configs, rpc, env } = options
    this.model = model
    this.configs = configs
    this.rpc = rpc
    this.env = env
  }

  get_userinfo() {
    return this.rpc.get_userinfo()
  }

  call(method, args, kwargs) {
    return this.rpc.call(this.model, method, args, kwargs)
  }

  // TBD  判断 数组或 字典
  global_domain(domain = {}) {
    // to be overrided
    // const domain = { ...domain_src }
    // const userinfo = this.get_userinfo()
    // const { uid } = userinfo
    // domain.create_uid = uid
    return domain
  }

  async formOptions(items, childField) {
    return _filter_and_form_Options(this, items, childField)
  }

  async filterOptions(items) {
    return _filter_and_form_Options(this, items)
  }

  async default_get(fields, context) {
    const method = 'default_get'
    const args = [fields]
    const kwargs = { context }
    const res = await this.call(method, args, kwargs)
    return res
  }

  // 2019-12-8 no used
  async fields_get(kwargs) {
    // const { allfields, attributes } = kwargs
    const method = 'fields_get'
    const args = []
    const res = await this.call(method, args, kwargs)
    return res
  }

  // Not Used
  ref(xmlid) {
    // get model and id from xmlid
    return this.env('ir.model.data').call('xmlid_to_res_model_res_id', [
      xmlid,
      true
    ])
  }

  search_read(kwargs) {
    return this.call('search_read', [], kwargs)
  }

  async search_count(domain = {}) {
    const method = 'search_count2'
    const [domain_list, domain_dict] = _format_domain(this, domain)
    const args = []
    const kwargs = { domain: domain_list, domain2: domain_dict }
    return await this.call(method, args, kwargs)
  }

  async browse_one(id, query = {}) {
    const res = await this.browse(id, query)
    return res && res.length === 1 ? res[0] : {}
  }

  async browse(id, query = {}) {
    // eslint-disable-next-line object-curly-spacing
    const { fields: field_src = {} } = query
    const fields = _format_fields(this, field_src)
    const method = 'read2'

    // 判断 id 是数组或 int
    const args = [
      Array.isArray(id) ? id.map(item => parseInt(item)) : parseInt(id)
    ]
    const kwargs = {
      fields: fields || { name: null }
    }

    // read2 返回值是 数组
    const records = await this.call(method, args, kwargs)

    // console.log('xxxxxxx, browse,', this.model, records)

    return records
  }

  async search(query = {}) {
    // const sss = await this.fields_get()
    // console.log('xxxxxxx,fields_get', sss)
    const {
      domain = {}, // 目前的前端 都是简单的 domian ={}
      fields: field_src = {},
      page = 1,
      limit = 0,
      order = ''
    } = query

    const fields = _format_fields(this, field_src)

    const [domain_list, domain_dict] = _format_domain(this, domain)

    const method = 'search_read2'
    const args = []
    const kwargs = {
      domain: domain_list,
      domain2: domain_dict,
      fields: fields || { name: null },
      offset: (page - 1) * limit,
      limit,
      order
    }

    const records = await this.call(method, args, kwargs)

    return records
  }

  async create(temp = {}, kwargs = {}) {
    const tempData = Object.assign({}, temp)
    delete tempData.id

    const values = _format_values(this, tempData)
    const method = 'create2'
    const args = [values]
    return await this.call(method, args, kwargs)
  }

  async write(temp = {}, kwargs = {}) {
    const tempData = Object.assign({}, temp)
    delete tempData.id
    const values = _format_values(this, tempData)

    const method = 'write2'
    const args = [temp.id, values]
    return await this.call(method, args, kwargs)
  }

  async unlink(temp = {}) {
    const method = 'unlink'
    const args = [temp.id]

    return await this.call(method, args)
  }

  async wizard_submit(actionName, values, kwargs = {}) {
    // console.log(
    //   'xxxxxx, wizard_submit in odoo model, ',
    //   this.model,
    //   actionName,
    //   values
    // )

    const { record } = kwargs
    const action = this.configs.workflow.actions[actionName]
    const wizard_model = action.wizard.model
    const wizard_method = action.wizard.method

    const { id: wizard_id } = values
    const vals = { ...values }
    delete vals.id

    const refuse_ret = await this.call(
      'wizard_submit',
      [record.id, wizard_model, wizard_id, vals, wizard_method],
      {
        onchange: action.wizard.onchange
      }
    )

    // console.log('xxxxxx, wizard_submit', refuse_ret)
    return refuse_ret
  }

  async report_print(params) {
    // eslint-disable-next-line object-curly-spacing
    const { model, values = {}, fields = {} } = params

    const vals = { ...values }
    delete vals.id

    const res = await this.call('report_print', [model, values.id, vals], {
      fields
    })
    // console.log('xxxx,rpt2,', res)

    return res
  }

  async report_wizard_create(params) {
    // eslint-disable-next-line object-curly-spacing
    const { model, fields = {}, context = {} } = params
    const wizard = await this.call('wizard_create', [0, model, {}], {
      onchange: ['_onchange_company_id'],
      fields,
      context
    })
    console.log('xxxx,wizard,', wizard)

    return wizard[0]
  }

  async wizard_create(actionName, { record }) {
    const action = this.configs.workflow.actions[actionName]
    const {
      model,
      vals: vals_src = {},
      context: context_src = {},
      fields = {}
    } = action.wizard

    const vals = { ...vals_src }
    Object.keys(vals_src).forEach(item => {
      if (typeof vals_src[item] === 'function') {
        const wizard = this.configs.workflow.actions[actionName].wizard
        vals[item] = vals_src[item]({ self: this, wizard, record })
      }
    })

    const context = { ...context_src }

    Object.keys(context_src).forEach(item => {
      if (typeof context_src[item] === 'function') {
        const wizard = this.configs.workflow.actions[actionName].wizard
        context[item] = context_src[item]({ self: this, wizard, record })
      }
    })

    const wizard_rec = await this.call(
      'wizard_create',
      [record.id, model, vals],
      {
        context,
        onchange: action.wizard.onchange,
        fields
      }
    )

    // console.log('xxxxx,wizard_ create,', wizard_rec)

    return wizard_rec[0]
  }

  async workflow(params = {}) {
    // console.log('workflow,xxxxx', this)
    // kwargs 是额外的参数
    // eslint-disable-next-line object-curly-spacing
    const { rec, next, last, kwargs = {} } = params

    const action = this.configs.workflow.actions[next]

    const last_in = action.last_in
    if (last_in && !last_in.includes(last)) {
      console.log('workflow,xxxxx, no', next, last)
      return false
    }

    // 非 wizard, 直接 call
    if (!(action.odoo_type && action.odoo_type === 'action')) {
      const method = action.method
      if (this[method]) {
        // console.log('xxxxx, workflow, method ', method)
        return await this[method](rec.id, { ...kwargs, record: rec })
      } else {
        // console.log('xxxxx, workflow else, method ', method)
        return await this.call(method, [rec.id], kwargs)
      }
    }
    // console.log('xxxxxx, wkf in odoo model, ', this.model, action)
    const wizard_rec = await this.wizard_create(next, { record: rec })

    return wizard_rec
  }
}

const creater = options => {
  return new ModelClass(options)
}
export default creater
