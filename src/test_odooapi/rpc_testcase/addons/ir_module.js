import { LoginTestCase } from './base'

export default class ModelTestCase extends LoginTestCase {
  async list_installed() {
    await this.login()
    const modules_list = await this.api.web.session.modules()
    console.log(modules_list)
  }

  async install() {
    await this.login()
    const api = this.api

    const model = 'ir.module.module'
    const Model = api.env.model(model)
    const module_name = 'contacts'

    const modules_list = await this.api.web.session.modules()

    if (modules_list.includes(module_name)) {
      console.log(module_name, ' is installed.  can not install again')
      return
    }

    const res = await Model.button_immediate_install(module_name)
    console.log(res)
  }

  async uninstall() {
    await this.login()
    const api = this.api

    const model = 'ir.module.module'
    const Model = api.env.model(model)
    const module_name = 'contacts'

    const modules_list = await this.api.web.session.modules()

    if (!modules_list.includes(module_name)) {
      console.log(module_name, ' is not installed.  can not uninstall')
      return
    }

    const res = await Model.button_immediate_uninstall(module_name)
    console.log(res)
  }
}
