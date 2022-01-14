import BaseTestCase from './base'
import rpc from '@/odoorpc'

export default class ModelTestCase extends BaseTestCase {
  async test() {
    await this.with_context()
    await this.with_env()
    await this.env_copy()
  }

  async with_context() {
    await this.login()
    const model = 'ir.module.module'
    const Model2 = rpc.env.model(model)
    const res2 = await Model2.name_search({ limit: 8 })
    console.log('cn module', res2)

    const lang = 'en_US'
    //   const lang = 'zh_CN'
    const ctx = { lang }
    const Model = Model2.with_context(ctx)
    const res = await Model.name_search({ limit: 8 })
    console.log(res)
  }

  async with_env() {
    await this.login()
    const model = 'ir.module.module'
    const Model2 = rpc.env.model(model)
    const res2 = await Model2.name_search({ limit: 8 })
    console.log('cn', res2)

    const lang = 'en_US'
    //   const lang = 'zh_CN'
    const ctx = { lang }
    const env = rpc.env.with_context(ctx)
    const Model = Model2.with_env(env)
    const res = await Model.name_search({ limit: 8 })
    console.log(res)
  }

  async env_copy() {
    await this.login()
    const model = 'ir.module.module'
    const Model2 = rpc.env.model(model)
    const res2 = await Model2.name_search({ limit: 8 })
    console.log('cn', res2)

    const context2 = rpc.env.context
    const lang = 'en_US'
    //   const lang = 'zh_CN'
    const context = { ...context2, lang }
    const env = rpc.env.copy(context)
    const Model = env.model(model)
    const res = await Model.name_search({ limit: 8 })
    console.log(res)
  }
}
