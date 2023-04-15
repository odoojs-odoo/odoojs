import { Model } from '@/odoorpc/models'

export class ExtendModel extends Model {
  constructor(...args) {
    super(...args)
  }

  static call_button_after(name, action_info) {
    if (name === 'action_register_payment') {
      return {
        ...action_info,
        xml_id: 'account_wizard.action_payment_register_wizard'
      }
    } else {
      // alert(`todo, ${name}`)
      // throw 'error'
    }
  }
}

const AddonsModels = {
  'account.move': ExtendModel
}

export default AddonsModels
