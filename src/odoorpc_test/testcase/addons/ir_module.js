import BaseTestCase from './base'
import rpc from '@/odoorpc'

export default class ModelTestCase extends BaseTestCase {
  async test() {
    await this.list_installed()
    await this.install()
    // await this.uninstall()
  }

  async list_installed() {
    await this.login()
    const modules_list = await rpc.web.session.modules()
    console.log(modules_list)
  }

  async install() {
    await this.login()
    const module_name = 'contacts'
    const modules_list = await rpc.web.session.modules()

    if (modules_list.includes(module_name)) {
      console.log(module_name, ' is installed.  can not install again')
      return
    }

    const model = 'ir.module.module'
    const Model = rpc.env.model(model)
    const res = await Model.button_immediate_install(module_name)
    console.log(res)
  }

  async uninstall() {
    await this.login()

    const module_name = 'contacts'
    const modules_list = await rpc.web.session.modules()

    if (!modules_list.includes(module_name)) {
      console.log(module_name, ' is not installed.  can not uninstall')
      return
    }

    const model = 'ir.module.module'
    const Model = rpc.env.model(model)
    const res = await Model.button_immediate_uninstall(module_name)
    console.log(res)
  }
}
