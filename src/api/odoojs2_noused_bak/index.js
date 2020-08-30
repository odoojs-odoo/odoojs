import odoorpc from './odoorpc'
import { ModelClass } from './odoomodel'

import odooConfig from '@/../odoo.config'

const merge_list = (src, base) => {
  return src.map(item => {
    if (typeof item === 'string') {
      if (!base[item]) {
        console.log('配置不正确,', `${src}中的下列字段不存在${item}`)
        if (odooConfig.debug) {
          alert(`${src} 中的下列字段不存在: ${item}`)
        }
      }
      return base[item]
    } else {
      return { ...base[item.name], ...item }
    }
  })
}

const merge_table_expand = (table_expand2, child_configs) => {
  if (!table_expand2) {
    return null
  }

  let field = table_expand2.field
  if (!field) {
    return null
  }

  const fs = field.split('__')
  field = fs[0]

  const config = child_configs[field]
  if (!config) {
    return null
  }

  const table_expand = {
    ...table_expand2,
    columns: merge_list(table_expand2.columns || [], config.columns || {})
  }

  return table_expand
}

const list2dict = list => {
  return list.reduce((acc, cur) => {
    acc[cur.name] = cur
    return acc
  }, {})
}

const modelCreator = (options_src = {}, base_models, env) => {
  const options = options_src

  const { name, configs = {}, extend } = options
  const base_model = base_models[name] || {}

  // console.log(' xxxxxxxxx, configs,', name)
  // 输出 错误日志时, 需要 name 这个 参数需要传递下午
  // TBD

  const {
    workflow: workflow_base = {},
    values_default: value = {},
    domain_default: domain = {},
    fields_default: fields = {},
    filterItems: filterItems_base = [],
    columns: columns_base = [],
    formItems: formItems_base = [],
    child_configs: child_configs_base = {},
    handle: handle_base = {}
  } = base_model.configs || {}

  const base_extend = base_model.extend

  const {
    workflow: workflow2 = {},
    values_default: value2 = {},
    domain_default: domain2 = {},
    fields_default: fields2 = {},
    filterItems: filterItems2 = [],
    columns: columns2 = [],
    table_expand: table_expand2,
    detail_columns: detail_columns2 = [],
    formItems: formItems2 = [],
    child_configs: child_configs2 = {},
    handle: handle2 = {}
  } = configs || {}

  const filterItems = list2dict(filterItems_base)

  // TBD 既然允许 fields_default 增加新的列
  // 那么 columns 中 也应该 允许增加新列

  const columns = list2dict(columns_base)
  const formItems = list2dict(formItems_base)

  const child_configs = Object.keys(child_configs_base).reduce((acc, child) => {
    acc[child] = {
      ...(child_configs_base[child] || {}),
      columns: list2dict(child_configs_base[child].columns),
      formItems: list2dict(child_configs_base[child].formItems)
    }
    return acc
  }, {})

  // 如果有函数 就丢失了
  const wkf_transfers = JSON.parse(
    JSON.stringify(workflow_base.transfers || {})
  )

  const workflow_transfers = Object.keys(wkf_transfers).reduce((acc, cur) => {
    acc[cur] = {
      ...(wkf_transfers[cur] || {}),
      ...((workflow2.transfers || {})[cur] || {})
    }

    return acc
  }, {})

  // 如果有函数 就丢失了
  //  const workflow = JSON.parse(JSON.stringify(workflow_base))
  const workflow = { ...workflow_base }

  if (Object.keys(workflow_transfers).length) {
    workflow.transfers = workflow_transfers
  }

  const handle = { ...handle_base, ...handle2 }

  const new_configs = {
    ...configs,
    workflow: Object.keys(workflow).length ? workflow : undefined,
    values_default: { ...value, ...value2 },
    domain_default: { ...domain, ...domain2 },
    fields_default: { ...fields, ...fields2 },
    filterItems: merge_list(filterItems2, filterItems),
    columns: merge_list(columns2, columns),
    // table_expand: table_expand2,

    table_expand: merge_table_expand(table_expand2, child_configs),

    detail_columns: merge_list(detail_columns2, columns),
    formItems: merge_list(formItems2, formItems),
    child_configs: Object.keys(child_configs2).reduce((acc, child) => {
      acc[child] = {
        ...(child_configs[child] || {}),
        ...(child_configs2[child] || {}),
        columns: merge_list(
          (child_configs2[child] || {}).columns || [],
          (child_configs[child] || {}).columns || {}
        ),
        formItems: merge_list(
          (child_configs2[child] || {}).formItems || [],
          (child_configs[child] || {}).formItems || {}
        )
      }

      return acc
    }, {}),
    handle: Object.keys(handle).length ? handle : undefined
  }

  const MyClass = base_extend ? base_extend(ModelClass) : ModelClass
  const MyClass2 = extend ? extend(MyClass) : MyClass

  return new MyClass2({
    model: name,
    configs: new_configs,
    rpc: odoorpc,
    env
  })
}

export class ODOO {
  constructor(params) {
    this.debug = odooConfig.debug
    this.init(params)
  }

  init(params = {}) {
    // eslint-disable-next-line object-curly-spacing
    const { modules = {}, models = {} } = params

    this._models = Object.keys(models).reduce((mdls, mdl) => {
      const base_model = models[mdl] || {}
      const base_extend = base_model.extend
      const MyClass = base_extend ? base_extend(ModelClass) : ModelClass
      mdls[mdl] = new MyClass({
        model: mdl,
        configs: base_model.configs,
        rpc: odoorpc,
        env
      })
      return mdls
    }, {})

    this._modules = Object.keys(modules).reduce((mdls, mdl) => {
      mdls[mdl] = modelCreator(modules[mdl], models, env)
      return mdls
    }, {})
  }

  get modules() {
    return this._modules
  }

  env(modelName) {
    const module = this._modules[modelName]
    if (module) {
      return module
    }

    const model = this._models[modelName]
    if (model) {
      return model
    }

    return env(modelName)
  }

  // Not Used
  ref(xmlid) {
    // get model and id from xmlid
    return this.env('ir.model.data').call('xmlid_to_res_model_res_id', [
      xmlid,
      true
    ])
  }

  get_userinfo() {
    return odoorpc.get_userinfo()
  }

  // 这里增加一个检查, configs merge 后，出现 undefined
  check_config(payload) {
    const _check = (cols, data_fields) => {
      const col_fields = cols.map(item => item.name).sort()
      return col_fields.reduce((acc, cur) => {
        if (!data_fields.includes(cur)) {
          acc.push(cur)
        }
        return acc
      }, [])
    }

    const to_alert = (not_in, data_fields, biz) => {
      if (not_in.length) {
        console.log(`${biz}`, not_in, data_fields)
        alert(
          `${biz}在数据中不存在: \n${not_in.join(
            ', '
          )}\n数据中有这些字段: \n${data_fields.join(', ')}`
        )
      }
    }

    const { record, columns, label } = payload
    const data_fields = Object.keys(record).sort()

    if (odooConfig.debug) {
      const not_in = _check(columns, data_fields)
      to_alert(not_in, data_fields, label)
    }
  }
}

const env = model => {
  return new ModelClass({
    model,
    env,
    rpc: odoorpc
  })
}

const odoo = new ODOO()

export default odoo
