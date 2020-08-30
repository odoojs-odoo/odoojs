// 本文件是 odoojs 的入口文件

// rpc 中为访问网络的最基础的接口
import rpcCreator from './rpc.js'
import { OdooBus } from './rpc.js'

// ModelClass 封装了 模型 模型的 CRUD 操作
import { ModelClass } from './models'

const get_addons = () => {
  // 导入 ./addons 下定义的 所有 models
  // 1. addons model : 指 addons 中的 model
  // 2. odoo model: 指 服务端 odoo 中的 model
  // 3. addons model == odoo model,
  // 4. 是对 odoo model 的 feilds_get 的 重复描述, 以便于前端处理
  // 5. 可以 多个 addons model 对应 同一个 odoo model
  // 6. addons 中 未定义的 odoo model, 可以使用, 只是 feilds_get 只有 [id, display_name ]
  // 7. addons 中 可以自己继承, 继承意味着 对应同一个 odoo model

  const odooAddonsFiles = require.context('./addons', true, /\.js$/)

  // 这个格式, 文件名 不再是 模型名
  const my_addons = odooAddonsFiles.keys().reduce((models, modulePath) => {
    // const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = odooAddonsFiles(modulePath)
    models = { ...models, ...value.default }
    return models
  }, {})

  // 这个格式 是 以 文件名作为 模型名, 现在放弃这个方法
  // const my_addons = odooAddonsFiles.keys().reduce((models, modulePath) => {
  //   // set './app.js' => 'app'
  //   const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  //   const value = odooAddonsFiles(modulePath)
  //   models[moduleName] = value.default
  //   return models
  // }, {})

  return my_addons
}

// 导入 model,
const odoojs_addons = get_addons()

// console.log('ODOO odoojs_addons, ', odoojs_addons)

// 将外部定义的模型 与 odoojs 中已有的 model 合并
const merge_addons = api_models => {
  // 重名的, 意味着 是 api_model 对 odoojs_addons 的扩展

  const api_models2 = Object.keys(api_models).reduce((acc, cur) => {
    const get_extend = (extend1, extend2) => {
      if (extend1 && extend2) {
        // 两个都有 extend, 则定义一个新函数, 实现继承
        return BaseClass => extend2(extend1(BaseClass))
      } else if (extend1 || extend2) {
        return extend1 || extend2
      } else {
        return undefined
      }
    }
    const model_in_addons = odoojs_addons[cur]

    if (model_in_addons) {
      // 外部与内部同名, 则
      // 1. merge metadata
      // 2. extend 是继承

      const model_in_api = api_models[cur]
      //
      const {
        _name: name1,
        _inherit: inherit1,
        metadata: metadata1 = {},
        extend: extend1
      } = model_in_addons

      const {
        _name: name2,
        _inherit: inherit2,
        metadata: metadata2 = {},
        extend: extend2
      } = model_in_api

      const _name = name2 || name1
      const _inherit = inherit2 || inherit1
      const metadata = merge_metadate(metadata1, metadata2)
      const extend = get_extend(extend1, extend2)

      const new_model = { _name, _inherit, metadata, extend }
      acc[cur] = new_model
    } else {
      acc[cur] = api_models[cur]
    }

    return acc
  }, {})

  return { ...odoojs_addons, ...api_models2 }
}

export class ODOO {
  constructor(params) {
    const { error, models: api_models = {}} = params
    // 这个是 外部定义的  addons
    this.api_models = api_models

    // 这个是 odoojs 自己定义的 addons
    this.odoojs_addons = odoojs_addons

    // console.log('ODOO api_models,', api_models)

    // 这里 merge odoojs_addons 及 api_models
    this.addons = merge_addons(api_models)
    console.log('ODOO addons,', this.addons)

    this.rpc = rpcCreator({ error })
    this.bus = OdooBus.getBus()
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
    return this.rpc.get_userinfo()
  }

