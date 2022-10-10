import { Model } from '../models'

export class IrModuleModule extends Model {
  constructor(...args) {
    super(...args)
  }

  static async button_immediate_install(module_name) {
    const xml_ref = `base.module_${module_name}`
    const module = await this.env.ref(xml_ref)
    const module_id = module.id
    // if already installed, return no error
    return await this.execute('button_immediate_install', module_id)
  }

  static async button_immediate_uninstall(module_name) {
    const xml_ref = `base.module_${module_name}`
    const module = await this.env.ref(xml_ref)
    const module_id = module.id
    // if already uninstalled, return an error
    return await this.execute('button_immediate_uninstall', module_id)
  }
}

const AddonsModels = {
  'ir.module.module': IrModuleModule
}

export default AddonsModels
