import { Model } from '@/odoorpc/models'

export class Picking extends Model {
  constructor(...args) {
    super(...args)
  }

  static call_button_after(name, action_info) {
    console.log('call_button_after', name, action_info)

    if (name === 'button_validate') {
      const { res_model } = action_info
      if (res_model === 'stock.backorder.confirmation') {
        return {
          ...action_info,
          xml_id: 'stock_wizard.action_backorder_confirmation_wizard'
        }
      } else if (res_model === 'stock.immediate.transfer') {
        return {
          ...action_info,
          xml_id: 'stock_wizard.action_immediate_transfer_wizard'
        }
      } else if (res_model === 'confirm.stock.sms') {
        return {
          ...action_info,
          xml_id: 'stock_sms.action_confirm_stock_sms_wizard'
        }
      } else {
        console.log('call_button_after', name, action_info)
        throw 'error'
      }
    } else {
      return action_info
    }
  }
}

const AddonsModels = {
  'stock.picking': Picking
}

export default AddonsModels