  // env 是最重要的函数, 取模型的入口
  env(model) {
    const MyModelClass = this._get_env_class(model)
    return new MyModelClass({
      model: this._get_env_model(model),
      metadata: this._get_env_metadata(model),
      odoo: this,
      rpc: this.rpc,
      env: this.env
    })
  }

  _get_env_class(model) {
    // 搞定继承
    const ma = this.addons[model]
    if (!ma) {
      return ModelClass
    }

    // 如果有继承 则递归处理
    const MyModelClass = ma._inherit
      ? this._get_env_class(ma._inherit)
      : ModelClass
    return ma.extend ? ma.extend(MyModelClass) : MyModelClass
  }

  _get_env_model(model) {
    const ma = this.addons[model]

    return ma
      ? ma._name || (ma._inherit ? this._get_env_model(ma._inherit) : model)
      : model
  }

  _get_env_metadata(model) {
    const metadata = this._get_env_metadata2(model)
    const default_fields = { display_name: null }
    const default_columns = { display_name: { label: '名称' }}
    const metadata2 = { ...metadata }
    metadata2.fieldsForSearch = metadata.fieldsForSearch || default_fields
    metadata2.fieldsForBrowse = metadata.fieldsForBrowse || default_fields
    metadata2.fieldsForEdit = metadata.fieldsForEdit || default_fields
    metadata2.columnsForList = metadata.columnsForList || default_columns
    metadata2.columnsForView = metadata.columnsForView || default_columns
    return metadata2
  }

  _get_env_metadata2(model) {
    // merge metadata
    const ma = this.addons[model]
    if (!ma) {
      return {}
    }

    const parent = ma._inherit ? this._get_env_metadata2(ma._inherit) : {}
    const metadata = ma.metadata || {}
    return merge_metadate(parent, metadata)
  }
}

const merge_metadate = (parent_src, metadata_src) => {
  // fieldsForXxx 相似度太高了
  // 所以提供一个 fieldsForQuery, 以一抵三

  const parent = { ...parent_src }
  const metadata = { ...metadata_src }

  const fq = metadata.fieldsForQuery
  metadata.fieldsForSearch = metadata.fieldsForSearch || fq
  metadata.fieldsForBrowse = metadata.fieldsForBrowse || fq
  metadata.fieldsForEdit = metadata.fieldsForEdit || fq

  const parent2 = { ...parent }
  const metadata2 = { ...metadata }

  // 这些配置, 做覆盖操作, 这是自动生成页面用的
  const no_merge_meta = ['columnsForForm', 'columnsForList', 'columnsForView']

  const no_merge_meta2 = {}

  no_merge_meta.forEach(item => {
    no_merge_meta2[item] = metadata[item] || parent[item]
    delete parent2[item]
    delete metadata2[item]
  })

  // merge 两个 dict
  const metadat_new = merge_dict(parent2, metadata2)

  return { ...metadat_new, ...no_merge_meta2 }
}

const isDict = a => {
  if (a === null) {
    return false
  }
  return typeof a === 'object' && !Array.isArray(a)
}

const merge_dict = (dict1 = {}, dict2 = {}) => {
  // 取出第一层的所有 key, 去重复
  const keys = [...new Set([...Object.keys(dict1), ...Object.keys(dict2)])]

  return keys.reduce((acc, cur) => {
    const value1 = dict1[cur]
    const value2 = dict2[cur]

    if (value1 !== undefined && value2 !== undefined) {
      if (isDict(value1) && isDict(value2)) {
        // 都是字典 做 递归处理
        acc[cur] = merge_dict(value1, value2)
      } else {
        // 至少有一个不是字典, 直接取第二个
        acc[cur] = value2
      }
    } else {
      if (value2 !== undefined) {
        acc[cur] = value2
      } else if (value1 !== undefined) {
        acc[cur] = value1
      }
    }

    return acc
  }, {})
}

// odoojs 对外的出口
const odooCreator = payload => {
  return new ODOO(payload)
}

export default odooCreator
