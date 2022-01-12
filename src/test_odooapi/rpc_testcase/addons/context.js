import { LoginTestCase } from './base'

export default class ModelTestCase extends LoginTestCase {
  async test_with_context() {
    await this.login()
    const context2 = this.api.env.context
    const lang = 'en_US'
    //   const lang = 'zh_CN'
    const context = { ...context2, lang }
    const model = 'ir.module.module'
    const Model2 = this.api.env.model(model)
    const Model = Model2.with_context(context)
    const res = await Model.name_search()
    console.log(res)
  }

  async test_with_env() {
    await this.login()
    const api = this.api
    const context2 = api.env.context

    const lang = 'en_US'
    //   const lang = 'zh_CN'
    const context = { ...context2, lang }
    const model = 'ir.module.module'
    const Model2 = api.env.model(model)
    const env = api.env.copy(context)
    const Model = Model2.with_env(env)

    const res = await Model.name_search()
    console.log(res)
  }

  async test_env_copy() {
    await this.login()
    const api = this.api
    const context2 = api.env.context

    const lang = 'en_US'
    //   const lang = 'zh_CN'
    const context = { ...context2, lang }
    const model = 'ir.module.module'
    const env = api.env.copy(context)
    const Model = env.model(model)
    const res = await Model.name_search()
    console.log(res)
  }
}
