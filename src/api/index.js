// import { Dialog } from 'vant'
// import { Toast } from 'vant'

import odooCreator from './odoojs'

const get_models = () => {
  // 导入 ./models 下定义的 所有 models
  // 1. 这些 models 作为 odoojs.addons 的 扩展
  // 2. 如果 同名, 则是扩展, 后续 merge 在一起
  // 2. 否则, 则是新增, 后续 merge 在一起

  const modelsFiles = require.context('./models', true, /\.js$/)

  const my_models = modelsFiles.keys().reduce((models, modulePath) => {
    // const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modelsFiles(modulePath)
    models = { ...models, ...value.default }
    return models
  }, {})

  return my_models
}

// 这里导入 本项目定义的 model 扩展
const api_models = get_models()

// console.log('api_models, ', api_models)

// 这里定义全局的 网络请求错误处理
const error = err => {
  console.log('odooapi, error,', err)
  console.log('odooapi, error.code,', err.code)
  console.log('odooapi, error.name,', err.name)
  console.log('odooapi, error.message,', err.message)
  console.log('odooapi, error.data,', err.data)

  // Dialog({ message: err.message })
  // Toast(err.message)
}

// 对外开放的api接口
const odoo = odooCreator({ error, models: api_models })

export default odoo
