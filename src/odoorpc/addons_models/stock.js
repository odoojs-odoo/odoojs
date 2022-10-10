import { Model } from '../models'

export class Picking extends Model {
  constructor(...args) {
    super(...args)
  }

  static call_button_after({ name, action: action_info }) {
    // console.log('call_button_after', name, action_info)

    if (name === 'button_validate') {
      const { res_model, context } = action_info
      if (res_model === 'stock.backorder.confirmation') {
        return { name: 'stock2.action_backorder_wizard', context }
      } else if (res_model === 'stock.immediate.transfer') {
        throw 'todo'
      } else {
        throw 'error'
      }
    } else {
      return action_info
    }
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
  'stock.picking': Picking
}

export default AddonsModels
