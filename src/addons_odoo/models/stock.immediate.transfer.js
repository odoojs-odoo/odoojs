import { Model } from '@/odoorpc/models'

export class AccountPayment extends Model {
  constructor(...args) {
    super(...args)
  }

  static async onchange(ids, values, fname, field_onchange, kwargs = {}) {
    console.log(field_onchange)

    const field_chg = {
      ...field_onchange,
      'immediate_transfer_line_ids.picking_id': 1,
      'immediate_transfer_line_ids.to_immediate': 1
    }

    const res = await super.onchange(ids, values, fname, field_chg, kwargs)

    return res
  }
}

const AddonsModels = {
  'stock.immediate.transfer': AccountPayment
}

export default AddonsModels
